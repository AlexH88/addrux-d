import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ToggleButton from 'react-toggle-button';
import Preloader from '../preloader';
import InfoModal from '../info_modal_window';

import FollowersFollowing from './followers_following';
import FollowersLikes from './followers_likes';
import FollowersComments from './followers_comments';
import InputHashtags from './followers_input_hashtags';
import InputAccounts from './followers_input_accounts';
import FollowersStatistic from './followers_statistic';

import * as followingActions from '../../actions/following';
import * as info from '../../actions/info';
const actions = Object.assign({}, followingActions, info);


class Followers extends Component {
	constructor(props) {
		super(props);
		
		this.handleRefresh = this.handleRefresh.bind(this);
		
		this.state = {
			timer: true
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			this.props.fetchFollwoingSettings();
		}	

		return true;
	}

	componentWillMount() {
		this.props.fetchFollwoingSettings();
	}
	
	handleRefresh() {
		// info.followingInfo({
		// 	type: 'info',
		// 	field: 'following_info',
		// 	message: 'Options successfully updated.'
		// });
		this.props.refreshFollowingSettings();
	}

	clearTimer() {
		setTimeout(() => {
			this.setState({ timer: true });
		}, 1000*2);
	}

	handleSwitcher(isGrow) {
		if(this.state.timer) {
			console.log('Refresh following bot.');
			
			this.setState({ timer: false });
			this.props.setIsEnable(isGrow);
			this.props.refreshFollowingGrow();
			this.clearTimer();
		} else {
			this.props.followingInfo({
				type: 'info',
				field: 'following_info',
				message: 'You can update your growth later.'
			});
		}
	}

	render() {
		console.log('[RENDER] Followers - ./component/followers/followers.js');		

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">
							Followers
						</h2>
					</div>
				</div>

				{ this.props.followingID ? (
					<div className="row">
						<div className="col-lg-12">
							<div className="white-box" id="followers">

								<div className={ `followers__dash ${(this.props.isGrow) ? 'followers__gradient' : ''}` }></div>

								<div className="row">
									<div className="col-lg-12 switch-container">
										<ToggleButton
											value={this.props.isGrow}
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
											onToggle={(isGrow) => {
												this.handleSwitcher(!isGrow);
											}} />
										<span className="switch__text switch__header">
											{ this.props.isGrow ? 'Your growth in progress' : 'Your growth is stopped' }
										</span>
									</div>
								</div>

								<div className="row">
									<div className="col-lg-10">
										<FollowersStatistic />
									</div>
								</div>

								<div className="row">
									<div className="col-lg-12">
										<h3 className="followers__options">Your Options</h3>
									</div>
								</div>

								<FollowersFollowing />
								<FollowersLikes />
								<FollowersComments />

								<div className="row" id="hashtags">
									<InputHashtags />

									<div className="col-xs-12 col-md-12 col-lg-1 hashtags__or">
										<h3 className="box-title">Or</h3>
									</div>

									<InputAccounts />
								</div>

								<div className="row">
									<div className="col-xs-12 col-sm12 col-md-12 col-lg-2">
										<button onClick={this.handleRefresh} className="followers__button">REFRESH OPTIONS</button>
									</div>
								</div>

								<div className="row">
									<div className="col-lg-6">
										<div className="followers__description">

											<span className="fa fa-exclamation-circle"></span>
											<div className="description__text">
												<div>Your account in safe</div>
												<div>We automatic follow and unfollow followers, liking and commenting by instagram rules.</div>
											</div>

										</div>
									</div>
								</div>
								
								{ (this.props.info !== null) && (
									<InfoModal
										type={this.props.info.type}
										message={this.props.info.message}
										field={this.props.info.field} />
								) }
							</div>
						</div>
					</div>
				) : ( <Preloader /> )}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount,
		isGrow: state.following.isEnable,
		followingID: state.following.followingID,
		info: state.info.followingInfo
	}
}

export default connect(mapStateToProps, actions)(Followers);