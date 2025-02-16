import axios from "axios";
import { environment } from "../environment"; // ✅ Watsonx API Keys

const WATSONX_API_URL = `${environment.watsonx.serviceUrl}/v2/models/text-generate`;
const API_KEY = environment.watsonx.apiKey;

export const generateAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      WATSONX_API_URL,
      {
        prompt: prompt,  // 🔥 User Input 
        max_tokens: 150, // 🔥 Output Length
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data; // ✅ AI  Response Return
  } catch (error) {
    console.error("Watsonx API Error:", error);
    return null;
  }
};
