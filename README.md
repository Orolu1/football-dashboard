# Football Intelligence Dashboard · Verified history edition

## Deploy
Extract the ZIP and upload the complete `football_verified_history_site` folder to your EXISTING Netlify site's Deploys page. Ensure `index.html` and the `data/verified_history.json` file are in the same root folder. Do not upload just the HTML.

## Coverage
Historical statistics computed from the user's 12 attached Premier League CSVs and 47 CSV files accessed from the supplied Google Drive folder. Duplicate 2025/26 exports were ignored. Historical coverage: Premier League 10/10 seasons, La Liga 10/10, Bundesliga 10/10, Ligue 1 10/10 (2019/20 curtailed to 279 games), Serie A 9/10 (missing 2016/17). All five 2026/27 CSV snapshots included as of 30 Oct 2026.

## Features
Current-season ranking for five domestic leagues; league averages, team shots and corners won/conceded; ten-season charts; season-by-season numeric averages; full-season and opening-eight comparison toggle; CSV export, fixture fetch and optional current-season refresh. Champions League remains dependent on existing free live source; no fabricated Champions League historical numbers.

## Refresh behaviour
Historical history is precomputed and served as a local JSON file so browsers do not request dozens of files from football-data.co.uk. The current domestic season starts with the supplied CSV snapshot; a daily public feed can supersede it only when its match data is strictly newer AND its per-metric coverage is no worse. If the remote feed is unavailable, the verified snapshot stays visible. This package is not a real-time in-play feed. Historical data will not update until the JSON is regenerated.

## Caveats
Per-match total goals = FTHG+FTAG; corners = HC+AC; shots = HS+AS; SOT = HST+AST; cards = HY+AY+HR+AR. Missing match fields are excluded metric-by-metric, not counted as 0. Team-specific shots and SOT count only the named team's attempts. Opening-eight cohort uses games where BOTH clubs were each making one of their first eight league appearances; postponements mean sample can be below 8 × club count / 2. The previous 10 completed seasons are 2016/17–2025/26. Serie A 2016/17 source must be uploaded before a complete 10-year baseline is possible. 2019/20 Ligue 1 is genuinely curtailed. League structural changes are not fully harmonised.

## Files
`data/verified_history.json` – compact seasonal aggregates and 2026/27 team averages; `DATA_AUDIT.csv` – match counts and metric coverage by season; `index.html` – main dashboard; one HTML page per league.

## Rights
Historical source files were supplied by the user. Only aggregated derived measures are distributed in this site package. Review source licensing and permitted public use before a broad commercial launch.
