*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Get Hotels
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    expected_status=${STATUS_OK}
    RETURN    ${response}

Filter Hotels By City
    [Arguments]    ${city}
    ${params}=    Create Dictionary    city=${city}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}

Filter Hotels By Amenity
    [Arguments]    ${amenity}
    ${params}=    Create Dictionary    amenity=${amenity}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}

Filter Hotels By Max Price
    [Arguments]    ${max_price}
    ${params}=    Create Dictionary    maxPrice=${max_price}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}

Filter Hotels By Min Rating
    [Arguments]    ${min_rating}
    ${params}=    Create Dictionary    minRating=${min_rating}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}

Filter Hotels By Page
    [Arguments]    ${page}
    ${params}=    Create Dictionary    page=${page}
    ${response}=    GET On Session    api    ${SEARCH_ENDPOINT}    params=${params}    expected_status=${STATUS_OK}
    RETURN    ${response}
