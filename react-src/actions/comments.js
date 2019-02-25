import axios from 'axios';
import moment from 'moment';

import * as info from './info';

import { FETCH_COMMENTS,
				 FETCH_POSTS_WITH_COMMENTS,
				 SET_CURRENT_CONTACT_POST,
				 HAS_COMMENTS,
				 SEND_COMMENT_LOADING,
				 ROOT_URL } from './types';


export function fetchPostsWithComments() {
	const accountID = localStorage.getItem('currAcc');
	
	return (dispatch) => {
		if(accountID) {
			axios.get(`${ROOT_URL}/post/comments/posts/${accountID}`, {
				headers: { 'Authorization': localStorage.getItem('token') }
			})
				.then(response => {
					console.log('actions/comments.js (fetchPostsWithComments) - Response, ', response);
					
					dispatch({
						type: FETCH_POSTS_WITH_COMMENTS,
						payload: response.data
					});
				})
				.catch(error => {
					console.log('actions/comments.js (fetchPostsWithComments) - Error, ', error);
					
					dispatch(info.commentsInfo({
						type: 'error',
						field: 'comments_error',
						message: 'Fetching posts is failed. Please, reload page.'
					}));
				});
		} else {
			dispatch({
				type: FETCH_POSTS_WITH_COMMENTS,
				payload: []
			});
		}
	}
}

let prevID_ = -1;
export function fetchComments(postID) {
	return (dispatch) => {
		const newID_ = postID;
		if(prevID_ !== newID_) {
			dispatch(sendCommentsLoading(true));
			prevID_ = newID_;
		}

		axios.get(`${ROOT_URL}/post/comments/comments/${postID}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/comments.js (fetchComments) - Response, ', response);
				dispatch({
					type: FETCH_COMMENTS,
					payload: response.data
				});
				dispatch(sendCommentsLoading(false));
			})
			.catch(error => {
				console.log('actions/comments.js (fetchComments) - Error, ', error);
				dispatch(info.commentsInfo({
					type: 'error',
					field: 'comments_error',
					message: 'Fetching comments is failed. Please, reload page.'
				}));
			});
	}
}

export function clearChatWindow() {
	return (dispatch) => {
		dispatch({
			type: FETCH_COMMENTS,
			payload: []
		});
	}
}

export function sendCommentsLoading(isLoading) {
	return (dispatch) => {
		dispatch({
			type: SEND_COMMENT_LOADING,
			payload: isLoading
		});
	}
}

export function sendComment(postID, comment) {
	return (dispatch) => {
		axios.post(`${ROOT_URL}/post/comments/comments`, {
			post: postID,
			text: comment,
			date: moment().format('YYYY-MM-DD HH:mm:ss')
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/comments.js (sendComment) - Response, ', response);
				dispatch(fetchComments(postID));
				dispatch(fetchComments());
				dispatch(markAsRead(postID));
				dispatch(sendCommentsLoading(false));
			})
			.catch(error => {
				console.log('actions/comments.js (sendComment) - Error, ', error);
				dispatch(info.commentsInfo({
					type: 'error',
					field: 'comments_error',
					message: 'Sending comment is failed. Please, try again.'
				}));
				dispatch(sendCommentsLoading(false));				
			});
	}
}

export function deleteComment(commentID, postID) {
	return (dispatch) => {
		axios.delete(`${ROOT_URL}/post/comments/comments/${commentID}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/comments.js (deleteComment) - Response, ', response);
				dispatch(fetchComments(postID));
			})
			.catch(error => {
				console.log('actions/comments.js (deleteComment) - Error, ', error);
				dispatch(info.commentsInfo({
					type: 'error',
					field: 'comments_error',
					message: 'Deleting comment is failed. Please, try again.'
				}));
			});
	}
}

export function markAsRead(postID) {
	return (dispatch) => {
		axios.patch(`${ROOT_URL}/post/${postID}`, {
			has_new_comments: 0
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/comments.js (markAsRead) - Response, ', response);
				dispatch(fetchPostsWithComments());
			})
			.catch(error => {
				console.log('actions/comments.js (markAsRead) - Error, ', error);

			});
	}
}

export function markAsVisited() {
	return (dispatch) => {
		dispatch({
			type: HAS_COMMENTS,
			payload: false
		});
	}
}

export function setCurrentPost(postID) {
	return (dispatch) => {
		dispatch({
			type: SET_CURRENT_CONTACT_POST,
			payload: postID
		});
	}
}