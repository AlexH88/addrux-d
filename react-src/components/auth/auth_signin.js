import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LoadingIcon from '../loading';
import * as actions from '../../actions';


class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			isValidPwd: true,
			isValidEmail: true,
			passwordError: ''
		}
	}

	handleFormSubmit() {
		this.validateEmail();
		this.validatePassword();
		if(this.state.isValidEmail && this.state.isValidPwd && !this.props.isLoading) {
			this.props.authLoading(true);

			const email = this.state.email;
			const password = this.state.password;
	
			this.props.signinUser({ email, password });
		}
	}

	handleEmail(email) {
		this.setState({ email: email.trim() });
	}

	validateEmail() {
		const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(this.state.email && this.state.email.match(regexp)) {
			this.setState({ isValidEmail: true });
		} else {
			this.setState({ isValidEmail: false });
		}
	}

	handlePassword(password) {
		this.setState({ password: password.trim() });
	}

	validatePassword() {
		console.log('Sign In: validation password - ', this.state.password);

		if(this.state.password && this.state.password.indexOf(' ') > 0) {
			this.setState({ 
	        isValidPwd: false,
	        passwordError: 'Пробелы не требуются.'
	      });
		} 
		else if(this.state.password.search(/[a-z]/i) < 0) {
			this.setState({ 
        isValidPwd: false,
        passwordError: 'Введите хотя бы одну букву.'
      });
		}
		// else if(this.state.password.search(/[0-9]/) < 0) {
		// 	this.setState({ 
    //     isValidPwd: false,
    //     passwordError: 'Require one digit.'
    //   });
		// }
    else if(this.state.password && this.state.password.length < 6) {
      this.setState({ 
        isValidPwd: false,
        passwordError: 'Требуется более 5 символов.'
      });
    }
    else {
			this.setState({ 
        isValidPwd: true,
        passwordError: ''
      });
		}
	}

	render() {
		return (
			<div className="left-side__inner">
				<div className="left-side__head">
					<h1 className="text">Войти</h1>
					{/*
					<p className="descr">Enter your details below.</p>
					*/}
				</div>

				<div className="left-side__body">
					<div className="form__wrap">
						<form className="form">
							<div className="form__inner">
								<div className="field">
									<label className="field__label">ВАШ EMAIL</label>
									<input
										value={this.state.email}
										onChange={e => this.handleEmail(e.target.value)}
										onBlur={e => this.validateEmail()}
										type="email"
										className={`field__input ${this.state.isValidEmail ? '' : 'field__input_error'}`} 
										placeholder="social@adrux.com"/>
									{ !this.state.isValidEmail && (
										<label className="field__label field__label_error">Введите корректный email</label>
									) }
								</div>

								<div className="field">
									<label className="field__label">ВАШ ПАРОЛЬ</label>
									<input
										value={this.state.password}
										onChange={e => this.handlePassword(e.target.value)}
										onBlur={e => this.validatePassword()}
										type="password"
										className={`field__input ${this.state.isValidPwd ? '' : 'field__input_error'}`}
										placeholder="Введите ваш пароль"/>
									<Link className='field__link' to='https://www.instagram.com/accounts/password/reset/'>Забыли пароль?</Link>
									{ !this.state.isValidPwd && (
										<label className="field__label field__label_error">{this.state.passwordError}</label>
									) }
								</div>

								<div className="field">
									<div className="butn-block">
										<button
						                    disabled={this.props.isLoading}
						                    onClick={(e) => { e.preventDefault(); this.handleFormSubmit(); }}
						                    className="butn butn--main">
						                    { this.props.isLoading ? <LoadingIcon /> : 'Продолжить' }
					                    </button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    isLoading: state.app.isAuthLoading
  }
}

export default connect(mapStateToProps, actions)(SignIn);