#!/usr/bin/env python3
"""Generate the English and Spanish tub-to-shower planning guides."""

from __future__ import annotations

import shutil
from pathlib import Path
from typing import Iterable

import reportlab
from PIL import Image
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public" / "guides"

HERO_IMAGE = ROOT / "public" / "images" / "glenvar-after-1.jpeg"
DETAIL_IMAGE = ROOT / "public" / "images" / "glenvar-waterproofing.jpeg"

# The same cover art the landing page shows, so the file a visitor opens is
# visibly the file they were offered. Kept as an UNNUMBERED cover in front of
# the three content pages: a cover is not a page of the guide, and the offer
# on the page says three pages.
COVER_ART_DIR = ROOT / "public" / "landing" / "tub-to-shower"

NAVY = HexColor("#1E3A5F")
ORANGE = HexColor("#F07A1A")
GREEN = HexColor("#4CAF50")
CREAM = HexColor("#F8F9FC")
ESPRESSO = HexColor("#0F1F35")
WHITE = HexColor("#FFFFFF")
MUTED = HexColor("#5D6B7C")
LINE = HexColor("#DCE3EC")
PALE_ORANGE = HexColor("#FFF1E6")
PALE_GREEN = HexColor("#EAF6EA")
PALE_NAVY = HexColor("#EAF0F6")

PAGE_W, PAGE_H = letter

# Manually mirrored from lib/landing/quote-pricing.ts.
STARTING_PRICES = (4500, 6500, 9500)


