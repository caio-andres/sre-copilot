# SRE Copilot

**Monitoração inteligente com KPIs e IA**  

---

## Visão Geral

O SRE Copilot é uma aplicação full‑stack para monitoramento de infraestrutura, composta por:
- **Data Ingestion**: coleta incidentes do ServiceNow e armazena no PostgreSQL.  
- **Data Processing**: calcula métricas (ex.: MTTR, número de incidentes).  
- **GenAI Module**: gera recomendações automáticas com OpenAI baseado nos incidentes.  
- **Analytics Dashboard**: front‑end Next.js que consome as APIs e exibe KPIs, incidentes e recomendações.

> 🛠 Tecnologias principais: Python 3.12, FastAPI, SQLAlchemy, PostgreSQL, Docker, Next.js, Tailwind CSS, AWS (VPC, RDS, EC2, S3 backend Terraform).

---

## Estrutura de Diretórios

```
sre-copilot-src/
├─ .env.example
├─ docker-compose.yml
├─ database/             ← init.sql do Postgres
├─ data_ingestion/       ← coleta do ServiceNow (main.py, Dockerfile)
├─ data_processing/      ← cálculo de métricas (main.py, Dockerfile)
├─ genai_module/         ← geração de recomendações (main.py, Dockerfile)
└─ analytics_dashboard/  ← Next.js app (Dockerfile, app/, components/, etc.)
```

---

## Pré‑requisitos

1. **Docker & Docker Compose** instalados.  
2. Copiar `.env.example` → `.env` e preencher:

```ini
# ServiceNow
SERVICENOW_BASE_URL=https://devXXXX.service-now.com
SERVICENOW_USER=seu_user
SERVICENOW_PASS=sua_senha

# Banco de Dados (para Docker Compose, apontar para o serviço “db”)
DB_HOST=db
DB_PORT=5432
DB_NAME=sre_copilot
DB_USER=postgres
DB_PASS=postgres

# OpenAI
OPENAI_API_KEY=sk-...

# Front‑end
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Como Rodar o Projeto

No diretório raiz (`sre-copilot-src/`):

```bash
# 1. Parar e limpar volumes (opcional)
docker-compose down -v

# 2. Buildar e subir todos os serviços
docker-compose up -d --build

# 3. Acompanhar logs (opcional)
docker-compose logs -f ingestion processing genai dashboard
```

- Acesse o dashboard em **http://localhost:3000**.  
- APIs disponíveis em:  
  - `GET /api/incidents`  
  - `GET /api/metrics`  
  - `GET /api/recommendations`  

---

## Infraestrutura AWS (Terraform)

Usamos Terraform para orquestrar:

1. **VPC** com múltiplas AZs e subnets públicas/privadas.  
2. **Security Groups** liberando portas 22, 80 e 5432.  
3. **RDS PostgreSQL** privado em subnets privadas.  
4. **S3 Backend** para o state remoto do Terraform.

> Para provisionar, configure suas credenciais AWS e execute em `infrastructure/`:
> ```bash
> terraform init
> terraform plan -var-file=terraform.tfvars
> terraform apply -var-file=terraform.tfvars
> ```

---

## Eng. de Dados & Automação

- **Ingestion**: roda periodicamente (cron ou agendador externo) e puxa incidentes do ServiceNow.  
- **Processing**: calcula métricas e atualiza tabela `metrics` no Postgres.  
- **GenAI**: consome `incidents`, envia prompt ao OpenAI e grava em `recommendations`.  
- Orquestração local via Docker Compose; pode evoluir para Kubernetes/ECS.

---

## Como Funciona

1. **Ingestion** → ServiceNow → `incidents` (Postgres).  
2. **Processing** → lê `incidents` → calcula KPIs → grava em `metrics`.  
3. **GenAI** → lê `incidents` → OpenAI → grava em `recommendations`.  
4. **Front‑end** → consome as 3 APIs → renderiza em cards e listas.

---

## Troubleshooting Comum

- **ENOTFOUND DB**: verifique `DB_HOST=db` no `.env` e se o serviço `db` está levantado.  
- **Porta 3000 em uso**: ajuste `ports:` em `docker-compose.yml`.  
- **Build Next.js falhando**: garanta que as APIs estejam ativas ou rotas sejam dinâmicas.

---

## Features Futuras

- **CI/CD**  
  - GitHub Actions para:  
    - `terraform fmt` / `validate`  
    - `docker build` + push para registry  
    - Deploy automatizado em AWS ECS/EKS  
    - Testes unitários e de integração  

---

> _Desenvolvido com esforço por @caio-andres 😼_
