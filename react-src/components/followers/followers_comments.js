import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as followingActions from '../../actions/following';
import TagsInput from 'react-tagsinput';


class FollowersComments extends Component {
	render() {
		console.log('[RENDER] FollowersComments - ./followers/followers_comments.js');
		
		return (
			<div className="row">
				<div className="col-xs-12 col-md-7 col-lg-5">
					<div className="checkbox checkbox-info">
						<input
							checked={this.props.enableComments}
							onChange={(event) => {
								this.props.setEnableComments(event.target.checked);
							}}
							type="checkbox"
							id="checkbox3" />
						<label htmlFor="checkbox3" className="ft-main">Comments</label>
					</div>

					<div className="form-group" id="comments__input">
						<label>Input your up to 30 various comments per 1 month with "Enter"</label>
						<TagsInput
							value={this.props.comments}
							onChange={tags => this.props.setComments(tags)}
							className='form-control' />
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		enableComments: state.following.enableComments,
		comments: state.following.comments
	}
}

export default connect(mapStateToProps, followingActions)(FollowersComments);