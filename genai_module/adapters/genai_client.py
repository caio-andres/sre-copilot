import os
import requests


class GenAIClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.url = "https://api.gemini.example.com/v1/generate"

    def generate_suggestion(self, incident_description: str) -> str:
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "prompt": (
                f"Given the following incident description, "
                f"suggest corrective actions:\n\n{incident_description}"
            ),
            "max_tokens": 150,
        }
        resp = requests.post(self.url, json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json().get("choices", [{}])[0].get("text", "").strip()
