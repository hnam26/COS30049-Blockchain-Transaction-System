const nodes = [
    { "id": "dasyyu1y23das", "label": "dasyyu1y23das" },
    { "id": "abcdef123456", "label": "abcdef123456" },
    { "id": "qwerty987654", "label": "qwerty987654" },
    { "id": "zxcvbn456789", "label": "zxcvbn456789" },
    { "id": "123456qwerty", "label": "123456qwerty" },
    { "id": "asdfgh098765", "label": "asdfgh098765" },
    { "id": "poiuyt543210", "label": "poiuyt543210" }
];
const links = [
    { "source": "dasyyu1y23das", "target": "abcdef123456", "label": "tx_1a2b3c4", "value": 1000, "date": "2024-02-03T12:00:00Z", "status": "pending", "fee": 10 },
    { "source": "abcdef123456", "target": "qwerty987654", "label": "tx_4d5e6f7", "value": 2000, "date": "2024-02-04T14:30:00Z", "status": "confirmed", "fee": 5 },
    { "source": "qwerty987654", "target": "zxcvbn456789", "label": "tx_7g8h9i0", "value": 1500, "date": "2024-02-05T16:45:00Z", "status": "confirmed", "fee": 7 },
    { "source": "zxcvbn456789", "target": "123456qwerty", "label": "tx_j1k2l3m", "value": 1800, "date": "2024-02-06T10:15:00Z", "status": "pending", "fee": 8 },
    { "source": "123456qwerty", "target": "asdfgh098765", "label": "tx_m4n5o6p", "value": 2200, "date": "2024-02-07T08:20:00Z", "status": "confirmed", "fee": 6 },
    { "source": "asdfgh098765", "target": "poiuyt543210", "label": "tx_p7q8r9s", "value": 1300, "date": "2024-02-08T11:00:00Z", "status": "pending", "fee": 12 },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_s1t2u3v", "value": 1600, "date": "2024-02-09T15:45:00Z", "status": "confirmed", "fee": 3 },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_v4w5x6y", "value": 1700, "date": "2024-02-10T09:30:00Z", "status": "confirmed", "fee": 4 },
    { "source": "asdfgh098765", "target": "qwerty987654", "label": "tx_y7z8a9b", "value": 1900, "date": "2024-02-11T13:20:00Z", "status": "pending", "fee": 9 },
    { "source": "123456qwerty", "target": "zxcvbn456789", "label": "tx_b1c2d3345", "value": 2100, "date": "2024-02-12T17:00:00Z", "status": "confirmed", "fee": 5 },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_f4g5h6ae", "value": 1400, "date": "2024-02-13T10:30:00Z", "status": "confirmed", "fee": 6 },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_j7k8l9310", "value": 1600, "date": "2024-02-14T12:45:00Z", "status": "pending", "fee": 7 },
    { "source": "poiuyt543210", "target": "qwerty987654", "label": "tx_n1o2p3q", "value": 1800, "date": "2024-02-15T14:15:00Z", "status": "confirmed", "fee": 8 },
    { "source": "poiuyt543210", "target": "zxcvbn456789", "label": "tx_r4s5t6u", "value": 2000, "date": "2024-02-16T16:30:00Z", "status": "confirmed", "fee": 10 },
    { "source": "poiuyt543210", "target": "123456qwerty", "label": "tx_v7w8x9y", "value": 2200, "date": "2024-02-17T08:00:00Z", "status": "pending", "fee": 11 },
    { "source": "poiuyt543210", "target": "asdfgh098765", "label": "tx_b1c2d3e", "value": 1300, "date": "2024-02-18T11:30:00Z", "status": "confirmed", "fee": 9 },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_f4g5h6i", "value": 1500, "date": "2024-02-19T09:45:00Z", "status": "confirmed", "fee": 6 },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_j7k8l9m", "value": 1700, "date": "2024-02-20T07:00:00Z", "status": "pending", "fee": 8 },
    { "source": "poiuyt543210", "target": "qwerty987654", "label": "tx_n1o2p3asd12", "value": 1900, "date": "2024-02-21T13:15:00Z", "status": "confirmed", "fee": 7 },
    { "source": "poiuyt543210", "target": "zxcvbn456789", "label": "tx_r4s5t6bjkb12", "value": 2100, "date": "2024-02-22T15:30:00Z", "status": "confirmed", "fee": 5 }
];


