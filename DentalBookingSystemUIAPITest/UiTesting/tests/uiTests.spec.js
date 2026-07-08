import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/login.js';
import { BookingPage } from '../pages/booking.js';
import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
} from '../utils/generateUnique.js';
import { SIGNUP_TEST_DATA } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';

let mainPage;
let signupPage;
let loginPage;
let bookingPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  loginPage = new LoginPage(page);
  bookingPage = new BookingPage(page);
  await mainPage.navigateToWebsite();
  await page.reload();
});

test('Verify that all mandatory UI elements on the Sign-Up page are visible and correctly rendered.', async ({
  page,
}) => {
  await expect(await signupPage.getUsernameInput()).toBeVisible();
  await expect(await signupPage.getPasswordInput()).toBeVisible();
  await expect(await signupPage.getPhoneInput()).toBeVisible();
  await expect(await signupPage.getSubmitButton()).toBeVisible();
});

test('Verify that all mandatory UI elements on the Login page are visible and correctly rendered.', async ({
  page,
}) => {
  await expect(await loginPage.getUsernameInput()).toBeVisible();
  await expect(await loginPage.getPasswordInput()).toBeVisible();
  await expect(await loginPage.getSubmitButton()).toBeVisible();
});

test('Verify that all mandatory UI fields and action buttons for appointment management are present on the main page.', async ({
  page,
}) => {
  const username = generateUniqueUsername();
  const phoneNumber = generateUniquePhoneNumber();

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

  await expect(await bookingPage.getDateInput()).toBeVisible();
  await expect(await bookingPage.getStartTimeInput()).toBeVisible();
  await expect(await bookingPage.getEndTimeInput()).toBeVisible();
  await expect(await bookingPage.getSubmitButton()).toBeVisible();
  await expect(await bookingPage.getCancelButton()).toBeVisible();
});

// QTDA-7 / BUG-007: Logout button missing from booking page
test('Verify the presence of a Logout button on the main booking page to allow users to terminate their session.', async ({
  page,
}) => {
  const username = generateUniqueUsername();
  const phoneNumber = generateUniquePhoneNumber();

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

  await expect(await mainPage.getLogoutButton()).toBeVisible();
});
