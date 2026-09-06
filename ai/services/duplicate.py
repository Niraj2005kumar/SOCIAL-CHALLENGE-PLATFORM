from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')


challenge_texts = []
challenge_ids = []
index = faiss.IndexFlatL2(384) 


def add_challenge_to_index(challenge_id: str, text: str):
    embedding = model.encode([text])
    index.add(np.array(embedding).astype('float32'))
    challenge_texts.append(text)
    challenge_ids.append(challenge_id)


def check_duplicate(text: str, threshold: float = 0.75):
    if index.ntotal == 0:
        return {"isDuplicate": False, "matches": []}

    embedding = model.encode([text])
    k = min(3, index.ntotal)
    distances, indices = index.search(np.array(embedding).astype('float32'), k)

    matches = []
    for dist, idx in zip(distances[0], indices[0]):
        similarity = 1 / (1 + dist)  
        if similarity >= threshold:
            matches.append({
                "challengeId": challenge_ids[idx],
                "similarText": challenge_texts[idx],
                "similarity": round(float(similarity), 2)
            })

    return {
        "isDuplicate": len(matches) > 0,
        "matches": matches
    }