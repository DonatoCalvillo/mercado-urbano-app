import axios from "axios";

const mercadoUrbanoApi = axios.create({
  baseURL: "http://localhost:8001/api",
});

export default mercadoUrbanoApi;
