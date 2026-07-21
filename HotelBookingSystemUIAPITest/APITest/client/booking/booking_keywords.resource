*** Settings ***
Resource    ../../base.resource

*** Keywords ***
Create Valid Booking
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Missing Field
    [Arguments]    ${field_to_remove}
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    Remove From Dictionary    ${body}    ${field_to_remove}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Invalid Date Range
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    10
    ${check_out}=    Get Next Date By Days    5
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Non Existent Hotel
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${NON_EXISTENT_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Exhaust Room Availability
    ${check_in}=    Get Next Date By Days    60
    ${check_out}=    Get Next Date By Days    65
    ${total_rooms}=    Set Variable    13
    FOR    ${i}    IN RANGE    ${total_rooms}
        Create Booking With Dates    ${check_in}    ${check_out}
    END

Create Booking With Dates
    [Arguments]    ${check_in}    ${check_out}
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Zero People
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=0
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Negative Beds
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=-1
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Past Check In Date
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    -10
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Invalid Date Format
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=GFSFSDFSDF
    ...    checkOutDate=2026-08-05
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Empty Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${EMPTY}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Negative Twin Beds
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=-1
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Same Day Dates
    ${customer_name}=    Generate Customer Name
    ${check_date}=    Get Next Date By Days    30
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_date}
    ...    checkOutDate=${check_date}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Empty Hotel ID
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${EMPTY}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Invalid People Type
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=one
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Invalid Beds Type
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=one
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking With Invalid Twin Beds Type
    ${customer_name}=    Generate Customer Name
    ${check_in}=    Get Next Date By Days    30
    ${check_out}=    Get Next Date By Days    35
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=one
    ...    checkInDate=${check_in}
    ...    checkOutDate=${check_out}
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking Overlapping Start Boundary
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=2026-07-30
    ...    checkOutDate=2026-08-03
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking Overlapping End Boundary
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=2026-08-03
    ...    checkOutDate=2026-08-07
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking Completely Enclosing Existing
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=2026-07-28
    ...    checkOutDate=2026-08-08
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking Adjacent Check Out Before
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=2026-07-28
    ...    checkOutDate=2026-08-01
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}

Create Booking Adjacent Check In After
    ${customer_name}=    Generate Customer Name
    ${body}=    Create Dictionary
    ...    hotelId=${VALID_HOTEL_ID}
    ...    customerName=${customer_name}
    ...    numberOfPeople=${VALID_PEOPLE}
    ...    numberOfBeds=${VALID_BEDS}
    ...    twinBeds=${VALID_TWIN_BEDS}
    ...    checkInDate=2026-08-05
    ...    checkOutDate=2026-08-10
    ${response}=    POST On Session    api    ${BOOKING_ENDPOINT}    json=${body}    expected_status=any
    RETURN    ${response}
