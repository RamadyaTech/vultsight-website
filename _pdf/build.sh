#!/usr/bin/env bash
# Rebuild the VultSight product-tour PDF from product-tour.html.
# Requires Google Chrome. Run from anywhere:  bash apps/website/_pdf/build.sh
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chromium || true)"
[ -n "$CHROME" ] || { echo "Chrome/Chromium not found"; exit 1; }

"$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=5000 \
  --print-to-pdf="$DIR/VultSight-Product-Tour.pdf" \
  "file://$DIR/product-tour.html" 2>/dev/null

echo "✓ Built $DIR/VultSight-Product-Tour.pdf"
