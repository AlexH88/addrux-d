import React, { Component } from 'react';
import { Link } from 'react-router';


class MenuItem extends Component {
	renderCircle() {
		if(this.props.hasNew) {
			return (
				<div className="has-new"></div>
			);
		}
	}

	onClickHandler(e) {
		if(!this.props.hasAccess) {
			e.preventDefault();
		} else {
			this.props.onClick();
		}
	}

	render() {
		console.log('[RENDER] MenuItem - ./wrapper/menu_item.js');
		
		return (
			<li 
				className={`${this.props.hasAccess ? '' : 'no-access__link'}`}
				style={{position: 'relative'}}>
				<Link
					style={this.props.style}
					to={this.props.path}
					onClick={(e) => this.onClickHandler(e)}
					className={`waves-effect ${(this.props.isActive && this.props.hasAccess) ? 'active' : ''} ${this.props.className}`}>
						<div 
							style={this.props.svgStyle}
							className='svg-icon'>{ this.props.icon }</div>
						<span className="hide-menu">{this.props.title}</span>
				</Link>

				{ this.renderCircle() }
			</li>
		);
	}

}


export default MenuItem;