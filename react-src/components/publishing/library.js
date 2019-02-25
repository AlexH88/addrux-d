import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalWindow from '../modal_window';
import AddPost from './add_post';

import LibraryPosts from './library_posts';
import LibrarySearch from './library_search';

/*
 * Хранить все посты в Library
 * Подключить redux
 *	загружаю список постов, отправляю в LibraryPosts
 * Если добавился пост из поиска
 *	обновить список постов
 * Если добавили картинку
 *	обновить список постов
 */

class Library extends Component {
	constructor(props) {
		super(props);

		this.renderButton = this.renderButton.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);

		this.state = {
			isSearch: false,
			isLibrary: true,
			isPosts: false,
			isActiveModal: false
		}
	}

	openModal() {
		this.setState({ isActiveModal: true });
	}

	closeModal() {
		this.setState({ isActiveModal: false });
	}

	renderButton() {
		// if(!this.state.isSearch) {
		// 	return (
		// 		<button
		// 			onClick={() => this.setState({ isSearch: true, isLibrary: false })}
		// 			className="btns__search btn-block">
		// 			SEARCH POST
		// 		</button>
		// 	);
		// }

		// if(!this.state.isLibrary) {
		// 	return (
		// 		<button
		// 			onClick={() => this.setState({ isSearch: false, isLibrary: true })}
		// 			className="btns__search btn-block">
		// 			MEDIA LIBRARY
		// 		</button>
		// 	);
		// }
	}

	renderPosts() {
		if(this.state.isSearch) {
			return <LibrarySearch />;
		}

		if(this.state.isLibrary) {
			return <LibraryPosts />;
		}
	}

	render() {
		console.log('[RENDER] Library - ./publishing/library.js');
		
		return (
			<div className="lib__posts white-box">
				<div className="posts__btns row">
					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<button
							style={{ display: `${this.props.isPaid ? '' : 'none'}` }}
							onClick={() => this.setState({isActiveModal: true})}
							className="btns__add btn-block">
							<span className="glyphicon glyphicon-plus"></span>
							ADD NEW POST
						</button>
					</div>

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						{ this.renderButton() }
					</div>
				</div>

				{ this.renderPosts() }

				{this.state.isActiveModal && (
					<ModalWindow isTransparent={true} onClose={this.closeModal}>
						<AddPost uploadingFiles={true} onClose={this.closeModal} />
					</ModalWindow>
				)}
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		isPaid: state.app.isPaid
	}
}

export default connect(mapStateToProps)(Library);