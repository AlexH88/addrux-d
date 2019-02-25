import axios from 'axios';
import { SET_ACCOUNT_ID,
				 SET_FOLLOWING_ID,
				 SET_COMMENTS,
				 SET_HASHTAGS,
				 SET_ACCOUNTS,
				 SET_GEO,
				 SET_IS_FOLLOW,
				 SET_IS_SAVE_FOLLOWING,
				 SET_IS_LIKES,
				 SET_IS_LIKE_FOLLOWERS,
				 SET_LIKES_PER_ACCOUNT,
				 SET_ENABLE_COMMENTS,
				 FOLLOWING_ERROR,
				 CREATE_FOLLOWING_SETTINGS,
				 FETCH_FOLLOWING_SETTINGS,
				 REFRESH_FOLLOWING_SETTINGS,
				 CLEAR_REFRESH,
				 CLEAR_CREATE,
				 SET_IS_ENABLE,
				 ROOT_URL } from './types';

import * as info from './info';


export function createFollowingSettings() {
	return (dispatch, getState) => {
		const following = getState().following;
		axios.post(`${ROOT_URL}/following`, {
			comments: JSON.stringify(following.comments),
			hash_tags: JSON.stringify(following.hashtags),
			accounts: JSON.stringify(following.accounts),
			geo: JSON.stringify(following.geo),
			follow_unfollow: following.isFollow,
			save_following: following.isSaveFollowing,
			likes: following.isLikes,
			like_followers: following.isLikeFollowers,
			like_per_account: following.likesPerAccount,
			enable_comments: following.enableComments,
			account: localStorage.getItem('currAcc'),
			enabled: following.isEnable
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/following.js: createFollowingSettings() - Response', response);
				dispatch({
					type: CREATE_FOLLOWING_SETTINGS,
					payload: {success: true, data: response.data}
				});
				dispatch(info.followingInfo({
					type: 'info',
					field: 'following_info',
					message: 'Following settings has been created.'
				}));
			})
			.catch((error) => {
				console.log('actions/following.js: createFollowingSettings() - Error', error);
				dispatch({
					type: FOLLOWING_ERROR,
					payload: error
				});
				dispatch(info.followingInfo({
					type: 'error',
					field: 'following_error',
					message: 'Creating following settings is failed. Please, try again.'
				}));
			})

	}
}

export function fetchFollwoingSettings() {
	const accountID = localStorage.getItem('currAcc');

	return (dispatch) => {
		if(accountID) {
			axios.get(`${ROOT_URL}/following/${accountID}`, {
				headers: { 'Authorization': localStorage.getItem('token') }
			})
				.then(response => {
					console.log('actions/following.js: fetchFollwoingSettings() - Response', response);			
	
					if(response.data.length != 0) {
						dispatch(setAccountID(localStorage.getItem('currAcc')));
						dispatch(setFollowingID(response.data[0].id));
						dispatch(setComments(JSON.parse(response.data[0].comments)));
						dispatch(setHashtags(JSON.parse(response.data[0].hash_tags)));
						dispatch(setAccounts(JSON.parse(response.data[0].accounts)));
						dispatch(setGeo(JSON.parse(response.data[0].geo)));
						dispatch(setIsFollow(response.data[0].follow_unfollow));
						dispatch(setIsSaveFollowing(response.data[0].save_following));
						dispatch(setIsLikes(response.data[0].likes));
						dispatch(setIsLikeFollowers(response.data[0].like_followers));
						dispatch(setEnableComments(response.data[0].enable_comments));
						dispatch(setLikesPerAccount(response.data[0].like_per_account));
						dispatch(setIsEnable(response.data[0].enabled));
					} else {
						dispatch(setFollowingID('none'));
					}
				})
				.catch(error => {
					console.log('actions/following.js: fetchFollwoingSettings() - Error', error);
				});
		} else {
			dispatch(setFollowingID('none'));		
		}
	}
}

