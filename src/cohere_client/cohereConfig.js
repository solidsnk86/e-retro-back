import { CohereClientV2 } from "cohere-ai";

if (!process.env.NODE_ENV === "production") {
  process.loadEnvFile(".env");
}

export const cohere = new CohereClientV2({
  token: process.env.COHERE_TRIAL_APIKEY,
});
