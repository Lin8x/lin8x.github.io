---
title: "Active Directory Domain Lab & Group Policy Administration"
description: "Built and administered a Windows Active Directory lab domain with OU design, AGDLP-based group structure, DNS forwarding, workstation baselines, and scoped Group Policy for user and device management."
date: "July 2026 – Present"
tags: ["Active Directory", "Windows Server", "Group Policy", "DNS", "Help Desk", "System Administration", "OU Design", "AGDLP"]
tracks: ["it", "cloud", "software-engineer"]
image: "/images/projects/ad-login-to-domain.png"
featured: true
pinned: true
---

## Overview

Built and administered a hands-on Active Directory lab to learn the operational side of identity, workstation management, DNS, and Group Policy in a Windows domain environment. The lab was designed to mirror the kinds of tasks that show up in support and systems administration work: joining machines to a domain, organizing users and devices, applying policies predictably, troubleshooting login and policy issues, and separating standard, restricted, guest, and privileged access paths.

Rather than treating Active Directory as only a login service, I used the project to understand how domain structure, naming conventions, GPO links, security filtering, DNS, and workstation configuration all work together in day-to-day administration.

![Domain Login](/images/projects/ad-login-to-domain.png)

![Standard User Desktop](/images/projects/ad-danieljalali-screen.png)

---

## Environment Goals

This project was built around a few practical goals:

- **Stand up a working Active Directory domain** with reliable DNS resolution for both internal records and external websites.
- **Practice user and device lifecycle organization** through a clean OU structure for accounts, workstations, servers, and disabled objects.
- **Apply role and tier access models** using security groups, nested groups, and AGDLP-style permission design.
- **Learn Group Policy properly** by separating link scope, security filtering, workstation baselines, and user restrictions.
- **Build troubleshooting habits** using the same command-line and policy-verification workflows used during domain support work.

---

## Domain & Network Setup

Built the lab domain:

- **Domain:** `lab.danieljalali.com`
- **Domain Controller:** `192.168.50.30`
- **Workstation DNS:** `192.168.50.30`
- **External DNS Forwarder:** `1.1.1.1`

I domain-joined a Windows 10 Pro workstation and configured it to use the domain controller as its DNS server so authentication, name resolution, and Group Policy processing would flow through the Windows domain correctly. I also configured the DNS server to forward external lookups upstream, which allowed the workstation to resolve internal AD objects and public Internet destinations from the same client configuration.

Verified that:

- Active Directory DNS records resolved correctly
- External websites resolved through DNS forwarding
- The workstation could locate the domain controller using LDAP SRV records
- Windows Internet connectivity checks continued to function as expected

![Domain User Session](/images/projects/ad-danieljalai-screen-startmenu.png)

---

## Organizational Unit Design

Created a structured OU hierarchy to separate users, devices, and administration boundaries:

```text
HomeLab
├── Accounts
│   ├── User-Accounts
│   ├── Privileged-Accounts
│   ├── Disabled-Accounts
│   └── Service-Accounts
├── Devices
│   ├── Workstations
│   ├── Servers
│   └── Quarantine
└── Groups
    ├── Roles
    ├── Applications
    ├── Policy
    └── Resource
```

This structure helped me learn that OUs are not just folders for appearance; they matter for **Group Policy scope**, **administrative delegation**, and **identity lifecycle management**. I used the layout to keep privileged accounts, standard users, disabled identities, workstations, and servers clearly separated rather than mixed together in one flat directory.

I also learned an important administration detail: moving an object between OUs does **not** change its SID, password, or group memberships. That made the OU model useful for reclassification and policy targeting without destroying identity continuity.

---

## Group Design & AGDLP

Established naming conventions for security groups:

- `GG_` = Global security group
- `DL_` = Domain Local security group

Used the **AGDLP** model as the basis for access design:

```text
Account -> Global Group -> Domain Local Group -> Permission
```

Created role groups such as:

- `GG_Role_Helpdesk`
- `GG_Role_Developer`
- `GG_Role_Creative`
- `GG_Role_Gamer`
- `GG_Role_Student`
- `GG_Role_Worker`
- `GG_Role_Media_Viewer`

Created tier groups such as:

- `GG_Tier_Admin`
- `GG_Tier_Standard`
- `GG_Tier_Restricted`
- `GG_Tier_Guest`

Created policy-filtering groups such as:

- `DL_GPO_Admin_Apply`
- `DL_GPO_Standard_Apply`
- `DL_GPO_Restricted_Apply`
- `DL_GPO_Guest_Apply`
- `DL_GPO_Servers_Apply`

