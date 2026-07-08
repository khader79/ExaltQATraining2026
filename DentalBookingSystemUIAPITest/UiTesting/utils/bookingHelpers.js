import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
  getStartTime,
  getEndTime,
} from './generateUnique.js';
import { SIGNUP_TEST_DATA, FIXED_TEST_CONSTANTS } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { expect } from '@playwright/test';

export const FIXED_START_TIME = getStartTime();
export const FIXED_END_TIME = getEndTime(30);

export const getFutureDateWithOffsetDays = (daysOffset) => {
  const date = new Date(
    FIXED_TEST_CONSTANTS.baseYear,
    FIXED_TEST_CONSTANTS.baseMonth - 1,
    FIXED_TEST_CONSTANTS.baseDay
  );
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

  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successCreateMessageText
  );

  await page.reload();

  await loginPage.login(username, SIGNUP_TEST_DATA.password);

  await expect(bookingPage.bookingSection).toBeVisible({
    timeout: 5000,
  });

  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successLoginMessageText
  );
};

export const teardownBookingTest = async (bookingPage, page) => {
  if (activeTestData.bookingCreated && activeTestData.date !== '') {
    await bookingPage.cancelExistingBooking(
      activeTestData.date,
      activeTestData.startTime,
      activeTestData.endTime
    );
  }
  await page.reload();
};
