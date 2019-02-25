import React, { Component } from 'react';
import { connect } from 'react-redux';


class Smartphone extends Component {
	renderPosts() {
		return this.props.posts.map(post => {
			if(post.files[0].thumb) {
				return (
					<div key={post.id} className="screen__post">
						<img src={`https://app.adrux.com/media/${post.files[0].thumb}`} alt=""/>
					</div>
				);
			} else {
				return (
					<div style={{ display: 'none' }}></div>
				);
			}
		});
	}

	render() {
		console.log('[RENDER] Smartphone - ./publishing/smartphone.js');
		
		const attrs = {
			"data-device": "iPhone6",
			"data-orientation": "portrait",
			"data-color": "white"
		}
		return (
			<div className="device-wrapper">
			  <div className="device" {...attrs}>
			    <div className="screen">
						<div className="screen__header">
							<img src="assets/images/icons/ava-insta.png" alt="ava-insta"/>
							<span>{`@${this.props.currentAccount.login}`}</span>
						</div>
			    	{ this.renderPosts() }
			    </div>
			    <div className="button">

			    </div>
			  </div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		posts: state.library.posts,
		currentAccount: state.socialAccounts.currentAccount
	}
}

export default connect(mapStateToProps)(Smartphone);