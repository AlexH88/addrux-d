import React, { Component } from 'react';
import { connect } from 'react-redux';

import Account from './account';
import ModalWindow from '../modal_window';
import SocialModal from '../wrapper/social_modal';


class SettingsAllSocialAccounts extends Component {
	constructor(props) {
		super(props);

		this.closeModal = this.closeModal.bind(this);

		this.state = {
			pageCounter: 0,
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
		return this.props.accounts
			.slice(0, (6 * this.state.pageCounter) + 6)
			.map(account => {
				return <Account key={account.id} account={account} />
			});
	}

	loadMoreHandle() {
		if( this.props.accounts.length > (6 + (6 * this.state.pageCounter)) ) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.accounts.length > 6) {
			return (
				<button 
					onClick={() => this.loadMoreHandle()}
					className="accounts__next">
					LOAD MORE
				</button>
			);
		}
	}

	render() {
		console.log('[RENDER] SettingsAllSocialAccounts - ./settings/settings_all_social_accounts.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Social accounts</h2>
					</div>
				</div>

				<div className="social-accounts row">
					<div className="col-md-12 col-lg-6">
						<div className="accounts-container white-box">
							<div className="accounts__header-button">
								<button
									style={{ display: `${this.props.isPaid ? '' : 'none'}` }}
									onClick={() => this.showModal()}
									className="accounts__add-social">
									<i className="fa fa-plus"></i>
									ADD SOCIAL ACCOUNTS
								</button>
							</div>

							<div className="accounts">
								<div className="account__scroll-container">
									{ this.renderAccounts() }
								</div>
							</div>

							<div className="accounts__buttons">
								{ this.renderLoadMoreButton() }
							</div>
						</div>
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

export default connect(mapStateToProps)(SettingsAllSocialAccounts);