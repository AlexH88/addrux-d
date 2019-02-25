import axios from 'axios';
import { FETCH_POSTS,
				 FETCH_FILES,
				 CREATE_POST,
				 UPDATE_POST,
				 CLEAR_SUCCESS,
				 DELETE_POST,
				 POSTS_ERROR,
				 SET_CURRENT_POST,
				 PROCESS_POST_LOADING,
				 SUCCESS_COLLECT_IDS,
				 COLLECT_FILES_IDS,
				 ROOT_URL } from './types';

import * as info from './info';
import moment from 'moment';
import 'moment-timezone';

export function fetchPosts() {
	const accountID = localStorage.getItem('currAcc');

	return (dispatch) => {
		if(accountID) {
			axios.get(`${ROOT_URL}/post/${accountID}`, {
				headers: { 'Authorization': localStorage.getItem('token') }
			})
				.then(response => {
					console.log('actions/library.js (fetchPosts) - Response, ', response);
					dispatch({
						type: FETCH_POSTS,
						payload: response.data
					});
				})
				.catch(error => {
					dispatch(errorPosts(error));
					dispatch(info.postsInfo({
						type: 'error',
						field: 'posts_error',
						message: 'Fetching posts is failed. Please, reload page.'
					}));
				});
		} else {
			dispatch({
				type: FETCH_POSTS,
				payload: []
			});
		}
	};
}

let filesIDs = [];
export function collectFilesIDs() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/account`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response1 => {
				response1.data.forEach(account => {
					return axios.get(`${ROOT_URL}/post/${account.id}`, {
						headers: { 'Authorization': localStorage.getItem('token') }
					})
						.then(response2 => {
							response2.data.forEach(post => {
								post.files.forEach(file => {
									filesIDs.push(file.id);
								});
							})
							dispatch({
								type: SUCCESS_COLLECT_IDS,
								payload: true
							});
						});
				});
			})
			.catch(error => {
				dispatch({
					type: SUCCESS_COLLECT_IDS,
					payload: false
				});
			})
	};
}

export function returnfilesIDs() {
	console.log('##### COLLECTED DATA: ', filesIDs, ' #####');

	return (dispatch) => {
		dispatch({
			type: COLLECT_FILES_IDS,
			payload: filesIDs
		});
	}
}

export function uploadFile(postID, file) {
	let data = new FormData();
	data.append('post', postID);
	data.append('file', file);
	data.append('account', localStorage.getItem('currAcc'));

	return (dispatch) => {
		axios.post(`${ROOT_URL}/post/files`, data, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/library.js (uploadFiles) - Response', response);
				dispatch(fetchFiles());
				dispatch(fetchPosts());
				dispatch(info.clearField('posts_info'));
				dispatch(processPostLoading(false));
			})
			.catch(error => {
				console.log('actions/library.js (uploadFiles) - Error', error.response);
				if(error.response.data.status) {
					dispatch(info.postsInfo({
						type: 'error',
						field: 'posts_error',
						message: `Uploading file is failed. ${error.response.data.status}`
					}));
				}
				else if(error.response.data.file) {
					dispatch(info.postsInfo({
						type: 'error',
						field: 'posts_error',
						message: `Uploading file is failed. ${error.response.data.file[0]}`
					}));
				} 
				else {
					dispatch(info.postsInfo({
						type: 'error',
						field: 'posts_error',
						message: 'Uploading file is failed. Please, try again.'
					}));
				}
				dispatch(processPostLoading(false));
			});
	};
}

export function fetchFiles() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/post/files`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/library.js (fetchFiles) - Response', response);
				dispatch({
					type: FETCH_FILES,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/library.js (fetchFiles) - Error', error);
				dispatch(info.postsInfo({
					type: 'error',
					field: 'posts_error',
					message: 'Fetching files is failed. Please, reload page.'
				}));
			});
	}
}

