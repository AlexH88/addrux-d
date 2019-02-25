import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsChatWindow from './posts_chat_window';
import PostsChatUI from './posts_chat_ui';
import * as commentsActions from '../../actions/comments';


class PostsChat extends Component {
	backToContacts() {
		document.getElementsByClassName('comments-container')[0].classList.remove('tranform_x');
		this.props.setCurrentPost(null);
	}

	render() {
		console.log('[RENDER] PostsChat - ./comments/posts_chat.js');
		
		return (
			<div className="posts__chat white-box">
				<div
					onClick={this.backToContacts.bind(this)}
					className="back-to-all">{`<< All Comments`}</div>

				<PostsChatWindow />

				<PostsChatUI />
			</div>
		);
	}
}


export default connect(null, commentsActions)(PostsChat);