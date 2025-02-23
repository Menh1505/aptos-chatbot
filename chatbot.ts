import OpenAI from "openai";
var readlineSync = require("readline-sync");
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Lấy API key từ biến môi trường
});

async function chat() {
  console.log("🤖 Chatbot GPT - Type 'exit' to leave");

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit") {
      console.log("👋 Good bye!");
      break;
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Dùng model mới nhất
        messages: [{ role: "user", content: userInput }],
      });

      const botResponse =
        response.choices[0]?.message?.content?.trim() || "OpenAI not response!";
      console.log("Bot:", botResponse);
    } catch (error) {
      console.error("❌ Error when calling OpenAI API:", error);
    }
  }
}

chat();
