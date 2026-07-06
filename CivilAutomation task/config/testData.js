const BASE_URL = "http://localhost:3000/";

const VALID_CIVIL_DATA = {
  firstName: "Waleed",
  lastName: "Qanbar",
  age: "30",
  mobile: "059974504",
  dob: "06151990",
  gender: "Male",
};

const CIVIL_VALIDATION = {
  ERRORS: {
    GENDER_EMPTY: "Please select an item in the list.",
    AGE_MIN: "Value must be greater than or equal to 0.",
    AGE_MAX: "Value must be less than or equal to 120.",
    DOB_FUTURE: "Value must be 12/31/2025 or earlier.",
    FIELD_REQUIRED: "Please fill out this field",
  },
  BOUNDARIES: {
    UPDATED_FIRSTNAME: "UpdatedName",
    INVALID_ID_TEXT: "AB",
    VALID_SHORT_ID: "12",
    INVALID_AGE_MIN: "-1",
    VALID_AGE_ZERO: "0",
    VALID_AGE_ONE: "1",
    VALID_AGE_NEAR_MAX: "119",
    VALID_AGE_MAX: "120",
    INVALID_AGE_MAX: "121",
    VALID_AGE_SINGLE_DIGIT: "6",
    INVALID_MOBILE_TEXT: "ABasasdads",
    VALID_MOBILE_ALT: "0569974804",
    UNIQUE_MOBILE_SEED: "0569974504",
    INVALID_DOB_FUTURE: "01122027",
    INVALID_DOB_FORMAT: "06-15-1990",
    VALID_DOB: "06151990",
    VALID_FIRSTNAME: "Waleed",
    VALID_LASTNAME: "Qanbar",
  }
};

API_URL = `${BASE_URL}get/all`;

module.exports = {
  BASE_URL,
  VALID_CIVIL_DATA,
  CIVIL_VALIDATION,
  API_URL,
};