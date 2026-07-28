---
title: "ODS-E — Open Data Schema for Energy"
layout: default
---

<div class="page-header">
  <h1>ODS-E — Open Data Schema for Energy</h1>
  <div class="version-badge">
    <span class="version-label">License</span>
    <span class="version-value">CC BY-SA 4.0 / Apache 2.0</span>
    <span class="version-separator">|</span>
    <span class="version-label">Docs</span>
    <a href="https://opendataschema.energy" class="version-value" target="_blank">opendataschema.energy →</a>
  </div>
</div>

<div class="quick-start-section">
  <a href="https://opendataschema.energy" class="quick-start-button" target="_blank">
    Visit Documentation Site
  </a>
  <a href="https://github.com/AsobaCloud/odse" class="quick-start-button" style="margin-top: 12px; display: inline-block; font-size: 0.95em;" target="_blank">
    View on GitHub
  </a>
</div>

## Overview

ODS-E (Open Data Schema for Energy) is an open specification for **interoperable energy asset data** across generation, consumption, and net metering. It ships with versioned schemas, vendor transforms, a Python reference runtime, and integration guides for inverters, industrial protocols, SCADA, and utility data portals.

> **ODS-E has its own dedicated documentation site at [opendataschema.energy](https://opendataschema.energy).** This page is a brief overview — for full documentation, schemas, and integration guides, visit the main site.

## What's Included

- **Versioned schemas** — `energy-timeseries.json`, `asset-metadata.json`
- **Vendor transforms** — Huawei, Eskom, and others
- **Python reference runtime** — including SCL, AMR, MQTT, and OPC-UA connectors
- **Integration guides** — inverter APIs, industrial protocols (MQTT, OPC-UA), SCADA (IEC 61850), utility data portals (Eskom)
- **Modeling & markets** — ComStock/ResStock integration, municipal emissions modeling, market context extensions (settlement, tariff, topology, wheeling, curtailment, BRP, certificates)

## Repository Map

| Repository | Contents |
|------------|----------|
| [AsobaCloud/odse](https://github.com/AsobaCloud/odse) | Specification, schemas, transforms, Python runtime, tools, demos |
| [AsobaCloud/odse-docs](https://github.com/AsobaCloud/odse-docs) | Documentation site source (published at opendataschema.energy) |

## License

- Specification, schemas, transforms: **CC BY-SA 4.0**
- Reference implementation and tools: **Apache 2.0**

---

Maintained by [Asoba Corporation](https://asoba.co).
