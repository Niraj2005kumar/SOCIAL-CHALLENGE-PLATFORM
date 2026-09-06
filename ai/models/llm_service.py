import google.generativeai as genai
import os
import re
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-3.6-flash")


def clean_markdown(text: str) -> str:
    """Markdown symbols hata kar plain text banata hai"""
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # **bold** hatao
    text = re.sub(r'\*(.*?)\*', r'\1', text)        # *italic* hatao
    text = text.replace('\n\n', ' ').replace('\n', ' ')  # extra newlines hatao
    return text.strip()


def generate_summary(title: str, description: str) -> str:
    prompt = f"""Summarize this citizen complaint in exactly 1-2 short lines.
Be clear and factual, no markdown, no extra words, plain text only.

Title: {title}
Description: {description}

Summary:"""

    try:
        response = model.generate_content(prompt)
        return clean_markdown(response.text)
    except Exception as e:
        print(f"ERROR in generate_summary: {e}")
        return description[:100] + "..."


def chatbot_reply(user_message: str, conversation_history: str = "") -> str:
    prompt = f"""You are a helpful assistant guiding citizens of Jharkhand to submit their local problems
(like flood, education, water, healthcare issues) to a government platform.
Ask ONE clarifying question at a time if details are missing (location, affected people, description).
Keep replies short (2-3 sentences max) and friendly. Reply in the same language style the user used.
Do not use markdown formatting.

Previous conversation:
{conversation_history}

User: {user_message}
Assistant:"""

    try:
        response = model.generate_content(prompt)
        return clean_markdown(response.text)
    except Exception as e:
        print(f"ERROR in chatbot_reply: {e}")
        return "Sorry, main abhi jawab nahi de pa raha. Thodi der baad try karo."


def generate_impact_report(challenge_data: dict) -> str:
    prompt = f"""Generate a short professional impact report paragraph (3-4 sentences) based on this data.
Plain text only, no markdown, no headers, no bold text.

Problem: {challenge_data.get('title')}
Location: {challenge_data.get('district')}
People Affected: {challenge_data.get('peopleAffected', 'Not specified')}
Solution Implemented: {challenge_data.get('solution', 'Not specified')}
Outcome: {challenge_data.get('outcome', 'Not specified')}

Impact Report:"""

    try:
        response = model.generate_content(prompt)
        return clean_markdown(response.text)
    except Exception as e:
        print(f"ERROR in generate_impact_report: {e}")
        return "Impact report could not be generated at this time."


def analyze_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    prompt = """Look at this image of a citizen-reported problem. Identify:
1. What type of issue is visible (flood, damaged road, garbage, crop damage, broken infrastructure, etc.)
2. A short 1-line description of what you see

Reply in this exact format:
IssueType: <type>
Description: <description>"""

    try:
        image_part = {
            "mime_type": mime_type,
            "data": image_bytes
        }
        response = model.generate_content([prompt, image_part])
        result_text = response.text.strip()

        issue_type = "Unknown"
        description = "Could not analyze image"

        for line in result_text.split("\n"):
            if line.startswith("IssueType:"):
                issue_type = line.replace("IssueType:", "").strip()
            elif line.startswith("Description:"):
                description = line.replace("Description:", "").strip()

        return {
            "issueType": issue_type,
            "description": description,
            "analyzed": True
        }
    except Exception as e:
        print(f"ERROR in analyze_image: {e}")
        return {
            "issueType": "Unknown",
            "description": "Image analysis failed",
            "analyzed": False
        }