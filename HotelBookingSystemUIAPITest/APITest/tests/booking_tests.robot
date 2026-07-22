*** Settings ***
Documentation    Booking Hotels API Tests
Resource         ../base.resource
Resource         ../client/booking/booking_keywords.resource
Resource         ../assertions/booking_assertions.resource
Resource         ../config/booking_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

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
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-12 Reject Booking No Rooms Available
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=${NO_ROOMS_CHECK_IN}    check_out=${NO_ROOMS_CHECK_OUT}
    Send Booking    ${body}
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-13 Reject Booking Invalid Date Range
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=${INVALID_RANGE_CHECK_IN}    check_out=${INVALID_RANGE_CHECK_OUT}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_DATE}

TC-14 Reject Booking Non Existent Hotel
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${NON_EXISTENT_HOTEL_ID}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_NOT_FOUND}    ${ERR_HOTEL_NOT_FOUND}

TC-15 Reject Booking Zero People
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    people=0
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_GUESTS}

TC-16 Reject Booking Negative Beds
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    beds=-1
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_BEDS}

TC-17 Reject Booking Past Check In
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    check_in=${DATE_PAST}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_DATE}

TC-18 Reject Booking Invalid Date Format
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_in=${INVALID_DATE}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_DATE}

TC-19 Reject Booking Empty customerName
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    customer_name=${EMPTY}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-20 Reject Booking Negative Twin Beds
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    twin=-1
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_TWIN}

TC-21 Reject Booking Same Day Dates
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    check_out=${DEFAULT_CHECK_IN}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_DATE}

TC-22 Reject Booking Empty Hotel ID
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${EMPTY}
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_MISSING_FIELDS}

TC-23 Reject Booking Invalid People Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    people=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_TYPE}

TC-24 Reject Booking Invalid Beds Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    beds=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_TYPE}

TC-25 Reject Booking Invalid Twin Beds Type
    [Tags]    booking    negative
    ${body}=    Valid Booking Body    hotel_id=${SECOND_HOTEL_ID}    twin=one
    ${response}=    Send Booking    ${body}
    Verify Booking Error Response    ${response}    ${STATUS_BAD_REQUEST}    ${ERR_INVALID_TYPE}

TC-26 Reject Booking Overlap Start Boundary
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=${OVERLAP_1_CHECK_IN}    check_out=${OVERLAP_1_CHECK_OUT}
    ${existing}=    Send Booking    ${body}
    ${body}[checkOutDate]=    Set Variable    ${OVERLAP_1_MODIFY_OUT}
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-27 Reject Booking Overlap End Boundary
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=${OVERLAP_2_CHECK_IN}    check_out=${OVERLAP_2_CHECK_OUT}
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    ${OVERLAP_2_MODIFY_IN}
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-28 Reject Booking Enclosing Existing
    [Tags]    booking    negative    overlap
    ${body}=    Valid Booking Body    check_in=${ENCLOSING_CHECK_IN}    check_out=${ENCLOSING_CHECK_OUT}
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    ${ENCLOSING_MODIFY_IN}
    ${body}[checkOutDate]=    Set Variable    ${ENCLOSING_MODIFY_OUT}
    ${response}=    Send Booking    ${body}
    Verify Booking Conflict Response    ${response}

TC-29 Allow Booking Adjacent Before
    [Tags]    booking    positive    adjacent
    ${body}=    Valid Booking Body    check_in=${ADJACENT_BEFORE_CHECK_IN}    check_out=${ADJACENT_BEFORE_CHECK_OUT}
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    ${ADJACENT_BEFORE_NEW_IN}
    ${body}[checkOutDate]=    Set Variable    ${ADJACENT_BEFORE_NEW_OUT}
    ${response}=    Send Booking    ${body}
    Verify Successful Booking    ${response}

TC-30 Allow Booking Adjacent After
    [Tags]    booking    positive    adjacent
    ${body}=    Valid Booking Body    check_in=${ADJACENT_AFTER_CHECK_IN}    check_out=${ADJACENT_AFTER_CHECK_OUT}
    ${existing}=    Send Booking    ${body}
    ${body}[checkInDate]=    Set Variable    ${ADJACENT_AFTER_NEW_IN}
    ${body}[checkOutDate]=    Set Variable    ${ADJACENT_AFTER_NEW_OUT}
    ${response}=    Send Booking    ${body}
    Verify Successful Booking    ${response}
