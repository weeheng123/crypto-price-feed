import "./Main.scss";
import PriceFeed from "./PriceFeed";
import React from "react";
import { ReactComponent as LogoSearch } from "../../assets/logo_search.svg";

function Main({ priceFeed, category, changePage, setPageNumber, pageNumber }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handlePageNumber(event) {
    setPageNumber(event.target.value);
  }
  return (
    <div className="container">
      <h2>{capitalizeFirstLetter(category)} prices by Market Cap</h2>
      <div className="price-feed">
        <PriceFeed
          priceFeed={priceFeed}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
      </div>
      <div className="page-navigation">
        <span>Page Number:</span>
        <input
          id="page-number"
          value={pageNumber}
          onChange={handlePageNumber}
        ></input>
        <LogoSearch
          onClick={() => {
            changePage(pageNumber);
          }}
        />
        {typeof priceFeed[0] === "undefined" ? (
          <span className="warning">NO DATA AVAILABLE</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default React.memo(Main);
