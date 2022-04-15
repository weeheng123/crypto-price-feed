import "./Navbar.scss";
import React from "react";

function Categories({ categories, getCategory }) {
  const propsCategories = categories;

  return (
    <div className="dropdown">
      <h2>Categories</h2>
      <div className="menu">
        <span
          key={"all"}
          className="category"
          onClick={() => {
            getCategory("All");
          }}
        >
          All
        </span>
        {propsCategories.map((category, i) => {
          return (
            <span
              key={i}
              className="category"
              onClick={() => {
                getCategory(category.category_id);
              }}
            >
              {category.category_id}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
