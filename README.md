# 8-bit pump up

A self-directed playlist of 24 pixel visualizations cut to music. Previous/next and the tracklist stay within this project.

[Open the project](https://8bit.makingthings.work/) · [Headquarters of slop](https://www.makingthings.work/experiments/)

## Reproduce

With Node 24 or later:

```sh
npm --prefix site ci
npm run build
npm test
npm run dev
```

The player is at http://127.0.0.1:8791/. No provider account, sibling checkout, private wiki or MCP server is needed. Open `claude` or `codex` in this root; [AGENTS.md](AGENTS.md) is the single instruction source, and CLAUDE.md loads it.

## Authoring

- Player and components: `site/src/components`, `site/public/scripts`.
- Authored content: `site/src/data/beat-comics`.
- Original images and catalog: `wiki/image-library`.
- Music, original audio, credits and measured beat profiles: `wiki/soundtrack-library`.
- Versioned craft, scripts and references: `.claude/skills` and `.codex/skills`.


Install the optional local Studio with `npm --prefix apps/mtw ci`, then `npm run studio`. It runs on 8792 and manages this repository only. 

Music retains its source licence and attribution in `wiki/soundtrack-library/sources.json`; the player displays its credit. Fonts retain their bundled licence notices. Third-party style reference scans and the consulting website’s private history are not bundled. Optional generation uses your own provider credentials from environment variables and requires explicit authorization.

## Deployment

Vercel runs the root `vercel.json` build command and serves `site/dist`. The .claude/.codex sources and native libraries are in Git, while uploads exclude authoring-only data.
