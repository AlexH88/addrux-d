import { FETCH_ANALYTICS_ACCOUNT_ID,
				 FETCH_ANALYTICS_FOLLOWERS,
				 FETCH_ANALYTICS_LIKES,
				 FETCH_ANALYTICS_COMMENTS,
				 FETCH_BOT_ANALYTICS_FOLLOWERS,
				 FETCH_BOT_ANALYTICS_LIKES,
				 FETCH_BOT_ANALYTICS_COMMENTS,
				 FETCH_BOT_ANALYTICS_FOLLOWING,
				 ANALYTICS_ERROR,
				 FETCH_ANALYTICS_ER } from '../actions/types';


const INITAIL_STATE = {
	error: '',
	accountID: null,
	botFollowers: null,
	botLikes: null,
	botComments: null,
	botFollowing: null,
	followers: null,
	likes: null,
	comments: null,
	ER: null
}


export default function(state = INITAIL_STATE, action) {
	switch (action.type) {
		case FETCH_ANALYTICS_ACCOUNT_ID:
			return {
				...state,
				accountID: action.payload
			}

		case FETCH_ANALYTICS_FOLLOWERS:
			return {
				...state,
				followers: action.payload
			}

		case FETCH_ANALYTICS_LIKES:
			return {
				...state,
				likes: action.payload
			}

		case FETCH_ANALYTICS_COMMENTS:
			return {
				...state,
				comments: action.payload
			}

		case FETCH_ANALYTICS_ER:
			return {
				...state,
				ER: action.payload
			}

		case FETCH_BOT_ANALYTICS_FOLLOWERS:
			return {
				...state,
				botFollowers: action.payload
			}

		case FETCH_BOT_ANALYTICS_LIKES:
			return {
				...state,
				botLikes: action.payload
			}

		case FETCH_BOT_ANALYTICS_COMMENTS:
			return {
				...state,
				botComments: action.payload
			}

		case FETCH_BOT_ANALYTICS_FOLLOWING:
			return {
				...state,
				botFollowing: action.payload
			}

		case ANALYTICS_ERROR:
			return {
				...state,
				error: action.payload
			}
	}

	return state;
}