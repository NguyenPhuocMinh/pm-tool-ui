const nodeEnv = process.env.NODE_ENV;
const basePathRestApi = process.env.REACT_APP_REST_API_PROVIDER;

const headers = {
  'Access-Control-Allow-Origin': basePathRestApi,
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Max-Age': 86400
};

const configs = {
  nodeEnv,
  basePathRestApi,
  headers
};

export default configs;
