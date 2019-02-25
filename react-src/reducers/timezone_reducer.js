import { GET_TIMEZONE,
         GET_TIMEZONES,
         SET_TIMEZONE } from '../actions/types';

const INITIAL_STATE = {
  currentTimezone: '',
  list: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_TIMEZONE:
      return {
        ...state,
        currentTimezone: action.payload
      }

    case GET_TIMEZONES:
      return {
        ...state,
        list: action.payload
      }

    case SET_TIMEZONE:
      return {
        ...state,
        currentTimezone: action.payload
      }
  }

  return state;
}