COPY = {
    "en": {
        "filename": "tub-to-shower-planning-guide-en.pdf",
        "cover_art": "guide-cover-en.png",
        "language": "English",
        "guide": "HOMEOWNER PLANNING GUIDE",
        "title_lines": ["THE MIAMI-DADE", "WALK-IN SHOWER", "PLANNING GUIDE"],
        "subtitle": "What changes the cost, what to measure, and when keeping the tub is the smarter call.",
        "benefits_heading": "A better fit for daily life",
        "benefits": [
            ("SAFER ENTRY", "A lower threshold reduces the daily step over the side of a tub."),
            ("EASIER CLEANING", "An open layout can reduce hard-to-reach ledges and tight corners."),
            ("BETTER DAILY ACCESS", "More usable floor area can make showering and helping a family member easier."),
        ],
        "honest_title": "NOT EVERY TUB SHOULD GO",
        "honest_body": "If this is the home's only tub, or if children and soaking matter, keeping it may make more sense. Plan for how the home works now and later.",
        "photo_caption": "REAL MIAMI-DADE PROJECT  |  FINISHED WALK-IN SHOWER",
        "p2_kicker": "START WITH THE RIGHT SCOPE",
        "p2_title": "Three ways to plan the work",
        "p2_intro": "Choose the smallest scope that solves the daily problem. Add finishes only where they matter.",
        "scopes": [
            {
                "number": "01",
                "title": "SHOWER ONLY",
                "price": "$4,500",
                "label": "STARTING FIGURE",
                "items": ["Tub removal", "New shower base", "Waterproofing and tile in the shower zone"],
            },
            {
                "number": "02",
                "title": "SHOWER + FLOOR",
                "price": "$6,500",
                "label": "STARTING FIGURE",
                "items": ["Tub-to-shower work", "Bathroom floor replacement", "Floor prep in affected areas"],
            },
            {
                "number": "03",
                "title": "FULL REMODEL",
                "price": "$9,500",
                "label": "STARTING FIGURE",
                "items": ["Shower conversion", "Bathroom floor and wall finishes", "Vanity, lighting, and fixture coordination"],
            },
        ],
        "detail_caption": "REAL PROJECT DETAIL  |  WATERPROOFING BEFORE TILE",
        "price_note_title": "WHAT THESE FIGURES ASSUME",
        "price_note": "Starting figures apply to a standard five-foot tub footprint, typical access, and normal site conditions in Miami-Dade. Final price depends on verified conditions, selected materials, and the written scope.",
        "p3_kicker": "PLAN BEFORE DEMO",
        "p3_title": "What moves the number",
        "drivers": [
            ("FOOTPRINT", "A standard wall-to-wall tub costs less to change than a larger or open layout."),
            ("ACCESS", "Tight doors, stairs, elevators, and the debris route affect labor and protection."),
            ("PLUMBING", "Drain position, valve condition, and supply moves change the work behind the wall."),
            ("HIDDEN DAMAGE", "Rot, mold, or uneven framing may appear only after the tub and walls come out."),
            ("WATERPROOFING", "Substrate repair, corners, niches, and penetrations need careful treatment."),
            ("TILE + FINISH", "Tile size, pattern, height, edge trim, and grout choices affect time and material."),
            ("GLASS + FEATURES", "Glass, a bench, a niche, and blocking for grab bars add scope and coordination."),
        ],
        "check_kicker": "THE ONE-MINUTE CHECK",
        "check_title": "Measure 3 things. Take 4 photos.",
        "measure_label": "MEASURE",
        "measure_items": ["Tub length, wall to wall", "Tub width at the widest point", "Narrowest doorway on the work route"],
        "photo_label": "PHOTOGRAPH",
        "photo_items": ["Whole tub from the doorway", "Faucet and drain wall", "Floor around the tub", "Ceiling and access route"],
        "next_title": "WHAT TO EXPECT NEXT",
        "next_steps": ["Send the photos and measurements.", "Get a fit check and starting scope.", "An on-site visit confirms conditions, selections, and the written scope."],
        "contact_title": "READY FOR A CLEAR START?",
        "contact_body": "Call or text. We will tell you what the photos show and what still needs an on-site look.",
        "call": "CALL OR TEXT",
        "service": "Serving Miami-Dade County  |  Fully insured",
        "page": "PAGE",
    },
    "es": {
        "filename": "tub-to-shower-planning-guide-es.pdf",
        "cover_art": "guide-cover-es.png",
        "language": "Español",
        "guide": "GUÍA DE PLANIFICACIÓN PARA EL HOGAR",
        "title_lines": ["GUÍA DE MIAMI-DADE", "PARA CONVERTIR SU", "BAÑERA EN DUCHA"],
        "subtitle": "Qué cambia el precio, qué medir y cuándo conservar la bañera es la mejor decisión.",
        "benefits_heading": "Un espacio que funciona mejor cada día",
        "benefits": [
            ("ENTRADA MÁS CÓMODA", "Un umbral más bajo reduce el esfuerzo diario de pasar sobre el borde de la bañera."),
            ("LIMPIEZA MÁS SENCILLA", "Un diseño abierto puede reducir bordes difíciles y esquinas estrechas."),
            ("MEJOR ACCESO DIARIO", "Más espacio útil facilita ducharse y ayudar a un familiar."),
        ],
        "honest_title": "NO TODAS LAS BAÑERAS DEBEN QUITARSE",
        "honest_body": "Si es la única bañera de la casa, o si los niños y los baños de inmersión son importantes, conservarla puede ser la mejor decisión. Piense en cómo usa su hogar hoy y después.",
        "photo_caption": "PROYECTO REAL EN MIAMI-DADE  |  DUCHA TERMINADA",
        "p2_kicker": "EMPIECE CON EL ALCANCE CORRECTO",
        "p2_title": "Tres formas de planificar el trabajo",
        "p2_intro": "Elija el alcance más pequeño que resuelva el problema diario. Añada acabados solo donde importan.",
        "scopes": [
            {
                "number": "01",
                "title": "SOLO DUCHA",
                "price": "$4,500",
                "label": "PRECIO INICIAL",
                "items": ["Retiro de la bañera", "Nueva base de ducha", "Impermeabilización y azulejo en el área de ducha"],
            },
            {
                "number": "02",
                "title": "DUCHA + PISO",
                "price": "$6,500",
                "label": "PRECIO INICIAL",
                "items": ["Conversión de bañera a ducha", "Reemplazo del piso del baño", "Preparación del piso en áreas afectadas"],
            },
            {
                "number": "03",
                "title": "REMODELACIÓN COMPLETA",
                "price": "$9,500",
                "label": "PRECIO INICIAL",
                "items": ["Conversión de la ducha", "Acabados de piso y paredes", "Coordinación de tocador, luces y accesorios"],
            },
        ],
        "detail_caption": "DETALLE DE PROYECTO REAL  |  IMPERMEABILIZACIÓN ANTES DEL AZULEJO",
        "price_note_title": "QUÉ ASUMEN ESTOS PRECIOS",
        "price_note": "Los precios iniciales aplican a una bañera estándar de cinco pies, acceso normal y condiciones habituales del área de trabajo en Miami-Dade. El precio final depende de las condiciones verificadas, materiales elegidos y alcance por escrito.",
        "p3_kicker": "PLANIFIQUE ANTES DE DEMOLER",
        "p3_title": "Qué cambia el precio",
        "drivers": [
            ("ESPACIO", "Una bañera estándar entre paredes cuesta menos cambiar que un espacio grande o abierto."),
            ("ACCESO", "Puertas estrechas, escaleras, elevadores y la ruta de escombros cambian la mano de obra."),
            ("PLOMERÍA", "La posición del desagüe, la válvula y las líneas de agua cambian el trabajo interno."),
            ("DAÑO OCULTO", "Madera dañada, moho o paredes desniveladas pueden aparecer después de retirar todo."),
            ("IMPERMEABILIZACIÓN", "La base, las esquinas, los nichos y las penetraciones necesitan buen tratamiento."),
            ("AZULEJO + ACABADO", "Tamaño, patrón, altura, bordes y lechada cambian el tiempo y los materiales."),
            ("VIDRIO + DETALLES", "Vidrio, banco, nicho y refuerzo para barras de apoyo añaden trabajo y coordinación."),
        ],
        "check_kicker": "REVISIÓN DE UN MINUTO",
        "check_title": "Mida 3 cosas. Tome 4 fotos.",
        "measure_label": "MIDA",
        "measure_items": ["Largo de la bañera, de pared a pared", "Ancho de la bañera en el punto mayor", "Puerta más estrecha en la ruta de trabajo"],
        "photo_label": "TOME FOTO DE",
        "photo_items": ["Toda la bañera desde la puerta", "Pared de grifería y desagüe", "Piso alrededor de la bañera", "Techo y ruta de acceso"],
        "next_title": "QUÉ PASA DESPUÉS",
        "next_steps": ["Envíe las fotos y medidas.", "Reciba una revisión inicial del espacio y alcance.", "Una visita confirma condiciones, materiales y alcance por escrito."],
        "contact_title": "¿LISTO PARA EMPEZAR CON CLARIDAD?",
        "contact_body": "Llame o escriba. Le diremos qué muestran las fotos y qué falta revisar en persona.",
        "call": "LLAME O ESCRIBA",
        "service": "Servicio en Miami-Dade  |  Totalmente asegurados",
        "page": "PÁGINA",
    },
}


