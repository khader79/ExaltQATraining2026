export const BASE_URL = 'http://localhost:3000/';

export const SIGNUP_TEST_DATA = {
  username: 'khader',
  password: '123456789',
};

export const INVALID_SIGNUP_TEST_DATA = {
  emptyUsername: '',
  emptyPassword: '',
  emptyPhone: '',
  invalidPhone: 'abc!@#$',
  whitespaceInput: '   ',
};

export const INVALID_LOGIN_TEST_DATA = {
  invalidPassword: '123456734',
};
