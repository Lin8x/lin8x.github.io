---
title: "Hybrid Homelab + AWS Edge Gateway"
description: "Designed and operated a hybrid hosting platform for a real-time multiplayer service, combining home lab compute with AWS edge ingress for security and reliability."
date: "2023 - Present"
tags: ["AWS", "EC2", "Ubuntu", "Proxmox", "Docker", "Python", "Cloudflare", "Networking"]
tracks: ["cloud", "software-engineer"]
image: "/images/projects/minecraft.jpeg"
featured: true
links:
  docs: ""
---

## Overview

Designed, deployed, and operated a hybrid hosting platform where the application backend ran in a home lab while AWS provided a secure, stable public ingress. The goal was to learn AWS fundamentals while protecting the origin environment from direct internet exposure and improving operational reliability.

**Peak Scale:** Supported up to **112 concurrent users**.

![MOTD](/images/projects/minecraft-server-motd.png)

![Image of Proxmox](/images/projects/minecraft-proxmox.png)

---

## Architecture

![Architecture Diagram](/images/projects/minecraft-architecture.png)

- **Backend workload (origin):** PaperMC application server running on an Ubuntu Linux VM (4 vCPU / 10 GB RAM) hosted on a Proxmox virtualization platform in a home lab.

- **Public ingress (edge):** AWS EC2 instance running Velocity (a TCP proxy/gateway) directly on the host OS.

- **Private connectivity:** EC2 connected to the home origin over Twingate (private tunnel/overlay network).

- **DNS + endpoint stability:** Cloudflare DNS with A + SRV records routed clients to the Elastic IP of the EC2 gateway. Used a non-default external port (25566) because 25565 was allocated to another service.

### Traffic Flow
```
Client → Cloudflare DNS → Elastic IP (EC2) → Velocity proxy → (Twingate tunnel) → Origin VM
```

---

## Security Model

**Threats addressed:** origin IP exposure, brute force attempts, malicious users, DDoS targeting home network, and general hardening.

### Cloud Perimeter (AWS)

- **Security Groups:** Inbound restricted to only what was needed:
  - Minecraft proxy port (public service)
  - SSH (port 22) restricted to home IP only

- **SSH hardening:** Disabled password authentication; key-only SSH access.

- **fail2ban:** Enabled on the EC2 instance to automatically ban repeated authentication failures.

### Home Lab Controls

- **Proxmox firewall:** Applied host/VM firewalling in addition to cloud controls.

- **Origin isolation principle:** Origin application accepted traffic only from the proxy/tunnel path (no direct public client access to the VM).

### Application-Layer Safeguards

- Role-based permissions (LuckPerms) to limit sensitive actions.
- Additional controls/plugins to reduce admin account abuse and support moderation workflows.
- Extensive event logging for accountability (chat, commands, inventories, auth events).

---

## Operations & Reliability Engineering

### Automated Maintenance

**systemd timers + services** used for operational cadence:

- Weekly graceful restarts to mitigate long-running performance degradation (e.g., memory growth/plugin instability).
- Restart workflow preserved state and minimized disruption (graceful shutdown).

### Dependency/Plugin Lifecycle Automation

- Wrote a **Python updater** to auto-track and download the latest versions of specific dependencies (e.g., GeyserMC, ViaVersion, ViaBackwards) using the GitHub Releases API.
- Updates were deployed as part of the scheduled restart/maintenance flow (download → restart cycle applies updates).

### Backups and Recovery

- VM backed up to a **Proxmox Backup Server** every 48 hours at 3:00 AM.
- Primary risks mitigated: disk failure, corruption, bad updates, and accidental changes.

### Monitoring & Observability

- **Uptime Kuma** deployed in Docker (managed via Portainer) to provide TCP port checks and alerting if the service became unreachable.
- Detailed server logs retained via management/audit plugins for:
  - Moderation and incident review
  - Dispute resolution (e.g., inventory theft, admin action history)
  - Activity tracing (auth/commands)

---

## Why This Is Cloud Engineering

This project demonstrates:

- **Hybrid architecture design** — home compute + cloud edge ingress
- **Network segmentation** — attack-surface reduction (origin is not publicly exposed)
- **Cloud perimeter controls** — Security Groups, IP allowlisting for SSH
- **Host hardening** — key-only SSH, fail2ban
- **Operations automation** — systemd timers, scripted update workflows
- **Reliability practices** — graceful restarts, monitoring, scheduled backups
- **DNS correctness** — A + SRV records; stable routing to an Elastic IP
