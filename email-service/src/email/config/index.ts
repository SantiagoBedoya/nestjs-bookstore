import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  CONSUMER_NAME: process.env.CONSUMER_NAME,
  CONSUMER_URL: process.env.CONSUMER_URL,
};
