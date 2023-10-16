import axios from "axios";

export const apiinstance = axios.create({
    baseURL: "http://localhost:3000/api/",
  });