import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER,
				 AUTH_ERROR,
				 FETCH_MESSAGE,
				 AUTH_LOADING,
				 ROOT_URL } from './types';

import * as info from '../actions/info';


export function signinUser({ email, password }) {
	return function(dispatch) {
		// Submit email/password to the server
		// { email: email, password: password }
		axios.post(`${ROOT_URL}/auth`,
			{ email, password })
			.then(response => {
				console.log('actions/index.js (signinUser) - Response: ', response);
				localStorage.setItem('token', `Token ${response.data.token}`);
				dispatch({ type: AUTH_USER });
				dispatch(authLoading(false));
			})
			.catch((error) => {
				dispatch(authLoading(false));
				console.log('actions/index.js (signinUser) - Error: ', error.response);
				if(error.response.data.non_field_errors) {
					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: 'Can not log in with the provided account information.'
					}));
				} else {
					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: 'Something went wrong, check your data and try again.'
					}));
				}
			});
	}
}

export function signupUser({ password, email }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/register`, { password, email })
			.then(response => {
				console.log('actions/index.js (signupUser) - Response: ', response);

				axios.post(`${ROOT_URL}/auth`, { email, password })
				.then(response => {
					console.log('actions/index.js (signinUser) - Response: ', response);

					dispatch(authLoading(false));

					localStorage.setItem('token', `Token ${response.data.token}`);
					dispatch({ type: AUTH_USER });
					dispatch(info.clearField('auth_info'));
				})
				.catch(error => {
					console.log('actions/index.js (signinUser) - Error: ', error.response);

					dispatch(authLoading(false));

					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: 'Signing in is failed. Please, reload page and try again.'
					}));

				});
			})
			.catch(error => {
				console.log('actions/index.js (signupUser) - Error: ', error.response);

				console.log(`testing request for API ${error}`);

				dispatch(authLoading(false));

				if(error.response.data.username) {
					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: 'A user with this name already exists.'
					}));
				} else if(error.response.data[0]) {
					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: error.response.data[0]
					}));
				} else {
					dispatch(info.authInfo({
						type: 'error',
						field: 'auth_error',
						message: 'Something went wrong, check your data and try again.'
					}));
				}
			});
	}
}

export function authLoading(isLoading) {
	return (dispatch) => {
		dispatch({
			type: AUTH_LOADING,
			payload: isLoading
		});
	}
}
