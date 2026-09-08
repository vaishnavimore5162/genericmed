import React, { useState } from 'react';

interface OrderTrackingScreenProps {
  onNavigate: (screen: string) => void;
  onShowToast: (msg: string) => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [whatsappSync, setWhatsappSync] = useState(true);
  const [calendarSync, setCalendarSync] = useState(true);
  const [showLiveMapModal, setShowLiveMapModal] = useState(false);

  return (
    <div className="flex flex-col relative w-full bg-[#f8f9ff] min-h-screen text-[#0b1c30]">
      {/* Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('search')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0b1c30] hover:bg-[#eff4ff]"
              aria-label="Home"
            >
              <span className="material-symbols-outlined text-[22px]">home</span>
            </button>
            <div>
              <span className="font-label-caps text-[#006a61] text-[10px]">REAL-TIME FULFILLMENT</span>
              <h1 className="font-headline-sm text-[#0b1c30] text-[15px]">Order Tracking #GM-89241</h1>
            </div>
          </div>

          <button
            onClick={() => onShowToast('Tracking link shared with family members via SMS')}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#45464d] hover:bg-[#eff4ff]"
            aria-label="Share"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-3 py-3.5 space-y-3.5 pb-24">
        {/* Order Confirmed Banner */}
        <div className="bg-[#89f5e7]/30 border border-[#86f2e4] rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">check</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-[#00201d] text-[16px]">Order Placed &amp; Paid</h2>
                <div className="font-code-dense text-[#006a61] text-[11px]">ID: GM-89241-BLR • UPI Paid ₹85.00</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#006a61] text-white font-label-caps text-[10px]">
              VERIFIED RPh
            </span>
          </div>

          <div className="bg-white/80 rounded-lg p-2.5 flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-1.5 text-[#005049]">
              <span className="material-symbols-outlined text-[18px]">savings</span>
              <span className="font-body-md-semibold">Total Saved vs MRP</span>
            </div>
            <span className="font-headline-sm text-[#006a61] font-bold text-[15px]">₹384.50 (82% Saved)</span>
          </div>
        </div>

        {/* Live Multi-Store Dispatches Section Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-[#0b1c30] text-[16px]">Live Multi-Store Dispatches (2 Shipments)</h3>
          <span className="font-label-sm text-[#006a61] text-[11px] font-semibold">Smart Split Active</span>
        </div>

        {/* Package 1: Express Delivery Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-start justify-between border-b border-[#eff4ff] pb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-body-md-semibold text-[#0b1c30] text-[14px]">Package 1: Apollo Express</span>
                <span className="px-1.5 py-0.5 rounded bg-[#89f5e7] text-[#00201d] font-label-caps text-[9px]">
                  ON ROUTE
                </span>
              </div>
              <p className="font-body-sm text-[#45464d] text-[11px]">ETA 35 mins • Delivering to Koramangala 4th Block</p>
            </div>
            <div className="text-right">
              <span className="font-headline-sm text-[#006a61] font-bold text-[16px]">10:49 AM</span>
              <div className="font-label-sm text-[#45464d] text-[10px]">Estimated Arrival</div>
            </div>
          </div>

          {/* Interactive Map Visual Mini-Card */}
          <div 
            onClick={() => setShowLiveMapModal(true)}
            className="w-full h-32 rounded-lg bg-[#e5eeff] relative overflow-hidden border border-[#c6c6cd]/30 cursor-pointer group"
          >
            {/* Styled Map Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#eff4ff] to-[#dce9ff] flex items-center justify-center">
              <svg className="w-full h-full opacity-30" viewBox="0 0 400 200">
                <path d="M20,50 Q150,20 200,80 T380,120" stroke="#006a61" strokeWidth="6" fill="none" strokeDasharray="8 4" />
                <path d="M50,180 Q100,100 200,80 T350,30" stroke="#76777d" strokeWidth="4" fill="none" />
              </svg>
            </div>

            {/* Live Route Pin Badge */}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur shadow-sm text-[11px] font-label-sm flex items-center gap-1.5 text-[#006a61]">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping" />
              <span>Live Cold-Chain Route (22°C Monitored)</span>
            </div>

            {/* Rider & Store Markers */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 rounded-md p-2 shadow-sm flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#006a61] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                </div>
                <div>
                  <span className="font-body-md-semibold text-[#0b1c30]">Rajesh M. (Bajaj Chetak EV)</span>
                  <div className="text-[#45464d]">Vaccinated • Thermal Insulated Box</div>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShowToast('Connecting call to delivery partner Rajesh M...');
                }}
                className="px-2 py-1 rounded bg-[#eff4ff] text-[#006a61] font-bold hover:bg-[#dce9ff]"
              >
                Call
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] font-label-caps">
              <span className="text-[#006a61] font-bold">1. Confirmed</span>
              <span className="text-[#006a61] font-bold">2. RPh Verified</span>
              <span className="text-[#006a61] font-bold">3. On Route</span>
              <span className="text-[#76777d]">4. Delivered</span>
            </div>

            <div className="w-full h-2 bg-[#e5eeff] rounded-full overflow-hidden flex">
              <div className="w-3/4 h-full bg-[#006a61] rounded-full" />
            </div>

            <div className="text-[11px] text-[#45464d] bg-[#eff4ff] p-2 rounded">
              <span className="font-body-md-semibold text-[#0b1c30]">Latest update:</span> RPh Sunil V.
              (KA-PCI-49210) verified Atorva-G 20mg &amp; Metformin-G. Sealed in tamper-evident bag.
            </div>
          </div>

          {/* Item Breakdown */}
          <div className="space-y-1.5 pt-1 text-[12px] border-t border-[#eff4ff]">
            <div className="flex justify-between text-[#0b1c30]">
              <span>1x Atorva-G 20mg (Zydus)</span>
              <span className="font-code-dense font-semibold">₹18.00</span>
            </div>
            <div className="flex justify-between text-[#0b1c30]">
              <span>2x Metformin-G 500mg SR (Cipla)</span>
              <span className="font-code-dense font-semibold">₹25.00</span>
            </div>
          </div>
        </div>

        {/* Package 2: Jan Aushadhi Scheme Delivery Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-start justify-between border-b border-[#eff4ff] pb-2.5">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-body-md-semibold text-[#0b1c30] text-[14px]">
                  Package 2: PMBJP Jan Aushadhi #402
                </span>
                <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#006a61] font-label-caps text-[9px]">
                  SCHEDULED
                </span>
              </div>
              <p className="font-body-sm text-[#45464d] text-[11px]">BPPI Central Supply • Direct Kendra Dispatch</p>
            </div>
            <div className="text-right">
              <span className="font-headline-sm text-[#0b1c30] font-bold text-[14px]">Tomorrow</span>
              <div className="font-label-sm text-[#45464d] text-[10px]">09:30 AM Slot</div>
            </div>
          </div>

          <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">inventory_2</span>
              <div>
                <span className="font-body-md-semibold text-[#0b1c30]">1x Jan-Amlodipine 5mg (10 Tab)</span>
                <div className="text-[#45464d] text-[11px]">Batch BPPI-2026 • Verified Shelf-Life 2028</div>
              </div>
            </div>
            <span className="font-code-dense font-bold text-[#006a61]">₹6.00</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#45464d]">
            <span className="material-symbols-outlined text-[16px] text-[#006a61]">local_shipping</span>
            <span>Local hub delivery bundled with tomorrow morning dispatch schedule.</span>
          </div>
        </div>

        {/* Smart Dose & Adherence Setup */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a61] text-[20px]">notifications_active</span>
              <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Smart Dose Reminders</h3>
            </div>
            <span className="font-label-caps text-[#006a61] text-[10px] font-bold">AUTOMATED</span>
          </div>

          <p className="font-body-sm text-[#45464d] text-[12px]">
            Because you ordered 30-day chronic doses, our adherence system can automatically notify you via WhatsApp at
            exact clinical dosage times.
          </p>

          <div className="space-y-2 pt-1">
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-[#eff4ff]">
              <span className="font-body-sm text-[#0b1c30] text-[12px]">Daily WhatsApp Dosage Alerts</span>
              <input
                type="checkbox"
                checked={whatsappSync}
                onChange={(e) => setWhatsappSync(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-[#eff4ff]">
              <span className="font-body-sm text-[#0b1c30] text-[12px]">Google Calendar Sync (8:00 AM / 9:00 PM)</span>
              <input
                type="checkbox"
                checked={calendarSync}
                onChange={(e) => setCalendarSync(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a61]"
              />
            </label>
          </div>
        </div>

        {/* Regulatory & Custody Records */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] space-y-2.5">
          <h3 className="font-headline-sm text-[#0b1c30] text-[15px]">Regulatory &amp; Custody Records</h3>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => onShowToast('GST Tax Invoice PDF downloaded with Form 20B license number')}
              className="p-2.5 rounded-lg bg-[#eff4ff] text-left hover:bg-[#e5eeff] border border-[#dce9ff]"
            >
              <div className="flex items-center gap-1 text-[#006a61] font-semibold">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>GST Tax &amp; Dispense Invoice</span>
              </div>
              <div className="text-[#45464d] mt-1 text-[10px]">Contains Batch # &amp; Exp Date</div>
            </button>

            <button
              onClick={() => onShowToast('DPDP Prescription Vault digital certificate generated')}
              className="p-2.5 rounded-lg bg-[#eff4ff] text-left hover:bg-[#e5eeff] border border-[#dce9ff]"
            >
              <div className="flex items-center gap-1 text-[#006a61] font-semibold">
                <span className="material-symbols-outlined text-[16px]">policy</span>
                <span>DPDP Vault Certificate</span>
              </div>
              <div className="text-[#45464d] mt-1 text-[10px]">Encrypted audit proof</div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setShowLiveMapModal(true)}
            className="w-full h-11 rounded-xl bg-[#006a61] text-white font-body-md-semibold text-[13px] flex items-center justify-center gap-2 shadow-md hover:bg-[#006f66]"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Track Dispatches on Full Live Map</span>
          </button>

          <button
            onClick={() => onNavigate('search')}
            className="w-full h-10 rounded-xl bg-white border border-[#c6c6cd] text-[#45464d] font-body-md-semibold text-[12px] flex items-center justify-center gap-1 hover:bg-[#eff4ff]"
          >
            <span>Return to Medication Directory</span>
          </button>
        </div>
      </main>

      {/* Full Live Map Modal */}
      {showLiveMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#e5eeff] flex flex-col max-h-[85vh]">
            <div className="p-3.5 border-b border-[#e5eeff] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006a61]">my_location</span>
                <div>
                  <h4 className="font-headline-sm text-[#0b1c30] text-[15px]">Live Telemetry &amp; Cold-Chain</h4>
                  <p className="font-body-sm text-[#45464d] text-[11px]">Rajesh M. • 1.2 km away (ETA 10:49 AM)</p>
                </div>
              </div>
              <button
                onClick={() => setShowLiveMapModal(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#45464d]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Interactive Map Visual */}
            <div className="relative h-64 bg-[#e5eeff] p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#eff4ff] to-[#dce9ff]">
                {/* SVG street lines */}
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  <line x1="20" y1="40" x2="280" y2="40" stroke="#c6c6cd" strokeWidth="4" />
                  <line x1="80" y1="10" x2="80" y2="190" stroke="#c6c6cd" strokeWidth="4" />
                  <line x1="220" y1="10" x2="220" y2="190" stroke="#c6c6cd" strokeWidth="4" />
                  <line x1="20" y1="140" x2="280" y2="140" stroke="#c6c6cd" strokeWidth="4" />
                  {/* Route path */}
                  <path
                    d="M80,40 L150,40 L150,140 L220,140"
                    stroke="#006a61"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Rider location icon */}
                  <circle cx="150" cy="90" r="10" fill="#006a61" />
                  <circle cx="150" cy="90" r="18" fill="#86f2e4" opacity="0.4" className="animate-ping" />
                </svg>
              </div>

              <div className="relative z-10 flex justify-between">
                <span className="px-2.5 py-1 rounded bg-[#006a61] text-white font-code-dense text-[10px] shadow">
                  Apollo Pharmacy (Start)
                </span>
                <span className="px-2.5 py-1 rounded bg-[#0f172a] text-white font-code-dense text-[10px] shadow">
                  Home (Destination)
                </span>
              </div>

              <div className="relative z-10 bg-white/95 rounded-xl p-3 shadow-md border border-[#e5eeff]">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-body-md-semibold text-[#0b1c30]">Thermal Box Sensor:</span>
                  <span className="font-code-dense text-[#006a61] font-bold">22.4°C (Safe Room Temp 15-25°C)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#45464d] mt-1">
                  <span>GPS Telemetry: 12.9352° N, 77.6245° E</span>
                  <span className="text-[#006a61] font-bold">Signal Strong</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white flex justify-end">
              <button
                onClick={() => setShowLiveMapModal(false)}
                className="h-9 px-4 rounded-xl bg-[#0f172a] text-white font-body-md-semibold text-[12px]"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

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
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#45464d]"
          >
            <span className="material-symbols-outlined text-[22px]">prescriptions</span>
            <span className="font-label-sm text-[11px]">Regimen</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="flex flex-col items-center justify-center min-w-[60px] min-h-[44px] gap-0.5 text-[#006a61] font-body-md-semibold"
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
