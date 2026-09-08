# Changelog

All notable changes to the **GenericMed** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Express backend REST API route skeleton under `/api/v1/` for molecules, offers, and cart splitting.
- PostgreSQL schema migration scripts with Row-Level Security (RLS) policies for `tenant_id`.
- Multimodal prescription parsing using Gemini 2.0 Flash (`@google/genai 2.4.0`) on the Express backend.
- Razorpay / Cashfree UPI escrow test mode webhook handlers.

### Changed
- Transition in-memory state mutations in governance views to asynchronous API dispatchers.

### Fixed
- Pending integration test fixes for edge-case cold-chain package splits.

### Removed
- Deprecated legacy hardcoded mock latency delays in favor of real async handlers.

---

## [0.4.0] - 2026-09-08

### Added
- **Persistent AI Context Documentation & Alignment:**
  - [decisions.md](file:///c:/Users/prana/Downloads/genericmed/decisions.md): Comprehensive Architecture Decision Records (ADR-001 through ADR-010).
  - [rules.md](file:///c:/Users/prana/Downloads/genericmed/rules.md): Mandatory AI coding standards, strict folder structure, naming conventions, and security guidelines.
  - [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md): Long-term domain memory, tech stack specs, 12-module API catalog, and database ERD.
  - [changelog.md](file:///c:/Users/prana/Downloads/genericmed/changelog.md): Full version change history.
  - Documented completed interactive UI features in [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md): Clinical FAQ Accordion, Document Viewer Modal, Persona Switcher, and Suspension Modal.
- **Authentication & Role-Based Access Control (RBAC):**
  - Full-featured [AuthScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/auth/AuthScreen.tsx) with toggle between Mobile OTP (6-digit simulated verification) and password login.
  - 3-role registration forms for **Patient**, **Registered Pharmacist (R.Ph)**, and **CDSCO Central Drug Inspector**.
  - Ayushman Bharat Health Account (ABHA) 14-digit ID input and validation.
  - Form 20/21 drug license and State Pharmacy Council registration inputs.
- **User Profile Management & Session Persistence:**
  - [UserProfileModal.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/auth/UserProfileModal.tsx) displaying demographic details, license badges, and active prescription counters.
  - One-tap demo user persona switcher (Rajesh Kumar [Patient], Suresh Patel [Pharmacist], Dr. Ananya Sharma [CDSCO Regulator]).
  - Synchronized `localStorage` session bridge (`genericmed_user`) preventing session loss upon browser reload.

### Changed
- Synchronized [package.json](file:///c:/Users/prana/Downloads/genericmed/package.json) project name to `"genericmed"` and version to `"0.4.0"`.
- Clearly designated Section 5 (API Endpoints) and Section 6 (PostgreSQL Schema) in [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md) as **Target Backend Architecture (Specification Only)**, explicitly clarifying that they represent planned specifications rather than currently implemented endpoints or database tables.
- Standardized iconography guidelines in [rules.md](file:///c:/Users/prana/Downloads/genericmed/rules.md) exclusively on Google Material Symbols Outlined.
- Enhanced [TopNavigationPortalBar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/common/TopNavigationPortalBar.tsx) and [AdminHeader.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/AdminHeader.tsx) to display active user credentials and profile avatar trigger.
- Updated [App.tsx](file:///c:/Users/prana/Downloads/genericmed/src/App.tsx) state machine to pass authenticated user profile to [SearchCompareScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/SearchCompareScreen.tsx) and [CartCheckoutScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/CartCheckoutScreen.tsx).

### Fixed
- Fixed profile modal backdrop overflow on mobile viewports.
- Fixed role indicator badge alignment on dark navigation surfaces.

### Removed
- Removed the entire "System Architecture / SaaS Architecture" console section:
  - Deleted `SystemArchitectureView.tsx` component (`SaaS Platform Architecture & Multi-Tenant Blueprint`, 6-layer model, and 12-module definitions).
  - Removed "4. System Architecture" tab from [TopNavigationPortalBar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/common/TopNavigationPortalBar.tsx).
  - Removed "System Architecture" menu item from [AdminSidebar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/AdminSidebar.tsx).
  - Removed architecture header mapping and conditional render branch from [App.tsx](file:///c:/Users/prana/Downloads/genericmed/src/App.tsx).
  - Removed unused `architectureDiagram` asset reference from [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts).
- Removed unused dependencies `motion` (`^12.23.24`) and `lucide-react` (`^0.546.0`) from [package.json](file:///c:/Users/prana/Downloads/genericmed/package.json), [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md), and [rules.md](file:///c:/Users/prana/Downloads/genericmed/rules.md) after verifying zero usage across the codebase.
- Removed hardcoded static user mocks from [App.tsx](file:///c:/Users/prana/Downloads/genericmed/src/App.tsx) state root in favor of dynamic profile bridge.

---

## [0.3.0] - 2026-09-06

### Added
- **Clinical Governance Console:**
  - [AdminSidebar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/AdminSidebar.tsx): Collapsible navigation for Onboarding, Catalog, Anomalies, and Architecture views.
  - [AdminHeader.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/AdminHeader.tsx): Contextual title bar with quick switch back to Patient mode and toast alerts.
- **Pharmacy Onboarding & Verification Console ([PharmacyOnboardingView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/PharmacyOnboardingView.tsx)):**
  - Verification queue for state pharmacy applicants.
  - CDSCO Form 20/21 document review cards with inspection checklists.
  - Registered Pharmacist (R.Ph) credential verification and percentage match metrics.
  - Physical geofence mismatch telemetry detecting distance discrepancies between GSTIN and device telemetry.
  - Risk scoring classification: `HIGH`, `LOW`, `MED`, and `FAST-TRACK`.
- **Canonical Medicine Catalog & Equivalence Engine ([CatalogEquivalenceView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/CatalogEquivalenceView.tsx)):**
  - Searchable National CDSCO Master Index covering 4,800+ molecules.
  - Moore-Flanner ($f_2$) similarity score calculation display.
  - Comparative in-vitro dissolution curves (Innovator vs Generic Test batch).
  - Narrow Therapeutic Index (NTI) dispensing directive and guardrail controls.
- **Pricing Anomaly Monitor & Rx Audit Queue ([PricingAnomalyView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/PricingAnomalyView.tsx)):**
  - Sub-floor price anti-dumping detection with diagnostic reasons.
  - Counterfeit formulation and near-expiry spoilage alerts.
  - Live CDSCO Schedule H1/X audit queue with duplicate prescription reuse alerts and Aadhaar e-Sign validation.
  - One-click compliance locking action (`FR-CORE-02`).
- **Interactive System Architecture Blueprint ([SystemArchitectureView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/SystemArchitectureView.tsx)):**
  - 6-Layer visual architecture: Clients, Edge Ingress, Modular Monolith (12 modules), IAM/RBAC, External Integrations, and Multi-tenant DB with RLS.
  - Interactive walkthrough for 4 core business data flows: Search & Bioequivalence, Smart Split Fulfillment, Pharmacy Onboarding, and Chronic Adherence.
  - Multi-tenant SaaS principles reference panel.

### Changed
- Standardized admin cards on medical-grade `#eff4ff` and `#f8f9ff` container styling.
- Upgraded KPI summary blocks to 4-column responsive grid layouts.

### Fixed
- Corrected Moore-Flanner calculation edge case when test and reference dissolution points are identical.
- Resolved table horizontal scrolling issues on narrow desktop viewports in [CatalogEquivalenceView.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/admin/CatalogEquivalenceView.tsx).

### Removed
- Removed placeholder tabular data in favor of authentic Indian pharmaceutical fixtures in [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts).

---

## [0.2.0] - 2026-09-01

### Added
- **Patient Mobile App Experience:**
  - [SearchCompareScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/SearchCompareScreen.tsx): Semantic brand-to-generic lookup, savings percentage pill (`86% Cheaper`), and verified offer listings.
  - [MedicineDetailsScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/MedicineDetailsScreen.tsx): Deep chemical breakdown, salt composition, bioequivalence validation badge, and store availability.
  - [CartCheckoutScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/CartCheckoutScreen.tsx): Multi-store smart split engine segregating orders into **Package 1 (Apollo Express 35-min)** and **Package 2 (Govt Jan Aushadhi Kendra #402)**.
  - Strict generic bioequivalence substitution toggle under NMC 2023 guidelines.
  - [PatientAdherenceScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/PatientAdherenceScreen.tsx): Chronic dose schedule (Morning, Afternoon, Night) with one-tap "Take Dose" logging and 28-day compliance ring score (92%).
  - [OrderTrackingScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/OrderTrackingScreen.tsx): Multi-package fulfillment tracking with live cold-chain telemetry (4.2°C) and Jan Aushadhi pickup countdown.
- **Common Components:**
  - [ToastNotification.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/common/ToastNotification.tsx): Auto-dismissing toast notification with green clinical accent.
  - [TopNavigationPortalBar.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/common/TopNavigationPortalBar.tsx): Switcher between Patient App and Governance Console with cart count badge.

### Changed
- Refactored cart calculation logic to accurately account for multi-store delivery charges (free express above threshold, ₹15 for Jan Aushadhi hub).
- Enhanced mobile viewport frame toggle to switch between responsive phone frame (iPhone/Android notch) and full-width layout.

### Fixed
- Fixed cart badge counter not updating immediately when items were added from [MedicineDetailsScreen.tsx](file:///c:/Users/prana/Downloads/genericmed/src/components/patient/MedicineDetailsScreen.tsx).
- Corrected delivery fee computation when crossing free express delivery threshold.

### Removed
- Removed single-vendor checkout flow in favor of multi-store smart split fulfillment.

---

## [0.1.0] - 2026-08-20

### Added
- Initial project scaffolding using **Vite 6** and **React 19**.
- TypeScript strict configuration (`tsconfig.json`).
- **Tailwind CSS v4** integration with `@theme` custom token design system in [index.css](file:///c:/Users/prana/Downloads/genericmed/src/index.css).
- Google Fonts integration for **Inter** (UI body) and **JetBrains Mono** (pharmaceutical code typography).
- Google Material Symbols Outlined font for healthcare iconography.
- Global domain models in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts) (`MedicineOffer`, `CartItem`, `CanonicalMolecule`, `PharmacyApplicant`, `PricingAnomaly`, `UserProfile`).
- Authentic Indian pharmaceutical mock fixtures in [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts) (Atorvastatin, Metformin, Amlodipine, PMBJP Kendras).
- Interactive smartphone framing container with camera notch and home indicator bar.

### Changed
- Configured build scripts for `vite build` and `tsc --noEmit` validation in `package.json`.

### Fixed
- Fixed CSS font-family fallback cascading for JetBrains Mono in table cells.

### Removed
- Removed default starter Vite boilerplate and CSS assets.
