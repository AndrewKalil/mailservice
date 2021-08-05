import { Environment } from "../interfaces/Environment";

function getBaseEnv(baseApi: string, awsBaseApi: string): Environment {
  return {
    intervals: {
      logout: 36000,
      timeout: 15000,
    },
    api: {
      url: `${baseApi}/api`,
      awsApi: `${awsBaseApi}`,
      //   awsApi: `https://1r1nz0pxl4.execute-api.us-east-1.amazonaws.com/default/restServicesMailService`,
    },
    isProduction: true,
    isDevelopment: false,
  };
}

export default getBaseEnv;
