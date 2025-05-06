import os
import socket
import requests
from requests.exceptions import RequestException
from urllib3.exceptions import NewConnectionError
from urllib.parse import urlparse


class GenAIClient:
    def __init__(
        self, api_key: str, base_url: str | None = None, model: str = "text-bison-001"
    ):
        self.api_key = api_key
        self.base_url = base_url or os.getenv("GEMINI_API_URL_BASE")
        self.model = model

        # validação
        if not self.base_url:
            raise ValueError("GEMINI_API_URL_BASE não configurado no .env")

        # DNS check
        host = urlparse(self.base_url).hostname
        try:
            socket.gethostbyname(host)
        except socket.gaierror:
            raise RuntimeError(
                f"Falha ao resolver hostname '{host}'.\n"
                "→ Verifique suas variáveis de ambiente.\n"
                f"→ Teste: ping {host} / nslookup {host}"
            )

    def generate_suggestion(self, incident_description: str) -> str:
        # usa o endpoint global sem /projects...
        path = f"{self.base_url}/models/{self.model}:generateText"
        url = f"{path}?key={self.api_key}"

        payload = {
            "prompt": {"text": incident_description},
            "temperature": 0.2,
            "maxOutputTokens": 150,
        }

        try:
            resp = requests.post(url, json=payload, timeout=10)
            resp.raise_for_status()
        except (RequestException, NewConnectionError) as e:
            raise RuntimeError(
                f"Erro ao chamar GenAI API em '{url}': {e}\n"
                "→ Verifique sua conexão e se o endpoint está acessível."
            ) from e

        return resp.json().get("candidates", [])[0].get("output", "").strip()
