import axios from "axios";

const mercadoUrbanoApi = axios.create({
  baseURL: "http://187.157.11.227:8003/api",
});

export default mercadoUrbanoApi;
