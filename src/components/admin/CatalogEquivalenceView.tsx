import React, { useState } from 'react';
import { CANONICAL_MOLECULES } from '../../data/mockData';
import { CanonicalMolecule } from '../../types';

interface CatalogEquivalenceViewProps {
  onShowToast: (msg: string) => void;
}

export const CatalogEquivalenceView: React.FC<CatalogEquivalenceViewProps> = ({ onShowToast }) => {
  const [selectedMolecule, setSelectedMolecule] = useState<CanonicalMolecule>(CANONICAL_MOLECULES[0]);
  const [ntiGuardrail, setNtiGuardrail] = useState(true);
  const [dispenseDirective, setDispenseDirective] = useState(
    'Dispense only CDSCO validated formulations with f2 >= 50. Automatic substitution permitted under NMC 2023 regulations.'
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">CANONICAL MOLECULES</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">4,820</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">IP/USP Monographs</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">science</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">BIOEQUIVALENT GENERICS</span>
            <div className="font-headline-lg text-[#0b1c30] font-bold mt-1 text-[24px]">18,940</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">f2 &gt;= 50 Certified</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#89f5e7]/30 text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">DISSOLUTION MISMATCHES</span>
            <div className="font-headline-lg text-[#ba1a1a] font-bold mt-1 text-[24px]">12</div>
            <div className="font-body-sm text-[#ba1a1a] text-[11px] mt-0.5">Flagged &amp; De-listed</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[#e5eeff] shadow-sm flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[#45464d] text-[10px]">PATIENT SAVINGS INDEX</span>
            <div className="font-headline-lg text-[#006a61] font-bold mt-1 text-[24px]">68.4%</div>
            <div className="font-body-sm text-[#006a61] text-[11px] mt-0.5">Weighted vs Innovator MRP</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#006a61] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">savings</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Molecule Registry & Equivalence Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Columns: Registered Molecule Registry */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Registered Canonical Molecules</h2>
              <p className="font-body-sm text-[#45464d] text-[12px]">Validated therapeutic monographs in CDSCO master index</p>
            </div>
            <span className="font-code-dense text-[11px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#006a61] font-semibold">
              5 Filtered
            </span>
          </div>

          <div className="space-y-2.5">
            {CANONICAL_MOLECULES.map((mol) => {
              const isSelected = selectedMolecule.id === mol.id;
              return (
                <div
                  key={mol.id}
                  onClick={() => setSelectedMolecule(mol)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#006a61] bg-[#eff4ff]/60 shadow-sm ring-1 ring-[#006a61]/30'
                      : 'border-[#e5eeff] bg-white hover:border-[#c6c6cd]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{mol.name}</span>
                        <span className="font-code-dense text-[10px] text-[#45464d]">({mol.atc})</span>
                        <span
                          className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] ${
                            mol.status === 'Verified'
                              ? 'bg-[#89f5e7] text-[#00201d]'
                              : 'bg-[#ffdad6] text-[#93000a]'
                          }`}
                        >
                          {mol.status}
                        </span>
                      </div>
                      <p className="font-body-sm text-[#45464d] text-[11px] mt-0.5">{mol.category}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-headline-sm text-[#006a61] font-bold text-[14px]">
                        Save Up To {mol.maxSavingsPct}%
                      </span>
                      <div className="font-code-dense text-[10px] text-[#45464d]">
                        ₹{mol.priceMin.toFixed(2)} - ₹{mol.priceMax.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#eff4ff] text-[11px]">
                    <div className="flex items-center gap-2 font-code-dense">
                      <span className="text-[#0b1c30]">f2: {mol.f2Score}</span>
                      <span className="text-[#45464d]">•</span>
                      <span className="text-[#006a61]">{mol.mappedGenericsCount} Generics Mapped</span>
                    </div>
                    <span className="font-label-sm text-[#45464d]">{mol.schedule}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* In-Vitro Dissolution Curve SVG Chart */}
          <div className="bg-[#eff4ff] rounded-xl p-4 space-y-2 border border-[#dce9ff]">
            <div className="flex items-center justify-between">
              <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">
                In-Vitro Dissolution Curve ({selectedMolecule.name})
              </span>
              <span className="font-code-dense text-[11px] px-2 py-0.5 rounded bg-white text-[#006a61] font-bold">
                f2 = {selectedMolecule.f2Score}
              </span>
            </div>

            <p className="font-body-sm text-[#45464d] text-[11px]">
              Comparative dissolution profile vs Innovator Reference ({selectedMolecule.innovatorReference}) at pH 1.2,
              pH 4.5, and pH 6.8 buffer over 60 minutes.
            </p>

            {/* SVG Chart */}
            <div className="h-44 w-full bg-white rounded-lg p-2 relative flex items-center justify-center border border-[#c6c6cd]/30">
              <svg className="w-full h-full" viewBox="0 0 400 160">
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#eff4ff" strokeWidth="1" />
                <line x1="40" y1="55" x2="380" y2="55" stroke="#eff4ff" strokeWidth="1" />
                <line x1="40" y1="90" x2="380" y2="90" stroke="#eff4ff" strokeWidth="1" />
                <line x1="40" y1="125" x2="380" y2="125" stroke="#eff4ff" strokeWidth="1" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#76777d" strokeWidth="1" />
                <line x1="40" y1="10" x2="40" y2="140" stroke="#76777d" strokeWidth="1" />

                {/* Axis Labels */}
                <text x="10" y="25" fill="#76777d" fontSize="9" fontFamily="monospace">100%</text>
                <text x="15" y="60" fill="#76777d" fontSize="9" fontFamily="monospace">75%</text>
                <text x="15" y="95" fill="#76777d" fontSize="9" fontFamily="monospace">50%</text>
                <text x="15" y="130" fill="#76777d" fontSize="9" fontFamily="monospace">25%</text>

                <text x="40" y="152" fill="#76777d" fontSize="9" fontFamily="monospace">0m</text>
                <text x="120" y="152" fill="#76777d" fontSize="9" fontFamily="monospace">15m</text>
                <text x="200" y="152" fill="#76777d" fontSize="9" fontFamily="monospace">30m</text>
                <text x="280" y="152" fill="#76777d" fontSize="9" fontFamily="monospace">45m</text>
                <text x="360" y="152" fill="#76777d" fontSize="9" fontFamily="monospace">60m</text>

                {/* Innovator curve (Dark Navy) */}
                <path
                  d="M40,140 C80,80 140,35 220,25 T380,20"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Generic Formulation Curve (Teal) */}
                <path
                  d={
                    selectedMolecule.isValidF2
                      ? "M40,140 C85,85 145,38 225,27 T380,22"
                      : "M40,140 C85,110 145,80 225,60 T380,50"
                  }
                  fill="none"
                  stroke={selectedMolecule.isValidF2 ? '#006a61' : '#ba1a1a'}
                  strokeWidth="3"
                />

                {/* Markers */}
                <circle cx="220" cy="25" r="3" fill="#0f172a" />
                <circle cx="225" cy={selectedMolecule.isValidF2 ? 27 : 60} r="3.5" fill={selectedMolecule.isValidF2 ? '#006a61' : '#ba1a1a'} />
              </svg>

              {/* Legend overlay */}
              <div className="absolute top-2 right-3 flex items-center gap-3 bg-white/90 px-2 py-1 rounded shadow-sm text-[10px] font-label-sm">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 bg-[#0f172a] inline-block border-dashed" /> Innovator Reference
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`w-3 h-1 inline-block ${
                      selectedMolecule.isValidF2 ? 'bg-[#006a61]' : 'bg-[#ba1a1a]'
                    }`}
                  />{' '}
                  Candidate Generic
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Equivalence Workbench */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-[#e5eeff] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <div>
              <span className="font-label-caps text-[#006a61] text-[10px]">EQUIVALENCE WORKBENCH</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">{selectedMolecule.name}</h3>
              <p className="font-body-sm text-[#45464d] text-[11px]">
                Formula: {selectedMolecule.formula} • {selectedMolecule.molWeight}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded font-label-caps text-[10px] font-bold ${
                selectedMolecule.isValidF2 ? 'bg-[#89f5e7] text-[#00201d]' : 'bg-[#ffdad6] text-[#93000a]'
              }`}
            >
              {selectedMolecule.isValidF2 ? 'CDSCO CLEARED' : 'DISSOLUTION REJECTED'}
            </span>
          </div>

          {/* Reference Innovator Benchmark Card */}
          <div className="bg-[#eff4ff] p-3.5 rounded-xl space-y-1.5 border border-[#dce9ff]">
            <span className="font-label-caps text-[#45464d] text-[10px]">INNOVATOR BENCHMARK REFERENCE</span>
            <div className="flex items-baseline justify-between">
              <span className="font-headline-sm text-[#0b1c30] text-[15px]">
                {selectedMolecule.innovatorReference}
              </span>
              <span className="font-headline-sm text-[#0b1c30] font-bold text-[15px]">
                MRP ₹{selectedMolecule.innovatorPrice.toFixed(2)}
              </span>
            </div>
            <p className="font-body-sm text-[#45464d] text-[11px]">
              Primary reference product for in-vivo bioequivalence (BE) and in-vitro dissolution (IVIVC).
            </p>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-xl border border-[#e5eeff] text-center">
              <span className="font-label-caps text-[#45464d] text-[9px] block">AUC BIOAVAILABILITY</span>
              <span className="font-headline-sm text-[#006a61] font-bold text-[16px] block mt-0.5">
                {selectedMolecule.aucBioavailability}%
              </span>
              <span className="font-label-sm text-[#45464d] text-[10px]">90% CI Interval</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5eeff] text-center">
              <span className="font-label-caps text-[#45464d] text-[9px] block">DISSOLUTION f2</span>
              <span
                className={`font-headline-sm font-bold text-[16px] block mt-0.5 ${
                  selectedMolecule.isValidF2 ? 'text-[#006a61]' : 'text-[#ba1a1a]'
                }`}
              >
                {selectedMolecule.f2Score}
              </span>
              <span className="font-label-sm text-[#45464d] text-[10px]">&gt; 50 Pass Mark</span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#e5eeff] text-center">
              <span className="font-label-caps text-[#45464d] text-[9px] block">EXCIPIENT GRADE</span>
              <span className="font-headline-sm text-[#006a61] font-bold text-[16px] block mt-0.5">100%</span>
              <span className="font-label-sm text-[#45464d] text-[10px]">IP Compliant</span>
            </div>
          </div>

          {/* Candidate Generics Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-caps text-[#45464d] text-[10px]">MAPPED GENERIC FORMULATIONS (4)</span>
              <span className="font-label-sm text-[#006a61] text-[11px]">Real-time Sourcing Feeds</span>
            </div>

            <div className="space-y-2 text-[12px]">
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                <div>
                  <div className="font-body-md-semibold text-[#0b1c30]">Atorva-G 20mg (Zydus Cadila)</div>
                  <div className="text-[11px] text-[#45464d]">f2 = 71.4 • NABL Batch Tested • ₹18.00</div>
                </div>
                <span className="font-code-dense text-[#006a61] font-bold bg-white px-2 py-0.5 rounded">
                  TOP MATCH (86% OFF)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                <div>
                  <div className="font-body-md-semibold text-[#0b1c30]">Jan-Atorvastatin 20mg (BPPI Govt)</div>
                  <div className="text-[11px] text-[#45464d]">f2 = 69.2 • PMBJP Scheme • ₹14.50</div>
                </div>
                <span className="font-code-dense text-[#006a61] font-bold bg-white px-2 py-0.5 rounded">
                  GOVT KENDRA (89% OFF)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                <div>
                  <div className="font-body-md-semibold text-[#0b1c30]">Storvas 20mg (Sun Pharma)</div>
                  <div className="text-[11px] text-[#45464d]">Branded Generic Reference • ₹109.00</div>
                </div>
                <span className="font-code-dense text-[#45464d] bg-white px-2 py-0.5 rounded">
                  BRANDED (15% OFF)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#ffdad6]/40 flex items-center justify-between">
                <div>
                  <div className="font-body-md-semibold text-[#ba1a1a]">Ator-Generic (Solan Batch 2024)</div>
                  <div className="text-[11px] text-[#45464d]">f2 = 38.1 • Sub-potency Alert • ₹8.00</div>
                </div>
                <span className="font-code-dense text-[#93000a] font-bold bg-[#ffdad6] px-2 py-0.5 rounded">
                  BLOCKED
                </span>
              </div>
            </div>
          </div>

          {/* Narrow Therapeutic Index Guardrail Toggle */}
          <div className="pt-2 border-t border-[#eff4ff] space-y-2">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-[#eff4ff]">
              <div>
                <span className="font-body-md-semibold text-[#0b1c30] text-[12px]">
                  Narrow Therapeutic Index (NTI) Safety Guardrail
                </span>
                <p className="text-[11px] text-[#45464d]">
                  Enforce tighter 90.00% – 111.11% bioequivalence confidence interval for sensitive molecules.
                </p>
              </div>
              <input
                type="checkbox"
                checked={ntiGuardrail}
                onChange={(e) => setNtiGuardrail(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61]"
              />
            </label>

            <div>
              <label className="font-label-sm text-[#0b1c30] text-[11px] block mb-1">
                Clinical Pharmacist Dispense Directive
              </label>
              <textarea
                rows={2}
                value={dispenseDirective}
                onChange={(e) => setDispenseDirective(e.target.value)}
                className="w-full p-2 text-[12px] font-body-sm rounded-lg border border-[#c6c6cd] bg-white text-[#0b1c30]"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onShowToast(`Published updated equivalence monograph for ${selectedMolecule.name}`)}
                className="flex-1 h-9 rounded-lg bg-[#006a61] text-white font-body-md-semibold text-[12px] hover:bg-[#006f66]"
              >
                Approve &amp; Publish Monograph
              </button>
              <button
                onClick={() => onShowToast(`Molecule ${selectedMolecule.name} flagged for CDSCO committee review`)}
                className="px-3 h-9 rounded-lg bg-[#eff4ff] text-[#ba1a1a] font-body-md-semibold text-[12px] border border-[#ffdad6]"
              >
                Revoke Clearance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
