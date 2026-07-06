export const locaters = {
  signup: {
    usernameInput: '#signup-username',
    passwordInput: '#signup-password',
    phoneInput: '#signup-phone',
    submitButton: '#signup-form button[type="submit"]',
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
    },
    massageColors: {
      successMessageColor: 'rgb(0, 128, 0)',
      errorMessageColor: 'rgb(255, 0, 0)',
    },
  },
};
