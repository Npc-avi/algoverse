import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured." });
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

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
    });

    res.json({ content: completion.choices[0].message.content });
  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Failed to get response from Groq assistant" });
  }
}