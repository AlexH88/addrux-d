import React, { Component } from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';

// Fields
// - id
// - img
// - info
//		- userImg
//		- userName
// 		- time



class Post extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: false
		}
	}

	componentDidMount() {
		$(`#post-img_${this.props.file.id}`).draggable({
			revert: true,
			helper: 'clone'
		});
		$(`#post-img_${this.props.file.id}`).data('event', {
			title: `post_${this.props.file.id}`,
			file: this.props.file
		});
	}

	componentDidUpdate(prevProps, prevState) {
		$(`#post-img_${this.props.file.id}`).draggable({
			revert: true,
			helper: 'clone'
		});
		$(`#post-img_${this.props.file.id}`).data('event', {
			title: `post_${this.props.file.id}`,
			file: this.props.file
		});
	}

	returnMetadata() {
		const img = document.querySelector(`.post-img_${this.props.file.id} post__img img`)
    EXIF.getData(img, function() {
				const allMetaData = EXIF.getAllTags(this);
				console.log('Image metadata: ', allMetaData);
    });
	}

	render() {
		console.log('[RENDER] Post - ./publishing/post.js');
		// this.returnMetadata();
		
		return (
			<div 
				id={`post-img_${this.props.file.id}`}
				onClick={() => this.props.onClick()} 
				className="post col-xs-4 col-sm-4 col-md-4 col-lg-4">
				<div className="post__img">
					{ this.state.isActive &&
						(<div className="post__overlay">
							<span><i className="fa fa-check-circle-o" aria-hidden="true"></i></span>
						</div>) }
					<ExifOrientationImg src={this.props.file.thumb} alt="user-image" className="img-responsive"/>
				</div>
				{
					(this.props.postInfo) && (
						<div>
							<div className="post__user-info row">
								<div className="post__user-avatar">
									<img src={this.props.postInfo.userImg} alt="" className="img-responsive img-circle"/>
								</div>

								<div className="post__user-name">
									{this.props.postInfo.userName}
								</div>
							</div>

							<div className="post__time row">
								<div className="post__time_">
									<div>{this.props.postInfo.time}</div>
								</div>
							</div>

							<div className={'post__btn row ' + (this.state.isActive ? 'post__btn_active' : '')}>
								<button
									onClick={() => this.setState({ isActive: !this.state.isActive })}>
									{ this.state.isActive ? 'ADDED' : 'ADD TO LIBRARY'}
								</button>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}



export default Post;