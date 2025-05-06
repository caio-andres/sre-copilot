import os
import socket
import requests
from requests.exceptions import RequestException
from urllib3.exceptions import NewConnectionError


class GenAIClient:
    def __init__(self, api_key: str, api_url: str | None = None):
        self.api_key = api_key
        self.url = api_url or os.getenv("GEMINI_API_URL")
        if not self.url:
            raise ValueError("GEMINI_API_URL não configurado no ambiente.")

        hostname = self.url.split("://")[-1].split("/")[0]
        try:
            socket.gethostbyname(hostname)
        except socket.gaierror:
            raise RuntimeError(
                f"Falha ao resolver hostname '{hostname}'.\n"
                "→ Verifique se GEMINI_API_URL está correto no seu .env\n"
                "→ Teste: ping {hostname} ou nslookup {hostname}"
            )

    def generate_suggestion(self, incident_description: str) -> str:
        headers = {"Authorization": f"Bearer {self.api_key}"}
        payload = {
            "prompt": (
                f"Given the following incident description, "
                f"suggest corrective actions:\n\n{incident_description}"
            ),
            "max_tokens": 150,
        }
        try:
            resp = requests.post(self.url, json=payload, headers=headers, timeout=10)
            resp.raise_for_status()
        except (RequestException, NewConnectionError) as e:
            raise RuntimeError(
                f"Erro ao chamar GenAI API em '{self.url}': {e}\n"
                "→ Verifique sua conexão de rede e se a URL está acessível."
            ) from e

        # Extrai texto da resposta
        return resp.json().get("choices", [{}])[0].get("text", "").strip()
