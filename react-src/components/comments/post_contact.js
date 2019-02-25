import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';


class PostContact extends Component {
	renderStuff() {
		if(this.props.isUnread) {
			return (
				<div className="contact-unread">
					<div>{this.props.contact.has_new_comments}</div>
				</div>
			);
		}

		if(this.props.isActive) {
			return (
				<div className="contact-arrow">
					<i className="fa fa-angle-right" aria-hidden="true"></i>
				</div>
			);
		}
	}

	render() {
		return (
			<div
				className={`post__contact contact ${this.props.isActive ? 'contact_active' : ''}`}
				onClick={() => this.props.onSelect(this.props.contact)} >
				<div className="contact__img">
					<img className='img-responsive' src={`${this.props.contact.files != 0 ? `https://app.adrux.com/media/${this.props.contact.files[0].thumb}` : ''}`} alt=""/>
				</div>

				<div className="contact__body">
					<div className="contact__date">{moment(this.props.contact.public_date).format('lll')}</div>
					<div className="contact__name">{`@${this.props.account.login}`}</div>
					<div className="contact__message">{this.props.contact.text}</div>

					{ this.renderStuff() }
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps)(PostContact);