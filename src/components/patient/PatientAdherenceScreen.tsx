import React, { useState } from 'react';
import { DOSAGE_SCHEDULE } from '../../data/mockData';
import { DoseScheduleItem } from '../../types';

interface PatientAdherenceScreenProps {
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const PatientAdherenceScreen: React.FC<PatientAdherenceScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [doses, setDoses] = useState<DoseScheduleItem[]>(DOSAGE_SCHEDULE);
  const [autoRenew, setAutoRenew] = useState(true);

  const handleMarkTaken = (id: string) => {
    setDoses((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            status: 'taken',
            statusText: `Logged ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          };
        }
        return d;
      })
    );
    onShowToast('Dose logged! Streak updated to 29 days (97%)');
  };

  const handleSnooze = (id: string) => {
    onShowToast('Reminder snoozed for 15 minutes');
  };

  return (
    <div className="flex flex-col relative w-full bg-[#f8f9ff] min-h-screen text-[#0b1c30]">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('search')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0b1c30] hover:bg-[#eff4ff]"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div>
              <span className="font-label-caps text-[#006a61] text-[10px]">PATIENT CARE DESK</span>
              <h1 className="font-headline-sm text-[#0b1c30] text-[15px]">Regimen &amp; Adherence</h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onShowToast('Clinical report exported as PDF')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff]"
              title="Export Report"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff]"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 py-3.5 space-y-3.5 pb-24">
        {/* Patient Overview & Cumulative Savings Bento */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] border-2 border-[#86f2e4] flex items-center justify-center text-[#006a61] font-bold text-[18px]">
                RK
              </div>
              <div>
                <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Rajesh Kumar</h2>
                <p className="font-body-sm text-[#45464d] text-[12px]">Age 54 • Hypertension &amp; T2D Profile</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                  <span className="font-label-sm text-[#006a61] text-[11px]">Active Chronic Care Protocol</span>
                </div>
              </div>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#e5eeff]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#006a61]"
                  strokeDasharray="96, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="font-headline-sm text-[#006a61] font-bold text-[13px]">96%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-[#eff4ff] p-3 rounded-lg">
              <span className="font-label-caps text-[#45464d] text-[10px]">28-Day Adherence</span>
              <div className="font-headline-sm text-[#0b1c30] font-bold mt-0.5 text-[15px]">27 / 28 Days</div>
              <div className="font-label-sm text-[#006a61] text-[11px] mt-0.5">Gold Tier Compliance</div>
            </div>

            <div className="bg-[#89f5e7]/30 p-3 rounded-lg border border-[#86f2e4]/50">
              <span className="font-label-caps text-[#005049] text-[10px]">Cumulative Generic Savings</span>
              <div className="font-headline-sm text-[#00201d] font-bold mt-0.5 text-[16px]">₹14,280</div>
              <div className="font-label-sm text-[#006a61] text-[11px] mt-0.5">Saved This Year (84%)</div>
            </div>
          </div>
        </div>

        {/* Today's Dose Schedule */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">calendar_today</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">Today's Dose Schedule</h3>
            </div>
            <span className="font-code-dense text-[#45464d] text-[11px]">OCT 24, 2026</span>
          </div>

          <div className="space-y-2.5">
            {doses.map((dose) => (
              <div
                key={dose.id}
                className={`bg-white rounded-xl p-3.5 shadow-sm border transition-all ${
                  dose.status === 'due'
                    ? 'border-[#006a61] ring-1 ring-[#006a61]/30'
                    : dose.status === 'taken'
                    ? 'border-[#e5eeff] opacity-80'
                    : 'border-[#e5eeff]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-caps text-[#45464d] text-[10px]">{dose.period} • {dose.time}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] ${
                          dose.status === 'taken'
                            ? 'bg-[#e5eeff] text-[#006a61]'
                            : dose.status === 'due'
                            ? 'bg-[#ffdad6] text-[#93000a] font-bold animate-pulse'
                            : 'bg-[#eff4ff] text-[#45464d]'
                        }`}
                      >
                        {dose.statusText}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-[#0b1c30] mt-1 text-[15px]">{dose.medicineName}</h4>
                    <p className="font-body-sm text-[#45464d] text-[12px]">{dose.instructions}</p>
                    <span className="font-code-dense text-[#006a61] text-[10px] mt-1 inline-block">
                      {dose.dosage}
                    </span>
                  </div>

                  {dose.status === 'due' && (
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => handleMarkTaken(dose.id)}
                        className="h-8 px-3 rounded-lg bg-[#006a61] text-white font-body-md-semibold text-[12px] flex items-center gap-1 shadow hover:bg-[#006f66] active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        <span>Take</span>
                      </button>
                      <button
                        onClick={() => handleSnooze(dose.id)}
                        className="h-7 px-2 rounded-lg bg-[#eff4ff] text-[#45464d] font-label-sm text-[11px] hover:bg-[#e5eeff]"
                      >
                        Snooze 15m
                      </button>
                    </div>
                  )}

                  {dose.status === 'taken' && (
                    <div className="w-8 h-8 rounded-full bg-[#89f5e7]/40 flex items-center justify-center text-[#006a61]">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                  )}

                  {dose.status === 'upcoming' && (
                    <div className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d]">
                      <span className="material-symbols-outlined text-[18px]">alarm</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Refill Pipeline: Scheduled Dispatch */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">autorenew</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">Auto-Refill Pipeline</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#89f5e7] text-[#00201d] font-label-caps text-[10px] font-bold">
              UPI MANDATE ACTIVE
            </span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">Scheduled Dispatch in 5 Days</span>
              <span className="font-code-dense text-[#006a61] text-[11px] font-semibold">Buffer: 3 Days Stock</span>
            </div>
            <p className="font-body-sm text-[#45464d] text-[12px]">
              Multi-store smart order split optimization automatically batches your 3 monthly chronic medications across
              nearby partner stores to minimize delivery cost and maximize generic discounts.
            </p>

            <div className="pt-2 border-t border-[#dce9ff] space-y-2">
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006a61]">storefront</span>
                  <span className="font-body-md-semibold">Package A: Apollo Pharmacy</span>
                  <span className="text-[#45464d]">(Express 45m)</span>
                </div>
                <span className="font-code-dense font-bold">₹110.00</span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#006a61]">account_balance</span>
                  <span className="font-body-md-semibold">Package B: Jan Aushadhi #402</span>
                  <span className="text-[#45464d]">(Govt Rate)</span>
                </div>
                <span className="font-code-dense font-bold">₹18.00</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-label-caps text-[#45464d] text-[10px]">Consolidated Monthly Refill</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-sm text-[#006a61] font-bold text-[18px]">₹128.00</span>
                <span className="font-body-sm line-through text-[#76777d] text-[12px]">MRP ₹746.00</span>
                <span className="font-label-caps text-[#006a61] text-[11px] font-bold">Save 83%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowToast('Refill cycle paused for 7 days')}
                className="h-8 px-2.5 rounded-lg border border-[#c6c6cd] text-[#45464d] font-label-sm text-[11px] hover:bg-[#eff4ff]"
              >
                Pause
              </button>
              <button
                onClick={() => {
                  onNavigate('orders');
                  onShowToast('Refill dispatched immediately under express priority');
                }}
                className="h-8 px-3 rounded-lg bg-[#006a61] text-white font-body-md-semibold text-[12px] shadow hover:bg-[#006f66]"
              >
                Dispatch Now
              </button>
            </div>
          </div>
        </div>

        {/* Doctor Prescription Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">verified</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Active Prescription</h3>
            </div>
            <span className="font-code-dense text-[#006a61] text-[11px]">5 REFILLS REMAINING</span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-lg space-y-1">
            <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Dr. Arvind Rao, MD (Cardiology)</div>
            <div className="font-code-dense text-[#45464d] text-[11px]">Reg: KMC-48291 • Narayana Hrudayalaya</div>
            <div className="text-[11px] text-[#45464d]">Valid till: 28 Dec 2026 • Digitally e-Signed (Aadhaar)</div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="renew"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61] focus:ring-[#006a61]"
              />
              <label htmlFor="renew" className="font-body-sm text-[#0b1c30] text-[12px]">
                Auto-request renewal from physician at cycle 6
              </label>
            </div>
            <button
              onClick={() => onShowToast('Prescription image opened in secure DPDP viewer')}
              className="text-[#006a61] font-label-sm text-[11px] hover:underline"
            >
              View Rx
            </button>
          </div>
        </div>

        {/* RPh Helpline */}
        <div className="rounded-xl bg-[#e5eeff] p-3.5 flex items-center justify-between gap-2 border border-[#c6c6cd]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006a61] shadow-sm">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div>
              <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Dedicated Pharmacist Helpdesk</div>
              <div className="font-body-sm text-[#45464d] text-[11px]">Questions about dose adjustment or generic salt?</div>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Connecting to Registered Clinical Pharmacist on duty...')}
            className="h-8 px-3 rounded-lg bg-[#0f172a] text-white font-body-md-semibold text-[11px] shrink-0 hover:opacity-90"
          >
            Call RPh
          </button>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5eeff]">
        <div className="h-16 px-2 flex items-center justify-around">
          <button
            onClick={() => onNavigate('search')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[22px]">medication</span>
            <span className="font-label-sm text-[11px]">Search</span>
          </button>

          <button
            onClick={() => onNavigate('details')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[22px]">difference</span>
            <span className="font-label-sm text-[11px]">Bioequivalence</span>
          </button>

          <button
            onClick={() => onNavigate('adherence')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#006a61] font-body-md-semibold"
          >
            <span className="material-symbols-outlined text-[22px]">prescriptions</span>
            <span className="font-label-sm text-[11px]">Regimen</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            <span className="font-label-sm text-[11px]">Orders</span>
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="font-label-sm text-[11px]">Cart</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
