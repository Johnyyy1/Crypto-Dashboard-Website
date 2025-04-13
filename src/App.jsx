import Navbar from './components/layout/Navbar';
import CreativeCryptoHero from './components/home/Hero';
import Featured from './components/home/Featured';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CreativeCryptoHero />
      <Featured />
    </div>
  );
}