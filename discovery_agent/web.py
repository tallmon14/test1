"""Local web interface for the MDM Discovery Agent.

A dependency-free server built on http.server. It serves a single-page UI
(static/index.html) and a small JSON API that reuses the same store/framework
logic as the CLI, so the browser and command line never drift apart.

Run with:  python3 -m discovery_agent web
Then open: http://127.0.0.1:8765
"""

import json
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

from . import framework, store

STATIC_DIR = Path(__file__).resolve().parent / "static"


def _account_detail(slug):
    found = store.find_by_slug(slug)
    if not found:
        return None
    name, text = found
    sections = store.parse_sections(text)
    meddpicc = []
    filled = 0
    for field, hint in framework.MEDDPICC:
        val = store.get_field(text, field)
        if val:
            filled += 1
        meddpicc.append({"field": field, "hint": hint, "value": val})
    signals = framework.detect_signals(sections.get("Pain Points", ""))
    return {
        "name": name,
        "slug": slug,
        "snapshot": {
            "stage": store.get_field(text, "Stage") or "Discovery",
            "owner": store.get_field(text, "Owner"),
            "created": store.get_field(text, "Created"),
            "updated": store.get_field(text, "Last updated"),
        },
        "meddpicc": meddpicc,
        "score": {"filled": filled, "total": len(framework.MEDDPICC)},
        "sections": {
            "landscape": _clean(sections.get("Current Data Landscape", "")),
            "pain": _clean(sections.get("Pain Points", "")),
            "next_steps": _clean(sections.get("Next Steps", "")),
            "notes": _clean(sections.get("Discovery Notes", "")),
        },
        "signals": [
            {"label": s["label"], "value": s["value"],
             "products": s["products"], "followup": s["followup"]}
            for s in signals
        ],
    }


def _clean(body):
    """Hide the italic placeholder text from edit fields."""
    body = (body or "").strip()
    if body.startswith("_(") and body.endswith(")_"):
        return ""
    return body


class Handler(BaseHTTPRequestHandler):
    server_version = "DiscoveryAgent/0.1"

    # --- helpers ---------------------------------------------------------
    def _send_json(self, obj, status=200):
        payload = json.dumps(obj).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def _send_file(self, path, content_type):
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if not length:
            return {}
        try:
            return json.loads(self.rfile.read(length).decode("utf-8"))
        except (ValueError, UnicodeDecodeError):
            return {}

    def log_message(self, *args):
        pass  # keep the console quiet

    # --- routing ---------------------------------------------------------
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path in ("/", "/index.html"):
            return self._send_file(STATIC_DIR / "index.html", "text/html; charset=utf-8")

        if path == "/api/accounts":
            return self._send_json({"accounts": store.list_accounts()})

        if path == "/api/questions":
            stage = (parse_qs(parsed.query).get("stage") or ["discovery"])[0]
            groups = framework.STAGE_TO_GROUPS.get(stage)
            if not groups:
                return self._send_json({"error": "unknown stage"}, 400)
            data = [{"title": framework.QUESTION_BANK[g]["title"],
                     "questions": framework.QUESTION_BANK[g]["questions"]} for g in groups]
            return self._send_json({"stage": stage, "groups": data,
                                    "stages": list(framework.STAGE_TO_GROUPS.keys())})

        if path.startswith("/api/accounts/"):
            slug = path[len("/api/accounts/"):]
            detail = _account_detail(slug)
            if detail is None:
                return self._send_json({"error": "not found"}, 404)
            return self._send_json(detail)

        return self._send_json({"error": "not found"}, 404)

    def do_POST(self):
        path = urlparse(self.path).path
        body = self._read_body()

        if path == "/api/accounts":
            name = (body.get("name") or "").strip()
            if not name:
                return self._send_json({"error": "name required"}, 400)
            if store.account_path(name).exists():
                return self._send_json({"error": "account already exists",
                                        "slug": store.slugify(name)}, 409)
            store.write(name, store.new_brief(name, body.get("owner", "")))
            return self._send_json({"slug": store.slugify(name)}, 201)

        # /api/accounts/<slug>/map  and  /api/accounts/<slug>/note
        if path.startswith("/api/accounts/"):
            rest = path[len("/api/accounts/"):]
            slug, _, action = rest.partition("/")
            found = store.find_by_slug(slug)
            if not found:
                return self._send_json({"error": "not found"}, 404)
            name = found[0]
            if action == "map":
                store.apply_map(name)
                return self._send_json(_account_detail(slug))
            if action == "note":
                note = (body.get("text") or "").strip()
                if not note:
                    return self._send_json({"error": "empty note"}, 400)
                store.append_note(name, note)
                return self._send_json(_account_detail(slug))

        return self._send_json({"error": "not found"}, 404)

    def do_PUT(self):
        path = urlparse(self.path).path
        if path.startswith("/api/accounts/"):
            slug = path[len("/api/accounts/"):]
            found = store.find_by_slug(slug)
            if not found:
                return self._send_json({"error": "not found"}, 404)
            name = found[0]
            body = self._read_body()
            section_map = {
                "Current Data Landscape": body.get("sections", {}).get("landscape"),
                "Pain Points": body.get("sections", {}).get("pain"),
                "Next Steps": body.get("sections", {}).get("next_steps"),
            }
            sections = {k: v for k, v in section_map.items() if v is not None}
            store.save_brief(
                name,
                stage=body.get("stage"),
                owner=body.get("owner"),
                meddpicc=body.get("meddpicc") or None,
                sections=sections or None,
            )
            return self._send_json(_account_detail(slug))
        return self._send_json({"error": "not found"}, 404)


def serve(host="127.0.0.1", port=8765):
    httpd = ThreadingHTTPServer((host, port), Handler)
    url = f"http://{host}:{port}"
    print(f"MDM Discovery Agent UI running at {url}")
    print("Press Ctrl+C to stop.")
    try:
        webbrowser.open(url)
    except Exception:
        pass
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping.")
    finally:
        httpd.server_close()
