import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {
	render() {
		return (
			<div className={`message ${this.props.from ? 'message__from' : ''}`}>
				<div className="message__img">
					<img className='img-responsive' src={this.props.message.pic} alt=""/>
				</div>

				<div 
					dangerouslySetInnerHTML={{ __html: this.props.message.message }} 
					className="message__body">
					{/* { this.props.message.message } */}
				</div>
			</div>
		);
	}
}


export default Message;