import axios from "axios";

const baseURL = "http://api.teste.vallions.com.br:7000/api/";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Device: "Web",
  },
});

export default api;
