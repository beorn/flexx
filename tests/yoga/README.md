# Yoga Compatibility Tests

Tests imported from Facebook's [Yoga](https://github.com/facebook/yoga) project (MIT License).

## Structure

Generated tests are organized by implementation status:

```
tests/yoga/
├── categories.json     # Lists pending/unsupported (committed)
├── implemented/        # Default category - generated
├── pending/            # Features to implement - generated
└── unsupported/        # Won't support - generated
```

**Generated files are gitignored** - they're created on first test run.

## Auto-Detection

The import script auto-detects all fixtures from the Yoga repository. Fixtures default
to `implemented` unless listed in `categories.json` under `pending` or `unsupported`.

## Running Tests

```bash
# From flexx directory:
bun test:yoga              # All yoga tests (auto-generates if needed)
bun test:yoga:impl         # Only implemented features
bun test:yoga:pending      # Only pending features

# From km root:
bun test:flexx:yoga
```

## Regenerating Tests

Tests are regenerated automatically when missing. To force regeneration:

```bash
rm -rf tests/yoga/implemented tests/yoga/pending tests/yoga/unsupported
bun test:yoga
```

Or regenerate directly:

```bash
bun scripts/import-yoga-tests.ts
```

## Changing Categories

Edit `categories.json` to mark fixtures as pending or unsupported:

```json
{
  "pending": ["FeatureName"],
  "unsupported": ["UnsupportedFeature"]
}
```

All fixtures not listed default to `implemented`.

## Current Categories

### Pending
Features not yet implemented:
- AspectRatio - aspect ratio constraints
- Auto - auto sizing behavior
- BoxSizing - box-sizing: border-box
- IntrinsicSize - intrinsic size calculations
- SizeOverflow - overflow sizing edge cases
- StaticPosition - position: static behavior
- AndroidNewsFeed - complex real-world layout

### Unsupported
Features flexx won't support (none currently).

### Implemented
All other fixtures (auto-detected from Yoga repository).
