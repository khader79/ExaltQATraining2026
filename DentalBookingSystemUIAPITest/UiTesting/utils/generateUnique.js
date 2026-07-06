import {SIGNUP_TEST_DATA } from '../config/constants.js';
export const generateUniqueUsername = () => {
  const timestamp = Date.now();
  return `${SIGNUP_TEST_DATA.username}_${timestamp}`;
}

export const generateUniquePhoneNumber = () => {
  const timestamp = Math.floor(Date.now()/1000);
  return `${timestamp}`;
}