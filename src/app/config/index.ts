import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
