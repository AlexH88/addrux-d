import axios from 'axios';
import { FETCH_ANALYTICS_ACCOUNT_ID,
				 FETCH_BOT_ANALYTICS_FOLLOWERS,
				 FETCH_BOT_ANALYTICS_LIKES,
				 FETCH_BOT_ANALYTICS_COMMENTS,
				 FETCH_BOT_ANALYTICS_FOLLOWING,
				 FETCH_ANALYTICS_FOLLOWERS,
				 FETCH_ANALYTICS_LIKES,
				 FETCH_ANALYTICS_COMMENTS,
				 FETCH_ANALYTICS_ER,
				 ANALYTICS_ERROR,
				 ROOT_URL } from './types';
import moment from 'moment';

import * as info from './info';


export function fetchBotAnalytics() {
	const accountID = localStorage.getItem('currAcc');
	const min = moment().subtract(1, 'month').format('YYYY-MM-DD');
	const max = moment().subtract(1, 'days').format('YYYY-MM-DD');

	return (dispatch) => {
		axios.get(`${ROOT_URL}/following/analytics/${accountID}/?created_min=${min}&created_max=${max}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/analytics.js: fetchBotAnalytics() - Response', response);				
				
				let followers = [];
				let likes = [];
				let comments = [];
				let following = [];

				response.data.reverse().forEach(item => {
					switch(item.type) {
						case 1:
							followers.push({ date: item.created, value: item.value });
							break;
						case 2:
							following.push({ date: item.created, value: item.value });
							break;
						case 3:
							likes.push({ date: item.created, value: item.value });
							break;
						case 4:
							comments.push({ date: item.created, value: item.value });
							break;
					}
				});

				dispatch({
					type: FETCH_BOT_ANALYTICS_FOLLOWERS,
					payload: followers
				});
				dispatch({
					type: FETCH_BOT_ANALYTICS_LIKES,
					payload: likes
				});
				dispatch({
					type: FETCH_BOT_ANALYTICS_COMMENTS,
					payload: comments
				});
				dispatch({
					type: FETCH_BOT_ANALYTICS_FOLLOWING,
					payload: following
				});
			})
			.catch(error => {
				console.log('actions/analytics.js: fetchAnalyticsFollowers() - Error', error);
				dispatch(info.analyticsInfo({
					type: 'error',
					filed: 'analytics_error',
					message: 'Fetching analytics data is failed. Please, reload page.'
				}));
			});
	}
}

export function fetchAnalytics(period) {
	const accountID = localStorage.getItem('currAcc');
	let min;
	let max;
	switch (period) {
		case 'per 1 week':
			min = moment().subtract(1, 'weeks').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
		case 'per 2 week':
			min = moment().subtract(2, 'weeks').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
		case 'per 1 month':
			min = moment().subtract(1, 'month').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
		case 'per 3 month':
			min = moment().subtract(3, 'month').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
		case 'per 6 month':
			min = moment().subtract(6, 'month').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
		case 'per 12 month':
			min = moment().subtract(12, 'month').format('YYYY-MM-DD');
			max = moment().subtract(1, 'days').format('YYYY-MM-DD');
			break;
	}

	return (dispatch) => {
		axios.get(`${ROOT_URL}/analytics/${accountID}/?created_min=${min}&created_max=${max}`, {
			headers: { 'Authorization': localStorage.getItem('token') }
		})
			.then(response => {
				console.log('actions/analytics.js: fetchAnalytics() - Response', response);				
				
				let followers = [];
				let likes = [];
				let comments = [];
				let ER = [];

				const k = response.data.length / 15;

				response.data.reverse().forEach((item, index) => {
					if(index % k === 0) {
						switch(item.type) {
							case 1:
								followers.push({ date: item.created, value: item.value });
								break;
							case 7:
								ER.push({ date: item.created, value: item.value });
								break;
							case 3:
								likes.push({ date: item.created, value: item.value });
								break;
							case 4:
								comments.push({ date: item.created, value: item.value });
								break;
						}
					}
				});

				dispatch({
					type: FETCH_ANALYTICS_FOLLOWERS,
					payload: followers
				});
				dispatch({
					type: FETCH_ANALYTICS_LIKES,
					payload: likes
				});
				dispatch({
					type: FETCH_ANALYTICS_COMMENTS,
					payload: comments
				});
				dispatch({
					type: FETCH_ANALYTICS_ER,
					payload: ER
				});
			})
			.catch(error => {
				console.log('actions/analytics.js: fetchAnalyticsFollowers() - Error', error);
				dispatch(info.analyticsInfo({
					type: 'error',
					filed: 'analytics_error',
					message: 'Fetching analytics data is failed. Please, reload page.'
				}));
			});
	}
}