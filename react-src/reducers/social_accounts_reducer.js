import { ACCOUNTS_ERROR,
				 CREATE_ACCOUNT,
				 FETCH_ACCOUNTS,
				 SET_CURRENT_ACCOUNT,
				 ACCOUNT_LOCK,
				 FETCH_ACCOUNT_DATA } from '../actions/types';

const INITIAL_STATE = {
	error: '',
	newAccount: {},
	currentAccount: {},
	list: null,
	accountLock: null
};

export default function(state = INITIAL_STATE, action) {
	// console.log('Action: ', action.type);
	// console.log('Payload: ', action.payload);
	switch (action.type) {
		case ACCOUNTS_ERROR:
			return {
				...state,
				error: action.payload
			};

		// Triggered when creating account is successed
		// case CREATE_ACCOUNT:
		// 	return {
		// 		...state,
		// 		newAccount: action.payload.data
		// 	};
		case ACCOUNT_LOCK:
			return {
				...state,
				accountLock: action.payload
			}

		case FETCH_ACCOUNTS:
			return {
				...state,
				list: action.payload
			};

		case SET_CURRENT_ACCOUNT:
			return {
				...state,
				currentAccount: action.payload
			}

		case FETCH_ACCOUNT_DATA:
			return {
				...state,
				currentAccount: action.payload
			};
	}

	return state;
}