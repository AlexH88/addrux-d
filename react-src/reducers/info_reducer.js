import { AUTH_ERROR,
	AUTH_INFO,
	ACCOUNTS_ERROR,
	ACCOUNTS_INFO,
	FOLLOWING_ERROR,
	FOLLOWING_INFO,
	MESSAGES_ERROR,
	MESSAGES_INFO,
	COMMENTS_ERROR,
	COMMENTS_INFO,
	POSTS_ERROR,
	POSTS_INFO,
	ANALYTICS_ERROR,
	ANALYTICS_INFO,
	PLANS_ERROR,
	PLANS_INFO,
	TIMEZONES_ERROR,
	TIMEZONES_INFO } from '../actions/types';

const INITIAL_STATE = {
	authError: null,
	authInfo: null,
	accountsError: null,
	accountsInfo: null,
	followingError: null,
	followingInfo: null,
	messagesError: null,
	messagesInfo: null,
	commentsError: null,
	commentsInfo: null,
	postsError: null,
	postsInfo: null,
	analyticsError: null,
	analyticsInfo: null,
	plansError: null,
	plansInfo: null,
	timezonesError: null,
	timezonesInfo: null
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
	case AUTH_ERROR:
		return {
			...state,
			authError: action.payload
		};

	case AUTH_INFO:
		return {
			...state,
			authInfo: action.payload
		};

	case ACCOUNTS_ERROR:
		return {
			...state,
			accountsError: action.payload
		};

	case ACCOUNTS_INFO:
		return {
			...state,
			accountsInfo: action.payload
		};

	case FOLLOWING_ERROR:
		return {
			...state,
			followingError: action.payload
		};

	case FOLLOWING_INFO:
		return {
			...state,
			followingInfo: action.payload
		};

	case MESSAGES_ERROR:
		return {
			...state,
			messagesError: action.payload
		};

	case MESSAGES_INFO:
		return {
			...state,
			messagesInfo: action.payload
		};

	case COMMENTS_ERROR:
		return {
			...state,
			commentsError: action.payload
		};

	case COMMENTS_INFO:
		return {
			...state,
			commentsInfo: action.payload
		};

	case POSTS_ERROR:
		return {
			...state,
			postsError: action.payload
		};

	case POSTS_INFO:
		return {
			...state,
			postsInfo: action.payload
		};
	
	case ANALYTICS_ERROR:
		return {
			...state,
			analyticsError: action.payload
		};

	case ANALYTICS_INFO:
		return {
			...state,
			analyticsInfo: action.payload
		};

	case PLANS_ERROR:
		return {
			...state,
			plansError: action.payload
		};
	
	case PLANS_INFO:
		return {
			...state,
			plansInfo: action.payload
		};

	case TIMEZONES_ERROR:
		return {
			...state,
			timezonesError: action.payload
		};

	case TIMEZONES_INFO:
		return {
			...state,
			timezonesInfo: action.payload
		};
	}

	return state;
}