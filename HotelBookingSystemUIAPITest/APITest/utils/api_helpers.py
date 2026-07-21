import math
import uuid
from datetime import datetime, timedelta


def calculate_total_pages(total_count, page_size):
    if page_size == 0:
        return 0
    return math.ceil(total_count / page_size)
