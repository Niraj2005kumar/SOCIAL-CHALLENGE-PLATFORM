def check_missing_details(title: str, description: str, location: dict = None) -> dict:
    missing = []

    if not title or len(title.strip()) < 5:
        missing.append("Title is too short or missing")

    if not description or len(description.strip()) < 15:
        missing.append("Description needs more detail")

    if not location or not location.get("district"):
        missing.append("District/location is missing")

    if not any(char.isdigit() for char in description) and "people" not in description.lower() and "affected" not in description.lower():
        missing.append("Consider adding how many people/area affected")

    return {
        "isComplete": len(missing) == 0,
        "missingFields": missing
    }