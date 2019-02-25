import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as menuActions from '../../actions/menu';
import * as notifActions from '../../actions/notifications';
const actions = Object.assign({}, menuActions, notifActions);


class Notifications extends Component {
	constructor(props) {
		super(props);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);

		this.state = {
			isClicked: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.account != nextProps.account) {
			this.props.fetchNotifications();	
		}	

		return true;
	}

	componentWillMount() {
		this.props.fetchNotifications();		
	}

	toggleNotifications() {
		if (this.state.isClicked) {
			document.removeEventListener('click', this.handleOutsideClick, false);
			document.removeEventListener('touchstart', this.handleOutsideClick, false);
		} else {
			document.addEventListener('click', this.handleOutsideClick, false);
			document.addEventListener('touchstart', this.handleOutsideClick, false);
		}

		this.setState(prevState => ({
			isClicked: !prevState.isClicked
		}));

		this.props.fetchNotifications();
	}

	handleOutsideClick(event) {
		if (this.node.contains(event.target)) {
			return;
		}

		this.toggleNotifications();
	}

	renderType(type) {
		switch (type) {
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

	renderImg(id) {
		for (var index = 0; index < this.props.accounts.length; index++) {
			if(this.props.accounts[index].id === id) {
				return this.props.accounts[index].insta_pic_url;
			}
		}
	}

	renderNotifications() {
		return this.props.notifications.slice(0, 4).map(notif => {
			this.props.markAsRead(notif.id);

			console.log('Notif: ', this.props.accounts);
			
			return (
				<li className='notification__item' key={`${notif.id}_notif`}>
					<div className="item__header">
						<div className="header__img">
							<img className='img-circle' 
								src={this.renderImg(notif.account)} 
								alt="instagram-image"/>
						</div>
						<div className="header__name">{`@${this.props.account.login}`}</div>
					</div>

					<div className="item__body">
						<div className="body__text">{ notif.message }</div>
						<div className="body__type">
							{ this.renderType(notif.type) }
						</div>
					</div>
				</li>
			);
		});
	}

	showHeartbeat() {
		if(this.props.notifications.length !== 0) {
			if(this.props.notifications[0].is_read) {
				return 'none';
			} else {
				return '';
			}
		} else {
			return 'none';
		}
	}

	render() {
		console.log('[RENDER] Notifications - ./wrapper/notifications.js');
		
		const attr = {'data-toggle': 'dropdown'};

		return (

			<li className="dropdown">
				<a
					onClick={() => this.toggleNotifications()}
					className="dropdown-toggle waves-effect waves-light">
					<i {...attr} className="adr-ico adr-ico-ring"></i>
					<div 
						style={{display: `${this.showHeartbeat()}`}}
						className="notify">
						<span className="heartbit"></span>
						<span className="point"></span>
					</div>
				</a>

				{ this.state.isClicked && (
					<ul ref={node => { this.node = node; }} className="notification__list">
						{ this.renderNotifications() }

						<button
							onClick={() => { this.props.setActiveLink('/notifications'); this.toggleNotifications(); }}
							className="notification__button">
							<Link to='/notifications'>Show all</Link>
						</button>
					</ul>
				) }
			</li>

		);
	}

}


function mapStateToProps(state) {
	return {
		notifications: state.notifications.list,
		account: state.socialAccounts.currentAccount,
		accounts: state.socialAccounts.list
	}
}


export default connect(mapStateToProps, actions)(Notifications);