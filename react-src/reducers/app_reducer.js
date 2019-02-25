import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_LOADING,
	SUCCESS_PAY
} from '../actions/types';

const INITIAL_STATE = {
	isAuth: null,
	isAuthLoading: false,
	isPaid: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
		case AUTH_USER:
			return {
				...state,
				isAuth: true
			};

		case UNAUTH_USER:
			return {
				...state,
				isAuth: false
			};

		case AUTH_LOADING:
			return {
				...state,
				isAuthLoading: action.payload
			}

		case SUCCESS_PAY:
			return {
				...state,
				isPaid: action.payload
			}
	}

	return state;
}