import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.js';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/login.js';
import { BookingPage } from '../pages/booking.js';
import {
  generateFutureDate,
  generatePastDate,
  addMinutesToTime,
} from '../utils/generateUnique.js';
import { BOOKING_TEST_DATA, BOOKING_DURATION } from '../config/constants.js';
import { locaters } from '../config/all_locaters.js';
import { setupBookingTest } from '../utils/bookingHelpers.js';

let loginPage;
let mainPage;
let signupPage;
let bookingPage;
const createdBookings = [];

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  signupPage = new SignupPage(page);
  loginPage = new LoginPage(page);
  bookingPage = new BookingPage(page);

  await setupBookingTest(mainPage, signupPage, loginPage, bookingPage, page);
});

test('Verify successful appointment booking when valid future date and time are provided.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.SUCCESS,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails when attempting to book an appointment with a past date.', async () => {
  const bookingData = {
    date: generatePastDate(),
    ...BOOKING_TEST_DATA.PAST_DATE,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.pastDateBookingMessageText
  );
});

// QTDA-3 / BUG-003: Booking with duration < 30 min is accepted — app does not enforce minimum duration
test('Verify that booking fails when the appointment duration is less than 30 minutes.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.SHORT_DURATION,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  const messageText = await mainPage.message.textContent();
  expect(messageText).toBe(
    locaters.messages.messagesText.shortDurationBookingMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration more than 30 minutes.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.LONG_DURATION,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that an appointment is booked when the appointment duration is 30 minutes.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.THIRTY_MIN_DURATION,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails when attempting to book an appointment with a past time.', async () => {
  const bookingData = {
    date: generatePastDate(),
    ...BOOKING_TEST_DATA.PAST_DATE,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.pastDateBookingMessageText
  );
});

test('Verify that the booking fails when the specified time period completely overlaps with a pre-existing appointment.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.OVERLAP,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

// QTDA-5 / BUG-004: End before start shows wrong error message
test('Verify that booking fails when the End Time is set before the Start Time.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.REVERSED_TIME,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.endBeforeStartMessageText
  );
});

test('Verify successful appointment cancellation when all fields have data', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.CANCEL_SUCCESS,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successCancelMessageText
  );
});

// QTDA-6 / BUG-006: Cancel non-existent appointment succeeds
test('Verify that cancellation fails when trying to cancel an appointment that does not exist.', async () => {
  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.notFoundCancelMessageText
  );
});

// BUG-005: Cancel succeeds even when fields are empty
test('Verify that cancellation fails when the date field is empty.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.CANCEL_EMPTY_DATE,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.dateInput.clear();
  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.RequiredMessageText
  );
});

// BUG-005: Cancel succeeds even when fields are empty
test('Verify that cancellation fails when the start time field is empty.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.CANCEL_EMPTY_START,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.startTimeInput.clear();
  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.RequiredMessageText
  );
});

// BUG-005: Cancel succeeds even when fields are empty
test('Verify that cancellation fails when the end time field is empty.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.CANCEL_EMPTY_END,
  };
  createdBookings.push(bookingData);

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  await bookingPage.endTimeInput.clear();
  await bookingPage.cancelAppointment();
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.RequiredMessageText
  );
});

test('Verify that an appointment is not booked when the date is empty.', async () => {
  await bookingPage.dateInput.clear();
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.EMPTY_DATE.date,
    BOOKING_TEST_DATA.EMPTY_DATE.startTime,
    BOOKING_TEST_DATA.EMPTY_DATE.endTime
  );

  expect(await mainPage.getFieldValidationMessage(bookingPage.dateInput)).toBe(
    locaters.messages.messagesText.RequiredMessageText
  );
});

test('Verify that an appointment is not booked when the start time is empty.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.EMPTY_START,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );

  expect(
    await mainPage.getFieldValidationMessage(bookingPage.startTimeInput)
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that an appointment is not booked when the end time is empty.', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.EMPTY_END,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );

  expect(
    await mainPage.getFieldValidationMessage(bookingPage.endTimeInput)
  ).toBe(locaters.messages.messagesText.RequiredMessageText);
});

test('Verify that an appointment can be booked successfully if its Start Time is exactly equal to the End Time of a pre-existing appointment.', async () => {
  const firstBooking = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.ADJACENT,
  };

  await bookingPage.bookAppointment(
    firstBooking.date,
    firstBooking.startTime,
    firstBooking.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
  createdBookings.push(firstBooking);

  const secondEndTime = addMinutesToTime(
    firstBooking.endTime,
    BOOKING_DURATION.STANDARD
  );
  const secondBooking = {
    date: firstBooking.date,
    startTime: firstBooking.endTime,
    endTime: secondEndTime,
  };

  await bookingPage.bookAppointment(
    secondBooking.date,
    secondBooking.startTime,
    secondBooking.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
  createdBookings.push(secondBooking);
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the Date', async () => {
  await bookingPage.dateInput.clear();
  await bookingPage.bookAppointment(
    BOOKING_TEST_DATA.INVALID_DATE.date,
    BOOKING_TEST_DATA.INVALID_DATE.startTime,
    BOOKING_TEST_DATA.INVALID_DATE.endTime
  );

  expect(await mainPage.getFieldValidationMessage(bookingPage.dateInput)).toBe(
    locaters.messages.messagesText.RequiredMessageText
  );
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the StartTime', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.INVALID_START,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).not.toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test('Verify that booking fails and the system handles validation properly when characters or invalid text formats are entered into the EndTime', async () => {
  const bookingData = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.INVALID_END,
  };

  await bookingPage.bookAppointment(
    bookingData.date,
    bookingData.startTime,
    bookingData.endTime
  );
  await expect(mainPage.message).not.toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );
});

test("Verify that booking fails when the new appointment's Start Time starts inside a pre-existing appointment (Partial Overlap).", async () => {
  const firstBooking = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.PARTIAL_OVERLAP,
  };
  createdBookings.push(firstBooking);

  await bookingPage.bookAppointment(
    firstBooking.date,
    firstBooking.startTime,
    firstBooking.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  const secondStartTime = addMinutesToTime(
    firstBooking.startTime,
    BOOKING_DURATION.STANDARD / 2
  );
  const secondEndTime = addMinutesToTime(
    firstBooking.startTime,
    BOOKING_DURATION.STANDARD + BOOKING_DURATION.LONG
  );
  await bookingPage.bookAppointment(
    firstBooking.date,
    secondStartTime,
    secondEndTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

test('Verify that booking fails when there is a minor partial overlap', async () => {
  const firstBooking = {
    date: generateFutureDate(),
    ...BOOKING_TEST_DATA.MINOR_OVERLAP,
  };
  createdBookings.push(firstBooking);

  await bookingPage.bookAppointment(
    firstBooking.date,
    firstBooking.startTime,
    firstBooking.endTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.successBookingMessageText
  );

  const secondStartTime = addMinutesToTime(
    firstBooking.startTime,
    BOOKING_DURATION.STANDARD - 1
  );
  const secondEndTime = addMinutesToTime(
    firstBooking.startTime,
    BOOKING_DURATION.STANDARD * 2
  );
  await bookingPage.bookAppointment(
    firstBooking.date,
    secondStartTime,
    secondEndTime
  );
  await expect(mainPage.message).toHaveText(
    locaters.messages.messagesText.overlappingBookingMessageText
  );
});

test.afterEach(async ({ page }) => {
  for (const booking of createdBookings.splice(0)) {
    try {
      await bookingPage.cancelExistingBooking(
        booking.date,
        booking.startTime,
        booking.endTime
      );
    } catch {}
  }
  await page.reload();
});
