import json
import os
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')


def load_solved_cases():
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "solved_cases.json")
    with open(file_path, "r") as f:
        return json.load(f)


def find_similar_solved_cases(text: str, threshold: float = 0.4):
    cases = load_solved_cases()
    if not cases:
        return {"hasSimilarCase": False, "matches": []}

    case_texts = [case["title"] for case in cases]

    text_embedding = model.encode(text, convert_to_tensor=True)
    case_embeddings = model.encode(case_texts, convert_to_tensor=True)

    similarities = util.cos_sim(text_embedding, case_embeddings)[0]

    matches = []
    for i, score in enumerate(similarities):
        if float(score) >= threshold:
            matches.append({
                "caseId": cases[i]["id"],
                "title": cases[i]["title"],
                "solution": cases[i]["solution"],
                "district": cases[i]["district"],
                "outcome": cases[i]["outcome"],
                "similarity": round(float(score), 2)
            })

    matches.sort(key=lambda x: x["similarity"], reverse=True)

    return {
        "hasSimilarCase": len(matches) > 0,
        "matches": matches[:2]  # top 2 matches
    }