import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as followingActions from '../../actions/following';

class InputRange extends Component {
	shouldComponentUpdate() {
		return false;
	}


	componentDidMount() {
		$('#like__slider').slider();
		$('#like__slider').on('slide', event => {
			this.props.setLikesPerAccount(event.value);
		});
	}

	render() {
		const attrs = {
			'data-slider-id': 'like__sliderCss',
			'data-slider-min': "0",
			'data-slider-max': "20",
			'data-slider-step': "1",
			'data-slider-value': this.props.value
		}

		return (
			<input id='like__slider' type='text' {...attrs} />
		);
	}

}


export default connect(null, followingActions)(InputRange);