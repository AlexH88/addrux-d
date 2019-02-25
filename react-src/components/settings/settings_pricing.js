import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as billingActions from '../../actions/billing';
import ToggleButton from 'react-toggle-button';
import Preloader from '../preloader';

import PricingCard from './pricing_card';
import { WEEKLY_CARDS, MONTHLY_CARDS } from './cards';


class SettingsPricing extends Component {
	constructor(props){
		super(props);

		this.state = {
			isMonthly: false
		}
	}

	componentWillMount() {
		this.props.fetchPlans();		
	}

	renderCards() {
		if(this.props.plans !== null) {
			return this.props.plans.map(card => {
				if(this.state.isMonthly) {
					if(card.name === 'Trial') {
						return <div style={{ display: 'none' }}></div>;
					}
				}

				return <PricingCard
									monthly={this.state.isMonthly}
									key={`${card.name}_w-component`}
									card={card} />
			});
		} else {
			return <Preloader />;
		}
	}


	render() {
		console.log('[RENDER] SettingsPricing - ./settings/settings_pricing.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Pricing</h2>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-12">
						<div className="billing">
							<span>Weekly billing</span>
							<ToggleButton
								value={this.state.isMonthly}
								inactiveLabel={''}
		  					activeLabel={''}
		  					colors={{ active: {base: 'rgb(66, 166, 227)'},
		  										inactive: {base: 'rgb(151,164,177)'}
		  									}}
		  					containerStyle={{width: '30px'}}
		  					activeLabelStyle={{ width:'15px' }}
		  					inactiveLabelStyle={{ width:'15px' }}
		  					thumbAnimateRange={[1, 17]}
		  					trackStyle={{height: '10px', width: '30px'}}
		  					thumbStyle={{height: '13px', width: '13px'}}
								onToggle={(isMonthly) => {
									this.setState({isMonthly: !isMonthly});
								}} />
							<span>
								Monthly billing
								<span className='billing__save'>(Save up to 30%)</span>
							</span>
						</div>
					</div>
				</div>

				<div className="pricing__cards">
					{ this.renderCards() }
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		plans: state.billing.plans
	}
}

export default connect(mapStateToProps, billingActions)(SettingsPricing);