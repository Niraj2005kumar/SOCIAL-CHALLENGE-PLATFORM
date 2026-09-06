def calculate_priority(text: str) -> str:
    text = text.lower()

    critical_keywords = ["emergency", "critical", "urgent", "death", "trapped", "danger"]
    high_keywords = ["flood", "disease", "school", "block", "affected"]

    for word in critical_keywords:
        if word in text:
            return "Critical"

    for word in high_keywords:
        if word in text:
            return "High"

    return "Medium"