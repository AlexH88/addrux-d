import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

class PlanDays extends Component {
	returnColor() {
		if(!this.props.isPaid) {
			return { display: 'none' }
		}
		if(this.props.expiredDays === null) {
			return { display: 'none' }
		}
		if(this.props.expiredDays < 2) {
			return { color: '#f33155' }
		} else {
			return { color: '#97a4b1' }
		}
	}

	render() {
		console.log('[RENDER] PlanDays - ./wrapper/plan_days.js', this.props.expiredDays);
		
		return (
			<li>
				<p 
					style={this.returnColor()}
					className="hidden-sm hidden-xs">
					<span className="days-count">{ this.props.expiredDays } </span>
					days remaining
				</p>
			</li>
		);
	}
}


function mapStateToProps(state) {
	return {
		expiredDays: state.billing.planExpiredDays,
		isPaid: state.app.isPaid
	}
}

export default connect(mapStateToProps)(PlanDays);