export default {
  server: {
    port: 8080,
  },
  elastic: {
    node: process.env.ELASTIC_NODE,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
};
