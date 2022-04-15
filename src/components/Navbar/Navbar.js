import "./Navbar.scss";
import Categories from "./Categories";
import React, { useEffect, useState, useRef } from "react";
import Search from "./Search";

function Navbar({
  getCategory,
  showCategories,
  setShowCategories,
  fetchSpecificID,
}) {
  const [categories, setCategories] = useState([{}]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    async function getCategoriesData() {
      var getApi = "https://api.coingecko.com/api/v3/coins/categories/list";
      fetch(getApi)
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }
    getCategoriesData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!searchRef?.current?.contains(event.target)) {
        setShowSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  async function getSearchResult(event) {
    if (event.key === "Enter") {
      var getApi = `https://api.coingecko.com/api/v3/search?query=${event.target.value}`;
      fetch(getApi)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchResult(data);
        });
    }
  }

  function focusSearch() {
    setShowSearch(true);
    console.log(searchRef.current);
  }

  return (
    <div className="container">
      <div className="navbar">
        <div className="left-div">
          <h1>App by Heng</h1>
          <h2 onClick={() => setShowCategories(!showCategories)}>Categories</h2>
        </div>
        <div className="right-div">
          <input onKeyDown={getSearchResult} onFocus={focusSearch}></input>
        </div>
      </div>
      {showCategories ? (
        <Categories categories={categories} getCategory={getCategory} />
      ) : (
        ""
      )}
      {showSearch ? (
        <Search
          searchResult={searchResult}
          fetchSpecificID={fetchSpecificID}
          ref={searchRef}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;
