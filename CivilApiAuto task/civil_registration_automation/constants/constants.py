BASE_URL = "http://localhost:3000"

ALL_ENDPOINTS = {
    "invalid_get_endpoint": "/get",
    "get_all_records": "/get/all",
    "get_record_by_id": "/get/{id}",
    "create_record": "/add",
    "update_record": "/edit",
    "delete_record": "/delete/{id}",
}

NORMAL_TEST_DATA = {
    "FirstName": "John",
    "LastName": "Doe",
    "Age": 30,
    "Mobile": "0569974804",
    "Gender": "Male",
    "DOB": "06151990",
}
HTTP_STATUS = {
    "OK": 200,
    "CREATED": 201,
    "BAD_REQUEST": 400,
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "TOO_MANY_REQUESTS": 429,
    "NO_CONTENT": 204
}

ERROR_MESSAGES = {
    "MISSING_FIRST_NAME": "Missing First Name",
    "MISSING_LAST_NAME": "Missing Last Name",
    "MISSING_ID": "Missing ID",
    "MISSING_AGE": "Missing Age",
    "MISSING_MOBILE": "Missing Mobile",
    "CIVIL_ALREADY_EXISTS": "Civil Already Exists",
    "INVALID_AGE": "Invalid Age",
    "AGE_LESS_THAN_ZERO": "Value must be greater than or equal to 0.",
    "NOT_FOUND": "Not Found",
}

RESPONSE_FIELDS = {
    "FIRST_NAME": "FirstName",
    "LAST_NAME": "LastName",
    "ID": "ID",
    "AGE": "Age",
    "MOBILE": "Mobile",
    "GENDER": "Gender",
    "DOB": "DOB"
}

INVALID_TEST_DATA ={
    "empty_user_id":"",
    "empty_first_name":"",
    "empty_last_name":"",
    "invalid_id":"AB",
    "invalid_age":"AB",
    "less_than_zero_age":"-5",
    "zero_age":"0",
    "empty_age":"",
    "more_than_zero_age":"1",
    "less_than_120_age":"119",
    "more_than_120_age":"121",
    "120_age":"120",
    "empty_mobile":"",
    "invalid_mobile":"12345",
    "InvalidID": "XYZ",
    "empty_gender":"",
    "valid_female_gender":"Female",
    "empty_dob":"",
    "future_dob":"12312030",
    "invalid_day_dob":"06002025",
    "invalid_month_dob":"00152025",
}
