import {
  getDateWithOffsetDays,
  getTimeWithOffsetMinutes,
} from '../utils/dateTimeHelpers.js';

export const BASE_URL = 'http://localhost:8080/';

export const SIGNUP_TEST_DATA = {
  username: 'khader',
  password: '123456789',
};

export const INVALID_SIGNUP_TEST_DATA = {
  emptyUsername: '',
  emptyPassword: '',
  emptyPhone: '',
  whitespaceInput: '   ',
};

export const INVALID_LOGIN_TEST_DATA = {
  invalidPassword: '123456734',
  doesntExistUsername: 'khader122',
  emptyUsername: '',
  emptyPassword: '',
};

export const BOOKING_DURATION = {
  STANDARD: 30,
  SHORT: 29,
  LONG: 45,
};

export const BOOKING_TEST_DATA = {
  SUCCESS: {
    date: getDateWithOffsetDays(1),
    startTime: '09:00',
    endTime: '09:30',
  },
  PAST_DATE: {
    date: getDateWithOffsetDays(-1),
    startTime: '09:00',
    endTime: '09:30',
  },
  SHORT_DURATION: {
    date: getDateWithOffsetDays(2),
    startTime: '10:00',
    endTime: '10:29',
  },
  LONG_DURATION: {
    date: getDateWithOffsetDays(3),
    startTime: '09:00',
    endTime: '09:45',
  },
  THIRTY_MIN_DURATION: {
    date: getDateWithOffsetDays(4),
    startTime: '09:00',
    endTime: '09:30',
  },
  PAST_TIME: {
    date: getDateWithOffsetDays(0),
    startTime: getTimeWithOffsetMinutes(-30),
    endTime: getTimeWithOffsetMinutes(30),
  },
  OVERLAP: {
    date: getDateWithOffsetDays(5),
    startTime: '09:00',
    endTime: '09:30',
  },
  REVERSED_TIME: {
    date: getDateWithOffsetDays(6),
    startTime: '09:30',
    endTime: '09:00',
  },
  CANCEL_SUCCESS: {
    date: getDateWithOffsetDays(7),
    startTime: '09:00',
    endTime: '09:30',
  },
  CANCEL_EMPTY_DATE: {
    date: getDateWithOffsetDays(8),
    startTime: '09:00',
    endTime: '09:30',
  },
  CANCEL_EMPTY_START: {
    date: getDateWithOffsetDays(9),
    startTime: '09:00',
    endTime: '09:30',
  },
  CANCEL_EMPTY_END: {
    date: getDateWithOffsetDays(10),
    startTime: '09:00',
    endTime: '09:30',
  },
  ADJACENT: {
    date: getDateWithOffsetDays(11),
    startTime: '09:30',
    endTime: '10:00',
    nextStartTime: '10:00',
    nextEndTime: '10:30',
  },
  PARTIAL_OVERLAP: {
    date: getDateWithOffsetDays(12),
    startTime: '09:30',
    endTime: '10:00',
    overlapStartTime: '09:33',
    overlapEndTime: '10:30',
  },
  MINOR_OVERLAP: {
    date: getDateWithOffsetDays(13),
    startTime: '09:30',
    endTime: '10:00',
    overlapStartTime: '09:59',
    overlapEndTime: '11:00',
  },
  EMPTY_DATE: { date: '', startTime: '09:00', endTime: '09:30' },
  EMPTY_START: {
    date: getDateWithOffsetDays(14),
    startTime: '',
    endTime: '09:30',
  },
  EMPTY_END: {
    date: getDateWithOffsetDays(15),
    startTime: '09:00',
    endTime: '',
  },
  INVALID_DATE: { date: 'erw##&ge', startTime: '09:00', endTime: '09:30' },
  INVALID_START: {
    date: getDateWithOffsetDays(16),
    startTime: 'erw##',
    endTime: '09:30',
  },
  INVALID_END: {
    date: getDateWithOffsetDays(17),
    startTime: '09:00',
    endTime: 'erw##',
  },
};
