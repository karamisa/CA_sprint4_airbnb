import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { HostDashboard } from './pages/host-dashboard.jsx'


export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<StayIndex />} path="/stay" />
          <Route element={<StayDetails />} path="/stay/:stayId" />
          <Route element={<HostDashboard />} path="/dashboard" />
          <Route element={<ChatApp />} path="/user/inbox" />
          <Route path='user/:id' element={<UserDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