export function findNodesByWalletAddress(walletAddress) {
    // Assuming nodes and links are arrays
    const nodesCopy = Object.freeze([...nodes]); // Creating a shallow copy and freezing it
    const linksCopy = Object.freeze([...links]); // Creating a shallow copy and freezing it

    const NodeFinding = nodesCopy.filter(node => node.id === walletAddress);
    return NodeFinding.length > 0 ? NodeFinding : null;
}

export function findLinksByWalletAddress(walletAddress, day) {
    // Assuming nodes and links are arrays
    const nodesCopy = Object.freeze([...nodes]); // Creating a shallow copy and freezing it
    const linksCopy = Object.freeze([...links]); // Creating a shallow copy and freezing it
    let relevantLinks = [];
    relevantLinks = linksCopy.filter(link => link.source === walletAddress || link.target === walletAddress);
    relevantLinks.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (day > 0) {
        return relevantLinks.slice(0, day);
    } else {
        return relevantLinks;
    }
}

export function calculateExpensesAndIncomes(walletAddress, day = 10) {
    let linksByAddress = findLinksByWalletAddress(walletAddress, day);

    let transactionsByDate = {};
    linksByAddress.forEach(link => {
        const transactionDate = new Date(link.date).toISOString().split('T')[0]; // Extracting date without time
        if (!transactionsByDate[transactionDate]) {
            transactionsByDate[transactionDate] = { expense: [], income: [] };
        }
        if (link.source === walletAddress) {
            transactionsByDate[transactionDate].expense.push(link);
        } else {
            transactionsByDate[transactionDate].income.push(link);
        }
    });

    let result = {
        expense: [],
        income: [],
        date: []
    };

    // Push expenses, incomes, and dates into result object
    for (const date in transactionsByDate) {
        const dailyExpenses = transactionsByDate[date].expense.reduce((total, link) => total + link.value, 0);
        const dailyIncomes = transactionsByDate[date].income.reduce((total, link) => total + link.value, 0);
        result.expense.push(dailyExpenses);
        result.income.push(dailyIncomes);
        result.date.push(date);
    }

    // Sort result by date
    result.date.sort((a, b) => new Date(a) - new Date(b));

    // Sort expenses and incomes based on sorted dates
    result.expense = result.date.map(date => result.expense[result.date.indexOf(date)]);
    result.income = result.date.map(date => result.income[result.date.indexOf(date)]);

    return result;
}

export function getTransactionSummary(walletAddress, day = 10) {
    const relevantLinks = findLinksByWalletAddress(walletAddress, day); // Fetch all relevant links
    const totalTransactions = relevantLinks.length;

    let totalReceived = 0;
    let totalSent = 0;

    relevantLinks.forEach(link => {
        if (link.target === walletAddress) {
            totalReceived += link.value;
        } else if (link.source === walletAddress) {
            totalSent += link.value;
        }
    });

    return {
        totalTransactions,
        totalReceived: `${totalReceived} BTC`, // Assuming the value is in BTC
        totalSent: `${totalSent} BTC` // Assuming the value is in BTC
    };
}

export function getTransactionDetails(walletAddress) {
    const relevantLinks = findLinksByWalletAddress(walletAddress);
    const transactions = [];

    relevantLinks.forEach(link => {
        const type = link.source === walletAddress ? 'Sent' : 'Received';
        const sender = link.source;
        const receiver = link.target;
        const amount = `${link.value} BTC`; // Assuming the value is in BTC
        const fee = `${link.fee} BTC`; // Assuming the fee is in BTC
        const status = link.status;
        const date = link.date.split('T')[0]; // Extracting date without time
        const transactionId = link.label;

        transactions.push({
            transactionId,
            type,
            sender,
            receiver,
            amount,
            fee,
            status,
            date
        });
    });

    return transactions;
}



export function transactionData() {
    // Assuming nodes and links are arrays
    const nodesCopy = Object.freeze([...nodes]); // Creating a shallow copy and freezing it
    const linksCopy = Object.freeze([...links]); // Creating a shallow copy and freezing it

    return {
        nodes: nodesCopy,
        links: linksCopy
    };
}






