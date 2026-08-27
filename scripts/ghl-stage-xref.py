"""Stage cross-reference for the Broke and Fixed GHL account.

Prints every pipeline with its live stages and IDs, then every workflow
whose record, triggers, or step graph references a Main Pipeline stage ID.
Run it before and after any pipeline edit. If a stage you plan to touch
shows up under a workflow you did not expect, stop.

Usage (needs the GHL CLI venv, PIT + internal credential configured there):

    cd "/Users/othmarcasilla/GHL CLI BUILD" && .venv/bin/python \
        /Users/othmarcasilla/broke-and-fixed-305/scripts/ghl-stage-xref.py

Note: the CLI's own `pipelines list` 404s because GHL moved the endpoint
to /opportunities/pipelines. This script hits the current endpoint.
"""
import json
import sys

sys.path.insert(0, "/Users/othmarcasilla/GHL CLI BUILD/ghl_cli")

from ghl.config import Config
from ghl.client import GHLClient
from ghl.firebase import InternalAuth
from ghl.internal import InternalAPI, _BACKEND

MAIN_PIPELINE_ID = "o4y21VMkOnoU1iPoRRXZ"

config = Config.load()

# --- live pipelines and stages (documented API, current endpoint) ---
client = GHLClient(config)
data = client.request(
    "GET", "/opportunities/pipelines", query={"locationId": config.location_id}
)

stages = {}  # id -> name, Main Pipeline only
for p in data.get("pipelines", []):
    print(f"PIPELINE {p['name']}  id={p['id']}")
    for s in p.get("stages", []):
        print(f"  stage {s.get('position', '?'):>3}  {s['name']}  id={s['id']}")
        if p["id"] == MAIN_PIPELINE_ID:
            stages[s["id"]] = s["name"]

# --- which workflows reference which Main Pipeline stage IDs ---
api = InternalAPI(InternalAuth(config.load_internal_credential()))
workflows = api.list_workflows()
print(f"\n{len(workflows)} workflows. Stage references in Main Pipeline:")

for wf in sorted(workflows, key=lambda w: w.get("name", "")):
    wid = wf.get("id") or wf.get("_id")
    name = wf.get("name", "?")
    status = wf.get("status", "?")

    # record + triggers in one fetch; step graph separately
    record_blob = api._get(
        "{}/workflow/{}/{}?includeTriggers=true".format(_BACKEND, api.location_id, wid)
    ).decode("utf-8")
    try:
        steps_blob = json.dumps(api.get_workflow_steps(wid))
    except Exception as exc:
        steps_blob = ""
        print(f"  !! {name}: steps unreadable ({exc})")

    hits = []
    for sid, sname in stages.items():
        where = []
        if sid in record_blob:
            where.append("trigger/record")
        if sid in steps_blob:
            where.append("step")
        if where:
            hits.append(f"{sname} ({'+'.join(where)})")
    if hits:
        print(f"[{status}] {name}")
        for h in hits:
            print(f"    -> {h}")
