import React, { useEffect, useState, useRef } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { useParams } from "react-router-dom";
import { ProcessGraphData } from '../data/Process';
import "../styles/transaction-graph.css";
import axios from 'axios';
const GraphNode = ({ props: { nodes, links } }) => {
    const params = useParams();
    const fgRef = useRef();
    const [error, setError] = useState(null);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });

    const hoveredLinkRef = useRef(null);
    const clickLinkRef = useRef(null);
    let timeoutId;

    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    //  Update dimensions
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);

        // Initial update
        updateDimensions();

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Fetch data
    const fetchData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/addresses/${id}?all=true`);
            var nodes = [...graphData.nodes];
            var links = [...graphData.links];
            const values = ProcessGraphData(response.data.records, [...nodes], [...links]);
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

    const covertToTime = (timestamp) => {
        var time = new Date(timestamp * 1000);
        return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} ${time.toLocaleTimeString()}`;
    };

    // Update graph data
    useEffect(() => {
        //Important to create deep copy
        const graphDataCopy = JSON.parse(JSON.stringify({ nodes: nodes, links: links }));
        setGraphData(graphDataCopy);
        fgRef.current.d3Force('link').distance(link => { return 50; });
    }, [nodes, links]);


    const graphDataCopy = JSON.parse(JSON.stringify(graphData));


    // Display link data
    function displayLinkData(link) {
        if (link) {
            document.querySelector('.display').innerHTML = `
            <h3> Relationship </h3>
                <div className="display-change">
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
                        <div>${covertToTime(link.block_timestamp)}</div>
                    </div>
                    <div class="display-group">
                        <div>Block number</div>
                        <div>${link.block_number}</div>
                    </div>
                </div >
        `;

        } else {
            document.querySelector('.display').innerHTML = `
            <h3> Relationship </h3>
                <div className="display-change">
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
                </div>
        `;
        }
    }
    // Render error message
    if (error) return `Error: ${error} `;
    // Render graph node
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
            <div ref={containerRef} className='frameChart'>
                <ForceGraph2D
                    ref={fgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={graphDataCopy}
                    nodeVal={node => node.id === params.id ? 15 : 3}
                    nodeResolution={30}
                    nodeAutoColorBy="id"
                    nodeLabel={(function (node) {
                        return "<div><span class='label'>Wallet address: " + node.id + "<br />";
                    })}
                    onNodeDrag={node => {
                        graphDataCopy.nodes.forEach(n => {
                            if (n !== node) {
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
                    onNodeClick={node => {
                        fetchData(node.id);
                    }}

                    linkLabel={link => {
                        // Implementation for custom link color
                        let tooltipContent = "<div class='label'>";
                        tooltipContent += "<span class='label'>Transaction ID: " + link.transaction_index + "</span>";
                        tooltipContent += "<span class='label'>Value: " + link.value + "</span>";
                        tooltipContent += "<span class='label'>Date: " + covertToTime(link.block_timestamp) + "</span>";
                        tooltipContent += "<span class='label'>Block number: " + link.block_number + "</span>";
                        tooltipContent += "</div>";
                        return tooltipContent;
                    }}
                    linkWidth={(link) => (link === hoveredLinkRef.current || link === clickLinkRef.current) ? 3 : 0.3} // Add this line
                    linkCurvature="curvature"
                    linkCurveRotation="rotation"
                    linkDirectionalArrowLength={5}
                    linkDirectionalArrowRelPos={0.5}
                    linkColor={link => {
                        return "black";
                    }}
                    onLinkHover={(link) => {
                        if (link) {
                            hoveredLinkRef.current = link;
                            clearTimeout(timeoutId);
                            timeoutId = setTimeout(() => {
                            }, 300);
                            displayLinkData(link);
                        } else {
                            hoveredLinkRef.current = null;
                            clearTimeout(timeoutId);
                            displayLinkData();
                            graphDataCopy.links.forEach(l => {
                                if (l.clicked === false) {
                                    l.width = 0.3;
                                } else {
                                    displayLinkData(l);
                                }
                            });
                        }
                    }}
                    onLinkClick={(link) => {
                        if (link) {
                            if (link.clicked) {
                                clickLinkRef.current = null;
                                displayLinkData();
                            } else {
                                clickLinkRef.current = link;
                                displayLinkData(link);
                            }
                            graphDataCopy.links.forEach(l => {
                                if (l !== link) l.clicked = false;
                            });
                            link.clicked = !link.clicked;
                        }
                    }}
                />
            </div>

        </div>
    );
};

export default GraphNode;;
