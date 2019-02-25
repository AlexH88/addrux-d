import React, { Component } from 'react';
import { VictoryLine,
				 VictoryChart,
				 VictoryAxis,
				 VictoryTooltip,
				 VictoryStack,
				 VictoryScatter,
				 VictoryVoronoiContainer } from 'victory';
import moment from 'moment';


class CustomFlyout extends Component {
  render() {
    const {x, y} = this.props;

    let newX;
    if(x < 50) newX = x;
    if(x >= 50) newX = x - 50;

    let newY;
    if(y < 200) newY = y + 25;
    if(y >= 200) newY = y - 100;

    return (
			<svg className='chart__tooltip'>
				<rect
					x={newX}
					y={newY}
					style={{width: 123, height: 94, fill: 'rgba(0,0,0,.2)'}} />
				<rect
					x={newX} y={newY}
					style={{width: 120, height: 90, fill: '#fff'}} />
				<text stroke='none' fill='#54667a' x={newX + 15} y={newY + 25}>{this.props.datum.date}</text>
				<text stroke='none' fill='#2cabe3' x={newX + 15} y={newY + 55}>{this.props.header}</text>
				<text stroke='none' fill='#54667a' x={newX + 15} y={newY + 75}>{`+${this.props.datum.value}`}</text>
			</svg>
    );
  }
}


class AnalyticsChart extends Component {
	render() {
		let tickValues = [];
		let tickFormat = [];
		let data = [];

		this.props.data.forEach((item, index) => {
			if(this.props.data.length >= 20) {
				if(index % 2 === 1) {
					tickValues.push(item.value);
					tickFormat.push(moment(item.date).format('DD MMM'));
	
					data.push({
						date: moment(item.date).format('DD MMM'),
						value: item.value
					});
				}
			} else {
				tickValues.push(item.value);
				tickFormat.push(moment(item.date).format('DD MMM'));

				data.push({
					date: moment(item.date).format('DD MMM'),
					value: item.value
				});
			}
		});

		return (
			<div className="chart-wrapper">
				<VictoryChart style={{overflow: 'visible'}} width={690} height={300} containerComponent={<VictoryVoronoiContainer/>} >
					<VictoryAxis
						style={{axis: {stroke: "transparent"}}}
						tickFormat={tickFormat} />
					<VictoryAxis
						dependentAxis
						tickFormat={(x) => ''}
						style={{axis: {stroke: "transparent"}}} />
					<VictoryLine
						data={data}
						x='date'
						y='value'
						style={{
							data: {stroke: '#2cabe3', width: 20},
							labels: {fill: 'tomato'},
						}} />
					<VictoryScatter
						labelComponent={<VictoryTooltip
															flyoutComponent={<CustomFlyout header={this.props.header}/>}
															renderInPortal={false} />}
						labels={(d) => ''}
						style={{
					    parent: {
					      border: "1px solid blue"
					    },
					    data: {
					      fill: "#fff", stroke: "#2cabe3", strokeWidth: 2
					    },
					    labels: {
					      fontSize: 15, fill: "#2cabe3", padding: 15
					    }
					  }}
						x='date'
						y='value'
						data={data} />
				</VictoryChart>
			</div>
		);
	}
}

export default AnalyticsChart;