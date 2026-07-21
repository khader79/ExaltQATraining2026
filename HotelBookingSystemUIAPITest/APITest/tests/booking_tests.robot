*** Settings ***
Documentation    Booking Hotels API Tests
Resource         ../base.resource
Resource         ../client/booking/booking_keywords.resource
Resource         ../client/cancel/cancel_keywords.resource
Resource         ../assertions/booking_assertions.resource
Resource         ../assertions/cancel_assertions.resource
Resource         ../config/booking_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions
Test Setup       Set Suite Variable    ${LAST_BOOKING_ID}    ${NONE}
Test Teardown    Cancel Last Booking

*** Test Cases ***
TC-10 Create Valid Booking
    [Tags]    booking    positive
    ${body}=    Valid Booking Body
    ${response}=    Send Booking    ${body}
    Verify Successful Booking    ${response}

TC-11 Reject Booking Missing customerName
    [Tags]    booking    negative
    ${body}=    Valid Booking Body
    Remove From Dictionary    ${body}    customerName
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-12 Reject Booking No Rooms Available
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=2026-09-19    check_out=2026-09-24
    Send Booking    ${body}
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-13 Reject Booking Invalid Date Range
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=2026-07-31    check_out=2026-07-26
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-14 Reject Booking Non Existent Hotel
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${NON_EXISTENT_HOTEL_ID}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_NOT_FOUND}    Hotel not found

TC-15 Reject Booking Zero People
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    people=0
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid number of guests

TC-16 Reject Booking Negative Beds
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    beds=-1
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid bed count

TC-17 Reject Booking Past Check In
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    check_in=${DATE_PAST}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-18 Reject Booking Invalid Date Format
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=${INVALID_DATE}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-19 Reject Booking Empty customerName
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    customer_name=${EMPTY}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-20 Reject Booking Negative Twin Beds
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    twin=-1
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid twin bed count

TC-21 Reject Booking Same Day Dates
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_out=2026-08-20
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-22 Reject Booking Check Out Before Check In
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=2026-07-31    check_out=2026-07-26
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid date range

TC-23 Reject Booking Empty Hotel ID
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${EMPTY}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Missing required booking fields

TC-24 Reject Booking Invalid People Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    people=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-25 Reject Booking Invalid Beds Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    beds=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-26 Reject Booking Invalid Twin Beds Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    twin=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    Invalid data type

TC-27 Reject Booking Overlap Start Boundary
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=2026-09-29    check_out=2026-10-05
    ${existing}=    Send Booking    ${body}
    ${body}[checkOutDate]=    Set Variable    2026-10-01
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-28 Reject Booking Overlap End Boundary
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=2026-10-05    check_out=2026-10-11
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    2026-10-08
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-29 Reject Booking Enclosing Existing
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=2026-10-11    check_out=2026-10-14
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    2026-10-09
    ${body}[checkOutDate]=    Set Variable    2026-10-16
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-30 Allow Booking Adjacent Before
    [Tags]    booking    positive    adjacent
    ${body}=    Valid Booking Body    check_in=2026-10-17    check_out=2026-10-21
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    2026-10-11
    ${body}[checkOutDate]=    Set Variable    2026-10-17
    ${response}=    Send Booking    ${body}
    Verify Successful Booking    ${response}

TC-31 Allow Booking Adjacent After
    [Tags]    booking    positive    adjacent
    ${body}=    Valid Booking Body    check_in=2026-10-22    check_out=2026-10-26
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    2026-10-26
    ${body}[checkOutDate]=    Set Variable    2026-10-31
    ${response}=    Send Booking    ${body}
    Verify Successful Booking    ${response}
