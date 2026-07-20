*** Variables ***
# Search Test Data
${city}                  Dubai
${min_rating}            4
${max_price}             350
${amenity}               pool
${sort_default}          Default
${sort_price}            Price
${sort_rating}           Rating
${non_existent_city}     UnknownCity

# Booking Test Data - Valid
${booking_hotel_id}      HTL-101
${booking_customer}      Test
${booking_people}        1
${booking_beds}          1
${booking_twin_beds}     0
${booking_check_in}      19072026
${booking_check_out}     20072026

# Booking Test Data - Reversed Dates
${reversed_check_in}     20072026
${reversed_check_out}    19072026

# Booking Test Data - Past Dates
${past_check_in}         18072026
${past_check_out}        20072026

# Booking Test Data - Invalid Inputs
${invalid_text}          abc
${non_existent_hotel_id}    HTL-999
${negative_people}          -2
${negative_beds}            -5
${negative_twin_beds}       -1

# Booking Test Data - Same Date
${same_date}               25072026

# Cancellation Test Data
${invalid_booking_id}      BKG-71557743
${spaces_input}             ${SPACE}${SPACE}${SPACE}
${special_chars_id}        @#$%^&*

# Review Test Data
${review_hotel_id}               HTL-101
${review_customer_name}          Sara
${review_rating}                 5
${review_comment}                Great stay
${review_negative_rating}        -5
${review_high_rating}            6
${review_invalid_rating_comment}    Bad
