import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import InfoModal from '../info_modal_window';
import FollowersFollowing from './followers_following';
import FollowersLikes from './followers_likes';
import FollowersComments from './followers_comments';
import InputHashtags from './followers_input_hashtags';
import InputAccounts from './followers_input_accounts';
import InputGeo from './followers_input_geo';

import * as menuActions from '../../actions/menu';
import * as followingActions from '../../actions/following';
import * as infoActions from '../../actions/info';
const actions = Object.assign({}, menuActions, followingActions, infoActions);

class GetFollowers extends Component {
	handleStart() {
		const currAcc = localStorage.getItem('currAcc');
		if(currAcc) {
			console.log('Getting followers: ', currAcc);
			this.props.createFollowingSettings();
		} else {
			this.props.followingInfo({
				type: 'error',
				field: 'following_error',
				message: 'Please, add account.'
			});
		}
	}

	componentWillMount() {
		this.props.setActiveLink('/');
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.createSuccessful) {
			console.log('Getting Folowers: create successful - ', nextProps.createSuccessful)
			browserHistory.push('/');
			this.props.setActiveLink('/');
		}
	}

	render() {
		console.log('[RENDER] GetFollowers - ./followers/followers_get.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Get real followers</h2>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-12">
						<div className="white-box">

							<div className="row">
								<div className="col-lg-12">
									<h3 className="box-title">Our service use the best algorithm for automatic get real followers on Instagram.</h3>
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

								<div className="col-xs-12 col-md-12 col-lg-1 hashtags__or">
									<h3 className="box-title">Or</h3>
								</div>

								<InputGeo />
							</div>

							<div className="row">
								<div className="col-xs-5 col-sm-5 col-md-5 col-lg-2">
									<button onClick={this.handleStart.bind(this)} className="followers__button btn-block">
										<Link>START</Link>
									</button>
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
						</div>
					</div>
				</div>

				{ (this.props.error !== null) && (
					<InfoModal
						type={this.props.error.type}
						message={this.props.error.message}
						field={this.props.error.field} />
				) }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		createSuccessful: state.following.createSuccessful,
		error: state.info.followingError
	}
}

export default connect(mapStateToProps, actions)(GetFollowers);