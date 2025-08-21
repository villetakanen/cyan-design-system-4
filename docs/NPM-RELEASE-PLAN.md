## NPM Release Plan — publish packages as `@11thd/*` (v4.x)

Status: Draft

Estimated time: 2–4 hours initial setup, 15–30 minutes per package for subsequent releases
Risk: Medium (npm org permissions, accidental public publish, versioning mistakes)

Overview
--------

This document describes a conservative, repeatable process to prepare and publish the monorepo packages under the npm scope `@11thd` and to standardize versions to `4.something` (semantic versioning).
We are currently in a beta phase — all published beta releases should use semver pre-release identifiers (for example `4.0.0-beta.3`). The plan focuses on checklistable steps, CI automation, and safe dry-runs.

Requirements (explicit)
-----------------------
- All packages will be published under the npm scope `@11thd/[name]`.  
- All released versions must be `4.x.y` (use semver: major = 4). During the beta phase, prefer pre-release identifiers such as `4.0.0-beta.1`, `4.0.1-beta.2` to make the release channel explicit.
- Provide a repeatable CI-driven release flow using GitHub Actions.  
- Include dry-run/publish checks and post-release validation.

Assumptions
-----------
- You control or can be granted admin/publish access to the `@11thd` npm organization.  
- Packages already have working build scripts producing a `dist/` or equivalent artifact.  
- We will not change the repository's package manager (pnpm).  

Quick checklist
---------------
- [ ] Confirm access to `@11thd` org and that `NPM_TOKEN` will be added to GitHub Secrets. (Required)
- [ ] Update each package `package.json`:
  - `name`: `@11thd/<package-name>`
  - `version`: `4.0.0-beta.0` (or appropriate `4.x.y-beta.n` starting point for beta releases)
  - `publishConfig`: `{ "access": "public" }` (if packages are public)
  - `files`, `main`, `module`, `types`, `style`, `exports` should point to build artifacts
- [ ] Ensure package build emits artifacts (test by running `pnpm --filter <pkg> build`).
- [ ] Add `prepare`/`prepublishOnly` scripts if you need to build before publishing.
- [ ] Add CHANGELOG entries or use Changesets for automated changelog & version management.
- [ ] Create a GitHub Actions workflow to run build, tests and publish on tag.
- [ ] Do an `npm publish --dry-run` locally for each package to verify what will be published.

Detailed steps
--------------

1) Access & org setup (15–30m)
  - Confirm the `@11thd` npm organization exists and you have a user with publish rights.
  - If not present, create the org and invite team members.
  - Create an automation token for GitHub Actions with publish permissions and add it to repository secrets as `NPM_TOKEN`.

2) Package metadata changes (10–30m per package)
  - In each `packages/<pkg>/package.json` update fields:
    - `name`: `@11thd/<pkg>` (e.g. `@11thd/cyan-lit`).
    - `version`: set initial v4 version (recommend `4.0.0` or an opportune patch like `4.0.1`).
    - `publishConfig.access`: `public` if publishing publicly.
    - Ensure `files` includes `dist/`, and `main`/`module`/`types` point to built outputs.
  - Do not change dependency versions lightly; prefer peerDependencies where appropriate.

3) Build & test validation (5–15m per package)
  - Run:

```bash
pnpm install
pnpm --filter <pkg> build
pnpm --filter <pkg> test
```

  - Fix any build/test failures before attempting publish.

4) Local dry-run publish (5–10m per package)
  - From the package directory run:

```bash
npm publish --access public --dry-run
```

  - Inspect the tarball contents and ensure only intended files are included.

5) Versioning strategy
  - Use semver: major = 4. During the beta phase use pre-release identifiers: `4.0.0-beta.1`, `4.1.0-beta.2`, etc. When you cut a stable release, move to `4.x.y` without the `-beta` suffix.
  - Recommended tooling options (pick one):
    - Changesets (recommended): automates changelogs and version bumps across the monorepo and supports pre-release flows.
    - Manual bumps: set `package.json` version (including `-beta.N`) and create a release tag (slower, manual).
    - Semantic-release: supports pre-release channels but requires extra configuration; use only if you want full automation.

6) CI/CD: GitHub Actions publishing workflow (30–60m to implement)
  - Create `.github/workflows/release.yml` that:
    - Runs on pushed tags matching your release pattern (e.g. `refs/tags/v4.*` and `refs/tags/v4.*-beta.*`) or when a `release` is created.
    - Installs node, pnpm; runs `pnpm install --frozen-lockfile`.
    - Runs unit/browser tests (vitest) and lint/format checks.
    - Builds all packages (`pnpm -r build`).
    - Publishes changed packages (use `pnpm publish -r --access public` or per-package `npm publish`) using `NPM_TOKEN`.
  - Use `pnpm` or `changesets-action` to publish only changed packages.

Example publishing flow notes
-----------------------------
- Trigger: create a git tag for beta `v4.1.0-beta.1` (or stable `v4.1.0`) or use Changesets that produce a release commit. CI should publish pre-release packages when a beta tag is pushed and stable packages when a stable tag is pushed.
- CI validates tests and build, then publishes packages that have changed since last release.
- On success, CI pushes Git tags and optionally creates a GitHub Release with changelog.

7) Post-publish validation (5–10m per package)
  - `npm view @11thd/<pkg> versions` to confirm the new version is listed.
  - `npm pack @11thd/<pkg>@4.x.y` to download the published tarball and inspect contents.
  - Update `apps/cyan-docs` imports to use the `@11thd/*` package names, if desired.

8) Rollback / deprecate (optional)
  - If a bad package is published, you can deprecate it with:

```bash
npm deprecate @11thd/<pkg>@<version> "DO NOT USE - reason"
```

Tips & safe-guards
------------------
- Use `prepare`/`prepublishOnly` scripts to ensure build runs before publish.  
- Add `private: false` (or omit `private`) on packages you intend to publish.  
- Keep `NPM_TOKEN` restricted to publish scope and rotate it after setup.  
- Use `npm publish --dry-run` as a final check in CI before the real publish step (or run pack).

Estimated timeline
------------------
- Org & tokens: 15–30m
- Package metadata updates (all packages): 1–2 hours
- CI workflow: 30–60m
- First publish (dry-run & real): 15–30m per package

Deliverables & next steps
------------------------
- Add `NPM_TOKEN` secret to GitHub.  
- Decide and implement version workflow (Changesets vs manual).  
- Update package.json names and versions (commit and open PR).  
- Add the GitHub Actions `release.yml` and test on a dry-run tag.  
- Publish first package as a pilot (e.g., `@11thd/cyan-css`) and validate.

Requirements coverage
---------------------
- Publish under `@11thd/*`: Planned (update package.json `name`).  
- All versions `4.something`: Planned (set `version` to 4.x and use Changesets or manual bumps).  
- CI-driven publishing: Planned (Actions workflow described).  

Notes
-----
- This plan is intentionally conservative: perform a single-package pilot before publishing all packages.
- If you want, I can scaffold a `changeset` setup and create the GitHub Actions workflow in a follow-up change.

--
Generated: August 21, 2025
