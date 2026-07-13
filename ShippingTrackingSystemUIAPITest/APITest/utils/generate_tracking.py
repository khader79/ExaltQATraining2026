import os


def get_next_tracking_data():
    counter_file = "counter.txt"

    if os.path.exists(counter_file):
        with open(counter_file, "r") as f:
            current_id = int(f.read().strip())
    else:
        current_id = 1

    data = {
        "trackingId": str(current_id),
        "password": str(current_id),
    }

    with open(counter_file, "w") as f:
        f.write(str(current_id + 1))

    return data
