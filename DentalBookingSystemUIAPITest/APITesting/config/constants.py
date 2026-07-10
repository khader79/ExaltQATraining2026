from APITesting.utils.generate_Username_Phone import generate_username_phone

BASE_URL = "http://localhost:8080"


ENDPOINTS = {
    "SIGNUP": "/signup",
    "LOGIN": "/login",
    "BOOK_APPOINTMENT": "/book",
    "CANCEL_APPOINTMENT": "/cancel"
}


SIGNUP_PAYLOAD = {
    "password": "testpassword",
    "empty": "",
    "whitespace": "   ",
    "invalid_phone": "123^&*&"

}

LOGIN_PAYLOAD = {
    "invalid_username": "nonexistentuser",
    "invalid_password": "wrongpassword"
}

BOOKING_PAYLOAD = {
    "date": "2030-11-19",   
    "startTime": "10:00",
    "endTime": "11:00",
    "pastDate": "2025-08-15",
    "endtimeLessThan30Minutes": "10:29",
    "exactly30Minutes": "10:30",
    "endTimeBeforeStartTime": "09:30",
    "secondEndtime": "11:30",
    "partialOverlapStartTime": "10:10",
    "partialOverlapEndTime": "11:10",
    "overlapByOneMinuteStartTime": "10:59",
    "overlapByOneMinuteEndTime": "11:59",
    "empty": ""
}

MESSAGES ={
    "invalid_credentials": "Invalid username or password",
    "username_empty": "Username cannot be empty",
    "password_empty": "Password cannot be empty",
    "phone_empty": "Phone cannot be empty",
    "invalid_phone": "Invalid phone number",
    "past": "Cannot book an appointment in the past",
    "less_than_30": "Appointment duration must be at least 30 minutes",
    "end_time_before_start_time": "End time must be after start time",
    "existing_appointment" : "Appointment slot already booked or overlaps with another appointment",
    "empty_field": "Field cannot be empty",
    "appointment_not_found": "Appointment not found",
    "cancel_success": "Appointment canceled successfully",
}

CANCEL_PAYLOAD = {
    "date": "2027-08-19",
    "startTime": "10:00",
    "endTime": "11:00",
    "nonExistentDate": "2027-08-11",
    "empty": ""
}