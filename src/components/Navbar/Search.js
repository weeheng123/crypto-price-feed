import { forwardRef } from "react";
import "./Navbar.scss";

const Search = forwardRef(({ searchResult, fetchSpecificID }, searchRef) => {
  return (
    <div className="search" ref={searchRef}>
      <div className="search-menu">
        {searchResult.coins ? (
          searchResult.coins.map((coin, i) => {
            return (
              <div
                className="search-result"
                onClick={() => {
                  fetchSpecificID(coin.id);
                }}
              >
                <img src={coin.thumb} alt="Cryptocurrency" />
                <span key={"search" + i}>{coin.id}</span>
              </div>
            );
          })
        ) : (
          <span>No results found</span>
        )}
      </div>
    </div>
  );
});

export default Search;
