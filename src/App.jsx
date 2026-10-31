import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Dashboard } from './components/Dashboard/Dashboard';
import { initialClients, initialInvoices, initialReminderRules, initialReminderLogs } from './data/mockData';

export default function App() {
  const [view, setView] = useState('landing'); // landing, dashboard
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const [data, setData] = useState({
    clients: initialClients,
    invoices: initialInvoices,
    reminderRules: initialReminderRules,
    reminderLogs: initialReminderLogs,
  });

  const updateData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500">
      <Navbar
        view={view}
        setView={setView}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <main className="flex-1">
        {view === 'landing' ? (
          <LandingPage onGetStarted={() => { setIsLoggedIn(true); setView('dashboard'); }} />
        ) : (
          <Dashboard
            data={data}
            setData={updateData}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            mobileNavOpen={mobileNavOpen}
            setMobileNavOpen={setMobileNavOpen}
            onBackToLanding={() => setView('landing')}
          />
        )}
      </main>
      {view === 'landing' && <Footer setView={setView} />}
    </div>
  );
}
