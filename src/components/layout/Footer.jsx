import { Twitter, Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-gradient-to-b from-white to-gray-50 pt-16 pb-8">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-100 to-emerald-50 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-r from-amber-50 to-yellow-100 blur-3xl opacity-15"></div>
      
      <div className="max-w-[2000px] mx-auto px-6 lg:px-16">
        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg p-2 mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold">Quant</h2>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Combining real-time data, advanced analytics, and machine learning to transform how you invest in the crypto market.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Twitter size={18} className="text-gray-700" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Linkedin size={18} className="text-gray-700" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Github size={18} className="text-gray-700" />
              </a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                <Instagram size={18} className="text-gray-700" />
              </a>
            </div>
          </div>
          
          {/* Navigation columns */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Portfolio Tracker</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">AI Analytics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Market Alerts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Mobile App</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Press Kit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">API Status</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a></li>
            </ul>
          </div>
        </div>
      
        {/* <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-2">Stay updated with market insights</h3>
              <p className="text-gray-600 mb-4">Get weekly AI-powered market analysis directly to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Bottom footer */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Quant. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Cookie Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}