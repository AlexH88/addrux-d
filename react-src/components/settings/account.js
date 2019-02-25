import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import UpdateSocialModal from './update_social_account';
import ModalWindow from '../modal_window';

import * as actions from '../../actions/social_accounts';

class Account extends Component {
	constructor(props) {
		super(props);

		this.closeModal = this.closeModal.bind(this);

		this.state = {
			isEditing: false
		}
	}

	closeModal() {
		this.setState({ isEditing: false });
	}

	render() {
		return (
			<div className="account">
				<div className="account__left">
					<div className="account__img img-responsive">
						<img src={this.props.account.insta_pic_url} alt=""/>
					</div>

					<div className="account__name">{`@${this.props.account.login}`}</div>
				</div>

				<div className="account__right">
					<div className="account__status">
						Status:
						<span>Ok</span>
					</div>

					<div
						onClick={() => this.setState({ isEditing: true })}
						className="account__edit">
						<Link>Edit</Link>
					</div>

					<div className="account__remove">
						<Link onClick={() => this.props.deleteSocialAccount(this.props.account.id)}>Remove</Link>
					</div>
				</div>

				{ this.state.isEditing && (
					<ModalWindow onClose={this.closeModal}>
						<UpdateSocialModal account={this.props.account} onClose={this.closeModal} />
					</ModalWindow>
				) }
			</div>
		);
	}
}


export default connect(null, actions)(Account);