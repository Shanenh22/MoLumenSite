from pathlib import Path

path = Path("src/pages/book.astro")
text = path.read_text(encoding="utf-8")
old = """    .booking-section {\n      padding-top: var(--space-8);\n    }"""
new = """    .section.booking-section {\n      padding-top: var(--space-4);\n    }"""
if old not in text:
    raise SystemExit("Expected temporary mobile booking rule was not found")
path.write_text(text.replace(old, new, 1), encoding="utf-8")
print("Applied specific mobile booking spacing rule.")
