import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import CreativeCryptoHero from './components/home/Hero';
import Featured from './components/home/Featured';
import SignUp from './components/sign/SignUp';
import SignIn from './components/sign/SignIn';
import Footer from './components/layout/Footer';

export default function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleOpenSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false); 
  };

  const handleOpenSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false); 
  };

  const handleCloseModals = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onSignInClick={handleOpenSignIn} 
        onSignUpClick={handleOpenSignUp} 
      />
      <CreativeCryptoHero />
      <Featured />
      <Footer />

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-200"
              onClick={handleCloseModals}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <SignUp onSuccess={handleCloseModals} />
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCloseModals}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-white hover:text-gray-200"
              onClick={handleCloseModals}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <SignIn onSuccess={handleCloseModals} />
          </div>
        </div>
      )}
    </div>
  );
}