import React, { Component } from 'react';


class AccountPassword extends Component {
	render() {
		return (
			<div className="edit-account__form row">
				<div className="form-group col-xs-12 col-sm-12 col-md-9 col-lg-7">
					<label>OLD PASSWORD</label>
					<input
						placeholder='******'
						type="password"
						className="form-control"/>
				</div>

				<div className="form-group col-xs-12 col-sm-12 col-md-9 col-lg-7">
					<label>NEW PASSWORD</label>
					<input
						placeholder='******'
						type="password"
						className="form-control"/>
				</div>

				<div className="form-group col-xs-12 col-sm-12 col-md-9 col-lg-7">
					<label>REPEAT NEW PASSWORD</label>
					<input
						placeholder='******'
						type="password"
						className="form-control"/>
				</div>
			</div>
		);
	}
}


export default AccountPassword;