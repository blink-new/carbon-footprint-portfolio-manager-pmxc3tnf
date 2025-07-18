import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/AppSidebar'
import Dashboard from '@/pages/Dashboard'
import CarbonCalculator from '@/pages/CarbonCalculator'
import PortfolioManager from '@/pages/PortfolioManager'
import CreditsMarketplace from '@/pages/CreditsMarketplace'
import Analytics from '@/pages/Analytics'
import Settings from '@/pages/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <SidebarProvider>
        <div className="min-h-screen bg-background flex w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calculator" element={<CarbonCalculator />} />
                <Route path="/portfolio" element={<PortfolioManager />} />
                <Route path="/marketplace" element={<CreditsMarketplace />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
        <Toaster />
      </SidebarProvider>
    </Router>
  )
}

export default App