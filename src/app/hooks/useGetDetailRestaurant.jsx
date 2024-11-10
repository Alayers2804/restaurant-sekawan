import { useEffect, useState } from "react";


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

  export { useRestaurantDetails as getRestaurantDetails };