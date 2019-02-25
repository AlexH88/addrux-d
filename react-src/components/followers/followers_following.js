import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import * as follwoingActions from '../../actions/following';


class FollowersFollowing extends Component {
	render() {
		console.log('[RENDER] FollowersFollowing - ./followers/followers_following.js');
		
		return (
			<div className="row" id="follow-unfollow">
				<div className="col-xs-12 col-md-4 col-lg-3">
					<div className="checkbox checkbox-info">
						<input
							type="checkbox"
							checked={this.props.isFollow}
							onChange={(event) => {
								this.props.setIsFollow(event.target.checked);
							}}
							id="checkbox1"/>
						<label htmlFor="checkbox1" className="ft-main">Follow / Unfollow</label>
					</div>
				</div>
				<div className="col-xs-12 col-md-4 col-lg-3 switch-container">
					<ToggleButton
						value={this.props.isSaveFollowing}
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
						onToggle={(isSaveFollowing) => {
							this.props.setIsSaveFollowing(!isSaveFollowing);
						}} />
					<span className="switch__text">Save my following when unfollow</span>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		isSaveFollowing: state.following.isSaveFollowing,
		isFollow: state.following.isFollow
	}
}

export default connect(mapStateToProps, follwoingActions)(FollowersFollowing);