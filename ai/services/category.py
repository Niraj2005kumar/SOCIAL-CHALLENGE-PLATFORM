def classify_category(text: str) -> str:
    text = text.lower()

    categories = {
        "Disaster Management": ["flood", "landslide", "fire", "disaster", "rain", "waterlogging"],
        "Education": ["school", "student", "teacher", "education", "college"],
        "Agriculture": ["crop", "farmer", "pest", "fasal", "agriculture", "irrigation"],
        "Water Resources": ["water", "contamination", "drinking water", "well", "hand-pump"],
        "Healthcare": ["hospital", "health", "disease", "doctor", "medicine"],
    }

    for category, keywords in categories.items():
        for keyword in keywords:
            if keyword in text:
                return category

    return "Uncategorized"