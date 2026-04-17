import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Cookie, ArrowLeft } from 'lucide-react';
import CoinCountingApp from './games/CoinCounting/CoinCountingApp';
import CookieSharingApp from './games/CookieSharing/CookieSharingApp';

function BackButton() {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate('/')}
      className="fixed top-4 left-4 z-50 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-[#FFFBEB] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-12 mt-8 text-center">
        Kids Learning Games Hub
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link 
          to="/coin-counting" 
          className="group relative bg-[#FBBF24]/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#FBBF24]/20 transition-all duration-300 transform hover:-translate-y-2 border-4 border-[#FBBF24]/40 cursor-pointer"
        >
          <div className="absolute top-4 right-4 bg-[#FBBF24]/30 p-3 rounded-full">
            <Gamepad2 className="w-8 h-8 text-[#D97706]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Coin Counting Adventure</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Learn to count coins and match their values! Sort the sparkling coins into the right jars.
          </p>
          <div className="inline-block bg-[#FBBF24] text-white font-bold py-2 px-6 rounded-full group-hover:bg-[#F59E0B] transition-colors">
            Play Now
          </div>
        </Link>

        <Link 
          to="/cookie-sharing" 
          className="group relative bg-pink-100/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-pink-100 transition-all duration-300 transform hover:-translate-y-2 border-4 border-pink-400/40 cursor-pointer"
        >
          <div className="absolute top-4 right-4 bg-pink-200 p-3 rounded-full">
            <Cookie className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Cookie Sharing Fun</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Practice division and sharing! Help split the delicious cookies evenly among friends.
          </p>
          <div className="inline-block bg-pink-500 text-white font-bold py-2 px-6 rounded-full group-hover:bg-pink-600 transition-colors">
            Play Now
          </div>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin-counting" element={<><BackButton/><CoinCountingApp /></>} />
        <Route path="/cookie-sharing" element={<><BackButton/><CookieSharingApp /></>} />
      </Routes>
    </Router>
  );
}

export default App;
