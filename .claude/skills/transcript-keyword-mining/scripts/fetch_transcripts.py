#!/usr/bin/env python3
"""Fetch plain-text transcripts for YouTube videos.

Order of attempts per URL:
  1. yt-dlp auto/uploaded subtitles (no API key needed)
  2. Apify YouTube transcript actor (needs APIFY_TOKEN env var)

Transcripts are written to .cache/transcripts/<video_id>.txt relative to the
current working directory. Exits non-zero if nothing could be fetched so the
caller knows not to proceed with fabricated content.

Usage:
  python3 fetch_transcripts.py "<url>" ["<url>" ...]
"""

import json
import os
import re
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path

OUT_DIR = Path(".cache/transcripts")


def video_id(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    if parsed.hostname in ("youtu.be",):
        return parsed.path.lstrip("/")
    qs = urllib.parse.parse_qs(parsed.query)
    if "v" in qs:
        return qs["v"][0]
    # /shorts/<id> or /embed/<id>
    parts = [p for p in parsed.path.split("/") if p]
    return parts[-1] if parts else url


def strip_vtt(raw: str) -> str:
    """Turn WebVTT/SRT into deduped plain text."""
    lines = []
    for line in raw.splitlines():
        line = line.strip()
        if not line or line.startswith(("WEBVTT", "Kind:", "Language:")):
            continue
        if "-->" in line or re.fullmatch(r"\d+", line):
            continue
        line = re.sub(r"<[^>]+>", "", line)  # inline timing tags
        if lines and lines[-1] == line:
            continue
        lines.append(line)
    return "\n".join(lines)


def try_yt_dlp(url: str, vid: str) -> str | None:
    if not _which("yt-dlp"):
        return None
    tmpl = str(OUT_DIR / f"{vid}.%(ext)s")
    cmd = [
        "yt-dlp", "--skip-download",
        "--write-auto-subs", "--write-subs",
        "--sub-langs", "en.*,es.*",
        "--sub-format", "vtt",
        "-o", tmpl, url,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True, timeout=120)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return None
    for sub in sorted(OUT_DIR.glob(f"{vid}.*.vtt")):
        text = strip_vtt(sub.read_text(encoding="utf-8", errors="ignore"))
        sub.unlink(missing_ok=True)
        if text:
            return text
    return None


def try_apify(url: str) -> str | None:
    token = os.environ.get("APIFY_TOKEN")
    if not token:
        return None
    actor = "pintostudio~youtube-transcript-scraper"
    api = f"https://api.apify.com/v2/acts/{actor}/run-sync-get-dataset-items?token={token}"
    payload = json.dumps({"videoUrl": url}).encode()
    req = urllib.request.Request(api, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            items = json.loads(resp.read())
    except Exception:
        return None
    chunks = []
    for item in items:
        data = item.get("data") or item.get("transcript") or []
        if isinstance(data, list):
            chunks.extend(seg.get("text", "") for seg in data if isinstance(seg, dict))
        elif isinstance(item.get("text"), str):
            chunks.append(item["text"])
    text = " ".join(c for c in chunks if c).strip()
    return text or None


def _which(binary: str) -> bool:
    return subprocess.run(["which", binary], capture_output=True).returncode == 0


def main(urls: list[str]) -> int:
    if not urls:
        print(__doc__)
        return 2
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ok, failed = [], []
    for url in urls:
        vid = video_id(url)
        text = try_yt_dlp(url, vid) or try_apify(url)
        if text:
            dest = OUT_DIR / f"{vid}.txt"
            dest.write_text(text, encoding="utf-8")
            print(f"OK   {vid}  ->  {dest}  ({len(text)} chars)")
            ok.append(vid)
        else:
            print(f"FAIL {vid}  ({url})")
            failed.append(vid)

    if failed and not ok:
        print(
            "\nNo transcripts fetched. Install one of:\n"
            "  pip install -U yt-dlp        # free, no key\n"
            "  export APIFY_TOKEN=...       # Apify transcript actor\n"
            "Or paste transcripts manually into .cache/transcripts/<id>.txt",
            file=sys.stderr,
        )
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
