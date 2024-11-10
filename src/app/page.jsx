"use client"
import Nav from "./components/nav";
import Filter from "./sections/filter";
import ListRestaurant from "./sections/listRestaurant";
import SearchBar from "./sections/searchBar";
import React, { useState } from "react";


export default function Home() {
  const [filter, setFilter] = useState({ selectedCategory: "" });
  const [searchedRestaurants, setSearchedRestaurants] = useState([]);
  
  const handleFilter = (filters) => {
    setFilter(filters);
  };


  return (
    <>
      <header className="pt-3 md:pt-3 pb-4 md:pb-3">
        <Nav />
        <SearchBar />
        <main className="container mx-auto mt-10">
          <Filter onFilter={handleFilter} />
         <ListRestaurant filter={filter} searchTerm={searchedRestaurants} />
        </main>
      </header>
    </>
  );
}