import environment from "./base";
import { Environment } from "../interfaces/Environment";

const baseApi = "https://monquick.helppeoplecloud.com/helppeopleapi";
const env = environment(baseApi);

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
