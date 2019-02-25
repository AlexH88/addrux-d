import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as commentsActions from '../../actions/comments';

class PostMessage extends Component {
	deleteComment() {
		console.log('Deleting: ', this.props.postID);
		this.props.deleteComment(this.props.comment.id, this.props.postID);
	}

	render() {
		return (
			<div className="post-message">
				<div className="post-message__img">
					<img className='img-circle img-responsive' src={this.props.comment.pic_url} alt="user-avatar"/>
				</div>

				<div className="post-message__container">
					<div className="post-message__head">
						<div className="post-message__name">{this.props.comment.username}</div>
						<div className="post-message__date">{ moment().format('lll') }</div>
						<div
							onClick={() => this.deleteComment()}
							className="post-message__delete">DELETE</div>
					</div>

					<div className="post-message__body">
						{ this.props.comment.text }
					</div>
				</div>
			</div>
		);
	}
}


export default connect(null, commentsActions)(PostMessage);