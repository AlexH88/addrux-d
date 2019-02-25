import { CHANGE_LINK, SHOW_SIDEBAR, HIDE_SIDEBAR } from '../actions/types';

const INITIAL_STATE = {
	activeLink: ''
}
if(document.body.clientWidth >= 1175) {
	INITIAL_STATE.isShowSidebar = true;
} else {
	INITIAL_STATE.isShowSidebar = false;
	$('body').removeClass('show-sidebar');
	$('body').addClass('hide-sidebar');
}

export default function(state = INITIAL_STATE, action) {
	console.log('Menu action: ', action.type);

	switch (action.type) {
		case CHANGE_LINK:
			return {
				...state,
				activeLink: action.payload
			};
		case SHOW_SIDEBAR:
			return {
				...state,
				isShowSidebar: true
			}
		case HIDE_SIDEBAR:
			return {
				...state,
				isShowSidebar: false
			}
	}

	return state;
}