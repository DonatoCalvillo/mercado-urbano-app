import axios from "axios";

const mercadoUrbanoApi = axios.create({
  baseURL:
    "https://mercado-urbano-api-2-1vrhzayo1-donatocalvillo.vercel.app/api",
});

export default mercadoUrbanoApi;
