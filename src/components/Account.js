import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionsTableSke from "./skeleton/TransactionsTableSke";
import TransactionSummary from "./TransactionSummary";
import TransactionSummarySke from "./skeleton/TransactionSumSke";
import UserInfo from "./UserInfo";
import UserInfoSke from "./skeleton/UserInfoSkeleton";
import HandleRevenueError from "./ErrorHandler";
import GraphNode from "./GraphNode";
import axios from 'axios';
import { ProcessGraphData } from "../data/Process";
import accountcss from "../styles/account.css";
const Account = () => {
    const params = useParams();
    const id = params.id;
    const pageStep = 10;
    const [pages, setPages] = useState(1);
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [tableData, setTabelData] = useState({ nodes: [], links: [] });
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showWalletContent, setShowWalletContent] = useState(true);
    useEffect(() => {
        // Fetch api for graph node
        axios.get(`/addresses/${id}`).then(response => {
            const values = ProcessGraphData(response.data);
            setGraphData({
                nodes: values.nodes,
                links: values.links
            });
            setLoading(false);
        }).catch(error => {
            console.log("error at all", error.message);
            setError(error);
        });

        // Fetch api for table transaction
        axios.get(`/addresses/${id}?pages=${pages}`).then(response => {
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
                console.log("error at summary", error.message);
                // react on errors.
                setError(errors);
            });
        setSummary(null);
        setLoading(true);
        setTabelData({ nodes: [], links: [] });
        setGraphData({ nodes: [], links: [] });
    }, [id]);


    if (error) return <div>Error {error.message}</div>; //can not connect database

    const handlePages = (pages, plus) => {
        const newPages = pages + 1 * plus;
        setTabelData({
            nodes: graphData.nodes,
            links: graphData.links.slice((newPages - 1) * pageStep, (newPages - 1) * pageStep + pageStep)
        });
        setPages(newPages);
    };

    // Can connect to database
    if ((graphData.nodes.length !== 0 && !loading) || loading) {
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
                            {tableData.nodes.length != 0 ? <TransactionsTable props={{ ...{ nodes: tableData.nodes, links: tableData.links } }} /> : <TransactionsTableSke />}
                        </div>
                        <div>
                            {
                                pages == 1 ?
                                    <>
                                        <button onClick={() => handlePages(pages, 0)}>{+pages}</button>
                                        <button onClick={() => handlePages(pages, 1)}>{+pages + 1}</button>
                                    </>
                                    : pages < Math.floor(summary.totalCount / 10) ?
                                        <>
                                            <button onClick={() => handlePages(pages, -1)}>{+pages - 1}</button>
                                            <button onClick={() => handlePages(pages, 0)}>{+pages}</button>
                                            <button onClick={() => handlePages(pages, 1)}>{+pages + 1}</button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => handlePages(pages, -1)}>{+pages - 1}</button>
                                            <button onClick={() => handlePages(pages, 0)}>{+pages}</button>

                                        </>

                            }
                        </div>
                    </>
                ) : (
                    <>
                        <GraphNode props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} />
                    </>
                )
                }
            </>
        );
    }
    else return (
        <>
            <HandleRevenueError />
            <div style={{ width: "100%", height: "40vh" }}></div>
        </>
    );

};
export default Account;
