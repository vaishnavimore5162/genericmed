# Project Rules & AI Operating Guidelines

These rules are **mandatory and non-negotiable** for any AI assistant or developer working on the **GenericMed** codebase. Every change must comply with these guidelines.

---

## 1. Golden Invariant: Never Break Existing Functionality

> [!CAUTION]
> **Zero Regressions Mandate**
> Never alter, rename, or remove existing functionality unless explicitly instructed by the user.

- **Dual-Modality Integrity:** The application must always support both the **Patient Mobile App** mode (with smartphone frame toggle) and the **Clinical Governance Console** mode. Changes to one mode must never break or cause side effects in the other.
- **Contract Stability:** Do not modify existing property names or shapes in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts) without migrating all consumers across [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts), patient screens, and admin screens.
- **Mock Data Integrity:** Maintain all initial mock records in [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts). Do not delete existing demo users, offers, molecules, or anomaly cases.
- **Navigation Safety:** All navigation switches (`patientScreen`, `adminTab`, `appMode`) must preserve valid fallback defaults so the user is never stranded on a blank view.

---

## 2. Coding Standards

### 2.1 TypeScript Standards
- **Strict Typing:** All code must compile cleanly under `tsc --noEmit`. Run `cmd /c "npx tsc --noEmit"` to verify before completing changes.
- **Ban `any`:** Never use `any`. Use `unknown` with type narrowing or define explicit interfaces/unions in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts).
- **Explicit Component Props:** Every React component must have a clearly typed props interface:
  ```typescript
  // DO
  interface MedicineDetailsScreenProps {
    onNavigate: (screen: string) => void;
    onAddToCart: (offer: MedicineOffer) => void;
    cartCount: number;
    onShowToast: (message: string) => void;
  }
  export const MedicineDetailsScreen: React.FC<MedicineDetailsScreenProps> = ({ ... }) => { ... };

  // DON'T
  export const MedicineDetailsScreen = (props: any) => { ... };
  ```
- **Optional Fields vs Undefined:** Explicitly designate optional properties with `?` rather than `type | undefined`.

### 2.2 React 19 Best Practices
- **Functional Components:** Use function components with `React.FC<Props>` or standard typed function syntax. Class components are strictly prohibited.
- **Hooks Rules:** Never call hooks conditionally or inside loops. Use standard `useState`, `useMemo`, `useCallback`, and `useEffect`.
- **Immutable State Updates:** Always update state immutably:
  ```typescript
  // DO
  setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));

  // DON'T
  cartItems.find(i => i.id === id).quantity += 1;
  ```
- **Key Props in Lists:** Always provide a unique, stable `key` (e.g., `item.id` or `code`) when rendering lists. Do not use array indices as keys for dynamic lists.

### 2.3 Accessibility (a11y) & HTML Semantics
- Use semantic HTML tags: `<main>`, `<header>`, `<nav>`, `<section>`, `<article>`, `<button>`.
- Never use a `<div>` with an `onClick` when a `<button>` is appropriate. If a clickable card is necessary, add `role="button"`, `tabIndex={0}`, and an accessible `aria-label`.
- All icon-only buttons must supply an explicit `aria-label` (e.g., `aria-label="Close modal"`).

---

## 3. Folder Structure Rules

The project enforces a strict domain-driven modular structure:

```
c:/Users/prana/Downloads/genericmed/
├── public/                 # Static public assets (favicons, manifest)
├── src/
│   ├── components/         # UI Component layers
│   │   ├── admin/          # Clinical Governance Console views & widgets
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── CatalogEquivalenceView.tsx
│   │   │   ├── PharmacyOnboardingView.tsx
│   │   │   └── PricingAnomalyView.tsx
│   │   ├── auth/           # Authentication & Profile management
│   │   │   ├── AuthScreen.tsx
│   │   │   └── UserProfileModal.tsx
│   │   ├── common/         # Shared cross-mode UI widgets
│   │   │   ├── ToastNotification.tsx
│   │   │   └── TopNavigationPortalBar.tsx
│   │   └── patient/        # Patient-facing mobile screens
│   │       ├── CartCheckoutScreen.tsx
│   │       ├── MedicineDetailsScreen.tsx
│   │       ├── OrderTrackingScreen.tsx
│   │       ├── PatientAdherenceScreen.tsx
│   │       └── SearchCompareScreen.tsx
│   ├── data/               # Static datasets, fixtures & mock entities
│   │   └── mockData.ts
│   ├── types.ts            # Global TypeScript domain definitions
│   ├── index.css           # Tailwind v4 theme & typography utilities
│   ├── main.tsx            # React root mount entrypoint
│   └── App.tsx             # Root orchestrator & portal mode switcher
├── changelog.md            # Version change history
├── decisions.md            # Architectural decision records
├── memory.md               # Long-term domain & technical memory
└── rules.md                # AI and developer operating guidelines
```

