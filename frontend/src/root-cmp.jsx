import React from 'react';
import { Routes, Route } from 'react-router';

import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { UserDetails } from './pages/user-details';
import { HomePage } from './pages/home-page.jsx';
import { ChatApp } from './pages/chat-app.jsx';
import { StayIndex } from './pages/stay-index.jsx';
import { StayDetails } from './pages/stay-details.jsx';
import { Hosting } from './pages/hosting.jsx';
import { OrderPage } from './cmps/hosting/order-page';
import { DashboardPage } from './cmps/hosting/dashboard-page';

export function RootCmp() {
  return (
    <div>
      <AppHeader />
      <main>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<StayIndex />} path='/stay' />
          <Route element={<StayDetails />} path='/stay/:stayId' />

          <Route element={<Hosting />} path='/hosting'>
            <Route element={<OrderPage />} path='/hosting/order' />
            <Route element={<DashboardPage />} path='/hosting/dashboard' />
          </Route>
          <Route element={<ChatApp />} path='/user/inbox' />
          <Route path='user/:id' element={<UserDetails />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  );
}
