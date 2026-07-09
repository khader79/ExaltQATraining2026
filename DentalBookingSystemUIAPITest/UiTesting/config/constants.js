export const BASE_URL = 'http://localhost:3000/';

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
  SUCCESS: { startTime: '09:00', endTime: '09:30' },
  PAST_DATE: { startTime: '09:00', endTime: '09:30' },
  SHORT_DURATION: { startTime: '10:00', endTime: '10:29' },
  LONG_DURATION: { startTime: '09:00', endTime: '09:45' },
  THIRTY_MIN_DURATION: { startTime: '09:00', endTime: '09:30' },
  OVERLAP: { startTime: '09:00', endTime: '09:30' },
  REVERSED_TIME: { startTime: '09:30', endTime: '09:00' },
  CANCEL_SUCCESS: { startTime: '09:00', endTime: '09:30' },
  CANCEL_EMPTY_DATE: { startTime: '09:00', endTime: '09:30' },
  CANCEL_EMPTY_START: { startTime: '09:00', endTime: '09:30' },
  CANCEL_EMPTY_END: { startTime: '09:00', endTime: '09:30' },
  ADJACENT: { startTime: '09:00', endTime: '09:30' },
  PARTIAL_OVERLAP: { startTime: '09:00', endTime: '09:30' },
  MINOR_OVERLAP: { startTime: '09:00', endTime: '09:30' },
  EMPTY_DATE: { date: '', startTime: '09:00', endTime: '09:30' },
  EMPTY_START: { startTime: '', endTime: '09:30' },
  EMPTY_END: { startTime: '09:00', endTime: '' },
  INVALID_DATE: { date: 'erw##&ge', startTime: '09:00', endTime: '09:30' },
  INVALID_START: { startTime: '00:00', endTime: '09:30' },
  INVALID_END: { startTime: '09:00', endTime: '01:00' },
};
