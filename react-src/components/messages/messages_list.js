import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader';

import Contact from './contact';
import * as messagesActions from '../../actions/messages';


class MessagesList extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			activeContact: null,
			pageCounter: 0
		}
	}
	
	componentWillUpdate(nextProps) {
		if(this.props.activeContact !== null) {
			if(this.props.account == nextProps.account) {
				this.props.fetchThreadMessages(nextProps.activeContact);
			}	
		}
	}

	isUnreadContact(contact) {
		if(contact.id == this.props.activeContact) {
			this.props.markAsRead(contact.id);
			return false;
		} 
		else if(contact.has_new_messages) {
			return true;
		} else {
			return false;
		}
	}

	renderContacts() {
		if(this.props.contacts === null) {
			return <Preloader />;
		} else if(this.props.contacts.length != 0) {
			return this.props.contacts
				.slice(0, (7 * this.state.pageCounter) + 7)
				.map(contact => {
				return <Contact
									onSelect={this.selectContact.bind(this)}
									key={contact.id}
									contact={contact}
									isActive={(contact.id == this.props.activeContact) ? true : false}
									isUnread={this.isUnreadContact(contact) } />
			});
		} else if(this.props.contacts.length === 0) {
			return (
				<div className='empty-text'>You haven't messages</div>
			);
		}
	}

	selectContact(contact) {
		// if(this.props.hasMessages) {
			const updatedContact = contact;
			updatedContact.has_new_messages = false;

			this.props.sendMessageLoading(true);
	
			this.props.fetchThreadMessages(contact.id);
			this.props.markAsRead(contact.id);
			this.props.setCurrentContact(contact.id);
			if(document.body.classList.contains('mobile-layout')) {
				document.getElementsByClassName('messages-container')[0].classList.add('tranform_x');
			}
	
			this.setState({ activeContact: updatedContact });
		// }
	}

	loadMoreHandle() {
		if(this.props.contacts === null) {
			return;
		}
		if(this.props.contacts.length > (7 + (7 * this.state.pageCounter))) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.contacts === null) {
			return;
		}
		if(this.props.contacts.length > 7) {
			return (
				<button 
					onClick={() => this.loadMoreHandle()}
					className="messages__list__button mh40">
					LOAD MORE
				</button>
			);
		}
	}

	render() {
		// console.log('components/messages_list.js: Threads - ', this.props.contacts);
		console.log('[RENDER] MessagesList - ./messages/messages_list.js');

		return (
			<div className="messages__list white-box">
				<div className="messages__contacts">
					<div className='messages__contacts-container'>
						{ this.renderContacts() }
					</div>
				</div>


				{ this.renderLoadMoreButton() }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount,
		contacts: state.messages.threads,
		hasMessages: state.messages.hasMessages,
		activeContact: state.messages.currentContact
	}
}

export default connect(mapStateToProps, messagesActions)(MessagesList);