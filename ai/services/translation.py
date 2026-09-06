from models.llm_service import model


def translate_to_english(text: str) -> dict:
    prompt = f"""Detect the language of this text and translate it to English if it's not already in English.
Reply in this exact format:
Language: <detected language>
Translation: <English translation>

Text: {text}"""

    try:
        response = model.generate_content(prompt)
        result_text = response.text.strip()

        language = "English"
        translation = text

        for line in result_text.split("\n"):
            if line.startswith("Language:"):
                language = line.replace("Language:", "").strip()
            elif line.startswith("Translation:"):
                translation = line.replace("Translation:", "").strip()

        return {
            "detectedLanguage": language,
            "translatedText": translation,
            "originalText": text
        }
    except Exception as e:
        print(f"ERROR in translate_to_english: {e}")
        return {
            "detectedLanguage": "Unknown",
            "translatedText": text,
            "originalText": text
        }