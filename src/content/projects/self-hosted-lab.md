---
title: "Homelab Hardware Upgrades & Network Setup"
description: "Upgraded and repurposed multiple machines with RAM and SSDs, then designed a segmented pfSense-based homelab with Proxmox, NAS storage, controlled wireless access, and real production-style firewall policy."
date: "May 2026 – Present"
tags: ["pfSense", "Proxmox", "Hardware Upgrades", "SSD", "RAM", "VLANs", "NAS", "Wi-Fi"]
tracks: ["cloud", "dataengineer", "software-engineer", "it"]
image: "/images/projects/homelab-devices-1.jpg"
featured: true
pinned: true
---

## Overview
Designed and operated a home infrastructure environment with clear device responsibilities, centralized network control, segmented traffic, controlled service exposure, and practical hardware lifecycle management. I upgraded and repurposed several machines with additional RAM and SSD storage, assigned each system a defined role, and tied the environment together behind a dedicated pfSense appliance responsible for routing, firewalling, DHCP, DNS, VPN, and inter-VLAN policy.

Rather than building a flat network of miscellaneous devices, I treated the homelab like a small managed environment. The result is a platform I use for virtualization, backups, storage, monitoring, wireless coverage, hosted services, and testing, with clear boundaries between administrative systems, public-facing workloads, storage, backup infrastructure, and client devices.

![Network Topology](/images/projects/pfsense-network-topology.png)

![pfSense Rules - WAN and NAT Controls](/images/projects/pfsense-rules-4.png)

![pfSense Dashboard](/images/projects/pfsense-dashboard.png)

---

## Environment Goals

This project was built around a few practical goals:

- **Extend the life of existing hardware** by upgrading RAM and SSDs and reassigning machines to useful infrastructure roles.
- **Keep routing and security centralized** under pfSense instead of spreading policy across consumer network gear.
- **Segment systems by function** so storage, backup, wireless clients, and public-facing services do not all live on the same trust boundary.
- **Support day-to-day operations** like backups, virtualization, monitoring, hosting, and troubleshooting in one environment I control.
- **Improve wireless coverage** without breaking the network design or introducing a second unmanaged router layer.

---

## Architecture & Topology

The lab is built around a dedicated pfSense appliance placed behind a shared household modem. That arrangement lets me manage my own internal environment end-to-end without needing control over the family's upstream Internet equipment. pfSense acts as the authoritative network core and connects through its LAN interface to a TP-Link TL-SG108E managed switch, which then distributes connectivity to compute, storage, and wireless infrastructure.

### Current traffic flow
```text
Internet
  -> Household Modem
  -> pfSense Router / Firewall / DHCP / DNS / VPN
  -> TP-Link TL-SG108E Managed Switch
     -> Proxmox Host (VLAN 40)
     -> Backup Compute Node (VLAN 30)
     -> NAS / Storage (VLAN 60)
     -> Main Services Desktop (VLAN 50)
     -> Archer BE550 Access Point + Deco Mesh Clients (VLAN 80)
```

![Architecture Diagram Placeholder - replace with your final homelab topology visual](/images/projects/servers.jpg)

Above is a temporary placeholder. Replace it with your dedicated architecture visual once you export the final diagram.

- **Routing and security core:** pfSense appliance with an 8-core Intel Atom C3758, 32 GB DDR4, AES/QAT acceleration, and 256 GB SSD.
- **Layer 2 distribution:** TP-Link TL-SG108E managed switch carrying both untagged LAN traffic and tagged VLANs.
- **Wireless access:** TP-Link Archer BE550 used as an access point, with TP-Link Deco mesh nodes extending coverage while staying under the same pfSense-controlled routing and policy model.

![Homelab Devices - Switch, pfSense, AP, and Backup Node](/images/projects/homelab-devices-1.jpg)

![Homelab Devices - Additional Hardware View](/images/projects/homelab-devices-2.jpg)

---

## Hardware Upgrades & Platform Design

One of the most practical parts of this project was converting a mix of existing and compact systems into useful infrastructure through targeted upgrades rather than replacing everything outright.

### Primary virtualization host

- **Dell OptiPlex 9020 SFF**
- Upgraded to **32 GB DDR3**
- Installed **dual 2 TB SSDs**
- Configured storage as a **mirrored ZFS pool**
- Runs **Proxmox** as the main virtualization platform

This machine became the primary host for lab workloads, including Ubuntu Server virtual machines for Minecraft and other service experimentation. The SSD mirror gave me a stronger reliability baseline than a single-disk setup, while the memory expansion made the system far more usable as a multi-VM host.

### Backup compute node

- **GMKtec M6 Ultra mini PC**
- **AMD Ryzen 5 7640HS**
- **32 GB DDR5**
- **512 GB SSD**
- **Dual 2.5GbE interfaces**

