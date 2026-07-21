---
title: "Automatic Patreon Integration"
description: "AWS-hosted Node.js application integrating Patreon API with OAuth 2.0 for real-time user tier management and syncing."
date: "July 2024 – Aug 2024"
tags: ["AWS", "EC2", "Node.js", "MySQL", "OAuth 2.0", "JavaScript", "HTML", "GitHub Actions"]
tracks: ["cloud", "software-engineer"]
image: "/images/projects/patreon-front-page.png"
featured: true
---

## Overview
Built a backend system to automate Patreon reward fulfillment, account linking, and user-data publishing through a hosted AWS workflow. The project combined authentication, API integration, persistence, automation, and privacy handling in a single production-style pipeline rather than as an isolated demo.

What made the project valuable was that it solved a real coordination problem: keeping user-submitted information, Patreon membership status, and downstream published data synchronized without relying on manual updates.

![Patreon Integration Front End](/images/projects/patreon-front-page.png)

---

## Project Goals

The system was designed to:

- authenticate Patreon users securely
- evaluate membership status from Patreon data
- store linked user information in MySQL
- automate publication of selected data for downstream use
- reduce manual account administration and sync work

This made the project a useful exercise in backend workflow design, not just API experimentation.

---

## Architecture & Workflow

Built the application on **AWS EC2** using **Node.js**, **JavaScript**, **HTML**, and **MySQL**.

The overall flow looked like this:

- User signs in through **OAuth 2.0**
- Application retrieves Patreon account and membership information
- User-provided data is linked to backend records in **MySQL**
- Processed output is published to a public **GitHub** repository through **GitHub Actions**

This required coordinating authentication state, third-party API data, persistence, and automation in a way that stayed reliable across repeated user interactions.

---

## Data Handling & Security

The project also included privacy-aware handling for published information:

- processed user-linked data before publication
- used an XOR-based obfuscation/encryption step before pushing output
- separated account handling from downstream publishing logic

While the project was not an enterprise identity platform, it was useful for learning how quickly data flow, user trust, and automation become intertwined once real user accounts are involved.

## Key Achievements
- **Cloud Deployment:** Built and deployed the application on AWS EC2 using Node.js, JavaScript, HTML, and MySQL.
- **API Integration:** Used the Patreon API and JSON responses to retrieve user and membership data for backend decision-making.
- **Authentication:** Implemented OAuth 2.0 to support secure Patreon login and account linking.
- **Automation:** Linked user-submitted information to MySQL records and automated publication to a public GitHub repository through GitHub Actions.
- **Data Protection:** Applied an XOR-based protection step before publishing processed output to improve privacy handling.
