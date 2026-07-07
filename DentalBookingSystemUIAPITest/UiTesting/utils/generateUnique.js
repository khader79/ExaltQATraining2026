import { SIGNUP_TEST_DATA } from '../config/constants.js';
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

export const getStartTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getEndTime = (addTime = 30) => {
  const now = new Date();
  const end = new Date(now.getTime() + addTime * 60000);
  const hours = String(end.getHours()).padStart(2, '0');
  const minutes = String(end.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getPastTime = () => {
  const now = new Date();
  const past = new Date(now.getTime() - 30 * 60000);
  const hours = String(past.getHours()).padStart(2, '0');
  const minutes = String(past.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
