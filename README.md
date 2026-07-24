# AegisIQ: Operational AI Fusion & Decision Support Platform for India

**AegisIQ** is an explainable AI decision-support platform designed specifically for public safety officers, police control rooms, and emergency response teams in **India** (covering Uttar Pradesh, Delhi NCR, Karnataka, Maharashtra, Tamil Nadu, Telangana).

The platform combines a **Cyber Command Center dark shell** for live operations (`/ops`, `/ops/queue`, `/ops/replay/[id]`, `/ops/simulator`, `/map`, `/hotspots`) with **Field Survey Ledger light surfaces** for documentation, offline mobile field entry (`/incidents/new`), case narratives (`/cases/[id]`), and executive reports (`/reports`).

---

## 🚀 Key Operational Features

### 1. 🤖 Explainable Live Ops Copilot (`/ops` & `CopilotCard`)
Signature operational narrative engine fusing multi-source signals (112 calls, CCTV metadata, sensor anomalies, case history, similar clusters, patrol unit status).
- Outputs plain-language summaries, predicted risk scores (0.00-1.00), confidence percentage bars, top risk drivers, uncertainty notes, and recommended next actions.
- **Human Review Gate:** Human-in-the-loop action buttons (`Approve & Dispatch`, `Request Verification`, `Escalate to Supervisor`).

### 2. 🎛️ Primary Command Fusion Console (`/ops`)
- **Top Bar:** Jurisdiction selector (`Uttar Pradesh`, `Delhi NCR`, `Karnataka`, `Maharashtra`), Shift Status (`Day Shift`), Latency (`182ms`), Ingestion Health (`Healthy`), Global Search (`/search`), and Emergency Mode switch.
- **Left 60% Canvas:** MapLibre GL tile map, patrol unit pins (`UP-32-PCR-124`), police station markers, incident clusters, risk contour rings, and district risk leaderboard.
- **Right 40% Operational Stack:** Priority Alert Queue, Explainable Live Ops Copilot, and Live Telemetry stream cards.
- **Bottom Operational Strip:** Incident Timeline, Patrol Unit Status, Evidence & Audit Trail (`Hash: 9c7f...a2b1`, Chain Verified), and Case Workspace launcher.

### 3. 🚨 Unified Command Triage Queue (`/ops/queue`)
Multi-channel intake (112 Emergency Calls, CCTV triggers, ALPR hits, Watchlist matches, Community reports) with SLA countdown timers, priority severity badges (`CRITICAL`, `HIGH`, `MEDIUM`), beat locations, and deduplication.

### 4. 🔍 Confidence + Provenance Ledger ("Why am I seeing this?") (`ProvenanceDrawer`)
Interactive drawer displaying evidence chips, timestamps, source reliability ratings, corroboration counts, contradiction flags, and label classifications (`OBSERVED`, `INFERRED`, `PREDICTED`).

### 5. 🎬 Incident Storyline & Replay Player (`/ops/replay/[id]`)
Interactive temporal narrative player with playback scrubber (Play, Pause, Reset, Step Slider) animating 112 calls, CCTV detection timestamps, and patrol unit dispatch movement.

### 6. 📊 Patrol Coverage & "What-If" Deployment Simulator (`/ops/simulator`)
Side-by-side situational planner comparing **Current Deployment State** vs **Proposed Simulated State**, calculating response-time deltas (`-1.8 min`) and coverage gap reduction (`89%`).

### 7. 🌐 Cross-System Entity Resolution & Link Graph (`/search` & `/entities/[id]`)
- Global Search across case IDs, phone numbers, vehicle plates, suspect aliases, and station limits.
- Neo4j-backed 1-hop and 2-hop entity relationship graph visualizer with analyst-verified vs machine-suggested link toggles.

### 8. 🛡️ Model Governance & AI Health Console (`/admin/models` & `/admin/data-quality`)
Traffic-light health cards monitoring model latency (p95 `182ms`), false-alert rate (`4.2%`), analyst override rate (`8.6%`), regional drift (`0.02`), and ingest pipeline status.

### 9. 📱 Field Survey Ledger Mobile Companion (`/incidents/new`)
Field Survey Ledger light aesthetic for field officers with offline queueing (`LOCAL_QUEUE_READY`), auto GPS location capture (`26.8467, 80.9462`), photo/audio evidence upload, dictated notes, and SHA-256 attachment hashing.

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
