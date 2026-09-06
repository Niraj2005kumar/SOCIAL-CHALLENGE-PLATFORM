from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from services.category import classify_category
from services.priority import calculate_priority
from services.duplicate import add_challenge_to_index, check_duplicate
from services.university_matching import match_university
from services.severity import calculate_severity
from services.missing_details import check_missing_details
from services.spam_detection import check_spam
from services.team_suggestion import suggest_team
from services.scheme_matching import match_scheme
from services.emotion_detection import detect_emotion
from services.risk_prediction import predict_risk
from services.summary import get_challenge_summary
from models.llm_service import chatbot_reply, generate_impact_report

app = FastAPI(title="Societal Innovation Collaboration Portal - AI Service")


class ChallengeInput(BaseModel):
    id: str
    title: str
    description: str
    district: Optional[str] = None


class ChatInput(BaseModel):
    message: str
    history: Optional[str] = ""


class ImpactReportInput(BaseModel):
    title: str
    district: Optional[str] = None
    peopleAffected: Optional[str] = None
    solution: Optional[str] = None
    outcome: Optional[str] = None


@app.get("/")
def read_root():
    return {"message": "AI Service is running"}


@app.post("/analyze")
def analyze_challenge(challenge: ChallengeInput):
    text = f"{challenge.title} {challenge.description}"

    category = classify_category(text)
    priority = calculate_priority(text)
    duplicate_info = check_duplicate(text)
    university_matches = match_university(category)
    severity_info = calculate_severity(text)
    missing_info = check_missing_details(
        challenge.title,
        challenge.description,
        {"district": challenge.district}
    )
    spam_info = check_spam(
        challenge.title,
        challenge.description,
        {"district": challenge.district}
    )
    scheme_info = match_scheme(text)
    emotion_info = detect_emotion(text)
    risk_info = predict_risk(challenge.district, category)
    summary = get_challenge_summary(challenge.title, challenge.description)

    final_priority = priority
    if emotion_info["emotionLevel"] == "Panic/Emergency":
        final_priority = "Critical"

    team_info = None
    if university_matches:
        top_university = university_matches[0]
        team_info = suggest_team(category, top_university["matchedExpertise"])

    if not duplicate_info["isDuplicate"]:
        add_challenge_to_index(challenge.id, text)

    return {
        "category": category,
        "priority": final_priority,
        "summary": summary,
        "severity": severity_info,
        "duplicateCheck": duplicate_info,
        "universityMatches": university_matches,
        "missingDetails": missing_info,
        "spamCheck": spam_info,
        "schemeMatch": scheme_info,
        "emotionCheck": emotion_info,
        "riskPrediction": risk_info,
        "suggestedTeam": team_info
    }


@app.post("/chatbot")
def chat_with_bot(chat: ChatInput):
    reply = chatbot_reply(chat.message, chat.history)
    return {"reply": reply}


@app.post("/impact-report")
def create_impact_report(report_data: ImpactReportInput):
    report_text = generate_impact_report(report_data.dict())
    return {"impactReport": report_text}