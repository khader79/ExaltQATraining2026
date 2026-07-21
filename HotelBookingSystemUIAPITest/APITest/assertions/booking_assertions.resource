*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Successful Booking
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CREATED}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    booking
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field Equals    ${booking}    status    confirmed
    Verify Response Has Key    ${response}    booking
    Verify Item Field Has Key    ${booking}    id
    Verify Item Field Has Key    ${booking}    amount

Verify Booking Error Response
    [Arguments]    ${response}    ${status}    ${expected_message}
    Verify Status Code    ${response}    ${status}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Has Key    ${response}    message
    Verify Response Field Equals    ${response}    message    ${expected_message}

Verify Booking Conflict Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CONFLICT}
    Verify Response Field Equals    ${response}    success    ${False}
    Verify Response Has Key    ${response}    message
    Verify Response Field Equals    ${response}    message    No rooms available for selected dates

Verify Item Field Has Key
    [Arguments]    ${item}    ${key}
    Dictionary Should Contain Key    ${item}    ${key}

Verify Booking Created With Valid Data
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_CREATED}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response Has Key    ${response}    booking
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field Equals    ${booking}    status    confirmed
    Verify Item Field Has Key    ${booking}    id
    Verify Item Field Has Key    ${booking}    amount

Verify Booking Has Correct Dates
    [Arguments]    ${response}    ${check_in}    ${check_out}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field Equals    ${booking}    checkInDate    ${check_in}
    Verify Item Field Equals    ${booking}    checkOutDate    ${check_out}

Verify Booking Has Correct People
    [Arguments]    ${response}    ${expected_people}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field As Number    ${booking}    numberOfPeople    ${expected_people}

Verify Booking Has Correct Beds
    [Arguments]    ${response}    ${expected_beds}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field As Number    ${booking}    numberOfBeds    ${expected_beds}

Verify Booking Has Correct Twin Beds
    [Arguments]    ${response}    ${expected_twin_beds}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Verify Item Field As Number    ${booking}    twinBeds    ${expected_twin_beds}

Verify Booking Has Positive Amount
    [Arguments]    ${response}
    ${booking}=    Set Variable    ${response.json()}[booking]
    ${amount}=    Set Variable    ${booking}[amount]
    Should Be True    ${amount} > 0

Verify Booking Amount Is Not Null
    [Arguments]    ${response}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Should Not Be Equal    ${booking}[amount]    ${None}

Verify Booking People Is Not Null
    [Arguments]    ${response}
    ${booking}=    Set Variable    ${response.json()}[booking]
    Should Not Be Equal    ${booking}[numberOfPeople]    ${None}
