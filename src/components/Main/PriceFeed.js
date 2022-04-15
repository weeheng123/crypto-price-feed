import "./Main.scss";
import React, { useRef } from "react";
// import { Line } from "react-chartjs-2";
import { Sparklines, SparklinesLine } from "react-sparklines";

function PriceFeed({ priceFeed, capitalizeFirstLetter }) {
  // const lineRefs = useRef([]);
  return (
    <table>
      <thead>
        <tr className="header-row">
          <th width="10px">#</th>
          <th width="120px">Coin</th>
          <th width="50px">Currency</th>
          <th width="200px">Order</th>
          <th width="150px">Price</th>
          <th width="50px">1h</th>
          <th width="50px">24h</th>
          <th width="50px">7d</th>
          <th width="180px">24h Volume</th>
          <th width="180px">Mkt Cap</th>
          <th width="180px">Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
        {priceFeed[0]
          ? priceFeed.map((data, i) => {
              // var chartData = {
              //   labels: data.sparkline_in_7d.price,
              //   datasets: [{ data: data.sparkline_in_7d.price }],
              // };

              // if (lineRefs?.current[i]) {
              //   lineRefs?.current[i].chartInstance.destroy();
              // }
              return (
                <tr key={"Currency" + i} className="price-row">
                  <td>{i + 1}</td>
                  <td className="with-image">
                    <img src={data.image} alt="Cryptocurrency" />
                    {capitalizeFirstLetter(data.id)}
                  </td>
                  <td>{data.symbol.toUpperCase()}</td>
                  <td></td>
                  <td>${data.current_price}</td>
                  <td>
                    {data.price_change_percentage_1h_in_currency
                      ? data.price_change_percentage_1h_in_currency.toFixed(2) +
                        "%"
                      : "?"}
                  </td>
                  <td>
                    {data.price_change_percentage_24h_in_currency
                      ? data.price_change_percentage_24h_in_currency.toFixed(
                          2
                        ) + "%"
                      : "?"}
                  </td>
                  <td>
                    {data.price_change_percentage_7d_in_currency
                      ? data.price_change_percentage_7d_in_currency.toFixed(2) +
                        "%"
                      : "?"}
                  </td>
                  <td>${data.total_volume.toLocaleString()}</td>
                  <td>${data.market_cap.toLocaleString()}</td>
                  <td>
                    <div className="chart">
                      <Sparklines data={data.sparkline_in_7d.price} margin={5}>
                        <SparklinesLine color="blue" />
                      </Sparklines>
                    </div>
                  </td>
                </tr>
              );
            })
          : console.log("No data available")}
      </tbody>
    </table>
  );
}

export default React.memo(PriceFeed);
