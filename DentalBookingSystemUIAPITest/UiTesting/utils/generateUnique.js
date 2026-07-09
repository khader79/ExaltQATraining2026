import { SIGNUP_TEST_DATA, BOOKING_DURATION } from '../config/constants.js';

const pad = (n) => String(n).padStart(2, '0');

export const generateUniqueUsername = () => {
  const timestamp = Date.now().toString();
  const letter = Math.random().toString(36).substring(2, 3);
  return `${SIGNUP_TEST_DATA.username}_${letter}_${timestamp}`;
};

export const generateUniquePhoneNumber = () => {
  const timestamp = Date.now().toString();
  const randomDigits = Math.floor(100 + Math.random() * 900).toString();
  return `059${timestamp.slice(-7)}${randomDigits}`;
};

export const generateUniqueWhitespace = () => {
  const uniqueLength =
    Date.now().toString().length + Math.floor(Math.random() * 5);
  return ' '.repeat(uniqueLength);
};

export const generateUniquePhoneCharacters = () => {
  const uniqueLength =
    Date.now().toString().length + Math.floor(Math.random() * 5);
  const characters = '!@#$%^&*()_+[]{}|;:,.<>?';
  let result = '';
  for (let i = 0; i < uniqueLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const _RUN_SEED = Math.floor(Math.random() * 30);
let _dateCounter = 0;
export const generateFutureDate = () => {
  const future = new Date(Date.now() + (60 + _RUN_SEED + _dateCounter++) * 86400000);
  return `${pad(future.getMonth() + 1)}${pad(future.getDate())}${future.getFullYear()}`;
};

export const generatePastDate = () => {
  const past = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000);
  return `${pad(past.getMonth() + 1)}${pad(past.getDate())}${past.getFullYear()}`;
};

export const generateUniqueBookingTime = (durationMinutes = BOOKING_DURATION.STANDARD) => {
  const future = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const startHour = future.getHours();
  const startMin = future.getMinutes();
  const startTotal = startHour * 60 + startMin;
  const endTotal = startTotal + durationMinutes;
  return {
    startTime: `${pad(Math.floor(startTotal / 60) % 24)}:${pad(startTotal % 60)}`,
    endTime: `${pad(Math.floor(endTotal / 60) % 24)}:${pad(endTotal % 60)}`,
  };
};

export const addMinutesToTime = (time, minutes) => {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
};

export const getPastDateTimeData = () => {
  const now = new Date();
  const past = new Date(now.getTime() - BOOKING_DURATION.STANDARD * 60000);
  return {
    date: `${pad(now.getMonth() + 1)}${pad(now.getDate())}${now.getFullYear()}`,
    startTime: `${pad(past.getHours())}:${pad(past.getMinutes())}`,
    endTime: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
  };
};
