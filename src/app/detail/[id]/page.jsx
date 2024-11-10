// RestaurantDetails.js
"use client";
import apiAxios from "@/app/api/api";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { image_url } from "@/app/api/api";
import Image from "next/image";
import Nav from "@/app/components/nav";
import usePostReview from '@/app/hooks/usePostReview';

// Custom hook to fetch restaurant details
const useRestaurantDetails = (restaurantId) => {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;
    const fetchRestaurantDetails = async () => {
      try {
        const response = await apiAxios(`/detail/${restaurantId}`);

        if (response.data && response.data.error === false) {
          const data = response.data;

          // Check if the response contains the expected structure
          if (data && data.error === false && data.restaurant) {
            setRestaurant(data.restaurant);
          } else {
            setError(data.message || "Failed to fetch data");
          }
        } else {
          setError("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  return { restaurant, loading, error };
};

// React component to display restaurant details
const RestaurantDetails = () => {
  const params = useParams();
  const restaurantId = params.id;
  const { restaurant, loading, error } = useRestaurantDetails(restaurantId);
  const { formData, handleChange, handleSubmit, loading: submitting, error: submitError } = usePostReview(restaurantId);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true); // Assume loading completed after delay
      }
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [imageLoaded]);

  const isLoading = loading || (!imageLoaded && restaurant);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <p className="ml-3">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!restaurant) {

    return null;
  }

  return (
    <header className="pt-3 md:pt-3 md:pb-3">
      <nav>
        <Nav />
      </nav>
      <main className="container mx-auto mt-5 flex flex-col">
        <div className="container mx-auto mt-5 flex flex-row ">
          <Image
            className="rounded mr-10"
            src={image_url + restaurant.pictureId}
            width={720}
            height={720}
          />
          <div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {restaurant.name}
            </h1>
            <p className="mb-1 font-bold tracking-tight text-gray-700 dark:text-white">
              {restaurant.city}
            </p>
            <div className="flex items-center">
              <svg
                class="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {restaurant.rating}
              </p>
              <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>

            <p className="mt-2">{restaurant.description}</p>
            <p className="mt-3 text-3xl text-gray-500 text-center">
              Want to taste It? Come to
            </p>
            <div className="flex flex-col items-center justify-center">
              <button className="mt-3 text-3xl text-gray-700 ite">
                {restaurant.address}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-5 gap-5">
          <div
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Menu Makanan
            </h5>
            <ul className="flex flex-col font-normal text-gray-700 dark:text-gray-400">
              {restaurant.menus.foods.map((food, index) => (
                <li key={index}>{food.name}</li>
              ))}
            </ul>
          </div>
          <div
            href="#"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Menu Minuman
            </h5>
            <ul className="flex flex-col font-normal text-gray-700 dark:text-gray-400">
              {restaurant.menus.drinks.map((food, index) => (
                <li key={index}>{food.name}</li>
              ))}
            </ul>
          </div>
          <div class="block w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Review Customer
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {restaurant.customerReviews.map((review, index) => (
                <li className="list-none mt-1 flex flex-col" key={index}>
                  <div className="flex-row list-item">
                    <p className="font-bold">{review.name}</p>
                    <p>{review.review}</p>
                    <p>{review.date}</p>
                  </div>
                </li>
              ))}
            </div>
            <div className="mt-10">
              <h5 className="text-2xl font-bold">Submit Your Review</h5>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Your Review"
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                {submitError && <p className="text-red-500">{submitError}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
    </header>
  );
};

export default RestaurantDetails;
