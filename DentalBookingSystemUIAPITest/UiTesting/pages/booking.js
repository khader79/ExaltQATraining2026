import { locaters } from '../config/all_locaters.js';

export class BookingPage {
  constructor(page) {
    this.page = page;
    this.bookingSection = page.locator(locaters.booking.bookingSection);
    this.dateInput = page.locator(locaters.booking.dateInput);
    this.startTimeInput = page.locator(locaters.booking.startTimeInput);
    this.endTimeInput = page.locator(locaters.booking.endTimeInput);
    this.submitButton = page.locator(locaters.booking.submitButton);
    this.cancelButton = page.locator(locaters.booking.cancelButton);
  }

  async getBookingSection() {
    return this.bookingSection;
  }

  async bookAppointment(date, startTime, endTime) {
    await this.dateInput.clear();
    await this.dateInput.focus();
    await this.dateInput.pressSequentially(date);

    if (startTime && /[a-zA-Z]/.test(startTime)) {
      await this.startTimeInput.focus();
      await this.startTimeInput.pressSequentially(startTime);
    } else {
      await this.startTimeInput.fill(startTime || '');
    }

    if (endTime && /[a-zA-Z]/.test(endTime)) {
      await this.endTimeInput.focus();
      await this.endTimeInput.pressSequentially(endTime);
    } else {
      await this.endTimeInput.fill(endTime || '');
    }

    await this.submitButton.click();
  }

  async cancelExistingBooking(date, startTime, endTime) {
    await this.dateInput.clear();
    await this.dateInput.focus();
    await this.dateInput.pressSequentially(date);
    await this.startTimeInput.fill(startTime);
    await this.endTimeInput.fill(endTime);
    await this.cancelButton.click();
  }

  async cancelAppointment() {
    await this.cancelButton.click();
  }

  async getDateInput() {
    return this.dateInput;
  }

  async getStartTimeInput() {
    return this.startTimeInput;
  }

  async getEndTimeInput() {
    return this.endTimeInput;
  }

  async getSubmitButton() {
    return this.submitButton;
  }

  async getCancelButton() {
    return this.cancelButton;
  }

  async getEndTimeValue() {
    return await this.endTimeInput.inputValue();
  }

  async getStartTimeValue() {
    return await this.startTimeInput.inputValue();
  }
}
