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
        console.log(error)
        res.status(500).send(error);
    } finally {
        await session.close();
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
