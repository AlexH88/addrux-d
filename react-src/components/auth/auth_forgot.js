import React, { Component } from 'react';
import { Link } from 'react-router';


class ForgotPassword extends Component {

	render() {

		return (

			<div className="left-side__inner">
				<div className="left-side__head">
					<h1 className="text">Sign in to AdRux.</h1>
					<p className="descr">Enter your details below.</p>
				</div>

				<div className="left-side__body">
					<div className="form__wrap">
						<form action="POST" className="form">
							<div className="form__inner">
								<div className="field">
									<label htmlFor="inp-email" className="field__label">Work email address</label>
									<input id="inp-email" type="email" className="field__input" placeholder="social@adrux.com"/>
								</div>

								<div className="field">
									<div className="butn-block">
										<button className="butn butn--main">Request reset link</button>
									</div>
								</div>

								<div className="field">
									<Link to='/signin' className='back2sign'>Back to sign in</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

		);

	}

}



export default ForgotPassword;