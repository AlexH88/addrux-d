import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Dropzone from 'react-dropzone';

import * as libraryActions from '../../actions/library';
import * as infoActions from '../../actions/info';
const actions = Object.assign({}, libraryActions, infoActions);
import Post from './post';
import ModalWindow from '../modal_window';
import InfoModal from '../info_modal_window';
import Preloader from '../preloader';
import AddPost from './add_post';

class LibraryPosts extends Component {
	constructor(props) {
		super(props);
		
		this.closeAddingPost = this.closeAddingPost.bind(this);
		
		this.state = {
			isAddingPost: false,
			files: [],
			currentFile: {},
			pageCounter: 0
		}
	}
	
	componentWillMount() {
		this.props.returnfilesIDs();	
	}

	closeAddingPost() {
		this.setState({ isAddingPost: false });
	}

	onDrop(files) {
		if(files.length !== 0) {
			this.props.postsInfo({
				type: 'info',
				field: 'posts_info',
				message: 'Uploading your media...'
			});
			this.props.uploadFile('', files[0]);
		} else {
			this.props.postsInfo({
				type: 'error',
				field: 'posts_error',
				message: 'We support only image or video.'
			});
		}
		// this.setState({ files: [...this.state.files, ...files] });
	}

	renderEmptyBody() {
		let dropNode;

		return (
			<Dropzone
				disableClick={true}
				ref={(node) => { dropNode = node; }}
				accept='image/*'
				onDrop={this.onDrop.bind(this)}
				activeStyle={{backgroundColor: 'rgba(151,164,177,0.2)'}}
				className="posts__empty col-lg-12">
				<div className="empty__dragndrop">
					<span className="dragndrop__icon glyphicon glyphicon-picture"></span>
					<div className="dragndrop__text">
						Drag & Drop your media to upload
						<a
							onClick={ (event) => { event.stopPropagation(); dropNode.open(); }}
							className="dragndrop__link">or click here</a>
					</div>
				</div>
			</Dropzone>
		);
	}

	checkDoubleImage(file) {
		if(this.props.filesIDs !== null) {
			// this.props.filesIDs.forEach(id => {
			// 	if(file.id === id) {
			// 		return false;
			// 	}
			// });
			for (var i = 0; i < this.props.filesIDs.length; i++) {
				if(file.id === this.props.filesIDs[i]) {
					return false;
				}
			}
			return true;
		} else {
			return false;
		}
	}
	
	selectPost(file) {
		if(!this.props.isPaid) {
			this.props.postsInfo({
				type: 'error',
				field: 'posts_error',
				message: 'Sorry. You account is not paid yet.'
			});

			return;
		}

		if(this.checkDoubleImage(file)) {
			this.setState({
				isAddingPost: true, 
				currentFile: file
			});
		} 
		else {
			this.props.postsInfo({
				type: 'error',
				field: 'posts_error',
				message: 'Sorry. This image is already published.'
			});
		}
	}

	renderPosts() {
		return this.props.files
			.slice(0, (12 * this.state.pageCounter) + 12)
			.map(file => {
			return <Post
								onClick={ () => this.selectPost(file) }
								key={`${file.id}_file`}
								file={file}
								postInfo={null} />
		});
	}

	renderPostsBody() {
		return (
			<Dropzone
				disableClick={true}
				ref={(node) => { this.dropNode2 = node; }}
				accept='image/*'
				onDrop={this.onDrop.bind(this)}
				activeStyle={{backgroundColor: 'rgba(151,164,177,0.2)'}}
				className="posts__media">
				<div className="posts__media-container">
					{ this.renderPosts() }
				</div>
			</Dropzone>
		);
	}

	renderPostsFooter() {
		return (
			<div className="media__btns">
				{ this.renderLoadMoreButton() }
				<div className="btns__link">
					Drag & Drop your media to upload
					<a onClick={(event) => { event.stopPropagation(); this.dropNode2.open(); }}>or click here</a>
				</div>
			</div>
		);
	}

	loadMoreHandle() {
		if(this.props.files.length > (12 + (12 * this.state.pageCounter))) {
			this.setState({ pageCounter: this.state.pageCounter + 1 });
		}
	}

	renderLoadMoreButton() {
		if(this.props.files.length > 12) {
			return (
				<div 
					onClick={() => this.loadMoreHandle()}
					className="btns__loadmore btns__loadmore_">LOAD MORE</div>
			);
		}
	}

	renderBodyHelper() {
		if(this.props.files !== null) {
			if(this.props.files.length != 0) {
				return this.renderPostsBody();
			} else {
				return this.renderEmptyBody();
			}
		} else {
			return <Preloader />;
		}
	}

	renderFooterHelper() {
		if(this.props.files !== null && this.props.files.length != 0) {
			this.renderPosts();
		}
	}

	render() {
		// console.log('library_posts.js: Files - ', this.props.files);
		console.log('[RENDER] LibraryPosts - ./publishing/library_posts.js');	

		return (
			<div 
				style={{position: 'relative'}}
				className="posts__container row">
				<div className="col-lg-12 media__header">
					<h3>My media library</h3>
				</div>

				{/* { (this.props.files !== null && this.props.files.length != 0) ? (this.renderPostsBody()) : this.renderEmptyBody() } */}
				{ this.renderBodyHelper() }
				{ (this.props.files !== null && this.props.files.length != 0) ? (this.renderPostsFooter()) : ''}

				{this.state.isAddingPost && (
					<ModalWindow isTransparent={true} onClose={this.closeAddingPost}>
						<AddPost file={this.state.currentFile} onClose={this.closeAddingPost} />
					</ModalWindow>
				)}

				{ (this.props.info !== null) && (
					<InfoModal
						type={this.props.info.type}
						message={this.props.info.message}
						field={this.props.info.field} />
				) }
				{ (this.props.error !== null) && (
					<InfoModal
						type={this.props.error.type}
						message={this.props.error.message}
						field={this.props.error.field} />
				) }
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		files: state.library.files,
		filesIDs: state.library.filesIDs,
		isPaid: state.app.isPaid,
		info: state.info.postsInfo,
		error: state.info.postsInfo
	}
}

export default connect(mapStateToProps, actions)(LibraryPosts);