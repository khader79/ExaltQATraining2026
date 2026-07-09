from APITesting.config.constants import BOOKING_PAYLOAD

def create_booking_payload(date=None, startTime=None, endTime=None,username=None):
    return {
        "date": date if date is not None else BOOKING_PAYLOAD["date"],
        "startTime": startTime if startTime is not None else BOOKING_PAYLOAD["startTime"],
        "endTime": endTime if endTime is not None else BOOKING_PAYLOAD["endTime"],
        "username": username if username is not None else None
    }