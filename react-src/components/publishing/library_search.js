import React, { Component } from 'react';
import Post from './post';

class LibrarySearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPosts: false,
			posts: [
				{ id: 1, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }},
				{ id: 2, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }},
				{ id: 3, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }},
				{ id: 4, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }},
				{ id: 5, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }},
				{ id: 6, thumb: './assets/images/post.jpg', info: { userImg: './assets/images/pawandeep.jpg', userName: 'povalish', time: 'a minute ago' }}
			]
		}
	}

	renderEmptyBody() {
		return (
			<div className="posts__empty col-lg-12">
				<div className="empty__dragndrop">
					<span className="dragndrop__icon glyphicon glyphicon-picture"></span>
					<div className="dragndrop__text">
						Drag & Drop your media to upload
						<a href="" className="dragndrop__link">or click here</a>
					</div>
				</div>
			</div>
		);
	}

	renderPosts() {
		return this.state.posts.map(file => {
			return <Post
								onClick={() => this.setState({ isActive: !this.state.isActive })}
								key={file.id}
								file={file}
								postInfo={file.info} />
		});
	}

	renderPostsBody() {
		return (
			<div className="posts__media">
				{ this.renderPosts() }
			</div>
		);
	}

	renderPostsFooter() {
		return (
			<div className="media__btns">
				<div className="btns__loadmore">LOAD MORE</div>
			</div>
		);
	}

	render() {
		return (
			<div className="posts__container row">
				<div className="col-lg-12">
					<div className="form-group">
						<label htmlFor="hashtag__search" className="hashtag__search">
							<h3>Search Post</h3>
						</label>
						<input placeholder='# Input hashtag here' type="text" id="hashtag__search" className="form-control"/>
					</div>
				</div>

				{ (this.state.posts.length != 0) ? (this.renderPostsBody()) : this.renderEmptyBody() }
				{ (this.state.posts.length != 0) ? (this.renderPostsFooter()) : this.renderEmptyBody() }
			</div>
		);
	}
}

export default LibrarySearch;