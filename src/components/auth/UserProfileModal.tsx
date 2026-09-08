import React from 'react';
import { UserProfile } from '../../types';
import { DEMO_USERS } from '../../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onSwitchUser: (user: UserProfile) => void;
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onSwitchUser,
  onNavigate,
  onShowToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#e5eeff] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0b1c30] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3.5 pr-8">
              <div className="w-14 h-14 rounded-full bg-[#006a61] text-[#89f5e7] flex items-center justify-center font-bold text-[22px] border-2 border-[#86f2e4]/40 shrink-0">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  currentUser.name.charAt(0)
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-headline-sm text-white text-[16px] font-bold truncate">
                    {currentUser.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#006a61] text-[#89f5e7] border border-[#86f2e4]/30 uppercase font-semibold">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-[12px] text-[#cbdbf5] truncate mt-0.5">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#86f2e4]">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4]" />
                    CDSCO &amp; ABHA Verified
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-left">
              <span className="font-label-caps text-[#89f5e7] text-[10px]">GUEST SESSION</span>
              <h3 className="font-headline-sm text-white text-[17px] font-bold mt-0.5">Not Signed In</h3>
              <p className="text-[12px] text-[#cbdbf5] mt-1">
                Sign in to sync digital prescriptions, track adherence, and unlock Jan Aushadhi rates.
              </p>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {currentUser ? (
            <>
              {/* Account Credentials Card */}
              <div className="bg-[#f8f9ff] rounded-2xl p-4 border border-[#e5eeff] space-y-2.5">
                <div className="text-[11px] font-label-caps text-[#006a61] uppercase tracking-wider font-semibold">
                  Identity &amp; Regulatory Credentials
                </div>

                {currentUser.abhaId && (
                  <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5eeff]">
                    <span className="text-[#45464d] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#006a61]">health_and_safety</span>
                      ABHA ID (NHA)
                    </span>
                    <span className="font-mono font-bold text-[#0b1c30]">{currentUser.abhaId}</span>
                  </div>
                )}

                {currentUser.licenseNumber && (
                  <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5eeff]">
                    <span className="text-[#45464d] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#006a61]">local_pharmacy</span>
                      Drug License (Form 20/21)
                    </span>
                    <span className="font-mono font-bold text-[#0b1c30]">{currentUser.licenseNumber}</span>
                  </div>
                )}

                {currentUser.pharmacistRegNo && (
                  <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5eeff]">
                    <span className="text-[#45464d]">Pharmacy Council Reg</span>
                    <span className="font-mono font-semibold text-[#0b1c30]">{currentUser.pharmacistRegNo}</span>
                  </div>
                )}

                {currentUser.regulatorOfficerId && (
                  <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5eeff]">
                    <span className="text-[#45464d]">CDSCO Inspector Code</span>
                    <span className="font-mono font-bold text-[#ba1a1a]">{currentUser.regulatorOfficerId}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[12px] py-1 border-b border-[#e5eeff]">
                  <span className="text-[#45464d]">Mobile Number</span>
                  <span className="font-medium text-[#0b1c30]">{currentUser.phone}</span>
                </div>

                <div className="flex items-center justify-between text-[12px] py-1">
                  <span className="text-[#45464d]">Location / Pincode</span>
                  <span className="font-medium text-[#0b1c30]">
                    {currentUser.city || 'Bengaluru'} ({currentUser.pincode || '560034'})
                  </span>
                </div>
              </div>

              {/* Quick Jump Links */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('adherence');
                  }}
                  className="p-3 bg-[#eff4ff] hover:bg-[#e5eeff] rounded-xl text-left border border-[#dce9ff] transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[#006a61] text-[12px] font-bold">
                    <span className="material-symbols-outlined text-[17px]">calendar_clock</span>
                    <span>My Regimen</span>
                  </div>
                  <div className="text-[11px] text-[#45464d] mt-1">29-day adherence streak</div>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onNavigate('orders');
                  }}
                  className="p-3 bg-[#eff4ff] hover:bg-[#e5eeff] rounded-xl text-left border border-[#dce9ff] transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-[#006a61] text-[12px] font-bold">
                    <span className="material-symbols-outlined text-[17px]">local_shipping</span>
                    <span>Active Orders</span>
                  </div>
                  <div className="text-[11px] text-[#45464d] mt-1">Package in transit (22.4°C)</div>
                </button>
              </div>

              {/* Switch Demo Persona */}
              <div>
                <div className="text-[11px] font-label-caps text-[#45464d] uppercase mb-2">
                  Switch Active Persona
                </div>
                <div className="space-y-1.5">
                  {DEMO_USERS.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSwitchUser(u);
                        onShowToast(`Switched active profile to ${u.name}`);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left text-[12px] flex items-center justify-between transition-colors ${
                        currentUser.id === u.id
                          ? 'bg-[#eff4ff] border-[#006a61] text-[#006a61] font-semibold'
                          : 'bg-white border-[#e5eeff] text-[#0b1c30] hover:bg-[#f8f9ff]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                        <span>{u.name}</span>
                        <span className="text-[10px] text-[#45464d] uppercase font-mono">({u.role})</span>
                      </div>
                      {currentUser.id === u.id && (
                        <span className="material-symbols-outlined text-[16px] text-[#006a61]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#006a61] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px]">account_circle</span>
              </div>
              <p className="text-[13px] text-[#45464d]">
                Please sign in or create an account to view prescriptions and manage orders.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('auth');
                }}
                className="w-full h-10 rounded-xl bg-[#006a61] text-white font-body-md-semibold text-[13px] hover:bg-[#00524b] transition-colors"
              >
                Go to Sign In / Register
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8f9ff] border-t border-[#e5eeff] flex items-center justify-between gap-3">
          {currentUser ? (
            <>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                  onShowToast('Signed out successfully');
                }}
                className="px-4 py-2 text-[12px] font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Sign Out</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('auth');
                }}
                className="px-4 py-2 text-[12px] font-semibold text-[#006a61] bg-white border border-[#cbdbf5] hover:bg-[#eff4ff] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">switch_account</span>
                <span>Manage / Re-login</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2 text-[12px] font-semibold text-[#45464d] hover:bg-[#eff4ff] rounded-xl"
            >
              Continue as Guest
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
