import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactTooltip from 'react-tooltip';

import * as actions from '../../actions/billing';


/*
 * Fileds
 * card:
 *	- name (string)
 *	- price (number)
 *	- priceInfo (string)
 *	- isBest (bool)
 *	- offers (array of strings)
 *	- event on click
*/

class PricingCard extends Component {
	renderOffers(description) {
		const offers = description.split(/\r?\n/);
		return offers.map((offer, index) => {
			const tooltip = offer.replace( /(^.*\[|\].*$)/g, '');
			const pos = offer.indexOf('[');
			const offer_ = offer.substring(0, pos);
			const key = `${this.props.card.name}_${this.returnPrice()}_${index}`;
			
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

	returnPrice() {
		if(this.props.monthly) {
			return this.props.card.price_per_month;
		} else {
			return this.props.card.price_per_week;
		}
	}

	returnPriceInfo() {
		if(this.props.monthly) {
			return 'per month';
		} else {
			return 'per week';
		}
	}

	handleSelecting() {
		const type = this.props.monthly ? 'monthly' : 'weekly';
		this.props.selectingPlan(this.props.card, type)
	}
	
	render() {
		return (
			<div className="pricing__card white-box">
				<h5 className="card__header">{ this.props.card.name }</h5>

				<div className="card__cost">
					<div className="cost-container">
						<div className="cost__money">
							<span className="money__dollar">$</span>
							<span className="meney__counter">{ this.returnPrice() }</span>
						</div>
						{ this.props.card.name === 'Promotion & Communication' && (<div className="cost__best">THE BEST CHOICE</div>) }
					</div>

					<div className="cost__info">{ this.returnPriceInfo() }</div>
				</div>

				<div className="card__offers">
					{ this.renderOffers(this.props.card.description) }
				</div>

				<div className="card__button">
					<button
						onClick={() => this.handleSelecting()}
						className="btn-block">
						<Link to='/payment'>SELECT THIS PLAN</Link>
					</button>
				</div>
			</div>
		);
	}
}


export default connect(null, actions)(PricingCard);