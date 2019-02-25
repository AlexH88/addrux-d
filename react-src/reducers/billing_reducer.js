import { FETCH_PLANS,
				 FETCH_CURRENT_PLAN,
				 FETCH_BILLING_HISTORY,
				 SELECTING_PLAN,
				 SELECT_PLAN,
				 SET_TRIAL,
				 DEFINE_PERMISSIONS,
				 EXPIRED_DAY } from '../actions/types';
import moment from 'moment';


const INITIAL_STATE = {
	plans: null,
	history: null,
	currPlan: null,
	selectedPlan: null,
	planExpiredDays: null,
	error: '',
	permissions: null
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_PLANS:
			return {
				...state,
				plans: action.payload
			}

		case DEFINE_PERMISSIONS:
			return {
				...state,
				permissions: action.payload
			}

		case FETCH_CURRENT_PLAN:
			return {
				...state,
				currPlan: action.payload
			}

		case FETCH_BILLING_HISTORY:
			return {
				...state,
				history: action.payload
			}

		case SELECT_PLAN:
			return {
				...state,
				currPlan: action.payload
			}

		case SELECTING_PLAN:
			return {
				...state,
				selectedPlan: action.payload
			}

		case SET_TRIAL:
			return {
				...state,
				selectedPlan: action.payload
			}

		case EXPIRED_DAY:	
			return {
				...state,
				planExpiredDays: action.payload
			}
	}

	return state;
}