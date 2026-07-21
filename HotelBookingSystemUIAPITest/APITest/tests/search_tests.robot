*** Settings ***
Documentation    Search Hotels API Tests
Resource         ../base.resource
Resource         ../client/search/search_keywords.resource
Resource         ../assertions/search_assertions.resource
Resource         ../config/search_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-1 Get Default Hotels
    [Tags]    search    positive
    ${response}=    Search Hotels
    Verify Default Hotels Response    ${response}

TC-2 Filter By City
    [Tags]    search    positive
    ${params}=    Create Dictionary    city=${VALID_CITY}
    ${response}=    Search Hotels    ${params}
    Verify Filtered By Field    ${response}    city    ${VALID_CITY}

TC-3 Filter By Non-Existent City
    [Tags]    search    negative
    ${params}=    Create Dictionary    city=${NON_EXISTENT_CITY}
    ${response}=    Search Hotels    ${params}
    Verify Empty Response    ${response}

TC-4 Filter By Amenity
    [Tags]    search    positive
    ${params}=    Create Dictionary    amenity=${VALID_AMENITY}
    ${response}=    Search Hotels    ${params}
    Verify Filtered By Amenity    ${response}    ${VALID_AMENITY}

TC-5 Filter By Max Price
    [Tags]    search    bug
    ${params}=    Create Dictionary    maxPrice=${MAX_PRICE}
    ${response}=    Search Hotels    ${params}
    Verify Filtered By Max Price    ${response}    ${MAX_PRICE}

TC-6 Filter By Min Rating
    [Tags]    search    positive
    ${params}=    Create Dictionary    minRating=${MIN_RATING}
    ${response}=    Search Hotels    ${params}
    Verify Filtered By Min Rating    ${response}    ${MIN_RATING}

TC-7 Get Page 2
    [Tags]    search    positive
    ${params}=    Create Dictionary    page=${PAGE_NUMBER}
    ${response}=    Search Hotels    ${params}
    Verify Page Number    ${response}    ${PAGE_NUMBER}

TC-8 Negative Page Defaults To 1
    [Tags]    search    negative
    ${params}=    Create Dictionary    page=${NEGATIVE_PAGE}
    ${response}=    Search Hotels    ${params}
    Verify Page Number    ${response}    1

TC-9 Negative Price Ignores Filter
    [Tags]    search    bug
    ${params}=    Create Dictionary    maxPrice=${NEGATIVE_PRICE}
    ${response}=    Search Hotels    ${params}
    Verify Response List Not Empty    ${response}    hotels
