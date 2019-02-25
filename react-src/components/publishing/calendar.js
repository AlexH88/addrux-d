import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import { fromUTC, toUTC } from '../../actions/timezone';

import ModalWindow from '../modal_window';
import InfoModal from '../info_modal_window';
import Preloader from '../preloader';
import AddPost from './add_post';
import EditPost from './edit_post';
import SelectCity from './select_city';
import Smartphone from './smartphone';

import * as libraryActions from '../../actions/library';
import * as infoActions from '../../actions/info';
const actions = Object.assign({}, libraryActions, infoActions);


class Calendar extends Component {
	constructor(props) {
		super(props);

		this.closeAddingPost = this.closeAddingPost.bind(this);
		this.closeEditingPost = this.closeEditingPost.bind(this);
		this.handleOpenPreview = this.handleOpenPreview.bind(this);
		this.handleClosePreview = this.handleClosePreview.bind(this);

		this.state = {
			isAddingPost: false,
			isEditingPost: false,
			isPreview: false,
			isUploadingFiles: false,
			calendarView: 'agendaWeek',
			selectedDate: null,
			currentFile: {},
			currentPost: {},
			currentDate: moment()
		}
	}

	closeAddingPost() {
		this.setState({ isAddingPost: false });
	}

	closeEditingPost() {
		this.setState({ isEditingPost: false });
	}

	shouldComponentUpdate(nextProps, nextState) {
		if( (nextProps.success == true) && (this.props.success == false) ) {
			this.props.fetchPosts();
			this.props.clearSuccess();
			return false;
		} else if( (nextProps.success == false) && (this.props.success == true) ) {
			return false;
		} else {
			return true;
		}

	}

	updateEvents(posts, view) {
		const $calendar = $('#calendar');

		$calendar.fullCalendar('destroy');
		$calendar.fullCalendar({
			timezone: this.props.timezone,
			defaultDate: this.state.currentDate,
			customButtons: {
				preview: {
					text: 'Preview on smartphone',
					click: (event) => {
						this.handleOpenPreview();
					}
				}
			},
			header: {
				left: 'title prev,today,next',
				right: 'preview,agendaDay,agendaWeek,month'
			},
			events: posts,
			eventRender: (event, element) => {
				element.context.style.backgroundImage = `url(${event.imgUrl})`;
				const now = moment();
				if(event.start <= now) {
					element.context.style.opacity = 0.45;
				}
				event.end = event.start;
			},
			defaultView: view,
			handleWindowResize: true,
			allDaySlot: false,
			displayEventEnd: false,
			defaultTimedEventDuration: '00:00:30',
	  	selectable: true,
		  select: (start, end, jsEvent, view) => {
				this.setState({
					isAddingPost: true,
					selectedDate: start,
					isUploadingFiles: true,
					currentFile: {},
					currentDate: $('#calendar').fullCalendar('getDate')
				});
		  	$calendar.fullCalendar("unselect");
			},
			droppable: true,
	    // drop: (date) => {
	    //     console.log("Dropped on " + date.format());
	    // },
			eventDrop: (event, delta, revertFunc) => {
				this.props.updatePost(event.id, [], event.text, toUTC(event.start), event.tags);
			},
			eventReceive: (event) => {
				if(this.checkDoubleImages(event)) {
					this.setState({
						isAddingPost: true,
						selectedDate: event.start,
						isUploadingFiles: false,
						currentFile: event.file,
						currentDate: $('#calendar').fullCalendar('getDate')
					});
				} else {
					this.props.postsInfo({
						type: 'error',
						field: 'posts_error',
						message: "Sorry. This image is already published."
					});
				}
				
				$calendar.fullCalendar('unselect');
				$calendar.fullCalendar('refetchEvents');
			},
			editable : true,
			eventClick: (event, jsEvent, view) => {
				// $calendar.fullCalendar("updateEvent", event);
				this.editingPost(event);
			}
		});

		$('.fc-agendaDay-button').on('click', (event) => {
			this.handleClosePreview('agendaDay');
		});
		$('.fc-agendaWeek-button').on('click', (event) => {
			this.handleClosePreview('agendaWeek');
		});
		$('.fc-month-button').on('click', (event) => {
			this.handleClosePreview('month');
		});

	}

