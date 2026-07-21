*** Settings ***
Library    OperatingSystem

*** Variables ***
${BASE_URL}            %{API_BASE_URL=http://localhost:3000}
${CONTENT_TYPE}        application/json
${ACCEPT}              application/json
${STATUS_OK}           200
${STATUS_CREATED}      201
${STATUS_BAD_REQUEST}  400
${STATUS_NOT_FOUND}    404
${STATUS_CONFLICT}     409
${SEARCH_ENDPOINT}     /api/hotels
${BOOKING_ENDPOINT}    /api/bookings
${CANCEL_ENDPOINT}     /api/bookings
${REVIEW_ENDPOINT}     /api/reviews
