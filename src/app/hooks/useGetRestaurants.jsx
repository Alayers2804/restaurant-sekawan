"use client";
import apiAxios from "../api/api";
import { useEffect, useState } from "react";

const getRestaurants = () => {
  const [dataRestaurants, setDataRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiAxios.get("/list");
        setDataRestaurants(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return dataRestaurants;
};

export { getRestaurants };