	checkDoubleImages(event) {
		if(this.props.filesIDs !== null) {
			for (var i = 0; i < this.props.filesIDs.length; i++) {
				if(event.file.id === this.props.filesIDs[i]) {
					return false;
				}
			}
			return true;
		} else {
			return false;
		}
	}

	editingPost(post) {
		console.log('Post: ', post);
		this.setState({
			currentPost: post,
			isEditingPost: true,
			currentDate: $('#calendar').fullCalendar('getDate')
		});
	}

	componentDidMount() {
		if(this.props.posts !== null) {
			const events = this.props.posts;
			events.forEach(event => {
				event.title = 'Post';
				event.start = fromUTC(moment(event.public_date), this.props.timezone.value);
				event.end = event.start;
				if(event.files.length != 0) {
					event.imgUrl = 'https://app.adrux.com/media/' + event.files[0].file;
				}
				event.className = 'addImage';
			});
	
			this.updateEvents(events, this.state.calendarView);
		} 

	}


	componentDidUpdate() {
		if(this.props.posts !== null) {
			const events = this.props.posts;
			events.forEach(event => {
				event.title = 'Post';
				event.start = fromUTC(moment(event.public_date), this.props.timezone.value);
				event.end = event.start;
				if(event.files.length != 0) {
					event.imgUrl = 'https://app.adrux.com/media/' + event.files[0].file;
				}
				event.className = 'addImage';
			});
	
			this.updateEvents(events, this.state.calendarView);
		}
	}

	handleOpenPreview() {
		this.setState({ isPreview: true });
		$('.fc-agendaDay-button').removeClass('fc-state-active');
		$('.fc-agendaWeek-button').removeClass('fc-state-active');
		$('.fc-month-button').removeClass('fc-state-active');
		$('.fc-left').hide();
		$('.fc-preview-button').addClass('fc-state-active');
	}

	handleClosePreview(view) {
		this.setState({
			isPreview: false,
			calendarView: view
		});
	}

	render() {
		// console.log('Timezone: ', this.props.timezone);
		console.log('[RENDER] Calendar - ./publishing/calendar.js', this.props.posts);

		if(this.props.posts === null) {
			return (
				<div style={{width: '100%', height: 300, position: 'relative'}}>
					<Preloader />
				</div>
			);
		} else {
			return (
				<div 
					className={`calendar-container ${(this.state.isPreview) ? 'active_preview' : ''}`}>
					{ (this.props.posts === null) && ( <Preloader /> ) }
					<div id="calendar">
						<SelectCity />
						{this.state.isAddingPost && (
							<ModalWindow isTransparent={true} onClose={this.closeAddingPost}>
								<AddPost
									uploadingFiles={this.state.isUploadingFiles}
									file={this.state.currentFile}
									date={this.state.selectedDate}
									onClose={this.closeAddingPost} />
							</ModalWindow>
						)}
	
						{this.state.isEditingPost && (
							<ModalWindow isTransparent={true} onClose={this.closeEditingPost}>
								<EditPost post={this.state.currentPost} onClose={this.closeEditingPost} />
							</ModalWindow>
						)}

						{ (this.props.error !== null) && (
							<InfoModal
								type={this.props.error.type}
								message={this.props.error.message}
								field={this.props.error.field} />
						) }
					</div>
					{this.state.isPreview && (
						<div className="preview-container">
							<Smartphone />
						</div>
					)}
					
				</div>
			);
		}

	}
}

// style={{display: `${this.state.isPreview ? '' : 'none'}`}}

function mapStateToProps(state) {
	return {
		posts: state.library.posts,
		filesIDs: state.library.filesIDs,
		success: state.library.success,
		timezone: state.timezones.currentTimezone,
		error: state.info.postsError
	}
}

export default connect(mapStateToProps, actions)(Calendar);