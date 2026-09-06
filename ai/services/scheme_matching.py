import json
import os

def load_schemes():
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "schemes.json")
    with open(file_path, "r") as f:
        return json.load(f)


def match_scheme(text: str) -> dict:
    text = text.lower()
    schemes = load_schemes()

    matches = []
    for scheme in schemes:
        for keyword in scheme["keywords"]:
            if keyword in text:
                matches.append({
                    "schemeName": scheme["scheme"],
                    "category": scheme["category"]
                })
                break

    return {
        "hasExistingScheme": len(matches) > 0,
        "matchedSchemes": matches
    }