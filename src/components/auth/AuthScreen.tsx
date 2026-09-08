import React, { useState } from 'react';
import { ASSETS, DEMO_USERS } from '../../data/mockData';
import { UserProfile, UserRole } from '../../types';

interface AuthScreenProps {
  onNavigate: (screen: string) => void;
  onLoginSuccess: (user: UserProfile) => void;
  onShowToast: (msg: string) => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  onShowToast,
  initialMode = 'login',
  initialRole = 'patient',
  currentUser,
  onLogout,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('9845021980');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['5', '4', '8', '2', '9', '1']);
  const [otpTimer, setOtpTimer] = useState(28);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Role specific register fields
  const [regAbhaId, setRegAbhaId] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regGender, setRegGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>('Male');
  const [regPincode, setRegPincode] = useState('');
  const [regCity, setRegCity] = useState('');
  
  // Pharmacist fields
  const [regPharmacyName, setRegPharmacyName] = useState('');
  const [regDlNumber, setRegDlNumber] = useState('');
  const [regPharmacistReg, setRegPharmacistReg] = useState('');

  // Regulator fields
  const [regOfficerId, setRegOfficerId] = useState('');
  const [regDesignation, setRegDesignation] = useState('Drug Inspector');
  const [regJurisdiction, setRegJurisdiction] = useState('Zone-South (KA/TN/KL)');

  // Consents
  const [consentDpdp, setConsentDpdp] = useState(true);
  const [consentTerms, setConsentTerms] = useState(true);

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Quick Demo Login
  const handleQuickDemoLogin = (demoUser: UserProfile) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(demoUser);
      onShowToast(`Welcome back, ${demoUser.name} (${demoUser.role.toUpperCase()})`);
      onNavigate(demoUser.role === 'regulator' ? 'search' : 'search');
    }, 400);
  };

  // Handle Login Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      onShowToast('Please enter your mobile number, email, or ABHA ID');
      return;
    }

    if (loginMethod === 'password' && !loginPassword) {
      onShowToast('Please enter your password');
      return;
    }

    if (loginMethod === 'otp' && !otpSent) {
      setOtpSent(true);
      onShowToast('OTP sent: 548291 to ' + loginIdentifier);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Find matching demo user or create a session
      const matched = DEMO_USERS.find(
        (u) =>
          u.phone.includes(loginIdentifier) ||
          u.email.toLowerCase() === loginIdentifier.toLowerCase() ||
          u.abhaId?.replace(/-/g, '') === loginIdentifier.replace(/-/g, '')
      );

      const user: UserProfile = matched || {
        id: `usr-${Date.now()}`,
        name: selectedRole === 'patient' ? 'Verified Patient' : selectedRole === 'pharmacist' ? 'Authorized Pharmacist' : 'Regulatory Officer',
        role: selectedRole,
        email: loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@genericmed.in`,
        phone: loginIdentifier.startsWith('+91') ? loginIdentifier : `+91 ${loginIdentifier}`,
        abhaId: selectedRole === 'patient' ? '91-4829-1029-3819' : undefined,
        licenseNumber: selectedRole === 'pharmacist' ? 'KA-BGL-2024-R512' : undefined,
        isVerified: true,
        city: 'Bengaluru',
        pincode: '560034',
      };

      onLoginSuccess(user);
      onShowToast(`Authentication successful! Logged in as ${user.name}`);
      onNavigate('search');
    }, 600);
  };

  // Handle Registration Submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim()) {
      onShowToast('Please enter your full legal name');
      return;
    }
    if (!regMobile.trim() || regMobile.length < 10) {
      onShowToast('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      onShowToast('Password must be at least 6 characters');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      onShowToast('Passwords do not match');
      return;
    }
    if (!consentDpdp || !consentTerms) {
      onShowToast('Please accept the DPDP data consent and terms to proceed');
      return;
    }

    if (selectedRole === 'pharmacist' && (!regDlNumber.trim() || !regPharmacyName.trim())) {
      onShowToast('Please enter Pharmacy Name and Drug License Form 20/21 number');
      return;
    }

    if (selectedRole === 'regulator' && !regOfficerId.trim()) {
      onShowToast('Please enter your official CDSCO Officer / Employee ID');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: regFullName.trim(),
        role: selectedRole,
        email: regEmail.trim() || `${regMobile}@genericmed.in`,
        phone: regMobile.startsWith('+91') ? regMobile : `+91 ${regMobile}`,
        abhaId: selectedRole === 'patient' && regAbhaId ? regAbhaId : undefined,
        age: regAge ? parseInt(regAge) : undefined,
        gender: regGender,
        pincode: regPincode || '560034',
        city: regCity || 'Bengaluru',
        pharmacyName: selectedRole === 'pharmacist' ? regPharmacyName : undefined,
        licenseNumber: selectedRole === 'pharmacist' ? regDlNumber : undefined,
        pharmacistRegNo: selectedRole === 'pharmacist' ? regPharmacistReg : undefined,
        regulatorOfficerId: selectedRole === 'regulator' ? regOfficerId : undefined,
        regulatorDesignation: selectedRole === 'regulator' ? regDesignation : undefined,
        jurisdictionZone: selectedRole === 'regulator' ? regJurisdiction : undefined,
        isVerified: true,
        linkedPrescriptionsCount: 0,
        activeOrdersCount: 0,
      };

      onLoginSuccess(newUser);
      onShowToast(`Registration complete! Welcome to GenericMed, ${newUser.name}`);
      onNavigate('search');
    }, 700);
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
            <div className="flex items-center gap-2">
              <img src={ASSETS.logoMobile} alt="GenericMed" className="h-7 w-auto object-contain" />
              <div className="hidden xs:block">
                <span className="font-label-caps text-[#006a61] text-[9px] block">CDSCO COMPLIANT</span>
                <span className="font-body-md-semibold text-[#0b1c30] text-[13px] leading-tight block">
                  Identity Portal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-label-caps text-[#006a61] bg-[#eff4ff] border border-[#86f2e4]/60 px-2 py-0.5 rounded-full text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse" />
              DPDP 2023 Shield
            </span>
          </div>
        </div>
      </header>

      {/* Active User Banner if already logged in */}
      {currentUser && (
        <div className="bg-[#eff4ff] border-b border-[#dce9ff] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold text-[14px]">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="text-[12px] font-bold text-[#0b1c30] flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-white text-[#006a61] border border-[#dce9ff]">
                  {currentUser.role}
                </span>
              </div>
              <div className="text-[11px] text-[#45464d]">
                {currentUser.abhaId ? `ABHA: ${currentUser.abhaId}` : currentUser.phone}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('search')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white text-[#006a61] rounded-lg border border-[#dce9ff] hover:bg-[#f8f9ff]"
            >
              Continue
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-2.5 py-1 text-[11px] font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Form Content */}
      <main className="flex-1 px-4 py-5 max-w-lg mx-auto w-full flex flex-col">
        {/* Title & Auth Mode Switcher */}
        <div className="text-center mb-5">
          <div className="inline-flex p-1 bg-[#e5eeff] rounded-xl border border-[#d0e1fd] mb-3">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-5 py-1.5 rounded-lg text-[13px] font-body-md-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-white text-[#006a61] shadow-sm'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`px-5 py-1.5 rounded-lg text-[13px] font-body-md-semibold transition-all ${
                authMode === 'register'
                  ? 'bg-white text-[#006a61] shadow-sm'
                  : 'text-[#45464d] hover:text-[#0b1c30]'
              }`}
            >
              Create Account
            </button>
          </div>
          <h2 className="font-headline-sm text-[#0b1c30] text-[20px] font-bold">
            {authMode === 'login' ? 'Welcome to GenericMed' : 'Register for Verified Health Access'}
          </h2>
          <p className="text-[12px] text-[#45464d] mt-1 max-w-sm mx-auto">
            {authMode === 'login'
              ? 'Access bioequivalent generic medicines, Jan Aushadhi Kendras, and clinical verification.'
              : 'Create your digital healthcare credential. Linked with ABHA and CDSCO drug safety registries.'}
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="mb-5">
          <label className="block text-[11px] font-label-caps uppercase tracking-wider text-[#45464d] mb-1.5">
            Select Account Archetype
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: 'patient' as UserRole,
                label: 'Patient / Citizen',
                icon: 'person',
                desc: 'Family & Rx',
              },
              {
                id: 'pharmacist' as UserRole,
                label: 'Pharmacist',
                icon: 'local_pharmacy',
                desc: 'Form 20/21',
              },
              {
                id: 'regulator' as UserRole,
                label: 'CDSCO Officer',
                icon: 'verified_user',
                desc: 'Audit & Gov',
              },
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRole(role.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-start ${
                  selectedRole === role.id
                    ? 'border-[#006a61] bg-[#eff4ff] shadow-sm ring-1 ring-[#006a61]'
                    : 'border-[#e5eeff] bg-white hover:border-[#cbdbf5]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      selectedRole === role.id ? 'text-[#006a61]' : 'text-[#76777d]'
                    }`}
                  >
                    {role.icon}
                  </span>
                  {selectedRole === role.id && (
                    <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                  )}
                </div>
                <div className="font-body-md-semibold text-[12px] text-[#0b1c30] leading-tight">
                  {role.label}
                </div>
                <div className="text-[10px] text-[#45464d] mt-0.5">{role.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ===================== LOGIN FORM ===================== */}
        {authMode === 'login' ? (
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-5">
            {/* Login Method Toggle */}
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3 mb-4">
              <span className="text-[12px] font-semibold text-[#0b1c30]">Authentication Method</span>
              <div className="flex items-center gap-1 bg-[#eff4ff] p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    loginMethod === 'otp' ? 'bg-white text-[#006a61] shadow-xs' : 'text-[#45464d]'
                  }`}
                >
                  ⚡ Fast OTP
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('password')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    loginMethod === 'password' ? 'bg-white text-[#006a61] shadow-xs' : 'text-[#45464d]'
                  }`}
                >
                  🔑 Password
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Identifier Field */}
              <div>
                <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                  {selectedRole === 'patient'
                    ? 'Mobile Number or ABHA ID'
                    : selectedRole === 'pharmacist'
                    ? 'Mobile or Drug License Number'
                    : 'CDSCO Officer ID or Official Email'}
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[20px]">
                    {selectedRole === 'patient' ? 'badge' : selectedRole === 'pharmacist' ? 'store' : 'account_balance'}
                  </span>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder={
                      selectedRole === 'patient'
                        ? 'e.g. 9845021980 or 91-4829-1029-3819'
                        : selectedRole === 'pharmacist'
                        ? 'e.g. 9822089123 or KA-BGL-2023-R402'
                        : 'e.g. CDSCO-GOI-2024-098'
                    }
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] focus:ring-2 focus:ring-[#006a61]/10 bg-white"
                  />
                </div>
              </div>

              {/* Password or OTP Flow */}
              {loginMethod === 'password' ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[12px] font-medium text-[#0b1c30]">Password</label>
                    <button
                      type="button"
                      onClick={() => onShowToast('Password reset link dispatched to registered mobile')}
                      className="text-[11px] text-[#006a61] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[20px]">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter account password"
                      className="w-full h-10 pl-10 pr-10 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] focus:ring-2 focus:ring-[#006a61]/10 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#76777d] hover:text-[#0b1c30]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                /* OTP Verification Section */
                <div className="bg-[#eff4ff] rounded-xl p-3 border border-[#dce9ff]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[12px] font-medium text-[#0b1c30] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006a61]">phonelink_lock</span>
                      <span>One-Time Security Passcode (OTP)</span>
                    </div>
                    {otpSent ? (
                      <span className="text-[11px] text-[#006a61] font-mono font-medium">
                        Resend in {otpTimer}s
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          onShowToast('OTP code: 548291 dispatched to ' + loginIdentifier);
                        }}
                        className="text-[11px] font-semibold text-[#006a61] hover:underline"
                      >
                        Request OTP
                      </button>
                    )}
                  </div>

                  {otpSent ? (
                    <div>
                      <div className="flex items-center justify-between gap-1.5 my-2">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value;
                              const updated = [...otpDigits];
                              updated[idx] = val;
                              setOtpDigits(updated);
                            }}
                            className="w-10 h-10 text-center font-mono font-bold text-[16px] text-[#006a61] bg-white rounded-lg border border-[#cbdbf5] focus:outline-none focus:border-[#006a61] focus:ring-1 focus:ring-[#006a61]"
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#45464d] mt-1">
                        <span>Simulated OTP: <strong className="font-mono text-[#006a61]">548291</strong></span>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpDigits(['5', '4', '8', '2', '9', '1']);
                            onShowToast('Demo OTP 548291 prefilled');
                          }}
                          className="text-[#006a61] font-medium underline"
                        >
                          Auto-Fill
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#45464d]">
                      We will send a 6-digit CDSCO-compliant instant authentication code via SMS and WhatsApp.
                    </p>
                  )}
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-[12px]">
                <label className="flex items-center gap-2 cursor-pointer text-[#45464d]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#006a61] focus:ring-[#006a61]"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#006a61] hover:bg-[#00524b] text-white font-body-md-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">lock_open</span>
                    <span>{loginMethod === 'otp' && !otpSent ? 'Send OTP & Continue' : 'Sign In Securely'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-center gap-2 text-[11px] text-[#45464d]">
              <span className="material-symbols-outlined text-[14px] text-[#006a61]">shield</span>
              <span>Protected by National Health Authority DPDP standards</span>
            </div>
          </div>
        ) : (
          /* ===================== REGISTRATION FORM ===================== */
          <div className="bg-white rounded-2xl border border-[#e5eeff] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-5">
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                  Full Legal Name <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[20px]">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] bg-white"
                  />
                </div>
              </div>

              {/* Mobile and Email in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                    Mobile Number <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#76777d] text-[12px] font-mono font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={regMobile}
                      onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                      placeholder="9845021980"
                      className="w-full h-10 pl-12 pr-3 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#76777d] text-[20px]">
                      mail
                    </span>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="rajesh.kumar@health.gov.in"
                      className="w-full h-10 pl-10 pr-3 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {selectedRole === 'patient' && (
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-[#006a61] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
                      Ayushman Bharat Health Account (ABHA)
                    </span>
                    <span className="text-[10px] text-[#006a61] bg-white px-2 py-0.5 rounded-full border border-[#cbdbf5]">
                      Optional
                    </span>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={regAbhaId}
                      onChange={(e) => setRegAbhaId(e.target.value)}
                      placeholder="14-digit ABHA ID (e.g. 91-4829-1029-3819)"
                      className="w-full h-9 px-3 rounded-lg border border-[#cbdbf5] text-[12px] font-mono text-[#0b1c30] bg-white focus:outline-none focus:border-[#006a61]"
                    />
                    <div className="text-[10px] text-[#45464d] mt-1 flex items-center justify-between">
                      <span>Enables automatic digital prescription import</span>
                      <button
                        type="button"
                        onClick={() => {
                          setRegAbhaId('91-4829-1029-3819');
                          onShowToast('Prefilled test ABHA ID');
                        }}
                        className="text-[#006a61] underline font-medium"
                      >
                        Sample ABHA
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] text-[#45464d] mb-1">Age</label>
                      <input
                        type="number"
                        value={regAge}
                        onChange={(e) => setRegAge(e.target.value)}
                        placeholder="54"
                        className="w-full h-8 px-2 rounded-lg border border-[#cbdbf5] text-[12px] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#45464d] mb-1">Gender</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value as any)}
                        className="w-full h-8 px-1 rounded-lg border border-[#cbdbf5] text-[11px] bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#45464d] mb-1">Pincode</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={regPincode}
                        onChange={(e) => setRegPincode(e.target.value)}
                        placeholder="560034"
                        className="w-full h-8 px-2 rounded-lg border border-[#cbdbf5] text-[12px] bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'pharmacist' && (
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-3">
                  <div className="text-[12px] font-semibold text-[#006a61] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                    Pharmacy &amp; Drug License Verification (Form 20/21)
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#0b1c30] mb-0.5">
                      Pharmacy / Kendra Name <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regPharmacyName}
                      onChange={(e) => setRegPharmacyName(e.target.value)}
                      placeholder="e.g. Jan Aushadhi Kendra #402"
                      className="w-full h-9 px-3 rounded-lg border border-[#cbdbf5] text-[12px] bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#0b1c30] mb-0.5">
                        Form 20/21 License <span className="text-[#ba1a1a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={regDlNumber}
                        onChange={(e) => setRegDlNumber(e.target.value)}
                        placeholder="KA-BGL-2023-R402"
                        className="w-full h-9 px-2 rounded-lg border border-[#cbdbf5] text-[12px] font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#0b1c30] mb-0.5">
                        State RPh Reg No.
                      </label>
                      <input
                        type="text"
                        value={regPharmacistReg}
                        onChange={(e) => setRegPharmacistReg(e.target.value)}
                        placeholder="KSPC-88210"
                        className="w-full h-9 px-2 rounded-lg border border-[#cbdbf5] text-[12px] font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'regulator' && (
                <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#dce9ff] space-y-3">
                  <div className="text-[12px] font-semibold text-[#006a61] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    CDSCO Regulatory Auditor Credentials
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#0b1c30] mb-0.5">
                      Officer ID / Government Code <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regOfficerId}
                      onChange={(e) => setRegOfficerId(e.target.value)}
                      placeholder="e.g. CDSCO-GOI-2024-098"
                      className="w-full h-9 px-3 rounded-lg border border-[#cbdbf5] text-[12px] font-mono bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#0b1c30] mb-0.5">Designation</label>
                      <input
                        type="text"
                        value={regDesignation}
                        onChange={(e) => setRegDesignation(e.target.value)}
                        className="w-full h-9 px-2 rounded-lg border border-[#cbdbf5] text-[12px] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#0b1c30] mb-0.5">Jurisdiction Zone</label>
                      <input
                        type="text"
                        value={regJurisdiction}
                        onChange={(e) => setRegJurisdiction(e.target.value)}
                        className="w-full h-9 px-2 rounded-lg border border-[#cbdbf5] text-[12px] bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                    Password <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full h-10 px-3 pr-9 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-2.5 text-[#76777d]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showRegPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-[#0b1c30] mb-1">
                    Confirm Password <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full h-10 px-3 rounded-xl border border-[#c6c6cd] text-[13px] font-body-sm text-[#0b1c30] focus:outline-none focus:border-[#006a61] bg-white"
                  />
                </div>
              </div>

              {/* DPDP Consent */}
              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#45464d] leading-snug">
                  <input
                    type="checkbox"
                    checked={consentDpdp}
                    onChange={(e) => setConsentDpdp(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-[#006a61] focus:ring-[#006a61]"
                  />
                  <span>
                    I consent to prescription data handling under the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> for generic equivalence and adherence telemetry.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[#45464d] leading-snug">
                  <input
                    type="checkbox"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-[#006a61] focus:ring-[#006a61]"
                  />
                  <span>
                    I agree to the <strong>Drugs and Cosmetics Act, 1940</strong> Schedule H rules and GenericMed platform terms.
                  </span>
                </label>
              </div>

              {/* Submit Register */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#006a61] hover:bg-[#00524b] text-white font-body-md-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Registering Credential...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    <span>Create Verified Account</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ===================== QUICK 1-CLICK DEMO LOGIN ACCOUNTS ===================== */}
        <div className="bg-[#eff4ff] rounded-2xl border border-[#dce9ff] p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[12px] font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006a61]">bolt</span>
              <span>1-Click Test &amp; Demo Logins</span>
            </span>
            <span className="text-[10px] text-[#006a61] font-mono bg-white px-2 py-0.5 rounded-full border border-[#cbdbf5]">
              Quick Evaluation
            </span>
          </div>
          <p className="text-[11px] text-[#45464d] mb-3">
            Instantly evaluate the portal with pre-verified personas across Patient, Pharmacist, and CDSCO Auditor roles:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DEMO_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickDemoLogin(user)}
                className="bg-white hover:bg-[#f8f9ff] border border-[#d0e1fd] hover:border-[#006a61] p-2.5 rounded-xl text-left transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#006a61]/10 text-[#006a61] flex items-center justify-center shrink-0 font-bold text-[12px]">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-body-md-semibold text-[12px] text-[#0b1c30] truncate group-hover:text-[#006a61]">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-[#45464d] truncate">
                      {user.role === 'patient'
                        ? `Patient (ABHA: ${user.abhaId?.slice(0, 7)}...)`
                        : user.role === 'pharmacist'
                        ? `Pharmacist (Kendra #402)`
                        : `CDSCO Liaison Auditor`}
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#76777d] group-hover:text-[#006a61] shrink-0 ml-1">
                  login
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Switcher */}
        <div className="mt-4 text-center text-[12px] text-[#45464d]">
          {authMode === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-[#006a61] font-bold hover:underline"
              >
                Create Account Now
              </button>
            </span>
          ) : (
            <span>
              Already registered on GenericMed?{' '}
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-[#006a61] font-bold hover:underline"
              >
                Sign In Instead
              </button>
            </span>
          )}
        </div>
      </main>
    </div>
  );
};
