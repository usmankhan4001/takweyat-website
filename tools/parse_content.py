"""Turns the extracted text of the Takweyat source documents into structured, verbatim JSON.

Only artefacts of PDF extraction are repaired: private-use glyphs that stand for punctuation, the garbled
Arabic name, and line wraps. No wording is changed.

Usage: python parse_content.py <docs_dir> <out_dir>
"""
import collections
import json
import os
import re
import sys

docs, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

# The PDFs stored punctuation as private-use glyphs. The mapping was read from context in the extracted text:
# "Years 1<e088>3" is "Years 1-3" with an en dash, "Phase 1<e092>" is "Phase 1:", "Years 11<e09d>" is "Years 11+".
GLYPH = {
    "": "(",
    "": ")",
    "": "–",
    "": ":",
    "": "+",
    "": "[",
}
ARABIC_RUN = re.compile(r"[؀-ۿﭐ-﷿ﹰ-﻿]+")
ARABIC_NAME = "تقویت"  # the organisation's name in Urdu script
log = collections.Counter()


def clean(text):
    for glyph, repl in GLYPH.items():
        log["glyph %s -> %s" % (hex(ord(glyph)), repl)] += text.count(glyph)
        text = text.replace(glyph, repl)
    log["arabic name restored"] += len(ARABIC_RUN.findall(text))
    return ARABIC_RUN.sub(ARABIC_NAME, text)


def read(name):
    with open(os.path.join(docs, name), encoding="utf-8") as fh:
        return clean(fh.read())


def join(lines):
    """Re-flow wrapped lines into one paragraph. A line ending in a hyphen before a lowercase word is a wrapped compound."""
    s = ""
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if s and re.search(r"[A-Za-z]-$", s) and re.match(r"[a-z]", line):
            s += line
            log["wrapped hyphen joined"] += 1
        else:
            s = (s + " " + line) if s else line
    return re.sub(r"\s{2,}", " ", s)


def bullets(lines):
    items, cur = [], None
    for line in lines:
        if line.lstrip().startswith("●"):
            cur = [line.lstrip()[1:].strip()]
            items.append(cur)
        elif cur is not None and line.strip():
            cur.append(line)
    return [join(b) for b in items]


def section(lines, names):
    idx = {}
    for i, line in enumerate(lines):
        for n in names:
            if line.startswith(n) and n not in idx:
                idx[n] = i
    order = sorted(idx.items(), key=lambda kv: kv[1])
    res = {}
    for k, (n, i) in enumerate(order):
        end = order[k + 1][1] if k + 1 < len(order) else len(lines)
        res[n] = lines[i + 1:end]
    return res, order


def phases(items):
    res = []
    for b in items:
        m = re.match(r"(Phase \d+): (.+?) \((Years [^)]+)\): (.+)", b)
        res.append({"phase": m.group(1), "name": m.group(2), "years": m.group(3), "text": m.group(4)})
    return res


HDR = re.compile(r"^(\d{1,2})\. (\S.*)$")
ITEM = re.compile(r"^(\d{1,2})\.(\d{1,2})\. (\S.*)$")

# ------------------------------------------------------------------ Legal Aid and Justice Plan
plan = read("plan.txt").split("\n")
heads = [(i, int(m.group(1)), m.group(2)) for i, l in enumerate(plan) if (m := HDR.match(l))]
pillars_start = next(i for i, l in enumerate(plan) if l.startswith("THE 50 PILLARS"))
fm = plan[:pillars_start]
secs, order = section(fm, ["Our Goal", "Our Summary", "Our Roadmap", "Our Targets", "Our Achievements", "Our Team"])
ach_heading = next(l for l in fm if l.startswith("Our Achievements"))

all_idx = [i for (i, k, t) in heads]
pillars = []
for n in range(1, 51):
    # first genuine occurrence; pillar 40 is only a placeholder in the first copy, its text is in the later copy
    start = next(i for (i, k, t) in heads if k == n and not t.startswith("[Reserved"))
    end = min(i for i in all_idx if i > start)
    title = plan[start].split(". ", 1)[1].strip()
    items, cur, pre = [], None, []
    for line in plan[start + 1:end]:
        m = ITEM.match(line)
        if m:
            assert int(m.group(1)) == n, (n, line)
            cur = {"id": "%d.%s" % (n, m.group(2)), "title": m.group(3).strip(), "lines": []}
            items.append(cur)
        elif cur is not None:
            cur["lines"].append(line)
        elif line.strip():
            pre.append(line)
    for it in items:
        it["text"] = join(it.pop("lines"))
    pillars.append({"number": n, "title": title, "sourceLine": start + 1, "intro": join(pre) if pre else "", "items": items})

legal = {
    "title": join(fm[:order[0][1]]),
    "goal": join(secs["Our Goal"]),
    "summary": join(secs["Our Summary"]),
    "roadmap": phases(bullets(secs["Our Roadmap"])),
    "targets": bullets(secs["Our Targets"]),
    "achievementsHeading": ach_heading,
    "achievements": bullets(secs["Our Achievements"]),
    "team": join(secs["Our Team"]),
    "pillarsHeading": plan[pillars_start].strip(),
    "pillars": pillars,
}

# ------------------------------------------------------------------ Educational Plan
ed = read("education.txt").split("\n")
ed_heads = [(i, int(m.group(1)), m.group(2)) for i, l in enumerate(ed) if (m := HDR.match(l))]
efm = ed[:ed_heads[0][0]]
esecs, eorder = section(efm, ["Executive Summary", "Our Ultimate Goal", "The Strategic Roadmap", "The 35 Pillars"])
epillars = []
for k, (s, n, t) in enumerate(ed_heads):
    e = ed_heads[k + 1][0] if k + 1 < len(ed_heads) else len(ed)
    epillars.append({"number": n, "title": t.strip(), "items": bullets(ed[s + 1:e])})
