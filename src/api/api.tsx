import axios from "axios";

export const api = axios.create({
  baseURL: "http://95.217.166.224:8001",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
