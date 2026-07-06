import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import {
  SIGNUP_TEST_DATA,
  INVALID_SIGNUP_TEST_DATA,
} from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
let mainPage;
let signupPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  await mainPage.navigateToWebsite();
});

test('Verify that a user is successfully created with all the correct data.', async ({
  page,
}) => {
  await signupPage.signup(
    SIGNUP_TEST_DATA.username,
    SIGNUP_TEST_DATA.password,
    SIGNUP_TEST_DATA.phone
  );
  expect(await mainPage.getMessageText()).toBe(
    locaters.messages.messagesText.successCreateMessageText
  );
});

test('Verify that the user creation process fails if a user with the same username or phone number already exists.', async ({
  page,
}) => {
  const user1 = await signupPage.signup(
    await SIGNUP_TEST_DATA.username,
    await SIGNUP_TEST_DATA.password,
    await SIGNUP_TEST_DATA.phone
  );

  const user2 = await signupPage.signup(
    await SIGNUP_TEST_DATA.username,
    await SIGNUP_TEST_DATA.password,
    await SIGNUP_TEST_DATA.phone
  );

  expect(await mainPage.getMessageText()).toBe(
    await locaters.messages.messagesText.existsMessageText
  );
});

test('Verify that when the username field is left empty,the account is not created.', async ({
  page,
}) => {
  await signupPage.signup(
    await INVALID_SIGNUP_TEST_DATA.emptyUsername,
    await SIGNUP_TEST_DATA.password,
    await SIGNUP_TEST_DATA.phone
  );
  expect(
    await mainPage.getFieldValidationMessage(
      await signupPage.getUsernameInput()
    )
  ).toBe(await locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that when the password field is left empty,the account is not created.', async ({
  page,
}) => {
  await signupPage.signup(
    await SIGNUP_TEST_DATA.username,
    await INVALID_SIGNUP_TEST_DATA.emptyPassword,
    await SIGNUP_TEST_DATA.phone
  );
  expect(
    await mainPage.getFieldValidationMessage(
      await signupPage.getPasswordInput()
    )
  ).toBe(await locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that when the phone field is left empty,the account is not created.', async ({
  page,
}) => {
  await signupPage.signup(
    await SIGNUP_TEST_DATA.username,
    await SIGNUP_TEST_DATA.password,
    await INVALID_SIGNUP_TEST_DATA.emptyPhone
  );
  expect(
    await mainPage.getFieldValidationMessage(await signupPage.getPhoneInput())
  ).toBe(await locaters.messages.messagesText.RequiredMessageText);
});

test.only('Verify that the user creation process fails if characters or special symbols are typed in the phone number field', async ({
  page,
}) => {
  await signupPage.signup(
    await SIGNUP_TEST_DATA.username,
    await SIGNUP_TEST_DATA.password,
    await INVALID_SIGNUP_TEST_DATA.invalidPhone
  );
  expect(await mainPage.getMessageText()).toBe(
    await locaters.messages.messagesText.invalidPhoneMessageText
  );
  expect(await mainPage.getMessage()).toHaveClass(
    await locaters.messages.massageClasses.errorMessageClass
  );
});

test.only('Verify that when fields are filled only with blank spaces (whitespaces), the account is not created.', async ({
  page,
}) => {
  await signupPage.signup(
    await INVALID_SIGNUP_TEST_DATA.emptyUsername,
    await INVALID_SIGNUP_TEST_DATA.emptyPassword,
    await INVALID_SIGNUP_TEST_DATA.emptyPhone
  );
  expect(await mainPage.getMessage()).toHaveClass(
    await locaters.messages.massageClasses.errorMessageClass
  );
});
