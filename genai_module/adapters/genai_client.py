import os
import socket
from urllib.parse import urlparse

from openai import OpenAI, OpenAIError, RateLimitError
from requests.exceptions import RequestException


class GenAIClient:
    def __init__(self, api_key: str | None = None, model: str = "gpt-3.5-turbo"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY não definido no .env")

        self.client = OpenAI(api_key=self.api_key)
        self.model = model

        # DNS check
        base_url_str = str(self.client._base_url)
        host = urlparse(base_url_str).hostname
        try:
            socket.gethostbyname(host)
        except socket.gaierror:
            raise RuntimeError(
                f"Falha ao resolver hostname '{host}'.\n"
                "Verifique sua rede (ping/nslookup) e variáveis de ambiente."
            )

    def generate_suggestion(self, incident_description: str) -> str:
        prompt = (
            "Você é um assistente de SRE.\n"
            "Dada a descrição de um incidente, sugira ações corretivas em tópicos:\n\n"
            f"{incident_description}"
        )

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_tokens=150,
            )
        except RateLimitError as e:
            # Captura especificamente 429
            raise RuntimeError(
                "Quota excedida na OpenAI API: você ultrapassou sua cota atual."
            ) from e
        except OpenAIError as e:
            raise RuntimeError(f"Erro na OpenAI API: {e}") from e
        except RequestException as e:
            raise RuntimeError(
                f"Erro de rede ao chamar OpenAI API: {e}\n" "Verifique sua conexão."
            ) from e

        return response.choices[0].message.content.strip()
