import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader';

import * as messagesActions from '../../actions/messages';
import Message from './message';

class ChatWindow extends Component {
	renderMessages() {
		return this.props.messages.map((msg, index) => {
			return <Message
								from={msg.is_owner ? false : true}
								key={msg.id}
								message={msg} />
		});
	}

	render() {
		console.log('[RENDER] ChatWindow - ./messages/chat_window.js');
		
		return (
			<div className="chat__window">
				{ this.props.isLoading ? <Preloader /> : this.renderMessages() }
			</div>
		);
	}
}



function mapStateToProps(state) {
	return {
		messages: state.messages.list,
		hasMessages: state.messages.hasMessages,
		isLoading: state.messages.isSendMessageLoading,
		activeContact: state.messages.currentContact
	}
}

export default connect(mapStateToProps, messagesActions)(ChatWindow);