from APITesting.config.constants import BOOKING_PAYLOAD, MESSAGES
from APITesting.pages.bookingPage import book_appointment
from APITesting.utils.booking_payload import create_booking_payload


def test_book_appointment(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response = book_appointment(booking_payload)

    if response.status_code == 201:
        setup_booking["booking_payload"].append(booking_payload)

    response_json = response.json()

    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201, but got {response.status_code}"
    )


def test_book_appointment_with_past_date(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["pastDate"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["past"]
    assert response.status_code == 400, (
        f"Expected status code 400 for past date, but got {response.status_code}"
    )


def test_book_appointment_with_less_than_30(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endtimeLessThan30Minutes"],
        username
    )

    response = book_appointment(booking_payload)

    if response.status_code == 201:
        setup_booking["booking_payload"].append(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["less_than_30"]
    assert response.status_code == 400, (
        f"Expected status code 400 for less than 30 minutes, but got {response.status_code}"
    )


def test_book_appointment_with_more_than_30(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response = book_appointment(booking_payload)

    if response.status_code == 201:
        setup_booking["booking_payload"].append(booking_payload)

    response_json = response.json()

    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201 for valid appointment, but got {response.status_code}"
    )


def test_book_appointment_with_exactly_30(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["exactly30Minutes"],
        username
    )

    response = book_appointment(booking_payload)

    if response.status_code == 201:
        setup_booking["booking_payload"].append(booking_payload)

    response_json = response.json()

    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201 for valid appointment, but got {response.status_code}"
    )


def test_book_appointment_with_end_time_before_start_time(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTimeBeforeStartTime"],
        username
    )

    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["end_time_before_start_time"]
    assert response.status_code == 400, (
        f"Expected status code 400 for end time before start time, but got {response.status_code}"
    )


def test_book_appointment_existing_appointment(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response1 = book_appointment(booking_payload)

    if response1.status_code == 201:
        setup_booking["booking_payload"].append(booking_payload)

    assert response1.status_code == 201, (
        f"Expected status code 201 for first booking, but got {response1.status_code}"
    )

    response2 = book_appointment(booking_payload)

    response_json = response2.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["existing_appointment"]
    assert response2.status_code == 409, (
        f"Expected status code 409 for existing appointment, but got {response2.status_code}"
    )


def test_book_appointment_startTime_isEndTime_for_other_appointment(setup_booking):
    username = setup_booking["username"]

    booking_payload1 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response1 = book_appointment(booking_payload1)

    assert response1.status_code == 201, (
        f"Expected status code 201 for first booking, but got {response1.status_code}"
    )

    setup_booking["booking_payload"].append(booking_payload1)

    booking_payload2 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["endTime"],
        BOOKING_PAYLOAD["secondEndtime"],
        username
    )

    response2 = book_appointment(booking_payload2)

    assert response2.status_code == 201, (
        f"Expected status code 201 for second booking, but got {response2.status_code}"
    )

    setup_booking["booking_payload"].append(booking_payload2)

    response_json = response2.json()

    assert response_json["success"] == True

def test_book_appointment_startTime_isEndTime_for_other_appointment_partially_overlap(setup_booking):
    username = setup_booking["username"]

    booking_payload1 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response1 = book_appointment(booking_payload1)

    assert response1.status_code == 201, (
        f"Expected status code 201 for first booking, but got {response1.status_code}"
    )

    setup_booking["booking_payload"].append(booking_payload1)

    booking_payload2 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["partialOverlapStartTime"],
        BOOKING_PAYLOAD["partialOverlapEndTime"],
        username
    )

    response2 = book_appointment(booking_payload2)

    response_json = response2.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["existing_appointment"]
    assert response2.status_code == 409, (
        f"Expected status code 409 for overlapping appointment, but got {response2.status_code}"
    )


def test_book_appointment_with_overlap_by_one_minute(setup_booking):
    username = setup_booking["username"]

    booking_payload1 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response1 = book_appointment(booking_payload1)

    

    assert response1.status_code == 201, (
        f"Expected status code 201 for first booking, but got {response1.status_code}"
    )

    setup_booking["booking_payload"].append(booking_payload1)

    booking_payload2 = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["overlapByOneMinuteStartTime"],
        BOOKING_PAYLOAD["overlapByOneMinuteEndTime"],
        username
    )   
    response2 = book_appointment(booking_payload2)

    response_json = response2.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["existing_appointment"]
    assert response2.status_code == 409, (
        f"Expected status code 409 for overlapping appointment, but got {response2.status_code}"
    )

def test_book_appointment_with_empty_date(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["empty"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["empty_field"]
    assert response.status_code == 400, (
        f"Expected status code 400 for empty date, but got {response.status_code}"
    )
    setup_booking["booking_payload"].append(booking_payload)

def test_book_appointment_with_empty_startTime(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["empty"],
        BOOKING_PAYLOAD["endTime"],
        username
    )

    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["empty_field"]
    assert response.status_code == 400, (
        f"Expected status code 400 for empty startTime, but got {response.status_code}"
    )
    setup_booking["booking_payload"].append(booking_payload)

def test_book_appointment_with_empty_endTime(setup_booking):
    username = setup_booking["username"]

    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["empty"],
        username
    )

    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["empty_field"]
    assert response.status_code == 400, (
        f"Expected status code 400 for empty endTime, but got {response.status_code}"
    )
    

def test_book_appointment_with_empty_username(setup_booking):
    booking_payload = create_booking_payload(
        BOOKING_PAYLOAD["date"],
        BOOKING_PAYLOAD["startTime"],
        BOOKING_PAYLOAD["endTime"],
        ""
    )
    setup_booking["booking_payload"].append(booking_payload)
    response = book_appointment(booking_payload)

    response_json = response.json()

    assert response_json["message"] == MESSAGES["empty_field"]
    assert response_json["success"] == False
    assert response.status_code == 400, (
        f"Expected status code 400 for empty username, but got {response.status_code}"
    )

