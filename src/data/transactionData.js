
let nodes = [
    { "id": "dasyyu1y23das", "label": "dasyyu1y23das" },
    { "id": "abcdef123456", "label": "abcdef123456" },
    { "id": "qwerty987654", "label": "qwerty987654" },
    { "id": "zxcvbn456789", "label": "zxcvbn456789" },
    { "id": "123456qwerty", "label": "123456qwerty" },
    { "id": "asdfgh098765", "label": "asdfgh098765" },
    { "id": "poiuyt543210", "label": "poiuyt543210" }
];
let links = [
    { "source": "dasyyu1y23das", "target": "abcdef123456", "label": "tx_1a2b3c4", "value": 1000, "date": "2024-02-03T12:00:00Z" },
    { "source": "abcdef123456", "target": "qwerty987654", "label": "tx_4d5e6f7", "value": 2000, "date": "2024-02-04T14:30:00Z" },
    { "source": "qwerty987654", "target": "zxcvbn456789", "label": "tx_7g8h9i0", "value": 1500, "date": "2024-02-05T16:45:00Z" },
    { "source": "zxcvbn456789", "target": "123456qwerty", "label": "tx_j1k2l3m", "value": 1800, "date": "2024-02-06T10:15:00Z" },
    { "source": "123456qwerty", "target": "asdfgh098765", "label": "tx_m4n5o6p", "value": 2200, "date": "2024-02-07T08:20:00Z" },
    { "source": "asdfgh098765", "target": "poiuyt543210", "label": "tx_p7q8r9s", "value": 1300, "date": "2024-02-08T11:00:00Z" },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_s1t2u3v", "value": 1600, "date": "2024-02-09T15:45:00Z" },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_v4w5x6y", "value": 1700, "date": "2024-02-10T09:30:00Z" },
    { "source": "asdfgh098765", "target": "qwerty987654", "label": "tx_y7z8a9b", "value": 1900, "date": "2024-02-11T13:20:00Z" },
    { "source": "123456qwerty", "target": "zxcvbn456789", "label": "tx_b1c2d3345", "value": 2100, "date": "2024-02-12T17:00:00Z" },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_f4g5h6ae", "value": 1400, "date": "2024-02-13T10:30:00Z" },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_j7k8l9310", "value": 1600, "date": "2024-02-14T12:45:00Z" },
    { "source": "poiuyt543210", "target": "qwerty987654", "label": "tx_n1o2p3q", "value": 1800, "date": "2024-02-15T14:15:00Z" },
    { "source": "poiuyt543210", "target": "zxcvbn456789", "label": "tx_r4s5t6u", "value": 2000, "date": "2024-02-16T16:30:00Z" },
    { "source": "poiuyt543210", "target": "123456qwerty", "label": "tx_v7w8x9y", "value": 2200, "date": "2024-02-17T08:00:00Z" },
    { "source": "poiuyt543210", "target": "asdfgh098765", "label": "tx_b1c2d3e", "value": 1300, "date": "2024-02-18T11:30:00Z" },
    { "source": "poiuyt543210", "target": "dasyyu1y23das", "label": "tx_f4g5h6i", "value": 1500, "date": "2024-02-19T09:45:00Z" },
    { "source": "poiuyt543210", "target": "abcdef123456", "label": "tx_j7k8l9m", "value": 1700, "date": "2024-02-20T07:00:00Z" },
    { "source": "poiuyt543210", "target": "qwerty987654", "label": "tx_n1o2p3asd12", "value": 1900, "date": "2024-02-21T13:15:00Z" },
    { "source": "poiuyt543210", "target": "zxcvbn456789", "label": "tx_r4s5t6bjkb12", "value": 2100, "date": "2024-02-22T15:30:00Z" }

];

export function findNodesByWalletAddress(walletAddress) {
    const NodeFinding = nodes.filter(node => node.id === walletAddress);
    return NodeFinding.length > 0 ? NodeFinding : null;
}

export function findLinksByWalletAddress(walletAddress, slice = true) {
    const relevantLinks = links.filter(link => link.source === walletAddress || link.target === walletAddress);
    relevantLinks.sort((a, b) => new Date(b.date) - new Date(a.date));
    return slice ? relevantLinks.slice(0, 10) : relevantLinks;
}

export function calculateExpensesAndIncomes(walletAddress) {
    const linksByAddress = findLinksByWalletAddress(walletAddress);

    const transactionsByDate = {};
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

    const result = {
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
export function transactionData() {
    return {
        nodes,
        links
    };
}





