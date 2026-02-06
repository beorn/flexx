# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-02-06

### Added

- Core flexbox layout algorithm (direction, grow, shrink, basis)
- Alignment (justify-content, align-items, align-self, align-content)
- Spacing (gap, padding, margin, border)
- Constraints (min/max width/height)
- Measure functions for content-based sizing (e.g., text)
- Baseline functions for alignment
- Absolute positioning
- Aspect ratio support
- Flex-wrap (multi-line layouts)
- Logical edges (EDGE_START/END) with full RTL support
- Zero-allocation layout algorithm (layout-zero.ts) for high-frequency recalculation
- Classic allocating algorithm (layout.ts) for debugging and comparison
- Dirty tracking for incremental relayout
- 100% Yoga API compatibility (41/41 comparison tests passing)
- 524 tests total
- 2-3x faster than Yoga, 5x smaller bundle, zero dependencies

[0.1.0]: https://github.com/beorn/flexx/releases/tag/v0.1.0
