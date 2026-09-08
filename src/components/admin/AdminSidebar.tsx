import React from 'react';
import { ASSETS } from '../../data/mockData';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onSwitchToPatientView: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onSwitchToPatientView,
}) => {
  const menuItems = [
    {
      id: 'onboarding',
      label: 'Pharmacy Onboarding',
      icon: 'storefront',
      badge: '14',
      badgeColor: 'bg-[#ffdad6] text-[#93000a]',
    },
    {
      id: 'catalog',
      label: 'Catalog & Equivalence',
      icon: 'science',
      badge: 'f2 Engine',
      badgeColor: 'bg-[#89f5e7] text-[#00201d]',
    },
    {
      id: 'anomalies',
      label: 'Pricing & Rx Audits',
      icon: 'monitoring',
      badge: '19 Flagged',
      badgeColor: 'bg-[#ffdad6] text-[#93000a]',
    },
  ];

  const enforcementItems = [
    { id: 'form20', label: 'Form 20/21 Audits', icon: 'gavel' },
    { id: 'scheduleh', label: 'Schedule H1/X Registers', icon: 'medical_services' },
    { id: 'geofence', label: 'Geofence & Telemetry', icon: 'pin_drop' },
    { id: 'dpdp', label: 'DPDP Audit Vault', icon: 'lock' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col shrink-0 border-r border-[#1e293b] select-none h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={ASSETS.logoConsole} alt="GenericMed" className="h-7 w-auto object-contain brightness-110" />
          <div>
            <div className="font-headline-sm text-white font-bold text-[14px] leading-tight">GenericMed</div>
            <div className="font-label-caps text-[#89f5e7] text-[9px] tracking-wider">REGULATORY CONSOLE</div>
          </div>
        </div>
        <span className="font-code-dense text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">v1.4.2</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
        {/* Section 1 */}
        <div className="space-y-1">
          <span className="font-label-caps text-[#7c839b] text-[10px] px-2 block mb-1.5">CLINICAL &amp; REGULATORY</span>
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-body-md-semibold text-[13px] transition-all ${
                  isActive
                    ? 'bg-[#006a61] text-white shadow-md'
                    : 'text-[#cbdbf5] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-[#89f5e7]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`font-label-caps text-[9px] px-1.5 py-0.5 rounded font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Section 2: Enforcement */}
        <div className="space-y-1">
          <span className="font-label-caps text-[#7c839b] text-[10px] px-2 block mb-1.5">GOVERNANCE ENFORCEMENT</span>
          {enforcementItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab('onboarding')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#94a3b8] hover:bg-white/5 hover:text-white text-[12px] font-body-md transition-all text-left"
            >
              <span className="material-symbols-outlined text-[16px] text-[#7c839b]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Switch to Patient App CTA */}
      <div className="p-3 border-t border-[#1e293b] space-y-2">
        <button
          onClick={onSwitchToPatientView}
          className="w-full h-10 rounded-xl bg-gradient-to-r from-[#006a61] to-[#005049] text-white font-body-md-semibold text-[12px] flex items-center justify-center gap-2 shadow hover:opacity-90 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">smartphone</span>
          <span>Open Patient Mobile App</span>
        </button>

        {/* Node Telemetry */}
        <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between text-[10px] font-code-dense text-white/60">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89f5e7] animate-pulse" />
            <span>IN-DEL-NODE-09</span>
          </div>
          <span>24ms • 99.98%</span>
        </div>
      </div>
    </aside>
  );
};
