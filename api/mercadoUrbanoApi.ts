import axios from "axios";

const mercadoUrbanoApi = axios.create({
  // baseURL: "https://mercado-urbano-api-2.vercel.app/api",
  baseURL: "http://localhost:3002/api",
});

export default mercadoUrbanoApi;
