# 2026-05-04 Obsidian-first Development Plan

## Why This Document Exists

Today we paused implementation and reframed Vibelog's next development direction.

The important shift:

> Vibelog should not only store daily learning logs. It should become a system that helps me rediscover older learning records conceptually when the data grows too large to remember by list browsing.

This document is a development planning record for tomorrow. It is intentionally separate from `DEVLOG.md` because this is not an implemented change yet. It describes the next direction before code work begins.

## Core Direction

Use Obsidian as the original source of learning records.

```text
Obsidian note writing
↓
npm run import-obsidian
↓
Analyze and transform notes
↓
Upload structured data to Supabase
↓
View and rediscover records in Vibelog web
```

## Roles

### Obsidian

Obsidian is the local source of truth.

- Stores original Markdown files
- Keeps the user's knowledge independent from the web app
- Supports links like `[[Supabase]]`, `[[RLS]]`, and tags
- Can later be read by LLM tools, MCP, or RAG-style systems

### Vibelog

Vibelog is the web interface built on top of the Obsidian records.

- Shows daily logs
- Shows concept-centered views
- Helps revisit old records
- Turns local Markdown notes into a web-readable learning memory

### Supabase

Supabase is not the permanent original record in this direction.

It is the processed data store for the web app.

- Stores imported notes
- Stores extracted concepts
- Stores note-concept relationships
- Stores links between notes/concepts

### LLM

The LLM should not be the source of truth.

The LLM's position:

> A knowledge connection engine beside the Obsidian vault.

Possible LLM roles:

- Extract concept candidates from new notes
- Suggest Obsidian links like `[[Supabase]]`, `[[RLS]]`, `[[Vercel]]`
- Find related older notes
- Remind the user: "This is connected to something you worked on before"
- Transform records into SNS posts, expert summaries, or concept notes
- Help explain old concepts again at the user's current level

## Problem We Are Solving

When there are only a few records, list browsing works.

But after 100, 300, or more records:

- The user may forget what they learned
- The user may not know what keyword to search
- Date-based browsing becomes weak
- Old work needs to be resurfaced in the context of new work

So Vibelog should support:

- Date-based memory
- Concept-based memory
- Related-record recall
- Eventually LLM-based resurfacing

## First Technical Plan

Start without LLM automation.

First build a reliable Obsidian import foundation.

1. Define Obsidian vault folder structure
   - Example: `Daily/`, `Concepts/`, `Projects/`
2. Define Markdown frontmatter format
   - Example fields: `type`, `date`, `concepts`, `status`, `source`
3. Build `npm run import-obsidian`
   - Read `.md` files from the vault
   - Parse frontmatter
   - Extract `[[wikilinks]]`
   - Extract tags
   - Distinguish daily notes and concept notes
4. Reconsider Supabase schema
   - Possible tables: `notes`, `concepts`, `note_concepts`, `links`, `imports`
5. Redesign Vibelog views
   - Daily log view
   - Concept view
   - Related-record/recall view
6. Add LLM later
   - First use tags and links
   - Then add LLM-based concept extraction and memory recall

## Open Questions For Tomorrow

1. Where is the actual Obsidian vault folder?
2. Should Vibelog create Obsidian notes, or only import them?
3. What should the first note format look like?
4. Should existing `DEVLOG.md` content be migrated into Obsidian?
5. Should the first implementation use only local scripts, or also update the web UI immediately?

## Working Definition

> Vibelog is a learning recall system that imports local Obsidian Markdown notes, restructures them by concept, and eventually uses LLM support to reconnect past learning with current work.
