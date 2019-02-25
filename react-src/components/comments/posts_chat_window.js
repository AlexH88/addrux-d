import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader';

import PostMessage from './post_message';


class PostsChatWindow extends Component {
	renderPostMessages() {
		return this.props.comments.map(comment => {
			return <PostMessage
								postID={this.props.currentPost}
								key={comment.id}
								comment={comment} />
		});
	}

	render() {
		console.log('[RENDER] PostsChatWindow - ./comments/posts_chat_window.js');
		
		return (
			<div className="chat__window">
				{ this.props.isLoading ? <Preloader /> : this.renderPostMessages() }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		comments: state.comments.list,
		hasComments: state.comments.hasComments,
		isLoading: state.comments.isSendCommentLoading,
		currentPost: state.comments.currentPost
	}
}

export default connect(mapStateToProps)(PostsChatWindow);