export function errorPosts(error) {
	return {
		type: POSTS_ERROR,
		payload: error
	}
}

export function createPost(message, date, isUploading, file, tags, isStories) {
	console.log('Creating post: ', date.format('lll'));
	return (dispatch, getState) => {
		const following = getState().following;
		axios.post(`${ROOT_URL}/post`, {
			tags: JSON.stringify(tags),
			text: message,
			enable_comments: following.enableComments,
			public_date: `${date.format('YYYY-MM-DD')}T${date.format('HH:mm')}`,
			account: localStorage.getItem('currAcc'),
			is_stories: isStories
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				if(isUploading) {
					dispatch(uploadFile(response.data.id, file));
				} else {
					console.log(`Creating post without uploading, fileID - ${file.id}, postID - ${response.data.id}`);
					dispatch(addFileToPost(response.data.id, file.id));
				}
				dispatch({
					type: CREATE_POST,
					payload: { success: true, data: response.data }
				});
				dispatch(info.postsInfo({
					type: 'info',
					field: 'posts_info',
					message: 'Creating post is successful.'
				}));
			})
			.catch(error => {
				console.log('actions/library.js (createPost) - Error', error);
				dispatch(info.postsInfo({
					type: 'error',
					field: 'posts_error',
					message: 'Creating post is failed. Please, try again.'
				}));
				dispatch(processPostLoading(false));
			})
	}
}

export function addFileToPost(postID, imgID) {
	return (dispatch) => {
		axios.patch(`${ROOT_URL}/post/files/${imgID}`, {
			post: postID
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/library.js (addFileToPost) - Response', response);
				dispatch(fetchFiles());
				dispatch(fetchPosts());
				dispatch(processPostLoading(false));
			})
			.catch(error => {
				console.log('actions/library.js (addFileToPost) - Error', error);
				dispatch(processPostLoading(false));
			});
	}
}

export function updatePost(id, images, message, date, tags, isStories) {
	return (dispatch, getState) => {
		const following = getState().following;
		axios.put(`${ROOT_URL}/post/${id}`, {
			tags: tags,
			text: message,
			enable_comments: following.enableComments,
			public_date: `${date.format('YYYY-MM-DD')}T${date.format('HH:mm')}`,
			account: localStorage.getItem('currAcc'),
			images: images,
			is_stories: isStories
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				dispatch({
					type: UPDATE_POST,
					payload: { success: true, data: response.data }
				});
				dispatch(info.postsInfo({
					type: 'info',
					field: 'posts_info',
					message: 'Updating post is successfully.'
				}));
				dispatch(processPostLoading(false));
			})
			.catch(error => {
				console.log('actions/library.js (updatePost) - Error', error);
				dispatch(info.postsInfo({
					type: 'error',
					field: 'posts_error',
					message: 'Updating post is failed. Please, try again.'
				}));
				dispatch(processPostLoading(false));
			})
	}
}

export function deletePost(id) {
	return (dispatch) => {
		axios.delete(`${ROOT_URL}/post/${id}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				dispatch({
					type: DELETE_POST,
					payload: true
				});
				dispatch(info.postsInfo({
					type: 'info',
					field: 'posts_info',
					message: 'Deleting post is successfully.'
				}));
			})
			.catch(error => {
				console.log('actions/library.js (deletePost) - Error', error);
				dispatch(info.postsInfo({
					type: 'error',
					field: 'posts_error',
					message: 'Deleting post is failed. Please, try again.'
				}));
			})
	}
}

export function clearSuccess() {
	return {
		type: CLEAR_SUCCESS,
		payload: false
	}
}

export function processPostLoading(isLoading) {
	return (dispatch) => {
		dispatch({
			type: PROCESS_POST_LOADING,
			payload: isLoading
		})
	}
}

export function setCurrentPost(images, message, date) {
	return (dispatch) => {
		dispatch({
			type: SET_CURRENT_POST,
			payload: { images, message, date }
		});
	}
}