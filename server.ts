import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for the Groq Digital Marketing Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing from environment variables");
      return res.status(500).json({ error: "GROQ_API_KEY is not configured on the server." });
    }

    const groq = new Groq({ apiKey });
    const { message, history } = req.body;

    const systemInstruction = `You are a digital content assistant that only follows these instructions and replies accordingly to the prompt and also talk like an assistant or friend and not just like a bot usage of emoji is allowed.
**CRITICAL: Use Markdown for formatting. Use double newlines between paragraphs, bullet points for lists, and bold text for emphasis to ensure high readability.**

you have these power when asked about any ideas
>Trend Detection Engine
o Identify trending topics, hashtags, audio, and formats across asked platforms(instagram,youtube, Twitter(X))

>when given an idea about the content give out 
• Viral Content Prediction:
o Predict virality score in percentage (Format: "Virality Score: XX%")
o Suggest improvements to increase engagement

• Content Optimization Assistant:
o Generate captions, hashtags, thumbnails, hooks, and headlines
o Hook Strength: Predict hook strength in percentage (Format: "Hook Strength: XX%")
o Provide SEO keyword suggestions
o SEO Optimization: Predict SEO optimization percentage (Format: "SEO Optimization: XX%")

• Algorithm-Aware Insights:
o Analyze engagement rate, watch time, and shareability
o Shareability: Predict shareability percentage (Format: "Shareability: XX%")
o integration with social media APIs (Instagram, YouTube, Twitter/X) for real time data analysis.
o Adapt recommendations based on platform behavior

• Viral Strategy Generator:
o Recommend best posting time and format
o Suggest cross-platform distribution strategies
o predictions, and recommendations

**IMPORTANT: You MUST always include the following scores in your response for EVERY content idea analysis. Use this EXACT format (including the colon and percentage):**
- Virality Score: [XX]%
- Hook Strength: [XX]%
- SEO Optimization: [XX]%
- Shareability: [XX]%

Replace [XX] with your predicted percentage (0-100). Do not use ranges like "80-90%", use a single number.`;

    const messages = [
      { role: "system", content: systemInstruction },
      ...history,
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages as any,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    res.json({ content: completion.choices[0].message.content });
  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Failed to get response from Groq assistant" });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    hasApiKey: !!process.env.GROQ_API_KEY,
    env: process.env.NODE_ENV 
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
