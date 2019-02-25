import axios from 'axios';
import { FETCH_PLANS,
				 FETCH_CURRENT_PLAN,
				 FETCH_BILLING_HISTORY,
				 SELECT_PLAN,
				 SELECTING_PLAN,
				 EXPIRED_DAY,
				 SET_TRIAL,
				 DEFINE_PERMISSIONS,
				 SUCCESS_PAY,
				 ROOT_URL } from './types';
import moment from 'moment';
import { browserHistory } from 'react-router';
import * as info from './info';

export function fetchPlans() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/plans`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/billing.js (fetchPlans) - Response', response);

				dispatch({
					type: FETCH_PLANS,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/billing.js (fetchPlans) - Error', error);
				dispatch(info.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'Fetching plans is failed. Please, reload page.'
				}));
			});
	};
}

export function definePermissions(currentPlan) {
	console.log('#### Try to define permissions ####');

	return (dispatch) => {
		axios.get(`${ROOT_URL}/plans`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				response.data.forEach(plan => {
					console.log(`### Compare ${plan.id} with ${currentPlan.plan}`);
					
					if(plan.id === currentPlan.plan) {
						dispatch({
							type: DEFINE_PERMISSIONS,
							payload: plan.name
						});
					}
				})
			})
	}
}

export function setTrialPlan() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/plans`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				response.data.forEach(plan => {
					if(plan.name === 'Trial') {
						dispatch({
							type: SET_TRIAL,
							payload: {...plan, type: 'weekly'}
						});
					}
				});
			})
			.catch(error => {
				console.log('actions/billing.js (fetchPlans) - Error', error);
				dispatch(info.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'Fetching plans is failed. Please, reload page.'
				}));
			});
	}
}

export function fetchCurrentPlan() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/billing/current`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/billing.js (fetchCurrentPlan) - Response', response);

				dispatch({
					type: FETCH_CURRENT_PLAN,
					payload: response.data
				});

				dispatch(fetchPlans());

				if(response.data.length !== 0) {
					if(response.data[0].is_paid) {
						dispatch({
							type: SUCCESS_PAY,
							payload: true
						});
					}
					
					dispatch({
						type: EXPIRED_DAY,
						payload: response.data[0].expires_day
					});
				}
			})
			.catch(error => {
				console.log('actions/billing.js (fetchCurrentPlan) - Error', error);
				dispatch(info.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'Fetching current plan is failed. Please, reload page.'
				}))
			});
	};
}

export function fetchBillingHistory() {
	return (dispatch) => {
		axios.get(`${ROOT_URL}/billing`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/billing.js (fetchBillingHistory) - Response', response);
				
				dispatch({
					type: FETCH_BILLING_HISTORY,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/billing.js (fetchBillingHistory) - Error', error);
				dispatch(info.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'Fetching billing informations is failed. Please, reload page.'
				}))
			});
	};
}


export function selectingPlan(plan, type) {
	return (dispatch) => {
		dispatch({
			type: SELECTING_PLAN,
			payload: {
				...plan,
				type
			}
		});
	};
}

let timerID;
export function pingBilling() {
	return (dispatch) => {
		timerID = setInterval(() => {
			axios.get(`${ROOT_URL}/billing/current`, {
				headers: { 'Authorization': localStorage.getItem('token') }
			})
				.then(response => {
					console.log('actions/billing.js (pingBilling) - Response', response);
					
					if(response.data[0].is_paid) {
						dispatch({
							type: SUCCESS_PAY,
							payload: true
						});
						dispatch({
							type: FETCH_CURRENT_PLAN,
							payload: response.data
						});
						if(response.data.length !== 0) {
							dispatch({
								type: EXPIRED_DAY,
								payload: response.data[0].expires_day
							});
						}
						clearInterval(timerID);
					} else {
						dispatch({
							type: SUCCESS_PAY,
							payload: false
						});
					}
				})
				.catch(error => {
					console.log('actions/billing.js (pingBilling) - Error', error);

					dispatch({
						type: SUCCESS_PAY,
						payload: false
					});
				});
		}, 1000 * 30);
	};
}

export function selectPlan(plan, token) {
	return (dispatch) => {
		
		axios.post(`${ROOT_URL}/billing`, {
			plan: plan,
			stripe_source_token: token
		}, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/billing.js (selectPlan) - Response', response);
				// localStorage.setItem('isPaid', 'yes');
				// browserHistory.push('/get-followers');
				dispatch(fetchCurrentPlan());
				dispatch(pingBilling());
				dispatch({
					type: SELECT_PLAN,
					payload: response.data
				});
			})
			.catch(error => {
				console.log('actions/billing.js (selectPlan) - Error', error);
				dispatch(info.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'Selecting plan is failed. Please, reload page.'
				}))
			});
	};
}