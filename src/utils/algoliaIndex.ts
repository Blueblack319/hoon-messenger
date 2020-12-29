import algoliasearch from 'algoliasearch/lite';
require('dotenv').config();

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID as string,
  process.env.REACT_APP_ALGOLIA_ADMIN_API_KEY as string,
);

export default client.initIndex('users');
