let data = [
    {
        id: 1,
        revenue: [
            {
                "transactionId": 1,
                "date": "01/02/2024",
                "expense": 500000,
                "income": 238591
            },
            {
                "transactionId": 2,
                "date": "02/02/2024",
                "expense": 1000000,
                "income": 495802
            },
            { 
                "transactionId": 3,
                "date": "03/02/2024",
                "expense": 833333,
                "income": 760124
            },
            {
                "transactionId": 4,
                "date": "04/02/2024",
                "expense": 388657,
                "income": 103948
            },
            {
                "transactionId": 5,
                "date": "05/02/2024",
                "expense": 1166666,
                "income": 388657
            },
            {
                "transactionId": 6,
                "date": "06/02/2024",
                "expense": 666666,
                "income": 627410
            },
            {
                "transactionId": 7,
                "date": "07/02/2024",
                "expense": 1333333,
                "income": 829365
            },
            {
                "transactionId": 8,
                "date": "08/02/2024",
                "expense": 166666,
                "income": 960271
            },
            {
                "transactionId": 9,
                "date": "09/02/2024",
                "expense": 1500000,
                "income": 110907
            },
            {
                "transactionId": 10,
                "date": "10/02/2024",
                "expense": 333333,
                "income": 703921
            },
            {
                "transactionId": 11,
                "date": "11/02/2024",
                "expense": 574230,
                "income": 495802
            }
        ],
    }


];

export function getRevenue() {
    return data;
}

export function getRevenueByNumber(number) {
    return data.find(
        (data) => data.id === number
    );
}

