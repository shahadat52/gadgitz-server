import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  front_end_cloud: process.env.FRONT_END_CLOUD,
  front_end_local: process.env.FRONT_END_LOCAL,
  server_local: process.env.SERVER_LOCAL,
  server_cloud: process.env.SERVER_CLOUD,
  database: process.env.DATABASE_URL,
  bcrypt_salt: process.env.BCRYPT_SALT_ROUND,
  default_pass: process.env.DEFAULT_PASS,
  secret_key: process.env.JWT_SECRET_KEY,
  refresh_key: process.env.JWT_REFRESH_TOKEN_SECRET,
  expire_time: process.env.JWT_EXPIRE_TIME,
  expire_time_refresh: process.env.JWT_EXPIRE_TIME_REFRESH,
  payment: {
    store_id: process.env.STORE_ID,
    store_pass: process.env.STORE_PASSWORD,
  }

};
