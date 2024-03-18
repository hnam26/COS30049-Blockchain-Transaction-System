// Import necessary modules
const express = require('express');
const path = require('path');
const neo4j = require('neo4j-driver');

// Create an Express application
const app = express();
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
    const id = req.params.id;
    const { pages, sent, receive, node, totalPageCount, all } = req.query;

    try {
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

async function fetchPages(session, id, pages, res) {
    const limit = 10;
    const skip = (pages - 1) * limit;
    const result = await session.run(
        'MATCH (n {addressId: $id})-[r]-(m) RETURN n,m,r SKIP $skip LIMIT $limit',
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
    res.send(records);
}

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

async function fetchNode(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id}) RETURN  n', { id: id });
        if (result.records.length != 0) {
            const n = result.records[0].get('n');
            res.send(n);
        }
        else {
            res.send(null);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchTotalPageCount(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id})-[r]-(m) RETURN COUNT( r) AS count_r', { id: id });
        const pageTotal = result.records[0].get('count_r').toNumber();
        res.send({ pageTotal: pageTotal });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function fetchAll(session, id, res) {
    try {
        const result = await session.run('MATCH (n {addressId: $id})-[r]-(m) RETURN  n,m,r', { id: id });
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
        res.send(records);
    } catch (error) {
        res.status(500).send(error);
    }
}



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
