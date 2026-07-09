import requests

from APITesting.config.constants import BASE_URL, ENDPOINTS


def book_appointment(payload: dict):
    url = BASE_URL + ENDPOINTS['BOOK_APPOINTMENT']
    response = requests.post(url, json=payload)
    print(f"Book Appointment Response: {response.status_code} - {response.text}")
    return response

def cancel_appointment(payload: dict):
    url = BASE_URL + ENDPOINTS['CANCEL_APPOINTMENT']
    response = requests.post(url, json=payload)
    print(f"Cancel Appointment Response: {response.status_code} - {response.text}")
    return response