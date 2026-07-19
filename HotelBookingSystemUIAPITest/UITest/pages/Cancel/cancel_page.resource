*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   cancel_selectors.resource
Resource   ../../config/Constants.resource

*** Keywords ***
Click Cancel Booking Button
    Click Button    ${CANCEL_BOOKING_BTN}
    Sleep    ${SLEEP_DURATION}

Cancel Last Booking
    Wait Until Element Is Visible    ${CANCEL_BOOKING_ID_INPUT}    timeout=${DEFAULT_TIMEOUT}
    Click Cancel Booking Button
