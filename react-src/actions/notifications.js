import axios from 'axios';
import { FETCH_NOTIFICATIONS, ROOT_URL } from './types';


export function fetchNotifications() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/notifications`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/notifications.js: fetchNotifications() - Response', response);
				dispatch({
					type: FETCH_NOTIFICATIONS,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/notifications.js: fetchNotifications() - Error', error);
			});
	}
}

export function markAsRead(id) {
	return (dispatch) => {
		axios.patch(`${ROOT_URL}/notifications/${id}`, {
			is_read: 1
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }			
		})
			.then(response => {
				console.log('actions/notifications.js: markAsRead() - Response', response);				
			})
			.catch(error => {
				console.log('actions/notifications.js: markAsRead() - Error', error);
			})
	}
}