import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
  const passwordStrength = [hasMinLength, hasUpperCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-emerald-500';
    if (passwordStrength === 4) return 'bg-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    if (!agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
  
    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }
  
    try {
      setIsLoading(true);
  
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
  
      if (!res.ok) {
        throw new Error('Registration failed');
      }
  
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-lg p-2 shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <span className="text-xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">Quant</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
        <p className="text-gray-600 mt-2">Get started with investing today</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Create password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {/* Password strength indicator */}
          <div className="mt-2">
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 ${hasMinLength ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {hasMinLength && <Check size={12} />}
                </div>
                <span className={hasMinLength ? 'text-gray-700' : 'text-gray-500'}>At least 8 characters</span>
              </div>
              <div className="flex items-center text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 ${hasUpperCase ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {hasUpperCase && <Check size={12} />}
                </div>
                <span className={hasUpperCase ? 'text-gray-700' : 'text-gray-500'}>Uppercase letter</span>
              </div>
              <div className="flex items-center text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 ${hasNumber ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {hasNumber && <Check size={12} />}
                </div>
                <span className={hasNumber ? 'text-gray-700' : 'text-gray-500'}>Number</span>
              </div>
              <div className="flex items-center text-xs">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-1.5 ${hasSpecialChar ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  {hasSpecialChar && <Check size={12} />}
                </div>
                <span className={hasSpecialChar ? 'text-gray-700' : 'text-gray-500'}>Special character</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">Privacy Policy</Link>
            </span>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              Create account <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}