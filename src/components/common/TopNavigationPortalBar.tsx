import React from 'react';
import { UserProfile } from '../../types';

interface TopNavigationPortalBarProps {
  appMode: 'patient' | 'admin';
  onSetAppMode: (mode: 'patient' | 'admin') => void;
  patientScreen: string;
  onSetPatientScreen: (screen: string) => void;
  adminTab: string;
  onSetAdminTab: (tab: string) => void;
  isPhoneFramed: boolean;
  onTogglePhoneFrame: () => void;
  cartCount: number;
  currentUser?: UserProfile | null;
  onOpenProfile?: () => void;
}

export const TopNavigationPortalBar: React.FC<TopNavigationPortalBarProps> = ({
  appMode,
  onSetAppMode,
  patientScreen,
  onSetPatientScreen,
  adminTab,
  onSetAdminTab,
  isPhoneFramed,
  onTogglePhoneFrame,
  cartCount,
  currentUser,
  onOpenProfile,
}) => {
  return (
    <div className="bg-[#0b1c30] text-white border-b border-[#1e293b] px-3 py-2 flex items-center justify-between gap-2 text-[12px] select-none sticky top-0 z-50">
      {/* Left: Mode Toggle */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <div className="flex items-center bg-[#131b2e] rounded-lg p-0.5 border border-[#1e293b]">
          <button
            onClick={() => onSetAppMode('patient')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-body-md-semibold text-[11px] transition-all ${
              appMode === 'patient'
                ? 'bg-[#006a61] text-white shadow-sm'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            <span>Patient App</span>
          </button>

          <button
            onClick={() => onSetAppMode('admin')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-body-md-semibold text-[11px] transition-all ${
              appMode === 'admin'
                ? 'bg-[#006a61] text-white shadow-sm'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">security</span>
            <span>Governance Console</span>
          </button>
        </div>

        {/* Screen Quick Jumper */}
        {appMode === 'patient' ? (
          <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-[#1e293b] overflow-x-auto no-scrollbar">
            {[
              { id: 'search', label: '1. Search & Compare' },
              { id: 'details', label: '2. Bioequivalence Details' },
              { id: 'adherence', label: '3. Regimen & Adherence' },
              { id: 'cart', label: `4. Cart (${cartCount})` },
              { id: 'orders', label: '5. Order Tracking' },
              { id: 'auth', label: '6. Login / Register' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onSetPatientScreen(s.id)}
                className={`px-2 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
                  patientScreen === s.id
                    ? 'bg-white/20 text-[#89f5e7] font-semibold'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-[#1e293b] overflow-x-auto no-scrollbar">
            {[
              { id: 'onboarding', label: '1. Pharmacy Verification' },
              { id: 'catalog', label: '2. Catalog & Equivalence' },
              { id: 'anomalies', label: '3. Pricing & Rx Audits' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onSetAdminTab(t.id)}
                className={`px-2 py-1 rounded text-[11px] transition-colors whitespace-nowrap ${
                  adminTab === t.id
                    ? 'bg-white/20 text-[#89f5e7] font-semibold'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* User Account Button */}
        {currentUser ? (
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#131b2e] hover:bg-[#1e293b] text-white text-[11px] border border-[#1e293b] transition-colors"
            title="View Account Profile"
          >
            <div className="w-5 h-5 rounded-full bg-[#006a61] text-[#89f5e7] flex items-center justify-center text-[10px] font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <span className="hidden md:inline font-medium max-w-[100px] truncate">{currentUser.name}</span>
            <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-[#006a61]/60 text-[#89f5e7] border border-[#86f2e4]/30 hidden sm:inline">
              {currentUser.role}
            </span>
          </button>
        ) : (
          <button
            onClick={() => onSetPatientScreen('auth')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#006a61] hover:bg-[#00524b] text-white text-[11px] font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">login</span>
            <span>Login / Register</span>
          </button>
        )}

        {appMode === 'patient' && (
          <button
            onClick={onTogglePhoneFrame}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#131b2e] hover:bg-[#1e293b] text-[#cbdbf5] text-[11px] border border-[#1e293b]"
            title="Toggle Smartphone Frame vs Responsive View"
          >
            <span className="material-symbols-outlined text-[15px]">
              {isPhoneFramed ? 'aspect_ratio' : 'phone_iphone'}
            </span>
            <span className="hidden md:inline">{isPhoneFramed ? 'Expand Fullscreen' : 'Phone Frame (412px)'}</span>
          </button>
        )}

        <span className="font-code-dense text-[10px] text-[#89f5e7] px-2 py-0.5 rounded bg-[#006a61]/40 border border-[#86f2e4]/30 hidden lg:inline">
          CDSCO Compliant
        </span>
      </div>
    </div>
  );
};

