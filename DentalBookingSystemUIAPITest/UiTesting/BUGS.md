# Bug Report — Dental Booking System

## BUG-001: Phone field accepts special characters
| Field | Value |
|---|---|
| **Module** | Signup |
| **Severity** | Medium |
| **Test** | `signup.spec.js:137` — "Verify that the user creation process fails if characters or special symbols are typed in the phone number field" |
| **Steps** | 1. Go to signup form. 2. Enter valid username/password. 3. Enter special chars in phone (`abc!@#$`). 4. Click Sign Up. |
| **Expected** | Validation error: "Please enter a valid phone number." |
| **Actual** | Account created successfully. Message: "Account created successfully. Please log in." |

## BUG-002: Whitespace-only inputs accepted on signup
| Field | Value |
|---|---|
| **Module** | Signup |
| **Severity** | Medium |
| **Test** | `signup.spec.js:157` — "Verify that when fields are filled only with blank spaces (whitespaces), the account is not created." |
| **Steps** | 1. Go to signup form. 2. Enter only spaces in all fields. 3. Click Sign Up. |
| **Expected** | Validation error: "Please fill out this field." |
| **Actual** | Account created successfully. Message: "Account created successfully. Please log in." |

## BUG-003: Appointments with duration < 30 minutes are accepted
| Field | Value |
|---|---|
| **Module** | Booking |
| **Severity** | High |
| **Test** | `booking.spec.js:67` — "Verify that booking fails when the appointment duration is less than 30 minutes." |
| **Steps** | 1. Book appointment with start=10:00, end=10:29 (29 min duration). 2. Click Book Appointment. |
| **Expected** | Error: appointment duration must be at least 30 minutes. |
| **Actual** | Appointment booked successfully. Message: "Appointment booked successfully" |

## BUG-004: End time before start time shows wrong error message
| Field | Value |
|---|---|
| **Module** | Booking |
| **Severity** | High |
| **Test** | `booking.spec.js:166` — "Verify that booking fails when the End Time is set before the Start Time." |
| **Steps** | 1. Set start=9:00, end=8:30. 2. Click Book Appointment. |
| **Expected** | Error: "Cannot book an appointment with end time before start time" |
| **Actual** | Error: "Appointment must be at least 20 minutes" (incorrect message) |

## BUG-005: Cancel appointment succeeds even when fields are empty
| Field | Value |
|---|---|
| **Module** | Booking |
| **Severity** | High |
| **Test** | `booking.spec.js:205,225,245` — "Verify that cancellation fails when the date/start time/end time field is empty." |
| **Steps** | 1. Book an appointment. 2. Clear one field (date/start/end). 3. Click Cancel Appointment. |
| **Expected** | Cancellation fails with validation error. |
| **Actual** | Cancellation succeeds. Message: "Appointment canceled successfully" |

## BUG-006: Cancel non-existent appointment succeeds
| Field | Value |
|---|---|
| **Module** | Booking |
| **Severity** | High |
| **Test** | `booking.spec.js:196` — "Verify that cancellation fails when trying to cancel an appointment that does not exist." |
| **Steps** | 1. Log in. 2. Click Cancel Appointment without booking first. |
| **Expected** | Error: "No appointment found to cancel" |
| **Actual** | Cancellation succeeds. Message: "Appointment canceled successfully" |

## BUG-007: Logout button missing from booking page
| Field | Value |
|---|---|
| **Module** | UI |
| **Severity** | Low |
| **Test** | `uiTests.spec.js:72` — "Verify the presence of a Logout button on the main booking page to allow users to terminate their session." |
| **Steps** | 1. Sign up. 2. Log in. 3. Observe booking page. |
| **Expected** | Logout button is visible. |
| **Actual** | No logout button is rendered on the page. |
