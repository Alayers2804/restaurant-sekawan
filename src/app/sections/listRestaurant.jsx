"use client";
import { RestaurantCard } from "../components/card";
import { getRestaurants } from "../hooks/UseGetRestaurants";
import Link from "next/link";

export default function ListRestaurant() {
  const data = getRestaurants();

  if (!data || !data.restaurants) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {data.restaurants.map((item, index) => (
          <Link href={`/detail/${item.id}`} key={item.id}>
            <RestaurantCard
              image={item.pictureId}
              name={item.name}
              city={item.city}
              key={item.id}
              rating={item.rating}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
