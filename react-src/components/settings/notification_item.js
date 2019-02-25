import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { fromUTC } from '../../actions/timezone';

class NotificationItem extends Component {
	renderType() {
		switch (this.props.notif.type) {
			case 1:
				return <Link>Critical</Link>;
			case 2:
				return <Link>Error</Link>;
			case 3:
				return <Link>Exception</Link>;
			case 4:
				return <Link>Warning</Link>;
			case 5:
				return <Link>Info</Link>;
			case 6:
				return <Link>Debugr</Link>;
			case 7:
				return <Link>Log</Link>;
		}
	}

	render() {
		const _date = moment(this.props.notif.created_at);
		const date = fromUTC(_date, localStorage.getItem('_timezone'));

		return (
			<div className="settings-notification__item">
				<div className="notification__item__img">
					<img className='img-responsive img-circle' src={this.props.imgUrl} alt="account-img"/>
				</div>

				<div className="notification__item__body">
					<div className="notification__item__left">
						<div className="notification__item__name">{`@${this.props.account}`}</div>
						<div className="notification__item__message">{this.props.notif.message}</div>
						<div className="notification__item__type">{ this.renderType() }</div>
					</div>

					<div className="notification__item__rigth">
						<div className="notification__item__date">{date.format('lll')}</div>
						{!this.props.notif.is_read && (
							<div className="notification__item__isRead"></div>
						)}
					</div>
				</div>
			</div>
		);
	}
}


export default NotificationItem;