### Placement Rules:
1. **New Patient Screens:** Must reside in [`src/components/patient/`](file:///c:/Users/prana/Downloads/genericmed/src/components/patient) and follow the `*Screen.tsx` suffix.
2. **New Admin Views:** Must reside in [`src/components/admin/`](file:///c:/Users/prana/Downloads/genericmed/src/components/admin) and follow the `*View.tsx` suffix.
3. **Shared Widgets:** Place reusable widgets (modals, badges, alert banners) in [`src/components/common/`](file:///c:/Users/prana/Downloads/genericmed/src/components/common).
4. **Data Entities:** Shared domain types belong in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts). Never define global models locally inside a component file.
5. **Fixtures & Mock Data:** Mock state and demo datasets belong in [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts).

---

## 4. Naming Conventions

| Entity | Convention | Example |
| :--- | :--- | :--- |
| **Component Files** | PascalCase with extension | `SearchCompareScreen.tsx`, `AdminSidebar.tsx` |
| **Utility / Hook Files** | camelCase with extension | `useDissolutionScore.ts`, `formatCurrency.ts` |
| **TypeScript Interfaces** | PascalCase (no `I` prefix) | `MedicineOffer`, `CanonicalMolecule` |
| **TypeScript Types / Unions** | PascalCase | `UserRole`, `DosePeriod` |
| **React Components** | PascalCase | `TopNavigationPortalBar` |
| **Event Handler Props** | `on` + PascalCase Action | `onNavigate`, `onAddToCart`, `onShowToast` |
| **Event Handler Implementations** | `handle` + PascalCase Action | `handleAddToCart`, `handleProceedToPay` |
| **Constants / Fixture Tables** | UPPER_SNAKE_CASE | `CANONICAL_MOLECULES`, `DEMO_USERS` |
| **CSS Custom Properties** | `--` + kebab-case | `--color-primary`, `--color-secondary-fixed` |
| **Documentation Files** | lowercase with `.md` | [decisions.md](file:///c:/Users/prana/Downloads/genericmed/decisions.md), [rules.md](file:///c:/Users/prana/Downloads/genericmed/rules.md), [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md), [changelog.md](file:///c:/Users/prana/Downloads/genericmed/changelog.md) |

---

## 5. UI/UX Consistency Rules

### 5.1 Color Tokens & Theme Usage
Only use defined theme color tokens from [index.css](file:///c:/Users/prana/Downloads/genericmed/src/index.css):

```css
Primary Background (Console / App Root):  #070e1b / #f8f9ff
Primary Brand Slate:                     #0f172a (--color-primary)
Clinical Teal (Accent & Success):         #006a61 (--color-secondary)
Mint Teal Fixed:                         #89f5e7 (--color-secondary-fixed)
Light Blue Tint (Card / Container):      #eff4ff / #e5eeff
Warning / Lock Red:                      #ba1a1a (--color-error)
Warning Container (Soft Red):            #ffdad6 (--color-error-container)
```

- **Prohibited:** Do not use arbitrary unvetted hex colors like `#ff0000` or `#00ff00`. Use calibrated semantic tokens.

### 5.2 Typography System
Always use the standardized typography classes declared in [index.css](file:///c:/Users/prana/Downloads/genericmed/src/index.css):
- `.font-headline-lg` (24px, 600 weight)
- `.font-headline-md` (18px, 600 weight)
- `.font-headline-sm` (16px, 600 weight)
- `.font-body-lg` (15px, 400 weight)
- `.font-body-md` / `.font-body-md-semibold` (13px, 400/600 weight)
- `.font-body-sm` (12px, 400 weight)
- `.font-label-caps` (10px, 700 weight, uppercase tracking)
- `.font-code-dense` (JetBrains Mono, 11px) for drug codes, ATC classes, license numbers, and batch IDs.

### 5.3 Iconography
- Use **Google Material Symbols Outlined** loaded in [index.html](file:///c:/Users/prana/Downloads/genericmed/index.html):
  ```html
  <span className="material-symbols-outlined text-[20px] text-[#006a61]">verified</span>
  ```
- Standardize exclusively on **Google Material Symbols Outlined** for healthcare and administrative iconography.

### 5.4 Dual-Viewport Handling
- **Patient Screen Container:** Must support both phone-framed presentation (`max-w-[430px]` with camera notch and home indicator) and full-width responsive view via `isPhoneFramed` toggle.
- **Admin View Container:** Must expand fluidly (`max-w-7xl mx-auto`) with responsive grids (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).

---

## 6. Git Commit Rules

The repository follows the **Conventional Commits** specification:

```
<type>(<scope>): <short imperative summary>

[optional body explaining motivation and consequences]

[optional footer(s)]
```

### 6.1 Allowed Types
- `feat`: A new user-facing feature or view
- `fix`: A bug fix
- `docs`: Documentation updates only (e.g., updating [memory.md](file:///c:/Users/prana/Downloads/genericmed/memory.md) or [changelog.md](file:///c:/Users/prana/Downloads/genericmed/changelog.md))
- `style`: Formatting, missing semicolons, CSS alignment (no logic change)
- `refactor`: Code restructuring without functional changes
- `perf`: Performance optimization
- `test`: Adding or correcting tests
- `chore`: Build scripts, dependencies, configuration

### 6.2 Allowed Scopes
- `patient`: Patient mobile screens, search, cart, adherence
- `admin`: Clinical governance console, catalog, anomaly monitor, onboarding
- `auth`: User login, registration, ABHA validation, profile modal
- `arch`: Architecture diagrams, layer models, data flows
- `types`: Domain type contracts in [types.ts](file:///c:/Users/prana/Downloads/genericmed/src/types.ts)
- `mock`: Fixtures and mock data in [mockData.ts](file:///c:/Users/prana/Downloads/genericmed/src/data/mockData.ts)
- `core`: Root orchestration, routing, and shared infrastructure in [App.tsx](file:///c:/Users/prana/Downloads/genericmed/src/App.tsx)

### 6.3 Commit Rules
- Use the **imperative mood** in the summary: "add generic filter" (NOT "added generic filter" or "adds generic filter").
- Do not capitalize the first letter of the subject after the colon.
- Do not end the subject with a period.

---

## 7. Security and Environment Variable Rules

1. **Client-Side Secret Isolation:**
   - Never embed secret API keys (e.g., `GEMINI_API_KEY`, database passwords, private keys) directly into frontend components.
   - Any client-accessible environment variable in Vite must use the `VITE_` prefix (`import.meta.env.VITE_*`).
   - Server-side keys must remain strictly in backend execution environments or injected at runtime by Cloud Run.

2. **Compliance with Healthcare Regulations:**
   - **DPDP Act 2026:** Mask all personally identifiable information (PII). Aadhaar numbers must only display the last 4 digits (e.g., `XXXX-XXXX-3819`).
   - **CDSCO Rule 65:** Prescription files must be represented by cryptographic SHA-256 hashes rather than raw public URLs.
   - **Narcotic / Schedule X Tracking:** Any Schedule X transaction must enforce dual-copy physical register logging.

3. **Data Mutation & Tenant Safety:**
   - Any database operation must validate `tenant_id` at the boundary to prevent cross-tenant data leaks.
   - User roles (`patient`, `pharmacist`, `regulator`) must be checked before rendering privileged governance actions.

---

## 8. Summary Checklist Before Completing Any Task

Before marking any coding task complete, verify:

- [ ] Does `npm run build` or `npx tsc --noEmit` pass with zero type errors?
- [ ] Are all existing patient and admin features functioning without regressions?
- [ ] Are new files organized in the correct folder under `src/components/`?
- [ ] Are domain types defined in `src/types.ts`?
- [ ] Have design tokens and typography classes from `src/index.css` been used consistently?
- [ ] Have relevant changes been reflected in `memory.md` and `changelog.md`?
