const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.processWithAI = async (products) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Summarize the scraped eBay product listings and categorize them based on price range.",
        },
        {
          role: "user",
          content: JSON.stringify(products),
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "AI processing failed.";
  }
};
