import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as billingActions from '../../actions/billing';
import * as menuActions from '../../actions/menu';
const actions = Object.assign({}, billingActions, menuActions);


class SettingsSubscription extends Component {
	renderPlanName() {
		if(this.props.plans !== null) {
			// this.props.plans.forEach(plan => {
			// 	console.log('Plan ID: ', plan.id, ' || ', this.props.plan[0].plan);
			// 	if(plan.id === this.props.plan[0].plan) {
			// 		console.log('Returned name: ', plan.name);
			// 	}
			// });
			for (var i = 0; i < this.props.plans.length; i++) {
				if(this.props.plans[i].id === this.props.plan[0].plan) {
					return this.props.plans[i].name;
				}
			}
		}
		
	}

	renderAccountsCounter() {
		if(this.props.plan[0].plan === 6) {
			return 1;
		} else {
			return 5;
		}
	}

	onChangeBillingHandler() {
		const type = this.props.plan[0].plan_type === 1 ? 'weekly' : 'monthly';
		this.props.plans.forEach(plan => {
			if(plan.id === this.props.plan[0].plan) {
				this.props.selectingPlan(plan, type);
			}
		});
	}

	render() {
		// console.log('Subscription: ', this.props.plan);
		console.log('[RENDER] SettingsSubscription - ./settings/settings_subscription.js', this.props.plan);		

		if(this.props.plan[0]) {
				return (
					<div className="col-md-12 col-lg-6">
						<div className="subscription-container white-box">
							<h3>Subscription</h3>

							<div className="subscription">
								<div className="subscription__plan">
									<span>Your plan</span>
									<div className="plan__name">{ this.renderPlanName() }</div>
								</div>

								<div className="subscription__cost">
									<div className="cost__money">
										<span className="money__dollar">$</span>
										<span className="meney__counter">{ this.props.plan[0].amount }</span>
									</div>

									<div className="cost__info">{`${this.props.plan[0].plan === 1 ? '1st week Trial' : ''}`}</div>
								</div>

								<div className="subscription__account">
									<div className="account__counter">
										<span>{this.renderAccountsCounter()}</span>
										social account
									</div>
								</div>

								<div 
									style={{ display: `${this.props.isPaid ? '' : 'none'}` }}
									className="subscription__days">
									<div className="days__counter">
										<span>{ this.props.expiredDays }</span>
										days remaining
									</div>
								</div>
							</div>

							<div className="subscription__buttons">
								<button
									onClick={() => this.props.setActiveLink('/pricing')}
									className="subscription__change-plan">
									<Link to='/pricing'>CHANGE PLAN</Link>
								</button>
								<button 
									onClick={() => this.onChangeBillingHandler()}
									className="subscription__billing">
									<Link to='/payment'>CHANGE BILLING INFORMATION</Link>
								</button>
							</div>
						</div>
					</div>
				);
		} else {
			return (
				<div className="col-md-12 col-lg-6">
					<div className="subscription-container white-box">
						<h3>Loading...</h3>
					</div>
				</div>
			);
		}
	}
}


function mapStateToProps(state) {
	return {
		plan: state.billing.currPlan,
		isPaid: state.app.isPaid,
		plans: state.billing.plans,
		expiredDays: state.billing.planExpiredDays
	}
}

export default connect(mapStateToProps, actions)(SettingsSubscription);