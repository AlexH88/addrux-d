import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fromUTC } from '../../actions/timezone';


class BillingItem extends Component {
	renderPlanName() {
		if(this.props.plans !== null) {
			for (var i = 0; i < this.props.plans.length; i++) {
				if(this.props.plans[i].id === this.props.item.plan) {
					return this.props.plans[i].name;
				}
			}
		}
		
	}

	render() {
		const _date = moment(this.props.item.created_at); 
		const date = fromUTC(_date, localStorage.getItem('_timezone'));

		return (
			<tr>
				{/* <td>{`@${this.props.account}`}</td> */}
				<td>{ this.renderPlanName() }</td>
				<td>{ date.format('DD MMM YYYY') }</td>
				<td>{`-${this.props.item.amount}$`}</td>
			</tr>
		);
	}
}


function mapStateToProps(state) {
	return {
		plans: state.billing.plans
	}
}


export default connect(mapStateToProps)(BillingItem);