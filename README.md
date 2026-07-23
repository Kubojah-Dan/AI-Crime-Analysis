# AegisIQ: AI-Powered Public Safety Intelligence & Decision Support Platform

**AegisIQ** is a production-grade, human-in-the-loop crime intelligence platform designed specifically for public safety officers, police control rooms, and emergency response teams in **India**.

The platform implements the **Field Survey Ledger** visual aesthetic (paper-cream surface `#E7E5DC`, ink-navy typography, hairline borders, and ink-stamped data provenance marks).

---

## 🌟 Key Components

- **`AegisIQ/client`**: Next.js 15 App Router frontend client (`npm run dev`).
- **`AegisIQ/server`**: Python FastAPI microservice (`python main.py` or `uvicorn main:app`).
- **`AegisIQ/functions`**: Zoho Catalyst serverless FaaS handlers (`ingest_ncrb_data`, `score_hotspots`, etc.).
- **`AegisIQ/datastore-schema`**: Relational Data Store schema definitions.
- **`AegisIQ/docs`**: Architecture specifications and fairness/bias checklists.

---

## 🚀 Quick Start (Local Setup)

### 1. Running the Next.js Frontend
```powershell
cd AegisIQ/client
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 2. Running the Python Server (Optional Microservice)
```powershell
cd AegisIQ/server
pip install -r requirements.txt
python main.py
```
API docs available at **`http://localhost:8000/docs`**.

---

## ☁️ Deployment

- **Frontend Hosting:** Zoho Catalyst Slate / AppSail
- **Backend APIs:** Catalyst Functions (Python 3.11)
- **Data Store:** Catalyst Data Store
- **File Storage:** Catalyst Stratus

---

## 🔒 Ethics & Positioning
AegisIQ is a **decision-support platform**, not an autonomous policing system. It ranks geographical sectors and time windows to assist tactical resource allocation. Every AI output requires human-in-the-loop analyst review before actioning.
