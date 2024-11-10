"use client";
// components/FilterBox.js
import React, { useState } from "react";

const Filter = ({ onFilter }) => {

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = () => {

    const filters = {
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
            Categories:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">None</option>
              <option value="high">Highest Rating</option>
              <option value="low">Lowest Rating</option>
              
            </select>
          </label>
        </div>
        <button className="ml-3" onClick={handleFilter}>Apply Filter</button>
      </div>
      <hr className="w-[75%] border-t border-black mb-2 items-center justify-center flex" />
    </div>
  );
};

export default Filter;
