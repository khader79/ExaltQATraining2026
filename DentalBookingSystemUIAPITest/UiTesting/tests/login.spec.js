import { expect, test } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { LoginPage } from '../pages/login.js';
import { SignupPage } from '../pages/signup.js';
import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
} from '../utils/generateUnique.js';
import {
  SIGNUP_TEST_DATA,
  INVALID_LOGIN_TEST_DATA,
} from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { BookingPage } from '../pages/booking.js';

let loginPage;
let mainPage;
let signupPage;
let bookingPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  signupPage = new SignupPage(page);
  mainPage = new MainPage(page);
  bookingPage = new BookingPage(page);
  await mainPage.navigateToWebsite();
  await page.reload();
});

test('Verify that a user can successfully log in with valid credentials.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();

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
});

test('Verify that login fails when entering an incorrect password for an existing user.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();

  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successCreateMessageText
  );

  await page.reload();

  await loginPage.login(username, INVALID_LOGIN_TEST_DATA.invalidPassword);

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.invalidLoginMessageText
  );
  await expect(await bookingPage.getBookingSection()).not.toBeVisible();
});

test('Verify that login fails when using a username that does not exist in the system.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  await loginPage.login(username, INVALID_LOGIN_TEST_DATA.invalidPassword);
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.invalidLoginMessageText
  );
  await expect(await bookingPage.getBookingSection()).not.toBeVisible();
});

test('Verify that the user does not log in when leaving the username field blank.', async ({
  page,
}) => {
  await loginPage.login(
    INVALID_LOGIN_TEST_DATA.emptyUsername,
    SIGNUP_TEST_DATA.password
  );
  const username = await loginPage.getUsernameInput();
  const validationMessage = await mainPage.getFieldValidationMessage(username);
  expect(validationMessage).toBe(
    locaters.messages.messagesText.RequiredMessageText
  );

  await expect(await bookingPage.getBookingSection()).not.toBeVisible();
});

test('Verify that the user does not log in when leaving the password field blank.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();

  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successCreateMessageText
  );

  await page.reload();

  await loginPage.login(username, INVALID_LOGIN_TEST_DATA.emptyPassword);
  const password = await loginPage.getPasswordInput();
  const validationMessage = await mainPage.getFieldValidationMessage(password);
  expect(validationMessage).toBe(
    locaters.messages.messagesText.RequiredMessageText
  );
  await expect(await bookingPage.getBookingSection()).not.toBeVisible();
});
