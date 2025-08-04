import { defineConfig } from "drizzle-kit";
const key = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url: key
  }
});