education = {
    "title": join(efm[:eorder[0][1]]),
    "executiveSummary": join(esecs["Executive Summary"]),
    "ultimateGoal": join(esecs["Our Ultimate Goal"]),
    "roadmapHeading": next(l for l in efm if l.startswith("The Strategic Roadmap")).strip(),
    "roadmap": phases(bullets(esecs["The Strategic Roadmap"])),
    "pillarsHeading": next(l for l in efm if l.startswith("The 35 Pillars")).strip(),
    "pillars": epillars,
}

# ------------------------------------------------------------------ Homepage structure and five core pillars (docx)
dx = [l.rstrip() for l in read("docx.txt").split("\n") if l.strip()]


def find(prefix):
    return next(i for i, l in enumerate(dx) if l.startswith(prefix))


i_hero, i_ach, i_core, i_next = find("Top Section"), find("Section 2"), find("Section 3"), find("Next Steps for the Website")
hero = {"section": dx[i_hero], "headline": dx[i_hero + 1].split(": ", 1)[1], "summary": dx[i_hero + 2].split(": ", 1)[1]}
achievements = []
for l in dx[i_ach + 2:i_core]:
    t, x = l.split(": ", 1)
    achievements.append({"title": t, "text": x})
core, mode = [], None
for l in dx[i_core + 2:i_next]:
    m = re.match(r"^(\d)\. (.+)$", l)
    if m:
        core.append({"number": int(m.group(1)), "title": m.group(2), "goal": "", "roadmap": "", "objectives": []})
        mode = None
    elif l.startswith("Goal: "):
        core[-1]["goal"] = l[6:]
    elif l.startswith("Roadmap: "):
        core[-1]["roadmap"] = l[9:]
    elif l.startswith("Strategic Objectives"):
        mode = "o"
    elif mode == "o":
        core[-1]["objectives"].append(l)
corejson = {
    "heroBanner": hero,
    "achievementsIntro": dx[i_ach + 1],
    "achievements": achievements,
    "pillarsIntro": dx[i_core + 1],
    "pillars": core,
    "draftingNoteExcluded": dx[i_next],
}

# ------------------------------------------------------------------ write
for name, obj in [("legal-plan", legal), ("education-plan", education), ("core-pillars", corejson)]:
    with open(os.path.join(out, name + ".json"), "w", encoding="utf-8") as fh:
        json.dump(obj, fh, ensure_ascii=False, indent=1)
for name in ["about", "legal", "member"]:
    with open(os.path.join(out, "source-%s.txt" % name), "w", encoding="utf-8") as fh:
        fh.write(read(name + ".txt"))

# ------------------------------------------------------------------ verification
rep = []


def check(cond, msg):
    rep.append(("OK   " if cond else "FAIL ") + msg)


check(len(pillars) == 50 and all(len(p["items"]) == 10 for p in pillars), "legal plan: 50 pillars x 10 items")
check(all(p["intro"] == "" for p in pillars), "legal plan: no stray text before item x.1")
check(all([i["id"] for i in p["items"]] == ["%d.%d" % (p["number"], k) for k in range(1, 11)] for p in pillars), "legal plan: item ids run n.1 to n.10 in order")
check(len(epillars) == 35 and all(len(p["items"]) == 10 for p in epillars), "education plan: 35 pillars x 10 items")
check([p["number"] for p in epillars] == list(range(1, 36)), "education plan: pillar numbers 1..35 in order")
check(len(core) == 5 and all(len(p["objectives"]) == 12 and p["goal"] and p["roadmap"] for p in core), "core pillars: 5 x (goal, roadmap, 12 objectives)")
check(len(achievements) == 7, "docx: 7 achievements")
check(len(legal["roadmap"]) == 4 and len(education["roadmap"]) == 4, "both plans: 4 roadmap phases")
check(len(legal["targets"]) == 4 and len(legal["achievements"]) == 4, "legal plan: 4 targets, 4 achievements")
blob = json.dumps([legal, education, corejson], ensure_ascii=False)
check(not re.search(r"[-]", blob), "no private-use glyphs remain")
check(not re.search(r"[ﭐ-﷿ﹰ-﻿]", blob), "no Arabic presentation-form garbage remains")
unb = [i["id"] for p in pillars for i in p["items"] if (i["title"] + " " + i["text"]).count("(") != (i["title"] + " " + i["text"]).count(")")]
check(not unb, "legal plan: parentheses balanced in every item (unbalanced: %s)" % unb)
unb2 = [(p["number"], k + 1) for p in epillars for k, b in enumerate(p["items"]) if b.count("(") != b.count(")")]
check(not unb2, "education plan: parentheses balanced in every bullet (unbalanced: %s)" % unb2)
long_titles = [i["id"] for p in pillars for i in p["items"] if len(i["title"]) > 80]
check(not long_titles, "legal plan: no item title suspiciously long, so none wrapped (%s)" % long_titles)
print("\n".join(rep))
print("\nrepairs:", dict(log))
print("words: legal plan", sum(len(i["text"].split()) for p in pillars for i in p["items"]), "| education plan", sum(len(b.split()) for p in epillars for b in p["items"]))
print("pillar 40:", pillars[39]["title"], "| source line", pillars[39]["sourceLine"])
print("legal title:", legal["title"])
print("roadmap phase 4:", legal["roadmap"][3]["years"])
