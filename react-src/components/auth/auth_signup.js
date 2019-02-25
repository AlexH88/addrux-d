import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import InfoModal from '../info_modal_window';
import LoadingIcon from '../loading';
import * as infoActions from '../../actions/info';
import * as authActions from '../../actions';
const actions = Object.assign({}, infoActions, authActions);

class SignUp extends Component {
  constructor(props) {
		super(props);

		this.state = {
      email: '',
			// username: '',
      password: '',
      isValidPwd: true,
      isValidEmail: true,
      passwordError: ''
      // isValidUsername: true
		}
  }
  
  handleFormSubmit() {
    // this.validateUsername();
    this.validatePassword();
    this.validateEmail();
    if(this.state.isValidEmail && this.state.isValidPwd && !this.props.isLoading) {
      this.props.authLoading(true);
      this.props.authInfo({
        type: 'info',
        field: 'auth_info',
        message: 'Выполняется. Пожалуйста, подождите.'
      });
  
      // const username = this.state.username;
      const password = this.state.password;
      const email = this.state.email;
  
      this.props.signupUser({ password, email });
    }
  }

  // handleUsername(username) {
	// 	this.setState({ username: username.trim() });
	// }
  // validateUsername() {
  //   if(this.state.username && this.state.username.indexOf(' ') < 0) {
	// 		this.setState({ isValidUsername: true });
	// 	} else {
	// 		this.setState({ isValidUsername: false });
	// 	}
  // }

	handlePassword(password) {
		this.setState({ password: password.trim() });
  }
  validatePassword() {
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
  
  handleEmail(email) {
    this.setState({ email: email.trim() });
  }
  validateEmail(email) {
		const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(this.state.email && this.state.email.match(regexp)) {
			this.setState({ isValidEmail: true });
		} else {
			this.setState({ isValidEmail: false });
		}
	}

	render() {
		return (
      <div className="left-side__inner">
        <div className="left-side__head">
          <h1 className="text">Регистрация.</h1>
        </div>

        <div className="left-side__body">
          <div className="form__wrap">
            <form className="form">
            	<div className="form__inner">

                <div className="field">
                  <label htmlFor="inp-email" className="field__label">ВАШ EMAIL</label>
                  <input 
                    value={this.state.email}
                    onChange={e => this.handleEmail(e.target.value)}
										onBlur={e => this.validateEmail()}
                    id="inp-email" 
                    type="email" 
                    className={`field__input ${this.state.isValidEmail ? '' : 'field__input_error'}`} 
										placeholder="social@adrux.com"/>
									{ !this.state.isValidEmail && (
										<label className="field__label field__label_error">Введите корректный EMAIL</label>
									) }
                </div>
                
            		<div className="field">
									<label htmlFor="inp-pass" className="field__label">ВАШ ПАРОЛЬ</label>
									<input 
                    onChange={e => this.handlePassword(e.target.value)}
										onBlur={e => this.validatePassword()}
                    id="inp-pass" 
                    type="password" 
                    className={`field__input ${this.state.isValidPwd ? '' : 'field__input_error'}`} 
                    placeholder="более 5 символов"/>
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
                      { this.props.isLoading ? <LoadingIcon /> : 'ПРОДОЛЖИТЬ' }
                    </button>
            			</div>
            		</div>

            	</div>
            </form>
          </div>
        </div>

        <div className="left-side__footer">
        	<span className="text">Нажимая продолжить "ПРОДОЛЖИТЬ", Вы соглашаетесь с</span>
        	<Link to='https://adrux.com/terms.html' target='_blank' className="link">&nbsp;Правилами.</Link>
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
    info: state.info.authInfo,
    error: state.info.authError,
    isLoading: state.app.isAuthLoading
  }
}

export default connect(mapStateToProps, actions)(SignUp);