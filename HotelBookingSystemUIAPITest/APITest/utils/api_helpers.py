import math
import uuid
from datetime import datetime, timedelta


def calculate_total_pages(total_count, page_size):
    if page_size == 0:
        return 0
    return math.ceil(total_count / page_size)


def generate_unique_id():
    return str(uuid.uuid4())[:8]


def generate_customer_name():
    return "Customer_" + generate_unique_id()


def get_next_date_by_days(days_from_now):
    days = int(days_from_now)
    return (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")
