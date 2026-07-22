*** Settings ***
Resource    ../../base.resource
Resource    ../../config/booking_test_data.resource

*** Keywords ***
Send Booking
    [Arguments]    ${body}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Valid Booking Body
    [Arguments]    ${hotel_id}=${VALID_HOTEL_ID}    ${customer_name}=${CUSTOMER_NAME}    ${people}=${VALID_PEOPLE}    ${beds}=${VALID_BEDS}    ${twin}=${VALID_TWIN_BEDS}    ${check_in}=${DEFAULT_CHECK_IN}    ${check_out}=${DEFAULT_CHECK_OUT}
    ${body}=    Create Dictionary
    ...    hotelId=${hotel_id}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${people}
    ...    numberOfBeds=${beds}
    ...    twinBeds=${twin}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    RETURN    ${body}

Get Booking By ID
    [Arguments]    ${booking_id}
    ${response}=    GET On Session    api    ${BOOKING_ENDPOINT}/${booking_id}    expected_status=any
    RETURN    ${response}
