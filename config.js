const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

/** OpenAI config */
if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

module.exports = { openai };