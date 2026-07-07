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

  async getDateInput() {
    return this.dateInput;
  }

  async getStartTimeInput() {
    return this.startTimeInput;
  }

  async getEndTimeInput() {
    return this.endTimeInput;
  }

  async bookAppointment(date, startTime, endTime) {
    await this.dateInput.focus();
    await this.dateInput.pressSequentially(date);

    await this.startTimeInput.fill(startTime);
    await this.endTimeInput.fill(endTime);

    await this.submitButton.click();
  }

  async cancelAppointment() {
    await this.cancelButton.click();
  }
}
