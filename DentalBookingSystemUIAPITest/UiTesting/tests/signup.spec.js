import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/login.js';
import {
  SIGNUP_TEST_DATA,
  INVALID_SIGNUP_TEST_DATA,
} from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
} from '../utils/generateUnique.js';

let mainPage;
let signupPage;
let loginPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  loginPage = new LoginPage(page);
  await mainPage.navigateToWebsite();
});

test('Verify that a user is successfully created with all the correct data.', async ({
  page,
}) => {
  const uniqueUsername = generateUniqueUsername();
  const uniquePhone = generateUniquePhoneNumber();

  await signupPage.signup(
    uniqueUsername,
    SIGNUP_TEST_DATA.password,
    uniquePhone
  );
  expect(await mainPage.getMessageText()).toBe(
    locaters.messages.messagesText.successCreateMessageText
  );

  await loginPage.CheckLoginSuccess(uniqueUsername, SIGNUP_TEST_DATA.password);
});

test('Verify that the user creation process fails if a user with the same username or phone number already exists.', async ({
  page,
}) => {
  const uniqueUsername = generateUniqueUsername();
  const uniquePhone = generateUniquePhoneNumber();

  await signupPage.signup(
    uniqueUsername,
    SIGNUP_TEST_DATA.password,
    uniquePhone
  );

  await signupPage.signup(
    uniqueUsername,
    SIGNUP_TEST_DATA.password,
    uniquePhone
  );

  expect(await mainPage.getMessageText()).toBe(
    locaters.messages.messagesText.existsMessageText
  );
});

test('Verify that when the username field is left empty, the account is not created.', async ({
  page,
}) => {
  const uniquePhone = generateUniquePhoneNumber();
  await signupPage.signup(
    INVALID_SIGNUP_TEST_DATA.emptyUsername,
    SIGNUP_TEST_DATA.password,
    uniquePhone
  );

  expect(
    await mainPage.getFieldValidationMessage(
      await signupPage.getUsernameInput()
    )
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that when the password field is left empty, the account is not created.', async ({
  page,
}) => {
  const uniqueUsername = generateUniqueUsername();
  const uniquePhone = generateUniquePhoneNumber();
  await signupPage.signup(
    uniqueUsername,
    INVALID_SIGNUP_TEST_DATA.emptyPassword,
    uniquePhone
  );

  expect(
    await mainPage.getFieldValidationMessage(
      await signupPage.getPasswordInput()
    )
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that when the phone field is left empty, the account is not created.', async ({
  page,
}) => {
  const uniqueUsername = generateUniqueUsername();
  await signupPage.signup(
    uniqueUsername,
    SIGNUP_TEST_DATA.password,
    INVALID_SIGNUP_TEST_DATA.emptyPhone
  );

  expect(
    await mainPage.getFieldValidationMessage(await signupPage.getPhoneInput())
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that the user creation process fails if characters or special symbols are typed in the phone number field', async ({
  page,
}) => {
  const uniqueUsername = generateUniqueUsername();
  await signupPage.signup(
    uniqueUsername,
    SIGNUP_TEST_DATA.password,
    INVALID_SIGNUP_TEST_DATA.invalidPhone
  );

  expect(await mainPage.getMessageText()).toBe(
    locaters.messages.messagesText.invalidPhoneMessageText
  );

  await expect(await mainPage.getMessage()).toHaveClass(
    locaters.messages.massageClasses.errorMessageClass
  );
});

test('Verify that when fields are filled only with blank spaces (whitespaces), the account is not created.', async ({
  page,
}) => {
  await signupPage.signup(
    INVALID_SIGNUP_TEST_DATA.whitespaceInput,
    INVALID_SIGNUP_TEST_DATA.whitespaceInput,
    INVALID_SIGNUP_TEST_DATA.whitespaceInput
  );

  await expect(await mainPage.getMessage()).toHaveClass(
    locaters.messages.massageClasses.errorMessageClass
  );
});

test('Verify that the password field in the sign-up form properly masks characters to maintain user privacy.', async ({
  page,
}) => {
  await expect(await signupPage.getPasswordInput()).toHaveAttribute(
    'type',
    'password'
  );
});
