import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as followingActions from '../../actions/following';
import TagsInput from 'react-tagsinput';


class InputGeo extends Component {
	render() {
		return (
			<div className="input-hashtags_ col-xs-12 col-md-12 col-lg-3">
				<div className="form-group">
					<label>
						<h3 className="box-title">Input geolocations</h3>
					</label>
					<TagsInput
						value={this.props.geo}
						onChange={tags => this.props.setGeo(tags)}
						className='form-control' />
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		geo: state.following.geo
	}
}

export default connect(mapStateToProps, followingActions)(InputGeo);