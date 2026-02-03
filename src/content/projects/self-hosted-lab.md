---
title: "Self-Hosted Homelab & Data Infrastructure"
description: "Rebuilt a Dell OptiPlex into a production-grade virtualization server hosting PostgreSQL, MySQL, and Jupyter environments, saving >$800 in Capex."
date: "May 2025 – Present"
tags: ["Ubuntu Server", "Docker", "PostgreSQL", "MySQL", "Jupyter Lab", "Grafana", "Prometheus", "Tailscale"]
tracks: ["cloud", "dataengineer", "software-engineer"]
featured: true
---

## Overview
Engineered a comprehensive self-hosted infrastructure to simulate enterprise data environments and support R&D.

## Key Achievements
- **Hardware Renewal:** Rebuilt & upgraded a decommissioned Dell OptiPlex 9020 SFF (32 GB DDR3, dual 2 TB SSD ZFS mirror), extending hardware lifespan.
- **Orchestration:** Installed Ubuntu Server 22.04, orchestrated all services with Docker + docker-compose, enabling reproducible deployments and <1 min rollbacks.
- **Data Engineering:** Provisioned a multi-tenant PostgreSQL cluster (container-per-project) plus on-demand MySQL & Mongo sandboxes.
- **Analytics:** Deployed self-hosted Jupyter Lab/Notebooks for rapid experimentation, eliminating cloud notebook fees and enabling offline analysis.
- **Observability:** Implemented Prometheus + Grafana telemetry, cutting troubleshooting time by 60% through proactive dashboards and alerts.
- **Security:** Hardened the network with Tailscale mesh VPN and SSH key-only auth.
