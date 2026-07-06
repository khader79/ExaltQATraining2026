from civil_registration_automation.constants.constants import NORMAL_TEST_DATA, INVALID_TEST_DATA, HTTP_STATUS, ERROR_MESSAGES, RESPONSE_FIELDS
from civil_registration_automation.pages.add_civil_api import add_civil_record
from civil_registration_automation.utils.id_generator import generate_unique_id
from civil_registration_automation.utils.mobile_generator import generate_unique_mobile
from civil_registration_automation.utils.civil_record_builder import build_civil_record_data
from civil_registration_automation.utils.record_validator import validate_civil_record


def test_add_civil_record(created_record):
    record = created_record["response"]
    validate_civil_record(record, created_record["data"])


def test_add_civil_record_with_empty_firstname(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, FirstName=INVALID_TEST_DATA["empty_first_name"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty FirstName, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["MISSING_FIRST_NAME"] in response.text, f"Expected error message for empty FirstName, but got {response.text}"


def test_add_civil_record_with_empty_lastname(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, LastName=INVALID_TEST_DATA["empty_last_name"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty LastName, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["MISSING_LAST_NAME"] in response.text, f"Expected error message for empty LastName, but got {response.text}"


def test_add_civil_record_with_empty_ID(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=INVALID_TEST_DATA["empty_user_id"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty ID, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["MISSING_ID"] in response.text, f"Expected error message for empty ID, but got {response.text}"


def test_add_civil_record_with_existing_ID(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id)
    add_civil_record(data)
    response1 = add_civil_record(data)
    assert response1.status_code == HTTP_STATUS["NOT_FOUND"], f"Expected status code {HTTP_STATUS['NOT_FOUND']} for existing ID, but got {response1.status_code}. Response: {response1.text}"
    assert ERROR_MESSAGES["CIVIL_ALREADY_EXISTS"] in response1.text, f"Expected error message for existing ID, but got {response1.text}"


def test_add_civil_record_with_invalid_ID(cleanup_box):
    cleanup_box["ids"].append(INVALID_TEST_DATA["invalid_id"])
    data = build_civil_record_data(ID=INVALID_TEST_DATA["invalid_id"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for invalid ID, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_empty_age(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["empty_age"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty age, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["MISSING_AGE"] in response.text, f"Expected error message for empty age, but got {response.text}"


def test_add_civil_record_with_invalid_age(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["invalid_age"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for invalid age, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["INVALID_AGE"] in response.text, f"Expected error message for invalid age, but got {response.text}"


def test_add_civil_record_with_less_than_zero_age(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["less_than_zero_age"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for less than zero age, but got {response.status_code}. Response: {response.text}"
    assert ERROR_MESSAGES["AGE_LESS_THAN_ZERO"] in response.text, f"Expected error message for less than zero age, but got {response.text}"


def test_add_civil_record_with_zero_age_data(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["zero_age"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for zero age, but got {response.status_code}. Response: {response.text}"
    validate_civil_record(record, data)


def test_add_civil_record_with_more_than_zero_age_data(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["more_than_zero_age"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for more than zero age, but got {response.status_code}. Response: {response.text}"
    validate_civil_record(record, data)


def test_add_civil_record_with_age_less_than_120(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["less_than_120_age"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for age {INVALID_TEST_DATA['less_than_120_age']}, but got {response.status_code}."
    assert str(record.get(RESPONSE_FIELDS["AGE"])) == str(INVALID_TEST_DATA["less_than_120_age"])
    validate_civil_record(record, data)


def test_add_civil_record_with_age_120(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["120_age"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for age {INVALID_TEST_DATA['120_age']}, but got {response.status_code}."
    assert str(record.get(RESPONSE_FIELDS["AGE"])) == str(INVALID_TEST_DATA["120_age"])
    validate_civil_record(record, data)

def test_add_civil_record_with_more_than_120_age(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Age=INVALID_TEST_DATA["more_than_120_age"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"🚨 BUG: API accepted age {INVALID_TEST_DATA['more_than_120_age']} and returned {response.status_code} instead of {HTTP_STATUS['BAD_REQUEST']} Bad Request!"
    validate_civil_record(record, data)

def test_add_civil_record_with_empty_mobile(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Mobile=INVALID_TEST_DATA["empty_mobile"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty Mobile, but got {response.status_code}."
    assert ERROR_MESSAGES["MISSING_MOBILE"] in response.text, f"Expected error message '{ERROR_MESSAGES['MISSING_MOBILE']}', but got {response.text}"


def test_add_civil_record_with_existing_mobile(cleanup_box):
    record_id_1 = generate_unique_id()
    phone_number = generate_unique_mobile()
    cleanup_box["ids"].append(record_id_1)
    data_1 = build_civil_record_data(ID=record_id_1, Mobile=phone_number)
    add_civil_record(data_1)

    record_id_2 = generate_unique_id()
    cleanup_box["ids"].append(record_id_2)
    data_2 = build_civil_record_data(ID=record_id_2, Mobile=phone_number)
    response = add_civil_record(data_2)

    assert response.status_code in [HTTP_STATUS["BAD_REQUEST"], HTTP_STATUS["NOT_FOUND"], HTTP_STATUS["CONFLICT"]], f"🚨 BUG: API accepted an existing mobile number and returned {response.status_code} instead of an error status code!"


def test_add_civil_record_with_invalid_mobile_format(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Mobile=INVALID_TEST_DATA["invalid_mobile"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"🚨 BUG: API accepted invalid mobile text format ('AB12345678') and returned {response.status_code} instead of {HTTP_STATUS['BAD_REQUEST']} Bad Request!"


def test_add_civil_record_with_valid_gender_data(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id)
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for valid gender, but got {response.status_code}. Response: {response.text}"
    validate_civil_record(record, data)


def test_add_civil_record_with_accepted_male_gender(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Gender=NORMAL_TEST_DATA["Gender"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for accepted male gender, but got {response.status_code}. Response: {response.text}"
    validate_civil_record(record, data)


def test_add_civil_record_with_accepted_female_gender(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Gender=INVALID_TEST_DATA["valid_female_gender"])
    response = add_civil_record(data)
    record = response.json()
    assert response.status_code == HTTP_STATUS["CREATED"], f"Expected status code {HTTP_STATUS['CREATED']} for accepted female gender, but got {response.status_code}. Response: {response.text}"
    validate_civil_record(record, data)


def test_add_civil_record_with_empty_gender(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, Gender=INVALID_TEST_DATA["empty_gender"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty gender, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_future_dob(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, DOB=INVALID_TEST_DATA["future_dob"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for future DOB, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_invalid_day_in_dob(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, DOB=INVALID_TEST_DATA["invalid_day_dob"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for invalid day in DOB, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_invalid_month_in_dob(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, DOB=INVALID_TEST_DATA["invalid_month_dob"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for invalid month in DOB, but got {response.status_code}. Response: {response.text}"


def test_add_civil_record_with_empty_dob(cleanup_box):
    record_id = generate_unique_id()
    cleanup_box["ids"].append(record_id)
    data = build_civil_record_data(ID=record_id, DOB=INVALID_TEST_DATA["empty_dob"])
    response = add_civil_record(data)
    assert response.status_code == HTTP_STATUS["BAD_REQUEST"], f"Expected status code {HTTP_STATUS['BAD_REQUEST']} for empty DOB, but got {response.status_code}. Response: {response.text}"


