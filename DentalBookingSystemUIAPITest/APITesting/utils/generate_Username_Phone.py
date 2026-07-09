import random
import string


def generate_username_phone():

    username = ''.join(
        random.choices(string.ascii_lowercase + string.digits, k=8)
    )

    phone_number = ''.join(
        random.choices(string.digits, k=10)
    )

    return username, phone_number