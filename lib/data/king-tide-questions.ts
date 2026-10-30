/**
 * Question pages under /[locale]/king-tide-flooding/questions/[slug].
 *
 * Each page answers one question South Florida homeowners searched after the
 * October 2026 king tide (picked from Google autocomplete on 2026-10-29).
 * Facts that are not general trade knowledge carry a source in `sources`.
 * Images are AI illustrations, captioned as such on the page.
 */

import type { KingTideFaq, KingTideSource } from "./king-tide-areas"

export interface KingTideQuestion {
  slug: string
  question: string
  questionEs: string
  /** Search phrase the page targets, for the title tag. */
  title: string
  titleEs: string
  /** 40 to 70 word direct answer shown first. Also the meta description base. */
  answer: string
  answerEs: string
  sections: Array<{ heading: string; headingEs: string; body: string[]; bodyEs: string[] }>
  faqs: KingTideFaq[]
  image: string
  imageAlt: string
  imageAltEs: string
  /** Area slugs from king-tide-areas.ts to cross-link. */
  areas: string[]
  sources: KingTideSource[]
}

const S = {
  ftlCity: {
    label: "City of Fort Lauderdale, King Tides and High Tides",
    url: "https://www.fortlauderdale.gov/Government/Departments/Strategic-Communications/King-Tides-and-High-Tides",
    date: "2026",
  },
  tbt: {
    label: "Tampa Bay Times / Miami Herald, 'Highest king tide ever' swamps South Florida",
    url: "https://www.tampabay.com/news/environment/2026/10/27/king-tide-south-florida-flooding-miami-fort-lauderdale/",
    date: "2026-10-27",
  },
  cbs28: {
    label: "CBS Miami, Fort Lauderdale official tours hardest-hit king tide areas",
    url: "https://www.cbsnews.com/miami/news/fort-lauderdale-king-tide-flooding-2026-neighborhoods-tours/",
    date: "2026-10-28",
  },
  cbs26: {
    label: "CBS Miami, King tide flooding in South Florida, multiple rounds of rising water",
    url: "https://www.cbsnews.com/miami/news/king-tide-miami-fort-lauderdale-south-florida-today-october-26-2026/",
    date: "2026-10-26",
  },
  epa: {
    label: "U.S. EPA, A Brief Guide to Mold, Moisture and Your Home",
    url: "https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home",
    date: "current",
  },
  fema: {
    label: "FEMA, Flood Insurance",
    url: "https://www.fema.gov/flood-insurance",
    date: "current",
  },
  floodsmart: {
    label: "FloodSmart (NFIP), Policy terms and the 30-day waiting period",
    url: "https://www.floodsmart.gov/policy-terms",
    date: "current",
  },
  dfs: {
    label: "Florida Department of Financial Services, Flood Insurance Coverage FAQs",
    url: "https://www.myfloridacfo.com/division/consumers/storm/flood-disaster-faqs",
    date: "current",
  },
  nfipCovered: {
    label: "FloodSmart (NFIP), What is covered by a flood insurance policy for homeowners",
    url: "https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners",
    date: "2021",
  },
  nfipClaims: {
    label: "FloodSmart (NFIP), Claims checklist for policyholders",
    url: "https://www.floodsmart.gov/claims-checklist",
    date: "2026",
  },
  p234: {
    label: "FEMA P-234, Repairing Your Flooded Home (copy hosted by the National Center for Healthy Housing)",
    url: "https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf",
    date: "2010",
  },
  noaa: {
    label: "NOAA National Ocean Service, What is a king tide?",
    url: "https://oceanservice.noaa.gov/facts/kingtide.html",
    date: "2026",
  },
  noaaTides: {
    label: "NOAA Tides and Currents, tide predictions for Virginia Key, FL",
    url: "https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214",
    date: "current",
  },
}

