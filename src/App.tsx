import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Gamepad2, Cookie, ArrowLeft, Lock } from 'lucide-react';
import CoinCountingApp from './games/CoinCounting/CoinCountingApp';
import CookieSharingApp from './games/CookieSharing/CookieSharingApp';
import takadamLogo from './assets/takadam-logo.png';

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
  const navigate = useNavigate();

  const handleGameClick = (path: string) => {
    const code = prompt("This game is locked. Please enter the access code:");
    if (code === "1234") { // You can change the access code here
      navigate(path);
    } else if (code !== null) {
      alert("Incorrect access code!");
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center relative">
      <img src={takadamLogo} alt="Takadam Logo" className="absolute top-4 left-4 h-16 object-contain" />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#47BB7B] to-[#E4B347] bg-clip-text text-transparent mb-12 mt-12 text-center">
        Takadam Learning Games Hub
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <div 
          onClick={() => handleGameClick('/coin-counting')}
          className="group relative bg-[#47BB7B]/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#47BB7B]/20 transition-all duration-300 transform hover:-translate-y-2 border-4 border-[#47BB7B]/40 cursor-pointer"
        >
          <div className="absolute top-4 right-4 bg-[#47BB7B]/20 p-3 rounded-full flex gap-2">
            <Lock className="w-8 h-8 text-[#47BB7B]" />
            <Gamepad2 className="w-8 h-8 text-[#47BB7B]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Coin Counting Adventure</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Learn to count coins and match their values! Sort the sparkling coins into the right jars.
          </p>
          <div className="inline-block bg-gradient-to-r from-[#47BB7B] to-[#E4B347] text-white font-bold py-2 px-6 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
            Unlock & Play
          </div>
        </div>

        <div 
          onClick={() => handleGameClick('/cookie-sharing')}
          className="group relative bg-[#E4B347]/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:bg-[#E4B347]/20 transition-all duration-300 transform hover:-translate-y-2 border-4 border-[#E4B347]/40 cursor-pointer"
        >
          <div className="absolute top-4 right-4 bg-[#E4B347]/20 p-3 rounded-full flex gap-2">
            <Lock className="w-8 h-8 text-[#E4B347]" />
            <Cookie className="w-8 h-8 text-[#E4B347]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Cookie Sharing Fun</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Practice division and sharing! Help split the delicious cookies evenly among friends.
          </p>
          <div className="inline-block bg-gradient-to-r from-[#47BB7B] to-[#E4B347] text-white font-bold py-2 px-6 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
            Unlock & Play
          </div>
        </div>
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
