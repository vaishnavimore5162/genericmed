import React, { useState } from 'react';
import { PRICING_ANOMALIES, RX_AUDIT_QUEUE } from '../../data/mockData';
import { PricingAnomaly, RxVerificationQueueItem } from '../../types';

interface PricingAnomalyViewProps {
  onShowToast: (msg: string) => void;
}

export const PricingAnomalyView: React.FC<PricingAnomalyViewProps> = ({ onShowToast }) => {
  const [selectedCase, setSelectedCase] = useState<PricingAnomaly>(PRICING_ANOMALIES[0]);
  const [rxQueue, setRxQueue] = useState<RxVerificationQueueItem[]>(RX_AUDIT_QUEUE);

  const handleRxAction = (id: string, action: 'approved' | 'rejected' | 'blocked') => {
    setRxQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, status: action };
        }
        return item;
      })
    );
    onShowToast(`Prescription ${id} marked as ${action.toUpperCase()}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">FLAGGED PRICING ANOMALIES</span>
            <div className="font-headline-lg text-[#ba1a1a] font-bold mt-1 text-[24px]">19</div>
            <div className="font-body-sm text-[#ba1a1a] text-[11px] mt-0.5">Below floor threshold</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">trending_down</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">PENDING RX AUDIT</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">42</div>
            <div className="font-body-sm text-[#45464d] text-[11px] mt-0.5">Sched H1 &amp; X checks</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">prescriptions</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">COUNTERFEIT RISK INDEX</span>
            <div className="font-headline-lg text-[#ba1a1a] font-bold mt-1 text-[24px]">8.4/10</div>
            <div className="font-body-sm text-[#ba1a1a] text-[11px] mt-0.5">High anomaly correlation</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">security</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">PATIENT OVERCHARGE PREVENTED</span>
            <div className="font-headline-lg text-[#006a61] font-bold mt-1 text-[24px]">₹4,18,500</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">Saved MTD via Fair Generic</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#89f5e7]/30 text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">savings</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Detections & Critical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Active Anomaly Detections & Rx Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Pricing Anomaly Detections Table */}
          <div className="bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Active Pricing Anomaly Detections</h2>
                <p className="font-body-sm text-[#45464d] text-[12px]">
                  Automated detection of dumping, counterfeit substitution, and margin inversion
                </p>
              </div>
              <span className="font-code-dense text-[11px] px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-bold">
                4 CRITICAL
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-[#e5eeff] text-[#45464d] font-label-caps text-[10px]">
                    <th className="pb-2 font-semibold">Seller / Case</th>
                    <th className="pb-2 font-semibold">Molecule</th>
                    <th className="pb-2 font-semibold">Quoted vs Floor</th>
                    <th className="pb-2 font-semibold">Anomaly Type</th>
                    <th className="pb-2 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eff4ff]">
                  {PRICING_ANOMALIES.map((anom) => {
                    const isSelected = selectedCase.id === anom.id;
                    return (
                      <tr
                        key={anom.id}
                        onClick={() => setSelectedCase(anom)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#eff4ff]/80 font-medium' : 'hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <td className="py-3 pr-2">
                          <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">{anom.sellerName}</div>
                          <div className="font-code-dense text-[10px] text-[#006a61]">{anom.caseId}</div>
                          <div className="text-[10px] text-[#45464d]">{anom.location}</div>
                        </td>

                        <td className="py-3 pr-2">
                          <div className="font-body-md-semibold text-[#0b1c30] text-[12px]">{anom.molecule}</div>
                          <div className="font-code-dense text-[10px] text-[#45464d]">MRP: ₹{anom.mrp.toFixed(2)}</div>
                        </td>

                        <td className="py-3 pr-2">
                          <div className="flex items-baseline gap-1">
                            <span className="font-code-dense text-[#ba1a1a] font-bold text-[13px]">
                              ₹{anom.quotedPrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-[#45464d]">(Floor ₹{anom.floorPrice.toFixed(2)})</span>
                          </div>
                          <span className="font-code-dense text-[#ba1a1a] text-[10px] font-bold">
                            {anom.deviationPct}% deviation
                          </span>
                        </td>

                        <td className="py-3 pr-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded font-label-caps text-[9px] font-bold ${
                              anom.anomalyType === 'Dumping' || anom.anomalyType === 'Counterfeit'
                                ? 'bg-[#ffdad6] text-[#93000a]'
                                : 'bg-[#fff0c2] text-[#805b00]'
                            }`}
                          >
                            {anom.anomalyType}
                          </span>
                        </td>

                        <td className="py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCase(anom);
                            }}
                            className="px-2 py-1 rounded bg-[#0f172a] text-white font-label-sm text-[11px]"
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

          {/* Schedule H/H1/X Rx Audit Queue */}
          <div className="bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">
                  Schedule H / H1 / X Prescription Audit Queue
                </h3>
                <p className="font-body-sm text-[#45464d] text-[12px]">
                  Real-time tamper detection, dual-use prevention, and physician digital signature verification
                </p>
              </div>
              <span className="font-code-dense text-[11px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#006a61] font-semibold">
                3 Pending
              </span>
            </div>

            <div className="space-y-3">
              {rxQueue.map((rx) => (
                <div
                  key={rx.id}
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    rx.status === 'blocked' || rx.status === 'rejected'
                      ? 'bg-[#f8f9ff] border-[#e5eeff] opacity-60'
                      : rx.flagType === 'error'
                      ? 'bg-[#ffdad6]/20 border-[#ba1a1a]/30'
                      : 'bg-[#89f5e7]/15 border-[#86f2e4]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-code-dense text-[#0b1c30] font-bold text-[12px]">{rx.rxNumber}</span>
                        <span className="px-1.5 py-0.2 rounded bg-black/10 text-[#0b1c30] font-label-caps text-[9px]">
                          {rx.schedule}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-label-caps text-[9px] font-bold ${
                            rx.flagType === 'error' ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#89f5e7] text-[#00201d]'
                          }`}
                        >
                          {rx.flagTitle}
                        </span>
                      </div>
                      <div className="font-body-md-semibold text-[#0b1c30] text-[13px] mt-1">{rx.medicine}</div>
                      <div className="text-[11px] text-[#45464d]">
                        {rx.doctor} • Patient: {rx.patient}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-code-dense text-[#006a61] text-[11px] font-bold">{rx.timeAgo}</span>
                      <div className="font-code-dense text-[10px] text-[#45464d]">{rx.confidenceNote}</div>
                    </div>
                  </div>

                  {rx.status === 'pending' ? (
                    <div className="flex justify-end gap-2 pt-1 border-t border-black/5">
                      <button
                        onClick={() => handleRxAction(rx.id, 'rejected')}
                        className="px-2.5 py-1 rounded bg-white border border-[#c6c6cd] text-[#ba1a1a] font-label-sm text-[11px] hover:bg-[#ffdad6]/30"
                      >
                        Reject Rx
                      </button>
                      <button
                        onClick={() => handleRxAction(rx.id, 'blocked')}
                        className="px-2.5 py-1 rounded bg-[#ba1a1a] text-white font-label-sm text-[11px] hover:bg-[#93000a]"
                      >
                        Block Dispense
                      </button>
                      <button
                        onClick={() => handleRxAction(rx.id, 'approved')}
                        className="px-2.5 py-1 rounded bg-[#006a61] text-white font-label-sm text-[11px] hover:bg-[#006f66]"
                      >
                        Approve Clearance
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end text-[11px] font-code-dense font-bold uppercase text-[#45464d]">
                      Status: {rx.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Gaussian KDE Pricing Distribution SVG Chart */}
          <div className="bg-[#eff4ff] rounded-xl p-4 space-y-2 border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">
                Market Floor vs Quoted Pricing Distribution (Atorvastatin 20mg)
              </span>
              <span className="font-code-dense text-[10px] text-[#ba1a1a] font-bold bg-white px-2 py-0.5 rounded">
                SUB-FLOOR DUMPING VIOLATION
              </span>
            </div>

            <p className="font-body-sm text-[#45464d] text-[11px]">
              Gaussian kernel density estimation across 480 verified seller quotes. Pricing below ₹21.00 indicates high
              risk of expired lot re-packaging or compromised active ingredient.
            </p>

            <div className="h-36 w-full bg-white rounded-lg p-2 relative flex items-center justify-center border border-[#c6c6cd]/30">
              <svg className="w-full h-full" viewBox="0 0 400 120">
                {/* Floor threshold line */}
                <line x1="120" y1="10" x2="120" y2="100" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="4 2" />
                <text x="125" y="22" fill="#ba1a1a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Generic Floor ₹21.00
                </text>

                {/* MRP ceiling line */}
                <line x1="360" y1="10" x2="360" y2="100" stroke="#76777d" strokeWidth="1" strokeDasharray="2 2" />
                <text x="310" y="22" fill="#76777d" fontSize="9" fontFamily="monospace">
                  DPCO Ceiling ₹128.50
                </text>

                {/* Bell curve distribution */}
                <path
                  d="M40,100 C100,98 120,40 180,25 C240,25 320,80 380,100"
                  fill="none"
                  stroke="#006a61"
                  strokeWidth="2.5"
                />

                {/* Shaded Violation area */}
                <path
                  d="M40,100 C70,99 100,80 120,40 L120,100 Z"
                  fill="#ba1a1a"
                  opacity="0.15"
                />

                {/* Quoted Point for QuickRelief */}
                <circle cx="80" cy="90" r="5" fill="#ba1a1a" className="animate-pulse" />
                <text x="85" y="85" fill="#ba1a1a" fontSize="9" fontWeight="bold" fontFamily="monospace">
                  Quoted: ₹14.50
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Deep-Dive Dossier for Critical Case #ANOM-2026-094 */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <div>
              <span className="font-label-caps text-[#ba1a1a] text-[10px]">CRITICAL DOSSIER</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">{selectedCase.caseId}</h3>
              <p className="font-body-sm text-[#45464d] text-[11px]">{selectedCase.sellerName}</p>
            </div>
            <span className="px-2 py-1 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px] font-bold">
              SEVERITY {selectedCase.severity}/10
            </span>
          </div>

          {/* Diagnostic Reason */}
          <div className="bg-[#eff4ff] p-3 rounded-xl space-y-1 border border-[#dce9ff]">
            <span className="font-label-caps text-[#45464d] text-[10px]">DIAGNOSTIC REASON</span>
            <p className="font-body-sm text-[#0b1c30] text-[12px] leading-relaxed">
              {selectedCase.diagnosticReason}
            </p>
          </div>

          {/* Comparative Price Gauge */}
          <div className="bg-white p-3 rounded-xl border border-[#e5eeff] space-y-2">
            <span className="font-label-caps text-[#45464d] text-[10px]">PRICE LEVEL COMPARISON</span>
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between">
                <span className="text-[#45464d]">Quoted Seller Price:</span>
                <span className="font-code-dense font-bold text-[#ba1a1a]">₹{selectedCase.quotedPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">CDSCO Generic Floor:</span>
                <span className="font-code-dense font-bold text-[#006a61]">₹{selectedCase.floorPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#45464d]">Innovator Reference MRP:</span>
                <span className="font-code-dense font-bold text-[#0b1c30]">₹{selectedCase.mrp.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Margin Inversion Analysis */}
          <div className="bg-[#fff0c2]/30 p-3 rounded-xl border border-[#fff0c2] space-y-1">
            <div className="flex items-center gap-1.5 text-[#805b00]">
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span className="font-body-md-semibold text-[12px]">Margin Inversion Alert</span>
            </div>
            <p className="font-body-sm text-[#45464d] text-[11px] leading-relaxed">
              At ₹{selectedCase.quotedPrice.toFixed(2)}, raw API procurement costs exceed the total retail price by 38%,
              making legitimate manufacturing economically impossible without batch dilution.
            </p>
          </div>

          {/* GS1 Central Matrix 404 Error */}
          <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-1">
            <span className="font-label-caps text-[#45464d] text-[10px]">GS1 CENTRAL MATRIX VERIFICATION</span>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-code-dense text-[#0b1c30]">Batch #{selectedCase.declaredBatch}</span>
              <span className="font-code-dense text-[#ba1a1a] font-bold">HTTP 404 NOT FOUND</span>
            </div>
            <p className="text-[10px] text-[#45464d]">Barcode matrix does not resolve in national traceability DB.</p>
          </div>

          {/* Immutable Audit Trail */}
          <div className="space-y-1.5">
            <span className="font-label-caps text-[#45464d] text-[10px]">IMMUTABLE AUDIT TRAIL</span>
            <div className="space-y-1 text-[11px] font-code-dense text-[#45464d]">
              <div className="flex justify-between">
                <span>10:14:02 IST</span>
                <span className="text-[#0b1c30]">Automated scraping flag raised</span>
              </div>
              <div className="flex justify-between">
                <span>10:14:05 IST</span>
                <span className="text-[#ba1a1a]">Listing hidden from search</span>
              </div>
              <div className="flex justify-between">
                <span>10:15:20 IST</span>
                <span className="text-[#006a61]">Dossier dispatched to Inspector</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 border-t border-[#eff4ff] space-y-2">
            <button
              onClick={() => onShowToast(`Inventory frozen for seller ${selectedCase.sellerName}`)}
              className="w-full h-9 rounded-lg bg-[#ba1a1a] text-white font-body-md-semibold text-[12px] hover:bg-[#93000a]"
            >
              Emergency Freeze Seller Inventory
            </button>

            <button
              onClick={() => onShowToast(`Summons issued to ${selectedCase.sellerName} for physical stock verification`)}
              className="w-full h-9 rounded-lg bg-[#eff4ff] text-[#0b1c30] font-body-md-semibold text-[12px] border border-[#c6c6cd] hover:bg-[#e5eeff]"
            >
              Issue Section 18B Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
