# Runtime and toolchain

## Node.js baseline

- Project runtime: Node.js 26 LTS.
- Initial pin: 26.13.0.
- Node 26 entered Active LTS on 2026-10-28. Its scheduled end-of-life is 2029-04-30; release schedules can change.
- Node.js is pinned through .nvmrc, .node-version and package.json engines.

Official references:
- https://nodejs.org/en/about/previous-releases
- https://github.com/nodejs/Release
- https://github.com/nodejs/node/blob/main/BUILDING.md

## macOS compatibility

Official Node.js 24 and 26 macOS binaries require macOS 13.5 or newer. A Mac running macOS 12 Monterey cannot run these official binaries.

Node.js 22 supports older macOS versions, including macOS 11, but its scheduled end-of-life is 2027-04-30. It is not selected as this repository's standard runtime because it is too close to end-of-life for a new reusable foundation.

Preferred solution: update the development Mac to macOS 13.5 or later, ideally a currently supported macOS release. If that is not possible, use a supported remote Linux development environment rather than quietly changing this repository's Node baseline.

The Node 26 Linux runtime used in CI and deployment is unaffected by the macOS binary requirement.

## pnpm

- Initial package manager pin: pnpm 12.18.0.
- package.json declares packageManager and the supported pnpm major.
- Node.js 25+ does not bundle Corepack. Install the pinned pnpm directly with:

```bash
npm install --global pnpm@12.18.0
```

Alternatively install a compatible standalone Corepack version separately and enable it. Do not assume Corepack is bundled with Node 26.

Official references:
- https://pnpm.io/
- https://pnpm.io/blog/releases/12.18.0
- https://github.com/nodejs/node/blob/main/doc/contributing/distribution.md

## Updating the runtime

When a new Node patch is adopted, update .nvmrc, .node-version and the documented pin together. Keep package.json engines aligned with the supported major. Review native dependencies and CI before changing the major version.
