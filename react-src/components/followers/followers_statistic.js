import React, { Component } from 'react';
import { connect } from 'react-redux';

import Preloader from '../preloader';

import FollowersChart from './followers_chart';
import ModalWindow from '../modal_window';
import ExportPDF from './export_pdf';

import * as analyticsActions from '../../actions/analytics';

class FollowersStatistic extends Component {
	constructor(props) {
		super(props);

		this.closeModal = this.closeModal.bind(this);

		this.state = {
			statsBy: 'followers',
			isActiveModal: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			this.props.fetchBotAnalytics();
		}	

		return true;
	}

	componentWillMount() {
		this.props.fetchBotAnalytics();
	}

	showModal() {
		this.setState({ isActiveModal: true });
	}

	closeModal() {
		this.setState({ isActiveModal: false });
	}

	getHeader() {
		if(this.state.statsBy === 'followers')
			return 'Followers';
		if(this.state.statsBy === 'likes')
			return 'Likes Do';
		if(this.state.statsBy === 'comments')
			return 'Comments Do';
		if(this.state.statsBy === 'followings')
			return 'Followings Do';
	}

	getTotal() {
		if(this.state.statsBy === 'followers' && this.props.followers !== null)
			return this.props.followers.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
		if(this.state.statsBy === 'likes' && this.props.likes !== null)
			return this.props.likes.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
		if(this.state.statsBy === 'comments' && this.props.comments !== null)
			return this.props.comments.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
		if(this.state.statsBy === 'followings' && this.props.following !== null)
			return this.props.following.reduce((prev, curr) => {
				return prev + curr.value;
			}, 0);
	}

	getData() {
		if(this.state.statsBy === 'followers')
			return this.props.followers;
		if(this.state.statsBy === 'likes')
			return this.props.likes;
		if(this.state.statsBy === 'comments')
			return this.props.comments;
		if(this.state.statsBy === 'followings')
			return this.props.following;
	}

	render() {
		console.log('[RENDER] FollowersStatistic - ./followers/followers_statistic.js');
		
		return (
			<div className="followers__statistic">
				<div className="statistic__ui">
					<div className="ui__header">Statistic by</div>

					<div className="ui__container">
						<div className="ui__buttons">
							<div className="buttons__sort">
								<div
									onClick={() => this.setState({statsBy: 'followers'})}
									className={`btn ${(this.state.statsBy === 'followers') ? 'btn_active' : ''}`}>Followers</div>
								<div
									onClick={() => this.setState({statsBy: 'likes'})}
									className={`btn ${(this.state.statsBy === 'likes') ? 'btn_active' : ''}`}>Likes do</div>
								<div
									onClick={() => this.setState({statsBy: 'comments'})}
									className={`btn ${(this.state.statsBy === 'comments') ? 'btn_active' : ''}`}>Comments do</div>
								<div
									onClick={() => this.setState({statsBy: 'followings'})}
									className={`btn ${(this.state.statsBy === 'followings') ? 'btn_active' : ''}`}>Following do</div>
							</div>



							{ this.state.isActiveModal && (
								<ModalWindow onClose={this.closeModal}>
									<ExportPDF onClose={this.closeModal} />
								</ModalWindow>
							) }
						</div>

						<div className="ui__text">
							<div className="text__header">{this.getHeader()}</div>
							<div className="text__counter">
								Total this month
								<span>{`+${this.getTotal()}`}</span>
							</div>
						</div>
					</div>
				</div>

				{ (this.props.followers === null && this.props.likes === null && this.props.comments === null && this.props.following === null) ? (
					<div style={{height: 300}}>
						<Preloader />
					</div>
				) : (
					<div id="followers__chart">
						<FollowersChart header={this.getHeader()} data={this.getData()} />
					</div>
				) }
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		followers: state.analytics.botFollowers,
		likes: state.analytics.botLikes,
		comments: state.analytics.botComments,
		following: state.analytics.botFollowing,
		account: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps, analyticsActions)(FollowersStatistic);

// <a onClick={() => this.showModal()} className="buttons__pdf">
// 	<i className="fa fa-file"></i>
// 	<span>Export PDF</span>
// </a>