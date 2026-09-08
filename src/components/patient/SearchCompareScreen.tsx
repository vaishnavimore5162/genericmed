import React, { useState } from 'react';
import { ASSETS, VERIFIED_OFFERS } from '../../data/mockData';

interface SearchCompareScreenProps {
  onNavigate: (screen: string) => void;
  onAddToCart: (item: { name: string; price: number; qty: number }) => void;
  onShowToast: (msg: string) => void;
  cartCount: number;
}

export const SearchCompareScreen: React.FC<SearchCompareScreenProps> = ({
  onNavigate,
  onAddToCart,
  onShowToast,
  cartCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('Atorvastatin 20mg');
  const [selectedFilter, setSelectedFilter] = useState('lowest');
  const [heroQty, setHeroQty] = useState(1);
  const [offers] = useState(VERIFIED_OFFERS);

  const filters = [
    { id: 'lowest', label: 'Lowest Price First', icon: 'arrow_downward' },
    { id: 'nearby', label: 'Nearby (< 3 km)', icon: 'near_me' },
    { id: 'verified', label: 'Verified Generic', icon: 'verified' },
    { id: 'janaushadhi', label: 'Jan Aushadhi', icon: 'account_balance' },
    { id: 'rxready', label: 'Prescription Ready', icon: 'description' },
    { id: 'sameday', label: 'Same-Day Delivery', icon: 'bolt' },
  ];

  const handleHeroAdd = () => {
    onAddToCart({
      name: 'Atorva-G 20mg (Zydus Cadila)',
      price: 18.00,
      qty: heroQty,
    });
    onShowToast(`Added ${heroQty} strip(s) Atorva-G 20mg (₹${(heroQty * 18).toFixed(2)}) to Cart`);
  };

  const handleOfferAdd = (pharmacy: string, name: string, price: number) => {
    onAddToCart({
      name: `${name} (${pharmacy})`,
      price: price,
      qty: 1,
    });
    onShowToast(`Added 1 strip from ${pharmacy} (₹${price.toFixed(2)})`);
  };

  return (
    <div className="flex flex-col relative w-full bg-[#f8f9ff] min-h-screen text-[#0b1c30]">
      {/* Top Mobile App Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <img
              src={ASSETS.logoMobile}
              alt="GenericMed Logo"
              className="h-8 w-auto object-contain shrink-0 cursor-pointer"
              onClick={() => onNavigate('search')}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 text-[#006a61]">
                <span className="material-symbols-outlined text-[14px] shrink-0">location_on</span>
                <span className="font-label-caps uppercase tracking-wider text-[#006a61] truncate text-[10px]">
                  Deliver to
                </span>
              </div>
              <button 
                onClick={() => onShowToast('Delivery address: Koramangala 4th Block, Bengaluru (560034)')}
                className="flex items-center gap-0.5 min-h-[20px] text-left hover:text-[#006a61] transition-colors"
              >
                <span className="font-body-md-semibold text-[#0b1c30] truncate max-w-[150px] text-[13px]">
                  Koramangala, 560034
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#45464d]">expand_more</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onShowToast('All regulatory notifications up to date')}
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff] transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f8f9ff]" />
            </button>

            <button
              onClick={() => onNavigate('cart')}
              aria-label="Cart"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff] transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#006a61] text-white font-label-caps text-[10px] flex items-center justify-center leading-none">
                {cartCount}
              </span>
            </button>

            <button 
              onClick={() => onNavigate('adherence')}
              aria-label="User Profile" 
              className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0 ml-1 hover:opacity-90"
              title="Rajesh Kumar Profile"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>

        {/* Sticky Search and Filter Pill Bar */}
        <div className="px-3 pt-1 pb-3 space-y-2">
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-3 text-[#45464d] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search generic name, brand or salt..."
              className="w-full h-11 pl-10 pr-20 bg-[#eff4ff] text-[#0b1c30] font-body-md rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#006a61] transition-all text-[13px] shadow-inner"
            />
            <div className="absolute right-2 flex items-center gap-1">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear query"
                  className="w-7 h-7 flex items-center justify-center text-[#45464d] hover:text-[#0b1c30]"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <button
                onClick={() => onShowToast('Listening for medicine query... (e.g. Atorvastatin)')}
                aria-label="Voice Search"
                className="w-7 h-7 flex items-center justify-center text-[#006a61] hover:text-[#006f66]"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-3 px-3">
            {filters.map((f) => {
              const isActive = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFilter(f.id);
                    onShowToast(`Filtered by: ${f.label}`);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-label-sm whitespace-nowrap text-[11px] transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#0f172a] text-white shadow-sm font-semibold'
                      : 'bg-[#e5eeff] text-[#45464d] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[14px] ${isActive ? 'text-white' : 'text-[#006a61]'}`}>
                    {f.icon}
                  </span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-3 py-3 space-y-3 pb-24">
        {/* Card 1: Active Formulation Molecule Card */}
        <div 
          onClick={() => onNavigate('details')}
          className="bg-white rounded-xl p-3.5 shadow-sm space-y-3 border border-[#e5eeff]/80 cursor-pointer hover:border-[#006a61]/40 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#006a61] text-[18px]">science</span>
                <span className="font-label-caps text-[#006a61] tracking-wider text-[10px]">
                  Active Formulation Molecule
                </span>
              </div>
              <h1 className="font-headline-sm text-[#0b1c30] text-[16px]">Atorvastatin Calcium IP 20mg Tablet</h1>
              <p className="font-body-sm text-[#45464d] text-[12px]">Lipid Lowering / Statin • Oral Dosage</p>
            </div>
            <span className="px-2 py-1 rounded bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px] whitespace-nowrap shrink-0">
              Schedule H • Rx
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] p-2.5 rounded-lg">
            <div className="space-y-0.5">
              <span className="font-label-caps text-[#45464d] text-[10px]">Innovator Reference</span>
              <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Lipitor 20mg</div>
              <div className="font-code-dense text-[#45464d] text-[11px]">MRP ₹128.50 / strip (10 Tab)</div>
            </div>
            <div className="space-y-0.5 bg-[#89f5e7]/30 rounded-lg p-2 flex flex-col justify-center border border-[#86f2e4]/50">
              <div className="flex items-center gap-1 text-[#00201d]">
                <span className="material-symbols-outlined text-[16px] text-[#006a61]">savings</span>
                <span className="font-headline-sm font-semibold text-[15px]">Save Up To 86%</span>
              </div>
              <div className="font-label-sm text-[#005049] text-[11px]">With certified equivalent brands</div>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#dce9ff]/60 p-2.5 rounded-lg">
            <span className="material-symbols-outlined text-[#188ace] text-[18px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">Bioequivalence Certified</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowToast('Bioequivalence: Dissolution factor f2=71.4 exceeds CDSCO threshold of 50');
                  }}
                  className="text-[#45464d] hover:text-[#0b1c30]"
                >
                  <span className="material-symbols-outlined text-[14px]">info</span>
                </button>
              </div>
              <p className="font-body-sm text-[#45464d] leading-tight mt-0.5 text-[12px]">
                CDSCO dissolution similarity factor{' '}
                <span className="font-code-dense text-[#0b1c30] font-bold">f2 = 71.4</span> (&gt; 50 threshold).
                Equivalent bio-absorption to reference drug.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Hero Best Value Generic Pick */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-[#eff4ff] rounded-xl p-3.5 shadow-md border border-[#86f2e4]/40">
          <div className="flex items-center justify-between gap-1 mb-2.5">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006a61] text-white font-label-caps text-[10px]">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Best Value Generic Pick</span>
            </div>
            <span className="font-code-dense text-[11px] px-2 py-0.5 rounded-lg bg-[#d3e4fe] text-[#3f465c] font-semibold">
              86% LESS THAN LIPITOR
            </span>
          </div>

          <div 
            onClick={() => onNavigate('details')}
            className="flex gap-3 cursor-pointer"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#e5eeff] shrink-0 relative border border-[#c6c6cd]/40">
              <img
                src={ASSETS.atorvaHero}
                alt="Atorva-G 20mg blister"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#d3e4fe]/90 text-center py-0.5">
                <span className="font-label-caps text-[#0b1c30] text-[10px]">10 Tablets</span>
              </div>
            </div>

            <div className="flex-1 min-w-0 space-y-0.5">
              <h2 className="font-headline-sm text-[#0b1c30] truncate text-[16px]">Atorva-G 20mg</h2>
              <p className="font-body-sm text-[#45464d] truncate text-[12px]">Zydus Cadila • Bioequivalent Generic</p>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="font-headline-lg-mobile text-[#006a61] font-bold text-[20px]">₹18.00</span>
                <span className="font-body-sm line-through text-[#76777d] text-[12px]">MRP ₹128.50</span>
                <span className="font-label-caps text-[#006a61] font-bold text-[11px]">SAVE ₹110.50</span>
              </div>
            </div>
          </div>

          {/* Pharmacy Provider strip */}
          <div className="mt-3 pt-2 bg-[#e5eeff]/50 rounded-lg p-2.5 space-y-1.5 border border-[#c6c6cd]/30">
            <div className="flex items-center justify-between text-[#0b1c30] font-body-sm text-[12px]">
              <div className="flex items-center gap-1 min-w-0">
                <span className="material-symbols-outlined text-[16px] text-[#006a61] shrink-0">storefront</span>
                <span className="font-body-md-semibold truncate text-[13px]">Apollo Pharmacy</span>
                <span className="text-[#45464d] text-[12px]">• 1.2 km</span>
              </div>
              <span className="text-[#006a61] font-body-md-semibold text-[12px]">45 mins delivery</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white text-[#0b1c30] font-code-dense text-[10px] border border-[#c6c6cd]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" /> Form 20/21 Lic
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white text-[#0b1c30] font-code-dense text-[10px] border border-[#c6c6cd]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" /> Batch: Exp Nov 2027
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white text-[#0b1c30] font-code-dense text-[10px] border border-[#c6c6cd]/30">
                <span className="material-symbols-outlined text-[12px] text-[#006a61]">check_circle</span> RPh On-duty
              </span>
            </div>
          </div>

          {/* Stepper + Hero CTA */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center bg-[#eff4ff] rounded-xl shadow-inner px-1 h-10 shrink-0 border border-[#e5eeff]">
              <button
                onClick={() => setHeroQty(Math.max(1, heroQty - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e5eeff] text-[#0b1c30] font-headline-sm transition-colors text-[16px]"
              >
                -
              </button>
              <span className="w-8 text-center font-body-md-semibold text-[#0b1c30] text-[13px]">{heroQty}</span>
              <button
                onClick={() => setHeroQty(Math.min(10, heroQty + 1))}
                aria-label="Increase quantity"
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e5eeff] text-[#0b1c30] font-headline-sm transition-colors text-[16px]"
              >
                +
              </button>
            </div>

            <button
              onClick={handleHeroAdd}
              className="flex-1 h-10 px-3 rounded-xl bg-[#006a61] text-white font-body-md-semibold text-[13px] flex items-center justify-center gap-1.5 shadow-md hover:bg-[#006f66] active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>Add Hero Generic • ₹{(heroQty * 18).toFixed(2)}</span>
            </button>
          </div>
        </div>

        {/* Section 3: Verified Pharmacy Offers List */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">5 Verified Pharmacy Offers</h3>
              <p className="font-body-sm text-[#45464d] text-[12px]">Real-time audited inventory in Koramangala area</p>
            </div>
            <button 
              onClick={() => onShowToast('Sorted by audited bioequivalence reliability & proximity')}
              className="p-1 rounded-lg hover:bg-[#eff4ff] text-[#45464d]"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {offers.map((offer) => {
              if (offer.complianceLocked) {
                return (
                  <div
                    key={offer.id}
                    className="bg-[#ffdad6]/30 border border-[#ba1a1a]/30 rounded-xl p-3.5 space-y-1.5 opacity-90 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">gavel</span>
                        <span className="font-body-md-semibold text-[#ba1a1a] text-[13px]">{offer.pharmacyName}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-[#ffdad6] text-[#93000a] font-label-caps text-[10px]">
                        Compliance Lock
                      </span>
                    </div>
                    <p className="font-body-sm text-[#45464d] text-[12px] leading-relaxed">{offer.lockReason}</p>
                  </div>
                );
              }

              return (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl p-3.5 shadow-sm space-y-2.5 border border-[#e5eeff] hover:border-[#c6c6cd] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{offer.pharmacyName}</span>
                        {offer.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded font-label-caps text-[10px] uppercase ${
                              offer.badgeType === 'govt'
                                ? 'bg-[#89f5e7] text-[#00201d]'
                                : offer.badgeType === 'rating'
                                ? 'bg-[#e5eeff] text-[#45464d]'
                                : 'bg-[#dce9ff] text-[#3f465c]'
                            }`}
                          >
                            {offer.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-body-sm text-[#45464d] mt-0.5 text-[12px]">
                        {offer.distance} • {offer.location}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-headline-sm text-[#006a61] font-bold text-[16px]">
                        ₹{offer.price.toFixed(2)}
                      </div>
                      {offer.discountPct && (
                        <span className="font-label-caps text-[#006a61] font-bold text-[10px]">
                          {offer.discountPct}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  <div 
                    onClick={() => onNavigate('details')}
                    className="flex items-center gap-2.5 bg-[#eff4ff] p-2.5 rounded-lg cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#d3e4fe] overflow-hidden shrink-0 border border-[#c6c6cd]/30">
                      <img src={offer.image} alt={offer.medicineName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-body-md-semibold text-[#0b1c30] truncate text-[13px]">{offer.medicineName}</div>
                      <div className="font-label-sm text-[#45464d] text-[11px]">
                        {offer.manufacturer} • {offer.categoryDesc}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {offer.stockText && (
                          <span className="font-code-dense text-[#006a61] text-[10px]">{offer.stockText}</span>
                        )}
                        <span className="text-[#45464d] text-[10px]">•</span>
                        <span className="font-code-dense text-[#45464d] text-[10px]">{offer.expiryText}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[#45464d] font-label-sm text-[11px]">
                      <span className="material-symbols-outlined text-[16px] text-[#006a61]">
                        {offer.deliveryType.includes('30-min') ? 'bolt' : 'local_shipping'}
                      </span>
                      <span>{offer.deliveryType}</span>
                    </div>

                    <button
                      onClick={() => handleOfferAdd(offer.pharmacyName, offer.medicineName, offer.price)}
                      className="h-8 px-3 rounded-lg bg-[#0f172a] text-white font-body-md-semibold text-[12px] flex items-center gap-1 shadow-sm hover:opacity-90 active:scale-95 transition-transform"
                    >
                      <span>Add ₹{offer.price.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: GenericMed Regulatory Promise */}
        <div className="rounded-xl bg-[#e5eeff] p-3.5 space-y-1.5 shadow-sm border border-[#c6c6cd]/30">
          <div className="flex items-center gap-1 text-[#006a61]">
            <span className="material-symbols-outlined text-[20px]">shield</span>
            <span className="font-body-md-semibold text-[13px]">GenericMed Regulatory Promise</span>
          </div>
          <p className="font-body-sm text-[#45464d] leading-relaxed text-[12px]">
            Every pharmacy offering medications holds a verified Form 20/21 retail drug license with an active Registered
            Pharmacist (RPh). Prescriptions and health data are strictly processed under the Digital Personal Data
            Protection (DPDP) Act 2026.
          </p>
          <div className="pt-1 flex items-center gap-4 font-label-sm text-[#45464d] text-[11px]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#006a61]">verified</span> CDSCO Audit Ready
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#006a61]">lock</span> Encrypted Dispensing
            </span>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-2 flex items-center justify-around">
          <button
            onClick={() => onNavigate('search')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#006a61] font-body-md-semibold"
          >
            <span className="material-symbols-outlined text-[22px]">medication</span>
            <span className="font-label-sm text-[11px]">Search</span>
          </button>

          <button
            onClick={() => onNavigate('details')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">difference</span>
            <span className="font-label-sm text-[11px]">Bioequivalence</span>
          </button>

          <button
            onClick={() => onNavigate('adherence')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">prescriptions</span>
            <span className="font-label-sm text-[11px]">Regimen</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d] hover:text-[#0b1c30] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
            <span className="font-label-sm text-[11px]">Orders</span>
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d] hover:text-[#0b1c30] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-[#006a61] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
            <span className="font-label-sm text-[11px]">Cart</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
