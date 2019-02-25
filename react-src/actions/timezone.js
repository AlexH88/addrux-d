import moment from 'moment';
import 'moment-timezone';

import { GET_TIMEZONE,
         GET_TIMEZONES,
         SET_TIMEZONE } from './types';

const timezones = moment.tz.names();

let currentTimezone = localStorage.getItem('timezone');
if(!currentTimezone) {
  currentTimezone = moment.tz.guess();
  localStorage.setItem('timezone', currentTimezone);
}

const _currentTimezone = moment.tz.guess();
localStorage.setItem('_timezone', _currentTimezone);


export function toUTC(date) {
  const date_ = date.format();
  const date__ = moment.tz(date_, localStorage.getItem('timezone'));
  const utcDate = moment.utc(date__);
  return utcDate;
}

export function fromUTC(date, timezone) {
  const now_ = moment();
  const now = applyTimezone(now_, timezone);
  const utcOffset = now.utcOffset();
  const local = date.utcOffset(utcOffset);
  return local;
}

export function applyTimezone(date, timezone) {
  const newDate = moment.tz(date, timezone);
  return newDate;
}


export function getCurrentTimezone() {
  return (dispatch) => {
    dispatch({
      type: GET_TIMEZONE,
      payload: { value: currentTimezone, label: currentTimezone.split('/')[1] }
    });
  }
}

export function getTimezones() {
  return (dispatch) =>{
    dispatch({
      type: GET_TIMEZONES,
      payload: timezones.map(timezone => {
        return { value: timezone, label: timezone.split('/')[1] }
      })
    });
  }
}

export function setCurrentTimezone(timezone) {
  localStorage.setItem('timezone', timezone.value);  
  return (dispatch) => {
    dispatch({
      type: SET_TIMEZONE,
      payload: timezone
    });
  }
}