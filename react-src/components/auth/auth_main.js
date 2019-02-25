import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import InfoModal from '../info_modal_window';



class AuthMain extends Component {
	renderHelper() {
		if(this.props.children.props.location.pathname === '/signup') {
			return (
				<div className="form-box__footer">
					<p className="text">Уже есть учетная запись?</p>
					<div className="butn-block">
						<Link to='/signin' className="butn butn--minor">Войти</Link>
					</div>
				</div>
			);
		}

		if(this.props.children.props.location.pathname === '/signin' ||
			 this.props.children.props.location.pathname === '/forgot') {
			return (
				<div className="form-box__footer">
					<p className="text">У вас нет аккаунта?</p>
					<div className="butn-block">
						<Link to='/signup' className="butn butn--minor butn--reg">Зарегистрироваться</Link>
					</div>
				</div>
			);
		}		
	}
	
	componentDidMount() {
		const preloader = document.getElementById('prelaoder');
		const removedPrelaoder = document.body.removeChild(preloader);
	}


	render() {
		console.log('Auth Children: ', this.props.children.props.location.pathname);

		return (
			<div className="main-wrap">
				<div className="form-box">
					<div className="form-box__inner">

						<div className="form-box__header">
							<div className="logo-box">
								<div className="logo-box__inner">
									<div className="logo">
										<img src="../assets/images/logo.svg" alt="" className="logo-img"/>
									</div>
									<div className="descr">
										<span className="descr__text">Лучший сервис для ведения и продвижения Instagram</span>
									</div>
								</div>
							</div>
						</div>

						<div className="form-box__body">
							<div className="left-side">
								{this.props.children}
							</div>

							<div className="right-side">
								<div className="right-side__inner">
									<div className="title">
										<h2 className="title__text">Лучший сервис для ведения и продвижения Instagram аккаунтов</h2>
									</div>
									<span className="descr">
										По словам наших клиентов
									</span>
								</div>
							</div>
						</div>

						{ this.renderHelper() }

					</div>
				</div>

				{ (this.props.error !== null) && (
					<InfoModal
						type={this.props.error.type}
						message={this.props.error.message}
						field={this.props.error.field} />
				) }
				{ (this.props.info !== null) && (
					<InfoModal
						type={this.props.info.type}
						message={this.props.info.message}
						field={this.props.info.field} />
				) }
			</div>
		);

	}

}


function mapStateToProps(state) {
	return{
		error: state.info.authError,
		info: state.info.authInfo
	}
}

export default connect(mapStateToProps)(AuthMain);