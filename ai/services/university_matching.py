import json
import os

def load_universities():
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "universities.json")
    with open(file_path, "r") as f:
        return json.load(f)


CATEGORY_TO_EXPERTISE = {
    "Disaster Management": ["Civil Engineering", "Water Resources", "Disaster Management"],
    "Agriculture": ["Agriculture", "Entomology", "Biotechnology"],
    "Healthcare": ["Healthcare", "Public Health"],
    "Water Resources": ["Water Resources", "Environmental Science"],
    "Education": ["Computer Science", "Education"],
}


def match_university(category: str):
    universities = load_universities()
    required_expertise = CATEGORY_TO_EXPERTISE.get(category, [])

    scores = []
    for uni in universities:
        matched = set(uni["expertise"]) & set(required_expertise)
        score = len(matched) / len(required_expertise) if required_expertise else 0

        if score > 0:
            scores.append({
                "universityId": uni["id"],
                "name": uni["name"],
                "district": uni["district"],
                "matchScore": round(score * 100, 1),
                "matchedExpertise": list(matched)
            })

    scores.sort(key=lambda x: x["matchScore"], reverse=True)
    return scores[:3]  