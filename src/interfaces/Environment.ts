interface API {
  url: string;
  awsApi: string;
}

interface Intervals {
  logout: number;
  timeout: number;
}

export interface Environment {
  intervals: Intervals;
  api: API;
  isProduction: boolean;
  isDevelopment: boolean;
}
