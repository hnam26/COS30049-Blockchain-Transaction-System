import { useReadCypher } from 'use-neo4j';
import React, { useEffect, useState } from 'react';

const TestRetrieving = ({ walletId }) => {
    const { loading, error, result, run } = useReadCypher(`MATCH (n {addressId: '${walletId}'})-[r]-(m) RETURN DISTINCT n,m,r`);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (result && result.records) {
            const dataArray = result.records.map(record => ({
                // nodeSent: record.get('n'),
                // nodeReceive: record.get('m'),
                nodeSent: record.get('r').properties.fromAddress,
                nodeReceive: record.get('r').properties.toAddress,
                transactionIndex: record.get('r').properties.transaction_index,
                value: record.get('r').properties.value
            }));
            setData(dataArray);
        }
    }, [result]);
    useEffect(() => {
        run();
    }, [walletId]);



    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;
    return (
        <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid black' }}>Node Sent</th>
                    <th style={{ border: '1px solid black' }}>Node Receive</th>
                    <th style={{ border: '1px solid black' }}>Transaction Index</th>
                    <th style={{ border: '1px solid black' }}>Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid black' }}>{item.nodeSent}</td>
                            <td style={{ border: '1px solid black' }}>{item.nodeReceive}</td>
                            <td style={{ border: '1px solid black' }}>{item.transactionIndex}</td>
                            <td style={{ border: '1px solid black' }}>{item.value}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default TestRetrieving;
