*** Settings ***
Resource    ../../base.resource
Resource    ../../config/booking_test_data.resource

*** Keywords ***
Send Booking
    [Arguments]    ${body}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    ${has_booking}=    Run Keyword And Return Status    Dictionary Should Contain Key    ${response.json()}    booking
    Run Keyword If    ${has_booking}    Append To List    ${BOOKING_IDS}    ${response.json()}[booking][id]
    RETURN    ${response}

Valid Booking Body
    [Arguments]    ${hotel_id}=${VALID_HOTEL_ID}    ${customer_name}=${CUSTOMER_NAME}    ${people}=${VALID_PEOPLE}    ${beds}=${VALID_BEDS}    ${twin}=${VALID_TWIN_BEDS}    ${check_in}=2026-08-20    ${check_out}=2026-08-25
    ${body}=    Create Dictionary
    ...    hotelId=${hotel_id}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${people}
    ...    numberOfBeds=${beds}
    ...    twinBeds=${twin}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    RETURN    ${body}
