import environment from "./base";
import { Environment } from "../interfaces/Environment";

declare global {
  interface Window {
    API_URL: string;
  }
}

// const baseApi = "https://monquick.helppeoplecloud.com/helppeopleapi";
const baseApi = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "https://monquick.helppeoplecloud.com/helppeopleapi";
// const awsBaseApi =
//   "https://1r1nz0pxl4.execute-api.us-east-1.amazonaws.com/default/restServicesMailService";
const awsBaseApi = process.env.REACT_APP_AWS_API
  ? process.env.REACT_APP_AWS_API
  : "https://1r1nz0pxl4.execute-api.us-east-1.amazonaws.com/default/restServicesMailService";
const env = environment(baseApi, awsBaseApi);

const Config: Environment = {
  ...env,
  intervals: {
    ...env.intervals,
    logout: 300, // 5 min in seconds
  },
  isProduction: false,
  isDevelopment: true,
};

export default Config;
