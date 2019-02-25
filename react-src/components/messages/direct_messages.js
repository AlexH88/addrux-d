import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as messagesActions from '../../actions/messages';
import * as socialActions from '../../actions/social_accounts';
const actions = Object.assign({}, messagesActions, socialActions);

import MessagesList from './messages_list';
import MessagesChat from './messages_chat';
import InfoModal from '../info_modal_window';

class DirectMessages extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			timer: null
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			this.props.fetchThreads();
			this.props.setCurrentContact(null);
			this.props.clearChatWindow();
			this.props.markAsVisited();
		}	

		return true;
	}

	componentWillMount() {
		this.props.fetchThreads();
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
		console.log('[RENDER] DirectMessages - ./messages/direct_messages.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Direct Messages</h2>
					</div>
				</div>

				<div className="row" style={{position: 'relative'}}>
					<div className="messages-container col-lg-12">
						<MessagesList />

						<MessagesChat />

						{ (this.props.info !== null) && (
							<InfoModal
								type={this.props.info.type}
								message={this.props.info.message}
								field={this.props.info.field} />
						) }
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		info: state.info.messagesInfo,
		account: state.socialAccounts.currentAccount
		// hasMessages: state.messages.hasMessages
	}
}

export default connect(mapStateToProps, actions)(DirectMessages);