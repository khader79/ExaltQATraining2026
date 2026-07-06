import time
import random

def generate_unique_mobile():
    prefix = random.choice(["056", "059"])
    timestamp_str = str(int(time.time() * 1000))
    digits = timestamp_str[-7:]
    return prefix + digits