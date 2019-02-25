import { FETCH_COMMENTS, 
				 HAS_COMMENTS,
				 FETCH_POSTS_WITH_COMMENTS,
				 SEND_COMMENT_LOADING,
				 SET_CURRENT_CONTACT_POST } from '../actions/types';

const INITIAL_STATE = {
	hasComments: false,
	error: '',
	list: [],
	posts: null,
	currentPost: null,
	isSendCommentLoading: false
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return {
				...state,
				list: action.payload
			}

		case SEND_COMMENT_LOADING:
			return {
				...state,
				isSendCommentLoading: action.payload
			}

		case FETCH_POSTS_WITH_COMMENTS:
			return {
				...state,
				posts: action.payload
			}

		case SET_CURRENT_CONTACT_POST:
			return {
				...state,
				currentPost: action.payload
			}

		case HAS_COMMENTS:
			return {
				...state,
				hasComments: action.payload
			}
	}

	return state;
}