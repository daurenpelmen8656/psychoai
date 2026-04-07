import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Games from './pages/Games';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';

const REACT_PATHS = ['/chat', '/games', '/dashboard', '/profile', '/onboarding'];
const isReactPath = REACT_PATHS.some(p => window.location.pathname.startsWith(p));

function App() {
  if (!isReactPath) {
    document.getElementById('react-root').style.display = 'none';
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat"        element={<Chat />} />
        <Route path="/games"       element={<Games />} />
        <Route path="/dashboard"   element={<Dashboard />} />
        <Route path="/profile"     element={<Profile />} />
        <Route path="/onboarding"  element={<Onboarding />} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;