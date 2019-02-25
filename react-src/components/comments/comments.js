import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as commentsActions from '../../actions/comments';
import * as socialActions from '../../actions/social_accounts';
const actions = Object.assign({}, commentsActions, socialActions);

import PostsChat from './posts_chat';
import PostsList from './posts_list';


class Comments extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			timer: null
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			console.log('Comments has been updated with new posts.');
			this.props.fetchPostsWithComments();
			this.props.setCurrentPost(null);
			this.props.markAsVisited();
			this.props.clearChatWindow();
		}	

		return true;
	}

	componentWillMount() {
		this.props.fetchPostsWithComments();
		this.props.markAsVisited();

		if(localStorage.getItem('currAcc')) {
			this.props.syncWithServer();
			const timer = setInterval(() => {
				this.props.syncWithServer();
			}, 30000);
			
			this.setState({ timer });
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	render() {
		console.log('[RENDER] Comments - ./comments/comments.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Comments</h2>
					</div>
				</div>

				<div className="row">
					<div className="comments-container col-lg-12">
						<PostsList />

						<PostsChat />
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps, actions)(Comments);