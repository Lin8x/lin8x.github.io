---
title: "Vendor Data Analysis System"
description: "Comprehensive data pipeline collecting, transforming, and analyzing vendor sales data (Patreon/Gumroad) with automated currency normalization."
date: "Sept 2024 – Dec 2024"
tags: ["Python", "Selenium", "MySQL", "API Integration", "ETL"]
tracks: ["dataengineer", "software-engineer", "it"]
featured: true
---

## Overview
Engineered a data pipeline to solve fragmentation in vendor sales reporting across multiple platforms. The project focused on collecting, normalizing, storing, and validating sales data so reporting could be performed from a cleaner, more consistent dataset instead of from disconnected vendor exports and partial platform records.

What made the work valuable was the blend of ingestion methods: API access where available, Selenium scraping where data was incomplete, transformation logic for currency normalization, and relational storage for downstream querying.

---

## Problem & Goals

The project was designed to address several reporting pain points:

- vendor data arriving from multiple platforms with inconsistent formats
- missing or incomplete fields in direct source outputs
- sales activity spanning different currencies and regions
- difficulty performing clean downstream analysis without a normalized pipeline

The goal was to build a repeatable ETL workflow that reduced manual cleanup and made reporting more reliable.

---

## Pipeline Design

Built the pipeline with **Python**, **Selenium**, **MySQL**, and API-integrated ingestion steps.

The workflow included:

- collecting vendor sales data from **Patreon** and **Gumroad**
- supplementing missing fields through **Selenium** web scraping
- normalizing multi-currency sales values
- storing transformed records in a relational **MySQL** schema
- validating records before downstream use

This made the project more than just analysis. It became a full ingestion-and-preparation system for reporting data.

---

## Data Reliability

To keep the resulting dataset usable, I added reliability and cleanup measures:

- validation logic for incoming records
- error handling through a custom Python library
- relational modeling for sales, customer, and product data
- more consistent reporting inputs across mixed vendor sources

That work helped reduce the chances of misleading outputs caused by missing fields, inconsistent currency values, or malformed source records.

## Key Achievements
- **Data Collection:** Built a pipeline to collect vendor sales data from Patreon and Gumroad, supplementing incomplete records with Selenium-based scraping.
- **Transformation:** Automated currency normalization and conversion handling for multi-regional sales data.
- **Relational Storage:** Designed and deployed a MySQL schema for sales, customer, and product datasets to support cleaner downstream querying.
- **Reliability:** Implemented validation and error handling through a custom Python library to improve data quality and repeatability.
- **ETL Workflow:** Turned fragmented multi-source reporting into a more structured end-to-end data preparation pipeline.
