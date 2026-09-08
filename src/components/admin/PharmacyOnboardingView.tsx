import React, { useState } from 'react';
import { ASSETS, PHARMACY_APPLICANTS } from '../../data/mockData';
import { PharmacyApplicant } from '../../types';

interface PharmacyOnboardingViewProps {
  onShowToast: (msg: string) => void;
}

export const PharmacyOnboardingView: React.FC<PharmacyOnboardingViewProps> = ({ onShowToast }) => {
  const [selectedApplicant, setSelectedApplicant] = useState<PharmacyApplicant>(PHARMACY_APPLICANTS[0]);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showSuspensionModal, setShowSuspensionModal] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('Geofence Mismatch & Below-Floor Dumping');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">PENDING VERIFICATION</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">14</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">+3 added today</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">pending_actions</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">VERIFIED STORES</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">1,428</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">Form 20/21 active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#89f5e7]/30 text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">FLAGGED ANOMALIES</span>
            <div className="font-headline-lg text-[#ba1a1a] font-bold mt-1 text-[24px]">7</div>
            <div className="font-body-sm text-[#ba1a1a] text-[11px] mt-0.5">Risk score &lt; 50</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">EXPIRING LICENSES</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">23</div>
            <div className="font-body-sm text-[#45464d] text-[11px] mt-0.5">Renewals &lt; 30 days</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">event_repeat</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Onboarding Queue & Investigation Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Applicant Queue */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Pharmacy Licensing Queue</h2>
              <p className="font-body-sm text-[#45464d] text-[12px]">CDSCO Form 20/21 &amp; Registered Pharmacist matching</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="h-8 px-2 rounded-lg bg-[#eff4ff] text-[11px] font-label-sm text-[#0b1c30] border border-[#e5eeff]">
                <option>All States (India)</option>
                <option>Karnataka (BLR)</option>
                <option>Maharashtra (MUM)</option>
                <option>Delhi (NCR)</option>
              </select>
              <button
                onClick={() => onShowToast('Refreshed CDSCO state portal sync')}
                className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#45464d] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b border-[#e5eeff] text-[#45464d] font-label-caps text-[10px]">
                  <th className="pb-2 font-semibold">Store / Applicant</th>
                  <th className="pb-2 font-semibold">Drug License</th>
                  <th className="pb-2 font-semibold">Pharmacist Match</th>
                  <th className="pb-2 font-semibold">Risk Level</th>
                  <th className="pb-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {PHARMACY_APPLICANTS.map((app) => {
                  const isSelected = selectedApplicant.id === app.id;
                  return (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApplicant(app)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#eff4ff]/80 font-medium' : 'hover:bg-[#f8f9ff]'
                      }`}
                    >
                      <td className="py-3 pr-2">
                        <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">{app.name}</div>
                        <div className="text-[11px] text-[#45464d]">{app.location}</div>
                        <div className="font-code-dense text-[10px] text-[#006a61]">GST: {app.gstin}</div>
                      </td>

                      <td className="py-3 pr-2">
                        <div className="font-code-dense text-[11px] text-[#0b1c30] font-semibold">{app.dlNumber}</div>
                        <div className="text-[10px] text-[#45464d]">{app.dlType}</div>
                        <div className="text-[10px] text-[#45464d]">Exp: {app.dlExpiry}</div>
                      </td>

                      <td className="py-3 pr-2">
                        <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">{app.pharmacistName}</div>
                        <div className="font-code-dense text-[10px] text-[#45464d]">{app.pharmacistReg}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              app.pharmacistMatchPct === 100 ? 'bg-[#006a61]' : 'bg-[#ba1a1a]'
                            }`}
                          />
                          <span className="font-code-dense text-[10px] text-[#45464d]">
                            {app.pharmacistMatchPct}% Match
                          </span>
                        </div>
                      </td>

                      <td className="py-3 pr-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                            app.riskLevel === 'HIGH'
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : app.riskLevel === 'FAST-TRACK'
                              ? 'bg-[#89f5e7] text-[#00201d]'
                              : app.riskLevel === 'LOW'
                              ? 'bg-[#dce9ff] text-[#006a61]'
                              : 'bg-[#fff0c2] text-[#805b00]'
                          }`}
                        >
                          {app.riskLevel}: {app.riskScore}/100
                        </span>
                        <div className="text-[10px] text-[#45464d] mt-0.5">{app.riskDetail}</div>
                      </td>

                      <td className="py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedApplicant(app);
                          }}
                          className="px-2 py-1 rounded bg-[#0f172a] text-white font-label-sm text-[11px] hover:opacity-90"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 5 Columns: Investigation Dossier */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <div>
              <span className="font-label-caps text-[#006a61] text-[10px]">CASE #INR-2026-092</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">{selectedApplicant.name}</h3>
              <p className="font-body-sm text-[#45464d] text-[11px]">{selectedApplicant.entityType}</p>
            </div>
            <span
              className={`px-2 py-1 rounded font-label-caps text-[10px] font-bold ${
                selectedApplicant.riskLevel === 'HIGH'
                  ? 'bg-[#ffdad6] text-[#93000a]'
                  : 'bg-[#89f5e7] text-[#00201d]'
              }`}
            >
              RISK: {selectedApplicant.riskScore}/100
            </span>
          </div>

          {/* Critical Geofence Failure Alert (if flagged) */}
          {selectedApplicant.geofenceMismatch && (
            <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/40 rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[18px]">location_off</span>
                <span className="font-body-md-semibold text-[13px]">Critical Geofence Mismatch</span>
              </div>
              <p className="font-body-sm text-[#45464d] text-[11px] leading-relaxed">
                {selectedApplicant.geofenceMismatch}
              </p>
            </div>
          )}

          {/* Evidence Dossier Documents */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[#45464d] text-[10px]">AUDIT EVIDENCE DOSSIER (3 UPLOADS)</span>
              <span className="font-label-sm text-[#006a61] text-[11px]">Click to inspect document</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div
                onClick={() => setSelectedDoc('dl')}
                className="bg-[#eff4ff] rounded-lg p-2 border border-[#dce9ff] cursor-pointer hover:border-[#006a61] transition-colors"
              >
                <div className="w-full h-20 rounded bg-white overflow-hidden mb-1">
                  <img src={ASSETS.form20Doc} alt="Form 20 DL" className="w-full h-full object-cover" />
                </div>
                <div className="font-label-sm text-[#0b1c30] text-[10px] font-semibold truncate">Form 20 DL</div>
                <div className="text-[9px] text-[#006a61]">Valid Exp 2025</div>
              </div>

              <div
                onClick={() => setSelectedDoc('rph')}
                className="bg-[#eff4ff] rounded-lg p-2 border border-[#dce9ff] cursor-pointer hover:border-[#006a61] transition-colors"
              >
                <div className="w-full h-20 rounded bg-white overflow-hidden mb-1">
                  <img src={ASSETS.pharmacistCert} alt="Pharmacist Cert" className="w-full h-full object-cover" />
                </div>
                <div className="font-label-sm text-[#0b1c30] text-[10px] font-semibold truncate">Pharmacist Cert</div>
                <div className="text-[9px] text-[#45464d]">KA-PCI-00912</div>
              </div>

              <div
                onClick={() => setSelectedDoc('storage')}
                className="bg-[#eff4ff] rounded-lg p-2 border border-[#dce9ff] cursor-pointer hover:border-[#006a61] transition-colors"
              >
                <div className="w-full h-20 rounded bg-white overflow-hidden mb-1">
                  <img src={ASSETS.coldStorage} alt="Cold Storage" className="w-full h-full object-cover" />
                </div>
                <div className="font-label-sm text-[#0b1c30] text-[10px] font-semibold truncate">Storage Facility</div>
                <div className="text-[9px] text-[#ba1a1a]">Non-Compliant</div>
              </div>
            </div>
          </div>

          {/* Flagged Listing (if applicable) */}
          {selectedApplicant.flaggedListing && (
            <div className="bg-[#eff4ff] rounded-xl p-3 space-y-1.5 border border-[#e5eeff]">
              <div className="flex items-center justify-between">
                <span className="font-body-md-semibold text-[#0b1c30] text-[12px]">Suspicious Listing Flagged</span>
                <span className="font-label-caps text-[#ba1a1a] text-[10px] font-bold">-52% DEVIATION</span>
              </div>
              <div className="text-[11px] text-[#45464d]">
                {selectedApplicant.flaggedListing.medicine}: Quoted at{' '}
                <span className="font-bold text-[#ba1a1a]">₹14.50</span> (Benchmark ₹48.00, Generic Floor ₹21.00). Below
                mandated raw material floor.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-[#eff4ff] space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onShowToast(`Provisional 30-day compliance license granted to ${selectedApplicant.name}`);
                }}
                className="flex-1 h-9 rounded-lg bg-[#006a61] text-white font-body-md-semibold text-[12px] hover:bg-[#006f66]"
              >
                Grant Access
              </button>

              <button
                onClick={() => {
                  onShowToast(`Field inspection notice dispatched to ${selectedApplicant.applicantOwner}`);
                }}
                className="flex-1 h-9 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-body-md-semibold text-[12px] border border-[#c6c6cd] hover:bg-[#e5eeff]"
              >
                Request Clarification
              </button>
            </div>

            <button
              onClick={() => setShowSuspensionModal(true)}
              className="w-full h-9 rounded-lg bg-[#ffdad6] text-[#93000a] font-body-md-semibold text-[12px] hover:bg-[#ffb4ab] transition-colors"
            >
              Emergency Store Suspension (Section 66A)
            </button>
          </div>
        </div>
      </div>

      {/* Document Inspector Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-headline-sm text-[#0b1c30]">
                {selectedDoc === 'dl' && 'CDSCO Form 20 Retail Drug License'}
                {selectedDoc === 'rph' && 'Registered Pharmacist State Council Certificate'}
                {selectedDoc === 'storage' && 'Physical Storage Inspection Telemetry'}
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="h-96 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-[#e5eeff]">
              <img
                src={
                  selectedDoc === 'dl'
                    ? ASSETS.form20Doc
                    : selectedDoc === 'rph'
                    ? ASSETS.pharmacistCert
                    : ASSETS.coldStorage
                }
                alt="Document View"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#45464d]">Signed &amp; Stamped by Licensing Authority</span>
              <button
                onClick={() => {
                  onShowToast('Document cryptographically certified by CDSCO node');
                  setSelectedDoc(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#006a61] text-white font-body-md-semibold"
              >
                Mark Validated
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspension Modal */}
      {showSuspensionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
              <h4 className="font-headline-sm text-[17px]">Issue Emergency Store Suspension</h4>
            </div>

            <p className="font-body-sm text-[#45464d] text-[12px] leading-relaxed">
              This action will immediately freeze all live inventory, invalidate active cart checkouts, and dispatch an
              adjudication notice to the State Drug Controller pursuant to CDSCO Section 66A.
            </p>

            <div className="space-y-1">
              <label className="font-label-sm text-[#0b1c30] text-[11px]">Primary Adjudication Reason</label>
              <input
                type="text"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-[#c6c6cd] text-[12px]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSuspensionModal(false)}
                className="flex-1 h-9 rounded-lg bg-[#eff4ff] text-[#45464d] font-body-md-semibold text-[12px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onShowToast(`Store ${selectedApplicant.name} suspended under CDSCO Sec 66A`);
                  setShowSuspensionModal(false);
                }}
                className="flex-1 h-9 rounded-lg bg-[#ba1a1a] text-white font-body-md-semibold text-[12px]"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
