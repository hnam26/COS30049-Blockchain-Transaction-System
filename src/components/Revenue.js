import React from "react";
import { getRevenueByNumber } from "../data/revenueData";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
const Revenue = () => {
    const params = useParams();
    const revenue = getRevenueByNumber(parseInt(params.id));
    return (
        <>
            {revenue ? <BarChart props={revenue} /> : null}
        </>
    );
};
export default Revenue;