export function refreshFollowingSettings() {
	return (dispatch, getState) => {
		const following = getState().following;
		axios.put(`${ROOT_URL}/following/${following.followingID}`, {
			comments: JSON.stringify(following.comments),
			hash_tags: JSON.stringify(following.hashtags),
			accounts: JSON.stringify(following.accounts),
			geo: JSON.stringify(following.geo),
			follow_unfollow: following.isFollow,
			save_following: following.isSaveFollowing,
			likes: following.isLikes,
			like_followers: following.isLikeFollowers,
			like_per_account: following.likesPerAccount,
			enable_comments: following.enableComments,
			account: localStorage.getItem('currAcc'),
			enabled: following.isEnable
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/following.js: refreshFollowingSettings() - Response', response);
				dispatch({
					type: REFRESH_FOLLOWING_SETTINGS,
					payload: true
				});
				dispatch(info.followingInfo({
					type: 'info',
					field: 'following_info',
					message: 'Following settings has been refreshed.'
				}));
			})
			.catch((error) => {
				console.log('actions/following.js: refreshFollowingSettings() - Error', error);
				dispatch(info.followingInfo({
					type: 'error',
					field: 'following_error',
					message: 'Refreshing following settings is failed. Please, try again.'
				}));
			})

	}
}

export function refreshFollowingGrow() {
	return (dispatch, getState) => {
		const following = getState().following;
		axios.put(`${ROOT_URL}/following/${following.followingID}`, {
			comments: JSON.stringify(following.comments),
			hash_tags: JSON.stringify(following.hashtags),
			accounts: JSON.stringify(following.accounts),
			geo: JSON.stringify(following.geo),
			follow_unfollow: following.isFollow,
			save_following: following.isSaveFollowing,
			likes: following.isLikes,
			like_followers: following.isLikeFollowers,
			like_per_account: following.likesPerAccount,
			enable_comments: following.enableComments,
			account: localStorage.getItem('currAcc'),
			enabled: following.isEnable
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/following.js: refreshFollowingGrow() - Response', response);
				dispatch({
					type: REFRESH_FOLLOWING_SETTINGS,
					payload: true
				});
				dispatch(info.followingInfo({
					type: 'info',
					field: 'following_info',
					message: 'Following settings has been refreshed.'
				}));
			})
			.catch((error) => {
				console.log('actions/following.js: refreshFollowingSettings() - Error', error);
				dispatch(info.followingInfo({
					type: 'error',
					field: 'following_error',
					message: 'Refreshing following settings is failed. Please, try again.'
				}));
			})

	}
}

export function clearRefreshSuccessfull() {
	return {
		type: CLEAR_REFRESH,
		payload: false
	}
}

export function clearCreate() {
	return {
		type: CLEAR_CREATE,
		payload: false
	}
}

export function followingError(error) {
	console.log('actions/accounts.js: Error.');
	return {
		type: FOLLOWING_ERROR,
		payload: error
	};
}

export function setAccountID(id) {
	return {
		type: SET_ACCOUNT_ID,
		payload: id
	}
}

export function setFollowingID(id) {
	return {
		type: SET_FOLLOWING_ID,
		payload: id
	}
}

export function setComments(comments) {
	return {
		type: SET_COMMENTS,
		payload: comments
	}
}

export function setHashtags(hashtags) {
	return {
		type: SET_HASHTAGS,
		payload: hashtags
	}
}

export function setAccounts(accounts) {
	return {
		type: SET_ACCOUNTS,
		payload: accounts
	}
}

export function setGeo(geo) {
	return {
		type: SET_GEO,
		payload: geo
	}
}

export function setIsFollow(isFollow) {
	return {
		type: SET_IS_FOLLOW,
		payload: isFollow
	}
}

export function setIsSaveFollowing(isSaveFollowing) {
	return {
		type: SET_IS_SAVE_FOLLOWING,
		payload: isSaveFollowing
	}
}

export function setIsLikes(isLikes) {
	return {
		type: SET_IS_LIKES,
		payload: isLikes
	}
}

export function setIsLikeFollowers(isLikeFollowers) {
	// console.log('setIsLikeFollowers: ', isLikeFollowers);
	return {
		type: SET_IS_LIKE_FOLLOWERS,
		payload: isLikeFollowers
	}
}

export function setEnableComments(enableComments) {
	return {
		type: SET_ENABLE_COMMENTS,
		payload: enableComments
	}
}

export function setLikesPerAccount(likesPerAccount) {
	// console.log('actions/following.js: likesPerAccount - ', likesPerAccount);
	return {
		type: SET_LIKES_PER_ACCOUNT,
		payload: likesPerAccount
	}
}

export function setIsEnable(isEnable) {
	return {
		type: SET_IS_ENABLE,
		payload: isEnable
	}
}
