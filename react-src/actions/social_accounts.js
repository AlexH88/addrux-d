import axios from 'axios';
import { browserHistory } from 'react-router';
import { ACCOUNTS_ERROR,
				 CREATE_ACCOUNT,
				 UPDATE_ACCOUNT,
				 DELETE_SOCIAL_ACCOUNT,
				 FETCH_ACCOUNTS,
				 SET_CURRENT_ACCOUNT,
				 FETCH_ACCOUNT_DATA,
				 FETCH_ACCOUNT_FOLLOWING,
				 CREATE_ACCOUNT_FOLLOWING,
				 HAS_MESSAGES,
				 HAS_COMMENTS,
				 FETCH_COMMENTS,
				 FETCH_THREAD_MESSAGES,
				 ACCOUNT_LOCK,
				 SET_CURRENT_CONTACT_POST,
				 SET_CURRENT_CONTACT,
				 ROOT_URL } from './types';

import * as info from '../actions/info';
import * as messagesActions from '../actions/messages';
import * as commentsActions from '../actions/comments';


// export function createSocialAccount({ login, password }) {
// 	return function(dispatch) {
// 		axios.post(`${ROOT_URL}/account`, { login, password }, {
// 			headers: { 'Authorization': localStorage.getItem('token') }
// 		})
// 			.then(response => {
// 				console.log('/actions/social_accounts.js (createSocialAccount): Response - ', response);
// 				dispatch({
// 					type: CREATE_ACCOUNT,
// 					payload: response.data
// 				});
// 			})
// 			.catch((error) => {
// 				console.log('/actions/social_accounts.js (createSocialAccount): Error - ', error.response.data.error);
// 				dispatch(socialAccountError(error.response.data.error));
// 			});
// 	}
// }

export function createSocialAccount({ login, password }) {
	const request = axios.post(`${ROOT_URL}/account`, { login, password }, {
										headers: { 'Authorization': localStorage.getItem('token') }
									});

	return {
		type: CREATE_ACCOUNT,
		payload: request
	};
}

export function updateSocialAccount({ login, password }) {
	const request = axios.patch(`${ROOT_URL}/account`, { login, password }, {
										headers: { 'Authorization': localStorage.getItem('token') }
									});

	return {
		type: UPDATE_ACCOUNT,
		payload: request
	};
}


// export function removeSocialAccount({ id }) {
// 	return function(dispatch) {

// 	}
// }

export function syncWithServer() {
	return function(dispatch) {
		const accountID = localStorage.getItem('currAcc');

		if(accountID) {
			axios.get(`${ROOT_URL}/ping/${accountID}`, {
				headers: { 'Authorization': localStorage.getItem('token') }			
			})
				.then(response => {
					console.log('actions/social_accounts.js (syncWithServer): Response - ', response);
					// dispatch(info.accountsInfo({
					// 	type: 'info',
					// 	field: 'accounts_info',
					// 	message: `Messages: ${response.data.has_new_messages} || Comments: ${response.data.has_new_comment}`
					// }));
					if(response.data.has_new_messages) {
						console.log('### FETCHING NEW THREADS ###');
						dispatch(messagesActions.fetchThreads());
					}
					if(response.data.has_new_comment) {
						dispatch(commentsActions.fetchPostsWithComments());	
					}

					dispatch({
						type: HAS_MESSAGES,
						payload: response.data.has_new_messages
					});
					dispatch({
						type: HAS_COMMENTS,
						payload: response.data.has_new_comment
					});
				})
				.catch(error => {
					console.log('actions/social_accounts.js (syncWithServer): Error - ', error);
				});
		}
	}
}

