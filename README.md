# News Feed Eradicator site lists

This repository contains [News Feed Eradicator](https://github.com/jordwest/news-feed-eradicator)'s site list configurations.

If a site is broken and no longer eradicating, this is the repository to change.

Commits to the `main` branch build the configuration and make it available at [https://jordwest.github.io/news-feed-eradicator-lists/sitelist.json](https://jordwest.github.io/news-feed-eradicator-lists/sitelist.json).

Currently these are bundled in to News Feed Eradicator on each release, but in future the plan is to dynamically fetch them for faster updates when a site breaks.

## Local dev

Clone the repo, run `pnpm install` and `pnpm build`. The built sitelist.json can be found in `/dist`.
