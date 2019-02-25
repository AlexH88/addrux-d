import React, { Component } from 'react';
import * as messagesActions from '../../actions/messages';
import { connect } from 'react-redux';
import LoadingIcon from '../loading';

import { Picker } from 'emoji-mart';

class ChatUI extends Component {
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
				this.sendMessage();
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

	sendMessage() {
		if(this.state.message != '' && !this.props.isLoading && this.props.currentContact !== null) {
			this.props.sendMessageLoading(true);

			this.props.sendMessage(this.props.currentContact, this.state.message);
			this.setState({ message: '' });
		}
	}

	render() {
		console.log('[RENDER] ChatUI - ./messages/chat_ui.js', this.props.account);
		
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
						onClick={() => this.sendMessage()}>
						{ this.props.isLoading ? <LoadingIcon /> : 'ANSWER' }
					</button>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		currentContact: state.messages.currentContact,
		account: state.socialAccounts.currentAccount,
		isLoading: state.messages.isSendMessageLoading
	}
}

export default connect(mapStateToProps, messagesActions)(ChatUI);