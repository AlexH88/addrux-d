import React, { Component } from 'react';
import Select from 'react-select';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';

import * as timezoneActions from '../../actions/timezone';


class SelectCity extends Component {
	render() {
		console.log('[RENDER] SelectCity - ./publishing/select_city.js');
		
		return (
			<div className="settings-city">
				<Select
					name='select-city'
					value={this.props.currentTimezone}
					options={this.props.timezones}
					onChange={(value) => this.props.setCurrentTimezone(value)}
					className="city" />
				<i className="fa fa-cog" aria-hidden="true"></i>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		currentTimezone: state.timezones.currentTimezone,
		timezones: state.timezones.list
	}
}

export default connect(mapStateToProps, timezoneActions)(SelectCity);