import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

import MenuItem from './menu_item';
import SubmenuItem from './submenu_item';
import PlanDays from './plan_days';
import PlanUpgrade from './plan_upgrade';

import FollowersIcon from '../../assets/images/icons/followers-2.svg';
import MessagesIcon from '../../assets/images/icons/cursor.svg';
import CommentsIcon from '../../assets/images/icons/comments.svg';
import PublishingIcon from '../../assets/images/icons/calendar.svg';
import AnalyticsIcon from '../../assets/images/icons/analytics-2.svg';
import SettingsIcon from '../../assets/images/icons/settings.svg';
import BackIcon from '../../assets/images/icons/back-to-dashboard.svg';

import * as actions from '../../actions/menu';

import { COMMUNICATION, PROMOTE } from '../../actions/types';

class Menu extends Component {
	isShowUpgradePlan() {
		if(!this.props.isPaid) {
			return false;
		}
		if(this.props.currentPlan[0] !== null && this.props.currentPlan[0]) {
			if(this.props.currentPlan[0].plan === 2) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	hasAccess(route) {
		console.log(`Has Access to ${route} with ${this.props.permissions} premissions`);

		if(route === '/settings' || route === '/billing' || 
         route === '/social-accounts' || route === '/pricing' || 
         route === '/notifications' || route === '/payment') {
        return true;
      }

		switch (this.props.permissions) {
			case PROMOTE:
				if(route === '/') {
					return true;
				} else if(route === '/followers') {
					return true;
				} else if(route === '/analytics') {
					return true;
				} else {
					return false;
				}
				break;

			case COMMUNICATION:
				if(route === '/publishing') {
					return true;
				} else if(route === '/messages') {
					return true;
				} else if(route === '/comments') {
					return true;
				} else if(route === '/analytics') {
					return true;
				} else {
					return false;
				}
				break;
		}

		return true;
	}

	renderMainMenu() {
		return (
			<div className="menu-wrap menu-parts">
				<ul className="nav side-menu _top-part-menu">
					<MenuItem
						onClick={() => this.props.setActiveLink('/')}
						isActive={(this.props.activeLink === '/') ? true : false}
						hasAccess={this.hasAccess('/')}
						path='/'
						title='Followers'
						icon={<FollowersIcon />} />
					<MenuItem
						hasNew={this.props.hasMessages}
						onClick={() => this.props.setActiveLink('/messages')}
						isActive={(this.props.activeLink === '/messages') ? true : false}
						hasAccess={this.hasAccess('/messages')}
						path='/messages'
						title='Direct Messages'
						icon={<MessagesIcon />} />
					<MenuItem
						hasNew={this.props.hasComments}
						onClick={() => this.props.setActiveLink('/comments')}
						isActive={(this.props.activeLink === '/comments') ? true : false}
						hasAccess={this.hasAccess('/comments')}
						path='/comments'
						title='Comments'
						icon={<CommentsIcon />} />
					<MenuItem
						onClick={() => this.props.setActiveLink('/publishing')}
						isActive={(this.props.activeLink === '/publishing') ? true : false}
						hasAccess={this.hasAccess('/publishing')}
						path='/publishing'
						title='Publishing'
						icon={<PublishingIcon />} />
					<MenuItem
						onClick={() => this.props.setActiveLink('/analytics')}
						isActive={(this.props.activeLink === '/analytics') ? true : false}
						hasAccess={this.hasAccess('/analytics')}
						path='/analytics'
						title='Analytics'
						icon={<AnalyticsIcon />} />
				</ul>

				<ul className="nav side-menu side-menu--bot  _bot-part-menu">
					<li 
						style={{ display: `${this.isShowUpgradePlan() ? 'block' : 'none'}`}}
						className="tac">
						<p className="text-danger visible-sm visible-xs">
							<span className="days-count">{this.props.expiredDays} </span>
							days remaining
								<Link
								onClick={() => this.props.setActiveLink('/pricing')}
								to='/pricing'>
									<button className="btn btn-info visible-sm visible-xs">
										<span>Upgrade Plan</span>
									</button>
								</Link>
						</p>
					</li>

					<MenuItem
						onClick={() => {
							this.props.setActiveLink('/settings')
						}}
						className='menu-item__settings'
						hasAccess={this.hasAccess('/settings')}
						path='/settings'
						title='Settings'
						icon={<SettingsIcon />} />
				</ul>
			</div>
		);
	}

	renderSettingsMenu() {
		return (
			<div className="menu-wrap menu-parts">
				<ul className="nav side-menu _top-part-menu">
					<MenuItem
						onClick={() => this.props.setActiveLink('/settings')}
						isActive={false}
						hasAccess={this.hasAccess('/settings')}
						path='/settings'
						title='Settings'
						icon={<SettingsIcon />} />
					<SubmenuItem
						onClick={() => this.props.setActiveLink('/settings')}
						isActive={(this.props.activeLink === '/settings') ? true : false}
						path='/settings'
						title='Account settings'
						/>
					<SubmenuItem
						onClick={() => this.props.setActiveLink('/billing')}
						isActive={(this.props.activeLink === '/billing') ? true : false}
						path='/billing'
						title='Billing'
						/>
					<SubmenuItem
						onClick={() => this.props.setActiveLink('/social-accounts')}
						isActive={(this.props.activeLink === '/social-accounts') ? true : false}
						path='/social-accounts'
						title='Social accounts'
						/>
					<SubmenuItem
						onClick={() => this.props.setActiveLink('/pricing')}
						isActive={(this.props.activeLink === '/pricing') ? true : false}
						path='/pricing'
						title='Pricing'
						/>
					<SubmenuItem
						onClick={() => this.props.setActiveLink('/notifications')}
						isActive={(this.props.activeLink === '/notifications') ? true : false}
						path='/notifications'
						title='Notifications'
						/>
					<SubmenuItem
						newWindow={true}
						path='https://adrux.com/help.html'
						title='Help'
						/>
					<SubmenuItem
						onClick={() => {
							localStorage.removeItem('token');
							window.location.reload();
						}}
						title='Log out'
						/>
				</ul>

				<ul className="nav side-menu side-menu--bot  _bot-part-menu">
					<li 
						style={{ display: `${this.isShowUpgradePlan() ? 'block' : 'none'}`}}
						className="tac">
						<p className="text-danger visible-sm visible-xs">
							<span className="days-count">{this.props.expiredDays} </span>
							days remaining
							<Link
								onClick={() => this.props.setActiveLink('/pricing')}
								to='/pricing'>
								<button className="btn btn-info visible-sm visible-xs">
									<span>Upgrade Plan</span>
								</button>
							</Link>
						</p>
					</li>

					<MenuItem
						style={{paddingLeft: 23}}
						className='menu-item__back2dashboard'
						svgStyle={{width: 10, height: 18}}
						onClick={() => this.props.setActiveLink('/')}
						path='/'
						hasAccess={this.hasAccess('/settings')}
						title='Back to dashboard'
						icon={<BackIcon />} />
				</ul>
			</div>
		);
	}

	render() {
		console.log('[RENDER] Menu - ./wrapper/menu.js');
		console.log('Has messages: ', this.props.hasMessages);
		console.log('Has comments: ', this.props.hasComments);
		
		if(this.props.activeLink == '/' ||
			 this.props.activeLink == '/messages' ||
			 this.props.activeLink == '/comments' ||
			 this.props.activeLink == '/publishing' ||
			 this.props.activeLink == '/get-started' ||
			 this.props.activeLink == '/analytics') {
			return this.renderMainMenu();
		} else {
			return this.renderSettingsMenu();
		}
	}
}


function mapStateToProps(state) {
	return {
		activeLink: state.menu.activeLink,
		expiredDays: state.billing.planExpiredDays,
		isPaid: state.app.isPaid,
		currentPlan: state.billing.currPlan,
		followingID: state.following.followingID,
		hasMessages: state.messages.hasMessages,
		hasComments: state.comments.hasComments,
		permissions: state.billing.permissions,
	}
}


export default connect(mapStateToProps, actions)(Menu);