---
name: mtw-music-discovery
description: Find new music for Matt to review and put it straight into the MTW soundtrack library as candidates - songs similar to one track (the Find similar button at /m/soundtrack in MTW Studio, or a song Matt names), songs like his approved list, or what is trending or popular - from Pixabay Music through a real browser tab, with each track's exact credit, its audio and its profile, so Matt can play, rate and approve each one in MTW Studio. Use when Matt asks for more songs, songs like a track, or when Studio's Soundtrack module has open Find similar requests. Not for taking in files Matt downloaded himself (mtw-soundtrack intake) or choosing a song for a page (mtw-soundtrack, mtw-beat-comic).
---

# MTW music discovery

Read `discussion/spec.md` first ("Soundtrack library", "Music discovery"): it wins over this skill. The process and its current facts are in [wiki/site/music-discovery.md](../../../wiki/site/music-discovery.md); this skill holds the method. The library itself is the `mtw-soundtrack` skill's.

**What it does.** Matt reviews music by listening, not by reading lists (Matt, 2026-10-02: "i need to scroll through and approve more songs"). A discovery run therefore ends with every pick **in the library**: credited, downloaded, profiled and marked `candidate`, so Studio's Soundtrack module plays it with its beat grid and frequency lane and one click approves it. Nothing a run adds is approved; only Matt's Approve button (or his words) approves a track.

## Kinds of run

| Kind | `--method` | Where the picks come from |
|---|---|---|
| Like one song | `similar` | A Studio Find similar request (`discovery.json`, `status: "open"`), or a song Matt names. Read the basis track's title, genre, moods and profile (tempo, feel, brightness); search its instruments, genre and mood words. Record `--basis <track id>` and `--request <request id>`. |
| Like the approved list | `taste` | The genres, moods and tempos most common among approved tracks, weighted to those Matt rated highest and those in use (`usedBy`). |
| Trending / popular / editor's choice | `trending`, `popular`, `editors` | Pixabay's own orders: `trending`, the default (popular), `ec`. Unfiltered by query, or within the library's main genres. |

Default size: 50 per request unless Matt says otherwise. A mixed request ("similar to my approved list or trending") is split into separate runs, one per kind, so the "Found by" filter at `/m/soundtrack` in Studio tells them apart.

## The run

1. **Start MTW Studio** if it is not running: `npm run studio` (background; http://127.0.0.1:8792). Open requests are in `wiki/soundtrack-library/discovery.json`.
2. **Open one real Chrome tab on https://pixabay.com/** (Claude in Chrome). Pixabay refuses scripted requests (403) and challenges headless browsers; never try to get round that. Run the text of [scripts/pixabay-collect.js](scripts/pixabay-collect.js) in the tab once: it defines `mtwSearch`, `mtwCollect`, `mtwShow` and `mtwSave`.
3. **Search.** `mtwSearch(query, { order, pages })` returns track ids in Pixabay's order. Pass the library's existing Pixabay ids into the tab and drop them. Calls longer than about 40 s time out in the browser tool: start long loops without awaiting them (store results on `window`), then poll.
4. **Read each pick's track page.** `mtwCollect(ids)` reads the JSON-LD: exact title and artist as published, canonical page, genres, moods, Content ID mark, length, publish date, the CDN audio file and views, downloads and likes. Read about twice as many as you need: filters remove some.
5. **Choose.** Instrumentals only (no vocal, voice, singing, choir or lyrics tags, and no "Vocal" genre: Pixabay files some vocal songs that way with no vocal keyword); nothing seasonal; 75 to 240 s unless the request says otherwise; no near-duplicate re-uploads; nothing already in the library. Spread across artists (at most three per artist in a run). For `similar`, rank by closeness to the basis first and popularity second; for `trending`/`popular`, keep Pixabay's order. Write one plain "why it fits" line per pick (Studio shows it) from the published genre, mood and instruments: nothing has been heard yet, so never claim a sound you have not checked.
6. **Get the records out of the tab.** The browser tool returns only about 1,000 characters, and Chrome may hold a page's request to `localhost` behind a local-network permission prompt (do not grant browser permissions). Use `mtwShow(records)` and read them with `get_page_text`, then save them as `wiki/soundtrack-library/records/discovery-<date>-<slug>.json` (`{ name, saved, from, records }`). `mtwSave(name, records, from)` posts straight to Studio's `/api/collected` (default port 8792; pass another if Studio printed one) instead, where Chrome allows it.
7. **Register:** `node .claude/skills/mtw-music-discovery/scripts/register-candidates.mjs --records <file> --run <date>-<slug> --label "<date>: <what it was>" --method <kind> [--basis <id>] [--request <id>] [--why <json>] [--ids <ordered picks>] [--queries "q1; q2"] [--read <n read>]`. It applies the filters again, downloads each audio file from Pixabay's CDN into `assets/` (never over an existing file), adds the candidates to `sources.json` with their full credit and a `discovery` block (run, rank, basis, why, Content ID, moods, length, popularity), records the run in `discovery.json` and closes the request. Try `--dry` first.
8. **Profile and check:** `node .claude/skills/mtw-soundtrack/scripts/soundtrack.mjs build` (about 5 s a track), then `... check` until it prints no PROBLEM.
9. **Show Matt:** open `http://127.0.0.1:8792/m/soundtrack` in MTW Studio with Status: Candidates and Found by: the run, play two or three, and give him the link. Record the run's counts in [wiki/site/music-discovery.md](../../../wiki/site/music-discovery.md).

## Review in MTW Studio (what Matt does)

Open `/m/soundtrack` in MTW Studio (`npm run studio`, http://127.0.0.1:8792). Each row plays on click and carries 1-5 stars and an **Approve** button; the detail panel adds **Approve for use**, **Undo approval** (only for a Studio approval no page uses yet), **Find similar songs** and the "Found ... like ..." line. Every click is saved to `sources.json` (`status`, `approved`, `approvedVia: "console"`, `rating`) or `discovery.json` (requests), logged in `wiki/soundtrack-library/decisions.jsonl`, and the manifest is rebuilt. `soundtrack.mjs serve` is retired.

## Rules

- A candidate is never used on a page: `beat-comic-audit.mjs` fails a comic whose song is not approved.
- Content ID: Pixabay marks some tracks "Content ID Registered". It does not matter on the website, but a YouTube upload with that music may be claimed. Record it (`cid`); Studio shows it.
- Keep every run's records file and `discovery.json` entry: they are the provenance for why a track is in the library.
- Repair a reusable defect here and in the other edition identically (`.codex/skills/mtw-music-discovery/`).
