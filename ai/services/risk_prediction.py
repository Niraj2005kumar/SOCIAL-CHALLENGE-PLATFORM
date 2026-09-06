import json
import os

def load_risk_history():
    file_path = os.path.join(os.path.dirname(__file__), "..", "data", "risk_history.json")
    with open(file_path, "r") as f:
        return json.load(f)


def predict_risk(district: str, category: str) -> dict:
    if not district:
        return {
            "riskAvailable": False,
            "message": "District not provided, cannot predict risk"
        }

    history = load_risk_history()

    for record in history:
        if record["district"].lower() == district.lower() and record["category"] == category:
            frequency = record["floodCount"] / record["yearsTracked"]
            risk_percentage = min(round(frequency * 100), 100)

            if risk_percentage >= 70:
                risk_level = "High Risk"
            elif risk_percentage >= 40:
                risk_level = "Moderate Risk"
            else:
                risk_level = "Low Risk"

            return {
                "riskAvailable": True,
                "district": district,
                "category": category,
                "riskPercentage": risk_percentage,
                "riskLevel": risk_level,
                "basedOn": f"{record['floodCount']} incidents in last {record['yearsTracked']} years"
            }

    return {
        "riskAvailable": False,
        "message": "No historical data available for this district/category combination"
    }