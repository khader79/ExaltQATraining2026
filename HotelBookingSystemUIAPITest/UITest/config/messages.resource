*** Variables ***
${NO_RESULTS_TEXT}                  No hotels found.
${BOOKING_SUCCESS_TEXT}             "success": true
${BOOKING_MISSING_FIELDS}          Missing required booking fields
${BOOKING_INVALID_DATES}           Invalid date range
${BOOKING_NO_ROOMS}                No rooms available for selected dates
${HOTEL_NOT_FOUND}                 Hotel not found
${INVALID_PEOPLE_MSG}              People field should not accept non-numeric text
${INVALID_BEDS_MSG}                Beds field should not accept non-numeric text
${INVALID_TWIN_BEDS_MSG}           Twin Beds field should not accept non-numeric text
${INVALID_HOTEL_ID_MSG}            Hotel ID field should not accept non-existent hotel
${INVALID_NEGATIVE_VALUE}          Negative values are not accepted

# Cancellation Messages
${CANCEL_SUCCESS}                  cancelled
${CANCEL_BOOKING_NOT_FOUND}        Booking not found
${CANCEL_EMPTY_ID}                 Enter booking ID to cancel
${INVALID_ID_FORMAT}               Invalid booking ID format

# List Bookings Messages
${LIST_BOOKINGS_EMPTY_ID}          Enter hotel ID to list bookings.

# Review Messages
${REVIEW_SUCCESS_SUBMIT}           submitted
${REVIEW_MISSING_FIELDS}           Missing required review fields
${REVIEW_DELETE_SUCCESS}           deleted
${REVIEW_DELETE_EMPTY_ID}          Enter review ID to delete
