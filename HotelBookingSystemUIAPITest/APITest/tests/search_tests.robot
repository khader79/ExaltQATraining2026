*** Settings ***
Documentation    Search Hotels API Tests
Resource         ../base.resource
Resource         ../client/search/search_keywords.resource
Resource         ../assertions/search_assertions.resource
Resource         ../config/search_test_data.resource
Suite Setup      Create API Session
Suite Teardown   Delete All Sessions

*** Test Cases ***
TC-1 Get Default Paginated Hotels List
    [Documentation]    Verify GET /api/hotels returns valid paginated response
    [Tags]    search    positive

    ${response}=    Get Hotels
    Verify Default Hotels Response    ${response}

TC-2 Filter Hotels By City
    [Documentation]    Verify filtering by city returns only matching hotels
    [Tags]    search    filter    positive

    ${response}=    Filter Hotels By City    ${VALID_CITY}
    Verify Filtered Hotels Response    ${response}    ${FIELD_CITY}    ${VALID_CITY}

TC-3 Filter Hotels By Non-Existent City
    [Documentation]    Verify filtering by non-existent city returns empty list
    [Tags]    search    filter    negative

    ${response}=    Filter Hotels By City    ${NON_EXISTENT_CITY}
    Verify Empty Hotels Response    ${response}

TC-4 Filter Hotels By Amenity
    [Documentation]    Verify filtering by amenity returns only hotels containing that amenity
    [Tags]    search    filter    positive

    ${response}=    Filter Hotels By Amenity    ${VALID_AMENITY}
    Verify Filtered Hotels By Amenity    ${response}    ${VALID_AMENITY}

TC-5 Filter Hotels By Max Price
    [Documentation]    Verify filtering by maxPrice returns hotels with price <= maxPrice
    [Tags]    search    filter    negative    bug

    ${response}=    Filter Hotels By Max Price    ${MAX_PRICE}
    Verify Filtered Hotels By Max Price    ${response}    ${MAX_PRICE}

TC-6 Filter Hotels By Min Rating
    [Documentation]    Verify filtering by minRating returns hotels with rating >= minRating
    [Tags]    search    filter    positive

    ${response}=    Filter Hotels By Min Rating    ${MIN_RATING}
    Verify Filtered Hotels By Min Rating    ${response}    ${MIN_RATING}

TC-7 Get Specific Page
    [Documentation]    Verify fetching page 2 returns correct page number
    [Tags]    search    pagination    positive

    ${response}=    Filter Hotels By Page    ${PAGE_NUMBER}
    Verify Page Response    ${response}    ${PAGE_NUMBER}

TC-8 Handle Negative Page Number
    [Documentation]    Verify negative page number defaults to page 1
    [Tags]    search    pagination    negative

    ${response}=    Filter Hotels By Page    ${NEGATIVE_PAGE}
    Verify Default Page Fallback    ${response}

TC-9 Handle Negative Price Filter
    [Documentation]    Verify negative maxPrice is handled gracefully
    [Tags]    search    filter    negative    bug

    ${response}=    Filter Hotels By Max Price    ${NEGATIVE_PRICE}
    Verify Empty Hotels Response    ${response}
