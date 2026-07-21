*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   cancel_selectors.resource
Resource   ../../config/Constants.resource

*** Keywords ***
Fill Cancel Booking ID
    [Arguments]    ${booking_id}
    Clear Element Text    ${CANCEL_BOOKING_ID_INPUT}
    Input Text            ${CANCEL_BOOKING_ID_INPUT}    ${booking_id}

Clear Cancel Booking ID
    Clear Element Text    ${CANCEL_BOOKING_ID_INPUT}

Click Cancel Booking Button
    Click Button    ${CANCEL_BOOKING_BTN}
    Sleep    ${SLEEP_DURATION}

Submit Cancel Booking
    Click Cancel Booking Button

Cancel Last Booking
    Wait Until Element Is Visible    ${CANCEL_BOOKING_ID_INPUT}    timeout=${DEFAULT_TIMEOUT}
    Click Cancel Booking Button

Cancel Booking If Exists
    ${cancel_id}=    Get Element Attribute    ${CANCEL_BOOKING_ID_INPUT}    value
    Run Keyword If    '${cancel_id}' != ''    Click Cancel Booking Button
