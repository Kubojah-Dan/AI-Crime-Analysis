# AegisIQ: AI-Driven Public Safety Intelligence & Visualization Platform

**AegisIQ** is an explainable AI decision-support platform designed specifically for public safety officers, police control rooms, and emergency response teams in **India** (covering Karnataka, Delhi, Maharashtra, Tamil Nadu, Telangana, and Uttar Pradesh).

The platform combines **Field Survey Ledger** aesthetics in Light Mode with a **Cybersecurity Command Center** dark theme, complete with high-visibility animated cyber background tools and real-time telemetry streams.

---

## 🎛️ 12 Integrated Solution Modules

1. **Interactive Crime Heatmap (`/hotspots` & `/map`):** MapLibre GL vector tiles with interactive spatial pins across Indian states.
2. **District / Zone Comparison Matrix (`/analytics`):** Side-by-side comparison tool comparing incident counts, closure rates, and trends between states.
3. **Category & Severity Filters (`/incidents` & `/analytics`):** Filter by IPC sections (**IPC 379 Larceny, IPC 420 Cyber Fraud, IPC 354 Public Safety, IPC 380 Theft**).
4. **Daily / Weekly / Monthly Trends (`/analytics`):** Time-series controls with trend direction indicators (`+6.2%`, `-1.8%`).
5. **Hotspot Detection Engine (`/hotspots`):** Density-based concentric contour rings with centroid unit pins (`DL_UNIT_99 // TIER_1`).
6. **Anomaly & Spike Alerts (`/hotspots` & `/analytics`):** Real-time CCTV metadata feeds (`CAM-DEL-CP-04`) and sensor flow anomaly indicators.
7. **Similar-Incident Clustering (`/analytics` & `/cases`):** Spatial-temporal clustering engine (`#AQ-CLR-441`) with 96.4% match confidence score.
8. **AI Insights Panel (`/map` & `/analytics`):** Groq Llama 3 LLM natural language explainable summaries and probable cause inference.
9. **Case & Incident Drill-down (`/cases/[id]`):** Detailed case workspace with evidence lineage cards, CCTV metadata, and suspect graph links.
10. **Automated Report Export (`/reports`):** Stratus PDF export & Granular Performance Matrix CSV downloader buttons.
11. **RBAC & Audit Trail (`/admin/fairness`):** Security Level-5 role-based audit trail logging analyst actions, gate reviews, and system events.
12. **Fairness & Explainability (`/admin/fairness` & `/cases/[id]`):** **Human Review Gate** (`Flag for Patrol`, `Request Verification`, `Dismiss Anomaly`) and underreporting disclaimers.

---

## 🌟 Beyond MVP — 6 Capability Tracks

- **Track 01 Real-Time Streams:** CCTV metadata, sensor feeds & 112 emergency calls.
- **Track 02 Multi-Modal AI:** Text, image & audio/notes intelligence via Groq Llama 3 LLM.
- **Track 03 Mobile Companion:** Field entry form at `/incidents/new` for on-the-go officer updates.
- **Track 04 Network Graph:** Neo4j entity link analysis connecting cases, suspects, and police station limits.
- **Track 05 Fairness Gate v2:** Automated policy checks, auditability, and analyst review gates.
- **Track 06 Multi-State SaaS:** Multi-tenant deployment configured by state (Karnataka, Delhi, Maharashtra, Tamil Nadu).

---

## 🌟 Architecture & Directory Layout

- **`AegisIQ/client`**: Next.js 15 App Router frontend client (`npm run dev`).
- **`AegisIQ/server`**: Python FastAPI microservice (`python main.py` or `uvicorn main:app`).
- **`AegisIQ/functions`**: Zoho Catalyst serverless FaaS handlers.
- **`AegisIQ/datastore-schema`**: Relational Data Store schema definitions (`schema.json`).
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

### 2. Running the Python Server (FastAPI Engine)
```powershell
cd AegisIQ/server
pip install -r requirements.txt
python main.py
```
API docs available at **`http://localhost:8000/docs`**.

---

## ☁️ Zoho Catalyst Deployment

- **Frontend Hosting:** Zoho Catalyst Slate (`npx catalyst deploy slate`)
- **Backend APIs:** Catalyst AppSail (Python 3.11 / FastAPI)
- **Data Store:** Catalyst Data Store (`event_time`, `occurred_at`)
- **File Storage:** Catalyst Stratus (`aegisiq_evidence_vault`)

---

## 🔒 Ethics & Positioning
AegisIQ is a **decision-support platform**, not an autonomous policing system. Every AI output requires human-in-the-loop analyst review before actioning.
