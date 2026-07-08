import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/login.js';
import { BookingPage } from '../pages/booking.js';
import { getPastTime, getEndTime } from '../utils/generateUnique.js';
import {
  BOOKING_TEST_DATA,
  INVALID_BOOKING_TEST_DATA,
} from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import {
  getFutureDateWithOffsetDays,
  FIXED_START_TIME,
  FIXED_END_TIME,
  activeTestData,
  setupBookingTest,
  teardownBookingTest,
} from '../utils/bookingHelpers.js';

let loginPage;
let mainPage;
let signupPage;
let bookingPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  loginPage = new LoginPage(page);
  bookingPage = new BookingPage(page);

  await setupBookingTest(mainPage, signupPage, loginPage, bookingPage, page);
});

test('Verify successful appointment booking when valid future date and time are provided.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(1),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
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
    FIXED_START_TIME,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.pastDateBookingMessageText
  );
});

test('Verify that booking fails when the appointment duration is less than 30 minutes.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(2),
    FIXED_START_TIME,
    getEndTime(29)
  );
  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  const messageText = await mainPage.getMessage().textContent();
  expect(messageText.trim().length).toBeGreaterThan(0);
  expect(messageText).not.toBe(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration more than 30 minutes.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(3),
    FIXED_START_TIME,
    getEndTime(45)
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration is 30 minutes.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(4),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking with a past time (relative to now) on a future date is accepted.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(1),
    getPastTime(),
    getEndTime()
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that the booking fails when the specified time period completely overlaps with a pre-existing appointment.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(5),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

test('Verify that booking fails when the End Time is set before the Start Time.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(6),
    FIXED_END_TIME,
    FIXED_START_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.endBeforeStartMessageText
  );
});

test('Verify successful appointment cancellation', async ({ page }) => {
  const targetDate = getFutureDateWithOffsetDays(7);
  await bookingPage.bookAppointment(
    targetDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});

test('Verify that cancellation fails when trying to cancel an appointment that does not exist.', async ({
  page,
}) => {
  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.notFoundCancelMessageText
  );
});

test('Verify that cancellation fails when the date field is empty.', async ({
  page,
}) => {
  const targetDate = getFutureDateWithOffsetDays(15);
  await bookingPage.bookAppointment(
    targetDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await (await bookingPage.getDateInput()).clear();
  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).not.toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});

test('Verify that cancellation fails when the start time field is empty.', async ({
  page,
}) => {
  const targetDate = getFutureDateWithOffsetDays(16);
  await bookingPage.bookAppointment(
    targetDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await (await bookingPage.getStartTimeInput()).clear();
  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).not.toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});

test('Verify that cancellation fails when the end time field is empty.', async ({
  page,
}) => {
  const targetDate = getFutureDateWithOffsetDays(17);
  await bookingPage.bookAppointment(
    targetDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await (await bookingPage.getEndTimeInput()).clear();
  await bookingPage.cancelAppointment();
  await expect(await mainPage.getMessage()).not.toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});

test('Verify that an appointment is not booked when the date is empty.', async ({
  page,
}) => {
  await (await bookingPage.getDateInput()).clear();
  await bookingPage.bookAppointment(
    INVALID_BOOKING_TEST_DATA.emptyDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  expect(
    await mainPage.getFieldValidationMessage(await bookingPage.getDateInput())
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that an appointment is not booked when the start time is empty.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(8),
    INVALID_BOOKING_TEST_DATA.emptyStartTime,
    FIXED_END_TIME
  );

  expect(
    await mainPage.getFieldValidationMessage(
      await bookingPage.getStartTimeInput()
    )
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that an appointment is not booked when the end time is empty.', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(9),
    FIXED_START_TIME,
    INVALID_BOOKING_TEST_DATA.emptyEndTime
  );

  expect(
    await mainPage.getFieldValidationMessage(
      await bookingPage.getEndTimeInput()
    )
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that an appointment can be booked successfully if its Start Time is exactly equal to the End Time of a pre-existing appointment.', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(10),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    FIXED_END_TIME,
    getEndTime(60)
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the Date', async ({
  page,
}) => {
  await (await bookingPage.getDateInput()).clear();
  await bookingPage.bookAppointment(
    INVALID_BOOKING_TEST_DATA.invalidDate,
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  expect(
    await mainPage.getFieldValidationMessage(await bookingPage.getDateInput())
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the StartTime', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(11),
    INVALID_BOOKING_TEST_DATA.invalidStartTime,
    FIXED_END_TIME
  );
  await expect(await mainPage.getMessage()).not.toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the EndTime', async ({
  page,
}) => {
  await bookingPage.bookAppointment(
    getFutureDateWithOffsetDays(12),
    FIXED_START_TIME,
    INVALID_BOOKING_TEST_DATA.invalidEndTime
  );
  await expect(await mainPage.getMessage()).not.toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test("Verify that booking fails when the new appointment's Start Time starts inside a pre-existing appointment (Partial Overlap).", async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(13),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    getEndTime(15),
    getEndTime(75)
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

test('Verify that booking fails when there is a minor partial overlap', async ({
  page,
}) => {
  activeTestData.set(
    getFutureDateWithOffsetDays(14),
    FIXED_START_TIME,
    FIXED_END_TIME
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    activeTestData.startTime,
    activeTestData.endTime
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.bookAppointment(
    activeTestData.date,
    getEndTime(29),
    getEndTime(60)
  );
  await expect(await mainPage.getMessage()).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

test.afterEach(async ({ page }) => {
  await teardownBookingTest(bookingPage, page);
});
