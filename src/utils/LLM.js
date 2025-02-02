const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = process.env.AI_MODEL;

const callAI = async (messages) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: AI_MODEL,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0]?.message?.content;
  } catch (error) {
    console.error("AI API Error:", error.response?.data || error.message);
    return false;
  }
};

const processDataWithAI = async (product) => {
  const prompt = `
    You are an AI assistant that processes eBay product data. Given the following product details, enhance and format them as follows:
    
    - Improve the product description to be more readable and concise.
    - Extract only the product ID from the provided eBay link.
    
    Input Data:
    ${JSON.stringify(product)}

    Respond strictly in JSON stringify format with the following fields:
    {
      "title": "<default title>",
      "price": "<default price>",
      "link": "<base url and product ID only>",
      "description": "<improved description or return '-' if data '-'>"
    }
  `;

  const messages = [{ role: "system", content: prompt }];

  const result = await callAI(messages);
  return result;
};

module.exports = { processDataWithAI };
