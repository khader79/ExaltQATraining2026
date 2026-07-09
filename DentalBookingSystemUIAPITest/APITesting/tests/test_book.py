from APITesting.config.constants import BOOKING_PAYLOAD, MESSAGES
from APITesting.pages.bookingPage import book_appointment
from APITesting.tests.conftest import setup_booking
from APITesting.utils.booking_payload import create_booking_payload

def test_book_appointment(setup_booking):
    username = setup_booking["username"]
    booking_payload = create_booking_payload(BOOKING_PAYLOAD["date"], 
                                             BOOKING_PAYLOAD["startTime"], 
                                             BOOKING_PAYLOAD["endTime"], username)
    
    setup_booking["booking_payload"].update(booking_payload)

    response = book_appointment(booking_payload)
    response_json = response.json()
    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201, but got {response.status_code}")
    
def test_book_appointment_with_past_date(setup_booking):
    username = setup_booking["username"]
    booking_payload = create_booking_payload(BOOKING_PAYLOAD["pastDate"], 
                                             BOOKING_PAYLOAD["startTime"], 
                                             BOOKING_PAYLOAD["endTime"], username)
    
    setup_booking["booking_payload"].update(booking_payload)

    response = book_appointment(booking_payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["past"]
    assert response.status_code == 400, (
        f"Expected status code 400 for past date, but got {response.status_code}")


def test_book_appointment_with_less_than_30(setup_booking):
    username = setup_booking["username"]
    booking_payload = create_booking_payload(BOOKING_PAYLOAD["date"], 
                                             BOOKING_PAYLOAD["startTime"], 
                                             BOOKING_PAYLOAD["endtimeLessThan30Minutes"], 
                                             username)
    
    setup_booking["booking_payload"].update(booking_payload)

    response = book_appointment(booking_payload)
    response_json = response.json()
    assert response_json["success"] == False
    assert response_json["message"] == MESSAGES["less_than_30"]
    assert response.status_code == 400, (
        f"Expected status code 400 for less than 30 minutes, but got {response.status_code}")


def test_book_appointment_with_more_than_30(setup_booking):
    username = setup_booking["username"]
    booking_payload = create_booking_payload(BOOKING_PAYLOAD["date"], 
                                             BOOKING_PAYLOAD["startTime"], 
                                             BOOKING_PAYLOAD["endTime"], 
                                             username)
    
    setup_booking["booking_payload"].update(booking_payload)

    response = book_appointment(booking_payload)
    response_json = response.json()
    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201 for valid appointment, but got {response.status_code}")

def test_book_appointment_with_exactly_30(setup_booking):
    username = setup_booking["username"]
    booking_payload = create_booking_payload(BOOKING_PAYLOAD["date"], 
                                             BOOKING_PAYLOAD["startTime"], 
                                             BOOKING_PAYLOAD["exactly30Minutes"], 
                                             username)
    
    setup_booking["booking_payload"].update(booking_payload)

    response = book_appointment(booking_payload)
    response_json = response.json()
    assert response_json["success"] == True
    assert response.status_code == 201, (
        f"Expected status code 201 for valid appointment, but got {response.status_code}")



