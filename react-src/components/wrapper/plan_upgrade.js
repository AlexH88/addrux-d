import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as menuActions from '../../actions/menu';


class PlanUpgrade extends Component {
	isShowUpgradePlan() {
		if(this.props.currentPlan[0] !== null && this.props.currentPlan[0]) {
			if(this.props.currentPlan[0].plan === 2) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	render() {
		console.log('[RENDER] PlanUpgrade - ./plan_upgrade.js');
		
		return (
			<li 
				style={{ display: `${this.isShowUpgradePlan() ? 'block' : 'none'}` }}
				className="m-r-5">
				<button className="btn btn-block btn-info hidden-sm hidden-xs">
					<Link
						onClick={() => this.props.setActiveLink('/pricing')}
						to='/pricing'>
						<span>
							Upgrade
							<span className="hidden-xs"> Plan</span>
						</span>
					</Link>
				</button>
			</li>
		);
	}
}


function mapStateToProps(state) {
	return {
		currentPlan: state.billing.currPlan
	}
}

export default connect(mapStateToProps, menuActions)(PlanUpgrade);