import React, { Component } from 'react';

import AccountInfo from './edit_account_info';
import AccountPassword from './edit_account_password';

class SettingsEditAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPassword: false
		}
	}

	render() {
		return (
			<div className="col-md-12 col-lg-6">
				<div className="edit-account-container white-box">
					<h3>Edit account</h3>

					{ !this.state.isPassword ? <AccountInfo /> : <AccountPassword /> }

					<div className="edit-account__buttons">
						<button className="edit-account__save">SAVE CHANGES</button>
						<button
							onClick={() => this.setState({ isPassword: !this.state.isPassword })}
							className="edit-account__pwd">{ !this.state.isPassword ? 'CHANGE PASSWORD' : 'CHANGE INFO' }</button>
					</div>
				</div>
			</div>
		);
	}
}


export default SettingsEditAccount;