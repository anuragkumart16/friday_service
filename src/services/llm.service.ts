import { ChatGroq } from "@langchain/groq";
import { groqConfig } from "../config/envConfig";

const model = new ChatGroq({
  apiKey: groqConfig.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});

export default model