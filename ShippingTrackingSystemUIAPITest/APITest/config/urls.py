import os

BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000")

ENDPOINTS = {
    "TRACK": "/track",
    "UPDATE": "/update",
}