def register_fonts() -> None:
    regular = Path("/System/Library/Fonts/Supplemental/Arial Narrow.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("BFDisplay", str(regular)))
        pdfmetrics.registerFont(TTFont("BFDisplayBold", str(bold)))
    else:
        pdfmetrics.registerFont(TTFont("BFDisplay", str(Path(reportlab.__file__).parent / "fonts" / "Vera.ttf")))
        pdfmetrics.registerFont(TTFont("BFDisplayBold", str(Path(reportlab.__file__).parent / "fonts" / "VeraBd.ttf")))


def para(
    c: Canvas,
    text: str,
    x: float,
    y_top: float,
    width: float,
    font: str = "Helvetica",
    size: float = 10,
    leading: float | None = None,
    color=ESPRESSO,
    align: int = TA_LEFT,
    max_height: float = 500,
) -> float:
    style = ParagraphStyle(
        name="inline",
        fontName=font,
        fontSize=size,
        leading=leading or size * 1.25,
        textColor=color,
        alignment=align,
        spaceAfter=0,
        spaceBefore=0,
    )
    p = Paragraph(text, style)
    _, height = p.wrap(width, max_height)
    p.drawOn(c, x, y_top - height)
    return height


def draw_cover_image(c: Canvas, path: Path, x: float, y: float, width: float, height: float, radius: float = 12) -> None:
    with Image.open(path) as image:
        image_w, image_h = image.size
    scale = max(width / image_w, height / image_h)
    draw_w, draw_h = image_w * scale, image_h * scale
    draw_x = x + (width - draw_w) * 0.46
    draw_y = y + (height - draw_h) * 0.55
    c.saveState()
    clip = c.beginPath()
    clip.roundRect(x, y, width, height, radius)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(str(path)), draw_x, draw_y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")
    c.restoreState()


def draw_brand(c: Canvas, dark: bool = False) -> None:
    color = WHITE if dark else NAVY
    c.setFillColor(ORANGE)
    c.roundRect(36, 747, 18, 18, 4, fill=1, stroke=0)
    c.setStrokeColor(WHITE if dark else CREAM)
    c.setLineWidth(2)
    c.line(41, 756, 46, 751)
    c.line(46, 751, 51, 760)
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 9.2)
    c.drawString(62, 753, "BROKE & FIXED HOME SOLUTIONS")


