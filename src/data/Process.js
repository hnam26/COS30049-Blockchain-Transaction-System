
export const ProcessGraphData = (records, nodes = [], links = []) => {
    records.forEach((record, index) => {
        const nodeSent = record.n;
        const nodeReceive = record.m;
        const relationship = record.r;
        // Check if the nodes already exist
        const nodeSentExists = nodes.some(node => node.id === nodeSent.properties.addressId);
        const nodeReceiveExists = nodes.some(node => node.id === nodeReceive.properties.addressId);

        // If the nodes do not exist, push them to the nodes array
        if (!nodeSentExists) {
            nodes.push({
                id: nodeSent.properties.addressId,
            });
        }
        if (!nodeReceiveExists) {
            nodes.push({
                id: nodeReceive.properties.addressId,
            });
        }
        // Check if the link already exists with the same properties
        const linkExists = links.some(link =>
            link.source === relationship.properties.fromAddress &&
            link.target === relationship.properties.toAddress &&
            link.block_hash === relationship.properties.block_hash &&
            link.block_number === relationship.properties.block_number &&
            link.block_timestamp === relationship.properties.block_timestamp &&
            link.gas === relationship.properties.gas &&
            link.gas_price === relationship.properties.gas_price &&
            link.gas_used === relationship.properties.gas_used &&
            link.hash === relationship.properties.hash &&
            link.input === relationship.properties.input &&
            link.transaction_fee === relationship.properties.transaction_fee &&
            link.transaction_index === relationship.properties.transaction_index &&
            link.value === relationship.properties.value
        );
        // If the link does not exist, push it to the links array
        if (!linkExists) {
            // Determine the direction of the link based on the addresses of the nodes
            const sameTotalLinks = records.filter(record =>
                relationship.properties.fromAddress === record.r.properties.fromAddress &&
                relationship.properties.toAddress === record.r.properties.toAddress
            );
            const numsameTotalLinks = sameTotalLinks.length;

            // Determine the number of links between the same pair of nodes
            const samePairLinks = links.filter(link =>
                link.source === relationship.properties.fromAddress &&
                link.target === relationship.properties.toAddress
            );
            const numLinks = samePairLinks.length;
            let angle = 0;

            let curvature = 0;
            if (numsameTotalLinks % 2 === 0) { // even number of links
                // Calculate curvature to distribute links symmetrically
                let signed = numLinks % 2 === 0 ? 1 : -1;
                let a = Math.floor(numLinks / 2);
                if (numsameTotalLinks <= 6) {
                    let magnitude = 0.3;
                    curvature = signed * (a + 1) * magnitude;
                } else {
                    curvature = signed * (a + 1) / (numsameTotalLinks / 2);
                }
            } else { // odd number of links
                if (numLinks === 0) {
                    // Set the first link at the center
                    curvature = 0;
                } else {
                    // Distribute the other links around the center
                    let signed = numLinks % 2 === 0 ? 1 : -1;
                    let a = Math.floor((numLinks + 1) / 2);
                    if (numsameTotalLinks <= 6) {
                        let magnitude = 0.3;
                        curvature = signed * (a + 1) * magnitude;
                    } else {
                        curvature = signed * (a + 1) / (numsameTotalLinks / 2);
                    }
                }
            }
            if (relationship.properties.fromAddress === relationship.properties.toAddress) {
                angle = 30;
                curvature += 0.5 * (numLinks + 1);
            }
            links.push({
                source: relationship.properties.fromAddress,
                target: relationship.properties.toAddress,
                block_hash: relationship.properties.block_hash,
                block_number: relationship.properties.block_number,
                block_timestamp: relationship.properties.block_timestamp,
                gas: relationship.properties.gas,
                gas_price: relationship.properties.gas_price,
                gas_used: relationship.properties.gas_used,
                hash: relationship.properties.hash,
                input: relationship.properties.input,
                transaction_fee: relationship.properties.transaction_fee,
                transaction_index: relationship.properties.transaction_index,
                value: relationship.properties.value,
                curvature: curvature, // set curvature based on number of links
                rotation: angle, // set rotation based on angle,
                width: 0.3,
                clicked: false,
            });
        }
    });
    return { nodes: nodes, links: links };
};

export const ProcessBarData = (links, id) => {
    var dates = [];
    links.forEach(link => {
        var time = new Date(link.block_timestamp * 1000);
        var date = time.toLocaleDateString();
        if (link.source === id) {
            var foundDate = dates.find(d => d.date === date);
            if (foundDate) {
                foundDate.sent += +link.value; // Increase the sent value by the amount of link.value
            } else {
                dates.push({
                    date: date,
                    sent: +link.value,
                    receive: 0,
                });
            }
        } else {
            foundDate = dates.find(d => d.date === date);
            if (foundDate) {
                foundDate.receive += +link.value; // Increase the sent value by the amount of link.value
            } else {
                dates.push({
                    date: date,
                    sent: 0,
                    receive: +link.value,
                });
            }
        }
    });
    // Sort the dates array by date property
    dates.sort((a, b) => new Date(a.date) - new Date(b.date));
    return dates;

};
