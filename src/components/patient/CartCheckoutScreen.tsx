import React, { useState } from 'react';
import { CartItem } from '../../types';

interface CartCheckoutScreenProps {
  onNavigate: (screen: string) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export const CartCheckoutScreen: React.FC<CartCheckoutScreenProps> = ({
  onNavigate,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onShowToast,
}) => {
  const [strictEquivalenceOnly, setStrictEquivalenceOnly] = useState(true);
  const [callForSubstitution, setCallForSubstitution] = useState(false);

  // Group by package
  const pkg1Items = cartItems.filter((item) => item.packageId === 'pkg-1');
  const pkg2Items = cartItems.filter((item) => item.packageId === 'pkg-2');

  const pkg1Total = pkg1Items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const pkg2Total = pkg2Items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const totalMrp = cartItems.reduce((acc, i) => acc + i.mrp * i.quantity, 0);
  const totalGeneric = pkg1Total + pkg2Total;
  const totalSavings = Math.max(0, totalMrp - totalGeneric);
  const deliveryCharges = pkg2Total > 0 ? 15.00 : 0.00;
  const safetyHandling = 3.00;
  const grandTotal = totalGeneric + deliveryCharges + safetyHandling;

  const handleProceedToPay = () => {
    onShowToast('Payment authenticated via UPI Auto-Pay. Order placed!');
    setTimeout(() => {
      onNavigate('orders');
    }, 600);
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
              <span className="font-label-caps text-[#006a61] text-[10px]">STEP 1 OF 2</span>
              <h1 className="font-headline-sm text-[#0b1c30] text-[15px]">
                Review Cart ({cartItems.length} items • 2 sellers)
              </h1>
            </div>
          </div>

          <button
            onClick={() => {
              onClearCart();
              onShowToast('Cart cleared');
            }}
            className="text-[#ba1a1a] font-label-sm text-[11px] hover:underline"
          >
            Clear All
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 py-3.5 space-y-3.5 pb-32">
        {/* Delivering to Address Bar */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#e5eeff] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61] shrink-0">
              <span className="material-symbols-outlined text-[18px]">home</span>
            </div>
            <div className="min-w-0">
              <span className="font-label-caps text-[#45464d] text-[10px]">DELIVERING TO HOME</span>
              <div className="font-body-md-semibold text-[#0b1c30] truncate text-[13px]">
                Koramangala 4th Block, Bengaluru 560034
              </div>
            </div>
          </div>
          <button
            onClick={() => onShowToast('Address selector modal opened')}
            className="font-label-sm text-[#006a61] text-[12px] font-semibold shrink-0 hover:underline"
          >
            Change
          </button>
        </div>

        {/* Verified Generic Efficiency Savings Banner */}
        <div className="bg-gradient-to-r from-[#006a61] to-[#005049] rounded-xl p-3.5 text-white shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#89f5e7] text-[22px]">savings</span>
            </div>
            <div>
              <span className="font-label-caps text-[#89f5e7] text-[10px] tracking-wider">
                VERIFIED GENERIC EFFICIENCY
              </span>
              <div className="font-headline-sm font-bold text-[16px]">₹{totalSavings.toFixed(2)} Total Savings</div>
              <div className="font-body-sm text-white/80 text-[11px]">82% cheaper than innovator brand MRP</div>
            </div>
          </div>
          <span className="font-code-dense px-2 py-1 rounded bg-white/20 text-[#89f5e7] text-[11px] font-bold">
            CDSCO PASSED
          </span>
        </div>

        {/* Fulfillment Package 1: Apollo Express */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-start justify-between border-b border-[#eff4ff] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61]">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">Package 1: Apollo Pharmacy</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#89f5e7] text-[#00201d] font-label-caps text-[9px]">
                    Express 45-min
                  </span>
                </div>
                <div className="font-body-sm text-[#45464d] text-[11px]">
                  1.2 km away • Form 20/21 Lic • RPh Verified
                </div>
              </div>
            </div>
            <span className="font-code-dense text-[#006a61] text-[11px] font-bold">FREE DELIVERY</span>
          </div>

          <div className="space-y-3">
            {pkg1Items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{item.name}</span>
                    <span className="px-1 py-0.2 rounded bg-[#eff4ff] text-[#45464d] font-code-dense text-[9px]">
                      {item.schedule}
                    </span>
                  </div>
                  <div className="font-body-sm text-[#45464d] text-[11px] truncate">{item.salt}</div>
                  <div className="font-label-sm text-[#45464d] text-[10px] mt-0.5">
                    {item.manufacturer} • {item.packageQuantity}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-headline-sm text-[#006a61] font-bold text-[14px]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="font-body-sm line-through text-[#76777d] text-[11px]">
                      ₹{(item.mrp * item.quantity).toFixed(2)}
                    </span>
                    <span className="font-label-caps text-[#006a61] text-[10px] font-bold">
                      {item.savingsPct}% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center bg-[#eff4ff] rounded-lg px-1 h-8 shrink-0 border border-[#e5eeff]">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[14px] text-[#0b1c30]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-body-md-semibold text-[12px]">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[14px] text-[#0b1c30]"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] text-[12px]">
            <span className="font-label-caps text-[#45464d] text-[10px]">Package 1 Subtotal</span>
            <span className="font-headline-sm text-[#0b1c30] font-bold text-[14px]">₹{pkg1Total.toFixed(2)}</span>
          </div>
        </div>

        {/* Fulfillment Package 2: Jan Aushadhi Scheme */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-start justify-between border-b border-[#eff4ff] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a61]">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">Package 2: PMBJP Jan Aushadhi #402</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#006a61] font-label-caps text-[9px]">
                    Govt Kendra
                  </span>
                </div>
                <div className="font-body-sm text-[#45464d] text-[11px]">
                  2.8 km away • BPPI Certified • Tomorrow 09:00 AM
                </div>
              </div>
            </div>
            <span className="font-code-dense text-[#45464d] text-[11px]">Delivery: ₹15.00</span>
          </div>

          <div className="space-y-3">
            {pkg2Items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-body-md-semibold text-[#0b1c30] text-[13px]">{item.name}</span>
                    <span className="px-1 py-0.2 rounded bg-[#eff4ff] text-[#45464d] font-code-dense text-[9px]">
                      {item.schedule}
                    </span>
                  </div>
                  <div className="font-body-sm text-[#45464d] text-[11px] truncate">{item.salt}</div>
                  <div className="font-label-sm text-[#45464d] text-[10px] mt-0.5">
                    {item.manufacturer} • {item.packageQuantity}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-headline-sm text-[#006a61] font-bold text-[14px]">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="font-body-sm line-through text-[#76777d] text-[11px]">
                      ₹{(item.mrp * item.quantity).toFixed(2)}
                    </span>
                    <span className="font-label-caps text-[#006a61] text-[10px] font-bold">
                      {item.savingsPct}% OFF
                    </span>
                  </div>
                </div>

                <div className="flex items-center bg-[#eff4ff] rounded-lg px-1 h-8 shrink-0 border border-[#e5eeff]">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[14px] text-[#0b1c30]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-body-md-semibold text-[12px]">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-[14px] text-[#0b1c30]"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] text-[12px]">
            <span className="font-label-caps text-[#45464d] text-[10px]">Package 2 Subtotal</span>
            <span className="font-headline-sm text-[#0b1c30] font-bold text-[14px]">₹{pkg2Total.toFixed(2)}</span>
          </div>
        </div>

        {/* Prescription Compliance Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">description</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Prescription Attached</h3>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#89f5e7] text-[#00201d] font-label-caps text-[10px] font-bold">
              OCR VALIDATED
            </span>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-body-md-semibold text-[#0b1c30] text-[13px]">Cardiology Rx • Dr. Arvind Rao</div>
              <div className="font-body-sm text-[#45464d] text-[11px]">Narayana Hrudayalaya • Refill 2 of 6</div>
            </div>
            <button
              onClick={() => onShowToast('Validating uploaded prescription hash with CDSCO registry...')}
              className="text-[#006a61] font-label-sm text-[11px] font-semibold hover:underline"
            >
              Verify Monograph
            </button>
          </div>
          <p className="font-body-sm text-[#45464d] text-[11px]">
            Prescription records are stored securely pursuant to the DPDP Act 2026 and Drugs and Cosmetics Rule 65.
          </p>
        </div>

        {/* Generic Guardrail Settings */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2.5">
          <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Generic Safety Guardrails</h3>

          <div className="space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={strictEquivalenceOnly}
                onChange={(e) => setStrictEquivalenceOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61] mt-0.5"
              />
              <div className="text-[12px]">
                <span className="font-body-md-semibold text-[#0b1c30]">Strict Bioequivalent Replacement Only</span>
                <p className="text-[#45464d]">
                  Reject any pharmacy offering where the dissolution factor f2 is less than 50.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={callForSubstitution}
                onChange={(e) => setCallForSubstitution(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61] mt-0.5"
              />
              <div className="text-[12px]">
                <span className="font-body-md-semibold text-[#0b1c30]">Call me for pharmacist approval</span>
                <p className="text-[#45464d]">Require verbal confirmation if out-of-stock requires manufacturer change.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment & Regulatory Bill Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2.5">
          <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Bill Summary</h3>

          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between text-[#45464d]">
              <span>Branded Innovator MRP Total</span>
              <span className="line-through">₹{totalMrp.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#006a61] font-body-md-semibold">
              <span>Bioequivalent Generic Savings</span>
              <span>-₹{totalSavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#0b1c30]">
              <span>Generic Medicine Cost</span>
              <span className="font-code-dense font-bold">₹{totalGeneric.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#45464d]">
              <span>Delivery Fee (Apollo Express: FREE + PMBJP: ₹15)</span>
              <span>₹{deliveryCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#45464d]">
              <span>Cold-Chain Regulatory Sealed Packaging</span>
              <span>₹{safetyHandling.toFixed(2)}</span>
            </div>

            <div className="pt-2 border-t border-[#eff4ff] flex justify-between items-baseline text-[14px]">
              <span className="font-headline-sm text-[#0b1c30] font-bold">Total Payable</span>
              <span className="font-headline-lg-mobile text-[#006a61] font-bold text-[18px]">
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Trust Seal Badges */}
        <div className="flex items-center justify-center gap-4 py-1 text-[#45464d] text-[11px] font-label-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">verified_user</span> CDSCO
            Verified
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">ac_unit</span> Cold Chain
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">lock</span> DPDP Compliant
          </span>
        </div>
      </main>

      {/* Sticky Mobile Checkout Bar */}
      <div className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-2px_10px_rgba(0,0,0,0.06)] px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline-lg-mobile text-[#006a61] font-bold text-[20px]">
                ₹{grandTotal.toFixed(2)}
              </span>
              <span className="font-label-caps text-[#006a61] font-bold text-[11px]">Save 82%</span>
            </div>
            <span className="font-body-sm text-[#45464d] text-[11px]">RPh Pre-verified • 2 Packages</span>
          </div>

          <button
            onClick={handleProceedToPay}
            className="h-11 px-6 rounded-xl bg-[#006a61] text-white font-body-md-semibold text-[14px] flex items-center gap-2 shadow-lg hover:bg-[#006f66] active:scale-95 transition-all"
          >
            <span>Proceed to Pay</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
