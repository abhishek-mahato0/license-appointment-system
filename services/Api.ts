import axios from "axios";

export const apiinstance = axios.create({
    baseURL: "/api/",
  });