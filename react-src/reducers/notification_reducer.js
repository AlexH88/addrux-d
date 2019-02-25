import { FETCH_NOTIFICATIONS } from '../actions/types';


const INITIAL_STATE = {
	list: []
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_NOTIFICATIONS:
			return {
				...state,
				list: action.payload
			}
	}

	return state;
}