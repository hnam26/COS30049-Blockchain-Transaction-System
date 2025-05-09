// Import necessary modules
const express = require('express');
const ProcessData = require('./ProcessData');
const path = require('path');
const neo4j = require('neo4j-driver');

// Create an Express application
const app = express(); // Initialize Express app

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set up Neo4j driver
const driver = neo4j.driver('neo4j+s://7f7255e1.databases.neo4j.io', neo4j.auth.basic('neo4j', 't_h5cCVNR-FEFwAoq8B2wcw4qFRl3GqdHsf6RVZls3M'));

// Define API endpoint

app.get('/addresses/:id', async (req, res) => {
    const session = driver.session();
    const id = req.params.id; // Get the address ID from request parameters
    const { pages, sent, receive, node, totalPageCount, all } = req.query;

    try {
        // Route requests based on query parameters
        if (pages) {
            await fetchPages(session, id, pages, res);
        } else if (sent) {
            await fetchSent(session, id, res);
        } else if (receive) {
            await fetchReceive(session, id, res);
        } else if (node) {
            await fetchNode(session, id, res);
        } else if (totalPageCount) {
            await fetchTotalPageCount(session, id, res);
        } else if (all) {
            await fetchAll(session, id, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    } finally {
        await session.close();
    }
});

// Function to fetch pages
async function fetchPages(session, id, pages, res) {
    const limit = 10;
    const skip = (pages - 1) * limit;
    const result = await session.run(
        'MATCH (n {addressId: $id})-[r]-(m) RETURN n,m,r ORDER BY r.block_timestamp DESC SKIP $skip LIMIT $limit',
        { id: id, skip: neo4j.int(skip), limit: neo4j.int(limit) }
    );
    var records = [];
    result.records.forEach(r => {
        const sent = r.get('n');
        const receive = r.get('m');
        const relationship = r.get('r');
        records.push({
            n: sent,
            m: receive,
            r: relationship,
        });
    });
    const { nodes, links } = ProcessData(records);
    res.send({ records: records, nodes: nodes, links: links });
}

// Function to fetch sent transactions
async function fetchSent(session, id, res) {
    try {
        const result = await session.run(
            'MATCH (n {addressId: $id})-[r]->(m) RETURN r.value, r.block_timestamp', { id: id }
        );
        var sentCoin = 0;
        var count = 0;
        var sents = [];
        result.records.forEach(r => {
            sentCoin += +r.get(0);
            count += 1;
            sents.push({
                block_timestamp: r.get(1),
                value: +r.get(0)
            });
        });
        res.send({ coin: sentCoin, count: count, sents: sents });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to fetch received transactions
async function fetchReceive(session, id, res) {
    try {
        const result = await session.run(
            'MATCH (n {addressId: $id})<-[r]-(m) RETURN r.value, r.block_timestamp', { id: id }
        );
        var count = 0;
        var receiveCoin = 0;
        var receives = [];
        result.records.forEach(r => {
            count += 1;
            receiveCoin += +r.get(0);
            receives.push({
                block_timestamp: r.get(1),
                value: +r.get(0)
            });
        });
        res.send({ coin: receiveCoin, count: count, receives: receives });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to fetch node details
async function fetchNode(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id}) RETURN  n', { id: id });
        if (result.records.length != 0) {
            // const n = result.records[0].get('n');
            const type = result.records[0].get('n').properties.type;
            const addressId = result.records[0].get('n').properties.addressId;
            res.send({ type: type, addressId: addressId });
        }
        else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to fetch total page count
async function fetchTotalPageCount(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id})-[r]-(m) RETURN COUNT( r) AS count_r', { id: id });
        const pageTotal = result.records[0].get('count_r').toNumber();
        res.send({ pageTotal: Math.floor(pageTotal / 10) + 1 });
    } catch (error) {
        res.status(500).send(error);
    }
}

// Function to fetch all records
async function fetchAll(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id})-[r]-(m) RETURN n,m,r ORDER BY r.block_timestamp DESC', { id: id });
        var records = [];
        result.records.forEach(r => {
            const sent = r.get('n');
            const receive = r.get('m');
            const relationship = r.get('r');
            records.push({
                n: sent,
                m: receive,
                r: relationship,
            });
        });
        const { nodes, links } = ProcessData(records);
        res.send({ records: records, nodes: nodes, links: links });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
