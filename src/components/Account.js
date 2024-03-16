import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionsTableSke from "./skeleton/TransactionsTableSke";
import TransactionSummary from "./TransactionSummary";
import TransactionSummarySke from "./skeleton/TransactionSumSke";
import UserInfo from "./UserInfo";
import UserInfoSke from "./skeleton/UserInfoSkeleton";
import HandleError from "./ErrorHandler";
import GraphNode from "./GraphNode";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { ProcessGraphData } from "../data/Process";
import accountcss from "../styles/account.css";
const Account = () => {
    const params = useParams();
    const id = params.id;
    const pageStep = 10;
    const [node, setNode] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [tableData, setTabelData] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPage, setTotalPage] = useState(null);
    const [showWalletContent, setShowWalletContent] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

        // Fetch api for node
        axios.get(`/addresses/${id}?node=true`).then(response => {
            const node = response.data;
            setNode(node);
            setLoading(false);
        }).catch(error => {
            console.log("error at node", error.message);
            setError(error);
        });

        // Fetch api for total page
        axios.get(`/addresses/${id}?totalPageCount=true`).then(response => {
            let pageTotal = Math.floor(+response.data.pageTotal / +pageStep) + 1;
            setTotalPage(+pageTotal);
            setLoading(false);
        }).catch(error => {
            console.log("error at total page", error.message);
            setError(error);
        });

        // Fetch api for graph node
        axios.get(`/addresses/${id}`).then(response => {
            const values = ProcessGraphData(response.data);
            setGraphData({
                nodes: values.nodes,
                links: values.links
            });
            setLoading(false);
        }).catch(error => {
            console.log("error at graph node", error.message);
            setError(error);
        });

        // Fetch api for table transaction
        axios.get(`/addresses/${id}?pages=${1}`).then(response => {
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

        // Fetch api for sent coin and receive coin paralel
        let urls = [`/addresses/${id}?sent=true`, `/addresses/${id}?receive=true`];
        let requests = urls.map(url => axios.get(url));
        Promise.all(requests)
            .then(axios.spread((sentResponse, receiveResponse) => {
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
                    receives: receives
                });
                setLoading(false);
            }))
            .catch(errors => {
                console.log("error at summary", errors.message);
                // react on errors.
                setError(errors);
            });
        setNode(null);
        setSummary(null);
        setLoading(true);
        setTabelData(null);
        setGraphData(null);
    }, [id]);

    if (node) console.log("Node get");
    if (graphData) console.log("graphData get");
    if (tableData) console.log("tableData get");
    if (summary) console.log("summary get");
    if (totalPage) console.log("totalPage get");




    // Handle page click
    const handlePageClick = (data) => {
        let selected = data.selected;
        // Add 1 to the selected page number because your pages are 1-indexed
        let pageNumber = selected + 1;
        if (graphData) {
            let start = (pageNumber - 1) * 10;
            let end = start + 10;
            setTabelData({
                nodes: graphData.nodes.slice(start, end),
                links: graphData.links.slice(start, end)
            });
        } else {
            // Fetch api for table transaction
            axios.get(`/addresses/${id}?pages=${pageNumber}`).then(response => {
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
        console.log(error);
        // Determine the error type based on the error message or status code
        if (error.message && error.message.includes("404")) {
            navigate('/error/404');
        } else if (error.message && error.message.includes("500")) {
            navigate('/error/500');
        } else {
            return (
                <>
                    <HandleError />
                </>
            );
        }
        return <div>Error {error.message}</div>;
    }

    // Can connect to database
    if ((node && !loading) || loading) {
        {
            return (
                <>
                    {summary ? <UserInfo summary={summary} /> : <UserInfoSke />}
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
                            {tableData && tableData.links.length != 0 ? <div>
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
        }
    } else
        console.log(node);
    return (
        <>
            <HandleError />
            <div style={{ width: "100%", height: "40vh" }}></div>
        </>
    );
};
export default Account;