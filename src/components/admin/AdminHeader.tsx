import React from 'react';
import { ASSETS } from '../../data/mockData';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  onSwitchToPatientView: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onSwitchToPatientView,
  onShowToast,
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#e5eeff] px-6 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-headline-sm text-[#0b1c30] text-[17px] font-bold">{title}</h1>
          <p className="font-body-sm text-[#45464d] text-[12px]">{subtitle}</p>
        </div>

        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#e5eeff]">
          <span className="font-code-dense text-[11px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#006a61] font-semibold border border-[#dce9ff]">
            PROD-INDIA-CENTRAL
          </span>
          <span className="flex items-center gap-1 font-label-sm text-[#006a61] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#006a61]" />
            CDSCO Gateway: 99.98%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick mobile view launcher */}
        <button
          onClick={onSwitchToPatientView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#006a61] hover:bg-[#e5eeff] font-body-md-semibold text-[12px] border border-[#86f2e4]/60 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">devices</span>
          <span>Patient App Preview</span>
        </button>

        {/* Real-time Search */}
        <div className="relative hidden md:flex items-center">
          <span className="material-symbols-outlined absolute left-2.5 text-[#76777d] text-[18px]">search</span>
          <input
            type="text"
            placeholder="Search license, GSTIN, molecule..."
            className="w-56 h-9 pl-9 pr-3 rounded-lg bg-[#eff4ff] text-[12px] font-body-sm text-[#0b1c30] focus:outline-none focus:ring-1 focus:ring-[#006a61] border border-transparent focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <button
          onClick={() => onShowToast('3 high-priority geofence discrepancies logged')}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-[#45464d] hover:bg-[#eff4ff] relative"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#e5eeff]">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#e5eeff] border border-[#c6c6cd]">
            <img src={ASSETS.ananyaAvatar} alt="Dr. Ananya Sharma" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">Dr. Ananya Sharma</div>
            <div className="font-label-caps text-[#006a61] text-[9px]">Super Admin • CDSCO Liaison</div>
          </div>
        </div>
      </div>
    </header>
  );
};
