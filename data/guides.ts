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
