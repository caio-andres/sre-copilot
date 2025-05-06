import os
import socket
from urllib.parse import urlparse
from openai import OpenAI
from requests.exceptions import RequestException


class GenAIClient:
    def __init__(self, api_key: str | None = None, model: str = "gpt-3.5-turbo"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY não definido no .env")

        # Inicializa o cliente OpenAI
        self.client = OpenAI(api_key=self.api_key)
        self.model = model

        # DNS check no host da API
        # 1) extrai string do base_url
        base_url_str = str(self.client._base_url)
        parsed = urlparse(base_url_str)
        host = parsed.hostname
        try:
            socket.gethostbyname(host)
        except socket.gaierror:
            raise RuntimeError(
                f"Falha ao resolver hostname '{host}'.\n"
                f"→ Verifique sua conexão de rede e se o host está acessível (ping/{host})."
            )

    def generate_suggestion(self, incident_description: str) -> str:
        prompt = (
            "Você é um assistente de SRE.\n"
            "Dada a descrição de um incidente, "
            "sugira ações corretivas em tópicos:\n\n"
            f"{incident_description}"
        )
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
                max_tokens=150,
            )
        except RequestException as e:
            raise RuntimeError(
                f"Erro ao chamar OpenAI API: {e}\n"
                "→ Verifique sua conexão e se a API key está correta."
            ) from e

        return response.choices[0].message.content.strip()
