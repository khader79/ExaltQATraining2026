const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return regex.test(email);
}

console.log(validateEmail('khader.qaabar@gmail.com')); // true
console.log(validateEmail('invalid-email')); // false
