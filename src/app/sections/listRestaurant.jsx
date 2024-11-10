"use client";
import { RestaurantCard } from "../components/card";
import { getRestaurants } from "@/app/hooks/useGetRestaurants";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ListRestaurant({ filter }) {
  const data = getRestaurants();
  const [sortedRestaurants, setSortedRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.restaurants) {
      let sortedData = [...data.restaurants];

      if (filter.selectedCategory === "high") {
        sortedData.sort((a, b) => b.rating - a.rating);
      } else if (filter.selectedCategory === "low") {
        sortedData.sort((a, b) => a.rating - b.rating);
      }

      setSortedRestaurants(sortedData);
      setLoading(false);
    }
  }, [data, filter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Image unoptimized = {true}
          src="/loading.gif" 
          alt="Loading..."
          width={300}
          height={300} 
        />
      </div>
    );
  }

  if (!sortedRestaurants.length) {
    return <p>No restaurants available.</p>; // Show this if no restaurants are found
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {sortedRestaurants.map((item) => (
        <Link href={`/detail/${item.id}`} key={item.id}>
          <RestaurantCard
            image={item.pictureId}
            name={item.name}
            city={item.city}
            rating={item.rating}
          />
        </Link>
      ))}
    </div>
  );
}
