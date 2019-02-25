import { FETCH_THREADS,
				 FETCH_THREAD_MESSAGES,
				 HAS_MESSAGES,
				 SEND_MESSAGE_LOADING,
				 SET_CURRENT_CONTACT } from '../actions/types';

const INITIAL_STATE = {
	hasMessages: false,
	error: '',
	threads: null,
	list: [],
	currentContact: null,
	isSendMessageLoading: false
};


export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_THREADS:
			return {
				...state,
				threads: action.payload
			}

		case SEND_MESSAGE_LOADING:
			return {
				...state,
				isSendMessageLoading: action.payload
			}
		case FETCH_THREAD_MESSAGES:
			return {
				...state,
				list: action.payload
			}

		case SET_CURRENT_CONTACT:
			return {
				...state,
				currentContact: action.payload
			}

		case HAS_MESSAGES:
			return {
				...state,
				hasMessages: action.payload
			}
	}

	return state;
}