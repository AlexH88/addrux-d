import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatWindow from './chat_window';
import ChatUI from './chat_ui';
import * as messagesActions from '../../actions/messages';

class MessagesChat extends Component {
	backToContacts() {
		document.getElementsByClassName('messages-container')[0].classList.remove('tranform_x');
		this.props.setCurrentContact(null);
	}

	render() {
		console.log('[RENDER] MessagesChat - ./messages/messages_chat.js');
		
		return (
			<div className="messages__chat white-box">
				<div
					onClick={this.backToContacts.bind(this)}
					className="back-to-all">{`<< All Messages`}</div>

				<ChatWindow />

				<ChatUI />
			</div>
		);
	}
}


export default connect(null, messagesActions)(MessagesChat);