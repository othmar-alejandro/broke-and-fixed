export interface FAQ {
  question: string
  answer: string
}

export const faqs: Record<string, FAQ[]> = {
  "bathroom-remodeling": [
    {
      question: "How long does a bathroom remodel take?",
      answer:
        "Most bathroom remodels we do in Miami-Dade take about two to four weeks from demo to final walkthrough. It depends on the scope. A simple vanity and tile swap might be done in ten days. A full gut job with new plumbing layout, shower conversion, and custom tile takes closer to a month. We give you a clear timeline before we start so there are no surprises.",
    },
    {
      question: "How much does a bathroom remodel cost?",
      answer:
        "Our bathroom remodels typically run between $8,000 and $35,000 depending on what you want done. A basic refresh with new tile, vanity, and fixtures is on the lower end. A full master bathroom with walk-in shower, custom tile, and new plumbing runs higher. We give free estimates and break everything down line by line so you know exactly where your money goes.",
    },
    {
      question: "Do you do walk-in shower conversions?",
      answer:
        "Yes, walk-in shower conversions are one of our most popular projects. A lot of homeowners in Miami-Dade are ditching old tub-shower combos for a clean, open walk-in design. We handle the plumbing changes, waterproofing, tile work, and glass installation. It opens up the space and looks way better. We can show you examples from jobs we have done in your area.",
    },
    {
      question: "Do you handle the plumbing?",
      answer:
        "We handle all the plumbing work that goes into a bathroom remodel. Moving drain lines, swapping out fixtures, installing new shower valves, all of it. If your project involves rerouting main plumbing lines, we coordinate with a master plumber to make sure everything is up to code. You do not need to hire anyone separately for that.",
    },
    {
      question: "What about permits?",
      answer:
        "For most cosmetic work like painting, tile, and fixture swaps, permits aren't needed. For anything structural or involving plumbing and electrical changes, we coordinate with the homeowner to make sure everything is handled properly.",
    },
    {
      question: "Can I use my bathroom during the remodel?",
      answer:
        "If you have a second bathroom in the house, you will use that one while we work. We always make sure you have a working bathroom available. If it is your only bathroom, we plan the work in stages to keep disruption as short as possible. We have done this plenty of times and always figure out a way to make it work.",
    },
  ],
  "kitchen-remodeling": [
    {
      question: "Can you reface existing cabinets?",
      answer:
        "Absolutely. Cabinet refacing is a great option if your cabinets are structurally solid but just look outdated. We replace the doors and drawer fronts, apply new veneer to the frames, and add updated hardware. It saves you a lot compared to a full cabinet replacement and still transforms the look of your kitchen. We do this all the time in Miami-Dade homes.",
    },
    {
      question: "How much does a full kitchen remodel cost?",
      answer:
        "A full kitchen remodel with us typically runs between $12,000 and $50,000. The range is wide because kitchens vary a lot. A smaller kitchen with stock cabinets and laminate counters is very different from a large open-concept kitchen with custom cabinets and quartz. We walk you through all the options and help you stay within your budget.",
    },
    {
      question: "Do you install countertops?",
      answer:
        "Yes, we install all types of countertops including quartz, granite, marble, and laminate. We work with local fabricators here in Miami-Dade to get you a good product at a fair price. We handle templating, delivery, and installation. If you want to see material samples before you decide, we can bring those to your home during the estimate.",
    },
    {
      question: "How long until I can use my kitchen again?",
      answer:
        "Kitchen remodels usually take three to six weeks depending on the size of the job. We know being without a kitchen is tough, so we try to keep things moving. We recommend setting up a temporary station with a microwave and cooler in another room. We have done enough of these to keep the workflow tight and get you back to cooking as fast as we can.",
    },
    {
      question: "Do you handle the design or do I need to bring my own plans?",
      answer:
        "You do not need to bring your own plans. We sit down with you, look at your space, and talk through what you want. We handle layout ideas, material suggestions, and help you pick finishes that make sense together. If you already have a design you love, we are happy to work from that too. Either way, we make it easy.",
    },
    {
      question: "What about permits for kitchen work?",
      answer:
        "For most cosmetic work like painting, tile, and fixture swaps, permits aren't needed. For anything structural or involving plumbing and electrical changes, we coordinate with the homeowner to make sure everything is handled properly.",
    },
  ],
  "interior-painting": [
    {
      question: "How many coats do you apply?",
      answer:
        "We apply two coats of finish paint on every job, no exceptions. If we are going from a dark color to a light one, sometimes it takes a third coat to get full coverage. We also prime any patches, new drywall, or stains before we paint. Cutting corners on coats is how you end up with streaks and see-through coverage. We do not do that.",
    },
    {
      question: "Do you move furniture?",
      answer:
        "Yes, we move furniture away from the walls and cover everything with drop cloths before we start. We also tape off trim, cover your floors, and protect anything that should not get paint on it. When we are done, we move everything back. You do not have to worry about prepping or cleaning up. That is all part of the job.",
    },
    {
      question: "What paint brands do you use?",
      answer:
        "We use Sherwin-Williams and Benjamin Moore for most jobs. Both hold up well in Miami's humidity and heat. For kitchens and bathrooms we use a satin or semi-gloss finish that is easy to wipe down. For bedrooms and living areas we usually go with eggshell. If you have a brand or color preference, we are happy to work with it.",
    },
    {
      question: "How long does interior painting take?",
      answer:
        "A typical interior paint job for a three-bedroom house takes about two to four days. Smaller projects like a single room or accent wall can be done in a day. It depends on how much prep work is needed and how many rooms we are painting. We give you a timeline upfront and stick to it.",
    },
    {
      question: "Do you repair drywall before painting?",
      answer:
        "Yes. We patch holes, fix cracks, sand rough spots, and skim coat any areas that need it before we put any paint on the wall. Good paint only looks good on a smooth, properly prepped surface. A lot of painters skip this step and it shows. We always include prep work in our estimates.",
    },
    {
      question: "Can you help me pick colors?",
      answer:
        "We can definitely help with color selection. After doing this for years, we know what works in South Florida homes with the natural light we get here. We can bring sample swatches and even paint small test patches on your wall so you can see how a color looks in your space before committing.",
    },
  ],
  "exterior-painting": [
    {
      question: "Do you pressure wash before painting?",
      answer:
        "Every time. Pressure washing is the first step on every exterior paint job we do. South Florida homes collect mold, mildew, dirt, and salt buildup fast. If you paint over that stuff, the paint will not stick and it will peel within a year. We pressure wash everything, let it dry, then scrape, prime, and paint. That is how you get a finish that actually lasts.",
    },
    {
      question: "What about stucco cracks?",
      answer:
        "We fill and repair stucco cracks before we paint. Miami homes shift with the soil and weather, so hairline cracks are common. We use flexible filler for small cracks and do proper stucco patching for bigger ones. Painting over cracks without fixing them first is a waste of money because they will come right back through the new paint.",
    },
    {
      question: "How long does exterior paint last in Miami?",
      answer:
        "With proper prep and quality paint, an exterior paint job in Miami should last five to eight years. The sun, rain, and humidity here are brutal on paint. That is why we use premium coatings rated for UV and moisture resistance. Cheaper paint might save you upfront but you will be repainting in two years. We do it right so it holds up.",
    },
    {
      question: "Can you paint stucco and concrete block homes?",
      answer:
        "That is most of what we paint. The majority of homes in Miami-Dade are CBS construction, which means concrete block and stucco. We know exactly how to prep and coat these surfaces for a long-lasting finish. We use masonry primers and elastomeric or acrylic coatings designed for this type of exterior.",
    },
    {
      question: "How much does exterior painting cost?",
      answer:
        "Exterior painting typically runs between $3,500 and $12,000 depending on the size of your home and how much prep work is needed. A smaller single-story house on the lower end, a larger two-story with lots of detail work on the higher end. We give you a detailed estimate before we start so you know exactly what you are paying for.",
    },
    {
      question: "Do you paint trim and shutters too?",
      answer:
        "Yes, we paint everything on the exterior. Trim, fascia, shutters, doors, garage doors, front porches, all of it. We use the right type of paint for each surface. Metal gets a rust-inhibiting primer. Wood gets sealed and coated properly. We make the whole house look consistent and sharp from the street.",
    },
  ],
  "tile-work": [
    {
      question: "Porcelain or ceramic for bathrooms?",
      answer:
        "We usually recommend porcelain for bathrooms. It is denser, absorbs less water, and holds up better in a wet environment. Ceramic works too and costs a little less, but porcelain is the better long-term choice for showers and bathroom floors. We carry both options and can show you the difference in person so you can make the right call for your budget.",
    },
    {
      question: "Do you remove old tile?",
      answer:
        "Yes, we handle full tile removal. We tear out the old tile, clean up the substrate, and make sure the surface underneath is level and ready for new material. Tile removal can be messy and loud, but we contain the dust as much as possible and haul everything away. You do not need to worry about any of that.",
    },
    {
      question: "Can you do large format tiles?",
      answer:
        "Absolutely. Large format tiles like 24x48 or even bigger are popular right now and they look great. They require a perfectly level surface and the right thinset to prevent lippage. We have the tools and experience to install them properly. Done right, large format tile gives you fewer grout lines and a clean, modern look.",
    },
    {
      question: "How much does tile installation cost?",
      answer:
        "Tile installation typically runs between $3,000 and $15,000 depending on the area and material. A standard bathroom floor might be on the lower end while a full shower surround with accent tile and a heated floor runs higher. Material cost varies a lot too. We give you a clear estimate with labor and materials broken out separately.",
    },
    {
      question: "Do you install tile on walls too?",
      answer:
        "Yes, we install tile on walls, floors, showers, backsplashes, accent walls, and fireplace surrounds. Wall tile installation is a different process than floor tile because you are working against gravity. We use the right adhesive and technique to make sure nothing shifts or slides. Shower walls especially need proper waterproofing behind the tile.",
    },
    {
      question: "How long does a tile job take?",
      answer:
        "Most tile jobs take three to ten days depending on the scope. A kitchen backsplash might be done in a day or two. A full bathroom floor and shower surround takes about a week including prep and grout cure time. We plan the schedule with you upfront so you know exactly what to expect each day.",
    },
  ],
  "exterior-repairs": [
    {
      question: "What kind of repairs do you handle?",
      answer:
        "We handle all types of exterior repairs for homes in Miami-Dade. Stucco patching and resurfacing, fascia and soffit replacement, wood rot repair, concrete patching, fence repairs, and general exterior maintenance. If something on the outside of your house is damaged or falling apart, chances are we can fix it. We see it all down here.",
    },
    {
      question: "Do you fix stucco damage?",
      answer:
        "Stucco repair is one of our most common jobs. We patch cracks, fix holes, resurface peeling areas, and match the existing texture so the repair blends in. Miami homes take a beating from the weather and stucco problems only get worse if you ignore them. Small cracks let water in, and that turns into mold and bigger structural issues fast.",
    },
    {
      question: "What about after a storm?",
      answer:
        "We get a lot of calls after storms pass through Miami-Dade. Damaged soffits, torn fascia, cracked stucco, water intrusion, all common after tropical weather. We come out quickly, assess the damage, and get repairs done so your home is sealed back up. If you are dealing with an insurance claim, we document everything clearly to help with that process.",
    },
    {
      question: "How much do exterior repairs cost?",
      answer:
        "Exterior repairs range from $1,500 to $10,000 depending on the scope. A simple stucco patch is on the low end. Replacing damaged soffits and fascia around the entire house runs higher. We always give you a written estimate before we start. No hidden fees, no surprises. We tell you what needs to be done and what it will cost.",
    },
    {
      question: "Can you spot problems I might not see?",
      answer:
        "Absolutely. When we come out for an estimate, we look at the whole exterior, not just the area you called about. We check for soft spots in the stucco, rotting fascia, gaps in caulking, and early signs of water intrusion. Catching these things early saves you money down the road. We will let you know what is urgent and what can wait.",
    },
    {
      question: "Do you handle both wood and aluminum fascia?",
      answer:
        "We work with both. A lot of older Miami homes have wood fascia that rots over time. We can replace it with new wood or upgrade to aluminum wrap which lasts longer and needs almost no maintenance. We also repair and replace aluminum soffits. We will recommend the best option based on your home and budget.",
    },
  ],
  "cabinet-refinishing": [
    {
      question: "How much does cabinet refinishing cost in Miami?",
      answer:
        "We charge $100 to $150 per door and $75 per drawer front for cabinet refinishing in Miami-Dade. A typical kitchen with 18 to 25 doors and 6 to 10 drawer fronts lands between $2,400 and $5,500 depending on door count, finish type, and hardware swaps. That includes strip and sand, primer, 2 to 3 coats of lacquer or stain, and reinstallation. Compare that to $12,000 to $25,000 for new cabinets and the math is hard to argue with if your boxes are in good shape.",
    },
    {
      question: "How long does cabinet refinishing take?",
      answer:
        "A typical kitchen refinishing project takes 5 to 10 working days. We pull doors and drawer fronts on day one and they go to our shop for spraying in a controlled environment. The boxes get prepped on site. Spraying and drying takes the middle of the project, with proper cure time between coats. Reinstallation happens at the end. Your kitchen stays usable through most of the project. You lose cabinet storage access for 5 to 7 days while doors are off curing.",
    },
    {
      question: "Will refinishing work on my cabinets?",
      answer:
        "Refinishing works on solid wood, plywood, and good-quality MDF cabinets. It does not work well on cheap particle board with thermofoil or laminate skins because the skin does not accept new finish reliably. If your cabinets are structurally sound (no water damage, no warping, no falling-apart drawer boxes) and the layout still works for you, refinishing is usually the right move. We do free in-person assessments and will tell you straight whether your cabinets are worth saving.",
    },
    {
      question: "Paint or stain, which should I pick?",
      answer:
        "About 80 percent of our refinishing jobs end up as paint, usually white, light gray, or two-tone with darker lowers. Paint hides imperfections, is easier to maintain, and reads modern. Stain keeps wood grain visible and looks warm and traditional. Stain shows imperfections more than paint, so the doors need to be in better shape going in. We use post-catalyzed lacquer or 2K polyurethane for the topcoat in either case. Both are way more durable than wall paint and handle Miami humidity, grease, and daily use without yellowing.",
    },
    {
      question: "How long does a refinished cabinet finish last?",
      answer:
        "When done properly with quality lacquer or 2K polyurethane, a refinished kitchen should look great for 10 to 15 years of normal use. That assumes you wipe up spills, do not slam doors, and use cabinet-safe cleaners. The finish is actually more durable than what comes from the factory on a lot of midrange new cabinets. We have seen our refinishing jobs from 8 years ago still looking sharp, with only minor touchups around the most-used pulls.",
    },
    {
      question: "Do you spray on site or take doors to a shop?",
      answer:
        "Both. Doors and drawer fronts go to our shop where we have a proper spray booth, climate control, and curing racks. That is where the finish quality lives. Cabinet boxes get prepped and sprayed on site since you cannot remove built-in boxes without rebuilding the kitchen. We mask everything carefully so the rest of your kitchen stays clean and dust does not get into your living spaces.",
    },
  ],
}
