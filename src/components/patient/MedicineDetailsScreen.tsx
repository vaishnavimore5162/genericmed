import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface MedicineDetailsScreenProps {
  onNavigate: (screen: string) => void;
  onAddToCart: (item: { name: string; price: number; qty: number }) => void;
  onShowToast: (msg: string) => void;
  cartCount: number;
}

export const MedicineDetailsScreen: React.FC<MedicineDetailsScreenProps> = ({
  onNavigate,
  onAddToCart,
  onShowToast,
  cartCount,
}) => {
  const [selectedOption, setSelectedOption] = useState<'atorva-g' | 'jan-atorva' | 'storvas'>('atorva-g');
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const options = [
    {
      id: 'atorva-g' as const,
      name: 'Atorva-G 20mg',
      tag: 'RECOMMENDED GENERIC',
      seller: 'Zydus Cadila • Apollo Pharmacy (1.2 km)',
      price: 18.00,
      savings: 'Save 86%',
      badgeColor: 'bg-[#006a61] text-white',
    },
    {
      id: 'jan-atorva' as const,
      name: 'Jan-Atorvastatin 20mg',
      tag: 'PMBJP GOVT KENDRA',
      seller: 'BPPI Govt Supply • Kendra #402 (2.8 km)',
      price: 14.50,
      savings: 'Save 89%',
      badgeColor: 'bg-[#89f5e7] text-[#00201d]',
    },
    {
      id: 'storvas' as const,
      name: 'Storvas 20mg',
      tag: 'BRANDED REFERENCE',
      seller: 'Sun Pharma • Wellness Forever 24x7',
      price: 109.00,
      savings: 'Save 15%',
      badgeColor: 'bg-[#e5eeff] text-[#45464d]',
    },
  ];

  const currentOption = options.find((o) => o.id === selectedOption) || options[0];

  const handleAddToCart = () => {
    onAddToCart({
      name: currentOption.name,
      price: currentOption.price,
      qty: quantity,
    });
    onShowToast(`Added ${quantity} strip(s) of ${currentOption.name} (₹${(currentOption.price * quantity).toFixed(2)}) to Cart`);
  };

  const faqs = [
    {
      q: 'What makes generic Atorvastatin identical in clinical effect?',
      a: 'Generic Atorvastatin contains the exact same active pharmaceutical ingredient (Atorvastatin Calcium IP) in the identical 20mg strength, molecular geometry, and route of administration as the original innovator. Under CDSCO guidelines, bioavailability (AUC) and peak serum concentrations must match within strict regulatory statistical intervals (80.00% to 125.00%).',
    },
    {
      q: 'Why does the verified generic cost up to 88% less?',
      a: 'Innovator companies spend millions on original patent clinical discovery and advertising. Once patents expire, generic manufacturers produce the exact same drug without repetitive clinical trial costs or branded marketing markups. Price caps mandated under the National Pharmaceutical Pricing Authority (NPPA) further protect consumer affordability.',
    },
    {
      q: 'Can a retail pharmacist substitute this automatically in India?',
      a: 'Under National Medical Commission (NMC) 2023 regulations and Pharmacy Practice Regulations, registered pharmacists are legally empowered and encouraged to dispense quality-tested bioequivalent generic alternatives containing the same active molecule, salt, and dosage strength.',
    },
  ];

  return (
    <div className="flex flex-col relative w-full bg-[#f8f9ff] min-h-screen text-[#0b1c30]">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('search')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="font-label-caps text-[#006a61] text-[10px]">CDSCO FORM 46 VERIFIED</span>
              <span className="font-headline-sm text-[#0b1c30] text-[15px] leading-tight">Bioequivalence Details</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onShowToast('Clinical monograph link copied to clipboard')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff]"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff] relative"
              aria-label="Cart"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[15px] h-3.5 px-1 rounded-full bg-[#006a61] text-white font-label-caps text-[9px] flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 px-3 py-3 space-y-3.5 pb-28">
        {/* Compliance Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">prescription</span>
            SCHEDULE H • PRESCRIPTION REQUIRED
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#89f5e7] text-[#00201d] font-label-caps text-[10px] font-bold">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            NABL LAB TESTED (OCT 2026)
          </span>
        </div>

        {/* Product Hero Header */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="w-full h-44 rounded-lg overflow-hidden bg-[#eff4ff] relative border border-[#c6c6cd]/30">
            <img
              src={ASSETS.atorvaHero}
              alt="Atorvastatin generic strip"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white font-code-dense text-[10px]">
              Actual Pack Scan • Batch ZD-8921
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#006a61] text-white font-label-caps text-[10px]">
              10 Film-Coated Tablets
            </div>
          </div>

          <div>
            <h1 className="font-headline-md text-[#0b1c30] text-[18px]">Atorvastatin Calcium IP 20mg</h1>
            <p className="font-body-md text-[#45464d] text-[13px] mt-0.5">
              Film-Coated Tablet • USP / Indian Pharmacopoeia Monograph
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-label-sm text-[11px]">
                Statin / Lipid Lowering
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-label-sm text-[11px]">
                Oral Tablet
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-label-sm text-[11px]">
                Once Daily Dose
              </span>
            </div>
          </div>
        </div>

        {/* Equivalence Price Benchmark Hero */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#131b2e] rounded-xl p-4 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#89f5e7]">
              <span className="material-symbols-outlined text-[18px]">price_change</span>
              <span className="font-label-caps tracking-wider text-[10px]">PRICE BENCHMARK COMPARISON</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#89f5e7]/20 text-[#89f5e7] font-code-dense text-[11px]">
              Save up to 88%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-white/10 rounded-lg p-3 border border-white/10">
              <span className="font-label-caps text-white/70 text-[10px]">Innovator Brand (Lipitor / Storvas)</span>
              <div className="text-[20px] font-bold mt-1 text-white/90 line-through">₹128.50</div>
              <div className="font-body-sm text-white/60 text-[11px] mt-0.5">Standard MRP per 10 tablets</div>
            </div>

            <div className="bg-[#006a61]/40 rounded-lg p-3 border border-[#86f2e4]/40">
              <span className="font-label-caps text-[#89f5e7] text-[10px]">Certified Generic</span>
              <div className="text-[22px] font-bold mt-1 text-[#89f5e7]">₹14.50 – ₹18</div>
              <div className="font-body-sm text-white/90 text-[11px] mt-0.5">Save ~₹1,326/yr in therapy</div>
            </div>
          </div>

          <p className="font-body-sm text-white/80 text-[12px] leading-relaxed pt-1">
            For chronic cardiovascular maintenance, switching from innovator brands to verified bioequivalent generics
            saves an average Indian family ₹1,100 to ₹1,400 each year per patient without sacrificing clinical efficacy.
          </p>
        </div>

        {/* Scientific Equivalence Matrix */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">biotech</span>
              <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Scientific Equivalence Matrix</h2>
            </div>
            <span className="font-code-dense text-[#006a61] bg-[#89f5e7]/30 px-2 py-0.5 rounded text-[11px] font-bold">
              PASSED
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {/* Row 1 */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Active Pharmaceutical Ingredient</div>
                <div className="font-body-sm text-[#45464d] text-[12px]">Atorvastatin Calcium IP (USP standard)</div>
              </div>
              <div className="text-right">
                <span className="font-code-dense text-[#006a61] font-bold text-[13px]">100% IDENTICAL</span>
                <div className="font-label-sm text-[#45464d] text-[10px]">Molecular C66H68CaF2N4O10</div>
              </div>
            </div>

            {/* Row 2: AUC Progress */}
            <div className="bg-[#eff4ff] p-3 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Bioavailability / Absorption (AUC)</div>
                  <div className="font-body-sm text-[#45464d] text-[12px]">Rate of systemic blood uptake</div>
                </div>
                <span className="font-code-dense text-[#006a61] font-bold text-[13px]">98.4% MATCH</span>
              </div>
              <div className="w-full h-2 bg-[#dce9ff] rounded-full overflow-hidden">
                <div className="h-full bg-[#006a61] rounded-full" style={{ width: '98.4%' }} />
              </div>
              <div className="flex justify-between font-label-caps text-[#45464d] text-[9px]">
                <span>CDSCO Allowed: 80%</span>
                <span>Innovator: 100%</span>
                <span className="text-[#006a61] font-bold">Generic: 98.4%</span>
              </div>
            </div>

            {/* Row 3: Dissolution */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">In-Vitro Dissolution Factor (f2)</div>
                <div className="font-body-sm text-[#45464d] text-[12px]">Gastric fluid dissolution curve</div>
              </div>
              <div className="text-right">
                <span className="font-code-dense text-[#006a61] font-bold text-[14px]">f2 = 71.4</span>
                <div className="font-label-sm text-[#006a61] text-[10px]">Compliant (&gt; 50 required)</div>
              </div>
            </div>

            {/* Row 4: Manufacturing plant */}
            <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Manufacturing Standard</div>
                <div className="font-body-sm text-[#45464d] text-[12px]">WHO-GMP &amp; US-FDA audited facility</div>
              </div>
              <div className="text-right">
                <span className="font-code-dense text-[#0b1c30] font-bold text-[12px]">Zydus Plant 4</span>
                <div className="font-label-sm text-[#45464d] text-[10px]">Ahmedabad, Gujarat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Sourcing Options Radio Group */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Verified Sourcing Options</h2>
            <span className="font-label-sm text-[#45464d] text-[11px]">Select brand to dispense</span>
          </div>

          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#006a61] bg-[#eff4ff]/60 shadow-sm'
                      : 'border-[#e5eeff] bg-white hover:border-[#c6c6cd]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isSelected ? 'border-[#006a61] bg-[#006a61]' : 'border-[#c6c6cd]'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{opt.name}</span>
                          <span className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] ${opt.badgeColor}`}>
                            {opt.tag}
                          </span>
                        </div>
                        <p className="font-body-sm text-[#45464d] text-[11px] mt-0.5">{opt.seller}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-headline-sm text-[#006a61] font-bold text-[15px]">
                        ₹{opt.price.toFixed(2)}
                      </div>
                      <span className="font-label-caps text-[#006a61] font-semibold text-[10px]">{opt.savings}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clinical FAQ Accordion */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-outlined text-[#006a61] text-[20px]">help</span>
            <h2 className="font-headline-sm text-[#0b1c30] text-[16px]">Clinical Bioequivalence FAQ</h2>
          </div>

          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="border-b border-[#e5eeff] last:border-none py-2.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-2"
                >
                  <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{faq.q}</span>
                  <span className="material-symbols-outlined text-[#45464d] text-[18px]">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <p className="font-body-sm text-[#45464d] text-[12px] leading-relaxed mt-2 pt-1 border-t border-[#eff4ff]">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Physician / NMC Regulatory Note */}
        <div className="rounded-xl bg-[#eff4ff] p-3.5 space-y-1 border border-[#c6c6cd]/30">
          <div className="flex items-center gap-1 text-[#006a61]">
            <span className="material-symbols-outlined text-[18px]">local_pharmacy</span>
            <span className="font-body-md-semibold text-[13px]">Physician &amp; NMC Regulatory Note</span>
          </div>
          <p className="font-body-sm text-[#45464d] text-[11px] leading-relaxed">
            National Medical Commission (NMC) professional conduct mandates generic medicine prescribing. GenericMed
            cross-references your uploaded prescription with registered pharmacopeia monographs to ensure therapeutic
            safety.
          </p>
        </div>
      </main>

      {/* Sticky Bottom Purchase Bar */}
      <div className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="min-w-0">
            <span className="font-label-caps text-[#45464d] text-[10px] block truncate">Selected: {currentOption.name}</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-lg-mobile text-[#006a61] font-bold text-[20px]">
                ₹{(currentOption.price * quantity).toFixed(2)}
              </span>
              <span className="font-body-sm line-through text-[#76777d] text-[11px]">
                MRP ₹{(128.50 * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#eff4ff] rounded-xl px-1 h-10 border border-[#e5eeff]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center font-bold text-[16px] text-[#0b1c30]"
              >
                -
              </button>
              <span className="w-7 text-center font-body-md-semibold text-[13px] text-[#0b1c30]">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 flex items-center justify-center font-bold text-[16px] text-[#0b1c30]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="h-10 px-4 rounded-xl bg-[#006a61] text-white font-body-md-semibold text-[13px] flex items-center gap-1.5 shadow-md hover:bg-[#006f66] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
