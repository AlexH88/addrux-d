import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../preloader';

import * as commentsActions from '../../actions/comments';
import PostContact from './post_contact';


class PostsList extends Component {
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
				this.props.fetchComments(nextProps.activeContact);
			}	
		}
	}

	isUnreadContact(contact) {
		if(contact.id == this.props.activeContact) {
			// this.props.markAsRead(contact.id);
			return false;
		} 
		else if(contact.has_new_comments) {
			return true;
		} else {
			return false;
		}
	}

	renderPostContacts() {
		if(this.props.contacts === null) {
			return <Preloader />;
		} 
		else if(this.props.contacts.length != 0) {
			return this.props.contacts
				.slice(0, (5 * this.state.pageCounter) + 5)
				.map(contact => {
				return <PostContact
									onSelect={this.selectContact.bind(this)}
									key={contact.id}
									contact={contact}
									isActive={(contact.id == this.props.activeContact) ? true : false}
									isUnread={this.isUnreadContact(contact)} />
			});
		} 
		else if(this.props.contacts.length === 0) {
			return (
				<div className='empty-text'>You haven't posts</div>
			);
		}
	}

	selectContact(contact) {
		// if(this.props.hasComments) {
			const updatedContact = contact;
			updatedContact.has_new_comments = 0;

			this.props.sendCommentsLoading(true);

			this.props.markAsRead(contact.id);
			this.props.setCurrentPost(contact.id);
			this.props.fetchComments(contact.id);
	
			if(document.body.classList.contains('mobile-layout')) {
				document.getElementsByClassName('comments-container')[0].classList.add('tranform_x');
			}
			
			this.setState({ activeContact: updatedContact });
		// }
	}

	loadMoreHandle() {
		if(this.props.contacts === null) {
			return;
		}
		if(this.props.contacts.length > (4 + (4 * this.state.pageCounter))) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.contacts === null) {
			return;
		}
		if(this.props.contacts.length > 5) {
			return (
				<button 
					onClick={() => this.loadMoreHandle()}
					className="posts__list__button mh40">
					LOAD MORE
				</button>
			);
		}
	}

	render() {
		// console.log('Contacts: ', this.props.contacts);
		console.log('[RENDER] PostsList - ./comments/posts_list.js');
		
		return (
			<div className="posts__list white-box">
				<div className="posts__contacts">
					<div className='posts__contacts-container'>
						{ this.renderPostContacts() }
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
		contacts: state.comments.posts,
		activeContact: state.comments.currentPost,
		hasComments: state.comments.hasComments
	}
}

export default connect(mapStateToProps, commentsActions)(PostsList);
