import { CHANGE_LINK, SHOW_SIDEBAR, HIDE_SIDEBAR } from './types';


export function setActiveLink(link) {
	return (dispatch) => {
		if(document.body.clientWidth < 1175) {
			dispatch(hideSidebar());
		}
		dispatch({
			type: CHANGE_LINK,
			payload: link
		});
	}
}

export function showSidebar() {
	// return { type: SHOW_SIDEBAR }
	
	return (dispatch) => {
		$('body').addClass('show-sidebar');
		$('body').removeClass('hide-sidebar');
		
		dispatch({
			type: SHOW_SIDEBAR
		});
	}
}

export function hideSidebar() {	
	// return { type: HIDE_SIDEBAR }
	
	return (dispatch) => {
		$('body').removeClass('show-sidebar');
		$('body').addClass('hide-sidebar');
		
		dispatch({
			type: HIDE_SIDEBAR
		});
 }
}