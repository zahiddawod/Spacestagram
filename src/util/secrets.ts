import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
  console.debug("[NODE] Using .env file to supply config environment variables");
  dotenv.config({ path: ".env" });
} else {
  console.debug("[WARNING] .env file not found");
}

export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const __prod__ = ENVIRONMENT === "production";
export const NASA_API = process.env.NASA_API || null;
