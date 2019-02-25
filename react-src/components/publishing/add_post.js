import React, { Component } from 'react';
import InputMoment from 'input-moment';
import moment from 'moment';
import 'moment-timezone';
import { toUTC } from '../../actions/timezone';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart';
import Dropzone from 'react-dropzone';
import * as _ from 'lodash';

import * as libraryActions from '../../actions/library';
import LoadingIcon from '../loading';


class AddPost extends Component {
	constructor(props) {
		super(props);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);		
		
		if(this.props.date) {
			this.currentDate = this.props.date;
		} else {
			this.currentDate = moment();
		}

		if(this.props.file) {
			this.currentFiles = [this.props.file];
		} else {
			this.currentFiles = [{}];
		}

		this.state = {
			isActivePicker: false,
			isEmoji: false,
			date: this.currentDate,
			activeTab: 'photo',
			postText: '',
			files: this.currentFiles
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.isLoading === true && nextProps.isLoading === false) {
			this.props.onClose();
			return true;
		}

		return true;
	}

	onDrop(files) {
		this.setState({ files });

		const reader = new FileReader();
		reader.onload = (event) => {
			const data = event.target.result.replace(`data:${files[0].type};base64,`, '');
		}
		reader.readAsDataURL(files[0]);
	}

	returnHashtags(text) {
		const regexp = /(\s|^)\#\w\w+\b/gm
    const result = text.match(regexp);
    if (result) {
        return result.map(function(s){ return s.trim();});
    } else {
        return [];
    }
	}

	onCloseHandle() {
		if(this.props.isLoading) {
			return;
		}

		this.props.processPostLoading(true);

		const tags = this.returnHashtags(this.state.postText);
		const isStories = this.state.activeTab === 'stories' ? true : false;

		if(this.props.uploadingFiles) {
			this.props.createPost(this.state.postText, toUTC(this.state.date), true, this.state.files[0], tags, isStories);
		} else {		
			this.props.createPost(this.state.postText, toUTC(this.state.date), false, this.state.files[0], tags, isStories);
		}
	}

	returnFileType() {
		if(this.state.activeTab == 'photo')
			return 'image/*';
		else if(this.state.activeTab == 'video')
			return 'video/*';
		else if(this.state.activeTab == 'stories')
			return 'image/*';
	}

	renderEmoji() {
		if(this.state.isEmoji) {
			return (
				[<div key='emoji-container' className="emoji-container">
					<Picker
						emojiSize={ 17 }
						perLine={ 7 }
						sheetSize={ 16 }
						onClick={(emoji, event) => { this.setState({ postText: this.state.postText + emoji.native }); this.toggleEmoji() }}
						include={['recent', 'people']} />
				</div>,
				<div key='emoji-arrow' className="emoji-container_arrow"></div>]
			);
		}
	}

	toggleEmoji(event) {
		if (this.state.isEmoji) {
			document.removeEventListener('click', this.handleOutsideClick, false);
			document.removeEventListener('touchstart', this.handleOutsideClick, false);
		} else {
			document.addEventListener('click', this.handleOutsideClick, false);
			document.addEventListener('touchstart', this.handleOutsideClick, false);
		}

		this.setState(prevState => ({
			isEmoji: !prevState.isEmoji
		}));
	}

	handleOutsideClick(event) {
		if (this.node.contains(event.target)) {
			return;
		}

		this.toggleEmoji();
	}

	renderUploader() {
		if(!_.isEmpty(this.state.files[0])) {
			if(this.props.uploadingFiles) {
				console.log('File: ', this.state.files[0].preview);
				return (
					<div className="add-post__media">
						<img src={this.state.files[0].preview} alt="post-img"/>
					</div>
				);
			} else {
				return (
					<div className="add-post__media">
						<img src={this.state.files[0].thumb} alt="post-img"/>
					</div>
				);
			}
		} else {
			let dropNode;

			return (
				<Dropzone
					ref={(node) => { dropNode = node; }}
					accept={this.returnFileType()}
					onDrop={this.onDrop.bind(this)}
					multiple={false}
					className="add-post__media">
					<div className="empty__dragndrop">
						<span className="dragndrop__icon glyphicon glyphicon-picture"></span>
						<div className="dragndrop__text">
							Drag & Drop your media to upload
							<a onClick={(event) => { event.stopPropagation(); dropNode.open(); }} className="dragndrop__link">or click here</a>
						</div>
					</div>
				</Dropzone>
			);
		}
	}

	render() {
		return (
			<div className="react-modal__wrapper add-post">
				<div className="react-modal__header add-post__header">
					<h2>Add new post</h2>
				</div>

				<div className="add-post__tabs">
					<button
						onClick={() => this.setState({activeTab: 'photo'})}
						className={`btn post__tab ${this.state.activeTab == 'photo' ? 'post__tab_active': ''}`}>Photo</button>
					<button
						onClick={() => this.setState({activeTab: 'video'})}
						className={`btn post__tab ${this.state.activeTab == 'video' ? 'post__tab_active': ''}`}>Video</button>
					<button
						onClick={() => this.setState({activeTab: 'stories'})}
						className={`btn post__tab ${this.state.activeTab == 'stories' ? 'post__tab_active': ''}`}>Stories</button>
				</div>

				<div className="add-post__container">
					{ this.renderUploader() }

					<div 
						className="add-post__post">
						<div className="post__header">Post</div>
						<textarea
							value={this.state.postText}
							onChange={(event) => this.setState({ postText: event.target.value })}
							className="post__body" placeholder='Enter your post here'></textarea>
						<div 
							onClick={() => this.toggleEmoji()}
							ref={node => { this.node = node }}
							className="emoji-container_">
							<i
								className="emoji-icon fa fa-smile-o"
								aria-hidden="true"></i>
							{ this.renderEmoji()  }
						</div>
					</div>
				</div>

				<div className="add-post__btns">
					<div className="add-post__btns_left">
						<button
							onClick={this.props.onClose}
							className="discart">
							<a href="#">Discard post</a>
						</button>
					</div>

					<div className="add-post__btns__right">
						<div className="select-date">
							<input
								onClick={() => this.setState({ isActivePicker: !this.state.isActivePicker })}
								value={this.state.date.format('L, H:mm a')}
								type="text"
								readOnly/>
							<div
								onClick={() => this.setState({ isActivePicker: !this.state.isActivePicker })}
								className="select-date__icon">
								<i className="fa fa-clock-o" aria-hidden="true"></i>
							</div>

							{ this.state.isActivePicker && (
								<InputMoment
									prevMonthIcon='fa fa-chevron-left'
									nextMonthIcon='fa fa-chevron-right'
									moment={this.state.date}
									onChange={(m) => this.setState({date: m})} />
							) }
						</div>

						<button
							disabled={this.props.isLoading}
							onClick={this.onCloseHandle.bind(this)}
							className="add-post__add">
							{ this.props.isLoading ? <LoadingIcon /> : 'ADD POST' }
						</button>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		isLoading: state.library.isProcessPostLoading
	}
}

export default connect(mapStateToProps, libraryActions)(AddPost);