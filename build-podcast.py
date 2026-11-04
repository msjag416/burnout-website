#!/usr/bin/env python3
"""Refresh the baked-in episode list and podcast structured data in podcast.html.

Google reads the page without running its script, so the episodes must be in the
HTML itself. This script reads the podcast RSS feed and rewrites two blocks in
podcast.html, marked by comments:

  <!-- EPISODES:START --> ... <!-- EPISODES:END -->   the episode cards
  <!-- SCHEMA:START -->   ... <!-- SCHEMA:END -->     the JSON-LD for Google

Run it after a new episode is published, then commit podcast.html:

  python3 build-podcast.py
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path

FEED_URL = "https://anchor.fm/s/1024348e4/podcast/rss"
PAGE_URL = "https://burnouttobalanceguide.com/podcast.html"
SPOTIFY_URL = "https://open.spotify.com/show/7zbvtiqGQfj40nvOmVi6Fu"
APPLE_URL = "https://podcasts.apple.com/us/podcast/burnout-to-balance/id6829690511"
NS = {"itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd"}
PAGE = Path(__file__).with_name("podcast.html")

PLAY_ICON = '<svg viewBox="0 0 24 24" class="w-5 h-5 ml-0.5" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'


def seconds(duration):
    parts = [int(p) for p in (duration or "").split(":") if p.strip().isdigit()]
    total = 0
    for p in parts:
        total = total * 60 + p
    return total


def iso_duration(secs):
    m, s = divmod(secs, 60)
    h, m = divmod(m, 60)
    out = "PT"
    if h:
        out += f"{h}H"
    if m:
        out += f"{m}M"
    if s or out == "PT":
        out += f"{s}S"
    return out


def first_paragraph(desc):
    # Episode notes are HTML; use the first paragraph's text as the summary
    m = re.search(r"<p[^>]*>(.*?)</p>", desc or "", re.S)
    text = m.group(1) if m else (desc or "")
    text = re.sub(r"<[^>]+>", "", text)
    return html.unescape(text).strip()


def load_feed(source):
    if source and Path(source).exists():
        data = Path(source).read_bytes()
    else:
        data = urllib.request.urlopen(FEED_URL, timeout=30).read()
    root = ET.fromstring(data)
    ch = root.find("channel")
    episodes = []
    for item in ch.findall("item"):
        enc = item.find("enclosure")
        if enc is None:
            continue
        pub = parsedate_to_datetime(item.findtext("pubDate"))
        secs = seconds(item.findtext("itunes:duration", namespaces=NS))
        episodes.append({
            "title": (item.findtext("title") or "").strip(),
            "audio": enc.get("url"),
            "summary": first_paragraph(item.findtext("description")),
            "date": pub,
            "secs": secs,
            "guid": (item.findtext("guid") or "").strip(),
            "link": (item.findtext("link") or "").strip(),
            "image": (item.find("itunes:image", NS).get("href") if item.find("itunes:image", NS) is not None else ""),
        })
    show = {
        "title": (ch.findtext("title") or "").strip(),
        "description": (ch.findtext("description") or "").strip(),
        "image": ch.find("itunes:image", NS).get("href"),
    }
    return show, episodes


def card(ep, number):
    date = ep["date"].strftime("%b %-d, %Y")
    length = f"{max(1, round(ep['secs'] / 60))} min" if ep["secs"] else ""
    meta = " · ".join(x for x in (date, length) if x)
    return f"""                    <li class="episode bg-white rounded-xl border border-line p-5 flex gap-4 items-start" data-audio="{html.escape(ep['audio'], quote=True)}" data-title="{html.escape(ep['title'], quote=True)}">
                        <button type="button" class="play-btn shrink-0 w-12 h-12 rounded-full bg-ink text-paper hover:bg-accent flex items-center justify-center transition-colors" aria-label="Play {html.escape(ep['title'], quote=True)}">{PLAY_ICON}</button>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-serif font-bold text-ink text-lg md:text-xl leading-snug">{html.escape(ep['title'])}</h3>
                            <p class="font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-faint mt-1.5"><time datetime="{ep['date'].date().isoformat()}">{date}</time>{(' · ' + length) if length else ''}</p>
                            <p class="clamp-2 text-muted text-sm leading-relaxed mt-2">{html.escape(ep['summary'])}</p>
                        </div>
                        <span class="hidden sm:block shrink-0 font-serif italic text-accent text-3xl leading-none pt-1 w-10 text-right" aria-hidden="true">{number}</span>
                    </li>"""


def schema(show, episodes):
    series_id = PAGE_URL + "#podcast"
    series = {
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        "@id": series_id,
        "name": "Burnout to Balance: The Workplace Survival Podcast",
        "alternateName": "Burnout to Balance Podcast",
        "url": PAGE_URL,
        "webFeed": FEED_URL,
        "image": show["image"],
        "description": show["description"],
        "inLanguage": "en",
        "genre": ["Careers", "Mental Health", "Self-Improvement"],
        "keywords": "job burnout, workplace burnout, toxic workplace, toxic boss, work stress, nurse burnout, difficult coworkers",
        "author": {"@type": "Person", "name": "Andrea Gomez", "url": "https://burnouttobalanceguide.com/"},
        "publisher": {"@type": "Person", "name": "Andrea Gomez"},
        "sameAs": [SPOTIFY_URL, APPLE_URL],
        "isBasedOn": {
            "@type": "Book",
            "name": "Burnout to Balance: Your 8-Step Guide to Thriving in a Messy Workplace",
            "author": {"@type": "Person", "name": "Andrea Gomez"},
            "url": "https://www.amazon.com/dp/B0F1L3KFLY",
        },
    }
    total = len(episodes)
    eps = []
    for i, ep in enumerate(episodes):
        eps.append({
            "@type": "PodcastEpisode",
            "name": ep["title"],
            "url": PAGE_URL,
            "datePublished": ep["date"].date().isoformat(),
            "description": ep["summary"],
            "episodeNumber": total - i,
            "timeRequired": iso_duration(ep["secs"]),
            "partOfSeries": {"@id": series_id},
            "associatedMedia": {"@type": "MediaObject", "contentUrl": ep["audio"], "encodingFormat": "audio/mpeg"},
        })
    data = [series] + eps
    return json.dumps(data, ensure_ascii=False, indent=2)


def replace_block(text, name, body):
    start, end = f"<!-- {name}:START -->", f"<!-- {name}:END -->"
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pattern.search(text):
        sys.exit(f"Marker {name} not found in podcast.html")
    return pattern.sub(lambda _: f"{start}\n{body}\n{end}", text, count=1)


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else None
    show, episodes = load_feed(source)
    if not episodes:
        sys.exit("No episodes in the feed")
    total = len(episodes)
    cards = "\n".join(card(ep, total - i) for i, ep in enumerate(episodes))
    episodes_html = f'                <ol id="episode-list" class="space-y-4">\n{cards}\n                </ol>'
    schema_html = f'    <script type="application/ld+json">\n{schema(show, episodes)}\n    </script>'
    text = PAGE.read_text(encoding="utf-8")
    text = replace_block(text, "EPISODES", episodes_html)
    text = replace_block(text, "SCHEMA", schema_html)
    text = re.sub(r'(<span id="episode-count"[^>]*>)[^<]*(</span>)', rf"\g<1>{total} episodes\g<2>", text)
    PAGE.write_text(text, encoding="utf-8")
    print(f"podcast.html updated with {total} episodes (newest: {episodes[0]['title']})")


if __name__ == "__main__":
    main()
