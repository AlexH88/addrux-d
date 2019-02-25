import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as analyticsActions from '../../actions/analytics';

import AnalyticsFollowers from './analytics_followers';
import AnalyticsLikes from './analytics_likes';
import AnalyticsComments from './analytics_comments';
import AnalyticsRate from './analytics_rate';

import ExportAnalitycs from './export_analytics';
import ModalWindow from '../modal_window';


class Analytics extends Component {
	
	constructor(props) {
		super(props);
		
		this.closeModal = this.closeModal.bind(this);
		
		this.state = {
			isActiveModal: false,
			selectAnalytics: { value: 'per 3 month', label: 'per 3 month' }
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			this.props.fetchAnalytics(this.state.selectAnalytics.value);
		}	

		return true;
	}
	
	componentWillMount() {
		this.props.fetchAnalytics('per 3 month');
	}
	
	closeModal() {
		this.setState({ isActiveModal: false });
	}

	showModal() {
		this.setState({ isActiveModal: true });
	}

	onSelectHandle(value) {
		this.setState({ selectAnalytics: value });
		this.props.fetchAnalytics(value.value);
	}

	render() {
		console.log('[RENDER] Analytics - ./analytics/analytics.js');
		
		const values = [
			{ value: 'per 1 week', label: 'per week' },
			{ value: 'per 2 week', label: 'per 2 week' },
			{ value: 'per 1 month', label: 'per 1 month' },
			{ value: 'per 3 month', label: 'per 3 month' },
			{ value: 'per 6 month', label: 'per 6 month' },
			{ value: 'per 12 month', label: 'per 12 month' },
		]

		return (
			<div className="container-fluid">
				<div className="row">

					<div className="page_header col-lg-12">
						<div className="headers">
							<h2 className="main-title">Analytics</h2>
							<h3 className="main-title">
								<Select
									name='select-analytics'
									value={this.state.selectAnalytics}
									options={values}
									onChange={(value) => this.onSelectHandle(value)} />
							</h3>
						</div>



						{ this.state.isActiveModal && (
							<ModalWindow onClose={this.closeModal}>
								<ExportAnalitycs onClose={this.closeModal} />
							</ModalWindow>
						) }
					</div>

				</div>

				<div className="analytics row">

					<div className="col-md-12 col-lg-6">
						<AnalyticsFollowers />
					</div>

					<div className="col-md-12 col-lg-6">
						<AnalyticsLikes />
					</div>

					<div className="col-md-12 col-lg-6">
						<AnalyticsComments />
					</div>

					<div className="col-md-12 col-lg-6">
						<AnalyticsRate />
					</div>

				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps, analyticsActions)(Analytics);

// <div className="header__btn">
// 	<button onClick={() => this.showModal()}>EXPORT PDF, XLS, CSV</button>
// </div>