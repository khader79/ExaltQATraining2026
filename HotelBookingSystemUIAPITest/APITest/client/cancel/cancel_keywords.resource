*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Cancel All Bookings
    ${length}=    Get Length    ${BOOKING_IDS}
    FOR    ${i}    IN RANGE    ${length}
        ${id}=    Get From List    ${BOOKING_IDS}    ${i}
        Run Keyword And Ignore Error    DELETE On Session    api    ${CANCEL_ENDPOINT}/${id}    expected_status=any
    END
    ${ids}=    Create List
    Set Suite Variable    ${BOOKING_IDS}    ${ids}