def draw_footer(c: Canvas, copy: dict, page_num: int, dark: bool = False) -> None:
    color = Color(1, 1, 1, alpha=0.76) if dark else MUTED
    line_color = Color(1, 1, 1, alpha=0.24) if dark else LINE
    c.setStrokeColor(line_color)
    c.setLineWidth(0.7)
    c.line(36, 38, PAGE_W - 36, 38)
    c.setFillColor(color)
    c.setFont("Helvetica", 7.5)
    c.drawString(36, 24, "BROKEANDFIXED.COM")
    c.drawRightString(PAGE_W - 36, 24, f"{copy['page']} {page_num} / 3")


def draw_cover_art_page(c: Canvas, copy: dict) -> None:
    """Full bleed cover, identical art to the one on the landing page.

    Cover fitted and centred, so the crop is symmetric and neither the title
    at the top nor the logo band at the bottom loses anything that matters.
    Deliberately carries no footer and no page number.
    """
    path = COVER_ART_DIR / copy["cover_art"]
    with Image.open(path) as image:
        image_w, image_h = image.size
    scale = max(PAGE_W / image_w, PAGE_H / image_h)
    draw_w, draw_h = image_w * scale, image_h * scale
    c.drawImage(
        ImageReader(str(path)),
        (PAGE_W - draw_w) / 2,
        (PAGE_H - draw_h) / 2,
        draw_w,
        draw_h,
        preserveAspectRatio=True,
        mask="auto",
    )
    c.showPage()


