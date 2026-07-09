import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
} from './generateUnique.js';
import { SIGNUP_TEST_DATA } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { expect } from '@playwright/test';

export const setupBookingTest = async (
  mainPage,
  signupPage,
  loginPage,
  bookingPage,
  page
) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();

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

export const teardownBookingTest = async (page) => {
  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
  await page.reload();
};
