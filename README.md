# Still Rolling

A free home strength plan for grapplers over 50 with a dodgy hip or shoulder.

- All content lives in `content/program.mjs`.
- `node build.mjs` writes the static site to `dist/` (no dependencies).
- Netlify runs the same build (see `netlify.toml`).

## Adding an injury module

1. Add it to `niggles` in `content/program.mjs`.
2. Add a rule with `niggle: "<id>"`.
3. Tag exercises with the id in `for`, and add a tweak under `swaps`.
4. Remove it from `comingSoon`.

General guidance, not medical advice.
