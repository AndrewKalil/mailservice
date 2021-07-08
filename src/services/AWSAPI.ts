import axios from "axios";
import environment from "environment";

const AWSAPI = () => {
  return axios.create({
    baseURL: environment.api.awsApi,
    timeout: environment.intervals.timeout,
    headers: {
      common: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  });
};

export default AWSAPI;
