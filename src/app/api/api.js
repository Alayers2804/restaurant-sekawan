import axios from "axios";

const base_url = "https://restaurant-api.dicoding.dev/";
export const image_url = "https://restaurant-api.dicoding.dev/images/medium/";

const apiAxios = axios.create({
  baseURL: base_url,
});

export default apiAxios;
