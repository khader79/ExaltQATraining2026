*** Variables ***
# TC-1: Search by City
${city}                  Dubai

# TC-2: Min Rating Filter
${min_rating}            4

# TC-3: Max Price Filter
${max_price}             350

# TC-4: Amenity Filter
${amenity}               pool

# TC-5: Sort Default (label text)
${sort_default}          Default

# TC-6: Sort By Price (label text)
${sort_price}            Price

# TC-7: Sort By Rating (label text)
${sort_rating}           Rating

# TC-9: Non-existent City
${non_existent_city}     UnknownCity

# TC-11: Valid Booking
${booking_hotel_id}      HTL-101
${booking_customer}      Test
${booking_people}        1
${booking_beds}          1
${booking_twin_beds}     0
${booking_check_in}      19072026
${booking_check_out}     20072026

# TC-12: Reversed Dates
${reversed_check_in}     20072026
${reversed_check_out}    19072026

# TC-20: Past Check-in Date
${past_check_in}         18072026
${past_check_out}        20072026

# TC-21: Conflicting Dates (no rooms)
${conflict_check_in}     19072026
${conflict_check_out}    20072026
