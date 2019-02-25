import React, { Component } from 'react';

import Calendar from './calendar';


class Schedule extends Component {
	render() {
		console.log('[RENDER] Schedule - ./publishing/schedule.js');
		
		return (
			<div className="lib__calendar white-box">
				<Calendar />
			</div>
		);
	}
}


export default Schedule;