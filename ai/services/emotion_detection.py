def detect_emotion(text: str) -> dict:
    original_text = text
    text = text.lower()

    panic_words = [
        "emergency", "urgent", "critical", "help", "bachao", "danger",
        "trapped", "dying", "death", "immediately", "asap", "life threatening"
    ]

    panic_score = 0
    detected_signals = []

    # Check 1: Panic keywords
    for word in panic_words:
        if word in text:
            panic_score += 20
            detected_signals.append(f"Panic keyword: '{word}'")

    # Check 2: Excessive exclamation marks
    exclamation_count = original_text.count("!")
    if exclamation_count >= 3:
        panic_score += 20
        detected_signals.append("Multiple exclamation marks")

    # Check 3: ALL CAPS text (shouting)
    words = original_text.split()
    caps_words = [w for w in words if w.isupper() and len(w) > 2]
    if len(caps_words) >= 2:
        panic_score += 15
        detected_signals.append("Multiple all-caps words")

    panic_score = min(panic_score, 100)

    if panic_score >= 50:
        emotion_level = "Panic/Emergency"
    elif panic_score >= 25:
        emotion_level = "Worried"
    else:
        emotion_level = "Calm"

    return {
        "emotionLevel": emotion_level,
        "panicScore": panic_score,
        "signals": detected_signals
    }