Nested the tier groups into their matching policy-filtering groups so policy targeting would stay consistent and easier to reason about. This taught me the value of keeping **role membership** and **access tier membership** conceptually separate: a user can belong to several role groups, but should typically belong to only one tier group at a time.

![AGDLP Diagram](/images/projects/ad-AGDLP.png)

![Privileged Account Example](/images/projects/ad-privledged-account.png)

---

## Group Policy Design

One of the most valuable parts of the project was learning how Group Policy really applies.

Key concepts I practiced:

- Creating a GPO does **not** apply it automatically
- A GPO must be **linked** to a site, domain, or OU
- **GPO links** determine where policy can apply
- **Security filtering** determines which objects in that scope actually receive it
- Security filtering cannot expand a GPO outside its linked location

To keep user-tier policies flexible, I linked the tier user GPOs to:

- `HomeLab\Accounts`

That let the same tier-based policies follow applicable users across child OUs beneath `Accounts`, while security filtering kept each GPO targeted only to the intended users.

Configured:

- `GPO_User_Admin`
- `GPO_User_Standard`
- `GPO_User_Restricted`
- `GPO_User_Guest`

Mapped each one to its corresponding Domain Local filter group, such as:

- `GPO_User_Standard` -> `DL_GPO_Standard_Apply`
- `GPO_User_Restricted` -> `DL_GPO_Restricted_Apply`
- `GPO_User_Guest` -> `DL_GPO_Guest_Apply`
- `GPO_User_Admin` -> `DL_GPO_Admin_Apply`

I also learned why **Authenticated Users** should remain under Delegation with **Read** permission even when removed from Security Filtering: client systems still need to read the GPO in order to evaluate whether it applies.

![Restricted GPO](/images/projects/ad-GPO_Restricted.png)

![Standard GPO](/images/projects/ad-GPO_Standard.png)

![Policy Filtering Example](/images/projects/ad-GPO_Policy_Standard.png)

---

## User Restrictions & Visual Tiering

Configured user-side restrictions for more controlled environments, including a policy that prohibited access to **Control Panel** and **Windows Settings** for restricted-tier users.

To make tier behavior visible at login, I stored wallpaper files in:

- `\\lab.danieljalali.com\NETLOGON\Wallpapers`

Assigned different wallpapers by tier:

- **Admin:** red
- **Standard:** green
- **Restricted:** blue
- **Guest:** white

This gave me hands-on experience with using `NETLOGON`/`SYSVOL` resources in support of user-facing policy behavior, and it also made it easy to visually confirm whether the correct user-side policy was being applied after sign-in.

![Guest User Desktop](/images/projects/ad-danieljalali-guest-screen.png)

---

## Workstation Baselines

Created a dedicated workstation OU:

- `HomeLab\Devices\Workstations`

Then planned and linked a workstation baseline GPO to that OU so computer-side settings would follow the **computer object**, independent of which user signed in.

Baseline areas configured or discussed included:

- Machine inactivity timeout
- Disabled guest account
- Enabled Windows Firewall
- Enabled Microsoft Defender real-time protection
- Windows Update behavior
- Successful and failed logon auditing

This taught me why workstations, servers, and domain controllers should not all share one generic baseline. Separating the workstation baseline from server policy made the configuration model easier to understand, test, and troubleshoot.

![Restricted Settings Example](/images/projects/ad-disablingsettings.png)

---

## Troubleshooting & Admin Skills Learned

Used common troubleshooting commands and workflows to validate policy behavior and signed-in context:

- `whoami`
- `whoami /groups`
- `gpupdate /target:user /force`
- `gpupdate /force`
- `gpresult /r /scope user`

The project helped reinforce several operational realities:

- User-side policy changes often require sign-out/sign-in
- Computer-side policy changes often require restart
- Group membership should be validated when a policy does not apply
- DNS has to be correct before domain join, GPO, and login behavior will feel reliable

This turned the lab into more than a configuration exercise. It became a practical environment for learning how to verify identity, troubleshoot GPO scope, inspect memberships, and reason through why a workstation or user is not receiving the expected behavior.

---

## Key Takeaways

This project demonstrates:

- **Active Directory administration fundamentals** through domain setup, OU design, DNS configuration, and workstation joins
- **Group-based access design** using AGDLP, role groups, tier groups, and nested security filtering
- **Group Policy understanding** across linking, scope, filtering, and baseline design
- **Help desk and workstation support relevance** through login validation, policy troubleshooting, DNS verification, and user environment controls
- **Operational discipline** in separating privileged accounts, standard users, workstations, servers, and disabled identities into manageable structures
