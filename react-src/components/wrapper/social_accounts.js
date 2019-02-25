import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/social_accounts';

import ModalWindow from '../modal_window';
import SocialModal from './social_modal';

class SocialAccounts extends Component {
	constructor(props) {
		super(props);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.state = {
			isClicked: false,
			isActiveModal: false
		}
	}

	componentWillMount() {
		this.props.fetchSocialAccounts();		
		const currAcc = localStorage.getItem('currAcc');
		if (currAcc) {
		  this.props.fetchSocialAccountInfo(currAcc);
		}
	}

	isEnableButton() {
		if(!this.props.isPaid) {
			return false;
		}
		if(this.props.currentPlan === null) {
			return false;
		}
		if(this.props.currentPlan.length === 0) {
			return false;
		}

		return true;
	}

	// Helper function for rendiring accounts
	renderAccounts() {
		return this.props.accounts.map(account => {
			if(this.props.currentAccount.id === account.id) {
				return <div style={{ display: 'none' }}></div>
			}	else {
				return (
					<li
						onClick={() => this.props.setCurrentAccount(account)}
						key={account.id}>
						<a className="profile-pic">
							<img src={account.insta_pic_url} style={{width: 45}} className="img-circle"/>
							<b>{`@${account.login}`}</b>
						</a>
					</li>
				);
			}
		});
	}


	renderAccountsDropdown() {
		return (
			<ul
				ref={node => { this.node = node; }}
				style={{display: 'block'}}
				className="dropdown-menu dropdown-user">

				{this.renderAccounts()}

				<li>
					<button
						onClick={() => this.showModal()}
						className="btn btn-info btn-outline visible-sm visible-xs">
						<i className="fa fa-plus m-r-5"></i>
						<span>Add</span>
					</button>
				</li>
			</ul>
		);
	}

	// Handing outside click for toggling account list (dropdown)
	handleOutsideClick(event) {
		if (this.node.contains(event.target)) {
			return;
		}

		this.toggleAccounts();
	}

	toggleAccounts(event) {
		if (this.state.isClicked) {
			document.removeEventListener('click', this.handleOutsideClick, false);
			document.removeEventListener('touchstart', this.handleOutsideClick, false);
		} else {
			document.addEventListener('click', this.handleOutsideClick, false);
			document.addEventListener('touchstart', this.handleOutsideClick, false);
		}

		this.setState(prevState => ({
			isClicked: !prevState.isClicked
		}));
	}

	showModal() {
		if(this.isEnableButton()) {
			this.setState({ isActiveModal: true });
		} else {
			// pop-up
		}
	}

	closeModal() {
		this.setState({ isActiveModal: false });
	}

	render() {
		console.log('[RENDER] SocialAccounts - ./wrapper/social_accounts.js');		

		return (
			<ui className="nav navbar-top-links navbar-left">
				<li className="dropdown">
					<a
						onClick={() => this.toggleAccounts()}
						className="dropdown-toggle profile-pic">
						<img 
							src={`${this.props.currentAccount.insta_pic_url ? this.props.currentAccount.insta_pic_url : './assets/images/icons/ava-insta.png'}`} 
							style={{width: 36}} className="img-circle"/>
						<b
							className="hidden-xs"
							style={{width: '36px'}}>
							{(!this.props.currentAccount.login) ? 'No Accounts' : `@${this.props.currentAccount.login}`}
						</b>
						<span className="caret"></span>
					</a>


					{ (this.state.isClicked) && this.renderAccountsDropdown() }
				</li>

				<li className="m-l-5">
					<button
						onClick={() => this.showModal()}
						className="btn btn-info btn-outline hidden-sm hidden-xs">
						<i className="fa fa-plus m-r-5"></i>
						<span>
							Add
							<span className="hidden-xs"> social account</span>
						</span>
					</button>
				</li>

				{ this.state.isActiveModal && (
					<ModalWindow onClose={this.closeModal}>
						<SocialModal onClose={this.closeModal} />
					</ModalWindow>
				) }
			</ui>
		);
	}
}


function mapStateToProps(state) {
	return {
		accounts: state.socialAccounts.list,
		currentAccount: state.socialAccounts.currentAccount,
		currentPlan: state.billing.currPlan,
		isPaid: state.app.isPaid
	}
}

export default connect(mapStateToProps, actions)(SocialAccounts);