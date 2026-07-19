import requests
from datetime import datetime

BASE_URL = "http://localhost:3000"

def to_api_date(d):
    return datetime.strptime(d, "%d%m%Y").strftime("%Y-%m-%d")

def fill_all_rooms(hotel_id, check_in, check_out, customer="API Fill", people=1, beds=1, twin_beds=0):
    filled = 0
    while True:
        payload = {
            "hotelId": hotel_id,
            "customerName": customer,
            "people": people,
            "beds": beds,
            "twinBeds": twin_beds,
            "checkInDate": to_api_date(check_in),
            "checkOutDate": to_api_date(check_out)
        }
        resp = requests.post(f"{BASE_URL}/api/bookings", json=payload)
        data = resp.json()
        if data.get("success"):
            filled += 1
        else:
            break
    return filled

def cancel_all_bookings():
    resp = requests.get(f"{BASE_URL}/api/bookings")
    bookings = resp.json().get("bookings", [])
    cancelled = 0
    for b in bookings:
        if b.get("status") == "confirmed":
            requests.delete(f"{BASE_URL}/api/bookings/{b['id']}")
            cancelled += 1
    return cancelled
