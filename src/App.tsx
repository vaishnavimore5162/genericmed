import React, { useState } from 'react';
import { INITIAL_CART, DEMO_USERS } from './data/mockData';
import { CartItem, MedicineOffer, UserProfile } from './types';
import { TopNavigationPortalBar } from './components/common/TopNavigationPortalBar';
import { ToastNotification } from './components/common/ToastNotification';

// Patient App Screens
import { SearchCompareScreen } from './components/patient/SearchCompareScreen';
import { MedicineDetailsScreen } from './components/patient/MedicineDetailsScreen';
import { PatientAdherenceScreen } from './components/patient/PatientAdherenceScreen';
import { CartCheckoutScreen } from './components/patient/CartCheckoutScreen';
import { OrderTrackingScreen } from './components/patient/OrderTrackingScreen';
import { AuthScreen } from './components/auth/AuthScreen';
import { UserProfileModal } from './components/auth/UserProfileModal';

// Clinical Governance Console
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { PharmacyOnboardingView } from './components/admin/PharmacyOnboardingView';
import { CatalogEquivalenceView } from './components/admin/CatalogEquivalenceView';
import { PricingAnomalyView } from './components/admin/PricingAnomalyView';

export default function App() {
  const [appMode, setAppMode] = useState<'patient' | 'admin'>('patient');
  const [patientScreen, setPatientScreen] = useState<string>('search');
  const [adminTab, setAdminTab] = useState<string>('onboarding');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [isPhoneFramed, setIsPhoneFramed] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile State (defaults to Rajesh Kumar with persistence)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('genericmed_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0];
    } catch {
      return DEMO_USERS[0];
    }
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('genericmed_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('genericmed_user');
    } catch {}
    showToast('Signed out of account');
  };

  const handleAddToCart = (offer: MedicineOffer) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === offer.medicineName);
      if (existing) {
        return prev.map((item) =>
          item.name === offer.medicineName ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          packageId: offer.badgeType === 'govt' ? 'pkg-2' : 'pkg-1',
          name: offer.medicineName,
          salt: 'Atorvastatin Calcium 20mg',
          schedule: 'Sched H',
          manufacturer: offer.manufacturer,
          packageQuantity: '10 Tablets / Strip',
          price: offer.price,
          mrp: offer.originalPrice || 128.50,
          quantity: 1,
          savingsPct: offer.discountPct || 86,
          bioequivalentScore: 'f2 = 71.4',
        },
      ];
    });
    showToast(`Added ${offer.medicineName} to cart`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Helper for admin header titles
  const getAdminHeaderInfo = () => {
    switch (adminTab) {
      case 'onboarding':
        return {
          title: 'Pharmacy Onboarding & Verification Console',
          subtitle: 'CDSCO Form 20/21, Registered Pharmacist credential verification & physical geofence audits',
        };
      case 'catalog':
        return {
          title: 'Canonical Medicine Catalog & Generic Equivalence Engine',
          subtitle: 'National CDSCO Master Index, in-vitro dissolution profiles & f2 score calculation engine',
        };
      case 'anomalies':
        return {
          title: 'Pricing Anomaly Monitor & Rx Audit Queue',
          subtitle: 'Sub-floor anti-dumping enforcement, Schedule H1/X audit, and DPDP cryptographic verification',
        };
      default:
        return {
          title: 'Clinical Governance Console',
          subtitle: 'Operational control plane',
        };
    }
  };

  const adminHeaderInfo = getAdminHeaderInfo();

  return (
    <div className="min-h-screen bg-[#070e1b] flex flex-col font-body antialiased">
      {/* Universal Top Portal Switcher Bar */}
      <TopNavigationPortalBar
        appMode={appMode}
        onSetAppMode={setAppMode}
        patientScreen={patientScreen}
        onSetPatientScreen={setPatientScreen}
        adminTab={adminTab}
        onSetAdminTab={setAdminTab}
        isPhoneFramed={isPhoneFramed}
        onTogglePhoneFrame={() => setIsPhoneFramed(!isPhoneFramed)}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col">
        {appMode === 'patient' ? (
          <div className="flex-1 flex items-center justify-center p-0 sm:p-4 bg-[#0a1222]">
            {/* Phone Container */}
            <div
              className={`w-full bg-[#f8f9ff] transition-all duration-300 relative overflow-hidden ${
                isPhoneFramed
                  ? 'max-w-[430px] rounded-[38px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[9px] border-[#1e293b] min-h-[880px] my-2'
                  : 'max-w-full min-h-screen'
              }`}
            >
              {/* Smartphone Status Bar (when framed) */}
              {isPhoneFramed && (
                <div className="h-7 bg-[#0b1c30] text-white px-6 flex items-center justify-between text-[11px] font-medium tracking-tight select-none">
                  <span>9:41</span>
                  {/* Dynamic Island / Camera Notch */}
                  <div className="w-20 h-3.5 bg-black rounded-full" />
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[13px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>
              )}

              {/* Active Screen Component */}
              <div className="relative">
                {patientScreen === 'search' && (
                  <SearchCompareScreen
                    onNavigate={setPatientScreen}
                    onAddToCart={handleAddToCart}
                    cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onShowToast={showToast}
                    currentUser={currentUser}
                    onOpenProfile={() => setIsProfileModalOpen(true)}
                  />
                )}

                {patientScreen === 'details' && (
                  <MedicineDetailsScreen
                    onNavigate={setPatientScreen}
                    onAddToCart={handleAddToCart}
                    cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onShowToast={showToast}
                  />
                )}

                {patientScreen === 'adherence' && (
                  <PatientAdherenceScreen
                    onNavigate={setPatientScreen}
                    onShowToast={showToast}
                  />
                )}

                {patientScreen === 'cart' && (
                  <CartCheckoutScreen
                    onNavigate={setPatientScreen}
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onClearCart={handleClearCart}
                    onShowToast={showToast}
                    currentUser={currentUser}
                  />
                )}

                {patientScreen === 'orders' && (
                  <OrderTrackingScreen
                    onNavigate={setPatientScreen}
                    onShowToast={showToast}
                  />
                )}

                {patientScreen === 'auth' && (
                  <AuthScreen
                    onNavigate={setPatientScreen}
                    onLoginSuccess={handleLoginSuccess}
                    onShowToast={showToast}
                    currentUser={currentUser}
                    onLogout={handleLogout}
                  />
                )}
              </div>

              {/* Smartphone Home Indicator Bar (when framed) */}
              {isPhoneFramed && (
                <div className="sticky bottom-0 w-full h-4 bg-white flex items-center justify-center pointer-events-none z-50">
                  <div className="w-32 h-1 bg-[#0b1c30]/40 rounded-full" />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Governance Console Mode */
          <div className="flex-1 flex min-h-screen bg-[#f8f9ff]">
            {/* Desktop Admin Sidebar */}
            <AdminSidebar
              currentTab={adminTab}
              onSelectTab={setAdminTab}
              onSwitchToPatientView={() => setAppMode('patient')}
            />

            {/* Admin Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <AdminHeader
                title={adminHeaderInfo.title}
                subtitle={adminHeaderInfo.subtitle}
                onSwitchToPatientView={() => setAppMode('patient')}
                onShowToast={showToast}
                currentUser={currentUser}
                onOpenProfile={() => setIsProfileModalOpen(true)}
              />

              <main className="flex-1 overflow-y-auto">
                {adminTab === 'onboarding' && <PharmacyOnboardingView onShowToast={showToast} />}
                {adminTab === 'catalog' && <CatalogEquivalenceView onShowToast={showToast} />}
                {adminTab === 'anomalies' && <PricingAnomalyView onShowToast={showToast} />}
              </main>
            </div>
          </div>
        )}
      </div>

      {/* User Profile & Credential Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchUser={handleLoginSuccess}
        onNavigate={setPatientScreen}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
