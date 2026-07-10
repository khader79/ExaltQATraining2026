from APITesting.config.constants import CANCEL_PAYLOAD

def create_cancel_payload(date=None, startTime=None, endTime=None, username=None):
    return {
        "date": date if date is not None else CANCEL_PAYLOAD["date"],
        "startTime": startTime if startTime is not None else CANCEL_PAYLOAD["startTime"],
        "endTime": endTime if endTime is not None else CANCEL_PAYLOAD["endTime"],
        "username": username if username is not None else None
    }