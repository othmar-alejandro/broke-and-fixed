# Twilio to GHL: what is done, what is blocked (25 Aug 2026)

## Account facts (verified in console, not assumed)

| Thing | Value |
|---|---|
| Twilio account | My First Twilio Account, `AC[REDACTED, see Twilio console]` |
| A2P Brand | Broke & Fixed Home Solutions, `BN01d22078eb7bfbc672025dfe8f0ff888` — **Approved**, Low volume standard |
| A2P Campaign | `CMabdfe5e13267af22043ca282a015694e` — **Approved**, LOW_VOLUME Mixed, ext ID CH1BC2J |
| Messaging Service | "Doing it Right!", `MG7f06f5dfcc77600f41d578772712294c` |
| Number | +1 754-297-0029, `PN55af5b13666089fde586fd365e651e94` — **REGISTERED** to the campaign |
| GHL agency | OAC Digital Innovations, on **LC Phone** |
| GHL sub-account | Broke and Fixed Home Solutions, location ID `BubbBDEstaWhTJReHDcG` |
| That sub-account's phone provider | **None.** "Your phone system requires configuration." |

## Done

Twilio is fully wired for GHL. All four webhooks set, saved, and re-read from the
console to confirm they persisted.

**Messaging Service "Doing it Right!" → Settings → Inbound messages**
Changed from "Defer to sender's webhook" to **Send a webhook**:
- Request URL: `https://services.leadconnectorhq.com/appengine/twilio/incoming_message` (HTTP POST)
- Fallback URL: same (HTTP POST)

This is the one that matters most. The number is in a Messaging Service, and a
Messaging Service overrides the number's own webhook config. Left on "Defer" with an
empty number-level webhook, every inbound text would have vanished silently.

**Number +1 754-297-0029 → Voice configuration (US1)**
- A call comes in: Webhook → `https://services.leadconnectorhq.com/phone-system/voice-call/inbound` (POST)
- Call status changes: `https://services.leadconnectorhq.com/appengine/twilio/incoming_call_status` (POST)

**Number → Messaging configuration (US1)**
- A message comes in: Webhook → `https://services.leadconnectorhq.com/appengine/twilio/incoming_message` (POST)

Redundant while the Messaging Service is in play, but it means the number still works
if it is ever pulled out of the service.

Routing region was already US1 on both. No change needed.

## Blocked on you

### 1. GHL will not let me connect Twilio. There is no self-serve path on this account.

Checked every surface: Agency → Settings → Phone Integration → Agency Settings shows
"Connected to LeadConnector" with only a "Connect to LC Phone" quick link. Sub Account
Settings shows the Broke and Fixed row as "Not available"; its only menu action is
"Link to LeadConnector". The Account Creation tab has no provider choice. The
sub-account's own Phone System page says "Please reach out to our support team."

That matches GHL's documented behavior: once an agency is on LC Phone, attaching your
own Twilio to a location goes through the **Disable LC Phone form**, which GHL support
processes manually.

I deliberately did **not** click "Link to LeadConnector." That would put the location on
LC Phone, and A2P does not migrate to LC. Your approved brand and campaign would be
stranded and you would re-register and pay again.

**What you do:** submit the Disable LC Phone form.

**https://link.gohighlevel.com/widget/form/ItLl5XOY2IQcSI8iDkiR**

Linked from GHL's article "How to Disable LC Phone System for Subaccount/Location
(LC to Twilio)", step 4. Verified live 25 Aug 2026.

| Field | Value |
|---|---|
| Your name | Othmar Casilla |
| Email for the request | your GHL login email |
| Location ID to disable LC Phone | `BubbBDEstaWhTJReHDcG` |
| Your own Twilio Account SID | `AC[REDACTED, see Twilio console]` |
| Your own Twilio Auth token | Twilio console home, "Show" next to Auth Token |
| Sub-account list upload | skip, bulk only |

Then two checkboxes, Cloudflare check, Submit.

**About the first checkbox.** It reads: "All phone numbers currently in this location
will be released... This step is irreversible... All A2P brands and campaigns will be
removed."

Less alarming than it looks here. Broke and Fixed has zero phone numbers in GHL, so
there is nothing to release. The A2P clause refers to brands and campaigns registered
inside GHL/LC for that location, and you have none there. Your approved brand and
campaign sit in your own Twilio account, registered directly with Twilio and TCR, out of
GHL's reach.

That is a reading of the wording, not a guarantee from GHL, and the step is irreversible.
If you want it nailed down first, ask support to confirm in writing that Twilio-side
`BN01d22078eb7bfbc672025dfe8f0ff888` and `CMabdfe5e13267af22043ca282a015694e` are
untouched. Costs a day, removes the doubt.

The second checkbox is about sending traffic to your own Twilio while an LC sub-account
is suspended. Not applicable, nothing is suspended.

I can't fill this one. Entering API tokens into forms is off-limits for me, and this
one is a support request that provisions telephony besides. Typical turnaround is a few
business days, so file it now.

### 2. Twilio balance is negative: −$21.15

Account still reads Active, but a negative balance blocks sending. Fund it and turn on
auto-recharge before you test anything, or the first test will fail for a reason that
has nothing to do with the integration and you will chase the wrong bug.

## After GHL connects the location

1. Confirm +1 754-297-0029 appears under sub-account → Settings → Phone System → Phone
   Numbers, with the green **A2P Verified** badge.
2. Text the number from your phone. It should land in Conversations.
3. Call the number. It should route per your GHL call settings.
4. If inbound text fails: Twilio → Monitor → Logs → Messaging, test phone in the **From**
   field, open the message, Request Inspector. A 404/5xx means the webhook is wrong; a
   "Delivered" with nothing in GHL means the location mapping is wrong.
5. If the caller hears "not in service," GHL is returning that TwiML because the number
   is not mapped to the location. GHL-side fix, not Twilio.

## Two things worth a decision

**The number is a 754.** That is Broward. The business is Kendall, Miami-Dade, where
people expect 305 or 786. A Broward number on a Miami-Dade home remodeling company reads
slightly off to a local, and it is cheap to fix now and expensive later once it is on
truck magnets and the GBP listing. If you want to swap it, do it before you burn the
carrier ramp-up on this number, and note the new one has to go into the sender pool and
re-register.

**Caller Name Lookup is Disabled.** GHL recommends enabling it. It bills per lookup, so
I left your setting alone rather than adding a per-call cost you did not ask for. Flip it
in the number's voice config if you want caller names.
