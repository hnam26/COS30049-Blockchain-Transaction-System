import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useParams } from "react-router-dom";
import { ProcessGraphData } from '../data/Process';
import "../styles/transaction-graph.css";
import axios from 'axios';
const GraphNode = ({ props: { nodes, links } }) => {
    const params = useParams();
    const fgRef = useRef();
    const selectedLinkRef = useRef(null);
    const [id, setId] = useState(undefined); // Initialize id state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
    const [displayHeight, setDisplayHeight] = useState(window.innerHeight);
    // const [nodeIDs, setNodeIDs] = useState([params.id]);
    const nodeIDs = [params.id];


    const fetchData = async (id) => {
        try {
            const response = await axios.get(`/addresses/${id}`);
            var nodes = [...graphData.nodes];
            var links = [...graphData.links];
            const values = ProcessGraphData(response.data, [...nodes], [...links]);
            if (values.nodes.length === nodes.length && values.links.length === links.length) {
            } else {
                setGraphData({
                    nodes: values.nodes,
                    links: values.links
                });
                fgRef.current.d3Force('link').distance(link => { return 50; });
            }

        } catch (error) {
            console.log(error);
            setError(error.message);

        }
    };


    useEffect(() => {
        //Important to create deep copy
        const graphDataCopy = JSON.parse(JSON.stringify({ nodes: nodes, links: links }));
        setGraphData(graphDataCopy);
        fgRef.current.d3Force('link').distance(link => { return 50; });
    }, []);


    const graphDataCopy = JSON.parse(JSON.stringify(graphData));

    window.addEventListener('resize', () => {
        setDisplayWidth(window.innerWidth);
        setDisplayHeight(window.innerHeight);
    });

    function displayLinkData(link) {
        if (link) {
            document.querySelector('.display-change').innerHTML = `
                <div class="display-group">
                    <div>From</div>
                    <div>${link.source.id}</div>
                </div>
                <div class="display-group">
                    <div>To</div>
                    <div>${link.target.id}</div>
                </div>
                <div class="display-group">
                    <div>Transaction ID</div>
                    <div>${link.transaction_index}</div>
                </div>
                <div class="display-group">
                    <div>Value</div>
                    <div>${link.value}</div>
                </div>
                <div class="display-group">
                    <div>Date</div>
                    <div>${new Date(link.block_timestamp * 1000).toLocaleDateString()} ${new Date(link.block_timestamp * 1000).toLocaleTimeString()}</div>
                </div>
                <div class="display-group">
                    <div>Block number</div>
                    <div>${link.block_number}</div>
                </div>`;

        } else {
            document.querySelector('.display-change').innerHTML = `
                <div class="display-group">
                    <div>From</div>
                    <div> </div>
                </div>
                <div class="display-group">
                    <div>To</div>
                    <div> </div>
                </div>
                <div class="display-group">
                    <div>Transaction ID</div>
                    <div> </div>
                </div>
                <div class="display-group">
                    <div>Value</div>
                    <div> </div>
                </div>
                <div class="display-group">
                    <div>Date</div>
                    <div> </div>
                </div>
                <div class="display-group">
                    <div>Block number</div>
                    <div> </div>
                </div>
            `;
        }
    }


    return (
        <div className='graphNode'>
            <div className='display'>
                <h3>Relationship</h3>
                <div className="display-change">
                    <div className="display-group">
                        <div>From</div>
                        <div></div>
                    </div>
                    <div className="display-group">
                        <div>To</div>
                        <div></div>
                    </div>
                    <div className="display-group">
                        <div>Transaction ID</div>
                        <div></div>
                    </div>
                    <div className="display-group">
                        <div>Value</div>
                        <div></div>
                    </div>
                    <div className="display-group">
                        <div>Date</div>
                        <div></div>
                    </div>
                    <div className="display-group">
                        <div>Block number</div>
                        <div></div>
                    </div>
                </div>
            </div>
            <ForceGraph2D
                ref={fgRef}
                width={displayWidth * 0.7}
                height={displayHeight * 0.7}
                graphData={graphDataCopy}
                nodeVal={node => node.id === params.id ? 15 : 3}
                nodeResolution={30}
                nodeAutoColorBy="id"
                nodeLabel={(function (node) {
                    return "<div><span class='label'>Wallet address: " + node.id + "<br />";
                })}
                onNodeDrag={node => {
                    graphDataCopy.nodes.forEach(n => {
                        if (n != node) {
                            n.fx = n.x;
                            n.fy = n.y;
                            n.fz = n.z;
                        }
                    });
                }}
                onNodeDragEnd={(node, translate) => {

                    node.fx = node.x;
                    node.fy = node.y;
                    node.fz = node.z;


                }}
                onNodeRightClick={(node) => {
                    var isIDSearched = nodeIDs.some(nodeID => nodeID === node.id);
                    if (!isIDSearched) {
                        nodeIDs.push(node.id);
                        fetchData(node.id);

                    }
                }}
                onNodeClick={node => {

                }}

                linkLabel={link => {
                    // Implementation for custom link color
                    let tooltipContent = "<div class='label'>";
                    tooltipContent += "<span class='label'>Transaction ID: " + link.transaction_index + "</span>";
                    tooltipContent += "<span class='label'>Value: " + link.value + "</span>";
                    tooltipContent += "<span class='label'>Date: " + new Date(link.block_timestamp * 1000).toLocaleDateString() + " " + new Date(link.block_timestamp * 1000).toLocaleTimeString() + "</span>";
                    tooltipContent += "<span class='label'>Block number: " + link.block_number + "</span>";
                    tooltipContent += "</div>";
                    return tooltipContent;
                }}
                // linkWidth={0.3}
                linkWidth="width"
                linkCurvature="curvature"
                linkCurveRotation="rotation"
                linkDirectionalArrowLength={1}
                linkDirectionalArrowRelPos={0.5}
                linkColor={link => {
                    return "black";
                }}
                onLinkHover={(link) => {
                    if (link) {
                        // selectedLinkRef.current = link;
                        link.width = 3;
                        console.log(link);
                        displayLinkData(link);
                    } else {
                        displayLinkData();
                        graphDataCopy.links.forEach(l => {
                            if (l.clicked == false) {
                                l.width = 0.3;
                            } else {
                                displayLinkData(l);
                            }
                        });
                    }
                    // link.width = 3;
                }}
                onLinkClick={(link) => {
                    console.log("click", link);
                    if (link) {
                        if (link.clicked) {
                            link.width = 0.3;
                            displayLinkData();
                        } else {
                            displayLinkData(link);
                            link.width = 3;
                        }
                        graphDataCopy.links.forEach(l => {
                            if (l != link) l.clicked = false;
                        });
                        link.clicked = !link.clicked;
                    }
                }}
                backgroundColor="white"
            />
        </div>
    );
};

export default GraphNode;
