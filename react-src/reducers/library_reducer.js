import { FETCH_POSTS,
				 FETCH_FILES,
				 CREATE_POST,
				 UPDATE_POST,
				 POST_ERROR,
				 CLEAR_SUCCESS,
				 DELETE_POST,
				 PROCESS_POST_LOADING,
				 COLLECT_FILES_IDS,
				 SUCCESS_COLLECT_IDS,
				 SET_CURRENT_POST } from '../actions/types';

const INITIAL_STATE = {
	posts: null,
	files: null,
	currentPost: null,
	success: false,
	error: '',
	isProcessPostLoading: false,
	filesIDs: null,
	isFilesIDs: false
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case COLLECT_FILES_IDS:
			return {
				...state,
				filesIDs: action.payload
			}

		case SUCCESS_COLLECT_IDS:
			return {
				...state,
				isFilesIDs: action.payload
			}
		
		case FETCH_POSTS:
			return {
				...state,
				posts: action.payload
			}

		case PROCESS_POST_LOADING:
			return {
				...state,
				isProcessPostLoading: action.payload
			}

		case FETCH_FILES:
			return {
				...state,
				files: action.payload
			}

		case CREATE_POST:
			return {
				...state,
				currentPost: action.payload.data,
				success: action.payload.success
			}

		case UPDATE_POST:
			return {
				...state,
				currentPost: action.payload.data,
				success: action.payload.success
			}

		case SET_CURRENT_POST:
			return {
				...state,
				currentPost: action.payload
			}

		case CLEAR_SUCCESS:
			return {
			...state,
			success: action.payload
		}

		case DELETE_POST:
			return {
				...state,
				success: action.payload
			}

		case POST_ERROR:
			return {
				...state,
				error: action.payload
			}
	}

	return state;
}