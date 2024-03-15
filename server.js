// Import necessary modules
const express = require('express');
const path = require('path');
const neo4j = require('neo4j-driver');

// Create an Express application
const app = express();

// Set up Neo4j driver
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'Admin123456789'));

// Define API endpoint

app.get('/addresses/:id', async (req, res) => {
    const session = driver.session();
    const pages = req.query.pages;
    const sent = req.query.sent;
    const receive = req.query.receive;
    const limit = 10;
    const skip = (pages - 1) * limit;
    // Pagination api
    if (pages) {
        try {
            const result = await session.run(
                `MATCH (n {addressId: '${req.params.id}'})-[r]-(m) RETURN DISTINCT n,m,r SKIP ${skip} LIMIT ${limit}`
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
        } catch (error) {
            res.status(500).send(error);
        } finally {
            await session.close();
        }
        // Sent api
    } else if (sent) {
        try {
            const result = await session.run(
                `MATCH (n {addressId: '${req.params.id}'})-[r]->(m) RETURN r.value, r.block_timestamp`
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
        } finally {
            await session.close();
        }
        // Receive api
    } else if (receive) {
        try {
            const result = await session.run(
                `MATCH (n {addressId: '${req.params.id}'})<-[r]-(m) RETURN r.value, r.block_timestamp`
            );
            var count = 0;
            var receiveCoin = 0;
            var receives = [];
            result.records.forEach(r => {
                console.log(r);
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
        } finally {
            await session.close();
        }
    }
    // Get all api
    else {
        try {
            const result = await session.run('MATCH (n {addressId: $id})-[r]-(m) RETURN DISTINCT n,m,r', { id: req.params.id });
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
        } finally {
            await session.close();
        }
    }

});


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
