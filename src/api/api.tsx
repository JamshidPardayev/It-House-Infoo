import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.ithouseedu.uz/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
