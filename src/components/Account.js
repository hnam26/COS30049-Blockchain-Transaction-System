import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionSummary from "./TransactionSummary";
import UserInfo from "./UserInfo";
import HandleRevenueError from "./ErrorHandler";
import GraphNode from "./GraphNode";
import accountcss from "../styles/account.css";
import { useReadCypher } from 'use-neo4j';
import axios from 'axios';
import { ProcessGraphData } from "../data/Process";
const Account = () => {
    const params = useParams();
    const id = params.id;
    // Define state variables for node, transHistory, transData, summary, and transactions
    // const { loading, error, result, run } = useReadCypher('MATCH (n {addressId: $id})-[r]-(m) RETURN DISTINCT n,m,r', { id });
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showWalletContent, setShowWalletContent] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/addresses/${id}`);
                const values = ProcessGraphData(response.data);
                setGraphData({
                    nodes: values.nodes,
                    links: values.links
                });
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };
        setShowWalletContent(true);
        fetchData();
    }, [id]);
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (graphData.nodes.length != 0) {
        return (
            <>
                <UserInfo props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} />
                <div className="userSelect">
                    <button className={"buttonToggle" + (showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(true)}>Wallet</button>
                    <button className={"buttonToggle" + (!showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(false)}>Chart</button>
                </div>
                {showWalletContent ? (
                    <>
                        <div style={{ width: "95%" }}>
                            <div className="chart-summary-frame">
                                <div className="bar">
                                    <BarChart props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} />
                                </div>
                                <div className="summary">
                                    <TransactionSummary props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} />
                                </div>
                            </div>
                            <TransactionsTable props={{ ...{ nodes: graphData.nodes, links: graphData.links } }} />
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

    // Render the JSX based on the fetched data
    // return (
    //     <>
    //         {data.node ? (
    //             <>

    //                 <UserInfo props={{ nodes: data.node, summary: data.summary }} />
    //                 <div className="userSelect">
    //                     <button className={"buttonToggle" + (showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(true)}>Wallet</button>
    //                     <button className={"buttonToggle" + (!showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(false)}>Chart</button>
    //                 </div>
    //                 {showWalletContent ? (

    //                     <div style={{ width: "95%", padding: "0px 80px" }}>
    //                         <div className="chart-summary-frame">
    //                             <div className="bar">
    //                                 <BarChart props={data.transHistory} />
    //                             </div>
    //                             <div className="summary">
    //                                 <TransactionSummary summary={data.summary} />
    //                             </div>
    //                         </div>
    //                         <TransactionsTable transactions={data.transactions} />
    //                     </div>
    //                 ) : (
    //                     <>
    //                         <TransactionGraph data={transData} />
    //                     </>
    //                 )}
    //             </>
    //         ) : (
    //             // Render error handler component if node data is not available
    //             <>
    //                 <HandleRevenueError />
    //                 <TestRetrieving walletId={params.id} />
    //                 <TestGraph2D walletId={params.id} />
    //             </>
    //         )}
    //     </>
    // );

};
export default Account;
