import axios from "axios";
import environment from "environment";

const API = () => {
  return axios.create({
    baseURL: environment.api.url,
    timeout: environment.intervals.timeout,
    headers: {
      common: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

export default API;
