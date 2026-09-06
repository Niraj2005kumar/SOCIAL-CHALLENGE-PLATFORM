def calculate_severity(text: str) -> dict:
    text = text.lower()

    severity_score = 0

    high_impact_words = ["death", "died", "critical", "trapped", "collapsed", "destroyed"]
    medium_impact_words = ["flood", "disease", "block", "damage", "affected", "outbreak"]
    people_indicators = ["village", "families", "students", "children", "people"]

    for word in high_impact_words:
        if word in text:
            severity_score += 40

    for word in medium_impact_words:
        if word in text:
            severity_score += 20

    for word in people_indicators:
        if word in text:
            severity_score += 15

    severity_score = min(severity_score, 100)

    if severity_score >= 70:
        level = "Critical"
    elif severity_score >= 40:
        level = "High"
    elif severity_score >= 20:
        level = "Medium"
    else:
        level = "Low"

    return {
        "severityScore": severity_score,
        "severityLevel": level
    }