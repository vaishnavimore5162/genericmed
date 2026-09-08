# Architecture & Product Decision Records (ADRs)

This document records every major technical, architectural, and product decision made for **GenericMed**. It serves as an immutable log of context, trade-offs, rationale, and consequences to guide ongoing and future development.

---

## Index of Decisions

| ID | Title | Date | Status | Area |
| :--- | :--- | :--- | :--- | :--- |
| **[ADR-001](#adr-001-dual-modality-frontend-architecture)** | Dual-Modality Frontend Architecture (Patient PWA + Regulatory Console) | 2026-08-15 | **Accepted** | Frontend / UX |
| **[ADR-002](#adr-002-modular-monolith-with-tenant_id-shared-schema-isolation)** | Modular Monolith with `tenant_id` Shared Schema Isolation | 2026-08-18 | **Accepted** | Backend / Database |
| **[ADR-003](#adr-003-cdsco-bioequivalence-validation-via-moore-flanner-f2-metric)** | CDSCO Bioequivalence Validation via Moore-Flanner ($f_2$) Metric | 2026-08-22 | **Accepted** | Clinical Algorithms |
| **[ADR-004](#adr-004-multi-store-smart-split-order-fulfillment-engine)** | Multi-Store Smart Split Order Fulfillment Engine | 2026-08-25 | **Accepted** | E-Commerce / Logistics |
| **[ADR-005](#adr-005-algorithmic-sub-floor-pricing-anti-dumping-monitor)** | Algorithmic Sub-Floor Pricing Anti-Dumping & Counterfeit Monitor | 2026-08-29 | **Accepted** | Regulatory / Risk |
| **[ADR-006](#adr-006-abha-integration-and-schedule-h1x-tamper-proof-audit)** | ABHA Integration & Schedule H1/X Tamper-Proof Prescription Audit | 2026-09-02 | **Accepted** | Compliance / Security |
| **[ADR-007](#adr-007-tailwind-css-v4-theme-tokenization--material-symbols)** | Tailwind CSS v4 Theme Tokenization & Material Symbols Font System | 2026-09-05 | **Accepted** | UI / Design System |
| **[ADR-008](#adr-008-client-side-state-orchestration-with-localstorage-bridge)** | Client-Side State Orchestration with LocalStorage Bridge | 2026-09-07 | **Accepted** | State Management |
| **[ADR-009](#adr-009-server-side-gemini-20-flash-prescription-ocr--clinical-reasoning)** | Server-Side Gemini 2.0 Flash Prescription OCR & Clinical Reasoning | 2026-09-08 | **Accepted** | AI / Clinical Intelligence |
| **[ADR-010](#adr-010-express-modular-api-gateway-with-vite-dev-proxy-bridge)** | Express Modular API Gateway with Vite Dev Proxy Bridge | 2026-09-08 | **Accepted** | Backend / Infrastructure |

---

## ADR-001: Dual-Modality Frontend Architecture

- **Date:** 2026-08-15
- **Status:** Accepted
- **Deciders:** Lead Architect, Product Engineering Team

### Context & Problem
GenericMed addresses two radically different user archetypes:
1. **Patients & Caregivers:** Require an accessible, clean mobile interface (optimized for quick brand-to-generic searches, cost comparisons, dose tracking, and checkout).
2. **Clinical Regulators, Pharmacists & CRO Auditors:** Require an information-dense desktop dashboard (data tables, dissolution curve charts, batch verification dossiers, geofence mismatch telemetry, and compliance locks).

Building and maintaining two independent codebases at this stage would double maintenance overhead, fragment type definitions, and slow down rapid iteration.

### Decision Taken
Deploy a unified Single-Page Application (SPA) powered by React 19 and Vite that natively switches between two operational modes via a top portal navigation bar:
- **Patient Mode:** Rendered inside a simulated responsive smartphone viewport (iPhone/Android frame with toggle for full-screen responsive mode).
- **Clinical Governance Console Mode:** Full-width desktop enterprise console with dedicated sidebar navigation, multi-metric KPI bars, and data management views.

### Reasoning
- Shared TypeScript type contracts ([types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts)) and mock data models ([mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts)) across both portals.
- Seamless demo experience for stakeholders, clinicians, and government regulatory inspectors without needing separate deployment URLs.
- Zero latency context switching when testing interactions between patient actions (e.g., placing an order) and administrative inspection (e.g., auditing Rx queues).

### Alternatives Considered
1. *Two Separate Frontends (Micro-frontends / Monorepo with Turborepo):* Rejected due to early-stage setup complexity, CI/CD friction, and duplicate asset bundling.
2. *Pure Responsive Single Layout:* Rejected because an enterprise regulatory audit table cannot be effectively shoehorned into a single mobile view without losing critical diagnostic density.

### Impact on Project
- Unified bundle size remains lean under Vite 6.
- Top portal bar ([TopNavigationPortalBar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/common/TopNavigationPortalBar.tsx)) serves as an omnipresent developer/evaluator switcher.
- Mobile viewport toggle allows instant testing of patient ergonomics.

---

## ADR-002: Modular Monolith with `tenant_id` Shared Schema Isolation

- **Date:** 2026-08-18
- **Status:** Accepted
- **Deciders:** Backend Architect, Security Officer

### Context & Problem
GenericMed must serve multiple independent pharmacy networks, Jan Aushadhi Kendras (PMBJP), standalone chemist shops, and regulatory zones across India. We must ensure strict multi-tenant data separation while keeping infrastructure costs sustainable during scaling.

### Decision Taken
Adopt a **Modular Monolith** architecture backed by a **Shared Database, Shared Schema** model in PostgreSQL. Every tenant-scoped database table must include a non-nullable indexed column:
```sql
tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE RESTRICT
```
Enforce strict multi-tenant boundary checks through PostgreSQL **Row-Level Security (RLS)** policies combined with JWT payload claims.

### Reasoning
- Microservices introduce distributed transaction failure modes (Saga overhead, 2PC latency) that are dangerous in medical dispensing and cart splitting.
- Database-per-tenant or schema-per-tenant architectures impose high operational overhead (connection pooling limits, schema migration bottlenecks across thousands of retail chemist shops).
- Modular monolith structure allows future extraction of isolated domain services (e.g., Search or Notification) without codebase restructuring.

### Alternatives Considered
1. *Database-per-Tenant:* Rejected due to excessive compute and connection pool costs for micro-pharmacies.
2. *Pure Microservices:* Rejected as premature optimization; would add network hop latency to real-time bioequivalence calculations.

### Impact on Project
- All API queries and ORM repository calls must inject and validate `tenant_id`.
- Domain architecture models 12 isolated domain modules communicating via in-process events and typed interfaces.

---

## ADR-003: CDSCO Bioequivalence Validation via Moore-Flanner ($f_2$) Metric

- **Date:** 2026-08-22
- **Status:** Accepted
- **Deciders:** Chief Medical Officer, Pharmacology Advisor

### Context & Problem
The primary hurdle preventing widespread generic adoption in India is the perceived lack of bioequivalence compared to innovator brand formulations. To build clinical trust, generic substitution cannot rely solely on salt names; it must present verifiable pharmacological equivalence.

### Decision Taken
Implement the **Moore-Flanner Similarity Factor ($f_2$)** standard as established by the CDSCO (Central Drugs Standard Control Organisation), US FDA, and WHO for comparing in-vitro dissolution profiles:
$$f_2 = 50 \cdot \log_{10} \left[ \left( 1 + \frac{1}{n} \sum_{t=1}^{n} (R_t - T_t)^2 \right)^{-0.5} \times 100 \right]$$
- Formulations with $50 \le f_2 \le 100$ are classified as **Bioequivalent** and approved for automated pharmacy substitution.
- Formulations with $f_2 < 50$ are flagged with dissolution variance alerts and locked from auto-substitution.
- Narrow Therapeutic Index (NTI) drugs (e.g., Warfarin, Levothyroxine, Lithium) enforce hard safety guardrails requiring physician co-signature.

### Reasoning
- CDSCO regulatory guidelines explicitly mandate $f_2 \ge 50$ for bioequivalence confirmation in solid oral dosage forms.
- Provides transparent mathematical proof to patients and clinicians, directly dismantling the myth of "cheap generic = inferior quality".

### Alternatives Considered
1. *Binary CDSCO License Match Only:* Rejected because having a manufacturing license does not guarantee batch-level dissolution curve parity with the innovator drug.
2. *Resorcinol / Difference Factor ($f_1$) Only:* Rejected because $f_1$ alone does not sufficiently penalize curve trajectory skew at peak absorption ($T_{\max}$).

### Impact on Project
- Every canonical molecule entity (`CanonicalMolecule`) in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts) tracks `f2Score`, `isValidF2`, `dissolutionRate`, and `aucBioavailability`.
- The Patient UI highlights certified bioequivalence scores (e.g., `f2 = 71.4`) with visual badges in [SearchCompareScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/SearchCompareScreen.tsx) and [MedicineDetailsScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/MedicineDetailsScreen.tsx).
- The Clinical Console ([CatalogEquivalenceView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/CatalogEquivalenceView.tsx)) plots interactive dissolution curve graphs.

---

## ADR-004: Multi-Store Smart Split Order Fulfillment Engine

- **Date:** 2026-08-25
- **Status:** Accepted
- **Deciders:** Head of Product, Logistics Lead

### Context & Problem
Generic medicines in India are distributed across disparate retail channels:
1. **Government PMBJP Jan Aushadhi Kendras:** Offer the absolute lowest price (often 80–90% savings) but carry limited SKU inventories and have fixed dispatch schedules (next-day/batch).
2. **Private Retail Chemist Networks (Apollo, MedPlus, Wellness Forever):** Carry broader inventories, cold-chain capabilities, and 30–45 minute express delivery, but at slightly higher price points.

Forcing a patient to order from a single vendor causes cart abandonment when specific items are out of stock or when the patient cannot leverage Jan Aushadhi prices.

### Decision Taken
Build a **Multi-Store Smart Split Dispensing Engine** that automatically segregates a single patient cart into discrete fulfillment packages:
- **Package 1 (Express Slot):** Routed to the closest Form 20/21 private retail chemist (30–45 min turnaround, cold-chain tracked).
- **Package 2 (Govt Kendra Slot):** Routed to the nearest Pradhan Mantri Bhartiya Janaushadhi Kendra (PMBJP) for maximum cost-reduction on chronic essentials.

### Reasoning
- Maximizes total basket savings while maintaining medical continuity for acute doses.
- Eliminates out-of-stock lockouts by sourcing distinct salts from optimal local hubs.
- Generates clear, distinct regulatory invoices and dispensing logs for each licensed seller.

### Alternatives Considered
1. *Single-Store Forced Routing:* Customer must abandon whichever medicine the chosen store lacks. Rejected due to poor customer retention.
2. *Manual Multi-Cart Checkout:* Customer must execute two independent checkout flows. Rejected due to friction in payment authorization.

### Impact on Project
- The Cart and Order interfaces ([CartCheckoutScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/CartCheckoutScreen.tsx), [OrderTrackingScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/OrderTrackingScreen.tsx)) model multi-package states (`pkg-1`, `pkg-2`) with separate seller badges, fulfillment ETAs, and delivery fee calculations.

---

## ADR-005: Algorithmic Sub-Floor Pricing Anti-Dumping & Counterfeit Monitor

- **Date:** 2026-08-29
- **Status:** Accepted
- **Deciders:** Compliance Lead, Central Drug Inspector Liaison

### Context & Problem
Unregulated online marketplaces risk facilitating predatory pricing, substandard active pharmaceutical ingredients (APIs), or dumping of near-expiry/counterfeit medicine batches under the guise of "discount generics".

### Decision Taken
Deploy an automated **Pricing Anomaly & Risk Detection Engine** in the Clinical Governance Console:
- Calculates an **API Raw Material Floor Threshold** for each canonical molecule based on National Pharmaceutical Pricing Authority (NPPA) ceiling benchmarks.
- Flags and locks listings priced $>50\%$ below the generic manufacturing floor as **Suspicious Dumping / Counterfeit Risk**.
- Inspects batch shelf-life (<30 days triggers **Spoilage Risk**).
- Traces seller GSTIN against CDSCO blacklist registries (e.g., blacklisted formulation units).

### Reasoning
- Protects patient safety and complies with Drug Price Control Orders (DPCO 2013).
- Prevents rogue sellers from tarnishing the platform's clinical credibility.
- Empowers state drug inspectors with diagnostic reasons and one-click compliance suspension.

### Alternatives Considered
1. *Manual Review of All Price Updates:* Impossible to scale across millions of pharmacy SKU price updates.
2. *Unrestricted Free-Market Pricing:* High risk of liability under Section 27 of the Drugs and Cosmetics Act for spurious formulations.

### Impact on Project
- Implemented [PricingAnomalyView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/PricingAnomalyView.tsx) with automated severity indexing, diagnostic categorization, and compliance lock actions.
- Unverified/flagged offers (e.g., QuickRelief Meds ₹8.00 strip) are automatically masked in the patient search feed under safety rule `FR-CORE-02`.

---

## ADR-006: ABHA Integration and Schedule H1/X Tamper-Proof Audit

- **Date:** 2026-09-02
- **Status:** Accepted
- **Deciders:** Security Lead, Healthcare Integration Architect

### Context & Problem
Dispensing Schedule H, H1 (antibiotics, anti-TB), and Schedule X (narcotics/psychotropics) drugs requires adherence to CDSCO Rule 65:
- Must retain prescription records for a minimum of 2 years.
- Must record doctor's name, patient address, batch number, and Registered Pharmacist (R.Ph) verification.
- Must prevent duplicate prescription reuse ("doctor shopping") across different digital and physical counters.

### Decision Taken
1. Integrate the **Ayushman Bharat Health Account (ABHA)** 14-digit identifier into patient profiles to bridge national health records.
2. Store cryptographic prescription hashes on an immutable audit log.
3. Incorporate an AI-assisted Rx Verification Queue that checks doctor registration credentials against the National Medical Commission (NMC) registry, flags handwriting anomalies, and detects duplicate reuse across geofences within 24 hours.

### Reasoning
- Eliminates prescription recycling for controlled psychotropic substances.
- Fully aligns GenericMed with the Digital Personal Data Protection (DPDP) Act 2026 and ABDM (Ayushman Bharat Digital Mission) standards.

### Alternatives Considered
1. *Plain Image Upload Without Hash Checking:* Leaves the system vulnerable to duplicate claims and Photoshop tampering.
2. *Paper-Only Dispensation:* Incompatible with digital generic medicine access and home delivery.

### Impact on Project
- User profiles model `abhaId` alongside patient demographics ([UserProfileModal.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/auth/UserProfileModal.tsx), [AuthScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/auth/AuthScreen.tsx)).
- Governance console features a live `RxVerificationQueue` with confidence scoring and approval/rejection triggers in [PricingAnomalyView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/PricingAnomalyView.tsx).

---

## ADR-007: Tailwind CSS v4 Theme Tokenization & Material Symbols Font System

- **Date:** 2026-08-25
- **Status:** Accepted
- **Deciders:** UI/UX Lead, Frontend Engineer

### Context & Problem
GenericMed requires a medical-grade visual design: high contrast, deep navy accents, clinical teal highlights, clear warning reds, and crisp typographic hierarchy. It must look authoritative yet approachable for elderly patients.

### Decision Taken
- Standardize styling on **Tailwind CSS v4** utilizing `@theme` token definitions in [index.css](file:///c:/Users/prana/Downloads/genericmed/src/index.css).
- Employ custom semantic color tokens:
  - `--color-primary`: `#0f172a` (Deep Slate Navy)
  - `--color-secondary`: `#006a61` (Clinical Deep Teal)
  - `--color-secondary-fixed`: `#89f5e7` (Vibrant Mint Teal)
  - `--color-surface`: `#f8f9ff` (Ultra-light Medical Blue-White)
  - `--color-error`: `#ba1a1a` (CDSCO Safety Warning Crimson)
- Pair **Inter** for readable UI body copy with **JetBrains Mono** for batch codes, ATC classification, and license numbers.
- Utilize **Google Material Symbols Outlined** for standard healthcare iconography.

### Reasoning
- Direct CSS variable injection via `@theme` enables seamless CSS variable consumption without configuration bloat.
- Material Symbols provide instant access to universal medical glyphs (`prescriptions`, `science`, `verified`, `storefront`).
- JetBrains Mono avoids visual ambiguity between numbers and letters (e.g., `0` vs `O`, `1` vs `I`) in drug batch numbers and GSTINs.

### Alternatives Considered
1. *Tailwind v3 Config (`tailwind.config.js`):* Replaced in favor of modern Tailwind CSS v4 `@theme` block in CSS for faster compilation and zero-JS configuration.
2. *FontAwesome:* Rejected due to licensing restrictions and heavier font file footprints.

### Impact on Project
- All custom utility typography classes (`.font-headline-md`, `.font-code-dense`, `.font-label-caps`) are defined in [index.css](file:///c:/Users/prana/Downloads/genericmed/src/index.css).
- Clean, consistent visual hierarchy across both Patient and Governance Console screens.

---

## ADR-008: Client-Side State Orchestration with LocalStorage Bridge

- **Date:** 2026-09-07
- **Status:** Accepted
- **Deciders:** Frontend Architect

### Context & Problem
During the current phase of development, GenericMed operates as a rich interactive client prototype demonstrating full user flows (authentication, multi-role switching, cart addition, dose logging, anomaly moderation). We need realistic persistence of user sessions and cart items across page reloads without introducing external database latency.

### Decision Taken
1. Persist the active user profile (`genericmed_user`) in browser `localStorage`.
2. Seed mock records with authentic Indian pharmaceutical fixtures (`DEMO_USERS`, `VERIFIED_OFFERS`, `CANONICAL_MOLECULES`).
3. Keep cart and admin audit queues reactive via top-level state in [App.tsx](file:///c:/Users/prana/Downloads/genericmed/src/App.tsx) and propagate handlers via typed component props.

### Reasoning
- Eliminates friction when testing role-specific features (switching from Rajesh Kumar [Patient] to Suresh Patel [Pharmacist] or Dr. Ananya Sharma [CDSCO Regulator]).
- Guarantees instant application bootstrap in any browser environment without external container dependencies.

### Alternatives Considered
1. *Redux Toolkit / Zustand:* Deferred until real backend REST/GraphQL microservices are integrated; React 19 state hoisting is sufficient and lightweight for current view states.
2. *Stateless Mock:* Rejected because refreshing the browser would clear user credentials and reset cart tests.

### Impact on Project
- Safe fallback defaults protect against empty or corrupted storage keys.
- Clean prop contracts prepare all components for immediate swap to TanStack Query / RTK Query upon API connection.

---

## ADR-009: Server-Side Gemini 2.0 Flash Prescription OCR & Clinical Reasoning

- **Date:** 2026-09-08
- **Status:** Accepted
- **Deciders:** AI Engineering Lead, Pharmacology Advisor

### Context & Problem
Physician handwritten prescriptions in India exhibit extreme graphical variance, regional script quirks, and abbreviated dosage regimens (e.g., "OD", "BD", "HS", "SOS"). Standard open-source OCR tools (like vanilla Tesseract) struggle with low-resolution mobile photographs, leading to catastrophic misreadings of dosages or drug strengths (e.g., misreading 5mg as 50mg).

### Decision Taken
Incorporate **Google Gen AI SDK (`@google/genai`)** powered by **Gemini 2.0 Flash** strictly on the backend/server-side execution boundary:
1. **Multimodal Analysis:** Pass prescription image buffers alongside CDSCO canonical drug taxonomies to extract active salts, strengths, and dosage frequency.
2. **Clinical Conflict & NTI Safeguards:** Prompt Gemini with rigid system instructions and structured JSON schemas to cross-reference extracted molecules against Narrow Therapeutic Index (NTI) lists and drug-drug interaction contraindications.
3. **Zero Frontend Leaks:** Keep all Gemini API calls server-side to safeguard private API keys and patient PII.

### Reasoning
- Gemini 2.0 Flash provides sub-second multimodal inference with medical taxonomy comprehension.
- Structured JSON output schemas guarantee deterministic API payloads compatible with [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts).
- Falls back safely to manual Pharmacist Review Queue if AI confidence score drops below 0.85.

### Alternatives Considered
1. *Client-Side Direct Gemini Calls:* Rejected due to severe security exposure of API keys and violation of Indian DPDP Act guidelines.
2. *Traditional Rule-Based Regex OCR:* Rejected due to an unacceptable 38% error rate on cursive doctor handwriting.

### Impact on Project
- Backend runtime packages `@google/genai` (version `^2.4.0`) are integrated in `package.json`.
- Metadata configuration declares `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` in [metadata.json](file:///c:/Users/prana/Downloads/genericmed/metadata.json).

---

## ADR-010: Express Modular API Gateway with Vite Dev Proxy Bridge

- **Date:** 2026-09-08
- **Status:** Accepted
- **Deciders:** Full-Stack Architect, DevOps Lead

### Context & Problem
During local development and automated CI testing, running separate frontend (Vite:3000) and backend (Express:5000) ports introduces CORS friction, cookie domain fragmentation, and complex developer onboarding scripts.

### Decision Taken
Establish an **Express Modular API Gateway** running in tandem with Vite's integrated development proxy:
1. Configure `vite.config.ts` to proxy all requests beginning with `/api/` to the local Node.js Express server.
2. Organize Express routes following domain boundaries: `/api/v1/auth`, `/api/v1/molecules`, `/api/v1/cart`, `/api/v1/compliance`, `/api/v1/adherence`.
3. Support standalone production bundle serving via `express.static()` pointing to `dist/`.

### Reasoning
- Transparent same-origin URL paths (`/api/v1/...`) for all frontend fetch calls, eliminating CORS preflight overhead.
- Single unified command workflow during development and production container deployment.
- Seamless compatibility with Cloud Run containerized deployment targets.

### Alternatives Considered
1. *Next.js App Router Migration:* Rejected as it would require rewriting React 19 client components and discarding the battle-tested Vite 6 toolchain.
2. *Hardcoded Absolute URLs:* Rejected because hardcoded ports (`http://localhost:5000`) break when deployed behind production load balancers.

### Impact on Project
- `express` and `dotenv` added to production dependencies in `package.json`.
- Developer velocity maximized with hot module replacement (HMR) on client code while preserving realistic REST API semantics.
