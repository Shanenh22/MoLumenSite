from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if old not in text:
        raise SystemExit(f"Expected text not found in {path}: {old!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


replace_once(
    "src/pages/birth-time-toolkit/worksheets.astro",
    """  .ws-check li {\n    display: grid;\n    grid-template-columns: 1.4rem 1fr;\n    gap: var(--space-3);\n    font-size: var(--text-sm);\n  }\n  .ws-check li::before {\n    content: '';\n    display: block;\n    width: 1rem;\n    height: 1rem;\n    margin-top: 0.28rem;\n    border: 1.5px solid var(--color-blue-muted);\n    border-radius: 2px;\n  }\n""",
    """  .ws-check li {\n    position: relative;\n    padding-left: calc(1rem + var(--space-3));\n    font-size: var(--text-sm);\n  }\n  .ws-check li::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0.28rem;\n    width: 1rem;\n    height: 1rem;\n    border: 1.5px solid var(--color-blue-muted);\n    border-radius: 2px;\n    box-sizing: border-box;\n  }\n""",
)

replace_once(
    "scripts/gen-toolkit-pdf.mjs",
    """  .ws-check {\n    margin-bottom: 0.2in !important;\n  }\n\n  .ws-check li {\n    margin-bottom: 0.09in !important;\n  }\n""",
    """  .ws-check {\n    list-style: none !important;\n    padding: 0 !important;\n    margin: 0 0 0.2in !important;\n  }\n\n  .ws-check li {\n    display: block !important;\n    position: relative !important;\n    padding-left: 0.25in !important;\n    margin-bottom: 0.09in !important;\n  }\n\n  .ws-check li::before {\n    content: '' !important;\n    position: absolute !important;\n    left: 0 !important;\n    top: 0.035in !important;\n    width: 0.13in !important;\n    height: 0.13in !important;\n    border: 0.75pt solid #777 !important;\n    border-radius: 1px !important;\n    box-sizing: border-box !important;\n  }\n""",
)

replace_once(
    "scripts/gen-toolkit-pdf.mjs",
    """await page.addStyleTag({ content: PDF_CSS });\nawait page.pdf({\n""",
    """await page.addStyleTag({ content: PDF_CSS });\n\n// A checklist item that becomes unusually tall is a strong signal that its text\n// has collapsed into a narrow anonymous grid column. That failure can still\n// produce a syntactically valid PDF, so stop before writing a broken artifact.\nconst brokenChecklist = await page.$$eval('.ws-check li', (items) =>\n  items\n    .map((item, index) => {\n      const rect = item.getBoundingClientRect();\n      return { index: index + 1, width: rect.width, height: rect.height };\n    })\n    .filter((item) => item.width < 300 || item.height > 180),\n);\nif (brokenChecklist.length) {\n  throw new Error(`Toolkit checklist layout collapsed: ${JSON.stringify(brokenChecklist)}`);\n}\n\nawait page.pdf({\n""",
)

print("Applied toolkit checklist layout repair and generation guard.")
