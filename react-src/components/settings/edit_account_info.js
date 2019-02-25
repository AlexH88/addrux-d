import React, { Component } from 'react';


class AccountInfo extends Component {
	render() {
		return (
			<div className="edit-account__form row">
				<div className="form-group col-xs-12 col-sm-12 col-md-9 col-lg-7">
					<label>NAME</label>
					<input
						placeholder='John Doe'
						type="text"
						className="form-control"/>
				</div>

				<div className="form-group col-xs-12 col-sm-12 col-md-9 col-lg-7">
					<label>EMAIL ADDRESS</label>
					<input
						placeholder='email@example.com'
						type="email"
						className="form-control"/>
				</div>
			</div>
		);
	}
}


export default AccountInfo;