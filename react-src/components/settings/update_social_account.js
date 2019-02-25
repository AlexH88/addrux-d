import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as socialActions from '../../actions/social_accounts';
import * as info from '../../actions/info';
const actions = Object.assign({}, socialActions, info);
import { Link, browserHistory } from 'react-router';
import LoadingIcon from '../loading';
import InfoModal from '../info_modal_window';

class UpdateSocialModal extends Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handlePassword = this.handlePassword.bind(this);

		this.state = {
			login: this.props.account.login,
			password: '123456789',
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

		this.setState({ isLoading: true });

		this.props.accountsInfo({
			type: 'info',
			field: 'accounts_info',
			message: 'Updating account. Please, wait...'
		});

		const login = this.state.login;
		const password = this.state.password;

		this.props.updateSocialAccount({ login, password })
			.then(response => {
				console.log('update_social_account.js (HandleFormSubmit): Response - ', response);
				
				this.setState({ isLoading: false });

				if(response.error) {
					if(response.payload.response.status == 504) {
						this.props.accountsInfo({
							type: 'error',
							field: 'accounts_error',
							message: 'Sorry, but the service is temporarily not responding. Please try again later.'
						});
					} else {
						this.props.accountsInfo({
							type: 'error',
							field: 'accounts_error',
							message: 'Something goes wrong. Please, reload page and try again.'
						});
					}
				} else {
					this.props.fetchSocialAccounts();
					this.setState({ isLoading: false });
					this.props.onClose();
				}
			})
			.catch((error) => {
				console.log('update_social_account.js (HandleFormSubmit): Error - ', error);
				this.setState({ isLoading: false });

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

	render() {
		console.log('Editing social account: ', this.props.account);

		return (
			<div className="react-modal__wrapper">
				<div className="react-modal__header">
					<h2>Edit your social account</h2>
				</div>

				<div className="social-modal__instag">
					<div className="instag__img">
						<img src={this.props.account.insta_pic_url} alt=""/>
					</div>

					<div className="instag__letters">
						{ `@${this.props.account.login}` }
					</div>
				</div>

				<form
					onSubmit={() => handleFormSubmit()}
					className="social-modal__form">
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
							placeholder="@instagram"/>
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
							{ this.state.isLoading ? <LoadingIcon /> : 'UPDATE ACCOUNT' }
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
}


function mapStateToProps(state) {
	return {
		error: state.info.accountsError,
		info: state.info.accountsInfo
	}
}

export default connect(mapStateToProps, actions)(UpdateSocialModal);