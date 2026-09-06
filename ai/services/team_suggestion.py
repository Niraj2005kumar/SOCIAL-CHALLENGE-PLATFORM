EXPERTISE_TO_ROLE = {
    "Civil Engineering": "Structure/Construction Design",
    "Water Resources": "Water Flow & Management Study",
    "Disaster Management": "Risk Assessment & Emergency Planning",
    "Agriculture": "Field Research & Crop Analysis",
    "Entomology": "Pest/Insect Study & Lab Testing",
    "Biotechnology": "Bio-solution Development",
    "Healthcare": "Health Impact Survey",
    "Public Health": "Community Health Assessment",
    "Environmental Science": "Environmental Impact Study",
    "Computer Science": "App/Software Development",
}


def suggest_team(category: str, university_expertise: list) -> dict:
    team = []

    for expertise in university_expertise:
        role = EXPERTISE_TO_ROLE.get(expertise, "General Research Support")
        team.append({
            "subject": expertise,
            "role": role,
            "suggestedCount": 1
        })


    team.append({
        "subject": "Faculty Mentor",
        "role": "Team Guidance & Milestone Review",
        "suggestedCount": 1
    })

    estimated_size = len(team)

    return {
        "suggestedTeam": team,
        "estimatedTeamSize": estimated_size,
        "estimatedDuration": "6-8 weeks" if estimated_size <= 3 else "8-12 weeks"
    }