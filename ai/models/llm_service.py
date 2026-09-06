import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"DEBUG: API Key loaded: {api_key[:10] if api_key else 'NONE'}...")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-3.6-flash")


def generate_summary(title: str, description: str) -> str:
    prompt = f"""Summarize this citizen complaint in exactly 1-2 short lines.
Be clear and factual, no extra words.

Title: {title}
Description: {description}

Summary:"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"DEBUG ERROR in generate_summary: {e}")
        return description[:100] + "..."


def chatbot_reply(user_message: str, conversation_history: str = "") -> str:
    prompt = f"""You are a helpful assistant guiding citizens of Jharkhand to submit their local problems.
Keep replies short and friendly.

User: {user_message}
Assistant:"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"DEBUG ERROR in chatbot_reply: {e}")
        return "Sorry, main abhi jawab nahi de pa raha."


def generate_impact_report(challenge_data: dict) -> str:
    prompt = f"""Generate a short professional impact report paragraph (3-4 sentences) based on this data:

Problem: {challenge_data.get('title')}
Location: {challenge_data.get('district')}
People Affected: {challenge_data.get('peopleAffected', 'Not specified')}
Solution Implemented: {challenge_data.get('solution', 'Not specified')}
Outcome: {challenge_data.get('outcome', 'Not specified')}

Impact Report:"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"DEBUG ERROR in generate_impact_report: {e}")
        return "Impact report could not be generated at this time."