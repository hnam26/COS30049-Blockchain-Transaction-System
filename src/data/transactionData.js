// export function findNodesByWalletAddress(walletAddress) {
//     // Assuming nodes and links are arrays
//     const nodesCopy = Object.freeze([...nodes]); // Creating a shallow copy and freezing it
//     const linksCopy = Object.freeze([...links]); // Creating a shallow copy and freezing it

//     const NodeFinding = nodesCopy.filter(node => node.id === walletAddress);
//     return NodeFinding.length > 0 ? NodeFinding : null;
// }

// export function findLinksByWalletAddress(walletAddress, day) {
//     // Assuming nodes and links are arrays
//     const nodesCopy = Object.freeze([...nodes]); // Creating a shallow copy and freezing it
//     const linksCopy = Object.freeze([...links]); // Creating a shallow copy and freezing it
//     let relevantLinks = [];
//     relevantLinks = linksCopy.filter(link => link.source === walletAddress || link.target === walletAddress);
//     relevantLinks.sort((a, b) => new Date(b.date) - new Date(a.date));
//     if (day > 0) {
//         return relevantLinks.slice(0, day);
//     } else {
//         return relevantLinks;
//     }
// }

// export function calculateExpensesAndIncomes(walletAddress, day = 10) {
//     let linksByAddress = findLinksByWalletAddress(walletAddress, day);

//     let transactionsByDate = {};
//     linksByAddress.forEach(link => {
//         const transactionDate = new Date(link.date).toISOString().split('T')[0]; // Extracting date without time
//         if (!transactionsByDate[transactionDate]) {
//             transactionsByDate[transactionDate] = { expense: [], income: [] };
//         }
//         if (link.source === walletAddress) {
//             transactionsByDate[transactionDate].expense.push(link);
//         } else {
//             transactionsByDate[transactionDate].income.push(link);
//         }
//     });

//     let result = {
//         expense: [],
//         income: [],
//         date: []
//     };

//     // Push expenses, incomes, and dates into result object
//     for (const date in transactionsByDate) {
//         const dailyExpenses = transactionsByDate[date].expense.reduce((total, link) => total + link.value, 0);
//         const dailyIncomes = transactionsByDate[date].income.reduce((total, link) => total + link.value, 0);
//         result.expense.push(dailyExpenses);
//         result.income.push(dailyIncomes);
//         result.date.push(date);
//     }

//     // Sort result by date
//     result.date.sort((a, b) => new Date(a) - new Date(b));

//     // Sort expenses and incomes based on sorted dates
//     result.expense = result.date.map(date => result.expense[result.date.indexOf(date)]);
//     result.income = result.date.map(date => result.income[result.date.indexOf(date)]);

//     return result;
// }

// export function getTransactionSummary(walletAddress, day = 10) {
//     const relevantLinks = findLinksByWalletAddress(walletAddress, day); // Fetch all relevant links
//     const totalTransactions = relevantLinks.length;

//     let totalReceived = 0;
//     let totalSent = 0;

//     relevantLinks.forEach(link => {
//         if (link.target === walletAddress) {
//             totalReceived += link.value;
//         } else if (link.source === walletAddress) {
//             totalSent += link.value;
//         }
//     });

//     return {
//         totalTransactions,
//         totalReceived: `${totalReceived} BTC`, // Assuming the value is in BTC
//         totalSent: `${totalSent} BTC` // Assuming the value is in BTC
//     };
// }

// export function getTransactionDetails(walletAddress) {
//     const relevantLinks = findLinksByWalletAddress(walletAddress);
//     const transactions = [];

//     relevantLinks.forEach(link => {
//         const type = link.source === walletAddress ? 'Sent' : 'Received';
//         const sender = link.source;
//         const receiver = link.target;
//         const amount = `${link.value} BTC`; // Assuming the value is in BTC
//         const fee = `${link.fee} BTC`; // Assuming the fee is in BTC
//         const status = link.status;
//         const date = link.date.split('T')[0]; // Extracting date without time
//         const transactionId = link.label;

//         transactions.push({
//             transactionId,
//             type,
//             sender,
//             receiver,
//             amount,
//             fee,
//             status,
//             date
//         });
//     });

//     return transactions;
// }







