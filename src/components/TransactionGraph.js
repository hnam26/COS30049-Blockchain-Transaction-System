import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { useParams } from "react-router-dom";
import * as THREE from 'three';
import "../styles/TransactionGraphCss.css";

const TransactionGraph = ({ data }) => {
    const params = useParams();
    const [graph, setGraph] = useState({ nodes: [], links: [] });
    const [allNodes, setAllNodes] = useState([]);
    const [allLinks, setAllLinks] = useState([]);

    // Function to adjust curvature and rotation for duplicate links
    const adjustLinks = (links) => {
        let linkMap = {};
        const adjustLinks = links.map(link => ({ ...link })); // Create new objects
        adjustLinks.forEach(link => {
            let key = link.source < link.target ?
                link.source + '-' + link.target :
                link.target + '-' + link.source;
            if (!linkMap[key]) {
                linkMap[key] = [];
            }
            linkMap[key].push(link);
        });
        Object.values(linkMap).forEach((linkArr) => {
            if (linkArr.length > 1) {
                let mid = (linkArr.length - 1) / 2;
                linkArr.forEach((link, i) => {
                    let offset = i - mid;
                    link.curvature = 0.6 * offset;
                    link.rotation = Math.PI / (Math.abs(offset) + 2);
                });
            }
        });
        return adjustLinks;
    };




    const displayConnectedNodes = (nodeId) => {
        setGraph(oldGraph => {
            let newDisplayedNodes = new Set(oldGraph.nodes.map(node => node.id));
            newDisplayedNodes.add(nodeId);
            allLinks.forEach(link => {
                if (link.source === nodeId || link.target === nodeId) {
                    newDisplayedNodes.add(link.source);
                    newDisplayedNodes.add(link.target);
                }
            });

            let nodes = [...oldGraph.nodes];
            let links = [...oldGraph.links];
            allNodes.forEach(node => {
                if (newDisplayedNodes.has(node.id) && !nodes.find(n => n.id === node.id)) {
                    nodes.push(node);
                }
            });

            allLinks.forEach(link => {
                if (newDisplayedNodes.has(link.source) && newDisplayedNodes.has(link.target) && !links.find(l => l.source === link.source && l.target === link.target && l.label === link.label)) {
                    links.push(link);
                }
            });

            return { nodes, links }; // update the graph
        });
    };
    const fgRef = useRef();

    const handleClick = useCallback(node => {
        // Aim at node from outside it
        const distance = 100;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    }, [fgRef]);


    useEffect(() => {
        if (data) {
            // Reset the graph state
            setGraph({ nodes: [], links: [] });
            const { nodes, links } = data;
            const adjustedLinks = adjustLinks([...links]); // Create a copy of links
            setAllNodes([...nodes]); // Create a copy of nodes
            setAllLinks(adjustedLinks); // Update state immutably
        }
    }, [data, params.id]);




    useEffect(() => {
        // Display only 1 and its directly connected nodes initially
        if (allNodes.length > 0 && allLinks.length > 0) {
            displayConnectedNodes(params.id);
        }
    }, [allNodes, allLinks]);

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={graph}
            nodeResolution={30}
            // nodeLabel="id"
            nodeLabel={(function (node) {
                return "<div><span class='label'>Wallet address: " + node.label + "<br />";
            })}
            nodeAutoColorBy="id"
            onNodeClick={node => {
                // Display connected nodes
                displayConnectedNodes(node.id);
            }}
            onNodeRightClick={handleClick}
            nodeThreeObject={(node => {
                // Create a sphere geometry for the node
                const sphereGeometry = new THREE.SphereGeometry(node.id === params.id ? 12 : 5); // Larger size for the node with params.id
                const sphereMaterial = new THREE.MeshBasicMaterial({ color: node.color });
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                return sphere;
            })}
            linkLabel={link => {
                // Implementation for custom link color
                let tooltipContent = "<div class='label'>";
                tooltipContent += "<span class='label'>Transaction ID: " + link.label + "</span>";
                tooltipContent += "<span class='label'>Value: " + link.value + "</span>";
                tooltipContent += "<span class='label'>Date: " + link.date + "</span>";
                tooltipContent += "</div>";
                return tooltipContent;
            }}
            linkWidth={1}
            linkCurvature="curvature"
            linkCurveRotation="rotation"
            linkDirectionalArrowLength={5}
            linkDirectionalArrowRelPos={0.5}
            linkColor={link => {
                return "black";
            }}
            backgroundColor="white"
        />

    );
};

// Export TransactionGraph component
export default TransactionGraph;
