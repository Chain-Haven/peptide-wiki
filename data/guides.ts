// Long-form SEO guide content. Each guide is keyword-targeted, interlinks with
// peptide pages and tools, and renders with Article + FAQ + Breadcrumb JSON-LD.
// Body is Markdown (rendered with react-markdown). Avoid backticks in `content`.

export interface GuideFaq {
  q: string
  a: string
}

export interface Guide {
  slug: string
  title: string
  /** Optional <title> override; falls back to `title`. */
  metaTitle?: string
  description: string
  category: 'How-To' | 'Dosage' | 'Best Peptides' | 'Comparison' | 'Stacks' | 'Explainer'
  keywords: string[]
  readingTime: string
  updated: string
  /** Hero image path (served from /public). */
  image?: string
  /** Peptide slugs surfaced as "related" links. */
  relatedPeptides: string[]
  faqs: GuideFaq[]
  content: string
}

export const GUIDES: Guide[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-reconstitute-peptides',
    title: 'How to Reconstitute Peptides: A Step-by-Step Guide',
    metaTitle: 'How to Reconstitute Peptides: Step-by-Step Guide (2026)',
    description:
      'Learn how to reconstitute lyophilized peptides with bacteriostatic water — the supplies you need, the exact steps, how much water to use, and how to store the result.',
    category: 'How-To',
    keywords: [
      'how to reconstitute peptides', 'reconstitute peptides', 'bacteriostatic water',
      'mixing peptides', 'peptide reconstitution', 'how to mix peptides',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/science-vials.webp',
    relatedPeptides: ['bpc-157', 'tb-500', 'semaglutide', 'ipamorelin'],
    faqs: [
      {
        q: 'How much bacteriostatic water should I use to reconstitute a peptide?',
        a: 'There is no single correct volume — it sets the concentration. Most researchers add 1–3 mL of bacteriostatic water per vial and choose the exact amount so each dose is an easy number on an insulin syringe. Use a reconstitution calculator to work backward from your target dose.',
      },
      {
        q: 'Can I use regular water or sterile water instead of bacteriostatic water?',
        a: 'Bacteriostatic water is preferred for multi-dose vials because its 0.9% benzyl alcohol inhibits bacterial growth across repeated needle entries. Sterile water has no preservative and is generally used only for single-use scenarios. Never use tap or distilled water.',
      },
      {
        q: 'How long does a reconstituted peptide last?',
        a: 'Once reconstituted and refrigerated, most peptides remain stable for roughly 28–30 days, though this varies by compound. Lyophilized (freeze-dried) powder stored frozen lasts far longer. Discard any solution that becomes cloudy or discolored.',
      },
    ],
    content: `Most research peptides ship as a **lyophilized** (freeze-dried) white powder that has to be dissolved in liquid before it can be measured and used. That process is called **reconstitution**. Done carefully it takes about five minutes; done carelessly it degrades the peptide or introduces contamination. This guide walks through the whole process.

> **Research use only.** This article is educational. The compounds discussed are sold for laboratory research and are not for human consumption. See our [Medical Disclaimer](/medical-disclaimer).

## What you'll need

- The lyophilized peptide vial
- **Bacteriostatic water** (BAC water) — the diluent
- A larger syringe (3–5 mL, 23–27 gauge) for drawing the BAC water
- An **insulin syringe** (U-100) for measuring doses afterward
- Alcohol swabs
- A clean, flat surface

## Why bacteriostatic water?

Bacteriostatic water is sterile water containing **0.9% benzyl alcohol**, a mild preservative that suppresses bacterial growth as you re-enter the vial across multiple doses. That makes it the standard diluent for multi-dose peptide vials. Plain sterile water (no preservative) is typically reserved for single-use, and tap or distilled water should never be used.

## How much water to add

This is the step beginners overthink. The volume of BAC water you add doesn't change the *amount* of peptide in the vial — it only changes the **concentration**, and therefore how many units you draw per dose.

A common approach:

1. Decide your target dose (for example, 250 mcg).
2. Pick a convenient concentration so the dose lands on a clean syringe marking.
3. Add the matching volume of BAC water — usually between **1 mL and 3 mL**.

For example, adding **2 mL** of BAC water to a **5 mg** vial gives **2,500 mcg/mL**, so a 250 mcg dose is **0.1 mL** — the 10-unit mark on a U-100 insulin syringe.

Rather than do this math by hand, use our **[reconstitution & dosage calculator](/calculator)** — enter the vial size, the water you plan to add, and your dose, and it returns the exact units to draw.

## Step-by-step

1. **Let vials reach room temperature** and lay out your supplies.
2. **Swab both rubber stoppers** — the BAC water vial and the peptide vial — with alcohol and let them dry (~3 minutes).
3. **Draw your chosen volume of BAC water** into the larger syringe.
4. **Insert the needle into the peptide vial at a slight angle** and inject the water **slowly, aiming the stream against the glass wall** — not directly onto the powder. This protects the fragile peptide from the force of the stream.
5. **Do not shake.** Swirl gently or roll the vial between your palms for a couple of minutes until the solution is completely clear. Vigorous shaking causes foaming and can damage the peptide.
6. **Inspect.** A correctly reconstituted peptide is clear and particle-free. Cloudiness or discoloration means it should not be used.

## Storing the reconstituted vial

- Keep the reconstituted vial **refrigerated** (about 2–8°C) between uses.
- Most peptides stay stable for roughly **28–30 days** once mixed; lyophilized powder stored frozen lasts far longer.
- Protect from light and avoid repeated freeze–thaw cycles.

See our per-peptide pages for compound-specific storage temperatures and durations — for example [BPC-157](/peptides/bpc-157) or [semaglutide](/peptides/semaglutide).

## Common mistakes to avoid

- **Shaking the vial** instead of swirling.
- **Spraying water directly onto the powder** at full force.
- **Guessing the dose** instead of calculating units — use the [calculator](/calculator).
- **Reusing needles** or skipping the alcohol swab.
- **Using non-bacteriostatic water** for a multi-dose vial.

## Next steps

- Calculate your exact draw volume with the [reconstitution & dosage calculator](/calculator).
- Browse the [full peptide database](/peptides) for compound-specific protocols.
- Compare [trusted vendors](/vendors) and verify a COA before purchasing.`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'bpc-157-dosage-guide',
    title: 'BPC-157 Dosage Guide: How Much to Take',
    metaTitle: 'BPC-157 Dosage Guide: How Much to Take (Research)',
    description:
      'A research-based BPC-157 dosage guide — typical microgram ranges, weight-based dosing, injectable vs oral, local vs systemic administration, cycle length, and reconstitution math.',
    category: 'Dosage',
    keywords: [
      'bpc-157 dosage', 'bpc 157 dosage', 'how much bpc-157', 'bpc-157 protocol',
      'bpc-157 cycle', 'bpc 157 dose',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['bpc-157', 'tb-500'],
    faqs: [
      {
        q: 'What is a typical BPC-157 research dosage?',
        a: 'Most reported research protocols use roughly 250–500 mcg once or twice daily, with a common total of around 500 mcg/day. Ranges in the literature and anecdotal reports span about 200–1,000 mcg/day depending on body size and goal.',
      },
      {
        q: 'How long is a typical BPC-157 cycle?',
        a: 'Protocols commonly run 4–8 weeks followed by a break. Because human safety data is limited, continuous long-term use is not well characterized.',
      },
      {
        q: 'Is injectable or oral BPC-157 better?',
        a: 'Injectable (subcutaneous) BPC-157 is most commonly discussed for systemic and localized support, while oral forms are often discussed for gut-related research. Evidence comparing routes in humans is limited.',
      },
    ],
    content: `BPC-157 is a synthetic peptide derived from a protein found in gastric juice, studied primarily for tissue-repair and gut-related effects in animal models. This guide summarizes how dosage is described in the research and community literature.

> **Important:** BPC-157 is **not** FDA-approved and is sold for research purposes only. Human clinical data is limited. Nothing here is medical advice — see our [Medical Disclaimer](/medical-disclaimer). For the full scientific profile, see the [BPC-157 peptide page](/peptides/bpc-157).

## Typical research dosage range

Across reported protocols, dosing usually falls in the range of:

- **200–500 mcg per dose**
- **Once or twice daily**
- A frequently cited total of **~500 mcg/day**

Broader reports span roughly **200–1,000 mcg/day**, scaled to body size and the severity of the issue being researched. A common starting point is to begin at the **lower end** and adjust.

## Weight-based dosing

Some protocols express the dose relative to body weight — for example around **2.5–3.75 mcg per kilogram, twice daily**. For an 80 kg subject that works out to roughly **200–300 mcg per dose**. Our [dosage calculator](/calculator) can do this math for you.

## Local vs systemic administration

BPC-157 is commonly discussed two ways:

- **Localized** — subcutaneous injection near the area of interest, on the theory of site-specific support.
- **Systemic** — injection at a convenient site for whole-body exposure.

Both appear in the literature; high-quality human comparisons are lacking.

## Injectable vs oral

- **Injectable (subcutaneous)** is the most discussed route for general and localized research.
- **Oral** forms are often discussed specifically for **gut-related** research, given the peptide's gastric origin. Oral protocols frequently cap around **500 mcg/day split into two doses**.

## Cycle length

A typical research cycle runs **4–8 weeks**, followed by a rest period (often comparable in length) before any subsequent cycle. Long-term continuous use is not well characterized in humans.

## Reconstitution example

Suppose you have a **5 mg BPC-157 vial** and want **250 mcg** doses:

1. Add **2 mL** of bacteriostatic water → **2,500 mcg/mL**.
2. A 250 mcg dose = **0.1 mL** = the **10-unit** mark on a U-100 insulin syringe.

Walk through the full process in our [reconstitution guide](/guides/how-to-reconstitute-peptides), or skip the math with the [calculator](/calculator).

## Stacking

BPC-157 is frequently researched alongside **[TB-500](/peptides/tb-500)** for recovery — the combination is popularly called the "Wolverine" stack. See the dedicated [BPC-157 + TB-500 stack guide](/guides/bpc-157-tb-500-wolverine-stack).

## Safety notes

- Start low; titrate cautiously.
- Source from vendors that publish a **certificate of analysis (COA)** — compare options on our [vendors page](/vendors).
- Human safety data is limited; this is not medical advice.

## Related

- [BPC-157 full profile](/peptides/bpc-157)
- [BPC-157 + TB-500 "Wolverine" stack](/guides/bpc-157-tb-500-wolverine-stack)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-peptides-for-weight-loss',
    title: 'Best Peptides for Weight Loss (2026): An Evidence-Based Guide',
    metaTitle: 'Best Peptides for Weight Loss (2026): Evidence-Based',
    description:
      'The peptides most studied for weight loss — GLP-1 agonists (semaglutide, tirzepatide, retatrutide), growth-hormone secretagogues, AOD-9604 and more — with the clinical-trial evidence behind each.',
    category: 'Best Peptides',
    keywords: [
      'best peptides for weight loss', 'best peptides for fat loss', 'peptides for weight loss',
      'glp-1 peptides', 'weight loss peptides',
    ],
    readingTime: '9 min',
    updated: 'June 2026',
    image: '/guides/weight-loss.webp',
    relatedPeptides: ['semaglutide', 'tirzepatide', 'liraglutide', 'tesamorelin', 'aod-9604'],
    faqs: [
      {
        q: 'What is the most effective peptide for weight loss?',
        a: 'In head-to-head and trial data, the dual GIP/GLP-1 agonist tirzepatide has produced the largest average weight loss (about 20%+ at the highest dose in SURMOUNT-1), ahead of the GLP-1 agonist semaglutide (about 15% in STEP 1). Both are FDA-approved for weight management.',
      },
      {
        q: 'Are weight-loss peptides FDA-approved?',
        a: 'Some are: semaglutide (Wegovy), tirzepatide (Zepbound), and liraglutide (Saxenda) are FDA-approved for weight management. Many other peptides discussed for fat loss are research compounds and are not approved.',
      },
      {
        q: 'Do growth-hormone peptides cause weight loss?',
        a: 'GH-releasing peptides like tesamorelin have clinical evidence for reducing visceral (abdominal) fat specifically, but they are not general-purpose weight-loss drugs and their overall effect on body weight is modest compared with GLP-1 agonists.',
      },
    ],
    content: `"Best peptide for weight loss" doesn't have a single answer — it depends on whether the goal is overall body-weight reduction, visceral fat, or fat loss while preserving muscle. This guide groups the most-studied options by mechanism and summarizes the evidence behind each.

> **Research/education only.** Several compounds below are research peptides, not approved drugs. This is not medical advice — consult a qualified professional and read our [Medical Disclaimer](/medical-disclaimer).

## 1. GLP-1 and dual agonists — the strongest evidence

This class drives appetite reduction and slowed gastric emptying, and it has by far the most robust clinical trial data.

- **[Semaglutide](/peptides/semaglutide)** — a GLP-1 receptor agonist. In the **STEP 1 trial (NEJM 2021, n=1,961)**, participants lost about **14.9%** of body weight vs 2.4% on placebo. FDA-approved for weight management (Wegovy).
- **[Tirzepatide](/peptides/tirzepatide)** — a **dual GIP/GLP-1** agonist. In **SURMOUNT-1 (NEJM 2022, n=2,539)**, the highest dose produced about **22.5%** weight loss, with ~63% of participants losing ≥20%. Real-world comparisons also favor tirzepatide over semaglutide (roughly 14.7% vs 10.8%). FDA-approved (Zepbound).
- **Retatrutide** — an investigational **triple agonist** (GIP/GLP-1/glucagon) that has shown striking results in early trials; still in clinical development.
- **[Liraglutide](/peptides/liraglutide)** — an earlier daily GLP-1 agonist (Saxenda), effective but generally less potent than the weekly agents.

Compare these side by side with our [comparison tool](/compare), or read the dedicated [semaglutide vs tirzepatide](/guides/semaglutide-vs-tirzepatide) breakdown.

## 2. Growth-hormone secretagogues — for visceral fat & recomposition

These raise growth hormone / IGF-1, which can support fat metabolism and lean-mass preservation.

- **[Tesamorelin](/peptides/tesamorelin)** — the standout here: an FDA-approved GHRH analog shown to **reduce visceral adipose tissue (VAT)** by about 13–15% in clinical trials. Targeted at abdominal fat rather than overall weight.
- **[CJC-1295](/peptides/cjc-1295) + [Ipamorelin](/peptides/ipamorelin)** — a popular GHRH + ghrelin-mimetic pairing researched for body recomposition, recovery, and sleep.

These are best understood as **recomposition** tools, not appetite-driven weight-loss drugs.

## 3. Other peptides discussed for fat loss

- **[AOD-9604](/peptides/aod-9604)** — a fragment of growth hormone studied for fat metabolism without affecting blood sugar. Human evidence for meaningful weight loss is weak.
- **Cagrilintide** — an amylin analog being studied, often **combined with semaglutide** (CagriSema), with promising trial results.

## How to choose

| Goal | Most-studied options |
| --- | --- |
| Maximum overall weight loss | Tirzepatide, then semaglutide |
| Visceral (belly) fat specifically | Tesamorelin |
| Recomposition (fat down, muscle preserved) | CJC-1295 + Ipamorelin |
| Appetite control | GLP-1 / dual agonists |

## The bottom line

The **GLP-1 and dual-agonist class** — led by [tirzepatide](/peptides/tirzepatide) and [semaglutide](/peptides/semaglutide) — has the strongest clinical evidence for weight loss by a wide margin. Growth-hormone secretagogues and tesamorelin serve more specific recomposition and visceral-fat goals.

Whatever the compound, source it from a vendor that publishes a COA — compare options on our [vendors page](/vendors).

## Related

- [Semaglutide vs Tirzepatide](/guides/semaglutide-vs-tirzepatide)
- [Compare peptides side by side](/compare)
- [Browse weight-management peptides](/peptides?category=weight-management)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'semaglutide-vs-tirzepatide',
    title: 'Semaglutide vs Tirzepatide: Which Is Better for Weight Loss?',
    metaTitle: 'Semaglutide vs Tirzepatide: Which Is Better? (2026)',
    description:
      'A head-to-head comparison of semaglutide and tirzepatide — mechanism, clinical-trial weight loss (STEP 1 vs SURMOUNT-1), side effects, dosing, and which has the edge.',
    category: 'Comparison',
    keywords: [
      'semaglutide vs tirzepatide', 'tirzepatide vs semaglutide', 'wegovy vs zepbound',
      'ozempic vs mounjaro', 'glp-1 comparison',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/weight-loss.webp',
    relatedPeptides: ['semaglutide', 'tirzepatide'],
    faqs: [
      {
        q: 'Is tirzepatide better than semaglutide for weight loss?',
        a: 'On average, yes — tirzepatide has produced greater weight loss in both clinical trials (about 22.5% in SURMOUNT-1 vs about 14.9% in STEP 1) and head-to-head/real-world data. Individual responses vary, and both are highly effective.',
      },
      {
        q: 'What is the difference in mechanism?',
        a: 'Semaglutide is a single GLP-1 receptor agonist. Tirzepatide is a dual agonist that activates both GIP and GLP-1 receptors, which is thought to underlie its larger average effect.',
      },
      {
        q: 'Do they have the same side effects?',
        a: 'Both share gastrointestinal side effects (nausea, diarrhea) and the same class warnings. Some comparative data suggests tirzepatide users report somewhat fewer GI, headache, and fatigue events, though tolerability is individual.',
      },
    ],
    content: `[Semaglutide](/peptides/semaglutide) and [tirzepatide](/peptides/tirzepatide) are the two most talked-about injectable weight-loss compounds. They're related but not the same. Here's how they compare on the things that matter.

> **Education only — not medical advice.** Both are prescription medications in approved formulations. See our [Medical Disclaimer](/medical-disclaimer). Compare them interactively with our [comparison tool](/compare).

## Mechanism

- **Semaglutide** is a **GLP-1 receptor agonist** — it mimics the GLP-1 incretin hormone to reduce appetite, slow gastric emptying, and improve glycemic control.
- **Tirzepatide** is a **dual GIP/GLP-1 receptor agonist** — it activates a second incretin receptor (GIP) in addition to GLP-1, which is thought to explain its larger average effect.

## Weight-loss effectiveness

This is where they separate most clearly:

| | Semaglutide | Tirzepatide |
| --- | --- | --- |
| Landmark trial | STEP 1 (NEJM 2021) | SURMOUNT-1 (NEJM 2022) |
| Sample size | n=1,961 | n=2,539 |
| Avg. weight loss | **~14.9%** | **~22.5%** (highest dose) |
| ≥20% weight loss | fewer | ~63% of participants |

Real-world head-to-head data points the same direction — one analysis found roughly **14.7% vs 10.8%** mean weight loss favoring tirzepatide, with nearly twice as many "high responders."

## Side effects

Both carry the same general profile:

- **Gastrointestinal** effects (nausea, diarrhea, constipation) are the most common and the leading reason people discontinue.
- Both share class **boxed warnings** regarding thyroid C-cell tumors (based on rodent data).
- Some comparative data suggests **tirzepatide** users report **somewhat fewer** GI, headache, and fatigue events — but tolerability is highly individual.

## Dosing & administration

- Both are **once-weekly subcutaneous injections**, started low and **titrated up** over weeks to limit side effects.
- Semaglutide tops out lower in milligrams than tirzepatide; both follow a stepwise escalation schedule.

## The verdict

For **average weight loss**, **tirzepatide has the edge** — both in controlled trials and real-world data — likely due to its dual incretin mechanism. **Semaglutide** remains highly effective, is very well studied, and has a longer track record. The "better" choice in practice depends on individual response, tolerability, availability, and cost.

## Related

- [Semaglutide full profile](/peptides/semaglutide) · [Tirzepatide full profile](/peptides/tirzepatide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)
- [Compare peptides side by side](/compare)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'bpc-157-tb-500-wolverine-stack',
    title: 'BPC-157 + TB-500 "Wolverine" Stack: Protocol & Rationale',
    metaTitle: 'BPC-157 + TB-500 "Wolverine" Stack: Protocol Guide',
    description:
      'Why BPC-157 and TB-500 are stacked together for recovery, the typical research protocol and dosing for each, cycle length, and reconstitution — the "Wolverine" stack explained.',
    category: 'Stacks',
    keywords: [
      'bpc-157 tb-500 stack', 'wolverine stack', 'bpc 157 and tb 500',
      'bpc-157 tb-500 dosage', 'healing peptide stack',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/healing-recovery.webp',
    relatedPeptides: ['bpc-157', 'tb-500'],
    faqs: [
      {
        q: 'What is the "Wolverine" stack?',
        a: 'It is the popular nickname for combining BPC-157 and TB-500, two peptides researched for tissue repair, because of the comic-book character known for rapid healing. The two are thought to work through complementary mechanisms.',
      },
      {
        q: 'What is a typical BPC-157 + TB-500 protocol?',
        a: 'Reported research protocols often run BPC-157 at roughly 250–500 mcg daily alongside TB-500 at around 2–2.5 mg per week (sometimes split into two doses), over a 4–8 week cycle. These are not medical recommendations.',
      },
      {
        q: 'Can BPC-157 and TB-500 be mixed in one syringe?',
        a: 'They are reconstituted separately. Some researchers draw both into one syringe for a single injection, but each peptide should be reconstituted and stored in its own vial.',
      },
    ],
    content: `Combining **[BPC-157](/peptides/bpc-157)** and **[TB-500](/peptides/tb-500)** is one of the most popular recovery protocols in the peptide research community — nicknamed the **"Wolverine" stack** after the character known for rapid healing. Here's the rationale and the typical research protocol.

> **Research use only.** Neither compound is FDA-approved; human data is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## Why stack them?

The two peptides are thought to support tissue repair through **complementary** mechanisms:

- **BPC-157** is studied for **localized** repair, angiogenesis (new blood-vessel formation), and gut/tendon support.
- **TB-500** (a synthetic fragment related to Thymosin Beta-4) is studied for **systemic** effects on cell migration and actin regulation, with a longer half-life and broader distribution.

The idea behind the stack is pairing BPC-157's localized action with TB-500's systemic reach.

## Typical research protocol

Reported (non-medical) protocols commonly look like:

| Peptide | Typical research dose | Frequency |
| --- | --- | --- |
| [BPC-157](/peptides/bpc-157) | ~250–500 mcg | Once or twice daily |
| [TB-500](/peptides/tb-500) | ~2–2.5 mg | Weekly (often split into 2 doses) |

A common structure is a **loading phase** (higher TB-500 frequency for the first few weeks) followed by a **maintenance** phase, over a total **4–8 week** cycle, then a break. Always start at the lower end.

## Reconstitution

Each peptide is reconstituted **separately** with bacteriostatic water. Walk through the process in our [reconstitution guide](/guides/how-to-reconstitute-peptides), and use the [dosage calculator](/calculator) to convert milligrams to insulin-syringe units for each vial.

Some researchers draw both peptides into one insulin syringe for a single injection once each is reconstituted — but they are never stored together.

## Safety notes

- Begin conservatively and assess tolerance.
- Source both compounds from vendors that publish a **COA** — see the [vendors page](/vendors).
- Human safety data for the combination is limited.

## Related

- [BPC-157 dosage guide](/guides/bpc-157-dosage-guide)
- [TB-500 dosage guide](/guides/tb-500-dosage-guide)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)
- [Browse healing & recovery peptides](/peptides?category=healing-recovery)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-peptides-for-healing-recovery',
    title: 'Best Peptides for Healing and Injury Recovery',
    metaTitle: 'Best Peptides for Healing & Injury Recovery (2026)',
    description:
      'The peptides most researched for tissue repair, injury recovery, and inflammation — BPC-157, TB-500, GHK-Cu, and growth-hormone secretagogues — with the evidence and how they are stacked.',
    category: 'Best Peptides',
    keywords: [
      'best peptides for healing', 'peptides for injury recovery', 'peptides for tendon repair',
      'recovery peptides', 'bpc-157 healing',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/healing-recovery.webp',
    relatedPeptides: ['bpc-157', 'tb-500', 'cjc-1295', 'ipamorelin'],
    faqs: [
      {
        q: 'What is the best peptide for healing injuries?',
        a: 'BPC-157 and TB-500 are the two most-researched peptides for tissue repair and are frequently combined (the "Wolverine" stack). Most supporting evidence is preclinical, so claims should be treated cautiously.',
      },
      {
        q: 'How long do recovery peptide protocols last?',
        a: 'Research protocols typically run 4–8 weeks followed by a break, scaled to the issue being studied.',
      },
      {
        q: 'Is there human evidence for healing peptides?',
        a: 'Most evidence for BPC-157 and TB-500 comes from animal and in-vitro studies; rigorous human trials are limited. Growth-hormone secretagogues and some others have more clinical data for related endpoints.',
      },
    ],
    content: `Several peptides are researched for **tissue repair, injury recovery, and inflammation**. The evidence base ranges from extensive preclinical work to limited human data, so this guide is organized by how each is studied — not as a treatment recommendation.

> **Research/education only.** Most compounds below are not FDA-approved, and much of the supporting evidence is preclinical. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## 1. BPC-157 — localized repair

**[BPC-157](/peptides/bpc-157)** is the most-discussed recovery peptide. In animal models it has shown effects on tendon, ligament, muscle, and gut healing, and on angiogenesis (new blood-vessel formation). Typical research dosing is ~250–500 mcg/day — see the [BPC-157 dosage guide](/guides/bpc-157-dosage-guide). Human trials are limited.

## 2. TB-500 — systemic repair

**[TB-500](/peptides/tb-500)**, a synthetic fragment related to Thymosin Beta-4, is studied for cell migration, actin regulation, and systemic tissue repair. Its longer half-life and broad distribution make it a natural complement to BPC-157. See the [TB-500 dosage guide](/guides/tb-500-dosage-guide).

## 3. The BPC-157 + TB-500 "Wolverine" stack

Because their mechanisms are complementary — local vs systemic — the two are very commonly combined. Read the dedicated [Wolverine stack protocol](/guides/bpc-157-tb-500-wolverine-stack).

## 4. GHK-Cu — skin & connective tissue

GHK-Cu, a copper-binding peptide, is researched for skin remodeling, collagen synthesis, and wound healing, and appears in both injectable and topical research contexts.

## 5. Growth-hormone secretagogues — recovery support

**[CJC-1295](/peptides/cjc-1295) + [Ipamorelin](/peptides/ipamorelin)** raise growth hormone and IGF-1, which support recovery, connective-tissue health, and sleep quality. They are a recovery *support* tool rather than a targeted injury treatment. See the [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide).

## How to choose

| Goal | Most-studied options |
| --- | --- |
| Tendon / ligament / muscle repair | BPC-157, TB-500, or both |
| Skin / wound / collagen | GHK-Cu |
| General recovery & sleep | CJC-1295 + Ipamorelin |

## Practical notes

- Most recovery protocols run **4–8 weeks** with a break afterward.
- Source from COA-publishing vendors — compare on the [vendors page](/vendors).
- Calculate doses with the [reconstitution & dosage calculator](/calculator).

## Related

- [BPC-157 + TB-500 "Wolverine" stack](/guides/bpc-157-tb-500-wolverine-stack)
- [BPC-157 dosage guide](/guides/bpc-157-dosage-guide)
- [Browse healing & recovery peptides](/peptides?category=healing-recovery)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'tb-500-dosage-guide',
    title: 'TB-500 Dosage Guide: Protocol & Cycle for Research',
    metaTitle: 'TB-500 Dosage Guide: Protocol & Cycle (2026)',
    description:
      'A research-based TB-500 dosage guide covering typical milligram ranges, the loading vs maintenance phase structure, weight-based dosing, reconstitution math, and stacking with BPC-157.',
    category: 'Dosage',
    keywords: [
      'tb-500 dosage', 'tb500 dosage', 'thymosin beta 4 dosage', 'tb-500 protocol',
      'tb 500 cycle', 'tb-500 dose',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['tb-500', 'bpc-157'],
    faqs: [
      {
        q: 'What is a typical TB-500 dosage?',
        a: 'Most reported research protocols use 2.0–2.5 mg twice weekly during a loading phase (4–5 mg/week total), tapering to approximately 2 mg once weekly during a maintenance phase. These are not medical recommendations.',
      },
      {
        q: 'How long is a TB-500 cycle?',
        a: 'A common structure is a 4-week loading phase followed by 4–8 weeks of maintenance dosing, then a break. Total cycle length is typically 8–12 weeks.',
      },
      {
        q: 'Where do you inject TB-500?',
        a: 'TB-500 is typically injected subcutaneously in a convenient site (abdomen or thigh) rather than near an injury site — its systemic mechanism means site proximity is less critical than with BPC-157.',
      },
    ],
    content: `TB-500 is a synthetic peptide derived from **Thymosin Beta-4 (Tβ4)**, a naturally occurring protein involved in actin polymerization, cell migration, and tissue repair. Unlike BPC-157, which is often used near a specific injury site, TB-500 is typically administered systemically.

> **Research use only.** TB-500 is not FDA-approved; human clinical data is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer). See the [TB-500 peptide page](/peptides/tb-500) for the full profile.

## Why TB-500 is dosed differently from most peptides

Most peptides are dosed in micrograms. TB-500 is dosed in **milligrams** — the required amounts are simply larger. This means a standard 5 mg vial typically provides only 2–4 full doses.

## Typical research dosage

Most reported protocols follow a **two-phase structure**:

| Phase | Typical dose | Frequency | Duration |
| --- | --- | --- | --- |
| Loading | 2.0–2.5 mg | Twice weekly | 4 weeks |
| Maintenance | 2.0 mg | Once weekly | 4–8 weeks |

A total weekly loading-phase dose of roughly **4–5 mg** is the most commonly cited figure. Starting lower — around **2 mg/week** — and adjusting upward is a conservative approach.

## Weight-based dosing

Some protocols express TB-500 dosing relative to body weight — approximately **5–20 mcg per kilogram** twice weekly. For an 80 kg subject, this works out to roughly **0.4–1.6 mg per injection**.

Use our [dosage calculator](/calculator) to convert milligrams to insulin-syringe units.

## Injection site

TB-500 is typically administered subcutaneously at a **convenient, consistent site** — the abdomen (2 inches from the navel) or outer thigh. Because its proposed mechanism is systemic, proximity to the injury is thought to be less important than with BPC-157.

For full injection technique, see the [How to Inject Peptides guide](/guides/how-to-inject-peptides).

## Reconstitution example

With a **5 mg TB-500 vial** and a target dose of **2 mg**:

- Add **2 mL** of bacteriostatic water → **2.5 mg/mL** concentration.
- A 2 mg dose = **0.8 mL** = the **80-unit** mark on a U-100 insulin syringe.

Walk through the full process in the [reconstitution guide](/guides/how-to-reconstitute-peptides).

## Stacking with BPC-157

TB-500 is very frequently combined with **[BPC-157](/peptides/bpc-157)** in the popular "Wolverine" recovery stack. The rationale is complementary mechanisms — BPC-157 for localized repair and angiogenesis; TB-500 for systemic cell migration with a longer half-life. See the [Wolverine stack guide](/guides/bpc-157-tb-500-wolverine-stack) for the full combined protocol, or compare the two compounds directly at [BPC-157 vs TB-500](/guides/bpc-157-vs-tb-500).

## Safety notes

- Begin conservatively at the lower end of reported ranges.
- Source from vendors that publish a **certificate of analysis (COA)** — see the [vendors page](/vendors).
- Human safety data for TB-500 is limited; this is not medical advice.

## Related

- [TB-500 full profile](/peptides/tb-500)
- [BPC-157 + TB-500 "Wolverine" stack](/guides/bpc-157-tb-500-wolverine-stack)
- [BPC-157 vs TB-500 comparison](/guides/bpc-157-vs-tb-500)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ipamorelin-cjc-1295-dosage-guide',
    title: 'Ipamorelin and CJC-1295 Dosage Guide',
    metaTitle: 'Ipamorelin + CJC-1295 Dosage Guide (2026)',
    description:
      'Research dosage guide for the Ipamorelin + CJC-1295 stack — how much of each peptide, injection timing, the DAC vs no-DAC distinction, cycle length, and what the combination is studied for.',
    category: 'Dosage',
    keywords: [
      'ipamorelin dosage', 'cjc-1295 dosage', 'ipamorelin cjc 1295 protocol',
      'ipamorelin cjc 1295 dosage', 'growth hormone peptide dosage', 'ghrp dosage',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295'],
    faqs: [
      {
        q: 'What is a typical Ipamorelin dosage?',
        a: 'Reported research protocols typically use 200–300 mcg of Ipamorelin per injection, administered 2–3 times daily. It is often co-injected with CJC-1295 (without DAC / Mod-GRF 1-29) at a similar timing.',
      },
      {
        q: 'What is the difference between CJC-1295 with DAC and without DAC?',
        a: 'CJC-1295 with DAC (Drug Affinity Complex) has a much longer half-life — roughly 6–8 days — so it is dosed once or twice weekly. CJC-1295 without DAC (also called Mod-GRF 1-29) has a short half-life and is dosed multiple times daily, co-injected with Ipamorelin. Most researchers pair the without-DAC version with Ipamorelin for timed GH pulses.',
      },
      {
        q: 'When should Ipamorelin and CJC-1295 be injected?',
        a: 'The most common timing is fasted — first thing in the morning, before sleep, and/or before training. GH release is blunted by elevated insulin (i.e., after meals), so fasted timing is preferred.',
      },
    ],
    content: `**[Ipamorelin](/peptides/ipamorelin)** and **[CJC-1295](/peptides/cjc-1295)** are among the most popular growth-hormone secretagogues in the research community. They are almost always stacked together because they work through **complementary mechanisms** on the GH axis.

> **Research use only.** Neither is FDA-approved for general use; human data outside specific indications is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## Why stack them?

- **CJC-1295** is a **GHRH analog** — it tells the pituitary to release more growth hormone.
- **Ipamorelin** is a **selective GHRP** (growth hormone releasing peptide) — it amplifies the GH pulse via the ghrelin receptor, with minimal effect on cortisol or prolactin (unlike older GHRPs such as GHRP-6 or GHRP-2).

Together they produce a stronger, more consistent GH pulse than either alone.

## The DAC distinction (critical for dosing)

CJC-1295 exists in two forms with very different dosing:

| Form | Half-life | Typical dose | Frequency |
| --- | --- | --- | --- |
| CJC-1295 **with DAC** | ~6–8 days | 1–2 mg | Once or twice weekly |
| CJC-1295 **without DAC** (Mod-GRF 1-29) | ~30 min | 100–200 mcg | 2–3x daily with Ipamorelin |

Most researchers who want timed GH pulses choose the **without-DAC (Mod-GRF 1-29)** version, co-injected with Ipamorelin at each session.

## Typical research dosages

**Ipamorelin:** 200–300 mcg per injection, 2–3 times daily.

**CJC-1295 without DAC (Mod-GRF 1-29):** 100–200 mcg per injection, co-injected with Ipamorelin 2–3 times daily.

**CJC-1295 with DAC:** 1–2 mg once weekly (injected independently, not co-timed with Ipamorelin pulses).

## Timing

Inject **fasted** for best effect — GH release is blunted by elevated insulin levels following a meal. The most popular injection windows are:

- **Upon waking** (fasted, before breakfast)
- **Before sleep** (fasted, 2+ hours after last meal)
- **Pre-training** (fasted, 30–45 minutes before exercise)

## Cycle length

Typical research cycles run **8–12 weeks**, followed by a 4-week break. Some protocols extend to 6 months with periodic breaks. Longer-term continuous use is not well studied in humans.

## What it is studied for

The Ipamorelin + CJC-1295 combination is researched primarily for:

- **Body recomposition** — raising GH/IGF-1 to support fat metabolism and lean-mass maintenance
- **Recovery** — improved connective tissue repair and muscle recovery between training sessions
- **Sleep quality** — GH is primarily released during deep sleep; secretagogues may support this pulse
- **Anti-aging** — GH naturally declines with age; restoration is a subject of longevity research

## Reconstitution

Both peptides are reconstituted separately in bacteriostatic water. For step-by-step instructions, see the [reconstitution guide](/guides/how-to-reconstitute-peptides). To calculate exactly how many syringe units to draw per dose, use the [dosage calculator](/calculator).

## Related

- [Ipamorelin full profile](/peptides/ipamorelin)
- [CJC-1295 full profile](/peptides/cjc-1295)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)
- [Best peptides for anti-aging](/guides/best-peptides-for-anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-peptides-for-muscle-growth',
    title: 'Best Peptides for Muscle Growth (2026)',
    metaTitle: 'Best Peptides for Muscle Growth (2026): Research Guide',
    description:
      'The peptides most studied for lean muscle mass — GH secretagogues (CJC-1295, Ipamorelin, MK-677), recovery peptides (BPC-157, TB-500), and how each supports hypertrophy and body recomposition.',
    category: 'Best Peptides',
    keywords: [
      'best peptides for muscle growth', 'peptides for muscle building', 'muscle growth peptides',
      'peptides for bulking', 'peptides for body recomposition', 'cjc-1295 ipamorelin muscle',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/muscle-growth.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295', 'bpc-157', 'tb-500'],
    faqs: [
      {
        q: 'What is the best peptide for muscle growth?',
        a: 'The GH secretagogue combination of CJC-1295 + Ipamorelin is the most popular research stack for muscle growth, as it raises GH and IGF-1 which are key anabolic signaling molecules. BPC-157 and TB-500 support recovery, enabling more consistent training volume.',
      },
      {
        q: 'Do peptides build muscle as fast as steroids?',
        a: 'No. GH secretagogues work indirectly by raising growth hormone and IGF-1, producing slower and more subtle effects than anabolic steroids. Most researchers report improvements in body composition, recovery, and sleep rather than dramatic mass gains in short cycles.',
      },
      {
        q: 'Is MK-677 a peptide?',
        a: 'MK-677 (Ibutamoren) is technically a non-peptide GH secretagogue — it acts on the same ghrelin receptor as GHRPs like Ipamorelin. It is orally bioavailable, distinguishing it from injectable peptide secretagogues.',
      },
    ],
    content: `No single peptide "builds muscle" the way anabolic steroids do. Instead, peptides for muscle growth work primarily through two pathways: **raising the GH/IGF-1 axis** (which supports anabolism and fat loss) and **accelerating recovery** (which allows more training volume). This guide covers both.

> **Research/education only.** The compounds below are sold for laboratory research; human clinical data is variable. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## Category 1: GH secretagogues — the primary anabolic lever

These peptides stimulate the pituitary to release more growth hormone, which in turn raises IGF-1. The GH/IGF-1 axis supports lean mass, fat metabolism, and connective-tissue health.

### CJC-1295 + Ipamorelin — the most popular combination

The classic pairing: **[CJC-1295](/peptides/cjc-1295)** (GHRH analog) + **[Ipamorelin](/peptides/ipamorelin)** (selective GHRP) produces amplified, timed GH pulses with minimal effect on cortisol or prolactin. Most common for body recomposition — gradual increase in lean mass alongside fat loss. See the [dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide) for the full protocol.

### MK-677 (Ibutamoren) — oral GH secretagogue

MK-677 acts on the same ghrelin receptor as Ipamorelin but is **orally bioavailable** — no injection required. Typical research doses range from 10–25 mg/day. It significantly raises GH and IGF-1 and is studied for lean mass, recovery, and bone density. Downsides: it also increases appetite and can raise fasting glucose.

### GHRP-6 — older but effective (and appetite-stimulating)

An earlier growth hormone releasing peptide, effective at raising GH but notable for causing **significant appetite increases** (the "ghrp-6 hunger") — which can be useful in a deliberate bulk. Less selective than Ipamorelin, with more effect on cortisol.

## Category 2: Recovery peptides — training more, recovering faster

Muscle growth is limited by how quickly the body recovers between training sessions. These peptides are researched for tissue repair.

### BPC-157 — localized repair

**[BPC-157](/peptides/bpc-157)** shows effects on tendon, muscle, and gut healing in animal models. By keeping soft tissue healthy, it may allow more consistent high-volume training. See the [BPC-157 dosage guide](/guides/bpc-157-dosage-guide).

### TB-500 — systemic repair

**[TB-500](/peptides/tb-500)** works systemically on cell migration and actin regulation. Particularly useful for overuse injuries that accumulate with high-frequency training. See the [TB-500 dosage guide](/guides/tb-500-dosage-guide).

## Summary table

| Peptide | Mechanism | Primary benefit | Evidence quality |
| --- | --- | --- | --- |
| CJC-1295 + Ipamorelin | GH/IGF-1 elevation | Recomposition, lean mass | Moderate human data |
| MK-677 | Oral GH secretagogue | Lean mass, appetite, sleep | Moderate human trials |
| GHRP-6 | GH pulse + appetite | Bulk support | Limited human data |
| BPC-157 | Localized tissue repair | Recovery, injury prevention | Mostly animal studies |
| TB-500 | Systemic cell migration | Recovery, overuse injuries | Mostly animal studies |

## Practical notes

- GH secretagogues work best injected **fasted** (before bed or upon waking).
- Cycles typically run **8–12 weeks** for secretagogues and **4–8 weeks** for recovery peptides.
- Source from vendors that publish a COA — compare options on the [vendors page](/vendors).
- Use the [dosage calculator](/calculator) and the [reconstitution guide](/guides/how-to-reconstitute-peptides) before first use.

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)
- [Browse body-composition peptides](/peptides?category=body-composition)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-are-research-peptides',
    title: 'What Are Research Peptides? A Beginner\'s Guide',
    metaTitle: 'What Are Research Peptides? Beginner\'s Guide (2026)',
    description:
      'A plain-language introduction to research peptides — what peptides are, how they are made and sold, the main categories (healing, GH, GLP-1), how they differ from drugs, and what "research use only" actually means.',
    category: 'Explainer',
    keywords: [
      'what are research peptides', 'research peptides', 'what are peptides',
      'peptide definition', 'how do peptides work', 'research peptides explained',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/science-vials.webp',
    relatedPeptides: ['bpc-157', 'ipamorelin', 'semaglutide'],
    faqs: [
      {
        q: 'What is the difference between a peptide and a protein?',
        a: 'Both are chains of amino acids. The distinction is size: peptides are typically defined as chains of 2–50 amino acids, while proteins are larger. In practice, the line is blurry, and some peptides are fragments of larger proteins.',
      },
      {
        q: 'Why are research peptides sold as powder?',
        a: 'Most peptides are not orally bioavailable — they are broken down in the digestive tract before reaching the bloodstream. Lyophilized (freeze-dried) powder is a stable storage form that must be reconstituted with bacteriostatic water and then injected (subcutaneously or intramuscularly) for research use.',
      },
      {
        q: 'Is "research use only" just a legal disclaimer?',
        a: 'Partly, but not entirely. Many peptides genuinely have limited human safety and efficacy data and are only validated in animal or cell studies. The label means the compound is not approved for clinical use and should not be self-administered. In practice, it also reflects regulatory reality: these compounds exist in a gray zone.',
      },
    ],
    content: `If you've arrived here from a fitness forum, longevity blog, or a peptide vendor's site, you've probably seen phrases like "research peptides," "research use only," or "not for human consumption." This guide explains what these terms actually mean in plain language.

> **Research and education only.** The compounds discussed here are sold for laboratory research, not for human consumption. See our [Medical Disclaimer](/medical-disclaimer).

## What is a peptide?

A **peptide** is a short chain of **amino acids** — the same building blocks that make up proteins. The difference is size: peptides are typically 2–50 amino acids long; proteins are longer. Insulin, for example, is a peptide (51 amino acids). So is the GLP-1 receptor agonist semaglutide.

Your body already produces thousands of peptides naturally as hormones, neurotransmitters, and signaling molecules.

## What is a research peptide?

A **research peptide** is a **synthetically manufactured** version of a naturally occurring peptide or a modified analog of one. They are produced in laboratory settings and sold to researchers for study in cell cultures, animal models, or clinical trials.

The term "research peptide" is also widely used to describe compounds sold in a regulatory gray zone — not approved as drugs, not sold as dietary supplements, but available from chemical supply companies for "research purposes." This is the category most people encounter on peptide vendor sites.

## Why do they come as powder?

Most peptides cannot survive digestion. When swallowed, proteases (digestive enzymes) break down the peptide bonds before the compound reaches the bloodstream — just as they do with dietary protein. To be useful in research, most peptides must be:

1. **Lyophilized** (freeze-dried into a stable powder)
2. **Reconstituted** with bacteriostatic water into a solution
3. **Injected** subcutaneously or intramuscularly to bypass digestion

Our [reconstitution guide](/guides/how-to-reconstitute-peptides) walks through this process in detail.

## The main categories

| Category | Examples | What they're studied for |
| --- | --- | --- |
| Healing / recovery | BPC-157, TB-500 | Tissue repair, inflammation |
| GH secretagogues | CJC-1295, Ipamorelin, MK-677 | Growth hormone, body recomposition |
| GLP-1 / metabolic | Semaglutide, Tirzepatide | Weight loss, blood sugar |
| Cosmetic / longevity | GHK-Cu, Epithalon | Skin remodeling, telomere research |

## What "research use only" actually means

This label has two layers:

**Regulatory:** These compounds have not been approved by the FDA (or equivalent bodies) for clinical use in humans. They are not drugs, not supplements — they occupy a regulatory gray area. The vendor cannot legally market them for human use.

**Scientific:** Many (not all) of these compounds have limited human evidence. Their mechanisms, dosing, and safety are understood from in-vitro and animal work. Human studies range from rich (semaglutide, tirzepatide) to essentially absent (many healing peptides).

The practical reality is that many people do use these compounds. This site provides research and educational context so those individuals can make informed decisions.

## How research peptides differ from pharmaceutical peptides

Some peptides are FDA-approved drugs: **[semaglutide](/peptides/semaglutide)** (Ozempic/Wegovy), **[tirzepatide](/peptides/tirzepatide)** (Mounjaro/Zepbound), **tesamorelin** (Egrifta), and others. These have passed rigorous clinical trials and are legal as prescription medications.

Research peptides like **[BPC-157](/peptides/bpc-157)**, **[TB-500](/peptides/tb-500)**, and **[Ipamorelin](/peptides/ipamorelin)** have not gone through this process and exist in the gray zone.

## How to use this site

PeptideWiki's [peptide database](/peptides) covers both categories — you can filter by category, review mechanism, clinical trial data, and dosage information, and then visit the [vendors page](/vendors) to find suppliers that publish third-party certificates of analysis (COAs).

## Related

- [How to reconstitute peptides](/guides/how-to-reconstitute-peptides)
- [Are peptides legal?](/guides/are-peptides-legal)
- [Browse the full peptide database](/peptides)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'are-peptides-legal',
    title: 'Are Peptides Legal? US Laws and Regulations Explained',
    metaTitle: 'Are Peptides Legal? US Laws Explained (2026)',
    description:
      'A clear breakdown of peptide legality in the United States — FDA-approved vs research peptides, state law, WADA sport status, and what "research use only" means legally.',
    category: 'Explainer',
    keywords: [
      'are peptides legal', 'peptide legality', 'research peptide laws', 'are research peptides legal',
      'bpc-157 legal', 'peptides legal status',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/science-vials.webp',
    relatedPeptides: ['semaglutide', 'tirzepatide', 'bpc-157'],
    faqs: [
      {
        q: 'Is it legal to buy BPC-157 in the US?',
        a: 'Yes — purchasing BPC-157 for personal research is generally legal in the US. It is not a scheduled controlled substance. However, selling it "for human consumption" or making health claims about it runs afoul of FDA regulations. The vendor\'s "research use only" label is the key legal framing.',
      },
      {
        q: 'Are GLP-1 peptides like semaglutide legal?',
        a: 'Semaglutide and tirzepatide are FDA-approved prescription drugs. They are legal to possess with a valid prescription. Purchasing compounded versions from compounding pharmacies may or may not be legal depending on FDA shortage status and state pharmacy laws.',
      },
      {
        q: 'Are peptides banned in sports?',
        a: 'Many peptides — especially GH secretagogues like CJC-1295, Ipamorelin, GHRP-2, and GHRP-6 — are on the WADA Prohibited List (S2: Peptide Hormones, Growth Factors, Related Substances and Mimetics). Athletes subject to drug testing should research WADA status before using any peptide.',
      },
    ],
    content: `The answer depends on **which peptide**, **what you are doing with it**, and **where you are**. This guide focuses on the United States.

> This is not legal advice. Laws change, enforcement is selective, and individual situations vary. Consult a legal professional for specific guidance.

## Two distinct legal categories

### 1. FDA-approved peptide drugs

Some peptides are fully approved as prescription medications:

| Peptide | Brand name(s) | Indication |
| --- | --- | --- |
| Semaglutide | Ozempic, Wegovy, Rybelsus | Diabetes, obesity |
| Tirzepatide | Mounjaro, Zepbound | Diabetes, obesity |
| Liraglutide | Victoza, Saxenda | Diabetes, obesity |
| Tesamorelin | Egrifta | HIV-associated lipodystrophy |
| Oxytocin | Pitocin | Labor induction |

These are legal to possess with a valid prescription. Purchasing without a prescription is illegal under federal law.

### 2. Research peptides — the gray zone

Peptides like **[BPC-157](/peptides/bpc-157)**, **[TB-500](/peptides/tb-500)**, **[Ipamorelin](/peptides/ipamorelin)**, and **[CJC-1295](/peptides/cjc-1295)** occupy a **regulatory gray area**:

- They are **not scheduled controlled substances** under the DEA's Controlled Substances Act (unlike anabolic steroids, which are Schedule III).
- They are **not approved drugs** — the FDA has not reviewed them for safety or efficacy in humans.
- They are **not legal dietary supplements** — they cannot be marketed in supplement form under DSHEA.
- They are sold as **research chemicals**, framed as "for research use only" and "not for human consumption."

**What this means in practice:** It is generally **not illegal to purchase or possess** these compounds in the US for personal research. The legal risk sits primarily with the seller, not the buyer, particularly if the seller makes therapeutic claims or markets them for human use.

The FDA has periodically issued **warning letters** to peptide vendors making medical claims, and has taken enforcement action against those marketing peptides as dietary supplements. But buyer-level prosecution is rare.

## Compounded peptides

A middle ground: compounding pharmacies can legally prepare **compounded versions** of some peptides if the active pharmaceutical ingredient (API) is not on the FDA's "demonstrably difficult to compound" list and there is a valid patient-specific prescription. Semaglutide compounding became widespread during the shortage period; as branded supply normalized, the FDA moved to restrict compounding.

## WADA and sport drug testing

Many peptides are explicitly prohibited in sport. The **WADA Prohibited List** (updated annually) includes:

- **S2 category:** Peptide hormones, Growth Factors, Related Substances and Mimetics — covers GH secretagogues (CJC-1295, Ipamorelin, GHRP-2, GHRP-6, MK-677), IGF-1 analogs, and more.
- **S4 category:** Hormone and Metabolic Modulators — covers some other peptide classes.

Athletes subject to testing under WADA, USADA, or sport-specific bodies should assume most non-prescription peptides are **prohibited** until confirmed otherwise.

## International perspective

Laws vary significantly:

- **UK:** Many research peptides are legal to possess but illegal to supply "for human use" under the Medicines Act.
- **Australia:** Stricter — many peptides are Schedule 4 (prescription-only) or Schedule 9 substances; possession without a prescription may be an offense.
- **Canada:** Similar gray zone to the US; Health Canada has issued warnings about unauthorized peptide marketing.

## The bottom line for US research

Purchasing research peptides like BPC-157 or Ipamorelin for personal research is generally **tolerated under current enforcement priorities** in the US — but it is not formally authorized, and the legal framework could change. FDA-approved compounds with a valid prescription are the only clearly legal path for human use.

## Related

- [What are research peptides?](/guides/what-are-research-peptides)
- [Medical Disclaimer](/medical-disclaimer)
- [Browse the full peptide database](/peptides)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-inject-peptides',
    title: 'How to Inject Peptides Subcutaneously: Step-by-Step Guide',
    metaTitle: 'How to Inject Peptides Subcutaneously (Step-by-Step)',
    description:
      'A complete guide to subcutaneous peptide injection — the supplies needed, best injection sites, step-by-step technique, how to minimize discomfort, and safe needle disposal.',
    category: 'How-To',
    keywords: [
      'how to inject peptides', 'peptide injection', 'subcutaneous peptide injection',
      'how to give peptide injection', 'subcutaneous injection guide', 'insulin syringe injection',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/inject-peptides.webp',
    relatedPeptides: ['bpc-157', 'tb-500', 'ipamorelin', 'semaglutide'],
    faqs: [
      {
        q: 'What size syringe do I use for peptide injections?',
        a: 'U-100 insulin syringes (typically 1 mL capacity with 28–31 gauge needles) are the standard for subcutaneous peptide injections. The short, thin needle is suitable for sub-q injection and makes dosing in small increments straightforward.',
      },
      {
        q: 'Where is the best place to inject peptides?',
        a: 'The abdomen (2–3 inches from the navel) is the most commonly used site for subcutaneous injections due to consistent fat coverage and easy access. The outer thigh and upper flank are common alternatives. Rotate sites to prevent buildup at any single location.',
      },
      {
        q: 'Does subcutaneous injection hurt?',
        a: 'With a sharp insulin syringe and good technique, subcutaneous injections are typically only mildly uncomfortable — a brief sting at entry. Allowing the solution to reach room temperature, injecting slowly, and rotating sites help minimize discomfort.',
      },
    ],
    content: `Most research peptides are administered by **subcutaneous (sub-q) injection** — into the fat layer just beneath the skin, not into muscle. This guide walks through everything you need, how to choose a site, and the correct technique.

> **Research use only.** This guide is educational. The compounds discussed are sold for laboratory research and are not for human consumption. See our [Medical Disclaimer](/medical-disclaimer). If you are unfamiliar with injections, consult a qualified healthcare professional.

## Before you start: reconstitute the peptide

You cannot inject lyophilized powder — it must first be dissolved in bacteriostatic water. If you have not already done this, follow the [reconstitution guide](/guides/how-to-reconstitute-peptides) and use the [dosage calculator](/calculator) to determine how many units to draw.

## Supplies you need

- Reconstituted peptide vial (refrigerated)
- **U-100 insulin syringe** — 0.5 mL or 1 mL, 28–31 gauge
- Alcohol swabs
- Sharps disposal container

## Choosing an injection site

Subcutaneous fat is found throughout the body; the most practical sites for self-injection are:

| Site | Notes |
| --- | --- |
| **Abdomen** (2–3 inches from navel) | Most consistent fat coverage; easiest to access; most popular |
| **Outer thigh** (middle third) | Good alternative; less reliable fat coverage in lean individuals |
| **Upper flank** (love handles) | Comfortable position; similar to abdomen |

**Rotate sites** — using the same spot repeatedly causes lipohypertrophy (fatty lumps that impair absorption). Keep a simple log and shift to a new area for each injection.

## Step-by-step injection technique

**1. Wash your hands** thoroughly with soap and water.

**2. Remove the peptide vial from the refrigerator** and let it sit for 5–10 minutes to reach room temperature. Cold solution stings more on injection.

**3. Swab the vial stopper** with an alcohol wipe and allow it to dry completely (~60 seconds).

**4. Draw the dose:**
- Pull back the syringe plunger to draw in air equal to your dose volume.
- Insert the needle through the stopper.
- Inject the air (prevents vacuum), then invert the vial.
- Draw the solution slowly to your measured dose, checking for bubbles.
- If bubbles appear, flick the syringe gently and push them out.

**5. Choose and prepare the injection site:**
- Select a spot in your rotation.
- Swab with an alcohol wipe and allow to dry fully (~60 seconds — wet skin stings).

**6. Inject:**
- Pinch a fold of skin and fat between thumb and index finger.
- Insert the needle at **45–90 degrees** to the skin surface. (Leaner individuals should use 45°; those with more subcutaneous fat can use 90°.)
- Release the pinch.
- Depress the plunger slowly and steadily over 3–5 seconds.
- Withdraw the needle at the same angle it entered.

**7. Post-injection:**
- Apply light pressure with a clean swab. Do not rub — this can spread the solution away from the target area.
- Cap the needle and dispose of it immediately in a **sharps container**.

## Common mistakes to avoid

- **Injecting through wet skin** (the alcohol has not dried) — stings more.
- **Injecting a cold solution** — allow the vial to warm to room temperature.
- **Using the same site repeatedly** — causes lipohypertrophy over time.
- **Rushing the draw** — air bubbles are more likely.
- **Rubbing after injection** — no benefit and disrupts absorption.

## Safe needle disposal

Never recap a used needle by hand (needle-stick risk) or dispose of syringes in standard trash. Use a puncture-resistant **sharps container**. When full, seal it and follow local guidelines for disposal (many pharmacies accept them).

## Related

- [How to reconstitute peptides](/guides/how-to-reconstitute-peptides)
- [Dosage calculator](/calculator)
- [BPC-157 dosage guide](/guides/bpc-157-dosage-guide)
- [TB-500 dosage guide](/guides/tb-500-dosage-guide)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-peptides-for-anti-aging',
    title: 'Best Peptides for Anti-Aging and Longevity (2026)',
    metaTitle: 'Best Peptides for Anti-Aging & Longevity (2026)',
    description:
      'The peptides most studied for anti-aging outcomes — Epithalon, CJC-1295 + Ipamorelin, GHK-Cu, BPC-157, and Tesamorelin — with the evidence behind each and how they are used.',
    category: 'Best Peptides',
    keywords: [
      'best peptides for anti-aging', 'anti-aging peptides', 'longevity peptides',
      'peptides for skin aging', 'peptides for longevity', 'anti-aging peptide stack',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/anti-aging.webp',
    relatedPeptides: ['cjc-1295', 'ipamorelin', 'tesamorelin', 'bpc-157'],
    faqs: [
      {
        q: 'What is the most studied peptide for anti-aging?',
        a: 'Epithalon is one of the most specifically studied peptides for aging-related mechanisms — particularly telomere length and biomarkers of aging — though human evidence is still limited. GH secretagogues (CJC-1295, Ipamorelin) have broader human data for the age-related decline in GH.',
      },
      {
        q: 'Can peptides reverse aging?',
        a: 'No peptide has been shown to "reverse" aging in humans. Some compounds show promising effects on biomarkers (telomere length, GH levels, visceral fat, skin collagen) that correlate with aging, but translating biomarker effects to meaningful longevity outcomes in people is not yet established.',
      },
      {
        q: 'Is GHK-Cu safe for skin?',
        a: 'GHK-Cu used topically in skin-care products has a strong safety profile and solid cosmetic research supporting its role in collagen synthesis and wound healing. Injectable GHK-Cu has a smaller evidence base for safety in humans.',
      },
    ],
    content: `The peptide longevity space sits at the intersection of serious geroscience research and enthusiastic biohacking — the evidence quality varies widely. This guide separates what is actually studied from what is mostly marketing.

> **Research/education only.** Most compounds here are not FDA-approved for anti-aging. Evidence quality varies from strong clinical data to mostly animal studies. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## 1. Epithalon — the telomere peptide

**Epithalon** (Epitalon) is a synthetic tetrapeptide derived from Epithalamin, a preparation from the pineal gland. It is the most specifically "anti-aging" compound in this list, studied for:

- **Telomere elongation** — in cell studies and some small human trials, Epithalon has shown telomerase-activating effects.
- **Biomarker improvements** — small Russian clinical studies report improvements in aging biomarkers, melatonin levels, and immune function.
- **Longevity** — animal studies show modest lifespan extension.

**Caveats:** Much of the human research comes from a single Russian research group with limited replication in Western trials. Treat results with appropriate skepticism.

## 2. CJC-1295 + Ipamorelin — GH restoration

Growth hormone secretion declines dramatically with age — by roughly **14–15% per decade** after young adulthood. This decline is associated with increased visceral fat, reduced lean mass, impaired sleep, and slower recovery.

**[CJC-1295](/peptides/cjc-1295) + [Ipamorelin](/peptides/ipamorelin)** are the most popular research stack for addressing this. They raise GH pulses through complementary mechanisms without significantly impacting cortisol or prolactin. See the [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide).

**Studied outcomes:** body recomposition (less fat, more lean mass), improved sleep architecture, better recovery, and general quality-of-life improvements associated with normalizing GH in older adults.

## 3. Tesamorelin — clinical evidence for visceral fat

**[Tesamorelin](/peptides/tesamorelin)** is an FDA-approved GHRH analog (Egrifta) with substantial clinical evidence for reducing **visceral adipose tissue (VAT)** — the abdominal fat that accumulates with age and is independently associated with cardiovascular and metabolic risk. Trials show VAT reductions of **13–15%** vs placebo.

It is the most clinically validated option in this list for a specific aging-related endpoint.

## 4. GHK-Cu — skin, collagen, and repair

**GHK-Cu** (copper peptide) is one of the most researched cosmetic peptides. Naturally present in human plasma, saliva, and urine, it declines with age. GHK-Cu is studied for:

- Stimulating **collagen and elastin synthesis**
- Promoting **wound healing** and skin remodeling
- **Anti-inflammatory** and antioxidant effects

Topical GHK-Cu has a strong safety record and is found in many high-end skincare formulations. Injectable GHK-Cu is also researched, with a smaller evidence base.

## 5. BPC-157 — systemic repair and gut health

While not specifically an "anti-aging" peptide, **[BPC-157](/peptides/bpc-157)** is relevant to longevity research for its systemic repair properties — gut healing, tendon/joint support, and angiogenesis. As chronic inflammation and accumulated tissue damage drive many aspects of aging, compounds that support repair are increasingly studied in longevity contexts.

## Summary

| Peptide | Primary anti-aging mechanism | Evidence quality |
| --- | --- | --- |
| Epithalon | Telomere extension | Limited human trials |
| CJC-1295 + Ipamorelin | GH restoration | Moderate human data |
| Tesamorelin | Visceral fat reduction | Strong (FDA-approved) |
| GHK-Cu | Skin collagen, wound repair | Strong (topical), limited (injectable) |
| BPC-157 | Systemic repair, gut health | Mostly animal studies |

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)
- [Browse anti-aging peptides](/peptides?category=anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'bpc-157-vs-tb-500',
    title: 'BPC-157 vs TB-500: Differences, Uses, and When to Stack',
    metaTitle: 'BPC-157 vs TB-500: Key Differences (2026)',
    description:
      'A detailed comparison of BPC-157 and TB-500 — mechanisms, evidence, best use cases, dosing differences, and why they are so often combined in the "Wolverine" stack.',
    category: 'Comparison',
    keywords: [
      'bpc-157 vs tb-500', 'bpc157 vs tb500', 'bpc-157 or tb-500',
      'difference between bpc-157 and tb-500', 'bpc 157 tb 500 comparison',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/healing-recovery.webp',
    relatedPeptides: ['bpc-157', 'tb-500'],
    faqs: [
      {
        q: 'Which is better — BPC-157 or TB-500?',
        a: 'Neither is strictly "better" — they have different mechanisms that make them suited to different situations and complementary when combined. BPC-157 tends to be favored for site-specific injury work and gut issues; TB-500 for systemic and overuse scenarios.',
      },
      {
        q: 'Can you use BPC-157 or TB-500 alone?',
        a: 'Yes — either can be used alone. BPC-157 alone is often favored for gut-related research or very specific injuries. TB-500 alone is used for systemic recovery and overuse issues. Many researchers combine both.',
      },
      {
        q: 'Do BPC-157 and TB-500 require different storage?',
        a: 'Both are stored the same way: lyophilized powder at room temperature or frozen for long-term; reconstituted solutions refrigerated (2–8°C) and used within 28–30 days.',
      },
    ],
    content: `**[BPC-157](/peptides/bpc-157)** and **[TB-500](/peptides/tb-500)** are the two most frequently discussed peptides for tissue repair. They are often treated as interchangeable, but they work differently and have different ideal use cases. This guide breaks down the comparison.

> **Research use only.** Neither is FDA-approved; human data is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## Origins

- **BPC-157** — a 15-amino-acid peptide derived from a protein found in gastric juice. Full name: Body Protection Compound-157. Discovered and extensively studied by researcher Predrag Sikirić and colleagues in Zagreb.
- **TB-500** — a synthetic fragment of **Thymosin Beta-4 (Tβ4)**, a naturally occurring 43-amino-acid protein found in all nucleated cells. TB-500 is the active fragment (amino acids 17–23) of Tβ4.

## Mechanism

| | BPC-157 | TB-500 |
| --- | --- | --- |
| Primary action | Angiogenesis, growth factor modulation | Actin sequestration, cell migration |
| Range | More **localized** near injection site | More **systemic** — distributes broadly |
| Half-life | Short (~4 hours estimated) | Longer (more sustained) |
| Key targets | Tendons, gut, muscle, brain | Muscle, connective tissue, heart |

**BPC-157** is thought to work largely by promoting the formation of new blood vessels (angiogenesis) and modulating growth factors at the local level. Proximity to the injury matters.

**TB-500** regulates the actin cytoskeleton and promotes **cell migration** — the movement of cells into damaged tissue. Its systemic distribution means it doesn't depend on injection proximity.

## Evidence base

Both are primarily supported by **animal and in-vitro studies**. Rigorous human clinical trials are lacking for both. BPC-157 has a larger body of preclinical literature across multiple tissue types; TB-500/Thymosin Beta-4 has had more investigation in cardiovascular and wound-healing clinical contexts.

## Dosing comparison

| | BPC-157 | TB-500 |
| --- | --- | --- |
| Unit | Micrograms (mcg) | Milligrams (mg) |
| Typical dose | 250–500 mcg | 2.0–2.5 mg |
| Frequency | Once or twice daily | 1–2x weekly |
| Administration | Sub-q near site or systemically | Sub-q anywhere (systemic) |

The dose unit difference is meaningful: a vial of BPC-157 (5 mg) provides **10–20 doses** at typical dosing; a 5 mg TB-500 vial provides only **2–3 doses**.

## Best use cases

**Choose BPC-157 when:**
- The injury is specific and localized (tendon, ligament)
- Gut-related research is the focus (BPC-157 has specific gastric origin and gut data)
- Localized injection near the site is practical

**Choose TB-500 when:**
- The issue is systemic or involves multiple areas simultaneously
- Overuse/widespread inflammation is the concern
- Convenient subcutaneous injection (no site targeting) is preferred

**Use both when:**
- Maximum repair signal is desired — the "Wolverine" stack
- One addresses what the other misses

## The Wolverine stack

The most common protocol for both compounds together is:

| Peptide | Dose | Frequency |
| --- | --- | --- |
| BPC-157 | 250–500 mcg | 1–2x daily |
| TB-500 | 2.0–2.5 mg | 2x weekly (loading) |

For the full combined protocol see the [BPC-157 + TB-500 Wolverine stack guide](/guides/bpc-157-tb-500-wolverine-stack).

## Related

- [BPC-157 dosage guide](/guides/bpc-157-dosage-guide)
- [TB-500 dosage guide](/guides/tb-500-dosage-guide)
- [BPC-157 + TB-500 "Wolverine" stack](/guides/bpc-157-tb-500-wolverine-stack)
- [Best peptides for healing & recovery](/guides/best-peptides-for-healing-recovery)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'semaglutide-dosage-guide',
    title: 'Semaglutide Dosage & Titration Schedule (Ozempic / Wegovy)',
    metaTitle: 'Semaglutide Dosage & Titration Schedule (2026)',
    description:
      'The complete semaglutide dosage and titration schedule — starting dose, weekly escalation steps for Ozempic and Wegovy, injection technique, missed-dose protocol, and managing side effects.',
    category: 'Dosage',
    keywords: [
      'semaglutide dosage', 'ozempic dosage', 'wegovy dosage', 'semaglutide titration',
      'semaglutide dose schedule', 'how much semaglutide',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/weight-loss.webp',
    relatedPeptides: ['semaglutide', 'tirzepatide'],
    faqs: [
      {
        q: 'What is the starting dose of semaglutide?',
        a: 'The standard starting dose is 0.25 mg once weekly for the first four weeks. This is a tolerability dose, not a therapeutic dose — it is intended to let the body adjust before escalating.',
      },
      {
        q: 'How long does it take to reach the full semaglutide dose?',
        a: 'The standard Wegovy (obesity) titration reaches the 2.4 mg maintenance dose in approximately 16 weeks, assuming each escalation step is tolerated. Individual titration may be slower if side effects require staying at a lower dose longer.',
      },
      {
        q: 'What happens if I miss a semaglutide dose?',
        a: 'If fewer than 5 days have passed since the missed dose, take it as soon as possible. If more than 5 days have passed, skip the missed dose and resume on your regular schedule. Do not double-dose.',
      },
    ],
    content: `**Semaglutide** is a once-weekly GLP-1 receptor agonist available as **Ozempic** (approved for type 2 diabetes) and **Wegovy** (approved for chronic weight management). Both use a slow titration schedule to minimize gastrointestinal side effects.

> **Prescription medication.** Semaglutide is an FDA-approved drug requiring a valid prescription. This guide summarizes the prescribing information for educational purposes — it is not medical advice. See our [Medical Disclaimer](/medical-disclaimer) and consult your prescribing physician.

## Standard titration schedules

### Wegovy (obesity/weight management) — up to 2.4 mg

| Weeks | Dose | Notes |
| --- | --- | --- |
| 1–4 | **0.25 mg** weekly | Tolerability phase — not therapeutic |
| 5–8 | **0.5 mg** weekly | |
| 9–12 | **1.0 mg** weekly | |
| 13–16 | **1.7 mg** weekly | |
| 17+ | **2.4 mg** weekly | Maintenance |

### Ozempic (type 2 diabetes) — up to 2.0 mg

| Weeks | Dose | Notes |
| --- | --- | --- |
| 1–4 | **0.25 mg** weekly | Tolerability phase |
| 5+ | **0.5 mg** weekly | May remain here if effective |
| After ≥4 weeks at 0.5 mg | **1.0 mg** weekly | If additional control needed |
| After ≥4 weeks at 1.0 mg | **2.0 mg** weekly | Maximum dose |

## Slowing the titration

Titration steps are guidelines, not mandates. If nausea, vomiting, or other GI effects are poorly tolerated at a new dose level, **stay at the current dose for another 4 weeks** before attempting the next step. The goal is reaching a dose you can sustain — not the highest possible dose on the fastest schedule.

## Administration

- Inject **subcutaneously** once weekly on the same day each week.
- Sites: abdomen (preferred), upper thigh, or upper arm.
- Rotate sites to prevent lipohypertrophy.
- Time of day does not matter significantly.
- Semaglutide pens are pre-filled auto-injectors — needle insertion is automatic.

For general subcutaneous injection technique, see [How to Inject Peptides](/guides/how-to-inject-peptides).

## Managing side effects

Gastrointestinal effects (nausea, vomiting, diarrhea, constipation) are the most common and the main reason people discontinue. Strategies that help:

- Eat **small, frequent meals** rather than large ones.
- Avoid **high-fat, spicy, or rich foods** during dose escalation weeks.
- **Slow the titration** — there is no clinical requirement to escalate on schedule.
- Stay well hydrated.

## Missed dose

- **Within 5 days of the missed dose:** Take it as soon as possible and resume the regular weekly schedule.
- **More than 5 days:** Skip the missed dose. Resume on the original schedule the following week.

## How it compares to tirzepatide

See the head-to-head [Semaglutide vs Tirzepatide guide](/guides/semaglutide-vs-tirzepatide), or compare both compounds interactively with the [comparison tool](/compare).

## Related

- [Semaglutide full profile](/peptides/semaglutide)
- [Tirzepatide dosage guide](/guides/tirzepatide-dosage-guide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'tirzepatide-dosage-guide',
    title: 'Tirzepatide Dosage & Titration Schedule (Mounjaro / Zepbound)',
    metaTitle: 'Tirzepatide Dosage & Titration Schedule (2026)',
    description:
      'The complete tirzepatide dosage and titration schedule — starting dose, escalation steps for Mounjaro and Zepbound, typical maintenance doses, injection technique, and side-effect management.',
    category: 'Dosage',
    keywords: [
      'tirzepatide dosage', 'mounjaro dosage', 'zepbound dosage', 'tirzepatide titration',
      'tirzepatide dose schedule', 'how much tirzepatide',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/weight-loss.webp',
    relatedPeptides: ['tirzepatide', 'semaglutide'],
    faqs: [
      {
        q: 'What is the starting dose of tirzepatide?',
        a: 'The standard starting dose is 2.5 mg once weekly for the first four weeks. Like semaglutide, this is a tolerability dose — the intent is gradual adjustment, not immediate therapeutic effect.',
      },
      {
        q: 'What is the maximum tirzepatide dose?',
        a: 'The maximum approved dose is 15 mg once weekly. In clinical trials, doses of 5–15 mg/week were studied; the highest dose (15 mg) produced the greatest average weight loss (~22.5% in SURMOUNT-1).',
      },
      {
        q: 'Does tirzepatide have the same side effects as semaglutide?',
        a: 'Both share the GLP-1 class GI side effects (nausea, diarrhea, constipation) and the same boxed warning (thyroid C-cell tumors in rodents). Some comparative data suggests tirzepatide users report somewhat fewer GI events overall, though individual responses vary widely.',
      },
    ],
    content: `**Tirzepatide** is a once-weekly **dual GIP/GLP-1 receptor agonist** available as **Mounjaro** (type 2 diabetes) and **Zepbound** (chronic weight management). Its dual mechanism distinguishes it from semaglutide and has produced the largest average weight loss in any approved obesity drug trial to date.

> **Prescription medication.** Tirzepatide is an FDA-approved drug requiring a valid prescription. This summarizes the prescribing information for educational purposes — not medical advice. See our [Medical Disclaimer](/medical-disclaimer) and your prescribing physician.

## Standard titration schedule

Tirzepatide uses **2.5 mg escalation steps** every four weeks (slower per-step than semaglutide):

| Weeks | Dose | Notes |
| --- | --- | --- |
| 1–4 | **2.5 mg** weekly | Tolerability phase |
| 5–8 | **5.0 mg** weekly | Therapeutic range begins |
| 9–12 | **7.5 mg** weekly | Optional — continue if needed |
| 13–16 | **10 mg** weekly | Optional |
| 17–20 | **12.5 mg** weekly | Optional |
| 21+ | **15 mg** weekly | Maximum dose |

Many patients reach their weight-loss goals at **5–10 mg/week** and do not need to escalate further. The maintenance dose is individualized.

## Diabetes vs obesity formulations

Both Mounjaro and Zepbound use the same molecule and the same titration steps. The key difference is approved indication and available pen strengths. Zepbound pens are available in 2.5, 5, 7.5, 10, 12.5, and 15 mg doses; Mounjaro in 2.5, 5, 7.5, 10, 12.5, and 15 mg.

## Slowing the titration

If GI side effects are significant at a new dose, **stay at the current dose for another 4 weeks** before escalating. There is no clinical requirement to follow the fastest titration schedule. Tolerability at a given dose is more important than speed.

## Administration

- Inject **subcutaneously** once weekly on the same day each week.
- Sites: abdomen, upper thigh, or upper arm.
- Tirzepatide also uses a pre-filled auto-injector pen.
- Rotate injection sites to prevent buildup at any single location.

For injection technique, see [How to Inject Peptides](/guides/how-to-inject-peptides).

## Managing side effects

The GI profile is similar to semaglutide:

- Nausea and decreased appetite are most prominent during the first weeks at a new dose level.
- Most people find that effects diminish after 2–4 weeks at any stable dose.
- Small, low-fat meals; adequate hydration; and slower titration all help.

## How it compares to semaglutide

In both the SURMOUNT-1 trial (~22.5% average weight loss at 15 mg) and real-world comparative data, tirzepatide has outperformed semaglutide. See the [Semaglutide vs Tirzepatide comparison](/guides/semaglutide-vs-tirzepatide).

## Related

- [Tirzepatide full profile](/peptides/tirzepatide)
- [Semaglutide dosage guide](/guides/semaglutide-dosage-guide)
- [Semaglutide vs Tirzepatide](/guides/semaglutide-vs-tirzepatide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'mk-677-dosage-guide',
    title: 'MK-677 (Ibutamoren) Dosage Guide',
    metaTitle: 'MK-677 Dosage Guide: Protocol & Cycle (2026)',
    description:
      'A research-based MK-677 (Ibutamoren) dosage guide — typical oral doses, timing, cycle structure, what makes it unique among GH secretagogues, and key side effects to know.',
    category: 'Dosage',
    keywords: [
      'mk-677 dosage', 'ibutamoren dosage', 'mk677 protocol', 'mk-677 cycle',
      'mk-677 dose', 'ibutamoren dose',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295'],
    faqs: [
      {
        q: 'What is a typical MK-677 dose?',
        a: 'Most reported research protocols use 10–25 mg per day taken orally. 25 mg/day is the most common dose cited in both clinical studies and the research community. Some protocols start at 10 mg to assess tolerance before escalating.',
      },
      {
        q: 'When should MK-677 be taken?',
        a: 'Most researchers take MK-677 before sleep, since growth hormone is primarily released during deep sleep phases. Taking it at night also allows the increased appetite (a common side effect) to occur during sleeping hours when it is less disruptive.',
      },
      {
        q: 'Is MK-677 a peptide?',
        a: 'Technically, no. MK-677 (Ibutamoren) is a non-peptide small molecule that acts as a ghrelin receptor agonist — it activates the same receptor as peptide GHRPs like Ipamorelin. Its key distinction is oral bioavailability, unlike injectable peptide secretagogues.',
      },
    ],
    content: `**MK-677 (Ibutamoren)** is a non-peptide growth hormone secretagogue that mimics ghrelin and stimulates GH and IGF-1 release. Its key advantage over injectable peptide secretagogues is that it is **orally bioavailable** — no reconstitution or injection required.

> **Research use only.** MK-677 is not FDA-approved. It is sold as a research chemical. Human clinical data exists but is limited, and long-term safety is not well established. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## What makes MK-677 different

MK-677 activates the **ghrelin receptor** (the same target as injectable GHRPs like Ipamorelin) and stimulates the pituitary to release GH in pulses. Unlike peptide GHRPs:

- It is **taken orally** — no injection needed
- It has a **longer half-life** (~24 hours), producing more sustained GH elevation rather than discrete pulses
- It **significantly increases appetite** (the ghrelin receptor is also the hunger receptor)

This sustained GH elevation profile is distinct from the pulse-based secretagogues like CJC-1295 + Ipamorelin.

## Typical research dosage

| Dose | Notes |
| --- | --- |
| 10 mg/day | Conservative starting point; lower appetite stimulation |
| 25 mg/day | Most commonly reported dose in research protocols and clinical studies |

The landmark Phase II clinical trial (Nass et al., 2008) used **25 mg/day for 2 years** in older adults and showed significant IGF-1 elevation alongside improvements in lean body mass.

## Timing

**Before sleep** is the most common timing for two reasons:
1. GH is primarily released during deep sleep (stages 3–4). Taking MK-677 at night may synergize with this natural pattern.
2. The appetite stimulation — often significant — occurs during sleeping hours when it is less disruptive.

Some researchers split the dose (morning and evening) or take it in the morning; sleep timing is the most evidence-consistent approach.

## Cycle structure

| Approach | Duration | Notes |
| --- | --- | --- |
| Standard cycle | 8–16 weeks + break | Avoids prolonged insulin sensitivity effects |
| Extended / continuous | 6–12 months | Used in some longevity protocols; IGF-1 monitoring recommended |

Unlike most injectable peptides, MK-677 is sometimes used in longer continuous protocols because of its oral convenience. However, monitoring IGF-1 levels and fasting glucose is advisable on extended protocols.

## Key side effects

- **Increased appetite** — often significant; useful in a deliberate bulk, inconvenient otherwise
- **Water retention** — common in the first few weeks; usually diminishes
- **Elevated fasting glucose / reduced insulin sensitivity** — particularly relevant for those with pre-diabetic risk; monitor blood glucose on longer cycles
- **Increased fatigue / lethargy** — particularly at higher doses; taking it before sleep largely mitigates this
- **Carpal tunnel-like symptoms** — reported at higher GH levels; usually resolves on dose reduction

## Stacking

MK-677 is commonly combined with injectable CJC-1295 or Ipamorelin for enhanced GH output, though the appetite side effects compound. It is also frequently stacked with SARMs in recomposition protocols (research context only).

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)
- [Best peptides for anti-aging](/guides/best-peptides-for-anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-peptides-for-skin-hair',
    title: 'Best Peptides for Skin and Hair (2026)',
    metaTitle: 'Best Peptides for Skin & Hair (2026): Research Guide',
    description:
      'The peptides most studied for skin health and hair growth — GHK-Cu (collagen, wrinkles), BPC-157 (wound healing), TB-500 (hair follicles), and GH secretagogues — with the evidence behind each.',
    category: 'Best Peptides',
    keywords: [
      'best peptides for skin', 'peptides for hair growth', 'skin peptides',
      'peptides for wrinkles', 'ghk-cu skin', 'peptides collagen',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/skin-hair.webp',
    relatedPeptides: ['bpc-157'],
    faqs: [
      {
        q: 'What is the best peptide for skin anti-aging?',
        a: 'GHK-Cu (copper peptide) has the strongest and broadest evidence for skin-related anti-aging outcomes — including collagen synthesis, skin remodeling, wound healing, and antioxidant effects. It is well-studied both topically and in injectable research contexts.',
      },
      {
        q: 'Do peptides actually work for hair growth?',
        a: 'GHK-Cu has the best evidence — multiple studies show it can stimulate hair follicle size and proliferation and reduce hair loss. Thymosin Beta-4 (the full molecule, not TB-500 fragment) also has documented hair follicle activation effects in research. Evidence is stronger than for most supplement-category "hair peptides."',
      },
      {
        q: 'Can peptides be used topically for skin?',
        a: 'Yes — topical peptides are a legitimate and well-researched cosmetic category. GHK-Cu, Matrixyl (Palmitoyl Pentapeptide), Argireline (SNAP-8), and others are used in skincare products. Topical delivery is generally more accessible and lower-risk than injectable research peptides.',
      },
    ],
    content: `Peptides in the skin and hair space span two distinct worlds: **cosmetic-grade topical peptides** (well-studied, widely used in skincare) and **injectable research peptides** (more potent in theory, but less evidence and more risk). This guide covers both.

> **Research/education only.** Injectable peptides are research compounds, not approved cosmetic or medical treatments. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## 1. GHK-Cu — the gold standard skin peptide

**GHK-Cu** (copper tripeptide-1) is by far the most researched peptide for skin and hair. It occurs naturally in human plasma, saliva, and urine, and declines significantly with age.

**Skin evidence:**
- Stimulates **collagen and elastin synthesis** — the two structural proteins that determine skin firmness and elasticity
- Promotes **wound healing** and skin remodeling; has been used in post-procedure skincare
- **Antioxidant** and anti-inflammatory properties reduce oxidative skin damage
- Reduces **fine lines and wrinkles** in multiple controlled cosmetic studies
- Tightens loose skin and improves overall skin density

**Hair evidence:**
- Stimulates **hair follicle proliferation** and increases follicle size
- Shown to reduce hair loss in some studies
- Compared favorably to minoxidil in at least one pilot study

GHK-Cu is available in **topical formulations** (serums, creams) — well-validated and accessible. It is also available as an injectable research peptide for those pursuing more intensive protocols.

## 2. BPC-157 — skin repair and wound healing

**[BPC-157](/peptides/bpc-157)** is primarily studied for musculoskeletal and gut healing, but its angiogenic and tissue-repair effects extend to skin. In wound-healing research, BPC-157 has accelerated skin closure and improved cosmetic outcomes in animal models. It is sometimes used in injectable protocols for scar tissue and wound recovery support.

## 3. TB-500 / Thymosin Beta-4 — hair follicle activation

**Thymosin Beta-4** (the full molecule, precursor to TB-500) has documented effects on hair follicle stem cell activation. The landmark research by Philpott and colleagues showed Thymosin Beta-4 could activate quiescent follicles and promote hair growth. TB-500 (the active fragment) is thought to share some of these properties, though direct hair-growth evidence for the fragment specifically is more limited.

## 4. GH secretagogues — systemic skin quality

**[CJC-1295](/peptides/cjc-1295) + [Ipamorelin](/peptides/ipamorelin)** and other GH-raising compounds improve skin quality as a systemic effect of elevated GH and IGF-1. Growth hormone plays a documented role in skin thickness, collagen content, and overall skin health. This is a secondary benefit of GH secretagogues rather than a targeted skin treatment.

## 5. Topical peptides (cosmetic category)

For those not pursuing injectable research peptides, the cosmetic topical peptide category has solid evidence:

| Peptide | Mechanism | Evidence |
| --- | --- | --- |
| GHK-Cu (copper peptide) | Collagen, wound repair | Strong |
| Matrixyl (Palmitoyl Pentapeptide) | Collagen signaling | Good |
| Argireline / SNAP-8 | Neuromuscular relaxation | Moderate |
| Syn-Ake | Snake-venom mimetic, relaxes muscle | Moderate |

Topical peptides are typically far safer than injectables for cosmetic use — they are well-formulated, regulated as cosmetics, and have substantial clinical-study backing.

## Summary

| Goal | Best option(s) |
| --- | --- |
| Collagen / anti-wrinkle | GHK-Cu (topical first; injectable for deeper research) |
| Hair growth | GHK-Cu, Thymosin Beta-4 |
| Wound / scar healing | BPC-157, GHK-Cu |
| Overall skin quality | GH secretagogues (systemic) |

## Related

- [Best peptides for anti-aging](/guides/best-peptides-for-anti-aging)
- [Browse anti-aging peptides](/peptides?category=anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'cjc-1295-ipamorelin-gh-stack',
    title: 'CJC-1295 + Ipamorelin Growth Hormone Stack Guide',
    metaTitle: 'CJC-1295 + Ipamorelin GH Stack: Full Protocol (2026)',
    description:
      'A complete protocol guide for the CJC-1295 + Ipamorelin growth hormone stack — dose, timing, cycle length, DAC vs non-DAC, what to expect, and how to add recovery peptides.',
    category: 'Stacks',
    keywords: [
      'cjc-1295 ipamorelin stack', 'gh peptide stack', 'growth hormone peptide stack',
      'cjc ipamorelin protocol', 'cjc 1295 ipamorelin dosage',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/muscle-growth.webp',
    relatedPeptides: ['cjc-1295', 'ipamorelin'],
    faqs: [
      {
        q: 'Why are CJC-1295 and Ipamorelin always stacked together?',
        a: 'CJC-1295 (GHRH analog) and Ipamorelin (GHRP) act on different receptors in the GH axis. Used together, they produce a significantly stronger GH pulse than either alone — roughly synergistic rather than merely additive. This is why they are almost never used solo in research protocols.',
      },
      {
        q: 'What results can be expected from a CJC-1295 + Ipamorelin stack?',
        a: 'Most researchers report gradual improvements over 8–12 weeks: better sleep quality and deeper sleep (often noticed first), improved recovery between training sessions, subtle body recomposition (slight fat reduction, lean mass support), and improved skin and hair quality. Effects are gradual and subtle compared with anabolic steroids.',
      },
      {
        q: 'How long before bed should I inject for sleep benefits?',
        a: 'Most protocols call for injection 30–60 minutes before sleep, in a fasted state (at least 2 hours after eating). This timing aligns the artificially elevated GH pulse with the natural GH surge that occurs during early deep sleep.',
      },
    ],
    content: `The **CJC-1295 + Ipamorelin** stack is the most popular and well-structured growth hormone secretagogue protocol. This guide covers the full protocol: which form of each peptide to use, how much, when, what to expect, and how to enhance it.

> **Research use only.** Neither CJC-1295 nor Ipamorelin is FDA-approved. Human data exists but is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## Why this combination works

The GH axis has two primary stimulatory inputs:

- **GHRH** (growth hormone-releasing hormone) — released by the hypothalamus to tell the pituitary to release GH
- **Ghrelin** — acts via a separate receptor to amplify GH release

**CJC-1295** mimics GHRH. **Ipamorelin** mimics ghrelin. Together they activate both inputs simultaneously, producing a GH pulse that is **significantly larger** than either peptide alone. Ipamorelin is particularly valued because it is highly selective — it stimulates GH with minimal effect on cortisol or prolactin (unlike older GHRPs such as GHRP-2 or GHRP-6).

## Choosing the right form of CJC-1295

This decision shapes the entire protocol:

| Form | Half-life | Dosing | Notes |
| --- | --- | --- | --- |
| CJC-1295 **without DAC** (Mod-GRF 1-29) | ~30 min | Multiple times daily, co-injected with Ipamorelin | Timed pulses; most common for recomposition |
| CJC-1295 **with DAC** | ~6–8 days | Once or twice weekly | Continuous background GH elevation; not co-timed |

Most recomposition and recovery protocols use **CJC-1295 without DAC** (Mod-GRF 1-29) to achieve timed GH pulses aligned with training and sleep.

## Full protocol

### Standard protocol (CJC-1295 without DAC + Ipamorelin)

| Peptide | Dose | Frequency | Timing |
| --- | --- | --- | --- |
| CJC-1295 without DAC | 100–200 mcg | 2–3x daily | Co-inject with Ipamorelin |
| Ipamorelin | 200–300 mcg | 2–3x daily | Co-inject with CJC-1295 |

**Best injection windows (fasted state only):**
1. **Before sleep** — most important; aligns with natural GH release
2. **Upon waking** — fasted morning pulse
3. **Pre-training** — 30–45 min before exercise (fasted)

Both peptides can be drawn into the same insulin syringe for a single injection once each is reconstituted from its own vial.

### Cycle length

| Phase | Duration | Notes |
| --- | --- | --- |
| Initial cycle | 8–12 weeks | First cycle; assess response |
| Break | 4 weeks | Allows receptor sensitivity to normalize |
| Subsequent cycles | 12–16 weeks | Can extend with experience |

Some long-term protocols run 6 months on / 6 weeks off or use lower maintenance doses between cycles.

## What to expect (week by week)

- **Weeks 1–2:** Improved sleep quality is often the first noticeable effect — deeper sleep, more vivid dreams. Some water retention is common early on.
- **Weeks 3–6:** Recovery between training sessions improves. Some report a slight increase in hunger.
- **Weeks 6–12:** Gradual body recomposition — subtle reduction in subcutaneous fat, improved muscle fullness. Skin and hair quality often improve. Effects are cumulative, not dramatic.

Manage expectations: this is **not a fast-acting bulking protocol**. The effects are real but gradual and subtle.

## Adding recovery peptides

For athletes with active injuries or high training volumes, the CJC-1295 + Ipamorelin stack pairs well with recovery peptides:

- Add **[BPC-157](/peptides/bpc-157)** (250–500 mcg/day) for specific tissue repair
- Add **[TB-500](/peptides/tb-500)** (2 mg twice weekly during loading) for systemic recovery

See the [BPC-157 + TB-500 Wolverine stack guide](/guides/bpc-157-tb-500-wolverine-stack) for the full combined protocol.

## Reconstitution and dosing math

Both peptides are reconstituted separately in bacteriostatic water. Use the [reconstitution guide](/guides/how-to-reconstitute-peptides) for the process and the [dosage calculator](/calculator) to convert mcg to insulin-syringe units.

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)
- [Best peptides for anti-aging](/guides/best-peptides-for-anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'ipamorelin-vs-sermorelin-vs-cjc-1295',
    title: 'Ipamorelin vs Sermorelin vs CJC-1295: Which GH Peptide Is Best?',
    metaTitle: 'Ipamorelin vs Sermorelin vs CJC-1295 (2026)',
    description:
      'A three-way comparison of Ipamorelin, Sermorelin, and CJC-1295 — mechanisms, half-lives, dosing schedules, selectivity profiles, and which to choose for different research goals.',
    category: 'Comparison',
    keywords: [
      'ipamorelin vs sermorelin', 'sermorelin vs cjc-1295', 'ipamorelin vs cjc-1295',
      'best gh peptide', 'sermorelin vs ipamorelin', 'growth hormone peptide comparison',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295'],
    faqs: [
      {
        q: 'What is the difference between Sermorelin and CJC-1295?',
        a: 'Both are GHRH analogs (they mimic the same hormone), but CJC-1295 (specifically the without-DAC form, Mod-GRF 1-29) is more potent and has a slightly longer half-life than Sermorelin. CJC-1295 with DAC extends half-life dramatically to ~6–8 days through albumin binding.',
      },
      {
        q: 'Is Ipamorelin better than Sermorelin?',
        a: 'They work via different receptors, so the comparison is not direct. Ipamorelin (a GHRP) stimulates GH via the ghrelin receptor; Sermorelin (a GHRH analog) works via the GHRH receptor. They are more useful combined than compared, since pairing a GHRP with a GHRH analog produces a stronger GH pulse than either alone.',
      },
      {
        q: 'Which GH peptide is most selective (fewest side effects)?',
        a: 'Ipamorelin is considered the most selective GHRP — it stimulates GH release with minimal effect on cortisol, prolactin, or ACTH, unlike older GHRPs (GHRP-2, GHRP-6) which activate multiple hormones. Among GHRH analogs, Sermorelin and Mod-GRF 1-29 are both fairly selective.',
      },
    ],
    content: `Three peptides dominate the growth-hormone secretagogue discussion: **Sermorelin**, **CJC-1295**, and **Ipamorelin**. Understanding how they differ — and why they are paired — clarifies both the research literature and practical protocol design.

> **Research use only.** None of these compounds is FDA-approved for general GH enhancement; Sermorelin is approved only for pediatric GH deficiency. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## The fundamental split: GHRH vs GHRP

These three peptides belong to **two different classes**:

- **Sermorelin** and **CJC-1295** are **GHRH analogs** — they mimic growth hormone-releasing hormone, acting on the GHRH receptor in the pituitary to stimulate GH release.
- **Ipamorelin** is a **GHRP** (growth hormone releasing peptide) — it acts on the ghrelin receptor (GHS-R1a), a completely different receptor.

Because they work through different mechanisms, **combining a GHRH analog with a GHRP produces synergistic GH release** — roughly 3–5x the GH output of either alone. This is why Ipamorelin is almost always paired with CJC-1295 rather than compared against it.

## Sermorelin vs CJC-1295 (within the GHRH class)

| | Sermorelin | CJC-1295 without DAC (Mod-GRF 1-29) | CJC-1295 with DAC |
| --- | --- | --- | --- |
| Type | GHRH analog | GHRH analog | GHRH analog |
| Amino acids | 29 | 29 (modified) | 29 + DAC complex |
| Half-life | ~10–12 min | ~25–30 min | ~6–8 days |
| Dosing | 2–3x daily | 2–3x daily | Once or twice weekly |
| Relative potency | Baseline | Higher than Sermorelin | Sustained elevation |
| Notes | First-generation; FDA-approved for pediatric GHD | Most popular GHRH in research protocols | Produces continuous (non-pulsatile) GH elevation |

**Sermorelin** was the first approved peptide in this class and remains available as a prescription drug for pediatric growth hormone deficiency. Its short half-life and relatively lower potency mean it has largely been superseded by Mod-GRF 1-29 in research protocols.

**CJC-1295 without DAC (Mod-GRF 1-29)** is the preferred GHRH analog in most modern research stacks. It is more potent than Sermorelin, has a slightly longer half-life enabling more practical dosing, and produces cleaner pulsatile GH output when co-dosed with Ipamorelin.

**CJC-1295 with DAC** produces a different physiological pattern — a sustained, blunted GH elevation rather than discrete pulses. Some researchers prefer this for simplicity (once-weekly dosing). The tradeoff is loss of the pulsatile GH pattern that may be important for some effects.

## Ipamorelin in context

**Ipamorelin** stands out among GHRPs for its **selectivity**: it stimulates GH release without meaningfully raising cortisol, prolactin, or ACTH — a significant advantage over older GHRPs like GHRP-2 (which raises cortisol) and GHRP-6 (which raises cortisol and causes pronounced hunger).

| GHRP | GH release | Cortisol | Hunger | Prolactin |
| --- | --- | --- | --- | --- |
| GHRP-2 | Strong | Elevated | Moderate | Elevated |
| GHRP-6 | Strong | Moderate | Significant | Moderate |
| **Ipamorelin** | Strong | Minimal | Minimal | Minimal |

This selectivity is why Ipamorelin has become the GHRP of choice for most researchers.

## Which to choose

| Goal | Recommended approach |
| --- | --- |
| Pulsatile GH with minimal sides | CJC-1295 without DAC + Ipamorelin |
| Simpler weekly dosing | CJC-1295 with DAC (weekly) + Ipamorelin 2x daily |
| First-generation / clinic access | Sermorelin + Ipamorelin |
| GHRH only, no GHRP | Mod-GRF 1-29 alone (less effective than stack) |

**The standard recommendation for research:** CJC-1295 without DAC (Mod-GRF 1-29) + Ipamorelin, injected 2–3x daily fasted. See the [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide) and the [GH stack protocol](/guides/cjc-1295-ipamorelin-gh-stack).

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [CJC-1295 + Ipamorelin GH stack guide](/guides/cjc-1295-ipamorelin-gh-stack)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'peptide-side-effects',
    title: 'Peptide Side Effects: What the Research Shows',
    metaTitle: 'Peptide Side Effects: What Research Shows (2026)',
    description:
      'An evidence-based overview of peptide side effects by class — GLP-1 agonists, GH secretagogues, healing peptides — plus universal risks and how to minimize them.',
    category: 'Explainer',
    keywords: [
      'peptide side effects', 'research peptide side effects', 'bpc-157 side effects',
      'semaglutide side effects', 'peptide risks', 'growth hormone peptide side effects',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/safety.webp',
    relatedPeptides: ['bpc-157', 'semaglutide', 'ipamorelin'],
    faqs: [
      {
        q: 'What are the most common peptide side effects?',
        a: 'Side effects vary significantly by peptide class. GLP-1 agonists (semaglutide, tirzepatide) most commonly cause nausea, diarrhea, and constipation. GH secretagogues can cause water retention, increased hunger, and at high doses, carpal tunnel symptoms. Healing peptides like BPC-157 have a generally mild profile in animal studies, but human safety data is limited.',
      },
      {
        q: 'Are research peptides dangerous?',
        a: 'The risk profile varies enormously by compound and source quality. FDA-approved peptide drugs have well-documented safety profiles from clinical trials. Unapproved research peptides carry additional risks from unknown purity, contamination, and limited human safety data. Sourcing from vendors with third-party COAs is critical.',
      },
      {
        q: 'How do I minimize peptide side effects?',
        a: 'Start at the lowest reported dose and titrate slowly. Source only from COA-verified vendors. Never exceed established research protocol ranges. Monitor for unexpected effects and discontinue if they occur. For GLP-1 agonists, follow the slow titration schedule and adjust diet.',
      },
    ],
    content: `Side effects vary enormously across the peptide universe — an FDA-approved GLP-1 drug, a research GHRP, and an unapproved healing peptide have very different risk profiles. This guide organizes what is known by compound class.

> **Research/education only.** This is not medical advice and should not substitute for physician oversight. See our [Medical Disclaimer](/medical-disclaimer).

## Universal risks (all research peptides)

Before class-specific effects, these risks apply to **all** unapproved research peptides regardless of compound:

- **Injection-site reactions** — redness, swelling, or bruising at the injection site. Usually minor; proper technique and site rotation minimize these.
- **Contamination risk** — research peptides are not manufactured to pharmaceutical GMP standards unless explicitly noted. Bacterial endotoxins, incorrect peptide sequences, or inaccurate concentrations are possible from low-quality sources. **Third-party COA verification is essential.**
- **Unknown long-term effects** — for most unapproved peptides, human safety data beyond short-term use is essentially absent.
- **Drug interactions** — limited data exists on how research peptides interact with medications.

## GLP-1 agonists (Semaglutide, Tirzepatide, Liraglutide)

These are the best-characterized class due to extensive Phase III clinical trials. Side effects are well-documented.

**Common (>10% of patients):**
- **Nausea** — most common; typically worst during dose escalation, diminishes at stable doses
- **Diarrhea** and **constipation** — often alternating
- **Vomiting** — less common than nausea but related
- **Decreased appetite** — intended effect but can become problematic

**Less common but important:**
- **Injection-site reactions** — generally mild
- **Headache, fatigue** — often early in treatment

**Class boxed warnings (FDA):**
- **Thyroid C-cell tumors** — observed in rodents at high doses; causality in humans not established; contraindicated with personal or family history of medullary thyroid cancer or MEN2
- **Pancreatitis** — rare but reported; discontinue if symptoms arise
- **Diabetic retinopathy** — reported in some semaglutide trials in patients with pre-existing retinopathy

**How to minimize:** Slow titration (see [Semaglutide](/guides/semaglutide-dosage-guide) and [Tirzepatide](/guides/tirzepatide-dosage-guide) dosage guides), small low-fat meals, adequate hydration.

## GH secretagogues (CJC-1295, Ipamorelin, MK-677, Sermorelin)

**Ipamorelin** is the most selective GHRP and has the mildest side-effect profile of the class — minimal cortisol or prolactin elevation.

**Common across the class:**
- **Water retention** — particularly in the first few weeks; typically resolves
- **Increased appetite** — especially with MK-677 and less-selective GHRPs (GHRP-6)
- **Headache** — transient; often early on

**At higher doses or with extended use:**
- **Carpal tunnel-like symptoms** — paresthesia in hands/wrists; associated with high GH levels; resolves with dose reduction
- **Elevated fasting glucose / reduced insulin sensitivity** — particularly with MK-677 on extended cycles; monitor glucose
- **Fatigue or lethargy** — especially with MK-677 if not timed before sleep

**How to minimize:** Use Ipamorelin over less-selective GHRPs; inject fasted; stay within reported protocol ranges; monitor IGF-1 and fasting glucose on longer cycles.

## Healing peptides (BPC-157, TB-500)

This class has the **least human safety data** — most evidence comes from animal studies.

**BPC-157:**
- Generally well-tolerated in animal studies at research doses
- No serious adverse events documented in the limited human data available
- The main risk is the **unknown** — long-term human safety is simply uncharacterized
- Nausea has been reported anecdotally, particularly with oral forms

**TB-500:**
- Similarly limited human data; generally mild in animal studies
- Injection-site reactions (transient redness/swelling) are the most commonly reported issue
- Potential concern: Thymosin Beta-4 class compounds may theoretically affect inflammation in ways that could interact with autoimmune conditions

**How to minimize:** Start at the lower end of reported ranges; use COA-verified sources; cycle rather than continuous use.

## Sourcing and quality — the most underrated risk factor

For unapproved research peptides, **the quality of the source may matter more than the compound itself**. Issues with low-quality sources include:

- **Incorrect purity** — the vial may contain less (or more) than labeled
- **Wrong peptide sequence** — particularly common for complex peptides
- **Bacterial contamination** — endotoxins causing fever, chills, or worse
- **Non-sterile preparation** — infection risk

Always source from vendors that publish **third-party certificates of analysis (COA)** from independent labs. Compare vetted vendors on our [vendors page](/vendors).

## Related

- [What are research peptides?](/guides/what-are-research-peptides)
- [Are peptides legal?](/guides/are-peptides-legal)
- [Compare vetted vendors](/vendors)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-store-peptides',
    title: 'How to Store Peptides: Lyophilized and Reconstituted',
    metaTitle: 'How to Store Peptides: Complete Storage Guide (2026)',
    description:
      'A complete peptide storage guide — how to store lyophilized powder vs reconstituted solution, temperature requirements, shelf life, travel considerations, and signs of degradation.',
    category: 'How-To',
    keywords: [
      'how to store peptides', 'peptide storage', 'reconstituted peptide storage',
      'peptide shelf life', 'storing peptides', 'how long do peptides last',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/storage.webp',
    relatedPeptides: ['bpc-157', 'ipamorelin', 'semaglutide'],
    faqs: [
      {
        q: 'How long does lyophilized peptide powder last?',
        a: 'Stored correctly (cool, dark, and dry), lyophilized peptide powder is stable for 12–24+ months. Frozen storage at -20°C extends shelf life to several years for most compounds. Refrigerated storage (2–8°C) is suitable for months to a year.',
      },
      {
        q: 'How long does a reconstituted peptide last in the fridge?',
        a: 'Once reconstituted with bacteriostatic water and refrigerated (2–8°C), most peptides remain stable for 28–30 days. Some are more stable; some (particularly GLP-1 compounds) have specific manufacturer guidelines. Reconstituted solutions should never be frozen — this disrupts the peptide structure.',
      },
      {
        q: 'Can I travel with peptides?',
        a: 'Lyophilized powder is more travel-friendly than reconstituted solution — it can tolerate room temperature for several days without significant degradation. Reconstituted peptides require refrigeration and should not be allowed to reach room temperature repeatedly. A travel cooler or insulated medical pack is recommended for reconstituted solutions.',
      },
    ],
    content: `Proper storage is one of the most overlooked variables in peptide research. A compound that is correctly sourced and reconstituted can still degrade if stored improperly. This guide covers both forms: **lyophilized powder** (how they ship) and **reconstituted solution** (after you mix them).

> **Research use only.** This guide covers storage for research peptides and some pharmaceutical formulations. Always follow the manufacturer guidance for prescription compounds. See our [Medical Disclaimer](/medical-disclaimer).

## The two storage states

| State | Form | Storage requirements | Shelf life |
| --- | --- | --- | --- |
| **Lyophilized** | Freeze-dried powder | Cool, dark, dry; refrigerate or freeze for long-term | Months to years |
| **Reconstituted** | Solution in BAC water | Refrigerated (2–8°C) only; never freeze | 28–30 days |

Understanding this distinction is essential: **reconstituted solutions should not be frozen**. Freeze-thaw cycles form ice crystals that physically disrupt peptide structure, accelerating degradation.

## Storing lyophilized powder

Lyophilized peptide powder is significantly more stable than reconstituted solution.

### Short-term (under 3 months)
- **Room temperature** is generally acceptable, away from heat and direct light.
- Keep vials in a cool, dark drawer or cabinet. A temperature below 25°C (77°F) is preferable.

### Medium-term (3–12 months)
- **Refrigerate** at 2–8°C (standard fridge temperature).
- Keep vials in a sealed bag or small container to prevent moisture exposure when the fridge door opens.

### Long-term (12+ months)
- **Freeze** at -20°C (standard freezer) or -80°C for maximum longevity.
- Use a desiccant packet in the container to absorb any moisture.
- Allow frozen vials to reach room temperature before opening — this prevents condensation forming on the powder.

## Storing reconstituted solution

Once a peptide is dissolved in bacteriostatic water, the clock starts:

- **Always refrigerate** at 2–8°C immediately after reconstitution.
- **Never freeze** the reconstituted solution.
- **Protect from light** — amber vials are ideal; if storing in clear vials, keep in a dark drawer.
- **28–30 days** is the typical stable shelf life for most peptides reconstituted with bacteriostatic water. Plain sterile water provides no bacteriostatic protection and shortens this window significantly.
- Some compounds (particularly certain GLP-1 drugs) have manufacturer-specified shelf lives that may differ — follow those guidelines.

Discard reconstituted solution that:
- Has **changed color** (should be clear and colorless for most peptides)
- Has **visible particles** or cloudiness
- Is past its use date
- Has been **left unrefrigerated** for more than a few hours

## Bacteriostatic vs sterile water: why it matters for storage

The 0.9% benzyl alcohol in **bacteriostatic water** inhibits bacterial growth when you re-enter the vial with a needle across multiple doses. **Sterile water** has no such preservative and should only be used if you will use the entire vial in one session. For multi-dose vials — which is almost always the case — bacteriostatic water is required to achieve the 28-30 day shelf life.

## Traveling with peptides

**Lyophilized powder** is the best form to travel with:
- Can tolerate several days at room temperature without significant degradation
- Does not need a cooler for short trips
- Reconstitute on arrival

**Reconstituted solution** requires more care:
- Keep refrigerated; use an insulated medical travel case with ice packs for transit
- Avoid exposing it to temperature extremes (hot car, checked luggage in unpressurized holds)
- TSA allows liquid medications in carry-on with documentation; research compounds occupy a gray area

## Quick reference

| Situation | Recommendation |
| --- | --- |
| Unopened powder, short-term | Cool, dark room temp |
| Unopened powder, long-term | Freezer (-20°C) |
| Reconstituted, in use | Refrigerator (2–8°C) |
| Reconstituted, traveling | Insulated cooler, do not freeze |
| Past use-by or changed appearance | Discard |

## Related

- [How to reconstitute peptides](/guides/how-to-reconstitute-peptides)
- [How to inject peptides](/guides/how-to-inject-peptides)
- [Dosage calculator](/calculator)`,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'retatrutide-guide',
    title: 'Retatrutide: The Triple Agonist Explained',
    metaTitle: 'Retatrutide Guide: Triple Agonist Dosage & Trials (2026)',
    description:
      'A complete research guide to Retatrutide — the triple GIP/GLP-1/glucagon receptor agonist in late-stage trials, its record-breaking trial results, mechanism, dosing, and how it compares to tirzepatide.',
    category: 'Dosage',
    keywords: [
      'retatrutide', 'retatrutide guide', 'retatrutide dosage', 'retatrutide vs tirzepatide',
      'triple agonist peptide', 'retatrutide trials',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/glp-1.webp',
    relatedPeptides: ['tirzepatide', 'semaglutide'],
    faqs: [
      {
        q: 'What is Retatrutide?',
        a: 'Retatrutide (LY3437943) is an investigational once-weekly injectable peptide developed by Eli Lilly. It is a triple receptor agonist — activating GIP, GLP-1, and glucagon receptors simultaneously — making it mechanistically distinct from tirzepatide (dual GIP/GLP-1) and semaglutide (single GLP-1).',
      },
      {
        q: 'How much weight loss did Retatrutide produce in trials?',
        a: 'In the Phase 2 trial published in NEJM in 2023 (n=338), the highest dose (12 mg) produced a mean weight loss of approximately 24.2% at 48 weeks — the largest weight loss ever observed in a clinical trial for an anti-obesity medication at that time.',
      },
      {
        q: 'Is Retatrutide FDA-approved?',
        a: 'As of mid-2026, Retatrutide is in Phase 3 clinical trials (TRIUMPH program). It is not yet FDA-approved. It is not available as a prescription drug or a research chemical in any standard context — references to "research retatrutide" should be treated with significant skepticism.',
      },
    ],
    content: `**Retatrutide** (LY3437943, Eli Lilly) represents the next generation of weight-loss pharmacology — a **triple receptor agonist** that activates GIP, GLP-1, and glucagon receptors simultaneously. Its Phase 2 results generated significant excitement because of unprecedented weight loss numbers.

> **Investigational compound.** Retatrutide is not FDA-approved. As of mid-2026, it is in Phase 3 trials. It is not legitimately available for purchase as a research peptide. This guide is for research and educational awareness only. See our [Medical Disclaimer](/medical-disclaimer).

## What makes it a "triple agonist"?

Each receptor adds a distinct mechanism:

| Receptor | What it does |
| --- | --- |
| **GLP-1** | Reduces appetite, slows gastric emptying, improves insulin secretion |
| **GIP** | Enhances GLP-1 effects; may also act on adipose tissue directly |
| **Glucagon** | Increases energy expenditure; promotes fat oxidation in the liver |

The glucagon component is the key addition over tirzepatide. It increases metabolic rate and fat burning — but historically, pure glucagon receptor agonists raised blood sugar. The GLP-1 activity in retatrutide counteracts this glycemic effect, allowing the metabolic benefit without the glucose downside.

## Phase 2 trial results (NEJM 2023)

The landmark Phase 2 study (n=338, 48 weeks) tested four dose levels:

| Dose | Mean weight loss |
| --- | --- |
| 1 mg/week | ~8.7% |
| 4 mg/week | ~17.1% |
| 8 mg/week | ~22.8% |
| **12 mg/week** | **~24.2%** |

The 12 mg result — **~24% mean weight loss at 48 weeks** — was the highest ever recorded for an anti-obesity pharmacotherapy in a controlled trial at that point. Over 26% of participants at the highest dose lost ≥30% of body weight.

## Phase 3: The TRIUMPH program

Retatrutide entered Phase 3 trials (the TRIUMPH program) with multiple studies evaluating:
- Weight management in adults with obesity (TRIUMPH-1, TRIUMPH-2)
- Type 2 diabetes (TRIUMPH-3)
- Cardiovascular outcomes (TRIUMPH-4)

Results are expected through 2025–2026, with potential FDA submission thereafter.

## Dosing in trials

The Phase 2 protocol used a slow titration:
- Starting at **2 mg/week** and escalating over approximately **24 weeks** to the target dose (4, 8, or 12 mg/week)
- Slow escalation was critical — the glucagon activity can cause nausea and GI effects similar to GLP-1 class

## How it compares to tirzepatide

| | Tirzepatide | Retatrutide |
| --- | --- | --- |
| Receptors | GIP + GLP-1 | GIP + GLP-1 + Glucagon |
| Phase 2 weight loss | ~17% | ~24% (12 mg) |
| Approval status | FDA-approved | Phase 3 |
| Availability | Prescription (Zepbound/Mounjaro) | Not available |

See the dedicated [Retatrutide vs Tirzepatide comparison](/guides/retatrutide-vs-tirzepatide).

## Availability warning

Because retatrutide's trial results are well-publicized, some research chemical vendors have begun marketing compounds labeled "retatrutide." **These should not be trusted** — the synthesis of the actual retatrutide peptide sequence is complex, and the likelihood of receiving the genuine compound at clinical purity from a research vendor is very low. This is a category where counterfeits and mislabeled products are particularly prevalent.

## Related

- [Retatrutide vs Tirzepatide](/guides/retatrutide-vs-tirzepatide)
- [Tirzepatide dosage guide](/guides/tirzepatide-dosage-guide)
- [Semaglutide vs Tirzepatide](/guides/semaglutide-vs-tirzepatide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'retatrutide-vs-tirzepatide',
    title: 'Retatrutide vs Tirzepatide: What the Trials Show',
    metaTitle: 'Retatrutide vs Tirzepatide: Trial Data Compared (2026)',
    description:
      'A data-driven comparison of Retatrutide and Tirzepatide — mechanisms, Phase 2 vs Phase 3 trial weight loss results, side-effect profiles, and availability status.',
    category: 'Comparison',
    keywords: [
      'retatrutide vs tirzepatide', 'tirzepatide vs retatrutide',
      'triple agonist vs dual agonist', 'retatrutide comparison', 'best obesity drug',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/glp-1.webp',
    relatedPeptides: ['tirzepatide', 'semaglutide'],
    faqs: [
      {
        q: 'Is Retatrutide stronger than Tirzepatide?',
        a: 'In Phase 2 trial data, retatrutide at its highest dose (~24% weight loss at 48 weeks) outperformed tirzepatide at its highest dose (~22.5% at 72 weeks in SURMOUNT-1). However, the trials differ in design, duration, and populations — a direct head-to-head comparison has not yet been published.',
      },
      {
        q: 'When will Retatrutide be available?',
        a: 'Retatrutide is in Phase 3 trials as of mid-2026. If trials succeed, an FDA submission could come in 2026–2027, with potential approval thereafter. It is not currently available as a prescription or research compound.',
      },
      {
        q: 'Do they have different side effects?',
        a: 'Both share the GLP-1 class GI side effects. Retatrutide may additionally cause effects related to glucagon receptor activation, including nausea and potentially greater cardiovascular impact. The full Phase 3 safety profile is not yet established.',
      },
    ],
    content: `**[Tirzepatide](/peptides/tirzepatide)** is currently the most effective approved weight-loss drug. **Retatrutide** is its most likely successor, with Phase 2 data showing even larger weight loss. Here is what the evidence shows and what separates them.

> **Education only.** Tirzepatide is prescription-only. Retatrutide is not yet approved. Neither should be self-administered without medical supervision. See our [Medical Disclaimer](/medical-disclaimer).

## The core difference: dual vs triple agonism

| | Tirzepatide | Retatrutide |
| --- | --- | --- |
| Mechanism | GIP + GLP-1 dual agonist | GIP + GLP-1 + Glucagon triple agonist |
| Developer | Eli Lilly | Eli Lilly |
| Status | FDA-approved (Mounjaro, Zepbound) | Phase 3 trials |
| Dosing | Once weekly | Once weekly |

The **glucagon receptor** activation in retatrutide is the additional lever. Glucagon raises metabolic rate and promotes fat oxidation — but in isolation, pure glucagon agonists raise blood sugar. The GLP-1 component of retatrutide counteracts the glucose elevation, allowing the metabolic benefit to express without glycemic risk.

## Head-to-head trial data (indirect comparison)

| Trial | Drug | Duration | Mean weight loss | Max dose |
| --- | --- | --- | --- | --- |
| SURMOUNT-1 (Phase 3) | Tirzepatide | 72 weeks | ~22.5% | 15 mg/week |
| Phase 2 (NEJM 2023) | Retatrutide | 48 weeks | ~24.2% | 12 mg/week |

**Important caveats:** These are different trials with different designs, populations, and durations. A formal head-to-head comparison trial has not been published. The retatrutide Phase 2 was smaller (n=338) and shorter. Phase 3 results may show somewhat different numbers.

That said, the direction is consistent: retatrutide is producing more weight loss than tirzepatide in comparable trial contexts, which the glucagon mechanism likely explains.

## Side effects: shared profile plus glucagon effects

Both share the GLP-1 class profile: nausea, diarrhea, constipation, decreased appetite. For tirzepatide, this is well-characterized across thousands of Phase 3 patients.

For retatrutide, the additional glucagon receptor activation may add:
- Potentially more pronounced nausea (glucagon itself can cause GI effects)
- Greater heart rate increase (glucagon raises heart rate)
- Cardiovascular outcomes data pending in Phase 3 (TRIUMPH-4)

The Phase 2 retatrutide trial required an especially slow titration — over ~24 weeks — to manage tolerability. This suggests the GI profile may be more demanding than tirzepatide.

## What this means in practice

**Right now (mid-2026):**
- **Tirzepatide (Zepbound/Mounjaro)** is the standard of care — the most effective approved obesity drug, prescribed by physicians, covered by some insurance plans.
- **Retatrutide** is investigational. Phase 3 results expected soon. Not available via legitimate channels.

**If Phase 3 succeeds:**
- Retatrutide may become the next-line option — particularly for patients who do not achieve adequate response with tirzepatide.
- The glucagon component could provide additional benefit for patients with significant liver fat (MASLD/NASH), where glucagon receptor activation is particularly relevant.

## Related

- [Retatrutide guide](/guides/retatrutide-guide)
- [Tirzepatide dosage guide](/guides/tirzepatide-dosage-guide)
- [Semaglutide vs Tirzepatide](/guides/semaglutide-vs-tirzepatide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'tesamorelin-dosage-guide',
    title: 'Tesamorelin Dosage Guide (Egrifta)',
    metaTitle: 'Tesamorelin Dosage Guide: Protocol & Evidence (2026)',
    description:
      'A research-based Tesamorelin dosage guide — the FDA-approved GHRH analog, its clinical protocol for visceral fat reduction, dosing, administration, what to expect, and the evidence base.',
    category: 'Dosage',
    keywords: [
      'tesamorelin dosage', 'egrifta dosage', 'tesamorelin protocol',
      'tesamorelin dose', 'tesamorelin visceral fat',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['tesamorelin', 'cjc-1295', 'ipamorelin'],
    faqs: [
      {
        q: 'What is the standard Tesamorelin dose?',
        a: 'The FDA-approved dose for Tesamorelin (Egrifta) is 2 mg once daily by subcutaneous injection. This is both the starting and the maintenance dose — there is no titration schedule as with GLP-1 agents. Clinical trials used this fixed dose.',
      },
      {
        q: 'How long does Tesamorelin take to work for visceral fat?',
        a: 'In the Phase 3 trials that led to FDA approval, significant reduction in visceral adipose tissue (VAT) was measurable at 26 weeks. The approved treatment duration is 26 weeks, with re-evaluation at that point. Unlike GLP-1 agents, effects on body weight are modest.',
      },
      {
        q: 'Is Tesamorelin available for off-label use?',
        a: 'Tesamorelin (Egrifta) is FDA-approved specifically for HIV-associated lipodystrophy. Off-label prescribing for other indications (e.g., general visceral fat in aging) occurs but is not FDA-approved. Research-chemical versions are also sold for non-clinical research, but these are not pharmaceutical grade.',
      },
    ],
    content: `**Tesamorelin** (brand name Egrifta) is an FDA-approved **GHRH analog** — the only growth hormone-releasing hormone analog with full regulatory approval. Unlike most peptides in the research space, it has Phase 3 clinical trials and a well-established evidence base for a specific indication: **visceral fat reduction in HIV-associated lipodystrophy**.

> **Prescription medication.** Tesamorelin is FDA-approved as a prescription drug. Off-label use and research-compound versions exist. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## What makes Tesamorelin unique

Tesamorelin stands apart from research GHRH analogs like CJC-1295 in two key ways:

1. **FDA approval** — it has completed Phase 3 trials and received regulatory clearance, giving it a documented safety and efficacy profile lacking for most GH secretagogues.
2. **Visceral fat specificity** — unlike general GH secretagogues, tesamorelin's clinical evidence is specifically for **visceral adipose tissue (VAT) reduction**, not overall body weight or general recomposition.

## Standard clinical dosage

The FDA-approved protocol is simple — no titration required:

| Parameter | Detail |
| --- | --- |
| Dose | **2 mg once daily** |
| Route | Subcutaneous injection |
| Timing | Flexible; consistent daily administration |
| Approved duration | **26 weeks**, then reassess |

Unlike GLP-1 agents, tesamorelin uses a fixed dose from day one. The 2 mg once-daily dose was established in Phase 3 trials.

## What the trials showed

The two pivotal Phase 3 trials (NEJM 2010, Falutz et al.) enrolled HIV-positive patients with lipodystrophy and showed:

- **~13–15% reduction in VAT** at 26 weeks vs placebo
- Significant improvements in triglycerides and the triglyceride/HDL ratio
- **No significant change in overall body weight** — the effect is specific to visceral fat, not general weight loss
- IGF-1 levels increased as expected with GHRH stimulation

Effects are sustained with continued treatment and reverse within weeks of stopping — VAT returns to baseline in most patients.

## Off-label and research use

Tesamorelin is increasingly studied and used off-label for:
- **Age-related visceral fat accumulation** (not HIV-specific)
- **Metabolic syndrome** with elevated VAT
- **General GH restoration** in aging adults

Off-label prescribing is legal but not covered by most insurance outside the approved indication. Research-chemical vendors also sell tesamorelin, but purity and sequence accuracy vary significantly.

## How it compares to CJC-1295

| | Tesamorelin | CJC-1295 (without DAC) |
| --- | --- | --- |
| Type | GHRH analog | GHRH analog |
| Approval | FDA-approved (lipodystrophy) | Research compound |
| Half-life | ~26–38 min | ~25–30 min |
| Dosing | 2 mg once daily | 100–200 mcg 2–3x daily |
| Evidence quality | Phase 3 RCTs | Limited human data |
| Primary evidence | Visceral fat reduction | General GH elevation |

Tesamorelin's longer structure (44 amino acids vs CJC-1295's 29) may contribute to its strong VAT-specific effects. Both stimulate GH via the GHRH receptor.

## Reconstitution

Tesamorelin requires reconstitution with sterile diluent (provided with the Egrifta kit). For research-compound versions, bacteriostatic water is used. Walk through the process at the [reconstitution guide](/guides/how-to-reconstitute-peptides).

## Related

- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)
- [Best peptides for anti-aging](/guides/best-peptides-for-anti-aging)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-glp-1-peptides',
    title: 'Best GLP-1 Peptides Compared: Semaglutide, Tirzepatide, Liraglutide & More',
    metaTitle: 'Best GLP-1 Peptides Compared (2026): Full Guide',
    description:
      'A complete comparison of all GLP-1 and incretin-based peptides — semaglutide, tirzepatide, retatrutide, liraglutide, exenatide — ranked by weight loss efficacy, dosing convenience, and approval status.',
    category: 'Comparison',
    keywords: [
      'best glp-1 peptide', 'glp-1 peptides compared', 'semaglutide vs liraglutide',
      'glp-1 agonist comparison', 'best weight loss injection', 'glp-1 drugs ranked',
    ],
    readingTime: '8 min',
    updated: 'June 2026',
    image: '/guides/glp-1.webp',
    relatedPeptides: ['semaglutide', 'tirzepatide', 'liraglutide'],
    faqs: [
      {
        q: 'Which GLP-1 is most effective for weight loss?',
        a: 'Among currently approved agents, tirzepatide (Zepbound) produces the greatest average weight loss — about 22.5% in SURMOUNT-1. Semaglutide (Wegovy) follows at about 14.9%. The investigational triple agonist retatrutide has shown ~24% in Phase 2 but is not yet approved.',
      },
      {
        q: 'What is the difference between GLP-1, dual, and triple agonists?',
        a: 'GLP-1 agonists (semaglutide, liraglutide) activate only the GLP-1 receptor. Dual agonists (tirzepatide) add GIP receptor activation. Triple agonists (retatrutide, investigational) add glucagon receptor activation. Each additional receptor contributes additional mechanisms that appear to enhance weight loss.',
      },
      {
        q: 'Are daily GLP-1 injections still used?',
        a: 'Liraglutide (Saxenda) requires daily injection and is generally considered first-generation. Once-weekly semaglutide and tirzepatide have largely supplanted daily agents for new prescriptions due to superior convenience and efficacy.',
      },
    ],
    content: `The GLP-1 and incretin drug class has expanded rapidly. Choosing the right agent requires understanding the differences in mechanism, efficacy, dosing schedule, and availability. This guide ranks and compares all the major options.

> **Education only.** All approved compounds listed here are prescription medications. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer). See also our [comparison tool](/compare) for interactive side-by-side analysis.

## The hierarchy of incretin mechanisms

| Generation | Receptors | Examples |
| --- | --- | --- |
| GLP-1 only | GLP-1 | Semaglutide, Liraglutide, Exenatide |
| Dual agonist | GIP + GLP-1 | Tirzepatide |
| Triple agonist | GIP + GLP-1 + Glucagon | Retatrutide (investigational) |

More receptor activation generally produces greater weight loss — each additional mechanism adds a complementary effect.

## Head-to-head efficacy ranking

| Agent | Mechanism | Trial | Duration | Mean weight loss | Status |
| --- | --- | --- | --- | --- | --- |
| **Retatrutide 12 mg** | Triple | Phase 2 | 48 wks | ~24.2% | Investigational |
| **Tirzepatide 15 mg** | Dual | SURMOUNT-1 | 72 wks | ~22.5% | FDA-approved |
| **Semaglutide 2.4 mg** | GLP-1 | STEP 1 | 68 wks | ~14.9% | FDA-approved |
| **Liraglutide 3 mg** | GLP-1 | SCALE | 56 wks | ~8.0% | FDA-approved |
| **Exenatide ER** | GLP-1 | DURATION-6 | 26 wks | ~4.1% (vs placebo) | FDA-approved |

*Note: Retatrutide Phase 2 and other approved agents are not directly comparable across these trials; direct head-to-head data is limited.*

## Agent profiles

### Semaglutide (Ozempic / Wegovy / Rybelsus)
The most widely prescribed GLP-1 agent. **Weekly injection** (Ozempic/Wegovy) or **daily oral tablet** (Rybelsus, lower efficacy). Proven cardiovascular benefit (SELECT trial: 20% reduction in MACE). Excellent long-term safety data. See the [Semaglutide dosage guide](/guides/semaglutide-dosage-guide).

### Tirzepatide (Mounjaro / Zepbound)
Currently the **most effective approved weight-loss drug**. Once-weekly injection. SURMOUNT-1 showed ~22.5% weight loss at 72 weeks; ~63% of participants lost ≥20%. Cardiovascular trial (SURMOUNT-MMO) underway. See the [Tirzepatide dosage guide](/guides/tirzepatide-dosage-guide) and the [Semaglutide vs Tirzepatide comparison](/guides/semaglutide-vs-tirzepatide).

### Liraglutide (Saxenda / Victoza)
**First-generation daily GLP-1 agonist**. Effective but requires daily injection and produces less weight loss than weekly agents. Remains an option when newer agents are unavailable or not tolerated. SCALE trial showed ~8% weight loss vs placebo at 56 weeks.

### Exenatide (Byetta / Bydureon)
Exenatide was among the first GLP-1 agonists approved. Byetta (twice-daily) is largely discontinued for obesity; Bydureon (weekly) is used primarily for T2DM. Less potent for weight loss than newer agents.

### Retatrutide (investigational)
Phase 2 showed ~24% weight loss at 48 weeks at the 12 mg dose. Phase 3 (TRIUMPH program) ongoing. Not available as a prescription or research compound. See the [Retatrutide guide](/guides/retatrutide-guide).

## How to choose

| Priority | Best option |
| --- | --- |
| Maximum weight loss (approved) | Tirzepatide |
| Best cardiovascular evidence | Semaglutide |
| Oral administration | Semaglutide (Rybelsus) — lower efficacy |
| Daily injection acceptable, cost-sensitive | Liraglutide |
| Not yet available, watching trials | Retatrutide |

## Related

- [Semaglutide vs Tirzepatide](/guides/semaglutide-vs-tirzepatide)
- [Retatrutide vs Tirzepatide](/guides/retatrutide-vs-tirzepatide)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)
- [Compare peptides side by side](/compare)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-read-a-coa',
    title: 'How to Read a Peptide Certificate of Analysis (COA)',
    metaTitle: 'How to Read a Peptide COA: Complete Guide (2026)',
    description:
      'A step-by-step guide to reading and interpreting a peptide Certificate of Analysis — what tests it should include, what the numbers mean, red flags to watch for, and how to verify the lab.',
    category: 'How-To',
    keywords: [
      'how to read a coa', 'peptide certificate of analysis', 'coa peptide',
      'peptide purity test', 'verify peptide quality', 'peptide lab testing',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/coa.webp',
    relatedPeptides: ['bpc-157', 'tb-500', 'ipamorelin'],
    faqs: [
      {
        q: 'What is a COA for peptides?',
        a: 'A Certificate of Analysis (COA) is a document from a testing laboratory that certifies the results of analytical testing on a specific batch of peptide. It should include purity (typically measured by HPLC), identity verification (mass spectrometry), and ideally testing for endotoxins and microbial contamination.',
      },
      {
        q: 'What purity should a research peptide have?',
        a: 'Research-grade peptides are typically ≥98% pure by HPLC. Pharmaceutical-grade is ≥99%. Anything below 95% should raise questions about the vendor. The COA should specify purity as a percentage and list the test method (HPLC).',
      },
      {
        q: 'Can I trust a COA on a vendor\'s website?',
        a: 'Not automatically. Some vendors fabricate or modify COAs. Key verification steps: check that the COA names a real, independent laboratory (not an in-house lab); verify the lot number matches what you received; consider contacting the lab directly to confirm the document is genuine.',
      },
    ],
    content: `A **Certificate of Analysis (COA)** is the single most important document for verifying peptide quality. Every reputable research peptide vendor provides one. But a COA is only useful if you know how to read it — and how to spot a fake or inadequate one.

> **Research use only.** This guide focuses on research peptide quality verification. For pharmaceutical compounds, COAs are provided by the manufacturer and regulated by the FDA. See our [Medical Disclaimer](/medical-disclaimer).

## What a COA should contain

A legitimate COA from an independent third-party lab will include at minimum:

1. **Compound name and lot/batch number** — must match the product you received
2. **HPLC purity result** — the core quality metric (see below)
3. **Mass spectrometry (MS) identity confirmation** — confirms the compound is what it claims to be
4. **Lab name and contact information** — must be a real, verifiable independent lab
5. **Test date** — should be recent (within the past year for the batch in question)

Premium COAs additionally include:
- **Endotoxin testing** (LAL test) — critical for injectables; endotoxins cause inflammatory reactions
- **Microbial contamination testing** — sterility verification
- **Heavy metals / solvent residues** — particularly important for synthetically produced peptides

## HPLC purity: the core metric

**HPLC (High-Performance Liquid Chromatography)** separates the components of the peptide sample and quantifies the percentage that is the desired compound.

| Purity % | Interpretation |
| --- | --- |
| ≥99% | Pharmaceutical grade |
| ≥98% | Research grade — standard expectation |
| 95–97% | Acceptable minimum; lower vendors |
| Below 95% | Questionable; avoid unless context is clear |

The HPLC chromatogram (the graph) should show a dominant peak for the target peptide. Multiple similar-sized peaks indicate impurities or degradation products. A COA that only lists a purity number without the actual chromatogram data should be treated skeptically.

## Mass spectrometry: identity verification

HPLC confirms purity but not identity — a sample could be 99% pure and still be the wrong peptide. **Mass spectrometry (MS)** confirms the molecular weight of the compound matches the expected value for the peptide.

What to check:
- The **observed molecular weight** (typically listed as [M+H]+, [M+2H]2+, etc.) should match the **theoretical molecular weight** of the peptide
- Molecular weights for common peptides are well-documented — BPC-157 is 1419.5 Da, TB-500 is 839.0 Da (as the fragment), Ipamorelin is 711.9 Da

If the COA provides mass spec data and it does not match the published molecular weight for that peptide, the compound is not what it claims.

## Verifying the lab

Many vendors include COAs from labs with vague or unverifiable names. Legitimate labs used for peptide testing include:

- **Janoshik** (Czechia) — most commonly used for research peptides; results can be searched on their public database
- **LabCorp, Eurofins, SGS** — major commercial labs
- **University labs** — occasionally used

For **Janoshik specifically**, you can search the COA number directly on their website to verify authenticity. If a vendor uses Janoshik, this is checkable.

Signs of a potentially fake COA:
- Lab name is vague ("USA Lab" or "Quality Testing Inc.")
- No contact information or web presence for the lab
- The lot number on the COA differs from your product
- The purity is suspiciously high (99.9%+) with no chromatogram

## Endotoxin testing: the often-missing test

**Endotoxins** (lipopolysaccharides from gram-negative bacteria) are the most dangerous contamination risk for injectable research peptides. They cause severe inflammatory responses — fever, chills, rigors — even at very low concentrations.

The **LAL (Limulus Amebocyte Lysate) test** quantifies endotoxins. Acceptable limits for parenteral use are generally below 5 EU/kg body weight per dose.

Many research peptide COAs do **not** include endotoxin testing — this is a real gap in quality assurance. Vendors that provide endotoxin-tested products are providing a meaningfully higher level of safety assurance.

## Red flags summary

- No third-party COA at all
- In-house lab only (vendor tests their own products)
- No mass spectrometry (purity only)
- No endotoxin testing for injectable products
- Lab name is not verifiable
- Lot number discrepancy
- Very recent test date on a batch that has been in stock for over a year

## Related

- [Compare verified vendors](/vendors)
- [What are research peptides?](/guides/what-are-research-peptides)
- [Peptide side effects](/guides/peptide-side-effects)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'mk-677-vs-ipamorelin',
    title: 'MK-677 vs Ipamorelin: Oral vs Injectable GH Secretagogue',
    metaTitle: 'MK-677 vs Ipamorelin: Which Is Better? (2026)',
    description:
      'A head-to-head comparison of MK-677 (Ibutamoren) and Ipamorelin — mechanism, dosing, selectivity, side effects, and when to choose each or combine them.',
    category: 'Comparison',
    keywords: [
      'mk-677 vs ipamorelin', 'ipamorelin vs mk677', 'mk-677 or ipamorelin',
      'best gh secretagogue', 'oral vs injectable gh peptide',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/dosage-vial.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295'],
    faqs: [
      {
        q: 'Is MK-677 better than Ipamorelin?',
        a: 'They have different profiles that make each better in different contexts. MK-677 is oral, longer-acting, and simpler to use; Ipamorelin is injectable, produces cleaner pulsatile GH release with no appetite stimulation, and is always stacked with a GHRH analog for synergistic effect.',
      },
      {
        q: 'Can MK-677 and Ipamorelin be combined?',
        a: 'Yes — they act on the same receptor (ghrelin/GHS-R1a) so combining them is largely redundant in that respect. A more effective stack for MK-677 is to add a GHRH analog (CJC-1295) to also activate the GHRH receptor. Ipamorelin + CJC-1295 is the preferred injectable pairing.',
      },
      {
        q: 'Does MK-677 cause more water retention than Ipamorelin?',
        a: 'Generally yes — MK-677 produces more pronounced water retention, particularly in the first few weeks. This is related to its stronger and more sustained IGF-1 elevation and possibly aldosterone effects. Ipamorelin, producing more subtle pulsatile GH increases, typically causes less fluid retention.',
      },
    ],
    content: `**MK-677 (Ibutamoren)** and **Ipamorelin** are both ghrelin receptor agonists that stimulate GH release — but they differ fundamentally in route of administration, half-life, and side-effect profile. Understanding the distinction helps in choosing the right tool for a given research context.

> **Research use only.** MK-677 and Ipamorelin are not FDA-approved. Human clinical data is limited. This is not medical advice — see our [Medical Disclaimer](/medical-disclaimer).

## The shared mechanism — and where they diverge

Both MK-677 and Ipamorelin activate the **ghrelin receptor (GHS-R1a)**, which signals the pituitary to release growth hormone.

| | MK-677 (Ibutamoren) | Ipamorelin |
| --- | --- | --- |
| Type | Non-peptide small molecule | Peptide (GHRP) |
| Administration | **Oral** | Injectable (subcutaneous) |
| Half-life | **~24 hours** | ~2 hours |
| GH effect | Sustained elevation | **Pulsatile** |
| Appetite stimulation | **Significant** | Minimal |
| Water retention | Moderate–significant | Mild |
| Cortisol / prolactin effect | Moderate | Minimal |
| Always stacked with GHRH? | No (works alone) | Yes (most effective with CJC-1295) |

The **oral availability** of MK-677 is its defining advantage — no needles, no reconstitution, simpler logistics. Ipamorelin's advantage is **selectivity**: it stimulates GH without meaningfully raising cortisol, prolactin, or appetite.

## GH release pattern: pulsatile vs sustained

This distinction matters biologically:

- **Pulsatile GH** (Ipamorelin + CJC-1295): Mimics the natural pattern of GH release — discrete peaks followed by troughs. The GH receptor responds most strongly to these peaks. Most researchers believe pulsatile release is more physiologically appropriate and may reduce receptor downregulation.
- **Sustained GH elevation** (MK-677): More constant suppression of GH troughs. Simpler, but may be less aligned with natural GH physiology. The sustained IGF-1 elevation is one reason for greater water retention and glucose impact.

## Side-effect comparison

| Side effect | MK-677 | Ipamorelin |
| --- | --- | --- |
| Increased appetite | **Yes — often significant** | Minimal |
| Water retention | **Moderate–significant early** | Mild |
| Fatigue/lethargy | Possible; mitigated by night dosing | Minimal |
| Glucose / insulin sensitivity | **Monitor on extended use** | Less concern |
| Carpal tunnel symptoms | Possible at high doses | Less likely |

**Verdict:** Ipamorelin is the more selective and cleaner option. MK-677 causes more side effects but eliminates the need for injections.

## When to choose each

**Choose MK-677 when:**
- Oral convenience is a priority
- The research context calls for sustained IGF-1 elevation
- Appetite increase is acceptable (e.g., deliberate caloric surplus)
- Needles are not feasible

**Choose Ipamorelin (+ CJC-1295) when:**
- Pulsatile, physiologically aligned GH release is preferred
- Side-effect profile is a priority (cortisol, appetite)
- Precise dosing timing around sleep and training is possible
- Stacking with a GHRH analog for maximum GH output

**Combine them (MK-677 + CJC-1295):**
- An effective alternative to the Ipamorelin + CJC-1295 stack
- Uses the oral convenience of MK-677 with the GHRH receptor activation of CJC-1295
- More pronounced appetite effects than the injectable stack

## Related

- [MK-677 dosage guide](/guides/mk-677-dosage-guide)
- [Ipamorelin + CJC-1295 dosage guide](/guides/ipamorelin-cjc-1295-dosage-guide)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'recomp-peptide-stack',
    title: 'Peptide Stack for Body Recomposition (Fat Loss + Muscle)',
    metaTitle: 'Best Peptide Stack for Body Recomposition (2026)',
    description:
      'A research-based recomposition peptide stack — the best combination of GH secretagogues and recovery peptides for simultaneous fat loss and lean-mass preservation, with full protocol details.',
    category: 'Stacks',
    keywords: [
      'recomp peptide stack', 'body recomposition peptides', 'peptides for recomposition',
      'fat loss muscle gain peptides', 'best peptide stack recomp',
    ],
    readingTime: '7 min',
    updated: 'June 2026',
    image: '/guides/muscle-growth.webp',
    relatedPeptides: ['cjc-1295', 'ipamorelin', 'bpc-157'],
    faqs: [
      {
        q: 'What is the best peptide stack for body recomposition?',
        a: 'The most commonly researched recomposition stack is CJC-1295 + Ipamorelin (GH secretagogues for fat metabolism and lean mass support) combined with BPC-157 (for recovery from high-volume training). This stack addresses both the anabolic/metabolic and recovery sides of recomposition.',
      },
      {
        q: 'How long does a recomposition peptide stack take to show results?',
        a: 'Most researchers report the first noticeable effects at 4–6 weeks (improved sleep, better recovery), with visible body composition changes appearing at 8–12 weeks. Recomposition is slower and more subtle than bulking with anabolic compounds — expect gradual rather than dramatic changes.',
      },
      {
        q: 'Can I stack GH secretagogues with GLP-1 peptides for recomposition?',
        a: 'In principle, combining GH secretagogues (for lean mass and recovery) with a GLP-1 agent (for appetite suppression and fat loss) could address multiple recomposition mechanisms simultaneously. However, combining them increases complexity and potential side effects. This is outside standard research protocols.',
      },
    ],
    content: `Body recomposition — reducing fat while maintaining or gaining lean mass — is one of the most sought-after outcomes in peptide research. No single peptide accomplishes this alone; the most effective approach combines compounds targeting different mechanisms.

> **Research use only.** The compounds discussed are sold for research purposes. This is not medical advice. See our [Medical Disclaimer](/medical-disclaimer).

## The recomposition challenge

Recomposition is biochemically demanding: fat loss requires a caloric deficit, while muscle preservation or gain favors a surplus. Peptides help navigate this tension by:

1. **Elevating GH and IGF-1** — promoting fat metabolism (particularly visceral fat) while protecting lean mass, even in a mild deficit
2. **Accelerating recovery** — allowing higher training volume without injury, maximizing the anabolic stimulus
3. **Improving sleep** — GH is primarily released during deep sleep; better sleep quality improves both recovery and GH output

## The core recomp stack

### CJC-1295 + Ipamorelin — the GH foundation

The primary engine of the stack. CJC-1295 (GHRH analog) + Ipamorelin (GHRP) produce synergistic GH pulses that support:

- **Fat oxidation** — elevated GH promotes lipolysis, particularly visceral fat
- **Lean mass preservation** — IGF-1 is a key anabolic signal for muscle protein synthesis
- **Sleep architecture** — deeper sleep improves recovery and natural GH output

| Peptide | Dose | Timing |
| --- | --- | --- |
| CJC-1295 without DAC | 100–200 mcg | Pre-sleep + morning, fasted |
| Ipamorelin | 200–300 mcg | Co-inject with CJC-1295 |

See the [CJC-1295 + Ipamorelin GH stack guide](/guides/cjc-1295-ipamorelin-gh-stack) for the full dosing protocol.

### BPC-157 — recovery enabler

**[BPC-157](/peptides/bpc-157)** does not directly cause fat loss or muscle gain. Its role in the recomp stack is to **enable higher training volume** by accelerating recovery from connective tissue stress. In a recomposition context where training intensity is high, BPC-157 keeps you training consistently.

| Peptide | Dose | Timing |
| --- | --- | --- |
| BPC-157 | 250–500 mcg | Once or twice daily |

See the [BPC-157 dosage guide](/guides/bpc-157-dosage-guide).

## Full recomp stack protocol

| Peptide | Dose | Frequency | Route |
| --- | --- | --- | --- |
| CJC-1295 (without DAC) | 100–200 mcg | 2x daily (AM + pre-sleep) | Sub-q |
| Ipamorelin | 200–300 mcg | 2x daily with CJC-1295 | Sub-q |
| BPC-157 | 250–500 mcg | 1–2x daily | Sub-q |

**Cycle:** 10–12 weeks, followed by 4 weeks off. Reassess results and adjust dose before the next cycle.

## Optional additions

For those seeking to optimize further within a research context:

- **TB-500 (2 mg twice weekly)** — if widespread recovery issues exist alongside BPC-157
- **Tesamorelin (2 mg daily)** — if visceral fat is a specific target, substituting for or adding to the GHRH component

## What to expect

| Timeframe | Expected changes |
| --- | --- |
| Weeks 1–2 | Improved sleep quality; mild water retention |
| Weeks 3–6 | Better workout recovery; less joint/tendon soreness |
| Weeks 6–10 | Noticeable body composition shift — clothes fitting differently; leaner appearance |
| Weeks 10–12 | Cumulative recomposition — reduced body fat, maintained or improved lean mass |

These changes are real but subtle. This is not a dramatic transformation protocol — it is a precision optimization tool that works best alongside appropriate training and nutrition.

## Nutrition context

No peptide stack overcomes a poor diet. Recomposition works best with:
- **High protein** (1.6–2.2 g/kg body weight) to support muscle protein synthesis
- **Moderate caloric deficit** (200–400 kcal) to support fat loss without compromising recovery
- **High-quality sleep** — this is where most GH is released and when the stack does its primary work

## Related

- [CJC-1295 + Ipamorelin GH stack guide](/guides/cjc-1295-ipamorelin-gh-stack)
- [BPC-157 dosage guide](/guides/bpc-157-dosage-guide)
- [Best peptides for muscle growth](/guides/best-peptides-for-muscle-growth)
- [Best peptides for weight loss](/guides/best-peptides-for-weight-loss)`,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'peptides-wada-drug-testing',
    title: 'Peptides and Drug Testing: WADA Prohibited List Explained',
    metaTitle: 'Peptides & WADA Drug Testing: What Athletes Need to Know',
    description:
      'Which peptides are banned under the WADA Prohibited List, how they are detected, the difference between in-competition and out-of-competition bans, and what athletes need to know before using any peptide.',
    category: 'Explainer',
    keywords: [
      'peptides wada', 'peptides drug testing', 'wada prohibited peptides',
      'peptides banned sports', 'are peptides detectable', 'ghrp wada banned',
    ],
    readingTime: '6 min',
    updated: 'June 2026',
    image: '/guides/wada-sport.webp',
    relatedPeptides: ['ipamorelin', 'cjc-1295', 'bpc-157'],
    faqs: [
      {
        q: 'Are GH secretagogues banned in sport?',
        a: 'Yes. Growth hormone releasing peptides (GHRPs) and GHRH analogs are explicitly listed under the WADA Prohibited List in category S2 (Peptide Hormones, Growth Factors, Related Substances and Mimetics). This includes Ipamorelin, GHRP-2, GHRP-6, CJC-1295, Sermorelin, and similar compounds.',
      },
      {
        q: 'Is BPC-157 banned by WADA?',
        a: 'BPC-157 is not explicitly named on the WADA Prohibited List. However, WADA prohibits substances "not approved by any governmental regulatory health authority" if they have evidence of performance-enhancing effects — a catch-all that BPC-157 could fall under. Athletes should treat it as potentially prohibited and seek confirmation from their sport\'s anti-doping authority.',
      },
      {
        q: 'Can peptide drug tests be beaten?',
        a: 'Detection windows for peptides are generally shorter than for steroids. Some peptides (particularly shorter-acting ones) may only be detectable for hours to days. However, anti-doping science is advancing rapidly, and relying on detection windows to beat tests is both unethical and increasingly unreliable.',
      },
    ],
    content: `Athletes subject to anti-doping rules need to understand exactly which peptides are prohibited, whether that prohibition applies in and out of competition, and what the detection landscape looks like. This guide covers the key facts.

> **Not legal advice.** Anti-doping rules vary by sport, federation, and country. Always consult your sport's anti-doping authority or a qualified anti-doping lawyer for specific situations. See our [Medical Disclaimer](/medical-disclaimer).

## The WADA Prohibited List: the master reference

The **WADA Prohibited List** (updated annually, effective January 1 each year) is the authoritative reference for banned substances in sport. It applies to all signatories of the World Anti-Doping Code, covering most Olympic and Paralympic sports, and many professional leagues.

There is one fundamental rule athletes must understand:

> **"I didn't know" is not a defense.** Athletes bear strict liability for what is in their body, regardless of intent, knowledge, or source.

## Section S2: where most peptides appear

The relevant section for peptides is **S2: Peptide Hormones, Growth Factors, Related Substances and Mimetics**, which is prohibited **at all times** (in- and out-of-competition).

### Explicitly prohibited categories in S2:

**Growth hormone releasing peptides (GHRPs):**
- GHRP-2 (Pralmorelin)
- GHRP-6
- **Ipamorelin**
- Hexarelin
- All other compounds with similar structure/action

**GHRH analogs:**
- **Sermorelin**
- **CJC-1295** (with and without DAC)
- Modified GRF 1-29 (Mod-GRF 1-29)
- All other GHRH analogs

**Growth hormone (GH) itself** and **IGF-1** are also S2 prohibited (not peptide secretagogues, but the actual hormones they stimulate).

**Selective Androgen Receptor Modulators (SARMs)** — often stacked with peptides — appear in **S1** and are also prohibited at all times.

## GLP-1 peptides: the exception

**Semaglutide, tirzepatide, and liraglutide** are **NOT currently on the WADA Prohibited List**. WADA has considered adding semaglutide given its widespread use and potential performance-adjacent effects (body composition changes), but as of 2026 it remains permitted.

This could change. Athletes using GLP-1 agents should monitor annual WADA List updates.

## BPC-157 and TB-500: the gray zone

Neither **BPC-157** nor **TB-500** are explicitly named on the WADA Prohibited List.

However, WADA's catch-all provision in S2 states that the following are prohibited:

> "Any other substance with similar chemical structure or similar biological effect(s)"

Additionally, WADA prohibits substances "with no current approval by any governmental regulatory health authority" that show evidence of performance-enhancing effects or are being misused by athletes. BPC-157 and TB-500 could theoretically be prohibited under this language.

The practical situation: neither has been the subject of high-profile anti-doping cases, but athletes should:
- Treat BPC-157 and TB-500 as **potentially prohibited**
- Consult their sport's national anti-doping organization (e.g., USADA in the US)
- File a **Therapeutic Use Exemption (TUE)** if they have a legitimate medical need

## Detection methods and windows

Peptide detection has historically been more difficult than steroid detection — peptides degrade rapidly and exist at very low concentrations. However, anti-doping science has advanced substantially:

- **HPLC-MS/MS** (high-performance liquid chromatography with tandem mass spectrometry) can now detect many peptides at nanogram-per-milliliter concentrations in urine
- **Ipamorelin** has an estimated urinary detection window of approximately **12–24 hours**
- **GHRP-6** is similarly short-lived
- **Longer-acting compounds** (e.g., CJC-1295 with DAC) may be detectable for several days
- **Dried blood spot** testing is expanding, potentially catching compounds missed by urine

Athletes who rely on short detection windows as a strategy should understand that this is unreliable and constitutes an anti-doping rule violation regardless of test result.

## TUEs: the legitimate path

A **Therapeutic Use Exemption (TUE)** allows an athlete to use a prohibited substance for a genuine medical need (e.g., GH deficiency treated with a GHRH analog). TUEs must be applied for in advance through the relevant anti-doping authority and require medical documentation.

## Key takeaways for athletes

1. GH secretagogues (Ipamorelin, CJC-1295, Sermorelin, GHRPs) are **explicitly banned at all times**.
2. GLP-1 agents (semaglutide, tirzepatide) are **currently permitted** — but monitor annual WADA List updates.
3. BPC-157 and TB-500 are in a gray zone — treat as **potentially prohibited**.
4. Detection science is improving rapidly — short windows are not a reliable loophole.
5. Consult USADA (usada.org) or your national anti-doping organization before using any peptide.

## Related

- [Are peptides legal?](/guides/are-peptides-legal)
- [What are research peptides?](/guides/what-are-research-peptides)
- [Peptide side effects](/guides/peptide-side-effects)`,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug)
}

export const GUIDE_CATEGORIES: Guide['category'][] = [
  'How-To',
  'Dosage',
  'Best Peptides',
  'Comparison',
  'Stacks',
  'Explainer',
]
