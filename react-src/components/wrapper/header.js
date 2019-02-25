import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as menuActions from '../../actions/menu';

import SocialAccounts from './social_accounts';
import PlanDays from './plan_days';
import PlanUpgrade from './plan_upgrade';
import Notifications from './notifications';

class Header extends Component {
	toggleSidebar() {
		if(document.body.clientWidth < 1175) {
			if(this.props.isShowSidebar) {
				this.props.hideSidebar();
			} else {
				this.props.showSidebar();
			}
	  }
	}

	componentWillMount() {
		if(document.body.clientWidth <= 720) {
			document.body.classList.add('mobile-layout');
		}
	}

	hideBurger() {
		if(document.body.clientWidth >= 1175) {
			return { opacity: 0 }
	  }
	}

	burger() {
		return (
			<div
				style={this.hideBurger()}
				onClick={ () => this.toggleSidebar() }
				className={`btn-hamburger open-close ${this.props.isShowSidebar ? 'open' : ''}`}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}

	render() {
		console.log('[RENDER] Header - ./wrapper/header.js');
		console.log('Sidebar: ', this.props.isShowSidebar);
		
		return (
			<nav className="navbar navbar-default navbar-static-top m-b-0">
				<div className="navbar-header">
					<div className="top-left-part">

						{ this.burger() }

						<Link 
							onClick={() => this.props.setActiveLink('/')}
							to='/'
							className="logo">
							<b style={{paddingLeft: '15px'}}>
								<img src="assets/images/logo.svg" />
							</b>
						</Link>
					</div>

					<SocialAccounts />

					<ul className="nav navbar-top-links navbar-right pull-right">
						<PlanDays />
						<PlanUpgrade />
						<Notifications />
					</ul>
				</div>
			</nav>
		);
	}

}


function mapStateToProps(state) {
	return {
		isShowSidebar: state.menu.isShowSidebar
	}
}

export default connect(mapStateToProps, menuActions)(Header);