import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './components/Auth';
import Dashboard from './components/Dashboard';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { FAQ } from './pages/FAQ';
import { Blog } from './pages/Blog';
import { ArticlePage } from './pages/ArticlePage';

import { Notifications } from './components/Notifications';
import { PriceHeader } from './components/PriceHeader';
import { ForgotPassword } from './components/ForgotPassword';
import { Profile } from './components/Profile';
import { Support } from './components/Support';
import { Terms } from './components/Terms';
import { PrivacyPolicy } from './components/Privacy';

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate('/login');
//     }
//   }, [user, loading, navigate]);

//   if (loading) {
//     return null;
//   }

//   return user ? <>{children}</> : null;
// }

function App() {
  const { user, setUser, loading, setLoading } = useAuthStore();

  useEffect(() => {
    // clearSession();
    
    // Simulate fetching user from local storage
    const fetchUserFromLocalStorage = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setUser(JSON.parse(user));
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUserFromLocalStorage();


  }, []);

  if (loading) {
    return null;
  }

  return (
    <Router>
      <div className="min-h-screen animated-bg text-white">
        {/* <div className="cyber-grid" />
        <div className="matrix-bg" />
        <div className="blockchain-nodes" />
        <div className="data-flow" /> */}
        <PriceHeader />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="features" element={<Features />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<Support />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="blog" element={<Blog />} />
            <Route path="terms-and-conditions" element={<Terms />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="blog/:id" element={<ArticlePage />} />
            <Route path="login" element={!user ? <Auth /> : <Navigate to="/dashboard" replace />} />
          </Route>

          <Route
            path="/dashboard"
            element={
           
                <Dashboard />
             
            }
          />

        

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Notifications />
      </div>
    </Router>
  );
}

export default App;