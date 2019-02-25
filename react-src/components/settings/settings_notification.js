import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as notificationsActions from '../../actions/notifications';
import NotificationItem from './notification_item';

class SettingsNotifications extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pageCounter: 0
		}
	}

	componentWillMount() {
		this.props.fetchNotifications();
	}

	renderImg(id) {
		for (var index = 0; index < this.props.accounts.length; index++) {
			if(this.props.accounts[index].id === id) {
				return this.props.accounts[index].insta_pic_url;
			}
		}
	}

	renderNotifications() {
		return this.props.notifications
			.slice(0, (6 * this.state.pageCounter) + 6)		
			.map(item => {
				this.props.markAsRead(item.id);
				return <NotificationItem
									account={this.props.account.login}
									key={`${item.id}_settings`}
									notif={item}
									imgUrl={this.renderImg(item.account)} />
		});
	}

	loadMoreHandle() {
		if(this.props.notifications.length > (6 + (6 * this.state.pageCounter))) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.notifications.length > 6) {
			return (
				<button 
					onClick={() => this.loadMoreHandle()}
					className="settings-notifications__button mh40">
					LOAD MORE
				</button>
			);
		}
	}

	render() {
		console.log('[RENDER] SettingsNotifications - ./settings/settings_notification.js || Page - ', this.state.pageCounter);		
		
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h2 className="main-title">Notifications</h2>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-md-12 col-lg-6">
						<div className="white-box settings-notifications">
							<div className="notifications-container">
								<div className="notifications__scroll-container">
									{ this.renderNotifications() }
								</div>
							</div>

							{ this.renderLoadMoreButton() }
						</div>
					</div>
				</div>

			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount,
		notifications: state.notifications.list,
		accounts: state.socialAccounts.list
	}
}

export default connect(mapStateToProps, notificationsActions)(SettingsNotifications);