import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as follwoingActions from '../../actions/following';
import TagsInput from 'react-tagsinput';


class InputAccounts extends Component {
	constructor(props) {
		super(props);

		this.handleSetAccounts = this.handleSetAccounts.bind(this);
	}

	pasteSplit(data) {
		const separators = [',', ';', '\\(', '\\)', '\\*', '/', ':', '\\?', '\n', '\r'];
		return data.split(new RegExp(separators.join('|'))).map(d => d.trim());
	}

	handleSetAccounts(tags) {
		let tags_ = [];
		tags.forEach(tag => {
			tag.trim();
			if(tag.indexOf(' ') !== 0) {
				const tmp = tag.split(/\ +/);
				tmp.forEach(elem => {
					if(!elem.startsWith('@')) {
						elem = '@' + elem;	
						tags_.push(elem);
					} else {
						tags_.push(elem);
					}	
				});
			} else {
				if(!tag.startsWith('@')) {
					tag = '@' + tag;
					tags_.push(tag);
				}
			}
		});
		
		console.log('Tags: ', tags_);

		this.props.setAccounts(tags_);
	}

	render() {
		console.log('[RENDER] InputAccounts - ./followers/followers_input_accounts.js');
		
		return (
			<div className="input-hashtags_ col-xs-12 col-md-12 col-lg-3">
				<div className="form-group">
					<label>
						<h3 className="box-title">Input your 10 accounts</h3>
					</label>
					<TagsInput
						maxTags={10}
						onlyUnique={true}
						pasteSplit={this.pasteSplit.bind(this)}
						inputProps={{ placeholder: 'Add an account' }}
						value={this.props.accounts}
						onChange={tags => this.handleSetAccounts(tags)}
						className='form-control' />
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		accounts: state.following.accounts
	}
}

export default connect(mapStateToProps, follwoingActions)(InputAccounts);