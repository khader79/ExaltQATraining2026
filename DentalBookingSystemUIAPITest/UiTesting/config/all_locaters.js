export const locaters = {
  signup: {
    usernameInput: '#signup-username',
    passwordInput: '#signup-password',
    phoneInput: '#signup-phone',
    submitButton: '#signup-form button[type="submit"]',
  },

  login: {
    usernameInput: '#login-username',
    passwordInput: '#login-password',
    submitButton: '#login-form button[type="submit"]',
  },
  booking: {
    bookingSection: '#booking-section',
    dateInput: '#date',
    startTimeInput: '#start-time',
    endTimeInput: '#end-time',
    submitButton: '#booking-form button[type="submit"]',
    cancelButton: '#cancel-appointment',
    logoutButton: '#logout',
  },
  messages: {
    message: '#message',
    massageClasses: {
      successMessageClass: '#success',
      errorMessageClass: '#error',
    },
    messagesText: {
      successCreateMessageText: 'Account created successfully. Please login.',
      existsMessageText: 'Username or phone number already exists',
      RequiredMessageText: 'Please fill out this field.',
      invalidPhoneMessageText: 'Please enter a valid phone number.',
      successLoginMessageText: 'Logged in successfully',
      invalidLoginMessageText: 'Invalid username or password',
      successBookingMessageText: 'Appointment booked successfully',
      successCancelMessageText: 'Appointment canceled successfully',
      pastDateBookingMessageText: 'Cannot book an appointment in the past',
      endBeforeStartMessageText:
        'Cannot book an appointment with end time before start time',
      overlappingBookingMessageText:
        'Appointment slot already booked or overlaps with another appointment',
      notFoundCancelMessageText: 'No appointment found to cancel',
    },
  },
};