I use this system as separate backup compute capacity and as a second Proxmox platform. Having an additional node means I am not forced to keep every backup, experiment, or recovery path on the same physical machine as the primary workloads.

### Storage platform

- **UGREEN DH2300 two-bay NAS**
- Dedicated to centralized persistent storage
- Used for backups, personal files, service data, and general long-term storage

Rather than treating storage as an afterthought attached to whatever machine is available, I separated it into its own platform and network boundary so access can be granted intentionally.

### Main services machine

- Older custom desktop with **32 GB G.SKILL Trident Z RGB DDR4-3600**
- Equipped with an **NVIDIA RTX 3060**
- Used for self-hosted services, testing, and local GPU-assisted experimentation

This gave the lab a more flexible "general services" host for workloads that benefit from desktop-class hardware and GPU access.

This part of the project reflects asset reuse, role-based hardware assignment, storage planning, and capacity thinking instead of simply standing up services on whatever machine happened to be free.

---

## Network Segmentation

To avoid a flat network where every device could freely communicate with every other system, I split the environment into purpose-specific VLANs and used pfSense as the inter-VLAN gateway and policy enforcement point.

- **LAN:** `192.168.0.0/24` for administrative access
- **VLAN 30:** backup environment
- **VLAN 40:** primary Proxmox and Minecraft workloads
- **VLAN 50:** main services / "super server" network
- **VLAN 60:** NAS and storage network
- **VLAN 80:** wireless clients

This layout let me separate systems by function and risk profile rather than just by convenience. Public-facing or higher-exposure services do not automatically share unrestricted access with storage or management systems.

This is one of the most important operational improvements in the environment because it turns the network from a simple home setup into something much closer to a managed infrastructure layout with explicit trust boundaries.

![pfSense Rules - Internal Policy Segmentation](/images/projects/pfsense-rules-2.png)

---

## Wireless Design

Wireless coverage was extended through a **TP-Link Deco mesh system** working alongside the **TP-Link Archer BE550** access point. The goal was to improve coverage across multiple rooms and floors without introducing a second routing layer or allowing consumer mesh hardware to take over network policy.

Key design choice:

- **Coverage expansion came from the mesh**
- **Routing, DHCP, DNS, firewalling, and VLAN policy stayed on pfSense**

That approach gave me stronger whole-home coverage and fewer weak-signal zones while preserving a clean network architecture. Wireless clients remain part of the environment I control, instead of being hidden behind a separate NAT boundary or split into an unmanaged side network.

The important point is that I improved end-user connectivity without compromising central control of routing, DNS, DHCP, firewalling, or VLAN separation.

---

## Security Model & Firewall Rules

The firewall policy follows a least-privilege model. Traffic is evaluated at the interface where it originates, and I only permit inter-network communication when there is a specific service need.

Examples of how that plays out:

- Public traffic is forwarded only to explicitly approved internal services.
- Monitoring traffic is allowed only from designated systems to specific targets and ports.
- Internal VLANs are blocked from broad RFC 1918 access unless a rule exists to permit the traffic.
- Storage and management systems remain isolated from wireless clients and public-facing workloads by default.
- DNS policy is kept centralized so clients cannot easily bypass local resolver controls.

For the Minecraft environment specifically, WAN-side port forwarding exposes only the services that need to be reachable externally, rather than opening broad access into the server VLAN. This keeps the public game services available while reducing unnecessary exposure of the rest of the lab. The guiding principle is to publish only what is needed, document the path, and keep the rest of the environment private by default.

![pfSense Rules - Targeted Allow Rules](/images/projects/pfsense-rules-3.png)

![pfSense Rules - Additional Firewall Policy](/images/projects/pfsense-rules-1.png)

---

## Operations & Real-World Use

This environment is used continuously, not just as a one-time build. It supports:

- self-hosted services
- Minecraft hosting for public and friend-only use
- file storage and backups
- local testing and disposable VM experimentation
- monitoring and troubleshooting
- research, writing, and information organization
- local AI and GPU-assisted experimentation

Because the lab combines upgraded hardware, virtualization, storage, wireless infrastructure, and segmented firewall policy, it gave me direct hands-on experience with the kinds of tradeoffs that show up in real infrastructure work: performance versus cost, convenience versus isolation, public access versus internal safety, and flexibility versus operational simplicity.

---

## Key Takeaways

This project demonstrates:

- **Hands-on hardware lifecycle management** by upgrading and repurposing systems instead of discarding them
- **Infrastructure design thinking** through role-based separation of compute, storage, backup, and wireless systems
- **Network engineering fundamentals** including VLANs, trunking, inter-VLAN routing, and access segmentation
- **Security-minded operations** through least-privilege firewall rules and controlled exposure of public services
- **Platform ownership** by operating a real environment used for storage, hosting, testing, monitoring, and daily personal workloads
- **Operational judgment** in balancing usability, reliability, coverage, and security across multiple device types and network zones
