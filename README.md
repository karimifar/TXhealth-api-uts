# TXHealth API — Texas Health Data REST API

A Node.js REST API powering the Texas health data visualization projects. Provides county- and ZIP-level geographic and health system lookup data to front-end mapping applications.

## Overview

This API serves as the shared backend for several data visualization tools including the NAS dashboard, child maltreatment risk map, and Northeast Texas mortality viz. It exposes geographic reference tables — county centroids, ZIP-to-county mappings, and CPAN hub assignments — used to power interactive choropleth maps and county/ZIP search features.

## Data Models

| Model | Table | Description |
|-------|-------|-------------|
| `cnty_centroid` | county centroids | FIPS code, county name, centroid latitude/longitude |
| `CPAN_codes` | CPAN zip lookup | ZIP code → city, county, CPAN hub, and menu assignment |
| `zip_county` | ZIP-to-county | ZIP to county FIPS crosswalk |

## Tech Stack

- **Node.js** — runtime
- **Sequelize** — ORM for MySQL database access
- **MySQL** — relational database (`TXHealth` schema)

## Getting Started

### Prerequisites

- Node.js 14+
- MySQL 5.7+

### Setup

```bash
npm install
```

Update `config/config.json` with your local MySQL credentials (development block).

Create and seed the `TXHealth` database, then start the server:

```bash
node server.js
```

## Related Projects

This API is consumed by: [NAS](https://github.com/karimifar/NAS) · [maltreatment21](https://github.com/karimifar/maltreatment21) · [netx](https://github.com/karimifar/netx) · [texashealthmaps](https://github.com/karimifar/texashealthmaps)
