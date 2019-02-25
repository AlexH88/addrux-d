import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import SelectedPlan from './billing_selected_plan';
import Payment from './billing_payment';


class Billing extends Component {
	componentWillMount() {
		if(this.props.plan === null) {
			browserHistory.push('/pricing');
		}
	}

	render() {
		console.log('[RENDER] Billing - ./settings/billing.js', this.props.plan);		
		
		if(this.props.plan === null) {
			browserHistory.push('/pricing');
			return null;
		} else {
			return (
				<div className="container-fluid">
					<div className="row">
						<div className="col-lg-12">
							<h2 className="main-title">Payment</h2>
						</div>
					</div>
	
					<div className="payment">
						<SelectedPlan />
	
						<Payment />
					</div>
				</div>
			);
		}
	}
}


function mapStateToProps(state) {
	return {
		plan: state.billing.selectedPlan
	}
}

export default connect(mapStateToProps)(Billing);