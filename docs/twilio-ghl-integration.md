# Twilio to GoHighLevel integration (verified Aug 2026)

## Verdict on the article you found

`help.gohighlevel.com/.../155000002824-setting-up-webhooks-...-for-twilio-user`
**Still current.** Last modified 14 Oct 2025, and the Oct 2025 edit is the part that
matters most (the Messaging Service section). Cross-checks:

- Twilio's own help center still documents the same voice webhook,
  `https://services.leadconnectorhq.com/phone-system/voice-call/inbound`
  (Troubleshooting Inbound Call Issues with Go High Level and Twilio).
- GHL's inbound-SMS troubleshooting article (modified 8 Jul 2026) still routes
  Twilio users to the same webhook check.
- No sign anywhere that GHL is killing bring-your-own-Twilio. The LC Phone team is
  adding *more* vendors (ideas.gohighlevel.com, target Q3 2026), not removing Twilio.

One thing the article does not say: **you usually should not have to do this by hand.**
Twilio's doc states that once a number is integrated with GHL, GHL manages the number's
voice config and console edits are ignored. GHL writes the webhooks automatically when
it provisions or imports a number. The article is the **fix-it path** for numbers GHL
did not configure: numbers you bought straight in the Twilio console, numbers you ported
in, and numbers sitting inside a Messaging Service.

## Do this in order

### 1. Connect Twilio first, before touching any webhook
Agency view (not sub-account) → Settings → Phone Integration / Phone System → switch
from LC Phone to your own Twilio → paste **Account SID** and **Auth Token** from the
Twilio console home page.

GHL then creates a Twilio **subaccount per GHL sub-account (location)**. Note which
subaccount SID maps to Broke & Fixed: Agency view → Settings → Phone Integration →
Sub-account Settings.

Caution: if the GHL sub-account already has LC Phone numbers, switching can drop them.
Release them via GHL support first, or start the sub-account clean.

### 2. Point the number at the approved A2P campaign
This is where an approved A2P registration still fails to send.
Campaign approval ≠ number registered. In Twilio: Messaging → Services → the Messaging
Service tied to your approved campaign → Sender Pool → add the number. Then check
Messaging → Regulatory Compliance → the number must read **Registered**, not
`UNREGISTERED`. Carrier-side number registration is async and can take days.

In GHL, confirm the number shows the green **A2P Verified** badge under
Settings → Phone System → Phone Numbers.

Sole Proprietor campaigns register exactly **one** number. Extra numbers in that
sender pool stay unregistered.

### 3. Only now, fix webhooks if inbound is broken
Adding a number to a Messaging Service **overwrites the number's own webhook config**
(Twilio documents this explicitly). That is the single most common cause of
"outbound works, inbound texts never show up in GHL."

**If the number is NOT in a Messaging Service** — Phone Numbers → Manage → Active
numbers → click the number:
- Routing region: `US1`
- Voice, "A call comes in": Webhook → POST →
  `https://services.leadconnectorhq.com/phone-system/voice-call/inbound`
- "Call status changes": POST →
  `https://services.leadconnectorhq.com/appengine/twilio/incoming_call_status`
- Messaging, "A message comes in": Webhook → POST →
  `https://services.leadconnectorhq.com/appengine/twilio/incoming_message`
- Caller Name Lookup: enabled (optional, costs per lookup)

**If the number IS in a Messaging Service** (it will be, per step 2) — Messaging →
Services → your service → **Integration** → "Send a webhook":
- Request URL: `https://services.leadconnectorhq.com/appengine/twilio/incoming_message`
- Fallback URL: same
- Save

Voice still comes from the number's own config, so set both.

### 4. Test and read the logs
Text the number from a personal phone, then call it.
- Twilio → Monitor → Logs → Messaging: put the test phone in the **From** field.
  Open the message → Request Inspector. A 404 or 5xx means the webhook is wrong.
  "Delivered" with nothing in GHL means the webhook is wrong or points at the wrong
  location.
- Twilio → Monitor → Logs → Calls → the call SID → view returned TwiML. If GHL returns
  `<Reject>` or "this number is not in service," the number is not mapped to a GHL
  location. That is a GHL-side fix, not Twilio.

## Things worth knowing

- **Do not switch to LC Phone later.** GHL's own doc says A2P does not migrate; you
  re-register and pay the fee again. Your Twilio-side approval only has value while the
  numbers stay in your Twilio account.
- LC Phone couples SMS and voice: an SMS compliance suspension kills voice on the same
  number. Direct Twilio keeps them separate. That is a real argument for staying on
  Twilio, raised repeatedly on ideas.gohighlevel.com.
- Numbers locked to a Messaging Service sometimes will not appear in GHL's import list.
  Unassign in Twilio, import in GHL, then re-add to the Messaging Service, then redo
  the Integration webhook.
- Ramp volume slowly on a new 10DLC number. Sender reputation is per-number.

## Sources
- https://help.gohighlevel.com/support/solutions/articles/155000002824-setting-up-webhooks-to-receive-incoming-calls-messages-and-status-updates-for-calls-for-twilio-user
- https://help.twilio.com/articles/38586775625371-Troubleshooting-Inbound-Call-Issues-with-Go-High-Level-and-Twilio
- https://help.twilio.com/articles/4402888763803-How-can-I-associate-Twilio-numbers-to-an-A2P-10DLC-Campaign
- https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-a2p-phone-number-registration-issues
- https://help.gohighlevel.com/support/solutions/articles/48001181601-troubleshooting-inbound-sms-showing-as-calls-or-not-appearing-at-all-
- https://help.gohighlevel.com/support/solutions/articles/48001204027-how-do-i-migrate-my-agency-and-sub-account-over-to-lc-phone-
- https://help.gohighlevel.com/support/solutions/articles/48001219820-buying-a-twilio-number-in-your-own-twilio-account-connected-to-highlevel
- https://ideas.gohighlevel.com/lcphonesystem/p/twilio-alternative
