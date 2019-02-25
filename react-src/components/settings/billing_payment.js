import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import * as billingActions from '../../actions/billing';
import * as infoActions from '../../actions/info';
const actions = Object.assign({}, billingActions, infoActions);
import { connect } from 'react-redux';
import InfoModal from '../info_modal_window';
import LoadingIcon from '../loading';


let stripe;
let stripeElements;
let card;
let paymentRequest;
let prButton;

const STRIPE_TOKEN = 'pk_live_Hh5zBZpMltBltzvFrAXkKkVR';

class Payment extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			isLoading: false
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.info !== null && nextProps.info !== null) {
			if(this.props.info.message != nextProps.info.message) {
				return true;
			}
		}

		return true;
	}

	componentWillMount() {
		stripe = null;
		stripeElements = null;
		card = null;
	}

	componentWillUnmount() {
		card.unmount();
	}

	componentDidMount() {
		stripe = Stripe(STRIPE_TOKEN);
		stripeElements = stripe.elements();

		card = stripeElements.create('card', {
			hidePostalCode: true,
			style: {
				base: {
					iconColor: '#F99A52',
					color: '#32315E',
					lineHeight: '48px',
					fontWeight: 400,
					fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
					fontSize: '15px',
		
					'::placeholder': {
						color: '#CFD7DF',
					}
				},
			}
		});
		card.mount('.details__input');

		paymentRequest = stripe.paymentRequest({
			country: 'US',
			currency: 'usd',
			total: {
				label: this.props.plan.name,
				amount: this.props.plan.type === 'monthly' ? this.props.plan.price_per_month : this.props.plan.price_per_week,
			},
		});
		prButton = stripeElements.create('paymentRequestButton', {
			paymentRequest,
		});
		paymentRequest.canMakePayment().then((result) => {
			if (result) {
				prButton.mount('#payment-request-button');
			} else {
				document.getElementById('payment-request-button').style.display = 'none';
			}
		});
		paymentRequest.on('token', (ev) => {
			this.props.selectPlan(this.props.plan.id, result.token.id);
		});
	}

	submitHandle(event) {
		event.preventDefault();
		
		if(this.state.isLoading) {
			return;
		}
	
		this.setState({ isLoading: true });
		// this.props.plansInfo({
		// 	type: 'info',
		// 	field: 'plans_info',
		// 	message: 'Payment is due. Please wait.'
		// });

		stripe.createToken(card).then(result => {
			if (result.error) {
				console.log('Stripe (error): ', result);
				this.props.plansInfo({
					type: 'error',
					field: 'plans_error',
					message: 'An error occurred while paying. Please refresh the page and try again.'
				});
			} else {
				console.log('Stripe (success): ', result);
				this.props.plansInfo({
					type: 'info',
					field: 'plans_info',
					message: 'Payment was successful.'
				});
				this.props.selectPlan(this.props.plan.id, result.token.id);
				this.setState({ isLoading: false });
			}
		});	
	}

	renderPrice() {
		if(this.props.plan.type === 'monthly') {
			return this.props.plan.price_per_month;
		} else {
			return this.props.plan.price_per_week;
		}
	}

	render() {
		// console.log('components/billing_payment: (Payment) - ', this.props.plan);
		console.log('[RENDER] Payment - ./settings/billing_payment.js', this.props.info);		

		return (
			<div className="payment__billing-container white-box">
				<h3>Billing</h3>

				<div className="payment__billing">
					<div className="billing__header">
						<span className="current_billing">
							{`$${this.props.plan.type === 'monthly' ? this.props.plan.price_per_month : this.props.plan.price_per_week}/
								${this.props.plan.type === 'monthly' ? 'Monthly' : 'Weekly'}`}
						</span>
						{/* <span className="next_billing">{`${this.props.plan.price_per_month}$/Monthly`}</span> */}
						<div className="header__description">
							Paid Weekly With Automatic Renewal, Cancel anytime
						</div>
					</div>

					<div className="payment__border"></div>

					<div className="payment__credit-card">
						<div className="credit-card__details">
							<label htmlFor="details__input" className="details__label">Enter card details</label>
							{/* <input type="text" className="details__input form-control"/> */}
							<div className="details__input form-control"></div>
						</div>

						<div className="credit-card__price">
							Total:
							<span>{` $${this.renderPrice()}`}</span>
						</div>

						<button 
							disabled={this.state.isLoading}
							onClick={(e) => this.submitHandle(e)}
							className="credit-card__button">
							{ this.state.isLoading ? <LoadingIcon /> : 'SUBSCRIBE' }
						</button>

						<div id="payment-request-button">
							
						</div>

						<div className="credit-card__safe">
							<span className="fa fa-lock"></span>
							Transactions are secure & encrypted
						</div>

						<div className="credit-card__description">*All prices are in USD</div>

						<div className="payment__border"></div>

						<div className="credit-card__discount">
							<div className="discount__text">Have a coupon code?</div>
							<div className="discount__form">
								<input type="text" className="discount__input" typr="text"/>
								<button className="discount__button">Apply coupon</button>
							</div>
						</div>
					</div>
				</div>

				{ (this.props.info !== null) && (
					<InfoModal
						type={this.props.info.type}
						message={this.props.info.message}
						field={this.props.info.field} />
				) }
				{ (this.props.error !== null) && (
					<InfoModal
						type={this.props.error.type}
						message={this.props.error.message}
						field={this.props.error.field} />
				) }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		plan: state.billing.selectedPlan,
		info: state.info.plansInfo,
		error: state.info.plansError
	}
}

export default connect(mapStateToProps, actions)(Payment);