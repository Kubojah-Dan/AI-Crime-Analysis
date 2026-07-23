# Zoho Catalyst Deployment Guide for AegisIQ

This document provides instructions to deploy the AegisIQ platform to your Zoho Catalyst Cloud.

---

## 📋 Project Configuration Details
- **Project Name:** `AegisIQ`
- **Project ID:** `50097000000036001`
- **Region:** India (IN)

---

## 🚀 Step-by-Step Deployment Instructions

### 1. Install & Login to Catalyst CLI
If you haven't already, install the Catalyst CLI tools globally via npm and login:
```bash
npm install -g zcatalyst-cli
npx catalyst login
```

---

### 2. Verify Your Project Association
Verify that your local setup is linked to your active Project ID:
```bash
cd AegisIQ
npx catalyst project:use 50097000000036001
```

---

### 3. Deploy the Next.js Frontend Web Client
Deploy the web client directly using the `--only client` flag:
```bash
npx catalyst deploy --only client
```

---

### 4. Configure Environmental Variables in Zoho Catalyst Console
Access your [Zoho Catalyst Console](https://console.catalyst.zoho.com/) and declare these settings inside your project configuration:
- `DATA_GOV_IN_API_KEY`
- `OPENWEATHER_API_KEY`
- `GROQ_API_KEY`
- `REDIS_PASSWORD`
- `NEO4J_PASSWORD`
