import React from "react";
import { getRevenueByNumber } from "../data/revenueData";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import { handleRevenueError } from "./errorHandler";

const Revenue = () => {
    const params = useParams();
    const revenue = getRevenueByNumber(parseInt(params.id));

    if (!revenue) {
        return handleRevenueError();
    }

    return (
        <>
            <BarChart props={revenue} />
            <TransactionsTable transactions={revenue.revenue} />
        </>
    );
};

export default Revenue;
