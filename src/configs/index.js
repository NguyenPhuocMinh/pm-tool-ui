const basePathRestApi = process.env.REACT_APP_REST_API_PROVIDER;

const headers = {
  'Content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin'
};

const configs = {
  basePathRestApi,
  headers
};

export default configs;