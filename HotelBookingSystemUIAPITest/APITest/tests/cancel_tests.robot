*** Settings ***
Documentation    Cancel Booking API Tests
Resource         ../base.resource
Resource         ../client/booking/booking_keywords.resource
Resource         ../client/cancel/cancel_keywords.resource
Resource         ../assertions/booking_assertions.resource
Resource         ../assertions/cancel_assertions.resource
Resource         ../config/booking_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-31 Cancel Valid Booking
    [Tags]    cancel    positive
    ${body}=    Valid Booking Body    check_in=${CANCEL_CHECK_IN}    check_out=${CANCEL_CHECK_OUT}
    ${response}=    Send Booking    ${body}
    ${booking_id}=    Set Variable    ${response.json()}[booking][id]
    ${cancel_response}=    Cancel Booking By ID    ${booking_id}
    Verify Successful Cancel    ${cancel_response}

TC-32 Cancel Non Existent Booking
    [Tags]    cancel    negative
    ${cancel_response}=    Cancel Booking By ID    ${NON_EXISTENT_BOOKING_ID}
    Verify Booking Error Response    ${cancel_response}    ${STATUS_NOT_FOUND}    ${ERR_BOOKING_NOT_FOUND}

TC-33 Cancel Already Cancelled Booking
    [Tags]    cancel    negative    bug
    ${body}=    Valid Booking Body    check_in=${CANCEL_REDO_CHECK_IN}    check_out=${CANCEL_REDO_CHECK_OUT}
    ${response}=    Send Booking    ${body}
    ${booking_id}=    Set Variable    ${response.json()}[booking][id]
    Cancel Booking By ID    ${booking_id}
    ${cancel_response}=    Cancel Booking By ID    ${booking_id}
    Verify Booking Error Response    ${cancel_response}    ${STATUS_BAD_REQUEST}    ${ERR_ALREADY_CANCELLED}
