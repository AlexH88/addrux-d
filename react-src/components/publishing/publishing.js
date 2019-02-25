import React, { Component } from 'react';
import { connect } from 'react-redux';

import Library from './library';
import Schedule from './schedule';

import * as libraryActions from '../../actions/library';


class Publishing extends Component {
	componentWillMount() {
		this.props.fetchPosts();
		this.props.fetchFiles();
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.account != nextProps.account) {
			this.props.fetchPosts();
		}
	}

	render() {
		console.log('[RENDER] Publishing - ./publishing/publishing.js');
		
		return (
			<div className="container-fluid">
				<div className="row">
					<h2 className="main-title">Publishing</h2>
				</div>

				<div className="publishing row">
					<Library />

					<Schedule />
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		account: state.socialAccounts.currentAccount,
	}
}

export default connect(mapStateToProps, libraryActions)(Publishing);