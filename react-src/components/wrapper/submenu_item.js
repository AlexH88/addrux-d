import React, { Component } from 'react';
import { Link } from 'react-router';


class SubmenuItem extends Component {

	render() {
		console.log('[RENDER] SubmenuItem - ./wrapper/submenu_item.js');

		return (
			<li className='submenu_item'>
				<Link
					target={(this.props.newWindow) ? '_blank' : ''}
					onClick={this.props.onClick}
					to={this.props.path}
					className={`waves-effect ${(this.props.isActive) ? 'active' : ''}`}>
						<span className="hide-menu">{this.props.title}</span>
				</Link>
			</li>
		);
	}

}


export default SubmenuItem;