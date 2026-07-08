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

export const FIXED_TEST_CONSTANTS = {
  baseYear: 2026,
  baseMonth: 7,
  baseDay: 15,
  baseHours: 9,
  baseMinutes: 0,
};

const _bd = new Date(
  FIXED_TEST_CONSTANTS.baseYear,
  FIXED_TEST_CONSTANTS.baseMonth - 1,
  FIXED_TEST_CONSTANTS.baseDay
);
const _pad = (n) => String(n).padStart(2, '0');
const _fmt = (d) =>
  `${_pad(d.getMonth() + 1)}${_pad(d.getDate())}${d.getFullYear()}`;

const _d0 = new Date(_bd);
const _d1 = new Date(_bd);
_d1.setDate(_d1.getDate() + 1);
const _d2 = new Date(_bd);
_d2.setDate(_d2.getDate() + 2);
const _d3 = new Date(_bd);
_d3.setDate(_d3.getDate() + 3);
const _d4 = new Date(_bd);
_d4.setDate(_d4.getDate() + 4);
const _d5 = new Date(_bd);
_d5.setDate(_d5.getDate() + 5);
const _d6 = new Date(_bd);
_d6.setDate(_d6.getDate() + 6);
const _d7 = new Date(_bd);
_d7.setDate(_d7.getDate() + 7);
const _d8 = new Date(_bd);
_d8.setDate(_d8.getDate() + 8);
const _d9 = new Date(_bd);
_d9.setDate(_d9.getDate() + 9);
const _d10 = new Date(_bd);
_d10.setDate(_d10.getDate() + 10);
const _d11 = new Date(_bd);
_d11.setDate(_d11.getDate() + 11);
const _d12 = new Date(_bd);
_d12.setDate(_d12.getDate() + 12);

export const BOOKING_TEST_DATA = {
  pastDate: '08152020',
  basic: { date: _fmt(_d0) },
  durLess30: { date: _fmt(_d1) },
  durMore30: { date: _fmt(_d2) },
  dur30: { date: _fmt(_d3) },
  overlap: { date: _fmt(_d4) },
  endBefore: { date: _fmt(_d5) },
  cancelData: { date: _fmt(_d6) },
  cancelDate: { date: _fmt(_d7) },
  cancelStart: { date: _fmt(_d8) },
  cancelEnd: { date: _fmt(_d9) },
  startEnd: { date: _fmt(_d10) },
  partial: { date: _fmt(_d11) },
  minor: { date: _fmt(_d12) },
};

export const INVALID_BOOKING_TEST_DATA = {
  emptyDate: '',
  emptyStartTime: '',
  emptyEndTime: '',
  invalidDate: 'erw##&ge',
  invalidStartTime: '00:00',
  invalidEndTime: '01:00',
  pastStartTime: '09:00',
  pastEndTime: '09:30',
};