export function fetchSocialAccounts() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/account`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/social_accounts.js (fetchSocialAccounts): Response - ', response);
				localStorage.setItem('accounts', response.data.length);
				const currAcc = localStorage.getItem('currAcc');
				if(!currAcc) {
					if(response.data.length == 0) {
						dispatch({
							type: SET_CURRENT_ACCOUNT,
							payload: {}
						});
					} else {
						dispatch({
							type: SET_CURRENT_ACCOUNT,
							payload: response.data[0]
						});
						localStorage.setItem('currAcc', response.data[0].id);
					}
				}

				dispatch({
					type: FETCH_ACCOUNTS,
					payload: response.data
				});
			})
			.catch((error) => {
				console.log('actions/social_accounts.js (fetchSocialAccounts): Error - ', error);
				dispatch(info.accountsInfo({
					type: 'error',
					field: 'accounts_error',
					message: 'Fetching accounts is failed. Please, reload page.'
				}));
			});
	}
}

export function deleteSocialAccount(id) {
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/account/${id}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/social_accounts.js (deleteSocialAccount): Response - ', response);
				dispatch(fetchSocialAccounts());
				dispatch({
					type: DELETE_SOCIAL_ACCOUNT,
					payload: true
				});
				dispatch({
					type: SET_CURRENT_ACCOUNT,
					payload: {}
				});
				localStorage.removeItem('currAcc');
			})
			.catch(error => {
				console.log('actions/social_accounts.js (deleteSocialAccount): Error - ', error);
				dispatch({
					type: DELETE_SOCIAL_ACCOUNT,
					payload: false
				});
				dispatch(info.accountsInfo({
					type: 'error',
					field: 'accounts_error',
					message: 'Deleting account is failed. Please, reload page.'
				}));
			});
	}
}

export function setCurrentAccount(account) {
	localStorage.setItem('currAcc', account.id);
	return function(dispatch) {
		dispatch({
			type: SET_CURRENT_ACCOUNT,
			payload: account
		});

		dispatch({
			type: FETCH_COMMENTS,
			payload: []
		});
		dispatch({
			type: SET_CURRENT_CONTACT_POST,
			payload: null
		});

		dispatch({
			type: FETCH_THREAD_MESSAGES,
			payload: []
		});
		dispatch({
			type: SET_CURRENT_CONTACT,
			payload: null
		});
	}
}

export function accountLockError(isLock) {
	return (dispatch) => {
		dispatch({
			type: ACCOUNT_LOCK,
			payload: isLock
		});
	}
}

export function fetchSocialAccountInfo(id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/account/`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				for (var i = response.data.length - 1; i >= 0; i--) {
					if(response.data[i].id == id) {
						dispatch({
							type: FETCH_ACCOUNT_DATA,
							payload: response.data[i]
						});
					}
				}
			})
			.catch((error) => {
				console.log('actions/social_accounts.js (fetchSocialAccountInfo): Error - ', error);
				dispatch(socialAccountError(error));
			});
	}
}



// export function fetchSocialAccountFollowing(id) {
// 	return function(dispatch) {
// 		axiso.get(`${ROOT_URL}/following/${id}`, {
// 			headers: { 'Authorization': localStorage.getItem('token') }
// 		})
// 			.then(response => {
// 				console.log('actions/social_accounts.js (fetchSocialAccountFollowings): Response - ', error);
// 				dispatch({
// 					type: FETCH_ACCOUNT_FOLLOWING,
// 					payload: response.data
// 				});
// 			})
// 			.catch((error) => {
// 				console.log('actions/social_accounts.js (fetchSocialAccountFollowings): Error - ', error);
// 				dispatch(socialAccountError(error.response.data.error));
// 			})
// 	}
// }

// export function fetchSocialAccountFollowing(id) {
// 	const request = axiso.get(`${ROOT_URL}/following/${id}`, {
// 										headers: { 'Authorization': localStorage.getItem('token') }
// 									});

// 	return {
// 		type: FETCH_ACCOUNT_FOLLOWING,
// 		payload: request
// 	};
// }


// export function createSocialAccountFollowing(id) {
// 	return function(dispatch) {
// 		axios.post(`${ROOT_URL}/following/${id}/`, {

// 		},{
// 			headers: 'Authorization': localStorage.getItem('token')
// 		})
// 			.then(response => {
// 				console.log('actions/social_accounts.js (createSocialAccountFollowings): Response - ', error);
// 				dispatch({
// 					type: CREATE_ACCOUNT_FOLLOWING,
// 					payload: response.data
// 				});
// 			})
// 			.catch((error) => {
// 				console.log('actions/social_accounts.js (createSocialAccountFollowings): Error - ', error);
// 				dispatch(socialAccountError(error.response.data.error));
// 			})
// 	}
// }

// export function createSocialAccountFollowing(id) {
// 	const request = axios.post(`${ROOT_URL}/following/${id}/`, {

// 									},{
// 										headers: { 'Authorization': localStorage.getItem('token') }
// 									});

// 	return {
// 		type: CREATE_ACCOUNT_FOLLOWING,
// 		payload: request
// 	}
// }


export function socialAccountError(error) {
	console.log('actions/accounts.js: Error.');
	return {
		type: ACCOUNTS_ERROR,
		payload: error
	};
}