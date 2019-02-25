import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socialActions from '../../actions/social_accounts';
import * as info from '../../actions/info';
import InfoModal from '../info_modal_window';
import LoadingIcon from '../loading';
import { Link, browserHistory } from 'react-router';
const actions = Object.assign({}, socialActions, info);

class SocialModal extends Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handlePassword = this.handlePassword.bind(this);

		this.state = {
			login: '',
			password: '',
			isValidPwd: true,
			isValidLogin: true,
			isLoading: false
		}
	}

	handleFormSubmit() {
		this.validateLogin();
		this.validatePassword();

		if(!this.state.isValidLogin && !this.state.isValidPwd) {
			return;
		}

		const login = this.state.login;
		const password = this.state.password;

		this.props.accountsInfo({
			type: 'info',
			field: 'accounts_info',
			message: 'Creatig account. Please, wait...'
		});

		this.setState({ isLoading: true });

		this.props.createSocialAccount({ login, password })
			.then(response => {
				console.log('Response (social_modal): ', response);

				this.setState({ isLoading: false });

				if(response.error) {
					console.log('Create account error is triggered.');
					if(response.payload.response.status == 504) {
						this.props.accountsInfo({
							type: 'error',
							field: 'accounts_error',
							message: 'Sorry, but the service is temporarily not responding. Please try again later.'
						});
					}
					switch (response.payload.response.data.status) {
						case 'LimitExceeded':
							this.props.accountsInfo({
								type: 'error',
								field: 'accounts_error',
								message: 'Sorry, but you can add only 1 account to this account.'
							});
							break;
						case 'BadLogin':
							this.props.accountsInfo({
								type: 'error',
								field: 'accounts_error',
								message: 'Please enter correct login information.'
							});
							break;
	
						case 'CheckpointRequiredError':
						this.props.accountLockError(true);
							// this.props.accountsInfo({
							// 	type: 'error',
							// 	field: 'accounts_error',
							// 	message: 'Please authorize the device for continue.'
							// });
							break;

						case 'AccountLockedError':
							this.props.accountsInfo({
								type: 'error',
								field: 'accounts_error',
								message: "Sorry, you can't add your account, because account is LOCKED."
							});
							break;
	
						case 'TwoFactorRequired':
							this.props.accountsInfo({
								type: 'error',
								field: 'accounts_error',
								message: 'Sorry, we doesn’t supporting Two Factor Requred authorizations, please try again later.'
							});
							break;
					}

					if(response.payload.response.data.login) {
						this.props.accountsInfo({
							type: 'error',
							field: 'accounts_error',
							message: response.payload.response.data.login
						});
					}
				} else {
					this.props.fetchSocialAccounts();
					this.props.setCurrentAccount(response.payload.data);
					this.props.onClose();
					browserHistory.push('/get-followers');
				}
			})
			.catch((error) => {
				this.setState({ isLoading: false });
				console.log('social_modal.js (HandleFormSubmit): Error - ', error);
				this.props.accountsInfo({
					type: 'error',
					field: 'accounts_error',
					message: 'Something goes wrong. Please, reload page and try again.'
				});
			});
	}

	handleLogin(login) {
		this.setState({
			login: login.trim()
		});
	}
	validateLogin() {
		if(this.state.login && this.state.login.indexOf(' ') < 0) {
			this.setState({ isValidLogin: true });
		} else {
			this.setState({ isValidLogin: false });
		}
	}

	handlePassword(password) {
		this.setState({
			password: password.trim()
		});
	}
	validatePassword() {
		if(this.state.password && this.state.password.indexOf(' ') < 0) {
			this.setState({ isValidPwd: true });
		} else {
			this.setState({ isValidPwd: false });
		}
	}

	renderAccountLock() {
		return (
			<div className="react-modal__wrapper geo-modal">
				<div className="react-modal__header">
					<h2>Please confirm application on your device</h2>
				</div>

				<div className="social-modal__description">
					<div className="description__text">
						<div>Open instagram on your Smartphone and press button "Confirm"</div>
					</div>
				</div>

				<div className="react-modal__button">
					<button onClick={() => this.props.accountLockError(false)}>READY</button>
				</div>
			</div>
		);
	}

	renderAddAccount() {
		return (
			<div className="react-modal__wrapper">
				<div className="react-modal__header">
					<h2>Add your social account</h2>
				</div>

				<div className="social-modal__instag">
					<div className="instag__img">
						<img src="/assets/images/icons/ava-insta.png" alt="instagram logo"/>
					</div>

					<div className="instag__letters">
						Instagram
					</div>
				</div>

				<form className="social-modal__form">
					<div className="social-modal__field">
						<div className="social-modal__label">
							<label>YOUR LOGIN ON INSTAGRAM</label>
						</div>
						<input
							value={this.state.login}
							onChange={e => this.handleLogin(e.target.value)}
							onBlur={e => this.validateLogin()}
							type="text"
							className={`social-modal__input ${this.state.isValidLogin ? '' : 'field__input_error'}`}
							placeholder="instagram_login"/>
						{ !this.state.isValidLogin && (
							<label className="field__label field__label_error">Enter correct login</label>
						) }
					</div>
					<div className="social-modal__field">
						<div className="social-modal__label">
							<label>YOUR CURRENT PUSSWORD ON INSTAGRAM</label>
							<span className="label__pwd">
								<Link>Forgot password?</Link>
							</span>
						</div>
						<input
							value={this.state.password}
							onChange={e => this.handlePassword(e.target.value)}
							onBlur={e => this.validatePassword()}
							type="password"
							className={`social-modal__input ${this.state.isValidPwd ? '' : 'field__input_error'}`}
							placeholder="password"/>
						{ !this.state.isValidPwd && (
							<label className="field__label field__label_error">Enter correct password</label>
						) }
					</div>

					<div className="react-modal__button">
						<button 
							disabled={this.state.isLoading}
							onClick={(e) => { e.preventDefault(); this.handleFormSubmit(); }}>
							{ this.state.isLoading ? <LoadingIcon /> : 'ADD ACCOUNT' }
						</button>
					</div>
				</form>

				<div className="social-modal__description">
					<i className="fa fa-exclamation-circle" aria-hidden="true"></i>
					<div className="description__text">
						<div>Your account in safe</div>
						<div>We don't save your password, we are get token from instagram</div>
					</div>
				</div>

				{ (this.props.info !== null) && (
					<InfoModal
						type={this.props.info.type}
						message={this.props.info.message}
						field={this.props.info.field} />
				) }
				{ (this.props.error !== null) && (
					<InfoModal
						type={this.props.error.type}
						message={this.props.error.message}
						field={this.props.error.field} />
				) }
			</div>
		);
	}

	render() {
		console.log('[RENDER] SocialModal - ./wrapper/social_modal.js');
		console.log('Error: ', this.props.error);
		
		if(this.props.isLock !== null && this.props.isLock) {
			return this.renderAccountLock();
		} else {
			return this.renderAddAccount();
		}
	}
}


function mapStateToProps(state) {
  return {
		error: state.info.accountsError,
		info: state.info.accountsInfo,
		isLock: state.socialAccounts.accountLock
  };
}

export default connect(mapStateToProps, actions)(SocialModal);