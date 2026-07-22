#!/usr/bin/env bash
# Rebuild the Cloudflare Pages direct-upload bundle.
# Produces a clean folder + zip that EXCLUDE the confidential PDF, dev scripts
# and repo meta — mirrors the GitHub Pages deploy exclusions.
#
# Usage:  ./rebuild-bundle.sh
# Output: ~/Downloads/vultsight-site/  and  ~/Downloads/vultsight-site.zip
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
OUT="$HOME/Downloads/vultsight-site"

# Regenerate sitemap and fail loudly on SEO errors before shipping.
if command -v node >/dev/null 2>&1; then
  node "$SRC/scripts/seo.mjs" --fix
fi

rm -rf "$OUT" "$OUT.zip"
mkdir -p "$OUT"

rsync -a \
  --exclude '.git/' --exclude '.github/' \
  --exclude '_pdf/' --exclude 'scripts/' \
  --exclude '.claude/' \
  --exclude 'README.md' --exclude '.gitignore' \
  --exclude 'rebuild-bundle.sh' \
  --exclude '_site/' --exclude '.DS_Store' \
  "$SRC"/ "$OUT"/

# apex -> www redirect (site canonicals are all www)
printf 'https://vultsight.com/* https://www.vultsight.com/:splat 301\n' > "$OUT/_redirects"

# Safety checks: nothing confidential must ship.
for bad in _pdf scripts; do
  [ -e "$OUT/$bad" ] && { echo "ABORT: $bad leaked into bundle" >&2; exit 1; }
done
if find "$OUT" -name '*.pdf' | grep -q .; then
  echo "ABORT: a PDF is in the bundle" >&2; exit 1
fi

( cd "$OUT" && zip -rq ../vultsight-site.zip . -x '.DS_Store' )

echo "Bundle ready:"
echo "  folder: $OUT"
echo "  zip:    $OUT.zip  ($(find "$OUT" -type f | wc -l | tr -d ' ') files)"
echo
echo "Deploy:  npx wrangler pages deploy \"$OUT\" --project-name=vultsight"
echo "   or drag $OUT.zip into Cloudflare Pages > Upload assets"
