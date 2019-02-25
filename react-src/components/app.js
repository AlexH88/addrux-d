import React, { Component } from 'react';

import Header from './wrapper/header';
import SideBar from './wrapper/sidebar';

import Preloader from './preloader';
import InfoModal from './info_modal_window';

import ModalWindow from './modal_window';
import GeoModal from './geo_modal';

import * as socialActions from '../actions/social_accounts';
import * as menuActions from '../actions/menu';
import * as notifActions from '../actions/notifications';
import * as billingActions from '../actions/billing';
import * as timezoneReducer from '../actions/timezone';
const actions = Object.assign({}, menuActions, 
																	socialActions, 
																	billingActions, 
																	notifActions, 
																	timezoneReducer);

import { connect } from 'react-redux';

class App extends Component {
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

	componentWillMount() {
		// this.props.fetchSocialAccounts();
		this.props.setActiveLink(this.props.location.pathname);

		this.props.getTimezones();
		this.props.getCurrentTimezone();
	}

	componentDidMount() {
		// const body = document.getElementsByTagName('body');
	}

	// componentWillUpdate() {
	// 	this.props.setActiveLink(this.props.location.pathname);
	// }


  render() {
		console.log('[RENDER] APP - ./app.js');
		
    return (
			<div id="wrapper">
				<Header />
				<SideBar />

				<div id="page-wrapper">
					{ this.props.children }
				</div>

				{/* { (this.props.info !== null) && (
					<InfoModal
						type={this.props.info.type}
						message={this.props.info.message}
						field={this.props.info.field} />
				) } */}

				{ this.state.isActiveModal && (
					<ModalWindow onClose={this.closeModal}>
						<GeoModal onClose={this.closeModal} />
					</ModalWindow>
				) }
			</div>
    );
  }
}


function mapStateToProps(state) {
	return {
		accounts: state.socialAccounts.list
	}
}


export default connect(mapStateToProps, actions)(App);