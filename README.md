# Idle Finance Backend API

This backend powers the **Idle Finance MVP**:

- ✅ Node deployment & lifecycle management
- ✅ DUVI scoring for hardware health
- ✅ IdleMetaVault contract integration
- ✅ Centralized logging & error handling
- ✅ Fully documented API with Swagger

---

## Tech Stack

- **NestJS** (Framework)
- **TypeORM** + SQLite (Storage)
- **Ethers.js** (Blockchain)
- **Swagger** (API Docs)
- **[Multipass](https://canonical.com/multipass/install)** (VM management)
- **Global error handling & logging**

---

## Setup Instructions

### Requirements

- Node.js
- npm
- [Multipass](https://canonical.com/multipass/install)
<!-- - run automation server (refer to [automation documentation](https://github.com/NigSca221/idle-finance/blob/dev/automation/mock-node/README.md) to set it up and add base url as AUTOMATION_BASE_URL in .env) -->

### Install & Run

```bash
git clone https://github.com/NigSca221/idle-finance.git
cd backend
npm install
npm run start:dev
```

Visit Swagger docs:

```
http://localhost:9871/api/v1/docs
```

---

## Environment Variables

See `.env.example` in the project backend root. Copy and rename it to `.env` and fill in your credentials:

```env
PORT=
NODE_ENV=
RPC_URL=
RPC_URL_ETH=
AUTOMATION_BASE_URL=
DB_HOST=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRATION=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRATION=
```

---

## Error Handling

All errors follow a standard format:

```json
{
  "success": false,
  "statusCode": 500,
  "timestamp": "2025-07-15T12:34:56.789Z",
  "path": "/api/deploy-node",
  "message": "Failed to deploy node"
}
```

---

## Useful Commands

| Command              | Description               |
| -------------------- | ------------------------- |
| npm run start        | Start server              |
| npm run start\:dev   | Start server in dev mode  |
| npm run start\:prod  | Start server in prod mode |
| npm run build        | Build production files    |
| npm run cleanup:data | Cleanup test data         |

---

## API Docs (Swagger)

Visit:

```
http://localhost:9871/api/v1/docs
```

---
