"use client";
// components/FilterBox.js
import React, { useState } from "react";

const FilterBox = ({ onFilter }) => {
  const [openNow, setOpenNow] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = () => {
    // Combine all filter values and pass them to the parent component
    const filters = {
      openNow,
      priceRange,
      selectedCategory,
    };

    onFilter(filters);
  };

  return (
    <div>
      <hr className="w-[75%] border-t border-black mb-2 items-center justify-center flex" />
      <div className="flex my-2 mx-3">
        <div>
          <label>
            Filter by:
            <input
              type="checkbox"
              checked={openNow}
              onChange={() => setOpenNow(!openNow)}
            />
            Open Now
          </label>
        </div>
        <div className="ml-2">
          <button onClick={() => handleFilter()}>
            Show Price Range and Categories
          </button>
        </div>
        <div className="ml-2">
          <label>
            Price Range:
            <input
              type="text"
              placeholder="Enter price range"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Categories:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more categories as needed */}
            </select>
          </label>
        </div>
      </div>
      <hr className="w-[75%] border-t border-black mb-2 items-center justify-center flex" />
    </div>
  );
};

export default FilterBox;
