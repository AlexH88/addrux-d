import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import * as followingActions from '../../actions/following';

import InputRange from './_likes_slider';

class FollowersLikes extends Component {
	render() {
		console.log('[RENDER] FollowersLikes - ./followers/followers_likes.js');
		
		return (
			<div className="row" id="likes">
				<div className="col-xs-12 col-md-4 col-lg-3">
					<div className="checkbox checkbox-info">
						<input
							checked={this.props.isLikes}
							onChange={(event) => {
								this.props.setIsLikes(event.target.checked);
							}}
							type="checkbox"
							id="checkbox2" />
						<label htmlFor="checkbox2" className="ft-main">Likes</label>
					</div>
				</div>

				<div className="col-xs-12 col-md-4 switch-container">
					<ToggleButton
						value={this.props.isLikeFollowers}
						inactiveLabel={''}
  					activeLabel={''}
  					colors={{ active: {base: 'rgb(66, 166, 227)'},
  										inactive: {base: 'rgb(151,164,177)'}
  									}}
  					containerStyle={{width: '30px'}}
  					activeLabelStyle={{ width:'15px' }}
  					inactiveLabelStyle={{ width:'15px' }}
  					thumbAnimateRange={[1, 17]}
  					trackStyle={{height: '10px', width: '30px'}}
  					thumbStyle={{height: '13px', width: '13px'}}
						onToggle={(isLike) => {
							this.props.setIsLikeFollowers(!isLike);
						}} />
					<span className="switch__text">Like only my followers</span>
				</div>

				<div className="col-xs-12 col-md-4 col-lg-3 slider-container">
					<InputRange
						value={this.props.likesPerAccount} />
					<span className="slider__text">{this.props.likesPerAccount} likes for account</span>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		isLikes: state.following.isLikes,
		isLikeFollowers: state.following.isLikeFollowers,
		likesPerAccount: state.following.likesPerAccount
	}
}

export default connect(mapStateToProps, followingActions)(FollowersLikes);