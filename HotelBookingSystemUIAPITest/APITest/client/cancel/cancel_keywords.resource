*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Cancel Booking By ID
    [Arguments]    ${booking_id}
    ${response}=    DELETE On Session    api    ${BOOKING_ENDPOINT}/${booking_id}    expected_status=any
    RETURN    ${response}
