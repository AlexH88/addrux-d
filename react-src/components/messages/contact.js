import React, { Component } from 'react';


class Contact extends Component {
	renderStuff() {
		// if(this.props.isUnread) {
		// 	return (
		// 		<div className="contact-unread">
		// 			<div>{this.props.contact.new_messages}</div>
		// 		</div>
		// 	);
		// }

		if(this.props.isActive) {
			return (
				<div className="contact-arrow">
					<i className="fa fa-angle-right" aria-hidden="true"></i>
				</div>
			);
		}
	}

	renderUsername() {
		if(this.props.contact.name.length === 0) {
			return this.props.contact.username;
		} else {
			return this.props.contact.name;
		}
	}

	render() {
		return (
			<div
				className={`contact ${this.props.isActive ? 'contact_active' : ''} ${this.props.isUnread ? 'contact_unread' : ''}`}
				onClick={() => this.props.onSelect(this.props.contact)} >
				<div className="contact__img">
					<img className='img-circle img-responsive' src={this.props.contact.pic_url} alt="contact-img"/>
				</div>

				<div className="contact__body">
					<div className="contact__name">{`@${this.renderUsername()}`}</div>
					<div className="contact__message">{ this.props.contact.text }</div>

					{ this.renderStuff() }
				</div>
			</div>
		);
	}
}


export default Contact;