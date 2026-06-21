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
  category: 'How-To' | 'Dosage' | 'Best Peptides' | 'Comparison' | 'Stacks'
  keywords: string[]
  readingTime: string
  updated: string
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

**[TB-500](/peptides/tb-500)**, a synthetic fragment related to Thymosin Beta-4, is studied for cell migration, actin regulation, and systemic tissue repair. Its longer half-life and broad distribution make it a natural complement to BPC-157.

## 3. The BPC-157 + TB-500 "Wolverine" stack

Because their mechanisms are complementary — local vs systemic — the two are very commonly combined. Read the dedicated [Wolverine stack protocol](/guides/bpc-157-tb-500-wolverine-stack).

## 4. GHK-Cu — skin & connective tissue

GHK-Cu, a copper-binding peptide, is researched for skin remodeling, collagen synthesis, and wound healing, and appears in both injectable and topical research contexts.

## 5. Growth-hormone secretagogues — recovery support

**[CJC-1295](/peptides/cjc-1295) + [Ipamorelin](/peptides/ipamorelin)** raise growth hormone and IGF-1, which support recovery, connective-tissue health, and sleep quality. They are a recovery *support* tool rather than a targeted injury treatment.

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
]
