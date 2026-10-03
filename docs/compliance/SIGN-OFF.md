# Compliance sign-off log

This file records written sign-off for each compliance feature flag in `src/config/flags.ts`, and the pre-launch legal review (Gate 0). **No flag may be set to `true` in production without a completed, signed record here.** The gate criteria are in `docs/07-implementation-plan.md` §6 and the framework is in `docs/compliance/README.md`.

Rules:
- One record per flag per environment. Add new records at the top of the relevant section. Never edit a signed record; add a new one.
- Attach or link the adviser's written opinion (stored privately; reference it here).
- A record expires on its review date (at most 12 months) or earlier if the law, CAP or MHRA guidance, an ASA ruling or the template changes materially.

## Current flag status

| Flag | Production | Last sign-off | Review due |
|---|---|---|---|
| `pomPricing` | OFF | none | n/a |
| `affiliateLinks` | OFF | none | n/a |
| `discountCodes` | OFF | none | n/a |
| `stickyCta` | OFF | none | n/a |
| `showUnreviewedContent` | OFF (must never be on in production) | n/a | n/a |

---

## Gate 0: Pre-launch review (all flags off)

```markdown
## Sign-off record: GATE 0 (production)

- **Scope:** whole site with all flags off; preview URL <…>; templates reviewed <list>
- **Disclosure wording approved (/affiliate-disclosure):** <yes/no>
- **Medical reviewer appointed and registration verified:** <name, GPhC/GMC number, date checked>
- **ICO registration number:** <…>
- **Cookie consent tested:** <date, tester>
- **Adviser:** <name, firm>   **Opinion reference:** <…>
- **Conditions:** <…>
- **Decision:** <APPROVED / APPROVED WITH CONDITIONS / REJECTED>
- **Signed (adviser):** <name, date>
- **Signed (project lead):** <name, date>
- **Review date:** <YYYY-MM-DD>
```

---

## Flag records

### Template

```markdown
## Sign-off record: <FLAG_NAME> (<environment>)

- **Flag / env var:** <e.g. pomPricing / FLAG_POM_PRICING>
- **Environment:** <production / preview>
- **Requested by:** <name, role>   **Date requested:** <YYYY-MM-DD>
- **Scope:** <templates and routes covered; screenshots or preview URLs attached>
- **Gate checklist (Part 7 §6) complete:** <yes/no>; evidence: <links>
- **Prerequisite gates passed:** <e.g. Gate 1 and Gate 2 for discountCodes>
- **Adviser:** <name, firm, qualification>
- **Opinion reference:** <document reference and date>
- **Regulatory sources considered:** <HMR 2012 reg. 284; CAP Code 12.12 and sections 2, 3, 13; CAP/MHRA/GPhC enforcement notices (versions and dates); ASA rulings checked up to <date>; DMCC Act 2024>
- **Conditions or limitations:** <e.g. "links to service landing pages only", "dose-price pages noindex">
- **Decision:** <APPROVED / APPROVED WITH CONDITIONS / REJECTED>
- **Signed (adviser):** <name, date>
- **Signed (project lead):** <name, date>
- **Deployed:** <date, commit SHA, deployer>
- **Review date:** <YYYY-MM-DD, at most 12 months>
- **Rollback owner:** <name>   **Rollback tested:** <date>
```

### pomPricing
_No records._

### affiliateLinks
_No records._

### discountCodes
_No records._

### stickyCta
_No records._

---

## Incidents

| Date | Event (complaint, regulator contact, ruling) | Flags affected | Action taken | Closed |
|---|---|---|---|---|
| | | | | |
