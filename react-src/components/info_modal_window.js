import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as infoActions from '../actions/info';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux';

class InfoModal extends Component {
	// componentWillMount() {
	// 	const existModal = document.getElementsByClassName('react-info-modal')[0];
	// 	console.log('REMOVING MODAL: ', existModal);
	// 	if(existModal) {
	// 		document.body.removeChild(existModal);	
	// 	}
	// }

	componentDidMount() {
		this.modalTarget = document.createElement('div');
		this.modalTarget.className = 'react-info-modal';

		document.body.appendChild(this.modalTarget);

		setTimeout(() => {
			this.props.clearField(this.props.field);
		}, 7000);

		this._render();
	}

	componentWillUpdate() {
		this._render();
	}

	componentWillUnmount() {
		ReactDOM.unmountComponentAtNode(this.modalTarget);
		document.body.removeChild(this.modalTarget);
	}

	messageType() {
		switch (this.props.type) {
			case 'error':
				return 'info-modal__error';
			case 'info':
				return 'info-modal__info';
			case 'success':
				return 'info-modal__success';
		}
	}

	_render() {
		console.log('[RENDER] InfoModal - ./info_modal_window.js');
		console.log('Meesage: ', this.props.message);

		ReactDOM.render(
			<Provider store={store}>
				<div className={`info-modal__container ${this.messageType()}`}>
					<div className='info-modal__message'>
						{ this.props.message }
					</div>

					<div className="info-modal__close">
						<i
							onClick={() => this.props.clearField(this.props.field)}
							className="fa fa-times" aria-hidden="true"></i>
					</div>
				</div>
			</Provider>,
			this.modalTarget
		);
	}

	render() {
		return <noscript />;
	}
}

export default connect(null, infoActions)(InfoModal);