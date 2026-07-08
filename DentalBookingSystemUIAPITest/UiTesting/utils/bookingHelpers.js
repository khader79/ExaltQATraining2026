// utils/bookingHelpers.js
import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
  getStartTime,
  getEndTime,
} from './generateUnique.js';
import { SIGNUP_TEST_DATA } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { expect } from '@playwright/test';

export const FIXED_START_TIME = getStartTime();
export const FIXED_END_TIME = getEndTime(30);

export const getFutureDateWithOffsetDays = (daysOffset) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}${day}${year}`;
};

export const activeTestData = {
  date: '',
  startTime: '',
  endTime: '',
  bookingCreated: false,

  set(date, start, end, created = true) {
    this.date = date;
    this.startTime = start;
    this.endTime = end;
    this.bookingCreated = created;
  },

  reset() {
    this.date = '';
    this.startTime = '';
    this.endTime = '';
    this.bookingCreated = false;
  },
};

export const setupBookingTest = async (
  mainPage,
  signupPage,
  loginPage,
  bookingPage,
  page
) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();
  activeTestData.reset();

  await mainPage.navigateToWebsite();
  await page.reload();

  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successCreateMessageText
  );

  await page.reload();

  await loginPage.login(username, SIGNUP_TEST_DATA.password);
  await expect(await bookingPage.getBookingSection()).toBeVisible({
    timeout: 5000,
  });
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successLoginMessageText
  );
};

export const teardownBookingTest = async (bookingPage, page) => {
  if (activeTestData.bookingCreated && activeTestData.date !== '') {
    await bookingPage.bookAppointment(
      activeTestData.date,
      activeTestData.startTime,
      activeTestData.endTime
    );
    await bookingPage.cancelAppointment();
  }
  await page.reload();
};
