# AegisIQ Ethics, Fairness & Bias Checklist

## Ethics & Trust Principles

- [x] **No Personal Profiling:** The platform contains zero individual profiling models. Risk scores apply strictly to geographic sectors and temporal windows.
- [x] **Human Review Gate:** No patrol dispatch or alert is actioned automatically. Final decisions require analyst sign-off.
- [x] **Block-Level Location Masking:** Residential addresses are masked at ingestion to block level (e.g. `400 BLOCK OF KEARNY ST`).
- [x] **Data Freshness & Provenance:** Every metric displays its origin and timestamp (`LIVE`, `VERIFIED`, `PERIODIC`).
- [x] **Underreporting Disclaimer:** Visible notices remind users that incident records reflect police reports, not ground-truth crime rates.
- [x] **Immutable Audit Trail:** All analyst queries, human gate decisions, and data exports are logged in the audit trail.
