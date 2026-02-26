# Private Resume Workflow

This project keeps private resume inputs local-only.

## Storage

- Local-only folder: `private/` (gitignored)
- Public docs live here in `README/`

## Commands

- `npm run resume:private:scaffold`
  - Auto-generates `private/private-resume.json`
  - Creates a timestamped backup if file already exists
  - Pre-fills contact and experience rows with `company: "REPLACEME"`

- `npm run resume:private -- cloud`
  - Generates one private PDF resume

- `npm run resume:private`
  - Generates private PDFs for all professional tracks

## What You Edit

Edit only `private/private-resume.json`:

```json
{
  "contact": {
    "email": "private-email@domain.com",
    "linkedin": "linkedin.com/in/your-private-profile"
  },
  "tracks": {
    "cloud": {
      "experience": [
        {
          "entity": "Private Software Company",
          "role": "Software Engineering Intern",
          "company": "Actual Company Name"
        }
      ]
    }
  }
}
```

Matching rules for experience patches:
- Preferred: `entity` + `role`
- Legacy fallback: `matchTitle`

## Organization Type Source

`entity` in scaffolded rows comes from:
- `src/data/personal.ts`
- Field: `workExperience[].organizationType`
