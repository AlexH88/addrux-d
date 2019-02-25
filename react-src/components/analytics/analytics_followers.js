import React, { Component } from 'react';
import { connect } from 'react-redux';

import Preloader from '../preloader';

import * as analyticsActions from '../../actions/analytics';
import AnalyticsChart from './analytics_chart';


class AnalyticsFollowers extends Component {
	getTotal() {
		if(this.props.data !== null) {
			return this.props.data.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
		}
	}

	render() {
		console.log('[RENDER] AnalyticsFollowers - ./analytics/analytics_followers.js');
		
		return (
			<div className="followers1-container white-box">
				<div className="analytics__header">
					<h3>Total Followers</h3>
					<div className="analytics__ui">
						<div className="analytics__title">Followers</div>
						<div className="analytics__counter">
							<span>Total this month:</span>
							<span>{`+${this.getTotal()}`}</span>
						</div>
					</div>
				</div>

				<div className="analytics__chart">
					{ this.props.data === null ? (
						<div style={{height: 300}}>
							<Preloader />
						</div>
					) : (
						<AnalyticsChart data={this.props.data} header='Followers' />
					) }
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		data: state.analytics.followers
	}
}

export default connect(mapStateToProps, analyticsActions)(AnalyticsFollowers);