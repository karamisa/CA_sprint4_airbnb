import { HomePage } from './pages/home-page.jsx';
import { ChatApp } from './pages/chat-app.jsx';
import { StayIndex } from './pages/stay-index.jsx';
import { StayDetails } from './pages/stay-details.jsx';
import { HostDashboard } from './pages/host-dashboard.jsx';

// Routes accesible from the main navigation (in AppHeader)
const routes = [
  {
    path: '/',
    component: <HomePage />,
    label: 'Home 🏠',
  },
  {
    path: 'stay',
    component: <StayIndex />,
    label: 'Stay',
  },
  {
    path: 'stay/:stayId',
    component: <StayDetails />,
    label: 'Stay Details',
  },

  {
    path: 'dashboard',
    component: <HostDashboard />,
    label: 'Dashboard',
  },
  {
    path: 'user/inbox',
    component: <ChatApp />,
    label: 'Messages',
  }
];

export default routes;
