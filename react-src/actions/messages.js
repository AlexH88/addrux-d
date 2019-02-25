import axios from 'axios';
import moment from 'moment';

import { FETCH_THREADS,
				 FETCH_THREAD_MESSAGES,
				 SET_CURRENT_CONTACT,
				 HAS_MESSAGES,
				 SEND_MESSAGE_LOADING,
				 ROOT_URL } from './types';

import * as info from './info';


export function fetchThreads() {
	const accountID = localStorage.getItem('currAcc');

	return (dispatch) => {
		axios.get(`${ROOT_URL}/threads/${accountID}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/messages.js (fetchThreads) - Response, ', response);
				dispatch({
					type: FETCH_THREADS,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/messages.js (fetchThreads) - Error, ', error);
				dispatch(info.messagesInfo({
					type: 'error',
					message: 'Can not fetch contacts list. Please, reload page.',
					field: 'messages_error'
				}));
			});
	};
}

export function setCurrentContact(id) {
	return (dispatch) => {
		dispatch({
			type: SET_CURRENT_CONTACT,
			payload: id
		});
	}
}

let prevID = -1;
export function fetchThreadMessages(id) {
	return (dispatch) => {
		const newID = id;
		if(prevID !== newID) {
			dispatch(sendMessageLoading(true));
			prevID = newID;
		}

		axios.get(`${ROOT_URL}/thread/messages/${id}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/messages.js (fetchThreadMessages) - Response, ', response);
				dispatch({
					type: FETCH_THREAD_MESSAGES,
					payload: response.data
				});
				dispatch(sendMessageLoading(false));
			})
			.catch(error => {
				console.log('actions/messages.js (fetchThreadMessages) - Error, ', error);
				dispatch(info.messagesInfo({
					type: 'error',
					message: 'Can not fetch messages. Please, reload page.',
					field: 'messages_error'
				}));
			});
	};
}

export function clearChatWindow() {
	console.log('Clear chat window is called.');
	return (dispatch) => {
		dispatch({
			type: FETCH_THREAD_MESSAGES,
			payload: []
		});
	}
}

export function sendMessageLoading(isLoading) {
	return (dispatch) => {
		dispatch({
			type: SEND_MESSAGE_LOADING,
			payload: isLoading
		});
	}
}

export function sendMessage(threadID, msg) {
	console.log('##########Sending message with ID: ', threadID, '##########');
	return (dispatch) => {
		axios.post(`${ROOT_URL}/thread/messages`, {
			thread: threadID,
			message: msg,
			date: moment().format('YYYY-MM-DD HH:mm:ss')
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/messages.js (sendMessage) - Response, ', response);
				dispatch(fetchThreadMessages(threadID));
				dispatch(fetchThreads());
				dispatch(markAsRead(threadID))
				dispatch(sendMessageLoading(false));
			})
			.catch(error => {
				console.log('actions/messages.js (sendMessage) - Error, ', error);
				dispatch(info.messagesInfo({
					type: 'error',
					message: 'Can not send message. Please, try again.',
					field: 'messages_error'
				}));
				dispatch(sendMessageLoading(false));				
			});
	}
}

export function markAsRead(threadID) {
	return (dispatch) => {
		axios.patch(`${ROOT_URL}/threads/${threadID}`, {
			new_messages: 0
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/messages.js (markAsRead) - Response, ', response);
				dispatch(fetchThreads());
			})
			.catch(error => {
				console.log('actions/messages.js (markAsRead) - Error, ', error);

			});
	}
}

export function markAsVisited() {
	return (dispatch) => {
		dispatch({
			type: HAS_MESSAGES,
			payload: false
		});
	}
}