import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Chat from './pages/Chat';
import Games from './pages/Games';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';

function App() {
  const path = window.location.hash.slice(1) || '/';
  const isReactPath = ['/chat', '/games', '/dashboard', '/profile', '/onboarding'].some(p => path.startsWith(p));

  if (!isReactPath) {
    return null;
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/chat"        element={<Chat />} />
        <Route path="/games"       element={<Games />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/profile"     element={<Profile />} />
        <Route path="/onboarding"  element={<Onboarding />} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;