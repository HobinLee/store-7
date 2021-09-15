import * as dotenv from "dotenv";
dotenv.config();

export default {
  client: process.env.CLIENT || "http://localhost:3000",
  server: {
    port: process.env.SERVER_PORT || 8080,
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "db",
  },
  elastic: {
    node: process.env.ELASTIC_NODE,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
  auth: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || "6H",
    bearer: "Bearer ",
    saltRounds: 10,
    tokenKey: "token",
  },
  s3: {
    accessKey: process.env.S3_ACCESS_KEY || "",
    secretKey: process.env.S3_SECRET_KEY || "",
    region: process.env.S3_REGION || "",
    bucket: process.env.S3_BUCKET || "",
  },
  github: {
    redirect: process.env.GITHUB_REDIRECT_URI || "",
    secret: process.env.GITHUB_CLIENT_SECRET || "",
    id: process.env.GITHUB_CLIENT_ID || "",
  },
  google: {
    redirect: process.env.GOOGLE_REDIRECT_URI || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    id: process.env.GOOGLE_CLIENT_ID || "",
  },
};
