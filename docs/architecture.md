# AegisIQ Architecture & System Overview

## System Context & Core Principles
**AegisIQ** is an AI-powered public safety intelligence & decision support platform specifically tailored for public safety agencies, crime analysts, and emergency response teams across **India**.

### Key Principles
1. **Decision Support, Not Autonomous Policing:** Outputs rank spatial sectors and 24-hour time windows to assist tactical resource allocation. No individual profiling or automated enforcement is permitted.
2. **Data Provenance Tiers:** Every number, chart, and alert carries a visible provenance badge (`LIVE`, `VERIFIED`, `PERIODIC`).
3. **Human Review Gate:** Mandatory analyst confirmation step before any alert is marked as actioned or dispatched.
4. **Field Survey Ledger Aesthetic:** Styled after paper-and-ink field ledgers (Paper surface `#E7E5DC`, Ink navy text, thin hairline borders, stamp badges).

---

## Infrastructure & Technology Mapping

| Layer | Component / Service | Role |
|---|---|---|
| **Frontend Client** | Next.js 15 + React 19 + Tailwind CSS | Hosted via Zoho Catalyst Slate / AppSail |
| **Backend Services** | Catalyst Functions (Python 3.11) | Data Ingestion, Hotspot Scoring, Shift Briefs |
| **Data Store** | Catalyst Data Store (Relational) | Structured Incident Records, Hotspot Scores, Cases, Audit Trail |
| **File Storage** | Catalyst Stratus | Exported PDF Briefs, CSV Matrix Files |
| **Event Bus** | Catalyst Signals & SSE Relay | Real-time event propagation to connected UI clients |
| **Job Scheduler** | Catalyst Job Scheduling | Scheduled Tier 1–4 API Ingestion Tasks |
| **AI / Machine Learning**| QuickML | Time-Series Forecasting (ARIMA/Prophet) & Anomaly Detection |

---

## Data Provenance Tiers (India Focus)

- **Tier 1 (Live Dispatch):** Real-time 112 emergency call dispatch logs (Delhi, Mumbai, Bangalore).
- **Tier 2 (Verified Daily):** NCRB & City Police official daily crime reports (data.gov.in).
- **Tier 3 (Verified Biweekly):** State FIR Bulletins & NIBRS Offense Datasets.
- **Tier 4 (Periodic Sync):** National benchmark trend comparisons (NCRB / Bureau of Police Research & Development).
