const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const AI_MODEL = process.env.AI_MODEL;

exports.processWithAI = async (products, query) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://openrouter.ai/api/v1/chat/completions",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content: `Clear input by deleting data that is not related to the product query '${query}' and summarize the description if it exists.`,
          },
          {
            role: "user",
            content: JSON.stringify(products),
          },
        ],
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    return "AI processing failed.";
  }
};
