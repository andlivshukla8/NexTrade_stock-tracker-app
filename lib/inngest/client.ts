import { Inngest} from "inngest";

const aiConfig = process.env.GEMINI_API_KEY
  ? { gemini: { apiKey: process.env.GEMINI_API_KEY as string } }
  : undefined;

export const inngest = new Inngest({
    id: 'NexTrade',
    ai: aiConfig
})