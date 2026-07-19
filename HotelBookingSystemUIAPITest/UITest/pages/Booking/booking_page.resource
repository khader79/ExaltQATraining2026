*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   booking_selectors.resource
Resource   ../../config/Constants.resource
Resource   ../../config/TestData.resource

*** Keywords ***
Fill Hotel ID
    [Arguments]    ${hotel_id}
    Input Text    ${BOOKING_HOTEL_ID_INPUT}    ${hotel_id}

Clear Hotel ID
    Clear Element Text    ${BOOKING_HOTEL_ID_INPUT}

Fill Customer Name
    [Arguments]    ${name}
    Input Text    ${BOOKING_CUSTOMER_INPUT}    ${name}

Clear Customer Name
    Clear Element Text    ${BOOKING_CUSTOMER_INPUT}

Fill People
    [Arguments]    ${count}
    Input Text    ${BOOKING_PEOPLE_INPUT}    ${count}

Clear People
    Clear Element Text    ${BOOKING_PEOPLE_INPUT}

Fill Beds
    [Arguments]    ${count}
    Input Text    ${BOOKING_BEDS_INPUT}    ${count}

Clear Beds
    Clear Element Text    ${BOOKING_BEDS_INPUT}

Fill Twin Beds
    [Arguments]    ${count}
    Input Text    ${BOOKING_TWIN_BEDS_INPUT}    ${count}

Clear Twin Beds
    Clear Element Text    ${BOOKING_TWIN_BEDS_INPUT}

Fill Check In Date
    [Arguments]    ${date}
    Input Text    ${BOOKING_CHECK_IN_INPUT}    ${date}

Clear Check In Date
    Clear Element Text    ${BOOKING_CHECK_IN_INPUT}

Fill Check Out Date
    [Arguments]    ${date}
    Input Text    ${BOOKING_CHECK_OUT_INPUT}    ${date}

Clear Check Out Date
    Clear Element Text    ${BOOKING_CHECK_OUT_INPUT}

Click Book Room Button
    Click Button    ${BOOKING_SUBMIT_BTN}
    Sleep    ${SLEEP_DURATION}

Clear Booking Form
    Clear Hotel ID
    Clear Customer Name
    Clear People
    Clear Beds
    Clear Twin Beds
    Clear Check In Date
    Clear Check Out Date

Fill Valid Booking
    [Arguments]    ${hotel_id}    ${customer}    ${people}    ${beds}    ${twin_beds}    ${check_in}    ${check_out}
    Fill Hotel ID        ${hotel_id}
    Fill Customer Name   ${customer}
    Fill People          ${people}
    Fill Beds            ${beds}
    Fill Twin Beds       ${twin_beds}
    Fill Check In Date   ${check_in}
    Fill Check Out Date  ${check_out}

Fill All Booking Fields Except
    [Arguments]    ${skip_field}
    Fill Valid Booking    ${booking_hotel_id}    ${booking_customer}    ${booking_people}    ${booking_beds}    ${booking_twin_beds}    ${booking_check_in}    ${booking_check_out}
    Run Keyword If    "${skip_field}" == "Hotel ID"          Clear Hotel ID
    Run Keyword If    "${skip_field}" == "Customer Name"     Clear Customer Name
    Run Keyword If    "${skip_field}" == "People"            Clear People
    Run Keyword If    "${skip_field}" == "Beds"              Clear Beds
    Run Keyword If    "${skip_field}" == "Twin Beds"         Clear Twin Beds
    Run Keyword If    "${skip_field}" == "Check In Date"     Clear Check In Date
    Run Keyword If    "${skip_field}" == "Check Out Date"    Clear Check Out Date

Submit Booking
    Click Book Room Button

Verify Booking Success
    Wait Until Element Is Visible    ${BOOKING_OUTPUT}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain           ${BOOKING_OUTPUT}    ${BOOKING_SUCCESS_TEXT}

Verify Booking Error
    [Arguments]    ${expected_error}
    Wait Until Element Is Visible    ${BOOKING_OUTPUT}    timeout=${DEFAULT_TIMEOUT}
    Element Should Contain           ${BOOKING_OUTPUT}    ${expected_error}
