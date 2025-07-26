import React, { useState } from 'react';

export default function AdminAuthenticationSettings() {
  // Authentication Method Settings
  const [passwordLoginEnabled, setPasswordLoginEnabled] = useState(true);
  const [googleSsoEnabled, setGoogleSsoEnabled] = useState(false);
  const [microsoftSsoEnabled, setMicrosoftSsoEnabled] = useState(false);

  // Multi-Factor Authentication (MFA) Settings
  const [mfaRequiredForAdmins, setMfaRequiredForAdmins] = useState(true);
  const [allowedMfaMethods, setAllowedMfaMethods] = useState({
    authenticatorApp: true,
    smsOtp: false, // SMS OTP is generally less secure than app-based
    emailOtp: false, // Email OTP is generally less secure than app-based
  });
  const [mfaGracePeriodDays, setMfaGracePeriodDays] = useState(7);

  // Password Policy Settings
  const [minPasswordLength, setMinPasswordLength] = useState(12);
  const [requireUppercase, setRequireUppercase] = useState(true);
  const [requireLowercase, setRequireLowercase] = useState(true);
  const [requireNumbers, setRequireNumbers] = useState(true);
  const [requireSymbols, setRequireSymbols] = useState(false); // Often optional, but good to have
  const [passwordExpiryDays, setPasswordExpiryDays] = useState(90);

  // Session Management
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(60);
  const [concurrentSessionsAllowed, setConcurrentSessionsAllowed] = useState(false);

  // Account Lockout
  const [maxFailedAttempts, setMaxFailedAttempts] = useState(5);
  const [lockoutDurationMinutes, setLockoutDurationMinutes] = useState(30);

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });

    // Basic validation
    if (minPasswordLength < 8) {
      setSaveMessage({ type: 'error', text: 'Minimum password length must be at least 8 characters.' });
      setIsSaving(false);
      return;
    }
    if (mfaGracePeriodDays < 0 || mfaGracePeriodDays > 30) {
        setSaveMessage({ type: 'error', text: 'MFA grace period must be between 0 and 30 days.' });
        setIsSaving(false);
        return;
    }
    if (maxFailedAttempts < 1) {
        setSaveMessage({ type: 'error', text: 'Maximum failed attempts must be at least 1.' });
        setIsSaving(false);
        return;
    }


    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

    try {
      const settingsData = {
        authenticationMethods: { passwordLoginEnabled, googleSsoEnabled, microsoftSsoEnabled },
        mfa: {
          mfaRequiredForAdmins,
          allowedMfaMethods,
          mfaGracePeriodDays,
        },
        passwordPolicy: {
          minPasswordLength,
          requireUppercase,
          requireLowercase,
          requireNumbers,
          requireSymbols,
          passwordExpiryDays,
        },
        sessionManagement: { sessionTimeoutMinutes, concurrentSessionsAllowed },
        accountLockout: { maxFailedAttempts, lockoutDurationMinutes },
      };

      console.log('Saving authentication settings:', settingsData);
      setSaveMessage({ type: 'success', text: 'Authentication settings updated successfully!' });
    } catch (error) {
      console.error('Error saving authentication settings:', error);
      setSaveMessage({ type: 'error', text: `Failed to save settings: ${error.message}` });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Authentication Settings</h1>
          <p className="text-lg text-gray-600">Configure how administrators and users authenticate and manage security policies.</p>
        </header>

        {/* Save Message Display */}
        {saveMessage.text && (
          <div
            className={`p-4 mb-6 rounded-lg text-lg font-medium ${
              saveMessage.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
            role="alert"
          >
            {saveMessage.text}
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Authentication Methods */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2h-5a2 2 0 01-2-2V9a2 2 0 012-2h5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-4m0 0a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              Authentication Methods
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="passwordLoginEnabled"
                  checked={passwordLoginEnabled}
                  onChange={(e) => setPasswordLoginEnabled(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="passwordLoginEnabled" className="ml-3 text-base text-gray-700 font-medium cursor-pointer">
                  Enable Standard Password Login
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="googleSsoEnabled"
                  checked={googleSsoEnabled}
                  onChange={(e) => setGoogleSsoEnabled(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="googleSsoEnabled" className="ml-3 text-base text-gray-700 font-medium cursor-pointer">
                  Enable Google Single Sign-On (SSO)
                </label>
                <span className="ml-2 text-sm text-gray-500">(Requires Google API configuration)</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="microsoftSsoEnabled"
                  checked={microsoftSsoEnabled}
                  onChange={(e) => setMicrosoftSsoEnabled(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="microsoftSsoEnabled" className="ml-3 text-base text-gray-700 font-medium cursor-pointer">
                  Enable Microsoft Single Sign-On (SSO)
                </label>
                <span className="ml-2 text-sm text-gray-500">(Requires Azure AD configuration)</span>
              </div>
            </div>
          </section>

          {/* Multi-Factor Authentication (MFA) */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.003 12.003 0 002.944 12c0 2.899 1.192 5.584 3.146 7.551A12.003 12.003 0 0012 21.056a12.003 12.003 0 005.904-2.005 11.955 11.955 0 01-8.618-3.04zm7.367-1.121a2 2 0 112.828 2.828L12 17.5l-4.243-4.243a2 2 0 112.828-2.828L12 14.657l-1.556-1.556z" />
              </svg>
              Multi-Factor Authentication (MFA)
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mfaRequiredForAdmins"
                  checked={mfaRequiredForAdmins}
                  onChange={(e) => setMfaRequiredForAdmins(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="mfaRequiredForAdmins" className="ml-3 text-base text-gray-700 font-medium cursor-pointer">
                  Require MFA for All Admin Accounts
                </label>
                <p className="text-sm text-gray-600 ml-8 mt-1">
                  Highly recommended for enhanced security.
                </p>
              </div>

              {mfaRequiredForAdmins && (
                <div className="pl-8 pt-4 border-t border-gray-100">
                  <label className="block text-gray-700 text-base font-medium mb-2">Allowed MFA Methods:</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="authenticatorApp"
                        checked={allowedMfaMethods.authenticatorApp}
                        onChange={(e) => setAllowedMfaMethods({ ...allowedMfaMethods, authenticatorApp: e.target.checked })}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="authenticatorApp" className="ml-3 text-base text-gray-700 cursor-pointer">
                        Authenticator App (Google Authenticator, Authy, etc.)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="smsOtp"
                        checked={allowedMfaMethods.smsOtp}
                        onChange={(e) => setAllowedMfaMethods({ ...allowedMfaMethods, smsOtp: e.target.checked })}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="smsOtp" className="ml-3 text-base text-gray-700 cursor-pointer">
                        SMS OTP (One-Time Password via text message)
                      </label>
                      <span className="ml-2 text-sm text-red-500">(Less secure, consider carefully)</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="emailOtp"
                        checked={allowedMfaMethods.emailOtp}
                        onChange={(e) => setAllowedMfaMethods({ ...allowedMfaMethods, emailOtp: e.target.checked })}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="emailOtp" className="ml-3 text-base text-gray-700 cursor-pointer">
                        Email OTP (One-Time Password via email)
                      </label>
                      <span className="ml-2 text-sm text-red-500">(Less secure, consider carefully)</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="mfaGracePeriodDays" className="block text-gray-700 text-base font-medium mb-2">MFA Grace Period (Days for new admins):</label>
                    <input
                      type="number"
                      id="mfaGracePeriodDays"
                      value={mfaGracePeriodDays}
                      onChange={(e) => setMfaGracePeriodDays(parseInt(e.target.value))}
                      min="0"
                      max="30"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      disabled={!mfaRequiredForAdmins}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      New admin accounts will have this many days to set up MFA before it becomes mandatory.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Password Policy */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z" />
              </svg>
              Password Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="minPasswordLength" className="block text-gray-700 text-base font-medium mb-2">Minimum Password Length:</label>
                <input
                  type="number"
                  id="minPasswordLength"
                  value={minPasswordLength}
                  onChange={(e) => setMinPasswordLength(parseInt(e.target.value))}
                  min="8"
                  max="64"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="block text-gray-700 text-base font-medium mb-2">Password Requirements:</label>
                <div className="flex items-center">
                  <input type="checkbox" id="requireUppercase" checked={requireUppercase} onChange={(e) => setRequireUppercase(e.target.checked)} className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="requireUppercase" className="ml-3 text-base text-gray-700 cursor-pointer">Require Uppercase Letters (A-Z)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="requireLowercase" checked={requireLowercase} onChange={(e) => setRequireLowercase(e.target.checked)} className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="requireLowercase" className="ml-3 text-base text-gray-700 cursor-pointer">Require Lowercase Letters (a-z)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="requireNumbers" checked={requireNumbers} onChange={(e) => setRequireNumbers(e.target.checked)} className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="requireNumbers" className="ml-3 text-base text-gray-700 cursor-pointer">Require Numbers (0-9)</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="requireSymbols" checked={requireSymbols} onChange={(e) => setRequireSymbols(e.target.checked)} className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
                  <label htmlFor="requireSymbols" className="ml-3 text-base text-gray-700 cursor-pointer">Require Symbols (!@#$%^&*)</label>
                </div>
              </div>
              <div>
                <label htmlFor="passwordExpiryDays" className="block text-gray-700 text-base font-medium mb-2">Password Expiration (Days):</label>
                <input
                  type="number"
                  id="passwordExpiryDays"
                  value={passwordExpiryDays}
                  onChange={(e) => setPasswordExpiryDays(parseInt(e.target.value))}
                  min="0"
                  max="365"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Set to 0 for no expiration (not recommended for critical systems).
                </p>
              </div>
            </div>
          </section>

          {/* Session Management */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Session Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sessionTimeoutMinutes" className="block text-gray-700 text-base font-medium mb-2">Session Timeout (Minutes):</label>
                <input
                  type="number"
                  id="sessionTimeoutMinutes"
                  value={sessionTimeoutMinutes}
                  onChange={(e) => setSessionTimeoutMinutes(parseInt(e.target.value))}
                  min="5"
                  max="1440" // 24 hours
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Users will be automatically logged out after this period of inactivity.
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="concurrentSessionsAllowed"
                  checked={concurrentSessionsAllowed}
                  onChange={(e) => setConcurrentSessionsAllowed(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="concurrentSessionsAllowed" className="ml-3 text-base text-gray-700 font-medium cursor-pointer">
                  Allow Concurrent Sessions
                </label>
                <p className="text-sm text-gray-600 ml-8 mt-1">
                  If unchecked, logging in from a new location will log out previous sessions.
                </p>
              </div>
            </div>
          </section>

          {/* Account Lockout */}
          <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z" />
              </svg>
              Account Lockout Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="maxFailedAttempts" className="block text-gray-700 text-base font-medium mb-2">Max Failed Login Attempts:</label>
                <input
                  type="number"
                  id="maxFailedAttempts"
                  value={maxFailedAttempts}
                  onChange={(e) => setMaxFailedAttempts(parseInt(e.target.value))}
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Account will be locked after this many consecutive failed login attempts.
                </p>
              </div>
              <div>
                <label htmlFor="lockoutDurationMinutes" className="block text-gray-700 text-base font-medium mb-2">Lockout Duration (Minutes):</label>
                <input
                  type="number"
                  id="lockoutDurationMinutes"
                  value={lockoutDurationMinutes}
                  onChange={(e) => setLockoutDurationMinutes(parseInt(e.target.value))}
                  min="1"
                  max="1440" // 24 hours
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Duration an account remains locked before it can be retried.
                </p>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-md text-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out flex items-center justify-center"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Authentication Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}