export const kingTideQuestions: KingTideQuestion[] = [
  {
    slug: "king-tide-schedule-2026",
    question: "When is the next king tide in Fort Lauderdale and Miami?",
    questionEs: "¿Cuándo es la próxima marea rey en Fort Lauderdale y Miami?",
    title: "King Tide Schedule 2026: Fort Lauderdale and Miami Dates",
    titleEs: "Calendario de Mareas Rey 2026: Fechas en Fort Lauderdale y Miami",
    answer:
      "The City of Fort Lauderdale lists three more king tide windows for 2026: November 5 to 11, November 22 to 28, and December 24 to 25. Miami-Dade sees the same tides. Flooding is worst around the daily high tide in each window, and worse again if onshore wind or rain lines up with it.",
    answerEs:
      "La Ciudad de Fort Lauderdale anuncia tres mareas rey más en 2026: del 5 al 11 de noviembre, del 22 al 28 de noviembre y el 24 y 25 de diciembre. Miami-Dade ve las mismas mareas. La inundación es peor alrededor de la marea alta de cada día en esas fechas, y peor todavía si coincide con viento del mar o lluvia.",
    sections: [
      {
        heading: "Why these dates",
        headingEs: "Por qué estas fechas",
        body: [
          "A king tide is [not a scientific term, according to NOAA](https://oceanservice.noaa.gov/facts/kingtide.html). It is the name for the highest tides of the year, which happen when the moon is new or full and at the same time at its closest point to the Earth. Those dates can be predicted years ahead, which is why the city can publish them now.",
          "What cannot be predicted months out is the weather. The October 27, 2026 tide was forecast to be the highest of the year back in January, but a low pressure system and 30 to 40 mph onshore wind pushed it to about 2.5 feet above high tide in both Fort Lauderdale and Miami. That is the National Weather Service's major flooding level.",
        ],
        bodyEs: [
          "Marea rey [no es un término científico, según la NOAA](https://oceanservice.noaa.gov/facts/kingtide.html). Es el nombre que se le da a las mareas más altas del año, que ocurren cuando la luna está nueva o llena y al mismo tiempo en su punto más cercano a la Tierra. Esas fechas se pueden predecir con años de anticipación, por eso la ciudad ya las puede publicar.",
          "Lo que no se puede predecir con meses de anticipación es el clima. La marea del 27 de octubre de 2026 se sabía desde enero que sería la más alta del año, pero un sistema de baja presión y vientos de 30 a 40 mph desde el mar la subieron a cerca de 2.5 pies sobre la marea alta en Fort Lauderdale y en Miami. Ese es el nivel de inundación mayor del Servicio Nacional de Meteorología.",
        ],
      },
      {
        heading: "What to do in the week before each window",
        headingEs: "Qué hacer la semana antes de cada marea",
        body: [
          "Check the high tide times for your area each day of the window, using NOAA's predictions for [Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) or [Port Everglades](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8722956), since flooding peaks within an hour or two of high tide. Move cars off low streets before the peak. Get anything you care about off the garage floor. Clear leaves and debris from yard drains and make sure any backflow valve on your property closes. If water came into your house in October, keep the lowest part of the room clear of rugs, boxes and electronics until the window passes.",
          "In Fort Lauderdale you can report impassable roads at 954-828-8000 or in the FixIt FTL app.",
        ],
        bodyEs: [
          "Revise la hora de la marea alta en su zona cada día de esas fechas, con las predicciones de la NOAA para [Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) o [Port Everglades](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8722956), porque la inundación llega a su punto máximo una o dos horas alrededor de la marea alta. Saque los carros de las calles bajas antes del pico. Suba del piso del garaje todo lo que le importe. Limpie hojas y basura de los desagües del patio y asegúrese de que cualquier válvula antirreflujo en su propiedad cierre. Si el agua entró a su casa en octubre, mantenga la parte baja de los cuartos libre de alfombras, cajas y equipos electrónicos hasta que pase la marea.",
          "En Fort Lauderdale puede reportar calles intransitables al 954-828-8000 o en la app FixIt FTL.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will the November king tides flood as badly as October?",
        questionEs: "¿Las mareas rey de noviembre van a inundar tanto como la de octubre?",
        answer:
          "Nobody can say yet, and anyone who gives you a number this far out is guessing. The astronomical part of the tide is known, and October 27 was predicted to be the highest of the year before the weather made it worse. What turned a high tide into a record was the wind and a low pressure system off the coast, which pushed water onshore. If a cold front or a nor'easter lines up with one of the November windows, the flooding can be just as bad or worse. If the wind blows offshore, it may barely reach the street. The practical answer is to treat each window as if it could match October. If your house took water then, protect the lowest part of each room and the garage, move your car before peak tide, and watch the forecast for wind and rain in the days before each window.",
        answerEs:
          "Nadie lo puede decir todavía, y quien le dé un número con tanta anticipación está adivinando. La parte astronómica de la marea se conoce, y ya se sabía que el 27 de octubre sería la más alta del año antes de que el clima la empeorara. Lo que convirtió una marea alta en un récord fue el viento y un sistema de baja presión frente a la costa, que empujaron el agua tierra adentro. Si un frente frío o un viento fuerte del noreste coincide con alguna de las fechas de noviembre, la inundación puede ser igual o peor. Si el viento sopla hacia el mar, puede que ni llegue a la calle. La respuesta práctica es tratar cada fecha como si pudiera igualar a octubre. Si su casa tomó agua esa vez, proteja la parte más baja de cada cuarto y del garaje, mueva el carro antes del pico de la marea y esté pendiente del pronóstico de viento y lluvia los días antes de cada fecha.",
      },
      {
        question: "Why can't the city just pump the water out during a king tide?",
        questionEs: "¿Por qué la ciudad no puede simplemente bombear el agua durante una marea rey?",
        answer:
          "Because the water has nowhere to go. Fort Lauderdale explained this during the October tide. Its stormwater pumps are built to move rainwater out of neighborhoods into the waterways. During a king tide, the waterways themselves are already at or above street level, so pumping into them does little, and saltwater keeps coming back in through the drains and over the seawalls until the tide starts to fall. In Miami Shores and on the Little River, the South Florida Water Management District's canal gates had the same problem on October 27, with water flowing backward over the barriers into the canals. The long-term fixes are higher seawalls, tidal valves that stop backflow, and bigger pumps and gates, and both the city and the district are working on those. In the short term, the only reliable protection is keeping water out of your own house and moving what you can above the flood line.",
        answerEs:
          "Porque el agua no tiene adónde ir. Fort Lauderdale lo explicó durante la marea de octubre. Sus bombas pluviales están hechas para sacar el agua de lluvia de los barrios hacia los canales. Durante una marea rey, los canales ya están al nivel de la calle o más arriba, así que bombear hacia ellos sirve de poco, y el agua salada sigue entrando por los desagües y por encima de los muros hasta que la marea empieza a bajar. En Miami Shores y en el Little River, las compuertas de canal del Distrito de Manejo del Agua del Sur de Florida tuvieron el mismo problema el 27 de octubre, con agua corriendo en reversa por encima de las barreras hacia los canales. Las soluciones de largo plazo son muros más altos, válvulas de marea contra el reflujo y bombas y compuertas más grandes, y tanto la ciudad como el distrito trabajan en eso. A corto plazo, la única protección confiable es mantener el agua fuera de su casa y subir lo que pueda por encima de la línea de inundación.",
      },
      {
        question: "How long does a king tide last?",
        questionEs: "¿Cuánto dura una marea rey?",
        answer:
          "A king tide window runs from two days to about a week. The City of Fort Lauderdale lists the rest of 2026 that way: November 5 to 11, November 22 to 28, and December 24 to 25. Inside each window the flooding is not constant. It follows the high tide, which comes about twice a day, and low streets usually take on water for an hour or two around each high tide before it drains back out through the same storm drains it came up through. Wind changes that. On October 27, 2026, strong onshore wind kept pushing water in, and some streets in Fort Lauderdale and Miami Beach stayed under water for hours. So treat the forecast tide times as a starting point, not a promise. You can check the predicted high tides for [Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) and [Port Everglades](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8722956) on NOAA's site and plan around the highest ones.",
        answerEs:
          "Una marea rey dura de dos días a una semana más o menos. La Ciudad de Fort Lauderdale anuncia así lo que queda de 2026: del 5 al 11 de noviembre, del 22 al 28 de noviembre y el 24 y 25 de diciembre. Dentro de esas fechas la inundación no es constante. Sigue a la marea alta, que llega más o menos dos veces al día, y las calles bajas normalmente toman agua una o dos horas alrededor de cada marea alta antes de que baje por los mismos desagües por donde subió. El viento cambia eso. El 27 de octubre de 2026, el viento fuerte desde el mar siguió empujando agua, y algunas calles de Fort Lauderdale y Miami Beach se quedaron bajo agua por horas. Por eso tome las horas de la marea pronosticada como un punto de partida, no como una promesa. Puede ver las mareas altas pronosticadas para [Virginia Key](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8723214) y [Port Everglades](https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=8722956) en el sitio de la NOAA y planificar alrededor de las más altas.",
      },
    ],
    image: "/images/king-tide/king-tide-schedule-2026.jpg",
    imageAlt: "Illustration of a South Florida canal seawall with king tide water level with the top of the wall",
    imageAltEs: "Ilustración de un muro de contención en un canal del sur de Florida con la marea rey al nivel del borde",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.ftlCity, S.noaa, S.noaaTides, S.tbt, S.cbs26],
  },
  {
    slug: "what-to-do-after-king-tide-flooding",
    question: "What should I do after king tide water gets into my house?",
    questionEs: "¿Qué hago después de que el agua de la marea rey entra a mi casa?",
    title: "What to Do After King Tide Water Floods Your House",
    titleEs: "Qué Hacer si Entra Agua en su Casa por la Marea Rey",
    answer:
      "Make the house safe, document the damage, call your flood carrier, and get wet material out within a day or two. Turn off power to any circuit the water reached, photograph every room and the water line, then remove wet carpet, pad, baseboards and the bottom of the drywall before mold starts. Do not paint or patch anything yet.",
    answerEs:
      "Haga la casa segura, documente el daño, llame a su aseguradora de inundación y saque el material mojado en uno o dos días. Apague la electricidad de cualquier circuito al que llegó el agua, fotografíe cada cuarto y la marca del agua, y luego saque alfombras, acolchado, zócalos y la parte baja del drywall antes de que empiece el moho. No pinte ni resane nada todavía.",
    sections: [
      {
        heading: "The first 48 hours, in order",
        headingEs: "Las primeras 48 horas, en orden",
        body: [
          "1. Safety. If water touched outlets, power strips, the AC air handler or anything plugged in, switch off those circuits at the panel. If the panel itself is wet or you have to stand in water to reach it, do not touch it. Have an electrician check before power goes back on.",
          "2. Document. Photograph and video every room before moving anything: the water line on walls, doors and cabinets, the floor, damaged belongings, and the street outside. Keep samples of flooring and anything you throw away until the adjuster has seen them or tells you otherwise.",
          "3. Report. Call the company that wrote your flood policy and get a claim number. [Florida's Department of Financial Services](https://www.myfloridacfo.com/division/consumers/storm/flood-disaster-faqs) says a signed proof of loss is due within 60 days of the flood. Our [claim guide](/king-tide-flooding/questions/flood-insurance-claim-florida) walks through each step.",
          "4. Remove. Wet carpet and pad, MDF baseboards, insulation and the lower drywall come out ([how high to cut](/king-tide-flooding/questions/flood-cut-drywall)). [The EPA says](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) wet materials should be dried within 24 to 48 hours to prevent mold.",
          "5. Rinse and dry. Rinse salt off hard surfaces with clean water, then dry with air movers and dehumidifiers running around the clock, with windows closed and the AC on once it is safe.",
        ],
        bodyEs: [
          "1. Seguridad. Si el agua tocó tomacorrientes, regletas, la manejadora del aire acondicionado o algo enchufado, apague esos circuitos en el panel. Si el panel está mojado o tiene que pararse en agua para llegar a él, no lo toque. Que un electricista lo revise antes de volver a dar la luz.",
          "2. Documente. Tome fotos y video de cada cuarto antes de mover nada: la marca del agua en paredes, puertas y gabinetes, el piso, las pertenencias dañadas y la calle afuera. Guarde muestras del piso y de lo que bote hasta que el ajustador las vea o le diga otra cosa.",
          "3. Reporte. Llame a la compañía de su póliza de inundación y pida un número de reclamo. El [Departamento de Servicios Financieros de Florida](https://www.myfloridacfo.com/division/consumers/storm/flood-disaster-faqs) indica que la prueba de pérdida firmada vence a los 60 días de la inundación. Nuestra [guía de reclamos](/king-tide-flooding/questions/flood-insurance-claim-florida) explica cada paso.",
          "4. Retire. La alfombra y el acolchado mojados, los zócalos de MDF, el aislamiento y la parte baja del drywall se sacan ([a qué altura cortar](/king-tide-flooding/questions/flood-cut-drywall)). [La EPA indica](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) que los materiales mojados deben secarse en 24 a 48 horas para evitar el moho.",
          "5. Enjuague y seque. Enjuague la sal de las superficies duras con agua limpia y luego seque con ventiladores y deshumidificadores día y noche, con las ventanas cerradas y el aire acondicionado encendido cuando sea seguro.",
        ],
      },
      {
        heading: "What not to do",
        headingEs: "Lo que no debe hacer",
        body: [
          "Do not paint over a wall because it feels dry. Salt left inside drywall pulls moisture from the air and the damage comes back through the paint in a few weeks. Do not run a shop vac on standing water with wet hands or bare feet near outlets. Do not throw away damaged flooring or cabinets before photographing them and their labels. And do not wait for the next king tide to pass before drying out. The rebuild can wait. The drying cannot.",
        ],
        bodyEs: [
          "No pinte una pared porque se siente seca. La sal que queda dentro del drywall atrae la humedad del aire y el daño vuelve a salir por la pintura en pocas semanas. No use una aspiradora de agua con las manos mojadas o descalzo cerca de los tomacorrientes. No bote pisos o gabinetes dañados sin antes fotografiarlos junto con sus etiquetas. Y no espere a que pase la próxima marea rey para secar. La reconstrucción puede esperar. El secado no.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I clean up king tide water myself?",
        questionEs: "¿Puedo limpiar yo mismo el agua de la marea rey?",
        answer:
          "Some of it, yes. If the water stayed on a tile floor and never reached the walls, cleaning the floor, rinsing the grout and drying the room with fans and a dehumidifier is often enough. Wear rubber boots and gloves, because king tide water comes up through storm drains and can carry sewage. Things change once water sits against drywall, baseboards or cabinets. Those materials wick water up well above the line you can see, and the wet section has to be cut out and the wall cavity dried, or it will [grow mold inside the wall](/king-tide-flooding/questions/mold-after-flooding) where you cannot see it. That work takes the right tools, a moisture meter to find where the wet stops, and enough air movers and dehumidifier capacity to dry the room in days instead of weeks. If you are unsure, have someone check before you close anything up. A walkthrough costs far less than opening the same wall twice.",
        answerEs:
          "Una parte, sí. Si el agua se quedó en un piso de losa y nunca llegó a las paredes, limpiar el piso, enjuagar la lechada y secar el cuarto con ventiladores y un deshumidificador muchas veces es suficiente. Use botas de goma y guantes, porque el agua de la marea rey sube por los desagües pluviales y puede traer aguas negras. La cosa cambia cuando el agua se queda contra el drywall, los zócalos o los gabinetes. Esos materiales absorben agua bastante más arriba de la marca que se ve, y la parte mojada hay que cortarla y secar la cavidad de la pared, o le saldrá [moho por dentro](/king-tide-flooding/questions/mold-after-flooding) donde no lo puede ver. Ese trabajo necesita las herramientas correctas, un medidor de humedad para saber dónde termina lo mojado, y suficientes ventiladores y deshumidificadores para secar el cuarto en días y no en semanas. Si tiene dudas, pida que alguien lo revise antes de cerrar nada. Una visita cuesta mucho menos que abrir la misma pared dos veces.",
      },
      {
        question: "Do I need to wait for the adjuster before removing wet drywall?",
        questionEs: "¿Tengo que esperar al ajustador antes de quitar el drywall mojado?",
        answer:
          "Ask your carrier, but in most cases you are expected to protect the property from further damage, and waiting a week with wet drywall in a South Florida house is how a flood claim turns into a mold problem. What protects you is documentation. Before anything is removed, photograph and video each room, the water line, and the wet materials, with something in the frame for scale. Measure the height of the water line and write it down. Keep a small cut piece of the drywall, carpet and pad from each room, and keep the labels or boxes from flooring and cabinets if you have them. Write down what was removed and when. If your carrier asks you to wait for an inspection, ask for the date in writing and ask whether you can at least extract water and run dehumidifiers in the meantime. We put photos and a written scope together for your file so the adjuster can see what was there.",
        answerEs:
          "Pregúntele a su aseguradora, pero en la mayoría de los casos se espera que usted proteja la propiedad de más daño, y esperar una semana con drywall mojado en una casa del sur de Florida es la forma en que un reclamo por inundación se convierte en un problema de moho. Lo que lo protege es la documentación. Antes de sacar nada, tome fotos y video de cada cuarto, de la marca del agua y de los materiales mojados, con algo en la imagen que dé escala. Mida la altura de la marca del agua y anótela. Guarde un pedazo pequeño del drywall, la alfombra y el acolchado de cada cuarto, y las etiquetas o cajas de pisos y gabinetes si las tiene. Anote qué se sacó y cuándo. Si su aseguradora le pide esperar una inspección, pida la fecha por escrito y pregunte si al menos puede sacar el agua y poner deshumidificadores mientras tanto. Nosotros preparamos fotos y un alcance por escrito para su expediente, para que el ajustador vea lo que había.",
      },
    ],
    image: "/images/king-tide/what-to-do-after-king-tide-flooding.jpg",
    imageAlt: "Illustration of a South Florida living room after king tide flooding with a water line on the drywall",
    imageAltEs: "Ilustración de una sala en el sur de Florida después de la marea rey con la marca del agua en el drywall",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.epa, S.dfs, S.cbs26],
  },
  {
    slug: "flood-cut-drywall",
    question: "What is a flood cut, and how high should drywall be cut after a flood?",
    questionEs: "¿Qué es un corte de inundación y a qué altura se corta el drywall después de una inundación?",
    title: "Flood Cut Drywall: How High to Cut After Saltwater Flooding",
    titleEs: "Corte de Drywall por Inundación: A Qué Altura Cortar",
    answer:
      "A flood cut is a straight, level cut through the drywall above the highest wet point, so everything that soaked up water comes out in one piece. The height is set by moisture readings, not by the water line you can see. It usually lands between 12 inches and 4 feet, and many crews cut at 2 or 4 feet so new drywall patches in cleanly.",
    answerEs:
      "Un corte de inundación es un corte recto y nivelado en el drywall por encima del punto mojado más alto, para que todo lo que absorbió agua salga de una vez. La altura la deciden las lecturas de humedad, no la marca de agua que se ve. Normalmente queda entre 12 pulgadas y 4 pies, y muchos cortan a 2 o 4 pies para que el drywall nuevo encaje limpio.",
    sections: [
      {
        heading: "Why the cut goes higher than the water",
        headingEs: "Por qué el corte va más alto que el agua",
        body: [
          "Drywall is gypsum wrapped in paper, and both act like a wick. Water that stood 3 inches deep on the floor can soak a foot or more up the wall within a day. Saltwater makes it worse, because salt left in the paper keeps drawing moisture from humid Florida air after the floor is dry. So the cut is set by checking the wall with a moisture meter every few inches up from the floor and cutting above the highest wet reading, not by eyeballing the stain.",
        ],
        bodyEs: [
          "El drywall es yeso envuelto en papel, y los dos funcionan como mecha. El agua que estuvo a 3 pulgadas en el piso puede subir un pie o más por la pared en un día. El agua salada lo empeora, porque la sal que queda en el papel sigue atrayendo la humedad del aire de Florida después de que el piso está seco. Por eso la altura del corte se decide revisando la pared con un medidor de humedad cada pocas pulgadas desde el piso y cortando por encima de la lectura mojada más alta, no a ojo por la mancha.",
        ],
      },
      {
        heading: "Why 2 feet or 4 feet",
        headingEs: "Por qué 2 o 4 pies",
        body: [
          "Drywall sheets are 4 feet wide and usually hung horizontally. Cutting at 2 feet lets one sheet ripped in half patch two rows. Cutting at 4 feet replaces exactly one full row, with a single seam to tape at a height where it is easy to hide. Cutting at an odd height, like 19 inches, means more seams, more waste and more finishing. Once the wall is open, the insulation behind it comes out too, the studs and bottom plate get cleaned of salt and dried, and the wall stays open until the framing reads dry.",
        ],
        bodyEs: [
          "Las planchas de drywall miden 4 pies de ancho y normalmente se instalan horizontales. Cortar a 2 pies permite que una plancha cortada a la mitad cubra dos filas. Cortar a 4 pies reemplaza exactamente una fila completa, con una sola unión para encintar a una altura fácil de disimular. Cortar a una altura rara, como 19 pulgadas, significa más uniones, más desperdicio y más acabado. Con la pared abierta, también sale el aislamiento de atrás, los parales y la solera se limpian de sal y se secan, y la pared se queda abierta hasta que la madera marque seca.",
        ],
      },
      {
        heading: "Can wet drywall be saved?",
        headingEs: "¿Se puede salvar el drywall mojado?",
        body: [
          "Not after a king tide. Drywall wet from a clean source, like a supply line that leaked for an hour, can sometimes be dried in place and kept. Floodwater is different. King tide water comes up through storm drains and carries salt, dirt and sometimes sewage into the paper and gypsum. [FEMA's flood repair guide](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) says wallboard soaked by floodwater is a health hazard and should be replaced. Drying it does not take out the contamination or the salt, and salty drywall keeps pulling moisture from the air. Not sure how high the wet goes? Check the [signs of water damaged drywall](/king-tide-flooding/questions/water-damaged-drywall-signs).",
        ],
        bodyEs: [
          "No después de una marea rey. El drywall que se mojó con agua limpia, como una tubería que goteó una hora, a veces se puede secar en su lugar y conservar. El agua de inundación es distinta. El agua de la marea rey sube por los desagües y mete sal, suciedad y a veces aguas negras en el papel y el yeso. La [guía de reparación de FEMA](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) indica que el drywall empapado por una inundación es un peligro para la salud y se debe reemplazar. Secarlo no saca la contaminación ni la sal, y el drywall salado sigue atrayendo la humedad del aire. ¿No sabe hasta dónde llega lo mojado? Revise las [señales de drywall dañado por agua](/king-tide-flooding/questions/water-damaged-drywall-signs).",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I just cut where the water line is?",
        questionEs: "¿Puedo cortar justo donde está la marca del agua?",
        answer:
          "It is a common mistake and it usually costs more later. The visible stain shows where the water stood, not how far it traveled up inside the paper and gypsum. Drywall wicks, so the wet section often runs several inches to more than a foot above the stain, and it is invisible from the outside until paint starts bubbling or a musty smell shows up weeks later. Cutting at the stain leaves a band of wet, salty drywall sealed inside the wall, which is exactly where mold grows. The right way is to check the wall with a moisture meter from the floor up, mark the highest wet reading, and cut above it, then round up to a height that makes the patch easy, often 2 or 4 feet. If a few walls read wet much higher than the rest, those get cut higher. The few extra inches cost little compared with opening the wall again.",
        answerEs:
          "Es un error común y casi siempre sale más caro después. La mancha que se ve muestra dónde estuvo el agua, no hasta dónde subió por dentro del papel y el yeso. El drywall absorbe, así que la parte mojada muchas veces llega varias pulgadas o más de un pie por encima de la mancha, y no se ve desde afuera hasta que la pintura hace burbujas o aparece olor a humedad semanas después. Cortar en la mancha deja una franja de drywall mojado y salado sellada dentro de la pared, que es justo donde crece el moho. Lo correcto es revisar la pared con un medidor de humedad desde el piso hacia arriba, marcar la lectura mojada más alta y cortar por encima, redondeando a una altura que facilite el parche, muchas veces 2 o 4 pies. Si algunas paredes marcan mojado mucho más arriba que el resto, esas se cortan más alto. Esas pulgadas extra cuestan poco comparado con volver a abrir la pared.",
      },
      {
        question: "What should go back in the wall to handle the next king tide better?",
        questionEs: "¿Qué debo poner en la pared para aguantar mejor la próxima marea rey?",
        answer:
          "If your house is on a street that floods, rebuild the bottom of the wall for the next time. A few options make a real difference. Leave a small gap between the bottom of the new drywall and the floor, hidden by the baseboard, so the board does not sit in water. Use a mold-resistant or paperless gypsum board in the lowest row. Swap MDF baseboards for PVC or composite, which do not swell. In closed cabinet bases, use plywood or PVC instead of particle board. Some homeowners on the isles and near the bay go further and finish the lower section with a material that can be rinsed and dried, like a tile wainscot. None of this stops water from coming in. It changes the next cleanup from cutting and replacing into rinsing and drying, which is faster and much cheaper. We can price both versions so you can choose.",
        answerEs:
          "Si su casa está en una calle que se inunda, reconstruya la parte baja de la pared pensando en la próxima vez. Algunas opciones hacen una diferencia real. Deje un pequeño espacio entre la parte baja del drywall nuevo y el piso, tapado por el zócalo, para que la plancha no se quede en el agua. Use una plancha de yeso resistente al moho o sin papel en la fila más baja. Cambie los zócalos de MDF por PVC o compuesto, que no se hinchan. En las bases de gabinetes cerrados, use plywood o PVC en vez de aglomerado. Algunos propietarios en las islas y cerca de la bahía van más allá y terminan la parte baja con un material que se puede enjuagar y secar, como un zócalo alto de losa. Nada de esto evita que entre el agua. Lo que cambia es que la próxima limpieza sea enjuagar y secar en vez de cortar y reemplazar, que es más rápido y mucho más barato. Podemos cotizarle las dos versiones para que usted decida.",
      },
    ],
    image: "/images/king-tide/flood-cut-drywall.jpg",
    imageAlt: "Illustration of a flood cut: lower 2 feet of drywall removed with dehumidifier and air movers drying a South Florida home",
    imageAltEs: "Ilustración de un corte de inundación: los 2 pies bajos del drywall retirados con deshumidificador y ventiladores secando una casa en el sur de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.epa, S.p234],
  },
  {
    slug: "how-long-to-dry-out-house-after-flood",
    question: "How long does it take to dry out a house after a flood?",
    questionEs: "¿Cuánto tarda en secarse una casa después de una inundación?",
    title: "How Long to Dry Out a House After a Flood in South Florida",
    titleEs: "Cómo Secar una Casa Inundada y Cuánto Tarda",
    answer:
      "With the wet material removed and air movers and dehumidifiers running nonstop, a room often dries in about three to five days. Concrete slabs, wall framing and cabinets can take longer. The calendar does not decide when it is dry. Moisture meter readings do, and the room is not ready to rebuild until the framing and slab read dry.",
    answerEs:
      "Con el material mojado retirado y ventiladores y deshumidificadores funcionando sin parar, un cuarto muchas veces se seca en unos tres a cinco días. Las placas de concreto, la estructura de las paredes y los gabinetes pueden tardar más. No es el calendario el que decide cuándo está seco. Lo deciden las lecturas del medidor de humedad, y el cuarto no está listo para reconstruir hasta que la madera y la placa marquen secas.",
    sections: [
      {
        heading: "What speeds it up and what slows it down",
        headingEs: "Qué lo acelera y qué lo retrasa",
        body: [
          "Removing what holds water is the biggest factor. A wall with wet drywall and insulation still in it can stay wet for weeks. Opened up with a [flood cut](/king-tide-flooding/questions/flood-cut-drywall), the studs dry in days. Next is equipment: air movers aimed along the base of the walls and dehumidifiers sized for the room, running day and night. In South Florida, opening the windows usually slows drying, because the outside air is humid. Keep the house closed and let the dehumidifiers and the AC pull the water out of the air.",
          "Salt slows everything. Salt left on studs, slab and grout keeps pulling moisture back in, so surfaces that touched king tide water should be rinsed with clean water before the drying starts.",
        ],
        bodyEs: [
          "Sacar lo que guarda agua es el factor más grande. Una pared con el drywall y el aislamiento mojados adentro puede seguir mojada por semanas. Abierta con un [corte de inundación](/king-tide-flooding/questions/flood-cut-drywall), los parales se secan en días. Después viene el equipo: ventiladores apuntando a la base de las paredes y deshumidificadores del tamaño correcto para el cuarto, funcionando día y noche. En el sur de Florida, abrir las ventanas normalmente retrasa el secado, porque el aire de afuera es húmedo. Mantenga la casa cerrada y deje que los deshumidificadores y el aire acondicionado saquen el agua del aire.",
          "La sal retrasa todo. La sal que queda en los parales, la placa y la lechada sigue atrayendo humedad, así que las superficies que tocó el agua de la marea rey se deben enjuagar con agua limpia antes de empezar a secar.",
        ],
      },
      {
        heading: "Why the 48-hour mark matters",
        headingEs: "Por qué importan las 48 horas",
        body: [
          "[The EPA says](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) wet building materials should be dried within 24 to 48 hours to prevent mold. That does not mean the house must be fully dry in two days. It means the drying has to start in that window: wet material out, salt rinsed, equipment running. A house that sits closed and wet for a week after a flood almost always needs more demolition than one where drying started the next morning.",
        ],
        bodyEs: [
          "[La EPA indica](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) que los materiales de construcción mojados deben secarse en 24 a 48 horas para evitar el moho. Eso no significa que la casa tenga que estar totalmente seca en dos días. Significa que el secado tiene que empezar en ese plazo: material mojado afuera, sal enjuagada y equipo funcionando. Una casa que se queda cerrada y mojada una semana después de una inundación casi siempre necesita más demolición que una donde el secado empezó a la mañana siguiente.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know when the walls are dry enough to close up?",
        questionEs: "¿Cómo sé cuándo las paredes están lo bastante secas para cerrarlas?",
        answer:
          "Not by touch. Wood and concrete can feel dry on the surface while the inside is still wet. The way to know is a moisture meter. A pin meter pushed into the studs and bottom plate gives a moisture content reading for the wood, and the readings in the flooded area should come down to match a dry stud in an unaffected part of the same house. For the slab and remaining drywall, a pinless meter compares wet and dry areas the same way. Take readings at the same spots every day and write them down, so you can see the numbers falling and know when they level off. When the flooded framing matches the dry reference and stays there for a day with the equipment off, it is ready to close. Closing a wall a few days early to save time is how mold ends up inside a brand new wall, behind fresh paint.",
        answerEs:
          "No al tacto. La madera y el concreto se pueden sentir secos por fuera mientras por dentro siguen mojados. La forma de saberlo es un medidor de humedad. Un medidor de pines clavado en los parales y la solera da una lectura del contenido de humedad de la madera, y las lecturas en el área inundada deben bajar hasta igualar a un paral seco en una parte de la misma casa que no se mojó. Para la placa y el drywall que queda, un medidor sin pines compara las zonas mojadas y secas de la misma forma. Tome lecturas en los mismos puntos cada día y anótelas, para ver cómo bajan los números y saber cuándo se estabilizan. Cuando la madera inundada iguala a la referencia seca y se mantiene así un día con el equipo apagado, está lista para cerrar. Cerrar una pared unos días antes para ahorrar tiempo es la forma en que el moho termina dentro de una pared nueva, detrás de pintura fresca.",
      },
      {
        question: "Can I stay in the house while it dries?",
        questionEs: "¿Puedo quedarme en la casa mientras se seca?",
        answer:
          "Often yes, if the flooding was limited to part of the house and the power and AC are working safely. Plenty of families live in the dry rooms while one end of the house dries out. A few things matter. The equipment is loud and runs all day and night, so bedrooms near the work area can be hard to sleep in. Dehumidifiers and air movers draw real power, and they should be plugged into circuits that were not under water and are not overloaded. Keep children and pets out of rooms that took king tide water until they have been cleaned, because that water can carry sewage. If anyone in the house has asthma or a weak immune system, or if there is visible mold, staying elsewhere during demolition is the safer choice. And if water reached the electrical panel or the main AC equipment, wait until an electrician and an AC technician have cleared the house before living in it.",
        answerEs:
          "Muchas veces sí, si la inundación fue solo en una parte de la casa y la electricidad y el aire acondicionado funcionan de forma segura. Muchas familias viven en los cuartos secos mientras un lado de la casa se seca. Hay algunas cosas que importan. El equipo es ruidoso y funciona día y noche, así que los cuartos cerca del área de trabajo pueden ser difíciles para dormir. Los deshumidificadores y ventiladores consumen bastante electricidad, y deben conectarse a circuitos que no estuvieron bajo agua y que no estén sobrecargados. Mantenga a los niños y las mascotas fuera de los cuartos que tomaron agua de la marea rey hasta que se limpien, porque esa agua puede traer aguas negras. Si alguien en la casa tiene asma o defensas bajas, o si hay moho visible, quedarse en otro lugar durante la demolición es lo más seguro. Y si el agua llegó al panel eléctrico o al equipo principal del aire acondicionado, espere a que un electricista y un técnico de aire revisen la casa antes de vivir en ella.",
      },
    ],
    image: "/images/king-tide/how-long-to-dry-out-house-after-flood.jpg",
    imageAlt: "Illustration of air movers, a dehumidifier and a moisture meter drying a flooded room in a Florida home",
    imageAltEs: "Ilustración de ventiladores, un deshumidificador y un medidor de humedad secando un cuarto inundado en una casa de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.epa],
  },
  {
    slug: "mold-after-flooding",
    question: "How fast does mold grow after a flood, and how do I stop it?",
    questionEs: "¿Qué tan rápido sale el moho después de una inundación y cómo lo evito?",
    title: "Mold After Flooding in South Florida: How Fast and How to Stop It",
    titleEs: "Moho Después de una Inundación en el Sur de Florida",
    answer:
      "Mold can start within 24 to 48 hours on wet drywall, carpet and wood, which is why the EPA says to dry wet materials in that window. The way to stop it is to remove what cannot be dried, rinse off salt and dirt, and dry the rest fast. Bleach on a wet wall does not fix a wet wall.",
    answerEs:
      "El moho puede empezar en 24 a 48 horas en drywall, alfombra y madera mojados, por eso la EPA indica secar los materiales mojados en ese plazo. La forma de evitarlo es sacar lo que no se puede secar, enjuagar la sal y la suciedad, y secar el resto rápido. El cloro sobre una pared mojada no arregla una pared mojada.",
    sections: [
      {
        heading: "Where mold shows up first after a king tide",
        headingEs: "Dónde aparece primero el moho después de una marea rey",
        body: [
          "Behind baseboards, on the back side of the drywall, under carpet pad, inside the toe kick under kitchen and bathroom cabinets, and in the insulation of exterior walls. These are the places that stay dark, stay damp and hold the dirt that floodwater carried in. A musty smell a few days after the water goes down usually means one of them is still wet.",
        ],
        bodyEs: [
          "Detrás de los zócalos, en la parte de atrás del drywall, debajo del acolchado de la alfombra, dentro de la base bajo los gabinetes de cocina y baño, y en el aislamiento de las paredes exteriores. Son los lugares que se quedan oscuros, húmedos y con la suciedad que trajo el agua. Un olor a humedad unos días después de que baja el agua normalmente significa que uno de ellos sigue mojado.",
        ],
      },
      {
        heading: "Small patch or bigger problem",
        headingEs: "Mancha pequeña o problema mayor",
        body: [
          "[The EPA says](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) that if the moldy area is less than about 10 square feet, in most cases you can handle it yourself, with gloves, eye protection and an N95 mask, by removing porous material and cleaning hard surfaces. Larger areas, mold inside the HVAC system, or anyone in the house with health concerns call for a mold professional. Florida regulates mold assessment and remediation at the state level, so ask any mold company for its [Florida DBPR](https://www.myfloridalicense.com/) credentials before work starts.",
        ],
        bodyEs: [
          "[La EPA indica](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) que si el área con moho mide menos de unos 10 pies cuadrados, en la mayoría de los casos usted mismo lo puede manejar, con guantes, protección para los ojos y una mascarilla N95, retirando el material poroso y limpiando las superficies duras. Áreas más grandes, moho dentro del sistema de aire acondicionado o alguien en la casa con problemas de salud requieren un profesional de moho. Florida regula la evaluación y remediación de moho a nivel estatal, así que pídale a cualquier compañía de moho sus credenciales del [DBPR de Florida](https://www.myfloridalicense.com/) antes de empezar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I spray bleach on the wall and leave the drywall?",
        questionEs: "¿Puedo echarle cloro a la pared y dejar el drywall?",
        answer:
          "No. Bleach can lighten the stain on the surface, but it does not dry the wall, and drywall that soaked up king tide water is still wet, salty and dirty inside the paper and gypsum. The mold comes back from the inside, and the water in bleach adds moisture to a material that already has too much. The EPA's guidance is that absorbent materials like drywall, ceiling tiles and carpet that got moldy may need to be thrown away, because mold can grow into the empty spaces and crevices of porous materials. For hard surfaces like tile, metal and sealed concrete, scrubbing with detergent and water and then drying fully works. The real fix after a flood is not a chemical. It is cutting out the wet porous material, cleaning and drying what stays, and rebuilding once the framing reads dry. Spraying and painting over the problem just hides it for a few weeks.",
        answerEs:
          "No. El cloro puede aclarar la mancha en la superficie, pero no seca la pared, y el drywall que absorbió agua de la marea rey sigue mojado, salado y sucio dentro del papel y el yeso. El moho vuelve desde adentro, y el agua del cloro le agrega humedad a un material que ya tiene demasiada. La guía de la EPA es que los materiales absorbentes como el drywall, las placas de techo y la alfombra que se llenaron de moho quizás haya que botarlos, porque el moho crece dentro de los espacios y grietas de los materiales porosos. En superficies duras como losa, metal y concreto sellado, restregar con detergente y agua y luego secar por completo funciona. La solución real después de una inundación no es un químico. Es cortar el material poroso mojado, limpiar y secar lo que se queda, y reconstruir cuando la madera marque seca. Rociar y pintar encima solo esconde el problema por unas semanas.",
      },
      {
        question: "Does flood insurance pay for mold?",
        questionEs: "¿El seguro de inundación paga el moho?",
        answer:
          "It depends on why the mold is there. Under the [National Flood Insurance Program](https://www.fema.gov/flood-insurance), mold that results directly from a covered flood can be part of the claim, but policies generally expect the owner to take reasonable steps to limit damage after the water recedes. Mold that grew because the house was left wet and closed for weeks can be treated as a failure to protect the property. That is one more reason to document everything early and start drying within a day or two. Keep a record of what you did and when: photos of the water, when you called the carrier, when wet materials came out, and the equipment used to dry. If mold does show up, photograph it, report it to your carrier as part of the same flood claim, and ask in writing what they need from you. Read your own policy or call your agent for the exact terms, because private flood policies can differ from the NFIP.",
        answerEs:
          "Depende de por qué está ahí el moho. Bajo el [Programa Nacional de Seguro contra Inundaciones](https://www.fema.gov/flood-insurance), el moho que resulta directamente de una inundación cubierta puede ser parte del reclamo, pero las pólizas generalmente esperan que el dueño tome medidas razonables para limitar el daño cuando baja el agua. El moho que creció porque la casa se quedó mojada y cerrada por semanas se puede considerar como no haber protegido la propiedad. Esa es una razón más para documentar todo temprano y empezar a secar en uno o dos días. Guarde un registro de lo que hizo y cuándo: fotos del agua, cuándo llamó a la aseguradora, cuándo se sacaron los materiales mojados y el equipo que se usó para secar. Si aparece moho, fotografíelo, repórtelo a su aseguradora como parte del mismo reclamo de inundación y pregunte por escrito qué necesitan de usted. Lea su póliza o llame a su agente para los términos exactos, porque las pólizas privadas pueden ser distintas al NFIP.",
      },
    ],
    image: "/images/king-tide/mold-after-flooding.jpg",
    imageAlt: "Illustration of mold growth on the lower drywall behind a removed baseboard after flooding in a Florida home",
    imageAltEs: "Ilustración de moho en la parte baja del drywall detrás de un zócalo retirado después de una inundación en una casa de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.epa, S.fema],
  },
  {
    slug: "flood-insurance-king-tide",
    question: "Does insurance cover king tide flooding?",
    questionEs: "¿El seguro cubre la inundación por marea rey?",
    title: "Does Insurance Cover King Tide Flooding? Florida Homeowner Guide",
    titleEs: "Seguro de Inundación en Florida: ¿Cubre la Marea Rey?",
    answer:
      "Standard homeowners insurance usually does not. King tide water that rises from the street, a canal or over a seawall counts as flood, which is covered by a separate flood policy through the NFIP or a private carrier. A new NFIP policy normally takes 30 days to start, so buy at least 30 days before the next king tide window.",
    answerEs:
      "El seguro de vivienda estándar normalmente no. El agua de la marea rey que sube desde la calle, un canal o por encima de un muro cuenta como inundación, y eso lo cubre una póliza de inundación aparte, del NFIP o de una aseguradora privada. Una póliza nueva del NFIP normalmente tarda 30 días en empezar, así que cómprela al menos 30 días antes de la próxima marea rey.",
    sections: [
      {
        heading: "The 30-day wait and the November tides",
        headingEs: "Los 30 días de espera y las mareas de noviembre",
        body: [
          "[FloodSmart](https://www.floodsmart.gov/policy-terms), the NFIP's consumer site, says coverage goes into effect 30 days after purchase, with a few exceptions such as buying it while making, increasing, extending or renewing a mortgage. For example, a policy bought on October 29, 2026 would start on November 28. It would not be in force for the November 5 to 11 window or most of November 22 to 28, but it would be for December 24 to 25 and the 2027 season.",
        ],
        bodyEs: [
          "[FloodSmart](https://www.floodsmart.gov/policy-terms), el sitio del NFIP para el consumidor, indica que la cobertura entra en vigor 30 días después de la compra, con algunas excepciones como comprarla al obtener, aumentar, extender o renovar una hipoteca. Por ejemplo, una póliza comprada el 29 de octubre de 2026 empezaría el 28 de noviembre. No estaría vigente para la marea del 5 al 11 de noviembre ni para la mayor parte de la del 22 al 28, pero sí para el 24 y 25 de diciembre y la temporada de 2027.",
        ],
      },
      {
        heading: "If you have a flood policy now",
        headingEs: "Si ya tiene póliza de inundación",
        body: [
          "Report the loss to the company that wrote the policy right away. [Florida's Department of Financial Services](https://www.myfloridacfo.com/division/consumers/storm/flood-disaster-faqs) says you must file a signed proof of loss within 60 days of the date of loss, and lists the NFIP at 877-336-2627. Building coverage and contents coverage are separate under the NFIP, so check which you have. Document before you remove anything, and keep receipts for drying equipment and emergency work. Our [step by step claim guide](/king-tide-flooding/questions/flood-insurance-claim-florida) covers the rest.",
        ],
        bodyEs: [
          "Reporte la pérdida de inmediato a la compañía que emitió la póliza. El [Departamento de Servicios Financieros de Florida](https://www.myfloridacfo.com/division/consumers/storm/flood-disaster-faqs) indica que debe presentar una prueba de pérdida firmada dentro de los 60 días de la fecha de la pérdida, y da el número del NFIP: 877-336-2627. Bajo el NFIP, la cobertura del edificio y la de contenido son separadas, así que revise cuál tiene. Documente antes de sacar nada y guarde los recibos del equipo de secado y del trabajo de emergencia. Nuestra [guía de reclamos paso a paso](/king-tide-flooding/questions/flood-insurance-claim-florida) explica el resto.",
        ],
      },
      {
        heading: "What flood insurance covers and what it does not",
        headingEs: "Qué cubre y qué no cubre el seguro de inundación",
        body: [
          "Under the NFIP, building coverage pays for the structure and foundation, plumbing and electrical systems, central air and heating, and attached cabinets, bookcases, carpet and paneling. Contents coverage pays for clothing, furniture, electronics, curtains, washers and dryers, and freezers and the food in them. Building coverage tops out at $250,000 and contents at $100,000, according to [FloodSmart](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners).",
          "It does not cover temporary housing while the house is repaired, property outside the building like seawalls, decks, fences and pools, cars, or moisture and mold damage the owner could have avoided. That last one is why drying in the first 48 hours matters for your claim, not just for your walls.",
        ],
        bodyEs: [
          "Bajo el NFIP, la cobertura del edificio paga la estructura y los cimientos, la plomería y la electricidad, el aire central y la calefacción, y los gabinetes, libreros, alfombras y paneles fijos. La cobertura de contenido paga la ropa, los muebles, los equipos electrónicos, las cortinas, la lavadora y la secadora, y los congeladores con la comida que tengan. La cobertura del edificio llega hasta $250,000 y la de contenido hasta $100,000, según [FloodSmart](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners).",
          "No cubre vivienda temporal mientras se repara la casa, la propiedad fuera del edificio como muros de contención, terrazas, cercas y piscinas, los carros, ni el daño por humedad y moho que el dueño pudo haber evitado. Eso último es la razón por la que secar en las primeras 48 horas importa para su reclamo, no solo para sus paredes.",
        ],
      },
    ],
    faqs: [
      {
        question: "My homeowners policy covers water damage. Why doesn't it cover this?",
        questionEs: "Mi póliza de vivienda cubre daños por agua. ¿Por qué no cubre esto?",
        answer:
          "Because insurance separates water damage by where the water came from. A homeowners policy usually covers sudden water from inside the house, like a burst supply line or a water heater that fails. It usually excludes flood, which is water that rises from outside and covers normally dry land, whether it comes from rain, storm surge or a king tide coming over a seawall and up through storm drains. That exclusion is the reason the National Flood Insurance Program exists. There are gray areas. Water that backs up through a sewer line or floor drain can be its own category with its own coverage or exclusion. And in a king tide, rain often falls at the same time. Read the definitions in your own policy, describe exactly how the water got in when you report it, and let the adjuster classify it. Do not guess at the cause on the phone. Describe what you saw.",
        answerEs:
          "Porque el seguro separa los daños por agua según de dónde vino el agua. Una póliza de vivienda normalmente cubre agua repentina desde adentro de la casa, como una tubería que revienta o un calentador que falla. Normalmente excluye la inundación, que es agua que sube desde afuera y cubre terreno que suele estar seco, venga de la lluvia, de la marejada o de una marea rey que pasa por encima de un muro y sube por los desagües. Esa exclusión es la razón por la que existe el Programa Nacional de Seguro contra Inundaciones. Hay zonas grises. El agua que se devuelve por una línea de alcantarillado o un desagüe del piso puede ser su propia categoría con su propia cobertura o exclusión. Y durante una marea rey muchas veces llueve al mismo tiempo. Lea las definiciones en su propia póliza, describa exactamente cómo entró el agua cuando la reporte y deje que el ajustador la clasifique. No adivine la causa por teléfono. Describa lo que vio.",
      },
      {
        question: "What do you give me for my insurance claim?",
        questionEs: "¿Qué me dan ustedes para mi reclamo de seguro?",
        answer:
          "We give you the paperwork that shows what happened and what the repair is. That means dated photos of each room before and during the work, the height of the water line and how far the wet reached up the walls, a list of what was removed, and a written scope of the repair broken out by room and by trade: tear-out, drying, drywall, paint, flooring, baseboards, cabinets, and anything else the water reached. If the adjuster asks questions about the scope, we answer them. What we do not do is negotiate your claim or act on your behalf with the insurance company. That relationship is between you, your carrier and your adjuster, and if you want someone to represent you in the claim, that is a different kind of professional. Our job is to give you clear, honest documentation and then do the repair well.",
        answerEs:
          "Le damos los documentos que muestran qué pasó y en qué consiste la reparación. Eso incluye fotos con fecha de cada cuarto antes y durante el trabajo, la altura de la marca del agua y hasta dónde subió lo mojado por las paredes, una lista de lo que se sacó, y un alcance por escrito de la reparación separado por cuarto y por oficio: demolición, secado, drywall, pintura, pisos, zócalos, gabinetes y cualquier otra cosa a la que llegó el agua. Si el ajustador tiene preguntas sobre el alcance, se las respondemos. Lo que no hacemos es negociar su reclamo ni actuar en su nombre ante la aseguradora. Esa relación es entre usted, su aseguradora y su ajustador, y si quiere que alguien lo represente en el reclamo, ese es otro tipo de profesional. Nuestro trabajo es darle documentación clara y honesta y luego hacer bien la reparación.",
      },
    ],
    image: "/images/king-tide/flood-insurance-king-tide.jpg",
    imageAlt: "Illustration of a homeowner photographing the flood water line on a wall for a king tide insurance claim in Florida",
    imageAltEs: "Ilustración de un propietario fotografiando la marca del agua en la pared para un reclamo de seguro por marea rey en Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.floodsmart, S.nfipCovered, S.fema, S.dfs, S.ftlCity],
  },
  {
    slug: "garage-flooded-saltwater",
    question: "My garage flooded with saltwater. What do I do?",
    questionEs: "Mi garaje se inundó con agua salada. ¿Qué hago?",
    title: "Garage Flooded With Saltwater: What to Do After a King Tide",
    titleEs: "Garaje Inundado con Agua Salada: Qué Hacer Después de la Marea Rey",
    answer:
      "Rinse the slab and the bottom of the walls with fresh water, dry the garage with the door open and fans running, and check the drywall on any wall shared with the house. Saltwater speeds up rust on the garage door, springs, water heater and appliances, and soaks into drywall that looks fine from the outside.",
    answerEs:
      "Enjuague el piso y la parte baja de las paredes con agua dulce, seque el garaje con la puerta abierta y ventiladores, y revise el drywall de cualquier pared que comparta con la casa. El agua salada acelera el óxido en la puerta del garaje, los resortes, el calentador y los electrodomésticos, y se mete en el drywall que por fuera se ve bien.",
    sections: [
      {
        heading: "Why garages take the worst of it",
        headingEs: "Por qué el garaje se lleva la peor parte",
        body: [
          "In many South Florida homes the garage slab sits a step below the living area, and the garage door is the lowest opening in the house. During the October 2026 king tide, water stood on streets across Fort Lauderdale, Hollywood and Miami Beach for hours at each high tide. It does not need to come into the house to soak the garage.",
        ],
        bodyEs: [
          "En muchas casas del sur de Florida el piso del garaje está un escalón más bajo que la casa, y la puerta del garaje es la abertura más baja. Durante la marea rey de octubre de 2026, el agua se quedó horas en calles de Fort Lauderdale, Hollywood y Miami Beach en cada marea alta. No necesita entrar a la casa para empapar el garaje.",
        ],
      },
      {
        heading: "What to check",
        headingEs: "Qué revisar",
        body: [
          "The shared wall with the house: drywall, insulation and the bottom plate behind it. The water heater, washer, dryer and any freezer sitting on the slab, which should be checked before use if water reached their controls. The garage door bottom seal, track, springs and opener rail. Anything stored in cardboard on the floor. And the door from the garage into the house, where swelling at the bottom of the frame is an early sign that water got further than you thought.",
        ],
        bodyEs: [
          "La pared compartida con la casa: el drywall, el aislamiento y la solera detrás. El calentador de agua, la lavadora, la secadora y cualquier congelador sobre el piso, que deben revisarse antes de usarlos si el agua llegó a sus controles. El sello inferior de la puerta del garaje, el riel, los resortes y el riel del abridor. Todo lo guardado en cajas de cartón en el piso. Y la puerta del garaje hacia la casa, donde la hinchazón en la base del marco es una señal temprana de que el agua llegó más lejos de lo que pensaba.",
        ],
      },
    ],
    faqs: [
      {
        question: "The water never got past the garage. Do I need to open the wall?",
        questionEs: "El agua nunca pasó del garaje. ¿Tengo que abrir la pared?",
        answer:
          "Only if it is wet inside, and you can find out without tearing anything. Check the wall shared with the house from both sides. On the garage side, look at the bottom of the drywall for staining, softness or a white salt line. On the house side, look at the baseboard and the bottom of the wall for bubbling paint or swelling, and smell for mustiness in that room and the closet next to it. A moisture meter on the lower foot of the wall, on both sides, gives a real answer. If it reads dry a few days after the water went down, rinse, dry and keep an eye on it. If it reads wet, cut the lower section on the garage side, where the patch is easy to hide and the finish is simpler, pull the insulation, rinse and dry the cavity, and close it up when the framing reads dry. That keeps the inside of the house untouched in most cases.",
        answerEs:
          "Solo si está mojada por dentro, y lo puede saber sin romper nada. Revise la pared compartida con la casa por los dos lados. Del lado del garaje, mire la parte baja del drywall buscando manchas, zonas blandas o una línea blanca de sal. Del lado de la casa, mire el zócalo y la parte baja de la pared buscando pintura con burbujas o hinchazón, y huela si hay olor a humedad en ese cuarto y en el clóset de al lado. Un medidor de humedad en el pie más bajo de la pared, por ambos lados, da una respuesta real. Si marca seco unos días después de que bajó el agua, enjuague, seque y esté pendiente. Si marca mojado, corte la parte baja del lado del garaje, donde el parche es fácil de disimular y el acabado es más simple, saque el aislamiento, enjuague y seque la cavidad, y ciérrela cuando la madera marque seca. Así, en la mayoría de los casos, el interior de la casa no se toca.",
      },
      {
        question: "Is my water heater safe after saltwater sat around it?",
        questionEs: "¿Mi calentador de agua es seguro después de que el agua salada lo rodeó?",
        answer:
          "Do not assume it is. If the water only touched the bottom of the tank and never reached the burner on a gas unit or the lower element and wiring on an electric one, it may be fine after the area is rinsed and dried, but have it looked at before relying on it. If water reached the gas burner, the controls or the electrical connections, shut it off and have a plumber or appliance technician inspect it before turning it back on. Saltwater corrodes metal parts and electrical contacts quickly, and the damage may not show for weeks. The same goes for washers, dryers and freezers on the garage floor. Many manufacturers advise replacing gas controls and electrical parts that were under floodwater rather than drying and reusing them. Take photos of each appliance, the water line on it, and its label with the model and serial number for your flood claim. Under the NFIP, a water heater counts as building property, while a washer, dryer or freezer falls under contents coverage, so check which coverage you carry.",
        answerEs:
          "No dé por hecho que sí. Si el agua solo tocó la base del tanque y nunca llegó al quemador en uno de gas, o al elemento inferior y el cableado en uno eléctrico, puede que esté bien después de enjuagar y secar el área, pero que lo revisen antes de confiar en él. Si el agua llegó al quemador de gas, los controles o las conexiones eléctricas, apáguelo y que un plomero o técnico lo inspeccione antes de volver a encenderlo. El agua salada corroe rápido las piezas de metal y los contactos eléctricos, y el daño puede no notarse por semanas. Lo mismo aplica para lavadoras, secadoras y congeladores en el piso del garaje. Muchos fabricantes recomiendan reemplazar los controles de gas y las piezas eléctricas que estuvieron bajo agua en vez de secarlas y reusarlas. Tome fotos de cada equipo, de la marca del agua en él y de su etiqueta con modelo y número de serie para su reclamo de inundación. Bajo el NFIP, el calentador de agua cuenta como parte del edificio, mientras que la lavadora, la secadora o el congelador entran en la cobertura de contenido, así que revise cuál tiene.",
      },
    ],
    image: "/images/king-tide/garage-flooded-saltwater.jpg",
    imageAlt: "Illustration of a South Florida garage after king tide saltwater flooding with wet boxes and a salt line on the slab",
    imageAltEs: "Ilustración de un garaje en el sur de Florida después de la marea rey con cajas mojadas y una línea de sal en el piso",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.cbs26, S.tbt, S.fema],
  },
  {
    slug: "is-it-safe-to-stay-in-flooded-house",
    question: "Is it safe to stay in a house after flooding?",
    questionEs: "¿Es seguro quedarse en una casa después de una inundación?",
    title: "Is It Safe to Stay in a House After King Tide Flooding?",
    titleEs: "¿Es Seguro Quedarse en una Casa Después de la Marea Rey?",
    answer:
      "Often yes, if the water stayed low, the electrical system is safe, and the wet rooms are closed off and being dried. It is not safe if water reached the electrical panel or outlets and they have not been checked, if sewage came in, or if mold is already visible and someone in the house has asthma or a weak immune system.",
    answerEs:
      "Muchas veces sí, si el agua se quedó baja, el sistema eléctrico es seguro y los cuartos mojados están cerrados y secándose. No es seguro si el agua llegó al panel eléctrico o a los tomacorrientes y no se han revisado, si entraron aguas negras, o si ya hay moho visible y alguien en la casa tiene asma o defensas bajas.",
    sections: [
      {
        heading: "Three things to settle first",
        headingEs: "Tres cosas que hay que resolver primero",
        body: [
          "Electricity. Any circuit with outlets, cords or equipment that sat in water stays off until an electrician checks it. Saltwater conducts and corrodes, so a breaker that turns back on is not proof that the circuit is safe.",
          "Sanitation. King tide water comes up through storm drains and, this October, was reported alongside backed-up sewage systems on the coast. Floors and surfaces it touched need cleaning, and kids and pets stay out until then.",
          "Air. Wet drywall, carpet and insulation start [growing mold within a day or two](/king-tide-flooding/questions/mold-after-flooding). Removing them and running dehumidifiers keeps the air in the rest of the house clean.",
        ],
        bodyEs: [
          "Electricidad. Cualquier circuito con tomacorrientes, cables o equipos que estuvieron en el agua se queda apagado hasta que un electricista lo revise. El agua salada conduce y corroe, así que un breaker que vuelve a encender no prueba que el circuito sea seguro.",
          "Sanidad. El agua de la marea rey sube por los desagües pluviales y, este octubre, se reportó junto con sistemas de aguas negras desbordados en la costa. Los pisos y superficies que tocó necesitan limpieza, y los niños y mascotas se quedan afuera hasta entonces.",
          "Aire. El drywall, la alfombra y el aislamiento mojados empiezan a [criar moho en uno o dos días](/king-tide-flooding/questions/mold-after-flooding). Sacarlos y poner deshumidificadores mantiene limpio el aire del resto de la casa.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I turn the AC back on after the flood?",
        questionEs: "¿Puedo volver a encender el aire acondicionado después de la inundación?",
        answer:
          "If the outdoor condenser, the indoor air handler and their electrical connections stayed dry, yes, and running the AC actually helps drying, because it pulls moisture out of the air. Keep the thermostat at a normal setting and keep windows closed so you are not pulling humid outside air into the house. If water reached the air handler, which in many Florida homes sits in a closet or garage at floor level, or if the condenser outside sat in water, leave the system off and have an AC technician check it first. Saltwater can damage the electrical components and the coil, and an air handler that sat in floodwater can spread contaminated air through the ducts. The same goes for any ductwork that runs under the floor or in a space that flooded. Ask the technician to look at the drain pan and the ducts as well, not just whether the unit turns on.",
        answerEs:
          "Si el condensador de afuera, la manejadora de adentro y sus conexiones eléctricas se mantuvieron secos, sí, y prender el aire de hecho ayuda a secar, porque saca humedad del aire. Mantenga el termostato en un nivel normal y las ventanas cerradas para no meter el aire húmedo de afuera. Si el agua llegó a la manejadora, que en muchas casas de Florida está en un clóset o en el garaje a nivel del piso, o si el condensador de afuera estuvo en el agua, deje el sistema apagado y que un técnico de aire lo revise primero. El agua salada puede dañar los componentes eléctricos y el serpentín, y una manejadora que estuvo en agua de inundación puede repartir aire contaminado por los ductos. Lo mismo aplica para ductos que pasan por debajo del piso o por un espacio que se inundó. Pídale al técnico que revise también la bandeja de drenaje y los ductos, no solo si la unidad enciende.",
      },
      {
        question: "Is king tide water dangerous to walk through?",
        questionEs: "¿Es peligroso caminar por el agua de la marea rey?",
        answer:
          "It can be. King tide water looks calm, but it is not clean. It comes up through storm drains and canals and mixes with whatever is on the street, including oil, fuel, fertilizer and sometimes sewage, which was reported backing up along the coast during the October 2026 tide. Cuts and scrapes on your feet or legs can get infected, so wear closed boots, not sandals, and wash any skin it touched with soap and clean water. You also cannot see what is under it: missing drain grates, curbs, broken pavement and debris. Inside the house, standing water near outlets or appliances can be energized, so do not walk through it until the power to that area is off. And keep cars out of it. Saltwater damages brakes, wiring and the underside of a car, and reporters in Fort Lauderdale saw several cars stall in it this October.",
        answerEs:
          "Puede serlo. El agua de la marea rey se ve tranquila, pero no está limpia. Sube por los desagües y los canales y se mezcla con lo que haya en la calle, como aceite, combustible, fertilizante y a veces aguas negras, que se reportaron desbordadas en la costa durante la marea de octubre de 2026. Las cortadas y raspones en los pies o las piernas se pueden infectar, así que use botas cerradas, no sandalias, y lave con agua limpia y jabón la piel que tocó el agua. Tampoco se ve lo que hay debajo: rejillas faltantes, bordes de acera, pavimento roto y escombros. Dentro de la casa, el agua estancada cerca de tomacorrientes o equipos puede tener corriente, así que no camine por ella hasta que la electricidad de esa zona esté apagada. Y mantenga los carros fuera del agua. El agua salada daña los frenos, el cableado y la parte de abajo del carro, y la prensa en Fort Lauderdale vio varios carros apagarse en ella este octubre.",
      },
    ],
    image: "/images/king-tide/is-it-safe-to-stay-in-flooded-house.jpg",
    imageAlt: "Illustration of a home electrical panel switched off above a wet floor after flooding in Florida",
    imageAltEs: "Ilustración de un panel eléctrico apagado sobre un piso mojado después de una inundación en Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.tbt, S.cbs26, S.epa],
  },
  {
    slug: "water-damaged-drywall-signs",
    question: "How can I tell if my drywall has water damage after a flood?",
    questionEs: "¿Cómo sé si mi drywall tiene daño por agua después de una inundación?",
    title: "Signs of Water Damaged Drywall After a King Tide",
    titleEs: "Señales de Drywall Dañado por Agua Después de la Marea Rey",
    answer:
      "Look low on the walls: bubbling or peeling paint, a faint brown or white line, baseboards swelling or pulling away, drywall that feels soft or crumbles when pressed, and a musty smell in the room. Some damage takes days or weeks to show, so a moisture meter is the only reliable check after saltwater flooding.",
    answerEs:
      "Mire la parte baja de las paredes: pintura con burbujas o despegada, una línea tenue marrón o blanca, zócalos hinchados o separados de la pared, drywall que se siente blando o se desmorona al presionarlo, y olor a humedad en el cuarto. Algunos daños tardan días o semanas en notarse, así que un medidor de humedad es la única forma confiable de revisar después de una inundación con agua salada.",
    sections: [
      {
        heading: "Why it can look fine and still be wet",
        headingEs: "Por qué se puede ver bien y seguir mojado",
        body: [
          "Paint is a skin. Behind it, the paper face and the gypsum can be soaked while the surface looks normal, especially on walls where water stood only an inch or two deep. With saltwater, salt crystals left in the paper keep drawing moisture back in, and the signs show up later: blistering a week after the water went down, a white powdery line as the salt comes out, or a stain that grows instead of fading.",
        ],
        bodyEs: [
          "La pintura es una piel. Detrás, el papel y el yeso pueden estar empapados mientras la superficie se ve normal, sobre todo en paredes donde el agua estuvo apenas una o dos pulgadas. Con agua salada, los cristales de sal que quedan en el papel siguen atrayendo humedad, y las señales aparecen después: ampollas una semana después de que bajó el agua, una línea blanca como polvo cuando la sal sale, o una mancha que crece en vez de desaparecer.",
        ],
      },
    ],
    faqs: [
      {
        question: "The baseboards look swollen but the wall looks fine. What does that mean?",
        questionEs: "Los zócalos se ven hinchados pero la pared se ve bien. ¿Qué significa?",
        answer:
          "It usually means water reached the bottom of the wall and [the drywall behind the baseboard](/king-tide-flooding/questions/flood-cut-drywall) got wet too, even if the painted face above it looks normal. Most baseboards in newer South Florida homes are MDF, which swells the first time it soaks up water and does not go back. That swelling is a useful warning, because the baseboard sits right where the drywall meets the floor, which is the spot that soaks up the most. Pull one swollen baseboard off carefully and look at the bottom of the drywall behind it. If the paper is stained, soft, or crumbles at the edge, the lower section of the wall is wet. Check it with a moisture meter a few inches up and keep going until it reads dry. In most cases the swollen baseboards get replaced, and the drywall gets cut above the wet line. If you are rebuilding on a street that floods, PVC or composite baseboards will not swell the next time.",
        answerEs:
          "Normalmente significa que el agua llegó a la base de la pared y [el drywall detrás del zócalo](/king-tide-flooding/questions/flood-cut-drywall) también se mojó, aunque la parte pintada de arriba se vea normal. La mayoría de los zócalos en casas más nuevas del sur de Florida son de MDF, que se hincha la primera vez que absorbe agua y no vuelve a su forma. Esa hinchazón es una buena advertencia, porque el zócalo está justo donde el drywall se junta con el piso, que es el punto que más absorbe. Quite con cuidado un zócalo hinchado y mire la parte baja del drywall detrás. Si el papel está manchado, blando o se desmorona en el borde, la parte baja de la pared está mojada. Revísela con un medidor de humedad unas pulgadas más arriba y siga subiendo hasta que marque seco. En la mayoría de los casos los zócalos hinchados se reemplazan y el drywall se corta por encima de la línea mojada. Si va a reconstruir en una calle que se inunda, los zócalos de PVC o compuesto no se van a hinchar la próxima vez.",
      },
      {
        question: "Can water damaged drywall be dried instead of replaced?",
        questionEs: "¿El drywall dañado por agua se puede secar en vez de reemplazar?",
        answer:
          "Sometimes, after clean water. After king tide water, usually not. Drywall that got wet from a clean source, like a supply line leak caught quickly, can sometimes be dried in place if it has not lost strength and drying starts right away. King tide water is different. It comes from outside, through storm drains and canals, and restoration standards treat that kind of floodwater as contaminated. Drywall is porous, so whatever was in the water, including salt and bacteria, is now inside the paper and gypsum, and you cannot wash it out of the inside of a sheet. Salt left in it keeps pulling moisture back in for weeks. That is why the normal approach after saltwater flooding is to cut the wet drywall out above the highest wet reading, clean and dry the framing, and hang new board. The good news is that drywall is one of the cheapest parts of the repair. Leaving the wrong piece in place is what gets expensive.",
        answerEs:
          "A veces, después de agua limpia. Después de agua de marea rey, normalmente no. El drywall que se mojó con agua limpia, como una fuga en una tubería que se detectó rápido, a veces se puede secar en su lugar si no perdió firmeza y el secado empieza enseguida. El agua de la marea rey es distinta. Viene de afuera, por desagües y canales, y los estándares de restauración tratan ese tipo de inundación como contaminada. El drywall es poroso, así que lo que traía el agua, incluida la sal y las bacterias, ahora está dentro del papel y el yeso, y eso no se puede lavar desde adentro de una plancha. La sal que queda sigue atrayendo humedad por semanas. Por eso lo normal después de una inundación con agua salada es cortar el drywall mojado por encima de la lectura mojada más alta, limpiar y secar la madera, e instalar planchas nuevas. Lo bueno es que el drywall es una de las partes más baratas de la reparación. Lo que sale caro es dejar en su lugar la pieza equivocada.",
      },
    ],
    image: "/images/king-tide/water-damaged-drywall-signs.jpg",
    imageAlt: "Illustration of water damaged drywall with bubbling paint and a swollen baseboard after a South Florida flood",
    imageAltEs: "Ilustración de drywall dañado por agua con pintura con burbujas y zócalo hinchado después de una inundación en el sur de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.epa],
  },
  {
    slug: "are-king-tides-getting-worse",
    question: "Are king tides getting worse in South Florida?",
    questionEs: "¿Las mareas rey están empeorando en el sur de Florida?",
    title: "Are King Tides Getting Worse in Fort Lauderdale and Miami?",
    titleEs: "¿Están Empeorando las Mareas Rey en Fort Lauderdale y Miami?",
    answer:
      "Yes. Miami has gained about 8 inches of sea level since 1994, and in October 2026 Fort Lauderdale's king tide expert said the water ran 6 inches higher than previous king tides. The Port Everglades gauge set a record in September 2026 and broke it again a month later. Higher baseline water means each tide reaches streets that used to stay dry.",
    answerEs:
      "Sí. Miami ha ganado unas 8 pulgadas de nivel del mar desde 1994, y en octubre de 2026 la experta en mareas rey de Fort Lauderdale dijo que el agua llegó 6 pulgadas más alto que en mareas rey anteriores. El medidor de Port Everglades marcó un récord en septiembre de 2026 y lo volvió a romper un mes después. Un nivel base más alto significa que cada marea llega a calles que antes se quedaban secas.",
    sections: [
      {
        heading: "What the October 2026 numbers show",
        headingEs: "Lo que muestran los números de octubre de 2026",
        body: [
          "On October 27, 2026, Miami's Virginia Key gauge recorded the most water it has measured outside a hurricane since it was installed in 1994, about 2.5 feet above high tide. University of Miami researcher Brian McNoldy said it was essentially tied with Hurricanes Wilma and Irene, and called it the highest king tide ever. Researchers also point to a clear trend toward more hours each year above normal high tide.",
          "In Fort Lauderdale, the city's Dr. Nancy Gassman said the number of high tides and their maximum height have both gone up, and named new spots reached this year, including the Himarshee district and Mayan Drive.",
        ],
        bodyEs: [
          "El 27 de octubre de 2026, el medidor de Virginia Key en Miami registró la mayor cantidad de agua fuera de un huracán desde que se instaló en 1994, cerca de 2.5 pies sobre la marea alta. El investigador de la Universidad de Miami Brian McNoldy dijo que prácticamente empató con los huracanes Wilma e Irene, y la llamó la marea rey más alta de la historia. Los investigadores también señalan una tendencia clara a más horas cada año por encima de la marea alta normal.",
          "En Fort Lauderdale, la Dra. Nancy Gassman de la ciudad dijo que tanto la cantidad de mareas altas como su altura máxima han subido, y nombró lugares nuevos a los que llegó el agua este año, como el distrito de Himarshee y Mayan Drive.",
        ],
      },
      {
        heading: "What it means for your house",
        headingEs: "Lo que significa para su casa",
        body: [
          "Projections cited after this tide put South Florida at about two more feet of sea level by 2060. For homeowners on low streets, the practical takeaway is that a house that flooded once is likely to flood again. When you repair, rebuild the lowest part of each room with materials that can be rinsed and dried, keep valuables and equipment off the floor, and look at flood coverage well before the next season, since new NFIP policies usually take 30 days to start.",
        ],
        bodyEs: [
          "Las proyecciones citadas después de esta marea ponen al sur de Florida en unos dos pies más de nivel del mar para 2060. Para los propietarios en calles bajas, la conclusión práctica es que una casa que se inundó una vez probablemente se inunde otra vez. Cuando repare, reconstruya la parte más baja de cada cuarto con materiales que se puedan enjuagar y secar, mantenga los objetos de valor y los equipos fuera del piso, y revise la cobertura de inundación mucho antes de la próxima temporada, porque las pólizas nuevas del NFIP normalmente tardan 30 días en empezar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is my neighborhood going to keep flooding on king tides?",
        questionEs: "¿Mi barrio va a seguir inundándose con las mareas rey?",
        answer:
          "If it flooded this October, plan as if it will again. The streets that flooded in 2026, like the isles off Las Olas, Hollywood Lakes, North Beach in Miami Beach and the canal neighborhoods in Miami Shores, share a few traits: low ground, water on several sides, and drainage that empties into a canal or the bay. When the water outside is high, those drains run backward. Cities are raising seawalls, adding tidal valves and planning bigger pumps and gates, and those help, but sea level keeps rising underneath them, and the projects take years. Fort Lauderdale also noted this year that the tide reached places that had not flooded before, so being on a street that stayed dry in the past is no longer a guarantee. For a homeowner, the useful steps are the ones you control: know your elevation, check your flood coverage, keep the lowest part of the house built to survive water, and know the dates.",
        answerEs:
          "Si se inundó este octubre, planee como si fuera a pasar otra vez. Las calles que se inundaron en 2026, como las islas junto a Las Olas, Hollywood Lakes, North Beach en Miami Beach y los barrios de canales en Miami Shores, tienen algunas cosas en común: terreno bajo, agua por varios lados y drenaje que desemboca en un canal o en la bahía. Cuando el agua de afuera está alta, esos desagües corren al revés. Las ciudades están elevando muros, poniendo válvulas de marea y planeando bombas y compuertas más grandes, y eso ayuda, pero el nivel del mar sigue subiendo por debajo, y los proyectos tardan años. Fort Lauderdale también señaló este año que la marea llegó a lugares que antes no se inundaban, así que estar en una calle que siempre se quedó seca ya no es garantía. Para un propietario, los pasos útiles son los que usted controla: conocer la elevación de su casa, revisar su cobertura de inundación, mantener la parte más baja de la casa construida para aguantar el agua y conocer las fechas.",
      },
      {
        question: "Should I raise my house or just rebuild the lower walls better?",
        questionEs: "¿Debo elevar mi casa o solo reconstruir mejor la parte baja de las paredes?",
        answer:
          "That depends on how often and how deep the water gets in, and on your budget, and it is a bigger question than a remodel. Raising a house is a major structural project with engineering, permits and costs well beyond a repair, and it is not something we do. What we can help with is the part most homeowners can act on right away: rebuilding the lowest two to four feet of the house so the next flood is a cleanup instead of a gut job. That means waterproof flooring or tile instead of wood and laminate, PVC or composite baseboards, a gap at the bottom of the drywall, mold-resistant board in the lowest row, and cabinet bases that are not particle board. It also means moving what you can, like a washer, dryer or freezer, off the garage floor. If water comes in more than once a year or gets more than a few inches deep, it is worth talking to an engineer about elevation and to your city about any flood mitigation grants.",
        answerEs:
          "Depende de qué tan seguido y qué tan alto entra el agua, y de su presupuesto, y es una pregunta más grande que una remodelación. Elevar una casa es un proyecto estructural grande, con ingeniería, permisos y costos muy por encima de una reparación, y no es algo que hagamos nosotros. Con lo que sí podemos ayudar es con la parte en la que la mayoría de los propietarios puede actuar enseguida: reconstruir los dos a cuatro pies más bajos de la casa para que la próxima inundación sea una limpieza y no una demolición total. Eso significa pisos impermeables o losa en vez de madera y laminado, zócalos de PVC o compuesto, un espacio en la base del drywall, plancha resistente al moho en la fila más baja y bases de gabinetes que no sean de aglomerado. También significa subir lo que pueda, como la lavadora, la secadora o el congelador, del piso del garaje. Si el agua entra más de una vez al año o sube más de unas pulgadas, vale la pena hablar con un ingeniero sobre elevar la casa y con su ciudad sobre fondos de mitigación de inundaciones.",
      },
    ],
    image: "/images/king-tide/are-king-tides-getting-worse.jpg",
    imageAlt: "Illustration of sunny day tidal flooding spilling over a seawall onto a South Florida bayfront street",
    imageAltEs: "Ilustración de inundación por marea en un día soleado pasando por encima de un muro hacia una calle frente a la bahía en el sur de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.tbt, S.cbs28, S.floodsmart],
  },
  {
    slug: "who-to-call-for-water-damage",
    question: "Who do I call for water damage after a flood?",
    questionEs: "¿A quién llamo por daños de agua después de una inundación?",
    title: "Who to Call for Flood Water Damage in Fort Lauderdale and Miami",
    titleEs: "A Quién Llamar por Daños de Agua en Fort Lauderdale y Miami",
    answer:
      "Call your flood insurance company first to open a claim. Then call a company that removes wet material and dries the house, because [the EPA says](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) wet materials should be dried within 24 to 48 hours to prevent mold. Call an electrician if water reached outlets or the panel, and your AC company if it reached the air handler.",
    answerEs:
      "Llame primero a su compañía de seguro de inundación para abrir un reclamo. Después llame a una compañía que saque el material mojado y seque la casa, porque [la EPA indica](https://www.epa.gov/mold/brief-guide-mold-moisture-and-your-home) que los materiales mojados deben secarse en 24 a 48 horas para evitar el moho. Llame a un electricista si el agua llegó a los tomacorrientes o al panel, y a su compañía de aire acondicionado si llegó a la manejadora.",
    sections: [
      {
        heading: "Who does what after a flood",
        headingEs: "Quién hace qué después de una inundación",
        body: [
          "Your flood carrier. Report the loss and get a claim number. The [NFIP claims checklist](https://www.floodsmart.gov/claims-checklist) says an adjuster should contact you within 48 hours of the report. Our [claim guide](/king-tide-flooding/questions/flood-insurance-claim-florida) walks through the rest.",
          "Tear-out and drying. This is the work that stops the damage: pulling wet carpet, baseboards and the bottom of the drywall, rinsing off salt, and running air movers and dehumidifiers until moisture readings come back dry. It is what people mean by water mitigation. See [how long drying takes](/king-tide-flooding/questions/how-long-to-dry-out-house-after-flood).",
          "Rebuild. New drywall, paint, baseboards, flooring, cabinets and any bathroom or kitchen work. Using the same company for drying and rebuild keeps anything from falling through the gap between the two.",
          "Electrician and AC technician. Saltwater corrodes wiring and equipment. If water touched outlets, the panel or the air handler, they check it before the power or the AC goes back on.",
          "Mold professional. For mold over about 10 square feet, the EPA points you to a professional. Florida regulates mold remediation, and you can look up any company on the [Florida DBPR site](https://www.myfloridalicense.com/).",
          "Plumber. Only if the water came from a pipe, a water heater or a sewer backup inside the house. A plumber does not fix king tide damage.",
        ],
        bodyEs: [
          "Su aseguradora de inundación. Reporte la pérdida y pida un número de reclamo. La [lista de reclamos del NFIP](https://www.floodsmart.gov/claims-checklist) indica que un ajustador debe contactarlo dentro de las 48 horas del reporte. Nuestra [guía de reclamos](/king-tide-flooding/questions/flood-insurance-claim-florida) explica el resto.",
          "Demolición y secado. Es el trabajo que detiene el daño: sacar la alfombra, los zócalos y la parte baja del drywall mojados, enjuagar la sal y poner ventiladores y deshumidificadores hasta que las lecturas de humedad salgan secas. Es lo que se conoce como mitigación de agua. Vea [cuánto tarda el secado](/king-tide-flooding/questions/how-long-to-dry-out-house-after-flood).",
          "Reconstrucción. Drywall nuevo, pintura, zócalos, pisos, gabinetes y cualquier trabajo de baño o cocina. Usar la misma compañía para el secado y la reconstrucción evita que algo se pierda entre las dos.",
          "Electricista y técnico de aire acondicionado. El agua salada corroe los cables y los equipos. Si el agua tocó tomacorrientes, el panel o la manejadora, ellos la revisan antes de volver a dar la luz o prender el aire.",
          "Profesional de moho. Para moho de más de unos 10 pies cuadrados, la EPA recomienda un profesional. Florida regula la remediación de moho, y puede buscar cualquier compañía en el [sitio del DBPR de Florida](https://www.myfloridalicense.com/).",
          "Plomero. Solo si el agua vino de una tubería, un calentador o un reflujo de aguas negras dentro de la casa. Un plomero no arregla daños de marea rey.",
        ],
      },
      {
        heading: "What happens when you call us",
        headingEs: "Qué pasa cuando nos llama",
        body: [
          "We are a family owned, fully insured remodeling company working across Miami-Dade and Broward. On the phone we ask where the water came in, how high it got, whether the power is on and whether you have a flood policy. At the house we take moisture readings on every wall the water touched, show you what has to come out and what can stay, and photograph everything for your claim. You get a written scope, room by room.",
          "What we do not do: electrical panel or AC repair, and we do not negotiate your claim. If we find mold beyond a small patch, we tell you, and you bring in a mold professional.",
        ],
        bodyEs: [
          "Somos una empresa de remodelación familiar y totalmente asegurada que trabaja en Miami-Dade y Broward. Por teléfono le preguntamos por dónde entró el agua, hasta dónde subió, si hay luz y si tiene póliza de inundación. En la casa medimos la humedad en cada pared que tocó el agua, le mostramos qué hay que sacar y qué se puede quedar, y fotografiamos todo para su reclamo. Usted recibe un alcance por escrito, cuarto por cuarto.",
          "Lo que no hacemos: reparar el panel eléctrico o el aire acondicionado, ni negociar su reclamo. Si encontramos moho más allá de una mancha pequeña, se lo decimos y usted trae a un profesional de moho.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is water mitigation the same as water damage restoration?",
        questionEs: "¿La mitigación de agua es lo mismo que la restauración por daños de agua?",
        answer:
          "They overlap, and companies use the words loosely. Mitigation is the emergency part: stopping more damage by getting the water and the wet material out and drying the structure. Restoration usually means the whole job, mitigation plus putting the house back together. Rebuild, or reconstruction, is the second half on its own: drywall, paint, flooring, cabinets and trim. What matters more than the label is who does each half. When one company dries the house and a different one rebuilds it, the handoff is where things go wrong. Walls get closed before they read dry, or part of the scope falls in a gap that neither side priced. Ask any company two questions. Will you give me moisture readings in writing as the house dries? And do you rebuild, or will I need someone else? We do the tear-out, the drying and the rebuild, so the crew that opened the wall is the crew that closes it.",
        answerEs:
          "Se parecen, y las compañías usan las palabras sin mucho cuidado. La mitigación es la parte de emergencia: detener más daño sacando el agua y el material mojado y secando la estructura. La restauración normalmente es el trabajo completo, la mitigación más volver a armar la casa. La reconstrucción es la segunda mitad sola: drywall, pintura, pisos, gabinetes y molduras. Lo que importa más que el nombre es quién hace cada mitad. Cuando una compañía seca la casa y otra distinta la reconstruye, el cambio de manos es donde las cosas salen mal. Se cierran paredes antes de que marquen secas, o una parte del trabajo queda en un hueco que ninguno cotizó. Hágale dos preguntas a cualquier compañía. ¿Me da las lecturas de humedad por escrito mientras se seca la casa? ¿Y ustedes reconstruyen, o voy a necesitar a otro? Nosotros hacemos la demolición, el secado y la reconstrucción, así que el equipo que abre la pared es el mismo que la cierra.",
      },
      {
        question: "What should I have ready when I call?",
        questionEs: "¿Qué debo tener listo cuando llame?",
        answer:
          "A few things make the first call and the walkthrough faster. Your address and the best number to reach you. When the water came in, how high it got inside, and whether it is still there. Whether the power is on, and whether water reached any outlets, the electrical panel or the AC air handler. Whether you have flood insurance, and the claim number if you already reported it. Photos or video from before anything was moved, if you took them. And a list of the rooms that got wet, including closets and the garage, since those are the easiest to forget. If you do not have all of this, call anyway. Starting the drying a day earlier matters more than having perfect information, because every day a wall stays wet adds to what has to come out of it.",
        answerEs:
          "Algunas cosas hacen más rápida la primera llamada y la visita. Su dirección y el mejor número para localizarlo. Cuándo entró el agua, hasta dónde subió adentro y si todavía está ahí. Si hay luz, y si el agua llegó a algún tomacorriente, al panel eléctrico o a la manejadora del aire acondicionado. Si tiene seguro de inundación, y el número de reclamo si ya lo reportó. Fotos o video de antes de mover nada, si los tomó. Y una lista de los cuartos que se mojaron, incluyendo clósets y el garaje, que son los más fáciles de olvidar. Si no tiene todo esto, llame de todas formas. Empezar el secado un día antes importa más que tener la información perfecta, porque cada día que una pared sigue mojada aumenta lo que hay que sacarle.",
      },
    ],
    image: "/images/king-tide/who-to-call-for-water-damage.jpg",
    imageAlt: "Illustration of a homeowner on the phone in a flooded South Florida living room with air movers drying the floor",
    imageAltEs: "Ilustración de un propietario hablando por teléfono en una sala inundada del sur de Florida con ventiladores secando el piso",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.nfipClaims, S.epa],
  },
  {
    slug: "flood-insurance-claim-florida",
    question: "How do I file a flood insurance claim after the king tide?",
    questionEs: "¿Cómo hago un reclamo de seguro de inundación después de la marea rey?",
    title: "How to File a Flood Insurance Claim in Florida After a King Tide",
    titleEs: "Cómo Hacer un Reclamo de Seguro de Inundación en Florida",
    answer:
      "Call the company that wrote your flood policy and get a claim number. Before cleanup, photograph and video every room and the water line, keep samples of what you throw out, and list damaged belongings. The [NFIP claims checklist](https://www.floodsmart.gov/claims-checklist) says an adjuster should contact you within 48 hours, and your documentation is due within 60 days of the flood.",
    answerEs:
      "Llame a la compañía que emitió su póliza de inundación y pida un número de reclamo. Antes de limpiar, tome fotos y video de cada cuarto y de la marca del agua, guarde muestras de lo que bote y haga una lista de las pertenencias dañadas. La [lista de reclamos del NFIP](https://www.floodsmart.gov/claims-checklist) indica que un ajustador debe contactarlo en 48 horas, y su documentación vence a los 60 días de la inundación.",
    sections: [
      {
        heading: "Step by step",
        headingEs: "Paso a paso",
        body: [
          "1. Report it. Call your agent or insurance company as soon as you can, with your policy number if you have it. You can report the claim before you are back in the house.",
          "2. Keep a log. Write down every call: the date, the time, who you spoke with, the adjuster's name and what was said.",
          "3. Document. Photograph and video the outside and inside of the house, the water line inside and out, and every damaged item. Get the make, model and serial number of appliances. For contents, list each item with a description, age, quantity and replacement cost.",
          "4. Separate and keep samples. Move damaged things away from what was not damaged. If something has to go, keep a sample of the carpet, flooring or blinds for the adjuster.",
          "5. Start safe cleanup. The checklist says not to throw anything away before the adjuster sees it unless it is a health hazard. [FEMA's flood repair guide](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) treats drywall soaked by floodwater as a health hazard, so photograph it, keep a piece, and ask your carrier before you hold off on drying.",
          "6. Send your documentation within 60 days of the flood, or by the deadline your adjuster gives you.",
        ],
        bodyEs: [
          "1. Repórtelo. Llame a su agente o a su aseguradora lo antes posible, con su número de póliza si lo tiene. Puede reportar el reclamo antes de volver a la casa.",
          "2. Lleve un registro. Anote cada llamada: la fecha, la hora, con quién habló, el nombre del ajustador y lo que se dijo.",
          "3. Documente. Tome fotos y video de afuera y adentro de la casa, de la marca del agua por dentro y por fuera, y de cada cosa dañada. Anote la marca, el modelo y el número de serie de los electrodomésticos. Para el contenido, haga una lista de cada artículo con descripción, edad, cantidad y costo de reemplazo.",
          "4. Separe y guarde muestras. Aparte lo dañado de lo que no se dañó. Si algo se tiene que botar, guarde una muestra de la alfombra, el piso o las persianas para el ajustador.",
          "5. Empiece a limpiar con seguridad. La lista indica no botar nada antes de que el ajustador lo vea, a menos que sea un peligro para la salud. La [guía de reparación de FEMA](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) trata el drywall empapado por la inundación como un peligro para la salud, así que fotografíelo, guarde un pedazo y consulte a su aseguradora antes de retrasar el secado.",
          "6. Envíe su documentación dentro de los 60 días de la inundación, o en el plazo que le dé su ajustador.",
        ],
      },
      {
        heading: "When the adjuster comes",
        headingEs: "Cuando llega el ajustador",
        body: [
          "Ask to see the adjuster's Flood Control Number card and a government photo ID. Give them your photos, video and lists. You can ask for an advance partial payment. When the estimate comes, read it line by line against what you saw in the house, and ask them to correct anything missing or wrong.",
          "If you find more damage later, or the repair costs more than the estimate, you can request an additional payment at any time, even after the claim seems settled. If the claim is denied, you can appeal to FEMA within 60 days of the denial letter. All of this comes from the NFIP checklist. Private flood policies set their own rules, so read yours, and see [what flood insurance covers](/king-tide-flooding/questions/flood-insurance-king-tide).",
        ],
        bodyEs: [
          "Pida ver la tarjeta Flood Control Number del ajustador y una identificación oficial con foto. Entréguele sus fotos, videos y listas. Puede pedir un pago parcial por adelantado. Cuando llegue el estimado, léalo línea por línea comparándolo con lo que vio en la casa, y pida que corrijan cualquier cosa que falte o esté mal.",
          "Si después encuentra más daño, o la reparación cuesta más que el estimado, puede pedir un pago adicional en cualquier momento, aunque el reclamo parezca cerrado. Si le niegan el reclamo, puede apelar ante FEMA dentro de los 60 días de la carta de negación. Todo esto viene de la lista del NFIP. Las pólizas privadas tienen sus propias reglas, así que lea la suya, y vea [qué cubre el seguro de inundación](/king-tide-flooding/questions/flood-insurance-king-tide).",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I start drying the house before the adjuster comes?",
        questionEs: "¿Puedo empezar a secar la casa antes de que llegue el ajustador?",
        answer:
          "In most cases you should start protecting the house, as long as you document first. The NFIP checklist tells policyholders to ask their insurer which cleanup costs are covered and to begin cleanup safely, while not throwing items away before the adjuster sees them unless they are a health hazard. FEMA's own repair guide treats drywall soaked by floodwater as a health hazard, and in a South Florida house wet drywall, carpet and pad start growing mold within a day or two. So the order is: photograph and video every room, measure and write down the water line, keep a cut sample of each wet material, then remove it and start the dehumidifiers. Call your carrier first and ask if they want anything held. Keep receipts for drying equipment and emergency work. And remember that NFIP coverage [excludes mold the owner could have avoided](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners), which is one more reason not to wait.",
        answerEs:
          "En la mayoría de los casos debe empezar a proteger la casa, siempre que documente primero. La lista del NFIP le indica al asegurado que pregunte a su aseguradora qué gastos de limpieza cubre y que empiece a limpiar con seguridad, sin botar nada antes de que lo vea el ajustador a menos que sea un peligro para la salud. La propia guía de reparación de FEMA trata el drywall empapado por la inundación como un peligro para la salud, y en una casa del sur de Florida el drywall, la alfombra y el acolchado mojados empiezan a criar moho en uno o dos días. El orden es: tome fotos y video de cada cuarto, mida y anote la marca del agua, guarde una muestra cortada de cada material mojado, y luego sáquelo y prenda los deshumidificadores. Llame primero a su aseguradora y pregunte si quieren que guarde algo. Guarde los recibos del equipo de secado y del trabajo de emergencia. Y recuerde que la cobertura del NFIP [excluye el moho que el dueño pudo haber evitado](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners), una razón más para no esperar.",
      },
      {
        question: "What if the adjuster's estimate is too low?",
        questionEs: "¿Qué hago si el estimado del ajustador es muy bajo?",
        answer:
          "First, compare it room by room with what you know was damaged. Common gaps are the height of the drywall cut, insulation, baseboards, cabinet bases, closets, door casings and the cost of drying equipment. Write down anything missing and send it to the adjuster with photos. The NFIP checklist says you can ask them to correct mistakes, and you can request an additional payment at any time if you find more damage or the real repair cost is higher than the estimate, even after the claim looks settled. A written scope from the company doing the repair, broken out by room and by trade, makes that request much easier to support. We put one together for every flood job, and we answer the adjuster's questions about it. We do not negotiate the claim for you. If the claim is denied, the appeal goes to FEMA within 60 days of the denial letter.",
        answerEs:
          "Primero, compárelo cuarto por cuarto con lo que usted sabe que se dañó. Lo que más se queda fuera es la altura del corte del drywall, el aislamiento, los zócalos, las bases de los gabinetes, los clósets, los marcos de las puertas y el costo del equipo de secado. Anote lo que falte y envíeselo al ajustador con fotos. La lista del NFIP indica que puede pedir que corrijan los errores, y que puede pedir un pago adicional en cualquier momento si encuentra más daño o si la reparación real cuesta más que el estimado, aunque el reclamo parezca cerrado. Un alcance por escrito de la compañía que hace la reparación, separado por cuarto y por oficio, hace mucho más fácil respaldar ese pedido. Nosotros preparamos uno en cada trabajo de inundación y respondemos las preguntas del ajustador sobre él. No negociamos el reclamo por usted. Si se lo niegan, la apelación va a FEMA dentro de los 60 días de la carta de negación.",
      },
    ],
    image: "/images/king-tide/flood-insurance-claim-florida.jpg",
    imageAlt: "Illustration of a homeowner photographing a flooded kitchen and writing an inventory for a Florida flood insurance claim",
    imageAltEs: "Ilustración de un propietario fotografiando una cocina inundada y haciendo un inventario para un reclamo de seguro de inundación en Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.nfipClaims, S.nfipCovered, S.p234, S.dfs],
  },
  {
    slug: "water-damaged-kitchen-cabinets",
    question: "Can water damaged kitchen cabinets be saved after a flood?",
    questionEs: "¿Se pueden salvar los gabinetes de cocina dañados por el agua?",
    title: "Water Damaged Kitchen Cabinets After a Flood: Repair or Replace?",
    titleEs: "Gabinetes de Cocina Dañados por Agua: ¿Reparar o Reemplazar?",
    answer:
      "It depends on the material and how long they sat wet. Solid wood and plywood cabinet boxes can often be dried, cleaned and kept. Particle board and MDF swell and crumble when wet and usually have to be replaced. Either way, the toe kick and back panel come off so the wall and slab behind the cabinets can dry.",
    answerEs:
      "Depende del material y de cuánto tiempo estuvieron mojados. Las cajas de madera sólida y plywood muchas veces se pueden secar, limpiar y conservar. El aglomerado y el MDF se hinchan y se desmoronan con el agua y casi siempre hay que reemplazarlos. En los dos casos, el zócalo del gabinete y el panel de atrás se quitan para que la pared y la placa detrás se puedan secar.",
    sections: [
      {
        heading: "Check what your cabinets are made of",
        headingEs: "Revise de qué están hechos sus gabinetes",
        body: [
          "Open the sink base and look at a cut edge on the bottom or a side panel. Plywood shows thin layers of wood glued together. Particle board looks like pressed wood chips, and MDF looks like dense cardboard. [FEMA's flood repair guide](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) lists particle board and fiberboard among materials that fall apart when wet, and notes that solid wood can usually be cleaned and repaired while wood veneer often separates and warps.",
          "If the boxes are sound and only the finish is ruined, see [what cabinet refinishing costs in Miami](/blog/cabinet-refinishing-miami-cost-2026). The sink base usually fails first, since it may already have had small leaks before the flood. Look for swollen bottom edges, a soft floor panel, laminate peeling at the seams and doors that no longer close flat.",
        ],
        bodyEs: [
          "Abra el gabinete del fregadero y mire un borde cortado en el fondo o en un lado. El plywood muestra capas finas de madera pegadas. El aglomerado parece astillas de madera prensadas, y el MDF parece cartón denso. La [guía de reparación de FEMA](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) pone el aglomerado y los tableros de fibra entre los materiales que se deshacen con el agua, y dice que la madera sólida normalmente se puede limpiar y reparar, mientras que el enchapado de madera muchas veces se despega y se tuerce.",
          "Si las cajas están bien y solo se dañó el acabado, vea [cuánto cuesta renovar gabinetes en Miami](/blog/cabinet-refinishing-miami-cost-2026). El gabinete del fregadero casi siempre falla primero, porque puede haber tenido pequeñas filtraciones antes de la inundación. Busque bordes de abajo hinchados, un fondo blando, laminado que se despega en las uniones y puertas que ya no cierran planas.",
        ],
      },
      {
        heading: "Why cabinets often come out even when they are fine",
        headingEs: "Por qué muchas veces se sacan los gabinetes aunque estén bien",
        body: [
          "The cabinet box is only half the problem. Behind it is drywall that soaked up water like the rest of the room, and under it is a toe kick space that holds wet dirt against the slab. If the lower cabinets stay in place, that wall cannot get a proper [flood cut](/king-tide-flooding/questions/flood-cut-drywall) and dry out, and mold grows where nobody will see it.",
          "So lower cabinets are often removed carefully, labeled and set aside while the wall and slab dry, then reinstalled. Whether that works depends on the countertop. A stone top can make removal impractical, and then the drying has to happen through the back and the toe kick. We decide that at the walkthrough, not over the phone.",
        ],
        bodyEs: [
          "La caja del gabinete es solo la mitad del problema. Detrás hay drywall que absorbió agua como el resto del cuarto, y debajo hay un espacio en el zócalo que guarda suciedad mojada contra la placa. Si los gabinetes de abajo se quedan en su lugar, esa pared no puede llevar un [corte de inundación](/king-tide-flooding/questions/flood-cut-drywall) correcto ni secarse, y el moho crece donde nadie lo ve.",
          "Por eso los gabinetes de abajo muchas veces se quitan con cuidado, se marcan y se guardan mientras la pared y la placa se secan, y luego se vuelven a instalar. Que eso funcione depende del tope. Un tope de piedra puede hacer que quitarlos no sea práctico, y entonces el secado se hace por detrás y por el zócalo. Eso lo decidimos en la visita, no por teléfono.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I just replace the doors or the toe kick?",
        questionEs: "¿Puedo cambiar solo las puertas o el zócalo del gabinete?",
        answer:
          "Sometimes. If the boxes are plywood or solid wood, read dry after a few days, and only the doors, drawer fronts or toe kick swelled, replacing those parts is a real option. MDF doors that swelled at the bottom edge do not shrink back, but new doors can be made to match, or the whole kitchen can get new doors and a fresh finish at the same time, which often costs less than new cabinets. That is the same work we do in [cabinet refinishing](/services/cabinet-refinishing), and our guide to [refacing versus replacing](/blog/kitchen-cabinet-refacing-vs-replacement) walks through the choice. It is not an option when the box itself is particle board and the bottom panel or sides have swelled or gone soft, because that is the structure holding up the countertop. And it never makes sense before the wall behind the cabinets has been opened and dried, because new doors on a wet base just move the mold problem a few inches back.",
        answerEs:
          "A veces. Si las cajas son de plywood o madera sólida, marcan secas después de unos días, y solo se hincharon las puertas, los frentes de las gavetas o el zócalo, cambiar esas piezas es una opción real. Las puertas de MDF que se hincharon en el borde de abajo no vuelven a su tamaño, pero se pueden hacer puertas nuevas que combinen, o toda la cocina puede llevar puertas nuevas y un acabado nuevo al mismo tiempo, que muchas veces cuesta menos que gabinetes nuevos. Es el mismo trabajo que hacemos en [renovación de gabinetes](/services/cabinet-refinishing), y nuestra guía sobre [renovar o reemplazar gabinetes](/blog/kitchen-cabinet-refacing-vs-replacement) explica cómo decidir. No es opción cuando la caja es de aglomerado y el fondo o los lados se hincharon o se ablandaron, porque esa es la estructura que sostiene el tope. Y nunca tiene sentido antes de abrir y secar la pared detrás de los gabinetes, porque puertas nuevas sobre una base mojada solo mueven el problema del moho unas pulgadas hacia atrás.",
      },
      {
        question: "Does flood insurance pay for kitchen cabinets?",
        questionEs: "¿El seguro de inundación paga los gabinetes de cocina?",
        answer:
          "Under the National Flood Insurance Program, building coverage includes attached cabinets, along with the structure, plumbing, electrical systems and central air, according to [FloodSmart](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners). That means base cabinets damaged by a covered flood are generally part of the building claim, not contents. What helps the claim is proof of what you had. Before anything comes out, photograph each cabinet open and closed, the water line on the boxes, and the cut edge that shows the material. Keep a door or a cut piece as a sample. Write down the brand if there is a label inside a drawer, and find the receipt or the original kitchen invoice if you have it. If the cabinets have to come out so the wall can dry, ask your adjuster how they want the removal and reinstall documented. Private flood policies can differ, so read yours or ask your agent.",
        answerEs:
          "Bajo el Programa Nacional de Seguro contra Inundaciones, la cobertura del edificio incluye los gabinetes fijos, junto con la estructura, la plomería, la electricidad y el aire central, según [FloodSmart](https://agents.floodsmart.gov/articles/what-covered-flood-insurance-policy-homeowners). Eso significa que los gabinetes de abajo dañados por una inundación cubierta normalmente van en el reclamo del edificio, no del contenido. Lo que ayuda al reclamo es la prueba de lo que tenía. Antes de sacar nada, fotografíe cada gabinete abierto y cerrado, la marca del agua en las cajas y el borde cortado que muestra el material. Guarde una puerta o un pedazo cortado como muestra. Anote la marca si hay una etiqueta dentro de una gaveta, y busque el recibo o la factura original de la cocina si la tiene. Si hay que sacar los gabinetes para secar la pared, pregúntele a su ajustador cómo quiere que se documente quitarlos y volverlos a poner. Las pólizas privadas pueden ser distintas, así que lea la suya o pregúntele a su agente.",
      },
    ],
    image: "/images/king-tide/water-damaged-kitchen-cabinets.jpg",
    imageAlt: "Illustration of swollen particle board kitchen base cabinets with the toe kick removed after flooding in a Florida home",
    imageAltEs: "Ilustración de gabinetes de cocina de aglomerado hinchados con el zócalo retirado después de una inundación en una casa de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.p234, S.nfipCovered],
  },
  {
    slug: "flooded-floors-tile-laminate-wood",
    question: "Which flooring can be saved after a flood: tile, laminate, vinyl or wood?",
    questionEs: "¿Qué pisos se pueden salvar después de una inundación: losa, laminado, vinil o madera?",
    title: "Flooded Floors After a King Tide: Tile, Laminate, Vinyl and Wood",
    titleEs: "Pisos Inundados por la Marea Rey: Losa, Laminado, Vinil y Madera",
    answer:
      "Ceramic and porcelain tile on a concrete slab usually survives. Clean it, rinse the salt out of the grout and check for loose tiles. Laminate almost never survives, because its core is fiberboard that swells. Vinyl plank depends on what is under it. Solid wood can sometimes be dried. Carpet and pad that sat in king tide water go.",
    answerEs:
      "La losa de cerámica o porcelanato sobre una placa de concreto normalmente sobrevive. Límpiela, enjuague la sal de la lechada y revise si hay losas sueltas. El laminado casi nunca sobrevive, porque su centro es de tablero de fibra que se hincha. El vinil depende de lo que tenga debajo. La madera sólida a veces se puede secar. La alfombra y el acolchado que estuvieron en agua de marea rey se botan.",
    sections: [
      {
        heading: "Floor by floor",
        headingEs: "Piso por piso",
        body: [
          "Tile and terrazzo. [FEMA's flood repair guide](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) lists ceramic tile and terrazzo among materials that resist water damage. Clean the floor, rinse the grout several times with clean water to pull out the salt, and tap each tile near the walls with a screwdriver handle. A hollow sound means the tile has let go of the thinset and should be reset.",
          "Laminate. The core is high density fiberboard. Water gets in at the seams, the edges swell and peak, and they do not go back down. The foam underlayment under a floating floor also holds water against the slab. Plan on removing it.",
          "Vinyl plank. The plank itself may shrug off water, but water runs underneath, and many vinyl floors sit on a foam pad. FEMA says tile, vinyl and linoleum should come up if they are warped, loose or laid over foam rubber padding. Pull a few planks along the lowest wall and look.",
          "Wood. Some wood floors, and the joists under them, regain their shape if they dry naturally, according to FEMA, and may need sanding after. Engineered wood with a thin top layer over plywood or fiberboard often delaminates.",
          "Carpet and pad. King tide water comes up through storm drains and can carry sewage, so the pad goes, and the carpet usually goes with it.",
        ],
        bodyEs: [
          "Losa y terrazo. La [guía de reparación de FEMA](https://nchh.org/resource-library/fema_repairing-your-flooded-home.pdf) pone la losa de cerámica y el terrazo entre los materiales que resisten el agua. Limpie el piso, enjuague la lechada varias veces con agua limpia para sacar la sal, y golpee suave cada losa cerca de las paredes con el mango de un destornillador. Un sonido hueco significa que la losa se despegó del pegamento y hay que volver a colocarla.",
          "Laminado. El centro es tablero de fibra de alta densidad. El agua entra por las uniones, los bordes se hinchan y se levantan, y no vuelven a bajar. La espuma debajo de un piso flotante además guarda agua contra la placa. Cuente con sacarlo.",
          "Vinil. La tabla en sí puede aguantar el agua, pero el agua corre por debajo, y muchos pisos de vinil van sobre una espuma. FEMA indica que la losa, el vinil y el linóleo se deben levantar si están torcidos, sueltos o puestos sobre espuma de goma. Levante unas tablas junto a la pared más baja y mire.",
          "Madera. Algunos pisos de madera, y las vigas debajo, vuelven a su forma si se secan solos, según FEMA, y puede que necesiten lijarse después. La madera de ingeniería, con una capa fina encima de plywood o tablero de fibra, muchas veces se despega.",
          "Alfombra y acolchado. El agua de la marea rey sube por los desagües y puede traer aguas negras, así que el acolchado se bota, y casi siempre la alfombra también.",
        ],
      },
      {
        heading: "Under the floor: the slab",
        headingEs: "Debajo del piso: la placa",
        body: [
          "Most South Florida houses sit on a concrete slab, and a slab soaks up saltwater and gives it back slowly. FEMA's guide says not to lay new flooring until the subfloor is completely dry. Put new tile, vinyl or wood over a wet slab and the adhesive fails, the grout turns white with salt, or mold grows under the new floor. The slab gets rinsed, dried with dehumidifiers and checked with a moisture meter before anything goes back down. If the house is in a flood zone, even a small floor replacement can need a permit, as our [HB 803 flood zone guide](/blog/hb-803-flood-zones-miami-permit-exemption) explains. See [how long drying takes](/king-tide-flooding/questions/how-long-to-dry-out-house-after-flood).",
        ],
        bodyEs: [
          "La mayoría de las casas del sur de Florida están sobre una placa de concreto, y la placa absorbe agua salada y la suelta despacio. La guía de FEMA indica no poner piso nuevo hasta que la base esté completamente seca. Si pone losa, vinil o madera nuevos sobre una placa mojada, el pegamento falla, la lechada se pone blanca por la sal o sale moho debajo del piso nuevo. La placa se enjuaga, se seca con deshumidificadores y se revisa con un medidor de humedad antes de instalar nada. Si la casa está en zona de inundación, hasta un cambio de piso pequeño puede necesitar permiso, como explica nuestra [guía de HB 803 y zonas de inundación](/blog/hb-803-flood-zones-miami-permit-exemption). Vea [cuánto tarda el secado](/king-tide-flooding/questions/how-long-to-dry-out-house-after-flood).",
        ],
      },
    ],
    faqs: [
      {
        question: "My laminate looks fine. Do I still have to pull it?",
        questionEs: "Mi laminado se ve bien. ¿Igual lo tengo que sacar?",
        answer:
          "Look closer before you decide, and look again in a few days. Laminate damage often shows up late. The seams swell first, then the edges lift into small peaks, and the floor starts to feel spongy near the walls. Even when the surface looks flat, water that got under a floating floor sits on the slab, trapped by the foam underlayment, and that is where mold starts. Pull the baseboard along the wall closest to where the water came in and lift two or three planks. If the underlayment is damp or the plank edges are dark and soft, the floor has to come out, and usually the whole connected area, since laminate clicks together across rooms. If everything is dry and the planks are still flat after a week, you may have gotten lucky. Take photos either way for your claim, and keep a plank as a sample.",
        answerEs:
          "Mire de cerca antes de decidir, y vuelva a mirar en unos días. El daño del laminado muchas veces aparece tarde. Primero se hinchan las uniones, después los bordes se levantan en pequeños picos, y el piso se empieza a sentir blando cerca de las paredes. Aunque la superficie se vea plana, el agua que entró debajo de un piso flotante se queda sobre la placa, atrapada por la espuma, y ahí empieza el moho. Quite el zócalo de la pared más cercana a donde entró el agua y levante dos o tres tablas. Si la espuma está húmeda o los bordes de las tablas están oscuros y blandos, el piso se tiene que sacar, y normalmente toda el área conectada, porque el laminado va encajado de un cuarto a otro. Si todo está seco y las tablas siguen planas después de una semana, puede que haya tenido suerte. Tome fotos en los dos casos para su reclamo, y guarde una tabla como muestra.",
      },
      {
        question: "What flooring should I put back if my street keeps flooding?",
        questionEs: "¿Qué piso debo poner si mi calle se sigue inundando?",
        answer:
          "Pick a floor you can rinse and dry instead of one you have to replace. Porcelain or ceramic tile set in thinset directly on the slab is the most forgiving choice, and FEMA's guide lists ceramic tile and terrazzo among flood resistant materials, along with vinyl set with waterproof adhesive. Avoid laminate, floating floors over foam, and carpet in the rooms closest to the street or the canal. Our [flooring comparison](/blog/best-kitchen-flooring-miami-homes) covers porcelain, LVP and terrazzo side by side. Pair the new floor with PVC or composite baseboards instead of MDF, and leave a small gap at the bottom of the drywall so the wall does not sit in water next time. Tile costs more up front than laminate, but after one more king tide it is a cleaning job instead of a tear-out. We install tile across Miami-Dade and Broward, and you can see that work on our [tile page](/services/tile-work). We can price both options so you can compare.",
        answerEs:
          "Escoja un piso que se pueda enjuagar y secar en vez de uno que haya que reemplazar. La losa de porcelanato o cerámica pegada con cemento directo sobre la placa es la opción que más perdona, y la guía de FEMA pone la losa de cerámica y el terrazo entre los materiales que resisten inundaciones, junto con el vinil pegado con adhesivo a prueba de agua. Evite el laminado, los pisos flotantes sobre espuma y la alfombra en los cuartos más cerca de la calle o del canal. Nuestra [comparación de pisos](/blog/best-kitchen-flooring-miami-homes) pone lado a lado el porcelanato, el vinil y el terrazo. Combine el piso nuevo con zócalos de PVC o compuesto en vez de MDF, y deje un pequeño espacio en la parte baja del drywall para que la pared no se quede en el agua la próxima vez. La losa cuesta más al principio que el laminado, pero después de otra marea rey es un trabajo de limpieza y no de demolición. Instalamos losa en Miami-Dade y Broward, y puede ver ese trabajo en nuestra [página de losa y pisos](/services/tile-work). Le podemos cotizar las dos opciones para que compare.",
      },
    ],
    image: "/images/king-tide/flooded-floors-tile-laminate-wood.jpg",
    imageAlt: "Illustration of a flooded porcelain tile floor beside swollen laminate planks being pulled up in a South Florida home",
    imageAltEs: "Ilustración de un piso de porcelanato inundado junto a tablas de laminado hinchadas que se están levantando en una casa del sur de Florida",
    areas: ["fort-lauderdale", "hollywood", "miami-beach", "miami"],
    sources: [S.p234],
  },
]

export function findKingTideQuestion(slug: string) {
  return kingTideQuestions.find((q) => q.slug === slug)
}
