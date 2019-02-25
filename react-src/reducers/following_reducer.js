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
				 CREATE_FOLLOWING_SETTINGS,
				 REFRESH_FOLLOWING_SETTINGS,
				 CLEAR_REFRESH,
				 CLEAR_CREATE,
				 SET_IS_ENABLE,
				 FOLLOWING_ERROR } from '../actions/types';


const INITIAL_STATE = {
	accountID: null,
	followingID: null,
	comments: [],
	hashtags: [],
	accounts: [],
	geo: [],
	isFollow: false,						// +
	isSaveFollowing: false,		// +
	isLikes: false,						// +
	isLikeFollowers: false,		// +
	likesPerAccount: 0,				// +
	enableComments: false,			// +
	error: '',
	createSuccessful: false,
	refreshSuccessful: false,
	isEnable: false
}


export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case CREATE_FOLLOWING_SETTINGS:
			return {
				...state,
				createSuccessful: action.payload.success,
				accountID: action.payload.data.account,
				followingID: action.payload.data.id,
				enableComments: action.payload.data.enable_comments,
				comments: JSON.parse(action.payload.data.comments),
				hashtags: JSON.parse(action.payload.data.hash_tags),
				accounts: JSON.parse(action.payload.data.accounts),
				geo: JSON.parse(action.payload.data.geo),
				isFollow: action.payload.data.follow_unfollow,
				isSaveFollowing: action.payload.data.save_following,
				isLikes: action.payload.data.likes,
				isLikeFollowers: action.payload.data.like_followers,
				likesPerAccount: action.payload.data.like_per_account,
				isEnable: action.payload.data.enabled
			}

		case REFRESH_FOLLOWING_SETTINGS:
			return {
				...state,
				refreshSuccessful: action.payload
			}

		case CLEAR_REFRESH:
			return {
				...state,
				refreshSuccessful: action.payload
			}

		case CLEAR_CREATE:
			return {
				...state,
				createSuccessful: false
			}

		case SET_ACCOUNT_ID:
			return {
				...state,
				accountID: action.payload
			}

		case SET_FOLLOWING_ID:
			return {
				...state,
				followingID: action.payload
			}

		case SET_ENABLE_COMMENTS:
			return {
				...state,
				enableComments: action.payload
			}

		case SET_COMMENTS:
			return {
				...state,
				comments: action.payload
			}

		case SET_HASHTAGS:
			return {
				...state,
				hashtags: action.payload
			}

		case SET_ACCOUNTS:
			return {
				...state,
				accounts: action.payload
			}

		case SET_GEO:
			return {
				...state,
				geo: action.payload
			}

		case SET_IS_FOLLOW:
			return {
				...state,
				isFollow: action.payload
			}

		case SET_IS_SAVE_FOLLOWING:
			return {
				...state,
				isSaveFollowing: action.payload
			}

		case SET_IS_LIKES:
			return {
				...state,
				isLikes: action.payload
			}

		case SET_IS_LIKE_FOLLOWERS:
			return {
				...state,
				isLikeFollowers: action.payload
			}

		case SET_LIKES_PER_ACCOUNT:
			return {
				...state,
				likesPerAccount: action.payload
			}
			
		case SET_IS_ENABLE:
			console.log('Is Bot Enble: ', action.payload);

			return{
				...state,
				isEnable: action.payload
			}

		case FOLLOWING_ERROR:
			return {
				...state,
				error: action.payload
			}
	}

	return state;
}