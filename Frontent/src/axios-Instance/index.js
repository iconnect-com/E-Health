import axios from "axios";
import { baseURL } from "./constants";
import { getLoginToken } from "../storage";

const config = {
  baseURL,
};
axios.defaults.headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getLoginToken()}`,
};
export const axiosInstance = axios.create(config);
