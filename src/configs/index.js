const nodeEnv = process.env.NODE_ENV;
const basePathRestApi = process.env.REACT_APP_REST_API_PROVIDER;

const headers = {
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': [
    'https://pm-tool-api.vercel.app/',
    'https://pm-tool-api.vercel.app/*'
  ],
  'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin'
};

const configs = {
  nodeEnv,
  basePathRestApi,
  headers
};

export default configs;
