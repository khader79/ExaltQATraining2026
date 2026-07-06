import time


def generate_unique_id() -> str:
    return str(int(time.time() * 1000))[-8:]
