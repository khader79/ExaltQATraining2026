*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Cancel Last Booking
    Run Keyword If    "${LAST_BOOKING_ID}" != "${NONE}"    Delete Booking By ID    ${LAST_BOOKING_ID}
    Set Suite Variable    ${LAST_BOOKING_ID}    ${NONE}

Delete Booking By ID
    [Arguments]    ${booking_id}
    DELETE On Session    api    ${CANCEL_ENDPOINT}/${booking_id}    expected_status=any
    Set Suite Variable    ${LAST_BOOKING_ID}    ${NONE}
