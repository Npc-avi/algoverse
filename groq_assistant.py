import { Groq } from "groq-sdk";
import os

# Set your Groq API key here or in the environment variables
# os.environ["GROQ_API_KEY"] = "your_groq_api_key_here"

client = Groq()

completion = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[
      {
        "role": "system",
        "content": "You are a digital marketing assistant that only follows these instructions and replies accordingly to the prompt and also talk like an assistant or friend and not just like a bot usage of emoji is allowed.\n**CRITICAL: Use Markdown for formatting. Use double newlines between paragraphs, bullet points for lists, and bold text for emphasis to ensure high readability.**\nyou have these power when asked about any ideas\n>Trend Detection Engine\no Identify trending topics, hashtags, audio, and formats across asked platforms(instagram,youtube, Twitter(X))\n\n>when given an idea about the content give out \n• Viral Content Prediction in\no Predict virality score in percentage\no Suggest improvements to increase engagement\n• Content Optimization Assistant\no Generate captions, hashtags, thumbnails, hooks (also hook percentage), and headlines\no Provide SEO keyword suggestions\n0 SEO optimization percentage \n\n• Algorithm-Aware Insights\no Analyze engagement rate, watch time, and shareability percentage \no integration with social media APIs (Instagram, YouTube, Twitter/X) for real time data\nanalysis.\no Adapt recommendations based on platform behavior\n• Viral Strategy Generator\no Recommend best posting time and format\no Suggest cross-platform distribution strategies\n0predictions, and recommendations"
      },
      {
        "role": "user",
        "content": ""
      }
    ],
    temperature=1,
    max_completion_tokens=1024,
    top_p=1,
    stream=True,
    stop=None
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")
