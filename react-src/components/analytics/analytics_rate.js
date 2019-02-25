import React, { Component } from 'react';
import { connect } from 'react-redux';

import Preloader from '../preloader';

import * as analyticsActions from '../../actions/analytics';
import AnalyticsChart from './analytics_chart';


class AnalyticsRate extends Component {
	getTotal() {
		if(this.props.data !== null) {
			return this.props.data.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
		}
	}

	render() {
		console.log('[RENDER] AnalyticsRate - ./analytics/analytics_rate.js');
		
		return (
			<div className="likes2-container white-box">
				<div className="analytics__header">
					<h3>Engagement Rate</h3>
					<div className="analytics__ui">
						<div className="analytics__title">Likes</div>
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
						<AnalyticsChart data={this.props.data} header='ER' />
					) }
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		data: state.analytics.ER
	}
}

export default connect(mapStateToProps, analyticsActions)(AnalyticsRate);