*** Settings ***
Library    SeleniumLibrary
Resource   ../base_page.resource
Resource   list_bookings_selectors.resource
Resource   ../Cancel/cancel_page.resource
Resource   ../Booking/booking_page.resource
Resource   ../../config/timeouts.resource
Resource   ../../config/messages.resource
Resource   ../../config/TestData.resource
Resource   ../../assertions/list_bookings_assertions.resource
Resource   ../../assertions/cancel_assertions.resource

*** Keywords ***
Fill List Bookings Hotel ID
    [Arguments]    ${hotel_id}
    Clear Element Text    ${LIST_BOOKINGS_HOTEL_ID_INPUT}
    Input Text    ${LIST_BOOKINGS_HOTEL_ID_INPUT}    ${hotel_id}

Clear List Bookings Hotel ID
    Clear Element Text    ${LIST_BOOKINGS_HOTEL_ID_INPUT}

Submit Load Bookings
    Click Button    ${LIST_BOOKINGS_LOAD_BTN}
    Sleep    ${SLEEP_DURATION}

Load Bookings For Hotel
    [Arguments]    ${hotel_id}
    Fill List Bookings Hotel ID    ${hotel_id}
    Submit Load Bookings

Cancel Confirmed Bookings For Hotel
    [Arguments]    ${hotel_id}    ${max_iterations}=30
    FOR    ${i}    IN RANGE    ${max_iterations}
        Fill List Bookings Hotel ID    ${hotel_id}
        Submit Load Bookings
        ${text}=    Get Text    ${LIST_BOOKINGS_OUTPUT}
        ${has_bookings}=    Run Keyword And Return Status    Should Contain    ${text}    "bookings"
        IF    not ${has_bookings}
            BREAK
        END
        ${bookings}=    Evaluate    json.loads("""${text}""")["bookings"]    json
        ${confirmed_ids}=    Evaluate    [b["id"] for b in ${bookings} if b["status"] == "confirmed"]
        ${count}=    Get Length    ${confirmed_ids}
        IF    ${count} == 0
            BREAK
        END
        ${booking_id}=    Set Variable    ${confirmed_ids}[0]
        Fill Cancel Booking ID    ${booking_id}
        Submit Cancel Booking
        Wait Until Element Contains    ${TOAST}    ${CANCEL_SUCCESS}    timeout=10s
    END

Cleanup Page State
    Clear List Bookings Hotel ID
    Clear Cancel Booking ID
    Clear Booking Form

Setup No Rooms Available
    Create Test Booking With Dates    ${conflict_check_in}    ${conflict_check_out}

Setup Fully Booked Scenario
    Create Test Booking With Dates    ${fully_booked_check_in}    ${fully_booked_check_out}

Cleanup After Conflict Test
    Cancel Confirmed Bookings For Hotel    ${booking_hotel_id}
    Clear Cancel Booking ID
    Clear Booking Form
