import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionsTableSke from "./skeleton/TransactionsTableSke";
import TransactionSummary from "./TransactionSummary";
import TransactionSummarySke from "./skeleton/TransactionSumSke";
import UserInfo from "./UserInfo";
import UserInfoSke from "./skeleton/UserInfoSkeleton";
import GraphNode from "./GraphNode";
import ReactPaginate from 'react-paginate';
import Error from "./ErrorPage";
import axios from 'axios';
import { ProcessGraphData } from "../data/Process";
import "../styles/account.css";
const Account = () => {
    const params = useParams();
    const id = params.id;
    // Constants and state variables initialization
    const pageStep = 10; // Number of items per page
    const [node, setNode] = useState(null); // State for storing node data
    const [graphData, setGraphData] = useState(null); // State for storing graph data
    const [tableData, setTabelData] = useState(null); // State for storing table data
    const [summary, setSummary] = useState(null); // State for storing summary data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [totalPage, setTotalPage] = useState(null); // State for total number of pages
    const [showWalletContent, setShowWalletContent] = useState(true); // State for toggling wallet content
    useEffect(() => {
        // Reset states and set loading status when component mounts or 'id' changes
        setLoading(true);
        setNode(null);
        setSummary(null);
        setTabelData(null);
        setGraphData(null);

        // Fetch node data
        const fetchNode = axios.get(`http://localhost:5000/addresses/${id}?node=true`).then(response => {
            const node = response.data;
            setNode(node);
            setLoading(false);
            return 'node';
        }).catch(error => {
            console.log("error at node", error.message);
            setError(error);
        });

        // Fetch total page count
        const fetchTotalPage = axios.get(`http://localhost:5000/addresses/${id}?totalPageCount=true`).then(response => {
            let pageTotal = Math.floor(+response.data.pageTotal / +pageStep) + 1;
            setTotalPage(+pageTotal);
            return 'totalPage';
        }).catch(error => {
            console.log("error at total page", error.message);
            setError(error);
        });

        // Fetch table transaction data
        const fetchTableTransaction = axios.get(`http://localhost:5000/addresses/${id}?pages=${1}`).then(response => {
            const values = ProcessGraphData(response.data);
            setTabelData({
                nodes: values.nodes,
                links: values.links
            });
            return 'tableTransaction';
        }).catch(error => {
            console.log("error at table", error.message);
            setError(error);
        });

        // Fetch summary data (sent and received transactions)
        const fetchSummary = Promise.all([
            axios.get(`http://localhost:5000/addresses/${id}?sent=true`),
            axios.get(`http://localhost:5000/addresses/${id}?receive=true`)
        ]).then(axios.spread((sentResponse, receiveResponse) => {
            var sent = sentResponse.data.coin;
            var receive = receiveResponse.data.coin;
            var totalCount = +sentResponse.data.count + +receiveResponse.data.count;
            var sents = sentResponse.data.sents;
            var receives = receiveResponse.data.receives;
            setSummary({
                sent: sent,
                receive: receive,
                totalCount: totalCount,
                sents: sents,
                receives: receives,
            });
            return 'coins';
        })).catch(errors => {
            console.log("error at summary", errors.message);
            setError(errors);
        });

        // Fetch graph node data (all records of that wallet id)
        const fetchGraphNode = axios.get(`http://localhost:5000/addresses/${id}?all=true`).then(response => {
            const values = ProcessGraphData(response.data);
            setGraphData({
                nodes: values.nodes,
                links: values.links
            });
            return 'graphNode';
        }).catch(error => {
            console.log("error at graph node", error.message);
            setError(error);
        });

        // Execute all requests concurrently
        const requests = [fetchSummary, fetchTableTransaction, fetchTotalPage, fetchNode, fetchGraphNode];

        // Track completion of each request
        const results = [];
        requests.forEach(request => {
            request.then(result => {
                results.push(result);
                console.log(`Completed: ${result}`);
                console.log(`Order so far: ${results.join(', ')}`);
            });
        });
    }, [id]);

    // Handle page click
    const handlePageClick = (data) => {
        let selected = data.selected;
        // Add 1 to the selected page number because your pages are 1-indexed
        let pageNumber = selected + 1;
        if (graphData) {
            let start = (pageNumber - 1) * 10;
            let end = start + 10;
            let sortedLinks = graphData.links.sort((a, b) => b.block_timestamp - a.block_timestamp);
            let slicedLinks = sortedLinks.slice(start, end);

            setTabelData({
                nodes: graphData.nodes.slice(start, end),
                links: slicedLinks
            });
        } else {
            // Fetch api for table transaction
            axios.get(`http://localhost:5000/addresses/${id}?pages=${pageNumber}`).then(response => {
                const values = ProcessGraphData(response.data);
                setTabelData({
                    nodes: values.nodes,
                    links: values.links
                });
                setLoading(false);
            }).catch(error => {
                console.log("error at table", error.message);
                setError(error);
            });
        }
    };

    // Cannot connect to database
    if (error) {
        console.log(error.response?.status);
        // Determine the error type based on the error message or status code
        if (error?.response?.status === 404) {
            return (<Error props={{ status: "404" }} />);
        }
        if (error?.response?.status === 500) {
            return (<Error props={{ status: "500" }} />);
        }
        if (error?.response?.status === "Network Error") {
            return (<Error props={{ status: "Network Error" }} />);
        }

    }

    // Can connect to database
    if ((node && !loading) || loading) {
        return (
            <>
                {summary && node ? <UserInfo summary={summary} node={node} /> : <UserInfoSke />}
                <div className="userSelect">
                    <button className={"buttonToggle" + (showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(true)}>Wallet</button>
                    <button className={"buttonToggle" + (!showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(false)}>Chart</button>
                </div>
                {showWalletContent ? (
                    <>
                        <div style={{ width: "95%" }}>
                            <div className="chart-summary-frame">
                                <div className="bar">
                                    {summary ? <BarChart summary={summary} /> : <></>}
                                </div>
                                <div className="summary">
                                    {summary ? <TransactionSummary summary={summary} /> : <TransactionSummarySke />}
                                </div>
                            </div>
                            {tableData ? <TransactionsTable props={{ ...{ nodes: tableData.nodes, links: tableData.links } }} /> : <TransactionsTableSke />}
                        </div>
                        {tableData && tableData.links.length !== 0 ? <div>
                            <ReactPaginate
                                nextLabel=">"
                                previousLabel="<"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div> : <></>}

                    </>
                ) : (
                    <>
                        {graphData ? <GraphNode props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} /> : <></>}
                    </>
                )
                }
            </>
        );
    } else
        return (
            <>
                <Error />
                <div style={{ width: "100%", height: "40vh" }}></div>
            </>
        );
};
export default Account;