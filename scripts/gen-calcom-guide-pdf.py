"""Renders docs/calcom-setup-for-mo.md as a printable PDF for the owner.

A one-off, run by hand. It is deliberately NOT wired into package.json: this
repository has no other Python tooling, and a `npm run` entry that fails on a
clean checkout is worse than a script you have to read before running.

    python -m pip install reportlab
    python scripts/gen-calcom-guide-pdf.py

`docs/calcom-setup-for-mo.md` is the source of truth for the wording. If the
Cal.com instructions change, change the markdown and re-run this.

One trap worth knowing before editing the copy here. ReportLab's built-in Type1
fonts use WinAnsi encoding, and anything outside it renders as a *different
letter* rather than as a missing-glyph box — silently. This document originally
shipped arrows as U+2192, which came out as "fi", open circles as U+25CB, which
came out as "n", and checkboxes as U+2751, which came out as "q". None of it
raised an error.

Safe: — – " " · » × … Not safe: → ← ○ ● ❑ ✓ ■ and most arrows/symbols.
Text extraction cannot settle this either — U+2022 extracts as "(cid:127)"
whether or not it drew correctly. Render the pages and look at them:

    python -m pip install pypdfium2
    python -c "import pypdfium2 as p; d=p.PdfDocument('docs/Cal.com-setup-for-Mo.pdf'); [d[i].render(scale=1.6).to_pil().save(f'p{i+1}.png') for i in range(len(d))]"
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    ListFlowable, ListItem, KeepTogether, HRFlowable, PageBreak,
)

OUT = r"C:\Users\shane\repos\MoLumenSite\docs\Cal.com-setup-for-Mo.pdf"

# MoLumen palette, taken from src/styles/tokens.css
NAVY = colors.HexColor("#1d2438")
TEAL = colors.HexColor("#0f6e6b")
TEAL_TINT = colors.HexColor("#e6f2f1")
INK = colors.HexColor("#22262f")
INK_SOFT = colors.HexColor("#575d6b")
GOLD = colors.HexColor("#b8863b")
PARCHMENT = colors.HexColor("#f6f1e7")
RULE = colors.HexColor("#d9d3c7")
WARN_BG = colors.HexColor("#fdf6e8")

BODY = ParagraphStyle("body", fontName="Helvetica", fontSize=10.2, leading=15.2,
                      textColor=INK, spaceAfter=7, alignment=TA_LEFT)
H1 = ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=21, leading=25,
                    textColor=NAVY, spaceBefore=0, spaceAfter=4)
SUB = ParagraphStyle("sub", fontName="Helvetica", fontSize=11, leading=15,
                     textColor=INK_SOFT, spaceAfter=16)
H2 = ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=15, leading=19,
                    textColor=TEAL, spaceBefore=20, spaceAfter=7)
H3 = ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=11.6, leading=15,
                    textColor=NAVY, spaceBefore=13, spaceAfter=5)
SMALL = ParagraphStyle("small", parent=BODY, fontSize=9.2, leading=13,
                       textColor=INK_SOFT)
CELL = ParagraphStyle("cell", fontName="Helvetica", fontSize=9, leading=12, textColor=INK)
CELLB = ParagraphStyle("cellb", parent=CELL, fontName="Helvetica-Bold")
CELLH = ParagraphStyle("cellh", parent=CELL, fontName="Helvetica-Bold",
                       textColor=colors.white)
MONO = ParagraphStyle("mono", fontName="Courier", fontSize=9.4, leading=14,
                      textColor=NAVY)
QUOTE = ParagraphStyle("quote", parent=BODY, fontName="Helvetica-Oblique",
                       leftIndent=12, textColor=NAVY)

story = []


def p(t, s=BODY):
    story.append(Paragraph(t, s))


def gap(h=6):
    story.append(Spacer(1, h))


def rule():
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=0.7, color=RULE))
    story.append(Spacer(1, 4))


def callout(title, body, bg=TEAL_TINT, bar=TEAL):
    """A tinted panel with a coloured left bar — used for the two warnings."""
    inner = [Paragraph(f"<b>{title}</b>", ParagraphStyle(
        "ct", parent=BODY, textColor=NAVY, spaceAfter=4))]
    for line in body:
        inner.append(Paragraph(line, ParagraphStyle(
            "cb", parent=BODY, spaceAfter=3)))
    t = Table([[inner]], colWidths=[6.5 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("LINEBEFORE", (0, 0), (0, -1), 3, bar),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(KeepTogether([Spacer(1, 6), t, Spacer(1, 8)]))


def steps(items):
    story.append(ListFlowable(
        [ListItem(Paragraph(i, BODY), leftIndent=20) for i in items],
        bulletType="1", bulletFontName="Helvetica-Bold", bulletFontSize=10,
        leftIndent=18, bulletColor=TEAL, spaceAfter=8))


def bullets(items):
    story.append(ListFlowable(
        [ListItem(Paragraph(i, BODY), leftIndent=18) for i in items],
        bulletType="bullet", bulletChar="\u2013", bulletFontSize=10,
        leftIndent=16, bulletColor=TEAL, spaceAfter=8))


def table(header, rows, widths):
    data = [[Paragraph(h, CELLH) for h in header]]
    for r in rows:
        data.append([Paragraph(c, CELL) for c in r])
    t = Table(data, colWidths=widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PARCHMENT]),
        ("GRID", (0, 0), (-1, -1), 0.5, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(KeepTogether([t, Spacer(1, 10)]))


def codeblock(lines):
    data = [[Paragraph(l, MONO)] for l in lines]
    t = Table(data, colWidths=[6.5 * inch])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PARCHMENT),
        ("BOX", (0, 0), (-1, -1), 0.5, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(KeepTogether([Spacer(1, 3), t, Spacer(1, 9)]))


def checklist(title, items):
    def box():
        # A drawn square, not a glyph. U+2751 and friends are absent from the
        # WinAnsi encoding the built-in Type1 fonts use, so they come out as a
        # stray letter ("q") rather than a checkbox.
        b = Table([[""]], colWidths=[0.13 * inch], rowHeights=[0.13 * inch])
        b.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.9, TEAL)]))
        return b

    rows = [[box(), Paragraph(i, CELL)] for i in items]
    t = Table(rows, colWidths=[0.3 * inch, 6.2 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, RULE),
    ]))
    story.append(KeepTogether([Paragraph(title, H3), t, Spacer(1, 8)]))


# ---------------------------------------------------------------- page 1
p("Finishing your Cal.com booking setup", H1)
p("Mo Lumen Astrology &nbsp;\u00b7&nbsp; two settings to change before the new site goes live",
  SUB)

p("Hi Mo — there are two things left to set up in Cal.com, plus one small typo to fix. "
  "None of this touches the website itself; it is all inside your Cal.com account.")
p("<b>Roughly 30–40 minutes.</b> You do the same short edit on each of your nine readings, "
  "so the first one takes a few minutes and the rest go quickly.")
callout("Nothing here can break the website.",
        ["If you get stuck partway through, just stop. Half-finished is completely fine — the "
         "site behaves exactly the same until we switch it on."],
        bg=TEAL_TINT, bar=TEAL)

p("Why these two things matter", H2)

p("<b>1. The website says every reading is on Zoom or the phone. Right now the booking page "
  "doesn't ask that — it asks people to type a location into an empty box labelled "
  "&ldquo;Somewhere else.&rdquo;</b>")
p("That box is the last thing someone sees before they enter their card details. Most people "
  "won't know what to put in it, and a confusing question at the payment screen is where "
  "bookings get abandoned.")
gap(4)
p("<b>2. The website tells people they'll send you their birth details when they book. At the "
  "moment Cal.com never asks for them.</b>")
p("So two things go wrong. The client finishes paying without being asked for anything and "
  "wonders whether it went through properly — and you have to email every single client to "
  "chase their birth date, time and place before you can cast a chart.")
p("Both are quick fixes.")

rule()

# ---------------------------------------------------------------- part 1
p("Part 1 &nbsp;\u2014&nbsp; Fix &ldquo;Somewhere else&rdquo; (all nine readings)", H2)
p("Zoom is already connected to your account, so this is just a matter of picking it.")
p("You'll repeat this for each of your nine readings:")
bullets([
    "Natal Chart Reading — 60 minutes &nbsp;\u00b7&nbsp; Natal Chart Reading — 90 minutes",
    "Relationship Astrology Consultation",
    "Want More Clarity — Follow-Up Reading &nbsp;\u00b7&nbsp; Want More Clarity — within 3 months",
    "Solar Return Reading &nbsp;\u00b7&nbsp; Life Changes Astrological Consultation",
    "Quick Check-In — One Topic &nbsp;\u00b7&nbsp; Monthly Personal Transits",
])

p("Steps", H3)
steps([
    "Go to <b>cal.com</b> and sign in.",
    "Click <b>Event Types</b> in the left menu. Your nine readings are listed there.",
    "Click the first reading.",
    "You'll land on the <b>Setup</b> tab. Scroll to the <b>Location</b> section.",
    "It currently says <b>Custom attendee location</b>. Click the <b>X</b> next to it to remove it.",
    "Click <b>Add a location</b> » choose <b>Zoom Video</b>.",
    "Click <b>Add a location</b> again » choose <b>Attendee phone number</b>.",
    "Click <b>Save</b> (top right).",
])

p("What that does", H3)
p("Instead of an empty box, the person booking now sees a simple choice:")
codeblock(["Where should we meet?", "  ( )  Zoom      ( )  Phone"])
p("If they pick Zoom, Cal.com creates the meeting link automatically. If they pick Phone, "
  "Cal.com asks for <i>their</i> number and shows it to you — so you call them.")

callout("Two things to avoid",
        ["<b>Don't pick &ldquo;Organizer phone number.&rdquo;</b> That publishes your own number "
         "on the booking page for anyone to see. <b>Attendee phone number</b> is the one you want.",
         "<b>Don't add an in-person option.</b> In-person DFW sessions are described on the site "
         "as something arranged with you directly, and adding it here would turn that into a "
         "standing self-service offer."],
        bg=WARN_BG, bar=GOLD)

story.append(PageBreak())

# ---------------------------------------------------------------- part 2
p("Part 2 &nbsp;\u2014&nbsp; Ask for birth details (three readings only)", H2)
p("This is the screen you already found — the <b>Booking questions</b> section with the "
  "<b>+ Add question</b> button at the bottom.")
p("<b>You only need to do this on three readings</b>, not all nine:")
bullets([
    "Natal Chart Reading — 60 minutes",
    "Natal Chart Reading — 90 minutes",
    "Relationship Astrology Consultation",
])
p("Your follow-up readings are for people whose charts you already have, so asking them again "
  "would be odd. There is an optional small addition for those further down.")

p("How to add a question", H3)
steps([
    "<b>Event Types</b> » click the reading » click the <b>Advanced</b> tab.",
    "Scroll to <b>Booking questions</b>.",
    "Click <b>+ Add question</b>.",
    "Fill in the <b>Input type</b>, the <b>Label</b>, whether it is <b>Required</b>, and the "
    "placeholder if there is one.",
    "Click <b>Save</b> on the question, then <b>Save</b> on the page.",
])

p("For BOTH natal readings — add these five", H3)
p("Do this on <b>Natal — 60 minutes</b>, then again on <b>Natal — 90 minutes</b>.", SMALL)
table(
    ["#", "Question (label)", "Input type", "Required?", "Placeholder"],
    [
        ["1", "Birth date", "Short Text", "<b>Yes</b>", "12 April 1988"],
        ["2", "Do you know your birth time?", "Radio", "<b>Yes</b>", "options below"],
        ["3", "Birth time, if you have it", "Short Text", "No", "3:42pm — leave blank if you're not sure"],
        ["4", "Birthplace (city and country)", "Short Text", "<b>Yes</b>", "Austin, USA"],
        ["5", "What would you most like to explore?", "Long Text", "No", "Two or three real questions you're living with"],
    ],
    [0.25 * inch, 1.85 * inch, 0.85 * inch, 0.75 * inch, 2.8 * inch],
)
p("For question 2, choose <b>Radio</b> as the input type and add these three options exactly:")
codeblock([
    "Yes — from a certificate or reliable record",
    "Roughly — I know the part of the day",
    "No, and I'm not sure where to find it",
])

callout("Please keep question 3 optional, and keep that third radio option",
        ["This one really matters. Plenty of people genuinely don't know their birth time — "
         "there is a whole page on your site about how to track one down, and the Reading Finder "
         "is written to reassure people about it.",
         "If the booking form <i>demands</i> a birth time, all of that kindness ends at a hard "
         "stop on the payment screen, and you lose a client who would have been perfectly happy "
         "to book.",
         "Asking the question is useful. Requiring an answer is not."],
        bg=WARN_BG, bar=GOLD)

p("For the Relationship Consultation — the same, twice", H3)
p("This reading looks at two charts, so it needs both people's details. Add the same five "
  "questions <b>twice</b>, once for each person, with the person's label at the front so it is "
  "obvious which is which:")
codeblock([
    "Person A — birth date",
    "Person A — do you know your birth time?",
    "Person A — birth time, if you have it",
    "Person A — birthplace (city and country)",
    "Person A — what would you most like to explore?",
    "",
    "\u2026then the same five beginning  Person B —",
])
p("Only the two birth dates, the two birth-time radios and the two birthplaces need to be "
  "<b>Required</b>. The rest stay optional.")

p("Optional — one question on the six follow-up readings", H3)
p("Not essential, but it saves you an email each time.", SMALL)
table(
    ["Reading", "Question", "Input type", "Required?"],
    [
        ["Want More Clarity (both versions)", "What would you like to go deeper on?", "Long Text", "Yes"],
        ["Solar Return Reading", "What's your focus for the year ahead?", "Long Text", "No"],
        ["Life Changes Consultation", "What transition are you navigating?", "Long Text", "Yes"],
        ["Quick Check-In — One Topic", "Your one topic — specific beats broad", "Long Text", "Yes"],
        ["Monthly Personal Transits", "Anything you'd like me to watch for?", "Long Text", "No"],
    ],
    [1.85 * inch, 2.7 * inch, 0.95 * inch, 1.0 * inch],
)

p("While you're on the Advanced tab — one small tidy-up", H3)
p("In your Booking questions list there is a stock question called "
  "<b>&ldquo;What is this meeting about?&rdquo;</b>")
p("On <b>Quick Check-In</b> it is already switched off — the grey toggle and the "
  "&ldquo;Hidden&rdquo; tag next to it. On some of the other readings it is still switched on, "
  "and where it is, it is a <i>required</i> question.")
p("It is a strange thing to ask someone who has just chosen &ldquo;Natal Chart Reading — 90 "
  "minutes,&rdquo; and the questions above replace it with something far more useful. So on each "
  "reading, <b>if it is showing, click its toggle to switch it off</b>.")
p("You can leave <b>Additional notes</b>, <b>Add guests</b> and <b>Reason for reschedule</b> "
  "exactly as they are.")

story.append(PageBreak())

# ---------------------------------------------------------------- part 3
p("Part 3 &nbsp;\u2014&nbsp; Fix the Quick Check-In description", H2)
p("The Quick Check-In event is currently showing the wrong description — it is the Monthly "
  "Personal Transits text (&ldquo;A standing 30-minute Zoom each month\u2026&rdquo;), which "
  "describes a different reading at a different price.")
steps([
    "<b>Event Types</b> » <b>Quick Check-In — One Topic</b>.",
    "<b>Setup</b> tab » the <b>Description</b> box.",
    "Delete what is there and paste in the wording below — it is what is already on your "
    "website — then click <b>Save</b>.",
])
p("&ldquo;One area of life suddenly chaotic — or one place you want to grow? Thirty focused "
  "minutes on how your astrological influences are affecting that single topic.&rdquo;", QUOTE)
gap(4)

rule()

p("When you're done — a two-minute check", H2)
p("Please do this bit, because it is the only part nobody else can test for you.")
steps([
    "Open <b>cal.com/molumen/natal-90</b> in a normal browser window (or a private one).",
    "Pick any available time.",
    "Look at the form. You should see: <b>Where should we meet?</b> with Zoom and Phone — "
    "<i>not</i> a box saying &ldquo;Somewhere else&rdquo;; your new birth-detail questions; and "
    "<b>no</b> &ldquo;What is this meeting about?&rdquo;",
])
callout("Stop there. Don't complete the booking.",
        ["It would charge a real card and put a real appointment in your calendar. Looking at "
         "the form is all that's needed."],
        bg=WARN_BG, bar=GOLD)
p("If it looks right, you're finished.")

p("If something looks wrong", H3)
p("Send Shane a screenshot of the booking form and say which reading it was. Nothing here is "
  "irreversible — every one of these settings can be changed back.")

story.append(PageBreak())

# ---------------------------------------------------------------- checklist
p("Quick checklist", H1)
p("Tick these off as you go.", SUB)

checklist("Part 1 — location (all nine readings)", [
    "Natal — 60 minutes",
    "Natal — 90 minutes",
    "Relationship Astrology Consultation",
    "Want More Clarity — Follow-Up Reading",
    "Want More Clarity — within 3 months",
    "Solar Return Reading",
    "Life Changes Astrological Consultation",
    "Quick Check-In — One Topic",
    "Monthly Personal Transits",
])
checklist("Part 2 — birth details", [
    "Natal — 60 minutes  (5 questions)",
    "Natal — 90 minutes  (5 questions)",
    "Relationship  (5 questions \u00d7 2 people)",
    "Optional: one question on each of the six follow-ups",
    "\u201cWhat is this meeting about?\u201d switched off wherever it is still showing",
])
checklist("Part 3", [
    "Quick Check-In description replaced",
])
checklist("Finally", [
    "Checked one booking form and stopped before paying",
])


# ---------------------------------------------------------------- chrome
def decorate(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(inch, LETTER[1] - 0.62 * inch, "MO LUMEN ASTROLOGY")
    canvas.setFillColor(INK_SOFT)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawRightString(LETTER[0] - inch, LETTER[1] - 0.62 * inch,
                           "Cal.com setup")
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(inch, LETTER[1] - 0.72 * inch, LETTER[0] - inch, LETTER[1] - 0.72 * inch)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawCentredString(LETTER[0] / 2, 0.55 * inch, str(canvas.getPageNumber()))
    canvas.restoreState()


doc = BaseDocTemplate(OUT, pagesize=LETTER,
                      leftMargin=inch, rightMargin=inch,
                      topMargin=0.95 * inch, bottomMargin=0.85 * inch,
                      title="Finishing your Cal.com booking setup",
                      author="Mo Lumen Astrology")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=decorate)])
doc.build(story)
print("wrote", OUT)
