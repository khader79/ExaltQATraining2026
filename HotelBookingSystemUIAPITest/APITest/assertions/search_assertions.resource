*** Settings ***
Resource    ../base.resource

*** Keywords ***
Verify Default Hotels Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    ${json}=    Set Variable    ${response.json()}
    Should Be Equal As Numbers    ${json}[page]    ${DEFAULT_PAGE}
    Verify Response List Not Empty    ${response}    hotels

Verify Empty Response
    [Arguments]    ${response}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    Verify Response List Empty    ${response}    hotels

Verify Page Number
    [Arguments]    ${response}    ${page}
    Verify Status Code    ${response}    ${STATUS_OK}
    Should Be Equal As Numbers    ${response.json()}[page]    ${page}

Verify Filtered By Field
    [Arguments]    ${response}    ${field}    ${value}
    Verify Status Code    ${response}    ${STATUS_OK}
    Verify Response Field Equals    ${response}    success    ${True}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${item}    IN    @{hotels}
        Verify Item Field Equals    ${item}    ${field}    ${value}
    END

Verify Filtered By Amenity
    [Arguments]    ${response}    ${amenity}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${item}    IN    @{hotels}
        List Should Contain Value    ${item}[amenities]    ${amenity}
    END

Verify Filtered By Max Price
    [Arguments]    ${response}    ${max_price}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${item}    IN    @{hotels}
        Should Be True    $item[pricePerNight] <= $max_price
    END

Verify Filtered By Min Rating
    [Arguments]    ${response}    ${min_rating}
    Verify Status Code    ${response}    ${STATUS_OK}
    ${hotels}=    Set Variable    ${response.json()}[hotels]
    FOR    ${item}    IN    @{hotels}
        Should Be True    $item[rating] >= $min_rating
    END
