# PROMPTS.md — Working with Claude Code

This file contains proven prompts for working efficiently with Claude Code
on the Spotland community centre website.

Use these prompts by copying them into a Claude Code session.
Claude does NOT read this file automatically.

---

## 1) Default Senior Engineer Prompt (start here)

Use when you are unsure what to work on next.

Act as a senior engineer working in this repository.

Read CLAUDE.md and inspect the current codebase.

Before changing anything:
1. Identify the current stack and patterns in use.
2. Identify the highest-risk issue relative to our priorities.
3. Propose ONE small, safe improvement.

If clarification is required, ask no more than three questions.
Otherwise, proceed and implement the change.

---

## 2) Safe Implementation Prompt (most common)

Use when you already know what change you want.

Implement the following change using the smallest possible diff:
[describe the change]

Constraints:
- Follow CLAUDE.md strictly
- Do not refactor unrelated code
- Do not introduce new dependencies
- Explain how to verify the change

---

## 3) Accessibility-First Audit Prompt (high ROI)

Use regularly for this project.

Audit the current UI for accessibility issues.

Scope:
- Semantic HTML usage
- Keyboard navigation
- Contrast and readability
- Touch target sizes

Return:
- Top 5 issues (ranked)
- ONE fix that can be safely implemented now
- How to verify the fix

---

## 4) Content & Readability Prompt (ESL + elderly focus)

Use when reviewing or adding copy.

Review the visible copy in this repository.

Goals:
- Grade 6 reading level
- Clear, friendly tone
- Suitable for elderly and ESL users

Return:
- 3 concrete copy improvements
- ONE small change to implement now

---

## 5) Architecture Decision Prompt (use sparingly)

Use only when a decision materially affects structure or scalability.

I need an architectural recommendation.

Context:
[describe the decision]

Provide:
1. Two viable options (no more)
2. Clear tradeoffs for each
3. A recommendation aligned with CLAUDE.md priorities

Do not implement anything yet.

---

## 6) Data & Sanity Schema Prompt

Use when working with Sanity or GROQ.

Review the Sanity schemas and related GROQ queries.

Goals:
- Schema clarity
- Minimal duplication
- Correct query usage

Return:
- Any mismatches or risks
- ONE small improvement to implement safely

---

## 7) Pre-Commit Review Prompt (PR-style)

Use before committing changes.

Review the current changes as if approving a PR.

Check for:
- Accessibility regressions
- Violations of CLAUDE.md
- Unnecessary complexity
- Missed edge cases

Respond with:
- Approve or Request Changes
- Specific reasons

---

## 8) Time-Boxed Progress Prompt (when stuck)

Use when time or energy is limited.

Assume you have 30 minutes.

Given this repo and CLAUDE.md:
- What is the most valuable improvement we can make right now?

Propose one concrete change and implement it.

---

## 9) Refactor Guardrail Prompt

Use before any refactor.

Before refactoring:
- Explain what problem you are solving
- Confirm the change is necessary
- Identify risks

If risks outweigh benefits, do not refactor.

---

## 10) Release Readiness Prompt

Use before deployment.

Assess the repository for release readiness.

Check:
- Accessibility
- Performance
- Content completeness
- Sanity data integrity

Return:
- Blockers
- Nice-to-haves
- Go / No-go recommendation
