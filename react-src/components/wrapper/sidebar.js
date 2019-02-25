import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as menuActions from '../../actions/menu';

import Menu from './menu';

class SideBar extends Component {
	toggleSidebar() {
		if(document.body.clientWidth < 1175) {
			if(this.props.isShowSidebar) {
				this.props.hideSidebar();
			} else {
				this.props.showSidebar();
			}
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
				className={`inner-hamburger btn-hamburger open-close ${this.props.isShowSidebar ? 'open' : ''}`}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		);
	}

	render() {
		console.log('[RENDER] SideBar - ./wrapper/sidebar.js');
		
		return (
			<div className="navbar-default sidebar">
				{ this.burger() }
				<Menu />
			</div>
		);
	}

}


function mapStateToProps(state) {
	return {
		isShowSidebar: state.menu.isShowSidebar
	}
}

export default connect(mapStateToProps, menuActions)(SideBar);