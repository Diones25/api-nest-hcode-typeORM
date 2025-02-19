import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const datasource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: '',
  database: process.env.DB_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
});

export default datasource;