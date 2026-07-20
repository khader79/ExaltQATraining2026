*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   cancel_selectors.resource
Resource   ../Booking/booking_page.resource
Resource   ../../config/timeouts.resource
Resource   ../../config/messages.resource

*** Keywords ***
Fill Cancel Booking ID
    [Arguments]    ${booking_id}
    Clear Element Text    ${CANCEL_BOOKING_ID_INPUT}
    Input Text    ${CANCEL_BOOKING_ID_INPUT}    ${booking_id}

Clear Cancel Booking ID
    Clear Element Text    ${CANCEL_BOOKING_ID_INPUT}

Submit Cancel Booking
    Click Button    ${CANCEL_BOOKING_BTN}

Get Toast Message
    ${message}=    Get Text    ${TOAST}
    RETURN    ${message}

# Legacy keywords kept for backward compatibility with booking_tests
Click Cancel Booking Button
    Click Button    ${CANCEL_BOOKING_BTN}
    Wait Until Element Is Visible    ${CANCEL_BOOKING_ID_INPUT}    timeout=${DEFAULT_TIMEOUT}

Cancel Last Booking
    Wait Until Element Is Visible    ${CANCEL_BOOKING_ID_INPUT}    timeout=${DEFAULT_TIMEOUT}
    Click Cancel Booking Button

Cancel Booking If Exists
    ${cancel_id}=    Get Element Attribute    ${CANCEL_BOOKING_ID_INPUT}    value
    Run Keyword If    '${cancel_id}' != ''    Click Cancel Booking Button

Cleanup Created Booking
    ${cancel_id}=    Get Element Attribute    ${CANCEL_BOOKING_ID_INPUT}    value
    IF    '${cancel_id}' != ''
        Click Button    ${CANCEL_BOOKING_BTN}
        Run Keyword And Ignore Error    Wait Until Element Contains    ${TOAST}    ${CANCEL_SUCCESS}    timeout=15s
    END
    Clear Booking Form
    Clear Cancel Booking ID
