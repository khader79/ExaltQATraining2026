*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   booking_selectors.resource
Resource   ../../config/timeouts.resource
Resource   ../../config/TestData.resource
Resource   ../../config/messages.resource
Resource   ../../assertions/booking_assertions.resource

*** Keywords ***
Fill Booking Field
    [Arguments]    ${field_locator}    ${value}
    Clear Element Text    ${field_locator}
    Input Text    ${field_locator}    ${value}

Clear Booking Field
    [Arguments]    ${field_locator}
    Clear Element Text    ${field_locator}

Fill Hotel ID
    [Arguments]    ${hotel_id}
    Fill Booking Field    ${BOOKING_HOTEL_ID_INPUT}    ${hotel_id}

Clear Hotel ID
    Clear Booking Field    ${BOOKING_HOTEL_ID_INPUT}

Fill Customer Name
    [Arguments]    ${name}
    Fill Booking Field    ${BOOKING_CUSTOMER_INPUT}    ${name}

Clear Customer Name
    Clear Booking Field    ${BOOKING_CUSTOMER_INPUT}

Fill People
    [Arguments]    ${count}
    Fill Booking Field    ${BOOKING_PEOPLE_INPUT}    ${count}

Clear People
    Clear Booking Field    ${BOOKING_PEOPLE_INPUT}

Fill Beds
    [Arguments]    ${count}
    Fill Booking Field    ${BOOKING_BEDS_INPUT}    ${count}

Clear Beds
    Clear Booking Field    ${BOOKING_BEDS_INPUT}

Fill Twin Beds
    [Arguments]    ${count}
    Fill Booking Field    ${BOOKING_TWIN_BEDS_INPUT}    ${count}

Clear Twin Beds
    Clear Booking Field    ${BOOKING_TWIN_BEDS_INPUT}

Fill Check In Date
    [Arguments]    ${date}
    Fill Booking Field    ${BOOKING_CHECK_IN_INPUT}    ${date}

Clear Check In Date
    Clear Booking Field    ${BOOKING_CHECK_IN_INPUT}

Fill Check Out Date
    [Arguments]    ${date}
    Fill Booking Field    ${BOOKING_CHECK_OUT_INPUT}    ${date}

Clear Check Out Date
    Clear Booking Field    ${BOOKING_CHECK_OUT_INPUT}

Clear Booking Form
    Clear Booking Field    ${BOOKING_HOTEL_ID_INPUT}
    Clear Booking Field    ${BOOKING_CUSTOMER_INPUT}
    Clear Booking Field    ${BOOKING_PEOPLE_INPUT}
    Clear Booking Field    ${BOOKING_BEDS_INPUT}
    Clear Booking Field    ${BOOKING_TWIN_BEDS_INPUT}
    Clear Booking Field    ${BOOKING_CHECK_IN_INPUT}
    Clear Booking Field    ${BOOKING_CHECK_OUT_INPUT}

Fill Valid Booking
    [Arguments]    ${hotel_id}=${booking_hotel_id}    ${customer}=${booking_customer}    ${people}=${booking_people}    ${beds}=${booking_beds}    ${twin_beds}=${booking_twin_beds}    ${check_in}=${booking_check_in}    ${check_out}=${booking_check_out}
    Fill Hotel ID        ${hotel_id}
    Fill Customer Name   ${customer}
    Fill People          ${people}
    Fill Beds            ${beds}
    Fill Twin Beds       ${twin_beds}
    Fill Check In Date   ${check_in}
    Fill Check Out Date  ${check_out}

Submit Booking
    Click Button    ${BOOKING_SUBMIT_BTN}
    Wait Until Element Is Visible    ${BOOKING_OUTPUT}    timeout=${DEFAULT_TIMEOUT}

Create Test Booking
    Fill Valid Booking
    Submit Booking
    Verify Booking Created Successfully

Create Test Booking And Verify All Fields
    Fill Valid Booking
    Submit Booking
    Verify Booking Created Successfully
    Verify Booking Response Contains All Fields    ${BOOKING_OUTPUT}    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}

Verify Booking With Blank Field
    [Arguments]    ${field_locator}
    Fill Valid Booking
    Clear Booking Field    ${field_locator}
    Submit Booking
    Verify Booking Created Successfully

Verify Booking Blocked With Blank Field
    [Arguments]    ${field_locator}
    Fill Valid Booking
    Clear Booking Field    ${field_locator}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_MISSING_FIELDS}

Verify Booking Blocked With InvalidText
    [Arguments]    ${field_locator}    ${error_msg}
    Fill Valid Booking
    Fill Booking Field    ${field_locator}    ${invalid_text}
    Verify Field Rejects NonNumeric Input    ${field_locator}    ${invalid_text}    ${error_msg}

Verify Booking Blocked With InvalidDateRange
    [Arguments]    ${check_in}    ${check_out}
    Fill Valid Booking    check_in=${check_in}    check_out=${check_out}
    Submit Booking
    Verify Booking Error Message    ${BOOKING_INVALID_DATES}

Verify Booking Blocked With NonExistent Hotel
    [Arguments]    ${hotel_id}
    Fill Valid Booking    hotel_id=${hotel_id}
    Submit Booking
    Verify Booking Error Message    ${HOTEL_NOT_FOUND}

Verify Booking Blocked With Negative People
    Fill Valid Booking    people=${negative_people}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}

Verify Booking Blocked With Negative Beds
    Fill Valid Booking    beds=${negative_beds}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}

Verify Booking Blocked With Negative Twin Beds
    Fill Valid Booking    twin_beds=${negative_twin_beds}
    Submit Booking
    Verify Booking Error Message    ${INVALID_NEGATIVE_VALUE}
