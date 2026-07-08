import { PassThrough } from 'node:stream';

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

export const BOOKING_TEST_DATA = {
  Date: '08202026',
  pastDate: '08152020',
};

export const INVALID_BOOKING_TEST_DATA = {
  emptyDate: '',
  emptyStartTime: '',
  emptyEndTime: '',
  invalidDate: 'erw##&ge',
  invalidStartTime: '00:00',
  invalidEndTime: '01:00',
};
