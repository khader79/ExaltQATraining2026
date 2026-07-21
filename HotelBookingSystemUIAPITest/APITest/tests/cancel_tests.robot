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
Test Teardown    Cancel All Bookings

*** Test Cases ***
TC-32 Cancel Valid Booking
    [Tags]    cancel    positive
    ${body}=    Valid Booking Body    check_in=2026-11-01    check_out=2026-11-05
    ${response}=    Send Booking    ${body}
    ${booking_id}=    Set Variable    ${response.json()}[booking][id]
    ${cancel_response}=    DELETE On Session    api    ${CANCEL_ENDPOINT}/${booking_id}    expected_status=any
    Verify Successful Cancel    ${cancel_response}

TC-33 Cancel Non Existent Booking
    [Tags]    cancel    negative
    ${cancel_response}=    DELETE On Session    api    ${CANCEL_ENDPOINT}/FAKE-ID-999    expected_status=any
    Verify Booking Error Response    ${cancel_response}    ${STATUS_NOT_FOUND}    Booking not found

TC-34 Cancel Already Cancelled Booking
    [Tags]    cancel    negative    bug
    ${body}=    Valid Booking Body    check_in=2026-11-06    check_out=2026-11-10
    ${response}=    Send Booking    ${body}
    ${booking_id}=    Set Variable    ${response.json()}[booking][id]
    DELETE On Session    api    ${CANCEL_ENDPOINT}/${booking_id}    expected_status=any
    ${cancel_response}=    DELETE On Session    api    ${CANCEL_ENDPOINT}/${booking_id}    expected_status=any
    Verify Booking Error Response    ${cancel_response}    ${STATUS_BAD_REQUEST}    Already cancelled
