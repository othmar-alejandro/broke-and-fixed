"""Publish the 13 T2S workflows in the safe order, repairing wiped settings.

Run it yourself from a terminal (the agent is permission-blocked from
executing it):

    cd "/Users/othmarcasilla/GHL CLI BUILD" && .venv/bin/python \
      /Users/othmarcasilla/broke-and-fixed-305/scripts/publish-t2s-workflows.py

Dry-run first (default). Add --apply to write.

What it does, per workflow, in order (exits first):
  1. GET the full record.
  2. PUT it back via the auto-save endpoint with status=published and the
     correct stopOnResponse (repairs the two wiped 01 EN/ES settings).
  3. Re-read the record and the trigger; report status + trigger active.
  4. ABORT the run if any workflow comes back inconsistent, so a partial
     publish never goes unnoticed.

After publishing, workflow 98 runs first in the order so the exit web
exists before any messaging workflow can enroll anyone.
"""
import json
import sys
import uuid

sys.path.insert(0, "/Users/othmarcasilla/GHL CLI BUILD")

from ghl_cli.ghl.config import Config
from ghl_cli.ghl.firebase import InternalAuth
from ghl_cli.ghl.internal import InternalAPI, _BACKEND

# (label, workflow id, stopOnResponse) in publish order: exits, 01s, 02s,
# 03s, 04s, Router, 05s. SoR True on all ten messaging flows, False on the
# three utility flows (98, 99, Router) per the audited spec.
PLAN = [
    ("98 Estimator Started Exit", "f272cec7-c36e-47ac-aede-6778ead85704", False),
    ("99 Reply Exit", "28eb10e3-3fe1-4e33-8e12-ea18f1a9d3d7", False),
    ("01 EN Speed to Lead", "9a88f20e-6742-4b9a-b860-e03be3c86e08", True),
    ("01 ES Speed to Lead", "c269e23d-bc6a-44ec-b409-2f8150314a42", True),
    ("02 EN Guide Delivery", "76ecbfb6-face-4f4e-8de3-4468596f1a2a", True),
    ("02 ES Guide Delivery", "f036d091-1469-4457-9048-6a9e866d1f9b", True),
    ("03 EN Estimate Nurture", "8453b836-0a81-4327-92d6-fb3b3e71e1fc", True),
    ("03 ES Estimate Nurture", "97ee022d-09d0-4d43-a744-1ca32a692110", True),
    ("04 EN Guide to Estimate", "7e4aa209-5c68-4dd8-b9dd-6c6f05226937", True),
    ("04 ES Guide to Estimate", "ce611a7d-5668-431b-8a97-fdbc6f072ade", True),
    ("05 Router", "4eb5aada-c5a3-4c99-82fb-6b7240c59af3", False),
    ("05 EN Proposal Follow Up", "7ddd7d41-8b37-4df5-b0d8-59d2fdb417fd", True),
    ("05 ES Proposal Follow Up", "c8b25784-96cd-4f99-98ac-52b7d8212cd2", True),
]

APPLY = "--apply" in sys.argv

cfg = Config.load(allow_missing_token=True, load_credentials=True)
api = InternalAPI(InternalAuth(cfg.load_internal_credential()))
loc = api.location_id


def read_state(wf_id):
    rec = api.get_workflow(wf_id)
    wf = rec.get("workflow", rec)
    wd = wf.get("workflowData") or {}
    steps = wd.get("templates") or []
    raw = json.loads(api._get(f"{_BACKEND}/workflow/{loc}/trigger?workflowId={wf_id}"))
    trigs = raw if isinstance(raw, list) else raw.get("triggers", [])
    return wf, {
        "status": wf.get("status", "<missing>"),
        "sor": wf.get("stopOnResponse"),
        "steps": len(steps),
        "triggers": [(t.get("type"), t.get("active")) for t in trigs],
    }


failures = []
for label, wf_id, want_sor in PLAN:
    wf, before = read_state(wf_id)
    if not APPLY:
        print(f"DRY {label:26s} {json.dumps(before)}")
        continue

    body = dict(wf)
    body.update(
        {
            "status": "published",
            "stopOnResponse": want_sor,
            "triggersChanged": False,
            "newTriggers": [],
            "modifiedSteps": [],
            "createdSteps": [],
            "deletedSteps": [],
            "isAutoSave": False,
            "autoSaveSession": str(uuid.uuid4()),
        }
    )
    api._write("PUT", f"{_BACKEND}/workflow/{loc}/{wf_id}/auto-save", body)

    _, after = read_state(wf_id)
    ok = (
        after["status"] == "published"
        and after["sor"] == want_sor
        and after["steps"] == before["steps"]
    )
    trig_ok = all(a for _, a in after["triggers"]) or label.startswith("05 E")
    print(
        f"{'OK ' if ok else 'FAIL'} {label:26s} status={after['status']} "
        f"SoR={after['sor']} steps={before['steps']}->{after['steps']} "
        f"triggers={after['triggers']}{'' if trig_ok else '  <-- TRIGGER STILL INACTIVE'}"
    )
    if not ok:
        failures.append(label)
        print("ABORTING: fix the workflow above in the UI before continuing.")
        break
    if not trig_ok:
        failures.append(label + " (trigger inactive)")

if APPLY:
    print()
    if failures:
        print("NOT CLEAN:", "; ".join(failures))
        print("If triggers stayed inactive, open each workflow in the GHL UI")
        print("and re-save/publish it there; the UI activates triggers.")
        sys.exit(1)
    print("All 13 published. Triggers active. Run the live test next.")
