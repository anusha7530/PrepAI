import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials:{
    url: 'postgresql://AI-Interview_owner:nlh5RBzq7auH@ep-plain-wind-a10x6g2w.ap-southeast-1.aws.neon.tech/AI-Interview?sslmode=require'
  }
});