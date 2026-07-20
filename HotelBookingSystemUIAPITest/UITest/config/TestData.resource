*** Variables ***
${city}                          Dubai
${min_rating}                    4
${max_price}                     350
${amenity}                       pool
${sort_default}                  Default
${sort_price}                    Price
${sort_rating}                   Rating
${non_existent_city}             UnknownCity

${booking_hotel_id}              HTL-101
${booking_customer}              Test
${booking_people}                1
${booking_beds}                  1
${booking_twin_beds}             0
${booking_check_in}              19072026
${booking_check_out}             20072026

${reversed_check_in}             20072026
${reversed_check_out}            19072026

${past_check_in}                 18072026
${past_check_out}                20072026

${conflict_check_in}             19072026
${conflict_check_out}            20072026

${fully_booked_check_in}         25072026
${fully_booked_check_out}        27072026

${pre_conflict_check_in}         24072026
${pre_conflict_check_out}        26072026

${overlap_check_in}              26072026
${overlap_check_out}             27072026

${adjacent_check_in}             27072026
${adjacent_check_out}            28072026

${invalid_text_input}            abc

${non_existent_hotel_id}         HTL-999

${negative_people}               -2
${negative_beds}                 -5
${negative_twin_beds}            -1

${one_day_check_in}              25072026
${one_day_check_out}             25072026

${invalid_booking_id}            BKG-71557743
${special_chars_id}              @#$%^&*
${spaces_input}                  ${SPACE}${SPACE}${SPACE}

${review_hotel_id}               HTL-101
${review_customer_name}          Sara
${review_rating}                 5
${review_comment}                Great stay

${review_negative_rating}        -5
${review_high_rating}            6
${review_invalid_rating_comment}    Bad

${review_valid_rating}           4