def draw_cover(c: Canvas, copy: dict) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, 515, PAGE_W, PAGE_H - 515, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.rect(0, 515, 8, PAGE_H - 515, fill=1, stroke=0)
    draw_brand(c, dark=True)

    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(36, 714, copy["guide"])
    y = 679
    for line in copy["title_lines"]:
        c.setFillColor(WHITE)
        c.setFont("BFDisplayBold", 34 if copy["language"] == "English" else 31)
        c.drawString(36, y, line)
        y -= 38
    para(c, copy["subtitle"], 36, 558, 515, "Helvetica", 11.2, 14.2, Color(1, 1, 1, alpha=0.84))

    heading_size = 20 if copy["language"] == "English" else 18
    para(c, copy["benefits_heading"].upper(), 36, 482, 244, "BFDisplayBold", heading_size, heading_size + 1, ESPRESSO)

    row_top = 427
    for index, (title, body) in enumerate(copy["benefits"], start=1):
        y0 = row_top - (index - 1) * 83
        c.setFillColor(WHITE)
        c.roundRect(36, y0 - 63, 244, 68, 9, fill=1, stroke=0)
        c.setFillColor(ORANGE if index != 2 else GREEN)
        c.circle(58, y0 - 29, 13, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawCentredString(58, y0 - 32, f"0{index}")
        c.setFillColor(NAVY)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(79, y0 - 20, title)
        para(c, body, 79, y0 - 28, 184, "Helvetica", 8.7, 11.1, MUTED)

    draw_cover_image(c, HERO_IMAGE, 302, 81, 274, 404, 13)
    c.setFillColor(NAVY)
    c.roundRect(315, 94, 248, 34, 7, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 6.8)
    c.drawCentredString(439, 107, copy["photo_caption"])

    c.setFillColor(PALE_ORANGE)
    c.roundRect(36, 74, 244, 103, 10, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.rect(36, 74, 5, 103, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(54, 154, copy["honest_title"])
    para(c, copy["honest_body"], 54, 143, 209, "Helvetica", 8.8, 11.3, ESPRESSO)

    draw_footer(c, copy, 1)
    c.showPage()


def draw_scope_card(c: Canvas, scope: dict, x: float, y: float, width: float, height: float, accent) -> None:
    c.setFillColor(HexColor("#E5EAF1"))
    c.roundRect(x + 2, y - 3, width, height, 11, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.roundRect(x, y, width, height, 11, fill=1, stroke=0)
    c.setFillColor(accent)
    c.roundRect(x, y + height - 50, width, 50, 11, fill=1, stroke=0)
    c.rect(x, y + height - 50, width, 12, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("BFDisplayBold", 18)
    c.drawString(x + 15, y + height - 32, scope["number"])
    c.setFont("Helvetica-Bold", 8.5)
    c.drawRightString(x + width - 15, y + height - 29, scope["label"])

    c.setFillColor(NAVY)
    title_size = 13 if len(scope["title"]) < 20 else 11.2
    c.setFont("BFDisplayBold", title_size)
    c.drawString(x + 15, y + height - 78, scope["title"])
    c.setFillColor(ESPRESSO)
    c.setFont("BFDisplayBold", 25)
    c.drawString(x + 15, y + height - 111, scope["price"])

    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.line(x + 15, y + height - 128, x + width - 15, y + height - 128)
    y_text = y + height - 153
    for item in scope["items"]:
        c.setFillColor(accent)
        c.circle(x + 21, y_text + 2, 3.2, fill=1, stroke=0)
        height_used = para(c, item, x + 32, y_text + 10, width - 48, "Helvetica", 8.8, 11.3, ESPRESSO)
        y_text -= max(44, height_used + 17)


def draw_scope_page(c: Canvas, copy: dict) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c)
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(36, 710, copy["p2_kicker"])
    c.setFillColor(NAVY)
    c.setFont("BFDisplayBold", 29)
    c.drawString(36, 674, copy["p2_title"].upper())
    para(c, copy["p2_intro"], 36, 654, 530, "Helvetica", 10.3, 13.2, MUTED)

    card_y = 251
    card_h = 357
    card_w = 168
    xs = [36, 222, 408]
    accents = [ORANGE, GREEN, NAVY]
    for scope, x, accent in zip(copy["scopes"], xs, accents):
        draw_scope_card(c, scope, x, card_y, card_w, card_h, accent)

    draw_cover_image(c, DETAIL_IMAGE, 36, 72, 174, 139, 10)
    c.setFillColor(NAVY)
    c.roundRect(44, 80, 158, 30, 6, fill=1, stroke=0)
    para(c, copy["detail_caption"], 51, 101, 144, "Helvetica-Bold", 6.1, 7.4, WHITE, TA_CENTER, 40)

    c.setFillColor(PALE_NAVY)
    c.roundRect(226, 72, 350, 139, 10, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(244, 186, copy["price_note_title"])
    para(c, copy["price_note"], 244, 170, 314, "Helvetica", 9.1, 12.2, ESPRESSO)
    c.setFillColor(GREEN)
    c.circle(552, 187, 7, fill=1, stroke=0)
    c.setStrokeColor(WHITE)
    c.setLineWidth(1.7)
    c.line(548.5, 187, 551, 184.5)
    c.line(551, 184.5, 555.5, 190)

    draw_footer(c, copy, 2)
    c.showPage()


def draw_driver(c: Canvas, number: int, title: str, body: str, x: float, y_top: float, width: float) -> None:
    c.setFillColor(WHITE)
    c.roundRect(x, y_top - 64, width, 58, 8, fill=1, stroke=0)
    c.setFillColor(PALE_ORANGE if number % 2 else PALE_GREEN)
    c.circle(x + 22, y_top - 35, 12, fill=1, stroke=0)
    c.setFillColor(ORANGE if number % 2 else GREEN)
    c.setFont("Helvetica-Bold", 7.7)
    c.drawCentredString(x + 22, y_top - 38, f"0{number}")
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.2)
    c.drawString(x + 43, y_top - 23, title)
    para(c, body, x + 43, y_top - 29, width - 55, "Helvetica", 7.6, 9.5, MUTED)


def draw_check_column(c: Canvas, label: str, items: Iterable[str], x: float, y_top: float, width: float, start: int = 1) -> None:
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(x, y_top, label)
    y = y_top - 20
    for index, item in enumerate(items, start=start):
        c.setFillColor(WHITE)
        c.circle(x + 7, y + 4, 7, fill=0, stroke=1)
        c.setFont("Helvetica-Bold", 6.8)
        c.drawCentredString(x + 7, y + 1.5, str(index))
        height = para(c, item, x + 21, y + 11, width - 21, "Helvetica", 8.0, 9.6, WHITE)
        y -= max(20, height + 6)


def draw_final_page(c: Canvas, copy: dict) -> None:
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    draw_brand(c)
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(36, 710, copy["p3_kicker"])
    c.setFillColor(NAVY)
    c.setFont("BFDisplayBold", 29)
    c.drawString(36, 674, copy["p3_title"].upper())

    positions = [
        (36, 644), (306, 644),
        (36, 574), (306, 574),
        (36, 504), (306, 504),
        (36, 434),
    ]
    for number, ((title, body), (x, y_top)) in enumerate(zip(copy["drivers"], positions), start=1):
        draw_driver(c, number, title, body, x, y_top, 252)

    c.setFillColor(NAVY)
    c.roundRect(36, 198, 540, 154, 12, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.setFont("Helvetica-Bold", 7.8)
    c.drawString(54, 328, copy["check_kicker"])
    c.setFillColor(WHITE)
    c.setFont("BFDisplayBold", 20)
    c.drawString(54, 302, copy["check_title"].upper())
    c.setStrokeColor(Color(1, 1, 1, alpha=0.2))
    c.line(297, 215, 297, 284)
    draw_check_column(c, copy["measure_label"], copy["measure_items"], 54, 284, 220, 1)
    draw_check_column(c, copy["photo_label"], copy["photo_items"], 319, 284, 230, 1)

    c.setFillColor(WHITE)
    c.roundRect(36, 56, 330, 129, 10, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(54, 161, copy["next_title"])
    y = 139
    for index, step in enumerate(copy["next_steps"], start=1):
        c.setFillColor(GREEN)
        c.circle(62, y + 2, 8, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(62, y - 0.5, str(index))
        height = para(c, step, 78, y + 10, 269, "Helvetica", 8.5, 10.7, ESPRESSO)
        y -= max(28, height + 10)

    c.setFillColor(ORANGE)
    c.roundRect(382, 56, 194, 129, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 7.2)
    c.drawString(398, 164, copy["contact_title"])
    para(c, copy["contact_body"], 398, 150, 161, "Helvetica", 8.2, 10.2, WHITE)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(398, 110, copy["call"])
    c.setFont("BFDisplayBold", 17)
    c.drawString(398, 91, "(786) 363-7039")
    c.setFont("Helvetica", 7.3)
    c.drawString(398, 75, "brokeandfixed305@gmail.com")
    c.drawString(398, 64, "brokeandfixed.com")

    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7.5)
    c.drawString(36, 43, copy["service"])
    c.drawRightString(PAGE_W - 36, 43, f"{copy['page']} 3 / 3")
    draw_brand(c)
    c.showPage()


def build_pdf(language: str) -> Path:
    copy = COPY[language]
    output_path = OUTPUT_DIR / copy["filename"]
    c = Canvas(str(output_path), pagesize=letter, pageCompression=1)
    c.setTitle(" ".join(copy["title_lines"]).title())
    c.setAuthor("Broke & Fixed Home Solutions")
    c.setSubject("Walk-in shower planning guide for Miami-Dade homeowners")
    draw_cover_art_page(c, copy)
    draw_cover(c, copy)
    draw_scope_page(c, copy)
    draw_final_page(c, copy)
    c.save()
    shutil.copy2(output_path, PUBLIC_DIR / output_path.name)
    return output_path


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    register_fonts()
    paths = [build_pdf("en"), build_pdf("es")]
    for path in paths:
        print(path)


if __name__ == "__main__":
    main()
