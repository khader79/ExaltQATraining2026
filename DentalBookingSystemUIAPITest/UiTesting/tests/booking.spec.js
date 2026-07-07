import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/login.js';
import {
  generateUniqueUsername,
  generateUniquePhoneNumber,
  getStartTime,
  getEndTime,
  getPastTime,
} from '../utils/generateUnique.js';
import { SIGNUP_TEST_DATA, BOOKING_TEST_DATA } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { BookingPage } from '../pages/booking.js';

let loginPage;
let mainPage;
let signupPage;
let bookingPage;
let username;
let phoneNumber;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  loginPage = new LoginPage(page);
  bookingPage = new BookingPage(page);

  await mainPage.navigateToWebsite();
  await page.reload();

  username = await generateUniqueUsername();
  phoneNumber = await generateUniquePhoneNumber();

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

test('Verify successful appointment booking when valid future date and time are provided.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.Date,
    getStartTime(),
    getEndTime()
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});
test('Verify that booking fails when attempting to book an appointment with a past date.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.pastDate,
    getStartTime(),
    getEndTime()
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.pastDateBookingMessageText
  );
});

test('Verify that booking fails when the appointment duration is less than 30 minutes.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.Date,
    getStartTime(),
    getEndTime(29)
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.endTimeLessThan30MinutesMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration more than 30 minutes.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.Date,
    getStartTime(),
    getEndTime(31)
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration is 30 minutes.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.Date,
    getStartTime(),
    getEndTime(30)
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails when attempting to book an appointment with a past time.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.Date,
    getPastTime(),
    getEndTime()
  );

  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.pastDateBookingMessageText
  );
});

test.afterEach(async ({ page }) => {
  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});
