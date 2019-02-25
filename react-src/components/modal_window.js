import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { store } from '../index';
import { Provider } from 'react-redux';

class ModalWindow extends Component {
	componentDidMount() {
		this.modalTarget = document.createElement('div');
		this.modalTarget.className = 'react-modal__overlay';

		document.body.appendChild(this.modalTarget);
		document.body.classList.add('modal-open');

		this._render();
	}

	componentWillUpdate() {
		this._render();
	}

	componentWillUnmount() {
		ReactDOM.unmountComponentAtNode(this.modalTarget);
		document.body.removeChild(this.modalTarget);
		document.body.classList.remove('modal-open');
	}

	_render() {
		console.log('[RENDER] ModalWindow - ./modal_window.js');
		
		ReactDOM.render(
			<Provider store={ store }>
				<div className={`react-modal ${(this.props.isTransparent) && 'react-modal_tranparent'}`}>
					<div className="react-modal__close">
						<i
							onClick={() => this.props.onClose()}
							className="fa fa-times" aria-hidden="true"></i>
					</div>
					{this.props.children}
				</div>
			</Provider>,
			this.modalTarget
		);
	}

	render() {
		return <noscript />;
	}
}

export default ModalWindow;