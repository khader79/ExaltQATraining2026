import re


def has_price_above(text, max_price):
    prices = re.findall(r'\$(\d+)', text)
    return any(int(p) > int(max_price) for p in prices)
