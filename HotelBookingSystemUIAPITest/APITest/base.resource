*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    OperatingSystem
Library    utils/api_helpers.py
Resource   config/env.resource

*** Variables ***
${FIELD_ID}              id
${FIELD_NAME}            name
${FIELD_CITY}            city
${FIELD_PRICE}           pricePerNight
${FIELD_RATING}          rating
${FIELD_AMENITIES}       amenities
${FIELD_ROOMS}           roomsAvailable
${FIELD_HOTEL_ID}        hotelId
${FIELD_CUSTOMER_NAME}   customerName
${FIELD_PEOPLE}          numberOfPeople
${FIELD_BEDS}            numberOfBeds
${FIELD_TWIN_BEDS}       twinBeds
${FIELD_CHECK_IN}        checkInDate
${FIELD_CHECK_OUT}       checkOutDate
${FIELD_STATUS}          status
${FIELD_BOOKING_ID}      bookingId
${FIELD_AMOUNT}          amount
${TYPE_NUMBER}      number
${TYPE_STRING}      string
${TYPE_LIST}        list
${DEFAULT_PAGE}     1

*** Keywords ***
Create API Session
    ${headers}=    Create Dictionary    Content-Type=${CONTENT_TYPE}    Accept=${ACCEPT}
    Create Session    api    ${BASE_URL}    headers=${headers}    verify=${True}

# --- Response Field Verification ---

Verify Status Code
    [Arguments]    ${response}    ${expected}
    Should Be Equal As Numbers    ${response.status_code}    ${expected}

Verify Response Field Equals
    [Arguments]    ${response}    ${field}    ${expected}
    Should Be Equal    ${response.json()}[${field}]    ${expected}

Verify Response Field As Number
    [Arguments]    ${response}    ${field}    ${expected}
    Should Be Equal As Numbers    ${response.json()}[${field}]    ${expected}

# --- Key Presence ---

Verify Response Has Key
    [Arguments]    ${response}    ${key}
    Dictionary Should Contain Key    ${response.json()}    ${key}

Verify Response Does Not Have Key
    [Arguments]    ${response}    ${key}
    Dictionary Should Not Contain Key    ${response.json()}    ${key}

# --- List Verification ---

Verify Response List Length
    [Arguments]    ${response}    ${list_key}    ${expected}
    ${json}=    Set Variable    ${response.json()}
    ${length}=    Get Length    ${json}[${list_key}]
    Should Be Equal As Numbers    ${length}    ${expected}

Verify Response List Not Empty
    [Arguments]    ${response}    ${list_key}
    ${json}=    Set Variable    ${response.json()}
    ${length}=    Get Length    ${json}[${list_key}]
    Should Be True    ${length} > 0

Verify Response List Empty
    [Arguments]    ${response}    ${list_key}
    ${json}=    Set Variable    ${response.json()}
    ${length}=    Get Length    ${json}[${list_key}]
    Should Be Equal As Numbers    ${length}    0

# --- Item Structure Verification ---

Verify All Items Have Required Fields
    [Arguments]    ${response}    ${list_key}    ${fields}
    ${json}=    Set Variable    ${response.json()}
    ${items}=    Set Variable    ${json}[${list_key}]
    FOR    ${item}    IN    @{items}
        FOR    ${field}    IN    @{fields}
            Dictionary Should Contain Key    ${item}    ${field}
        END
    END

Verify Item Field Equals
    [Arguments]    ${item}    ${field}    ${expected}
    Should Be Equal    ${item}[${field}]    ${expected}

Verify Item Field As Number
    [Arguments]    ${item}    ${field}    ${expected}
    Should Be Equal As Numbers    ${item}[${field}]    ${expected}

Verify Item Field List Equals
    [Arguments]    ${item}    ${field}    ${expected}
    Lists Should Be Equal    ${item}[${field}]    ${expected}

# --- Item Type Verification ---

Verify Item Field Is Number
    [Arguments]    ${item}    ${field}
    Should Be True    isinstance($item[$field], (int, float))

Verify Item Field Is String
    [Arguments]    ${item}    ${field}
    Should Be True    isinstance($item[$field], str)

Verify Item Field Is List
    [Arguments]    ${item}    ${field}
    Should Be True    isinstance($item[$field], list)

Verify Items Have Fields With Types
    [Arguments]    ${items}    ${field}    ${type}
    FOR    ${item}    IN    @{items}
        IF    "${type}" == "${TYPE_NUMBER}"
            Verify Item Field Is Number    ${item}    ${field}
        ELSE IF    "${type}" == "${TYPE_STRING}"
            Verify Item Field Is String    ${item}    ${field}
        ELSE IF    "${type}" == "${TYPE_LIST}"
            Verify Item Field Is List    ${item}    ${field}
        END
    END

# --- Filter Verification ---

Verify All Items Have Same Value
    [Arguments]    ${items}    ${field}    ${expected}
    FOR    ${item}    IN    @{items}
        Verify Item Field Equals    ${item}    ${field}    ${expected}
    END

Verify All Items Have Value In List
    [Arguments]    ${items}    ${field}    ${expected}
    FOR    ${item}    IN    @{items}
        List Should Contain Value    ${item}[${field}]    ${expected}
    END

Verify All Items Have Value At Most
    [Arguments]    ${items}    ${field}    ${max}
    ${limit}=    Evaluate    float($max)
    FOR    ${item}    IN    @{items}
        Should Be True    $item[$field] <= $limit
    END

Verify All Items Have Value At Least
    [Arguments]    ${items}    ${field}    ${min}
    ${limit}=    Evaluate    float($min)
    FOR    ${item}    IN    @{items}
        Should Be True    $item[$field] >= $limit
    END

Verify Response Count Equals
    [Arguments]    ${response}    ${expected}
    Verify Response Field As Number    ${response}    count    ${expected}

Verify Response Page Number
    [Arguments]    ${response}    ${expected}
    Verify Response Field As Number    ${response}    page    ${expected}
