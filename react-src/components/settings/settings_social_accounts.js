import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../../actions/menu';

import Account from './account';
import ModalWindow from '../modal_window';
import SocialModal from '../wrapper/social_modal';

class SettingsSocialAccounts extends Component {
	constructor(props) {
		super(props);

		this.closeModal = this.closeModal.bind(this);

		this.state = {
			isActiveModal: false
		}
	}

	closeModal() {
		this.setState({ isActiveModal: false });
	}

	showModal() {
		this.setState({ isActiveModal: true });
	}

	renderAccounts() {
		return this.props.accounts.slice(0, 3).map(account => {
			return <Account key={account.id} account={account} />;
		});
	}

	render() {
		console.log('[RENDER] SettingsSocialAccounts - ./settings/settings_social_accounts.js');
		
		return (
			<div className="col-md-12 col-lg-6">
				<div className="accounts-container white-box">
					<h3>Social accounts</h3>

					<div className="accounts">
						{ this.renderAccounts() }
					</div>

					<div className="accounts__buttons">
						<button
							style={{ display: `${this.props.isPaid ? '' : 'none'}` }}
							onClick={() => this.showModal()}
						 	className="accounts__add">
							<i className="fa fa-plus"></i>
							<span>ADD SOCIAL ACCOUNTS</span>
						</button>

						<button
							onClick={() => this.props.setActiveLink('/social-accounts')}
						 	className="accounts__view">
							<Link to='/social-accounts'>VIEW ALL ACCOUNTS</Link>
						</button>
					</div>
				</div>

				{ this.state.isActiveModal && (
					<ModalWindow onClose={this.closeModal}>
						<SocialModal onClose={this.closeModal} />
					</ModalWindow>
				) }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		accounts: state.socialAccounts.list,
		isPaid: state.app.isPaid
	}
}

export default connect(mapStateToProps, actions)(SettingsSocialAccounts);