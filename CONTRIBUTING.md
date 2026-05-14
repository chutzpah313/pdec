# Contributing

Thanks for considering a contribution.

## Prerequisites

- Node.js 20+
- npm (bundled with Node.js)

## Clone and install

```sh
git clone https://github.com/chutzpah313/pdec.git
cd pdec
npm install
```

## Environment setup

Copy the example environment file and fill in values as needed:

```sh
cp .env.example .env.local
```

## Run locally

```sh
npm run dev
```

## Pull request guidelines

- Keep changes focused and avoid unrelated refactors.
- Add or update tests when behavior changes.
- Ensure `npm run lint` and `npm run build` pass before opening a PR.
- Describe what changed and why in the PR description.
