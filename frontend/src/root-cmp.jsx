import React from 'react'
import { Routes, Route } from 'react-router'

import { UserDetails } from './pages/user-details'
// import { HomePage } from './pages/home-page.jsx'
import { MessagesPage } from './pages/messages-page.jsx'
import { StayIndex } from './pages/stay-index.jsx'
import { StayDetails } from './pages/stay-details.jsx'
import { Hosting } from './pages/hosting.jsx'
import { OrderPage } from './cmps/hosting/order-page'
import { DashboardPage } from './cmps/hosting/dashboard-page'
import { TripPage } from './pages/trip-page'
import { UI } from './pages/ui'
import { BookPage } from './pages/book-page'
import { NewStay } from './pages/new-stay'
import { WishList } from './pages/wishlist'
import { UserMsg } from './cmps/user-msg'

export function RootCmp() {
  return (
    <main>
      <UserMsg />
      <Routes>
        <Route element={<StayIndex />} path='/' />
        {/* TODO for development, remove on production */}
        <Route element={<UI />} path='/ui' />
        <Route element={<StayIndex />} path='/stay' />
        <Route element={<StayDetails />} path='/stay/:stayId' />
        <Route element={<NewStay />} path='/new-stay' />
        <Route element={<BookPage />} path='/book/stay/:stayId' />
        <Route element={<TripPage />} path='/trip' />
        <Route element={<WishList />} path='/wishlist' />
        <Route element={<Hosting />} path='/hosting'>
          <Route element={<OrderPage />} path='/hosting/order' />
          <Route element={<DashboardPage />} path='/hosting/dashboard' />
        </Route>
        <Route element={<MessagesPage />} path='/user/inbox' />
        <Route element={<UserDetails />} path='user/:id' />
      </Routes>
    </main>
  )
}
