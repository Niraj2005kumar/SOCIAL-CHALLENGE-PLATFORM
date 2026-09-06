from models.llm_service import generate_summary


def get_challenge_summary(title: str, description: str) -> str:
    return generate_summary(title, description)