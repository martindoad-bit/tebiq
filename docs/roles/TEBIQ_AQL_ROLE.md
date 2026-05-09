---
status: draft / intake placeholder / not a full role definition
role: Answer Quality Lead
date: 2026-05-09
version: v0.1
---

# TEBIQ AQL Role Placeholder

## Purpose

This file exists so future windows know AQL exists as an independent role.

It does **not** replace AQL's own working method, rubric, or founder/Claude.ai
instructions. Until AQL provides a canonical role pack, this file is only an
interface placeholder.

## Confirmed Boundary

AQL is independent from Codex GM-OPS / ENGINE / QA / CODEXUI execution.

AQL handles answer-quality diagnosis and repair routing advice. Codex handles
implementation and regression. The implementer must not be the final judge that
its own quality fix is solved.

AQL does not:

- write code or open PRs
- edit fact cards directly
- make final product direction decisions
- make final in-status / legal-domain judgments
- collapse DOMAIN or FACT professional judgment into engineering convenience

## Current Interface

Expected AQL outputs should eventually give GM enough information to route work:

- case identity and scenario
- observed answer failure
- likely failure layer (for example ENGINE / FACT / DOMAIN / UX / PRODUCT / UNKNOWN)
- evidence
- suggested owner for remediation
- suggested verification method after remediation
- whether DOMAIN review is required
- whether founder product judgment is required

## Canonicalization Needed

Founder / Claude.ai / AQL should replace or expand this placeholder with:

- AQL scoring rubric and dimensions
- case intake format
- failure taxonomy
- pass / fail / retry criteria
- escalation triggers to DOMAIN and founder
- weekly target-card interface
- relationship to Answer Review Desk fields
- examples of good diagnosis vs overreach

## Conflict Rule

If this placeholder conflicts with AQL's current independent window practice or
founder/Claude.ai target card, stop and update this file. Do not use this file
to reduce AQL into a Codex subagent or QA checklist.
