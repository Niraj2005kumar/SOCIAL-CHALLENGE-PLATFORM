def check_spam(title: str, description: str, location: dict = None) -> dict:
    text = f"{title} {description}".lower()
    red_flags = []
    spam_score = 0

    # Check 1: Bahut chhota text (genuine complaint itni chhoti nahi hoti)
    if len(description.strip()) < 10:
        red_flags.append("Description too short to be genuine")
        spam_score += 30

    # Check 2: Repeated characters (jaise "aaaaaaa" ya "!!!!!!!!")
    if any(char * 5 in text for char in "abcdefghijklmnopqrstuvwxyz"):
        red_flags.append("Contains suspicious repeated characters")
        spam_score += 25

    # Check 3: No location given
    if not location or not location.get("district"):
        red_flags.append("No location provided")
        spam_score += 15

    # Check 4: Common spam/test words
    spam_words = ["test", "testing", "asdf", "xxxx", "dummy", "sample"]
    for word in spam_words:
        if word in text:
            red_flags.append(f"Contains suspicious test word: '{word}'")
            spam_score += 40

    # Check 5: All caps (shouting, sometimes spam)
    if title.isupper() and len(title) > 5:
        red_flags.append("Title is all uppercase")
        spam_score += 10

    spam_score = min(spam_score, 100)

    if spam_score >= 50:
        status = "Likely Spam - Needs Review"
    elif spam_score >= 25:
        status = "Suspicious - Verify Before Processing"
    else:
        status = "Looks Genuine"

    return {
        "spamScore": spam_score,
        "status": status,
        "redFlags": red_flags
    }