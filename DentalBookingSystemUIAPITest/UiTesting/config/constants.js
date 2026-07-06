export const BASE_URL = 'http://localhost:3000/';

export const SIGNUP_TEST_DATA = {
  username: 'khader',
  password: '123456789',
  phone: '0569974804',
};

export const INVALID_SIGNUP_TEST_DATA = {
  emptyUsername: '',
  emptyPassword: '',
  emptyPhone: '',
  invalidPhone: 'abc!@#$',
};
