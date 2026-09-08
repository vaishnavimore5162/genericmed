import React, { useState } from 'react';

interface SystemArchitectureViewProps {
  onShowToast: (msg: string) => void;
}

export const SystemArchitectureView: React.FC<SystemArchitectureViewProps> = ({ onShowToast }) => {
  const [activeFlow, setActiveFlow] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<string>('Order & Cart Module');

  const flows = [
    {
      id: 1,
      title: 'Flow 1: Medicine Search & Bioequivalence Lookup',
      steps: [
        '1. Patient enters generic or brand name in Mobile App',
        '2. Request routes through Edge Layer (CDN cache check -> WAF inspection -> API Gateway)',
        '3. Search Module queries Canonical Medicine Registry & In-Vitro Dissolution database',
        '4. Bioequivalence engine computes f2 similarity factor and matches verified pharmacy offers',
        '5. Geofence distance & real-time store stock filtered before returning payload',
      ],
    },
    {
      id: 2,
      title: 'Flow 2: Order Placement & Multi-Store Smart Split',
      steps: [
        '1. Patient adds Atorva-G (Apollo) and Jan-Amlodipine (PMBJP Kendra #402)',
        '2. Order Module validates doctor prescription hash via OCR / CDSCO gateway',
        '3. Smart Split engine partitions single order into Package 1 (Express) & Package 2 (Govt Slot)',
        '4. Payment Module processes UPI transaction with tenant-isolated escrow holding',
        '5. Webhook notifications dispatched concurrently to both pharmacy dispensary terminals',
      ],
    },
    {
      id: 3,
      title: 'Flow 3: Pharmacy Onboarding & CDSCO License Audit',
      steps: [
        '1. Pharmacy applicant uploads Form 20/21 license and Pharmacist registration certificate',
        '2. File Management module stores cryptographically hashed scans in private cloud vault',
        '3. Geofencing telemetry cross-references registered GSTIN GPS coordinate with audit device IP',
        '4. Pricing anomaly detector validates initial catalog quote against API raw material floor',
        '5. Super Admin inspects dossier in Governance Console before provisional activation',
      ],
    },
    {
      id: 4,
      title: 'Flow 4: Patient Chronic Adherence & WhatsApp Alerts',
      steps: [
        '1. Cron scheduler queries active chronic prescriptions for morning (8:00 AM) & night (9:00 PM)',
        '2. Notification Module constructs patient-specific dosage reminders with pill identification photos',
        '3. External WhatsApp / SMS Gateway transmits alert with one-tap "Mark as Taken" action',
        '4. Patient confirmation updates 28-day adherence ring and streak telemetry',
        '5. Day 25 triggers Auto-Refill pipeline preview to prevent stock-outs',
      ],
    },
  ];

  const modules = [
    { name: 'User Management Module', desc: 'Patient profiles, doctors, medical store owners, and staff authentication.' },
    { name: 'Tenant Management Module', desc: 'Pharmacy store isolation, multi-branch hierarchy, and license metadata.' },
    { name: 'Product & Medicine Module', desc: 'Canonical molecules, salt formulations, dissolution curves, and brand mappings.' },
    { name: 'Seller / Pharmacy Module', desc: 'Inventory synchronization, batch expiry tracking, and cold-chain logs.' },
    { name: 'Order & Cart Module', desc: 'Multi-store order splitting, package dispatch orchestration, and status tracking.' },
    { name: 'Payment & Billing Module', desc: 'UPI Auto-Pay mandates, multi-vendor commission escrow, and GST tax invoices.' },
    { name: 'Notification Module', desc: 'WhatsApp adherence alerts, SMS OTPs, push notifications, and email reports.' },
    { name: 'Search & Filter Module', desc: 'Semantic generic-to-brand search, geolocation proximity, and price filters.' },
    { name: 'Review & Rating Module', desc: 'Pharmacist reliability ratings, delivery speed benchmarks, and patient feedback.' },
    { name: 'Reporting & Analytics Module', desc: 'Clinical governance KPIs, regional consumption trends, and savings metrics.' },
    { name: 'File Management Module', desc: 'Secure storage of prescriptions, Form 20 licenses, and lab test certificates.' },
    { name: 'Audit & Activity Log Module', desc: 'Immutable CDSCO regulatory audit trail, tamper logs, and login telemetry.' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title Card */}
      <div className="bg-white rounded-xl p-5 border border-[#e5eeff] shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a61] text-[24px]">schema</span>
            <h2 className="font-headline-md text-[#0b1c30] text-[20px] font-bold">
              System Architecture Diagram - Multi-tenant SaaS Platform
            </h2>
          </div>
          <p className="font-body-md text-[#45464d] text-[13px] mt-1">
            Complete technical blueprint of the modular monolith, edge layer, multi-store smart split engine, and
            database tenancy isolation.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Exported architecture diagram as SVG/PNG')}
          className="h-9 px-3 rounded-lg bg-[#0f172a] text-white font-body-md-semibold text-[12px] flex items-center gap-1.5 hover:opacity-90"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Export Blueprint</span>
        </button>
      </div>

      {/* Layer-by-Layer Architectural Visualization */}
      <div className="space-y-4">
        {/* Layer 1: Clients */}
        <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white font-code-dense text-[10px] font-bold">
                LAYER 1
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Clients</h3>
            </div>
            <span className="font-label-sm text-[#45464d] text-[11px]">Multi-Device Frontend Ecosystem</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
            {[
              { label: 'Patient Mobile App', icon: 'smartphone', tech: 'React / PWA' },
              { label: 'Medical Store Portal', icon: 'storefront', tech: 'Web Dashboard' },
              { label: 'Pharma Co. Portal', icon: 'domain', tech: 'Manufacturer Ext' },
              { label: 'System Admin Panel', icon: 'admin_panel_settings', tech: 'Operations UI' },
              { label: 'Super Admin Console', icon: 'shield_person', tech: 'Regulatory CRO' },
              { label: 'Third-Party API', icon: 'api', tech: 'REST / GraphQL' },
            ].map((c, i) => (
              <div key={i} className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] text-center space-y-1">
                <span className="material-symbols-outlined text-[#006a61] text-[22px]">{c.icon}</span>
                <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">{c.label}</div>
                <div className="font-code-dense text-[#45464d] text-[10px]">{c.tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center -my-2">
          <span className="material-symbols-outlined text-[#006a61] text-[20px]">arrow_downward</span>
        </div>

        {/* Layer 2: Edge Layer */}
        <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#006a61] text-white font-code-dense text-[10px] font-bold">
                LAYER 2
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Edge Layer &amp; Ingress</h3>
            </div>
            <span className="font-label-sm text-[#006a61] text-[11px] font-semibold">
              SSL Termination • Rate Limiting • WAF
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {[
              { label: 'DNS Layer', sub: 'Route 53 / Anycast', icon: 'dns' },
              { label: 'Global CDN', sub: 'CloudFront Edge Cache', icon: 'public' },
              { label: 'WAF Security', sub: 'OWASP Rule Screening', icon: 'security' },
              { label: 'Load Balancer', sub: 'Nginx Ingress / ALB', icon: 'balance' },
              { label: 'API Gateway', sub: 'Reverse Proxy & Auth', icon: 'router' },
            ].map((e, i) => (
              <div key={i} className="bg-[#89f5e7]/20 p-3 rounded-xl border border-[#86f2e4]/50 text-center space-y-1">
                <span className="material-symbols-outlined text-[#006a61] text-[20px]">{e.icon}</span>
                <div className="font-body-md-semibold text-[#00201d] text-[12px]">{e.label}</div>
                <div className="font-code-dense text-[#005049] text-[10px]">{e.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center -my-2">
          <span className="material-symbols-outlined text-[#006a61] text-[20px]">arrow_downward</span>
        </div>

        {/* Layer 3: Application Layer (Modular Monolith) */}
        <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#131b2e] text-[#89f5e7] font-code-dense text-[10px] font-bold">
                LAYER 3
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Application Layer (Modular Monolith)</h3>
            </div>
            <span className="font-label-sm text-[#45464d] text-[11px]">12 Core Domain Modules</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {modules.map((m, i) => {
              const isSelected = selectedModule === m.name;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedModule(m.name)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#eff4ff] border-[#006a61] shadow-sm'
                      : 'bg-[#f8f9ff] border-[#e5eeff] hover:border-[#c6c6cd]'
                  }`}
                >
                  <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">{m.name}</div>
                  <p className="font-body-sm text-[#45464d] text-[10px] mt-1 line-clamp-2">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center -my-2">
          <span className="material-symbols-outlined text-[#006a61] text-[20px]">arrow_downward</span>
        </div>

        {/* Layer 4 & 5: IAM/RBAC & External Integrations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IAM & RBAC */}
          <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 border-b border-[#eff4ff] pb-2">
              <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white font-code-dense text-[10px] font-bold">
                LAYER 4
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">IAM &amp; RBAC Control</h3>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Roles (6 Defined)</span>
                <span className="font-code-dense text-[11px] text-[#45464d]">
                  Patient, Store, Staff, Pharma, Admin, Super Admin
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Tenant Isolation</span>
                <span className="font-code-dense text-[11px] text-[#006a61] font-bold">
                  JWT claim: tenant_id
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Permissions</span>
                <span className="font-code-dense text-[11px] text-[#45464d]">
                  Module &amp; Action granular matrix
                </span>
              </div>
            </div>
          </div>

          {/* External Integrations */}
          <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 border-b border-[#eff4ff] pb-2">
              <span className="px-2 py-0.5 rounded bg-[#006a61] text-white font-code-dense text-[10px] font-bold">
                LAYER 5
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">External Integrations</h3>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Payment Escrow</span>
                <span className="font-code-dense text-[11px] text-[#0b1c30]">UPI Auto-Pay / Razorpay / Stripe</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Regulatory &amp; Drugs</span>
                <span className="font-code-dense text-[11px] text-[#006a61] font-bold">
                  CDSCO Gateway, GS1 Traceability
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex justify-between items-center">
                <span className="font-body-md-semibold text-[#0b1c30]">Communication</span>
                <span className="font-code-dense text-[11px] text-[#0b1c30]">Twilio, WhatsApp Business API</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downward Connector Arrow */}
        <div className="flex justify-center -my-2">
          <span className="material-symbols-outlined text-[#006a61] text-[20px]">arrow_downward</span>
        </div>

        {/* Layer 6: Database Multi-Tenant Architecture */}
        <div className="bg-white rounded-xl border border-[#e5eeff] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#0f172a] text-white font-code-dense text-[10px] font-bold">
                LAYER 6
              </span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Database Multi-Tenant Architecture</h3>
            </div>
            <span className="font-code-dense text-[#006a61] text-[11px] font-bold">
              Shared Database, Shared Schema (tenant_id)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#eff4ff] space-y-1">
              <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">Shared DB &amp; Shared Schema</div>
              <p className="font-body-sm text-[#45464d] text-[11px]">
                Cost-effective pooling with strict indexed <code className="text-[#006a61] font-bold">tenant_id</code>{' '}
                columns on every table and Firestore security rules.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] space-y-1">
              <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">Row-Level Security (RLS)</div>
              <p className="font-body-sm text-[#45464d] text-[11px]">
                PostgreSQL RLS policies guarantee no cross-tenant data leakage even during concurrent querying.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] space-y-1">
              <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">Read Replicas &amp; Redis Cache</div>
              <p className="font-body-sm text-[#45464d] text-[11px]">
                Canonical drug monographs and bioequivalence curves are cached in Redis to achieve sub-10ms response
                times.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Business Data Flows Walkthrough */}
      <div className="bg-white rounded-xl border border-[#e5eeff] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
          <div>
            <span className="font-label-caps text-[#006a61] text-[10px]">EXECUTION TRACE</span>
            <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">Core Business Data Flow Walkthroughs</h3>
          </div>
          <span className="font-label-sm text-[#45464d] text-[11px]">Select flow to trace pipeline</span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {flows.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFlow(f.id)}
              className={`px-3 py-2 rounded-xl text-[12px] font-body-md-semibold whitespace-nowrap transition-all ${
                activeFlow === f.id
                  ? 'bg-[#006a61] text-white shadow-sm'
                  : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#dce9ff]'
              }`}
            >
              Flow {f.id}: {f.title.split(':')[1]?.trim() || f.title}
            </button>
          ))}
        </div>

        {/* Active Flow Pipeline Display */}
        {(() => {
          const curr = flows.find((f) => f.id === activeFlow) || flows[0];
          return (
            <div className="bg-[#f8f9ff] rounded-xl p-4 border border-[#e5eeff] space-y-3">
              <h4 className="font-body-md-semibold text-[#0b1c30] text-[14px]">{curr.title}</h4>
              <div className="space-y-2">
                {curr.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[12px]">
                    <div className="w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="font-body-sm text-[#0b1c30] leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Multi-Tenant SaaS Principles Panel */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#131b2e] text-white rounded-xl p-5 space-y-4">
        <h3 className="font-headline-sm text-white text-[17px]">Multi-Tenant SaaS Architecture Principles</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[12px]">
          <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="font-label-caps text-[#89f5e7] text-[10px]">1. STRICT TENANT ISOLATION</span>
            <p className="text-white/80 text-[11px] leading-relaxed">
              Every database query automatically includes tenant_id verification injected at the ORM layer.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="font-label-caps text-[#89f5e7] text-[10px]">2. STATELESS APP SERVERS</span>
            <p className="text-white/80 text-[11px] leading-relaxed">
              Session state is stored in distributed Redis tokens, enabling effortless zero-downtime auto-scaling.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="font-label-caps text-[#89f5e7] text-[10px]">3. REGULATORY COMPLIANCE</span>
            <p className="text-white/80 text-[11px] leading-relaxed">
              CDSCO Drug Rule 65 record retention, immutable logging, and DPDP Act 2026 data sovereignty.
            </p>
          </div>

          <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="font-label-caps text-[#89f5e7] text-[10px]">4. COST OPTIMIZATION</span>
            <p className="text-white/80 text-[11px] leading-relaxed">
              Smart split fulfillment clusters delivery routes across nearby Jan Aushadhi hubs and private stores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
