*** Settings ***
Library    Collections
Library    ../utils/api_helpers.py
Resource    ../base.resource

*** Variables ***
${HOTELS_LIST_KEY}    hotels
@{HOTEL_FIELDS}       ${FIELD_ID}    ${FIELD_NAME}    ${FIELD_CITY}    ${FIELD_PRICE}    ${FIELD_RATING}    ${FIELD_AMENITIES}    ${FIELD_ROOMS}

*** Keywords ***
Verify Hotels List Length Matches Count
    [Arguments]    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels_length}=    Get Length    ${json}[${HOTELS_LIST_KEY}]
    Should Be Equal As Numbers    ${hotels_length}    ${json}[count]

Verify Count Does Not Exceed PageSize
    [Arguments]    ${response}
    ${json}=    Set Variable    ${response.json()}
    Should Be True    ${json}[count] <= ${json}[pageSize]

Verify Page Is Positive
    [Arguments]    ${response}
    ${json}=    Set Variable    ${response.json()}
    Should Be True    ${json}[page] > 0

Verify TotalPages MatchesCalculation
    [Arguments]    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${expected_pages}=    Calculate Total Pages    ${json}[totalCount]    ${json}[pageSize]
    Should Be Equal As Numbers    ${json}[totalPages]    ${expected_pages}

Verify Hotels Structure
    [Arguments]    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels}=    Set Variable    ${json}[${HOTELS_LIST_KEY}]
    Verify All Items Have Required Fields    ${response}    ${HOTELS_LIST_KEY}    ${HOTEL_FIELDS}
    Verify Items Have Fields With Types    ${hotels}    ${FIELD_PRICE}    ${TYPE_NUMBER}
    Verify Items Have Fields With Types    ${hotels}    ${FIELD_RATING}    ${TYPE_NUMBER}
    Verify Items Have Fields With Types    ${hotels}    ${FIELD_ROOMS}    ${TYPE_NUMBER}
    Verify Items Have Fields With Types    ${hotels}    ${FIELD_AMENITIES}    ${TYPE_LIST}

Verify Pagination Structure
    [Arguments]    ${response}
    Verify Response Has Key    ${response}    success
    Verify Response Has Key    ${response}    count
    Verify Response Has Key    ${response}    totalCount
    Verify Response Has Key    ${response}    page
    Verify Response Has Key    ${response}    pageSize
    Verify Response Has Key    ${response}    totalPages
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}

Verify Default Hotels Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Pagination Structure    ${response}
    Verify Page Is Positive    ${response}
    Verify Count Does Not Exceed PageSize    ${response}
    Verify TotalPages MatchesCalculation    ${response}
    Verify Hotels List Length Matches Count    ${response}
    Verify Hotels Structure    ${response}

Verify Filtered Hotels Response
    [Arguments]    ${response}    ${field}    ${expected}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}
    Verify Response Has Key    ${response}    count
    Verify Hotels List Length Matches Count    ${response}
    Verify Hotels Structure    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels}=    Set Variable    ${json}[${HOTELS_LIST_KEY}]
    Verify All Items Have Same Value    ${hotels}    ${field}    ${expected}

Verify Empty Hotels Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Count Equals    ${response}    0
    Verify Response List Empty    ${response}    ${HOTELS_LIST_KEY}

Verify Filtered Hotels By Amenity
    [Arguments]    ${response}    ${amenity}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}
    Verify Hotels List Length Matches Count    ${response}
    Verify Hotels Structure    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels}=    Set Variable    ${json}[${HOTELS_LIST_KEY}]
    Verify All Items Have Value In List    ${hotels}    ${FIELD_AMENITIES}    ${amenity}

Verify Filtered Hotels By Max Price
    [Arguments]    ${response}    ${max_price}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}
    Verify Hotels List Length Matches Count    ${response}
    Verify Hotels Structure    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels}=    Set Variable    ${json}[${HOTELS_LIST_KEY}]
    Verify All Items Have Value At Most    ${hotels}    ${FIELD_PRICE}    ${max_price}

Verify Filtered Hotels By Min Rating
    [Arguments]    ${response}    ${min_rating}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}
    Verify Hotels List Length Matches Count    ${response}
    Verify Hotels Structure    ${response}
    ${json}=    Set Variable    ${response.json()}
    ${hotels}=    Set Variable    ${json}[${HOTELS_LIST_KEY}]
    Verify All Items Have Value At Least    ${hotels}    ${FIELD_RATING}    ${min_rating}

Verify Page Response
    [Arguments]    ${response}    ${page_number}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Page Number    ${response}    ${page_number}
    Verify Pagination Structure    ${response}
    Verify Hotels Structure    ${response}

Verify Default Page Fallback
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Page Number    ${response}    ${DEFAULT_PAGE}
    Verify Pagination Structure    ${response}
    Verify Hotels Structure    ${response}

Verify Buggy Filter Behavior
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${TRUE}
    Verify Response Has Key    ${response}    ${HOTELS_LIST_KEY}
    Verify Response List Not Empty    ${response}    ${HOTELS_LIST_KEY}
