# Zoho Catalyst Deployment Guide for AegisIQ

This document provides instructions to deploy the AegisIQ platform to your Zoho Catalyst Cloud.

---

## 📋 Project Configuration Details
- **Project Name:** `AegisIQ`
- **Project ID:** `50097000000036001`
- **Region:** India (IN)

---

## 🚀 One-Time Console Enablement

Before running the CLI deployment command for the first time:
1. Open your [Zoho Catalyst Console](https://console.catalyst.zoho.com/).
2. Select project **`AegisIQ`** (`50097000000036001`).
3. Click on **`Slate`** in the left sidebar menu (under Hosting) to enable the Slate service for your project.

---

## 🚀 Step-by-Step Deployment Commands

### 1. Link Project (Run inside `AegisIQ`)
```powershell
cd C:\Users\USER\Downloads\AI-Crime-Analysis\AegisIQ
npx catalyst project:use 50097000000036001
```

### 2. Deploy Web App to Catalyst Slate
```powershell
npx catalyst deploy slate -m "Deploying AegisIQ Web Client"
```
