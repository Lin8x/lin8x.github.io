# Private Resume Workflow

This project keeps private resume inputs local-only.

## Storage

- Local-only folder: `private/` (gitignored)
- Public docs live here in `README/`

## Commands

- `npm run resume:private:scaffold`
  - Auto-generates `private/private-resume.json`
  - Creates a timestamped backup if file already exists
  - Pre-fills contact and a single global `experienceCompanies` list with `company: "REPLACEME"`
  - Splits entries into `experienceCompanies` and `volunteerCompanies`
  - Orders entries newest-to-oldest without exposing dates
  - Adds a one-line `hint` from the experience bullets so similar roles are easier to identify

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
  "experienceCompanies": [
    {
      "entity": "Private Software Company",
      "role": "Software Engineering Intern",
      "hint": "Created internal automation software using Python, JavaScript, and C#.",
      "company": "Actual Company Name"
    }
  ],
  "volunteerCompanies": [
    {
      "entity": "Educational Nonprofit / Club",
      "role": "Volunteer Role Example",
      "hint": "One-line role context to help identify this entry.",
      "company": "Actual Organization Name"
    }
  ],
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

Matching rules for experience patches (`experienceCompanies`, `volunteerCompanies`, and `tracks.<track>.experience`):
- Preferred: `entity` + `role`
- Legacy fallback: `matchTitle`

Priority:
- `experienceCompanies` and `volunteerCompanies` apply first across all tracks
- `tracks.<track>.experience` applies second and can override a specific track only

Note:
- `hint` is scaffold-only metadata to help identify roles; it is ignored by PDF generation.

## Organization Type Source

`entity` in scaffolded rows comes from:
- `src/data/personal.ts`
- Field: `workExperience[].organizationType`
