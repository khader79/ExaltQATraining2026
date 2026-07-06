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

let loginPage;
let mainPage;
let signupPage;
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  signupPage = new SignupPage(page);
  mainPage = new MainPage(page);
  await mainPage.navigateToWebsite();
});

test('Verify that a user can successfully log in with valid credentials.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();
  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);
  await loginPage.CheckLoginSuccess(username, SIGNUP_TEST_DATA.password);
});

test('Verify that login fails when entering an incorrect password for an existing user.', async ({
  page,
}) => {
  const username = await generateUniqueUsername();
  const phoneNumber = await generateUniquePhoneNumber();
  await signupPage.signup(username, SIGNUP_TEST_DATA.password, phoneNumber);
  await loginPage.CheckLoginFailure(
    username,
    INVALID_LOGIN_TEST_DATA.invalidPassword
  );
});
