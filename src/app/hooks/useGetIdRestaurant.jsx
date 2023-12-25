"use client";
import apiAxios from "../api/api";
import { useEffect, useState } from "react";

const useGetIdRestaurants = (id) => {
  const [dataRestaurants, setDataRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiAxios.get(`/detail/${id}`);
        setDataRestaurants(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return dataRestaurants;
};

export { useGetIdRestaurants as detailRestaurants };
