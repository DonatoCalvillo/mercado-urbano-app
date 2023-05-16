import axios from "axios";

const mercadoUrbanoApi = axios.create({
  baseURL: "https://mercado-urbano-api-2.vercel.app/api",
});

export default mercadoUrbanoApi;
