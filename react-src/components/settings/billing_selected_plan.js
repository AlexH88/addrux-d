import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { WEEKLY_CARDS } from './cards';

class SelectedPlan extends Component {
	renderOffers(description) {
		const offers = description.split(/\r?\n/);
		return offers.map((offer, index) => {
			const tooltip = offer.replace( /(^.*\[|\].*$)/g, '');
			const pos = offer.indexOf('[');
			const offer_ = offer.substring(0, pos);
			const key = `${this.props.plan.name}_${index}`;
			
			return (
				<div
					className={`card__offer ${(offer.startsWith("You don't have")) ? 'offer_disable' : ''}`}
					key={key}>
					<p 
						dangerouslySetInnerHTML={{ __html: offer_ }} 
						data-tip data-for={key}>
					</p>

					<ReactTooltip id={key} type='dark' effect='solid'>
						<span>
							{ tooltip }
						</span>
					</ReactTooltip>
				</div>
			);
		});
	}

	render() {
		console.log('[RENDER] SelectedPlan - ./settings/billing_selected_plan.js');		
		
		return (
			<div className="payment__plan-container white-box">
				<h3>Selected Plan</h3>

				<div className="payment__plan">
					<h5 className="card__header">{ this.props.plan.name }</h5>

					<div className="card__offers">
						{ this.renderOffers(this.props.plan.description) }
					</div>
				</div>

				<div className="payment__border"></div>

				<div className="payment__clients">
					<h5 className="card__header">Our happy clients</h5>
					<div className="clients__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, commodi.</div>
					<div className="clients__instagram">
						<div className="clients__img">
							<img src="./assets/images/pawandeep.jpg" alt="client-img" className="img-responsive img-circle"/>
						</div>
						<div className="clients__info">
							<div className="instagram__name">@kissme</div>
							<div className="instagram__date">11:11 AM 20 May 2017</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		plan: state.billing.selectedPlan
	}
}

export default connect(mapStateToProps)(SelectedPlan);