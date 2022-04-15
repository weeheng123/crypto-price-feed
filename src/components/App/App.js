import "./App.scss";
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Main from "../Main/Main";

function App() {
  const [category, setCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);
  const [priceFeed, setPriceFeed] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");

  async function getCategory(string) {
    setShowCategories(!showCategories);
    getPriceFeed(string);
  }

  async function getPriceFeed(string) {
    setCategory(string);
    var getApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${string}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    if (string === "All") {
      getApi =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";
    }
    setPageNumber("1");
    fetchFunction(getApi);
  }

  async function changePage(string) {
    var getApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=100&page=${string}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    if (category === "All") {
      getApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${string}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    }
    try {
      await fetchFunction(getApi);
    } catch {
      alert("No such page.");
    }
    window.scrollTo(0, 0);
  }

  async function fetchSpecificID(string) {
    var getApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${string}&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    try {
      await fetchFunction(getApi);
    } catch {
      alert("No such page.");
    }

    setCategory(string);
  }

  async function fetchFunction(string) {
    fetch(string)
      .then((response) => response.json())
      .then((data) => {
        setPriceFeed(data);
      })
      .catch((err) => {
        throw err;
      });
  }

  useEffect(() => {
    getPriceFeed(category);
  }, [category]);

  return (
    <React.Fragment>
      <Navbar
        getCategory={getCategory}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
        fetchSpecificID={fetchSpecificID}
      />
      <Main
        priceFeed={priceFeed}
        category={category}
        changePage={changePage}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </React.Fragment>
  );
}

export default App;
