import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ chartData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (chartData.prices) {
      chartData.prices.map((price) => {
        dataCopy.push([
          `${new Date(price[0]).toLocaleDateString().slice(0, -5)}`,
          price[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [chartData]);

  return (
    <>
      <Chart chartType="AreaChart" data={data} height="100%" legendToggle />
    </>
  );
};

export default LineChart;
