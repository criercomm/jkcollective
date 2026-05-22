# Press PDFs localized

The press article links now point to local files instead of `collectiveartdesign.com`. After this, your site has **zero** external dependencies on the old WP host.

## Files in this bundle

| Path | Notes |
| --- | --- |
| `data.standalone.js` | Press URLs rewritten from `https://collectiveartdesign.com/...` → `assets/press/...`. |
| `assets/press/*.pdf` | 7 PDFs (total ~25MB): Elle Decor, WSJ, Galerie, Departures, HCG, Modern Luxury, Interior Design. |

## How to deploy

Same as before — drop these into your `jkcollective` repo (preserving paths), commit, push. The Cloudflare project (manual upload mode) won't auto-redeploy though, so you'll still need to do **New deployment → drag the updated `deploy/` folder** as you did last time.

Or, if you want, I can put together a single complete deploy folder again (everything bundled fresh) so you can just drag it. Let me know.
