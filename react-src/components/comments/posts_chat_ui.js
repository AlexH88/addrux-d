import React, { Component } from 'react';
import * as commentsActions from '../../actions/comments';
import { connect } from 'react-redux';
import LoadingIcon from '../loading';

import { Picker } from 'emoji-mart';

class PostsChatUI extends Component {
	constructor(props) {
		super(props);
		
		this.handleOutsideClick = this.handleOutsideClick.bind(this);		
		
		this.state = {
			isEmoji: false,
			message: ''
		}
	}

	componentDidMount() {
		document.querySelector('.chat__input textarea').addEventListener('keydown', event => {
			if(event.key == 'Enter' && !event.shiftKey) {
				this.sendComment();
				event.preventDefault();
			}
		});
	}

	renderEmoji() {
		if(this.state.isEmoji) {
			return (
				[<div key='emoji-container' className="emoji-container">
					<Picker
						emojiSize={ 17 }
						perLine={ 7 }
						sheetSize={ 16 }
						onClick={(emoji, event) => { this.setState({ message: this.state.message + emoji.native }); this.toggleEmoji() }}
						include={['recent', 'people']} />
				</div>,
				<div key='emoji-arrow' className="emoji-container_arrow"></div>]
			);
		}
	}

	toggleEmoji(event) {
		if (this.state.isEmoji) {
			document.removeEventListener('click', this.handleOutsideClick, false);
			document.removeEventListener('touchstart', this.handleOutsideClick, false);
		} else {
			document.addEventListener('click', this.handleOutsideClick, false);
			document.addEventListener('touchstart', this.handleOutsideClick, false);
		}

		this.setState(prevState => ({
			isEmoji: !prevState.isEmoji
		}));
	}

	handleOutsideClick(event) {
		if (this.node.contains(event.target)) {
			return;
		}

		this.toggleEmoji();
	}

	sendComment() {
		if(this.state.message != '' && !this.props.isLoading && this.props.currentPost !== null) {
			this.props.sendCommentsLoading(true);

			this.props.sendComment(this.props.currentPost, this.state.message);
			this.setState({ message: '' });
		}
	}

	render() {
		console.log('[RENDER] PostsChatUI - ./comments/posts_chat_ui.js');
		
		return (
			<div className="chat__ui">
				<div 
					ref={node => { this.node = node }}
					className="emoji-container_">
					<i
						onClick={() => this.toggleEmoji()}
						className="emoji-icon fa fa-smile-o"
						aria-hidden="true"></i>
					{ this.renderEmoji()  }
				</div>

				<div className="chat__input">
					<textarea
						value={this.state.message}
						onChange={(event) => this.setState({ message: event.target.value })} />
				</div>

				<div className="chat__answer">
					<button 
						disabled={this.props.isLoading}
						onClick={() => this.sendComment()}>
						{ this.props.isLoading ? <LoadingIcon /> : 'ANSWER' }
					</button>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		currentPost: state.comments.currentPost,
		isLoading: state.comments.isSendCommentLoading
	}
}

export default connect(mapStateToProps, commentsActions)(PostsChatUI);