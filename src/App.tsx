import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Gamepad2, Cookie, ArrowLeft, Lock, Palette, Type, Music, Star, Maximize, Apple, Activity, Smile, Moon } from 'lucide-react';
import CoinCountingApp from './games/CoinCounting/CoinCountingApp';
import CookieSharingApp from './games/CookieSharing/CookieSharingApp';
import MyPrideDrawingApp from './games/MyPrideDrawing/MyPrideDrawingApp';
import ColorSplashMatchApp from './games/ColorSplashMatch/ColorSplashMatchApp';
import ABCBubblePopApp from './games/ABCBubblePop/ABCBubblePopApp';
import AnimalSoundMatchApp from './games/AnimalSoundMatch/AnimalSoundMatchApp';
import CountTheStarsApp from './games/CountTheStars/CountTheStarsApp';
import BigAndSmallSortApp from './games/BigAndSmallSort/BigAndSmallSortApp';
import FruitCatcherApp from './games/FruitCatcher/FruitCatcherApp';
import FollowThePathApp from './games/FollowThePath/FollowThePathApp';
import EmotionFacesApp from './games/EmotionFaces/EmotionFacesApp';
import ShadowMatchApp from './games/ShadowMatch/ShadowMatchApp';
import MusicalTapApp from './games/MusicalTap/MusicalTapApp';
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

const CATEGORIES = [
  {
    name: "Numbers & Logic 🧮",
    games: [
      { id: "/coin-counting", title: "Coin Counting Adventure", desc: "Learn to count coins and match their values! Sort the sparkling coins into the right jars.", color: "from-[#47BB7B] to-[#2DA060]", bgLight: "bg-[#47BB7B]/10", borderOut: "border-[#47BB7B]/40", bgIcon: "bg-[#47BB7B]/20", textMain: "text-[#47BB7B]", icon: Gamepad2 },
      { id: "/cookie-sharing", title: "Cookie Sharing Fun", desc: "Practice division and sharing! Help split the delicious cookies evenly among friends.", color: "from-[#E4B347] to-[#D09A2E]", bgLight: "bg-[#E4B347]/10", borderOut: "border-[#E4B347]/40", bgIcon: "bg-[#E4B347]/20", textMain: "text-[#E4B347]", icon: Cookie },
      { id: "/count-the-stars", title: "Count the Stars", desc: "Practice counting 1 to 10 by tapping on all the pretty stars! Out loud, fun voice counting.", color: "from-[#A8E6CF] to-[#80D6B6]", bgLight: "bg-[#A8E6CF]/10", borderOut: "border-[#A8E6CF]/40", bgIcon: "bg-[#A8E6CF]/20", textMain: "text-[#47BB7B]", icon: Star },
      { id: "/big-small-sort", title: "Big & Small Sort", desc: "Sort objects into big or small containers. Learn sizes in a fun way!", color: "from-[#FF9F1C] to-[#E38100]", bgLight: "bg-[#FF9F1C]/10", borderOut: "border-[#FF9F1C]/40", bgIcon: "bg-[#FF9F1C]/20", textMain: "text-[#FF9F1C]", icon: Maximize },
    ]
  },
  {
    name: "Colors & Shapes 🎨",
    games: [
      { id: "/color-splash", title: "Color Splash Match", desc: "Drag and drop colored blobs into matching buckets. Quick, bouncy fun!", color: "from-[#FF6B6B] to-[#E84E4E]", bgLight: "bg-[#FF6B6B]/10", borderOut: "border-[#FF6B6B]/40", bgIcon: "bg-[#FF6B6B]/20", textMain: "text-[#FF6B6B]", icon: Palette },
      { id: "/follow-path", title: "Follow the Path", desc: "Trace funny shapes from beginning to end with your finger to practice fine motor skills.", color: "from-[#8AC926] to-[#6EB11B]", bgLight: "bg-[#8AC926]/10", borderOut: "border-[#8AC926]/40", bgIcon: "bg-[#8AC926]/20", textMain: "text-[#8AC926]", icon: Activity },
      { id: "/shadow-match", title: "Shadow Match", desc: "Which shadow is this? Match bright objects to their dark outlines.", color: "from-[#6A4C93] to-[#513675]", bgLight: "bg-[#6A4C93]/10", borderOut: "border-[#6A4C93]/40", bgIcon: "bg-[#6A4C93]/20", textMain: "text-[#6A4C93]", icon: Moon },
    ]
  },
  {
    name: "Animals, Letters & Earth 🌍",
    games: [
      { id: "/abc-bubble-pop", title: "ABC Bubble Pop", desc: "Pop the floating alphabet bubbles! Listen to the voice prompt to find the right letter.", color: "from-[#4ECDC4] to-[#36B1A8]", bgLight: "bg-[#4ECDC4]/10", borderOut: "border-[#4ECDC4]/40", bgIcon: "bg-[#4ECDC4]/20", textMain: "text-[#4ECDC4]", icon: Type },
      { id: "/animal-sound-match", title: "Animal Sound Match", desc: "Oink, Moo, Baa! Match the animal to its fun sound. Fast and silly!", color: "from-[#FFE66D] to-[#E8CF55]", bgLight: "bg-[#FFE66D]/10", borderOut: "border-[#FFE66D]/40", bgIcon: "bg-[#FFE66D]/20", textMain: "text-[#E4B347]", icon: Activity },
      { id: "/fruit-catcher", title: "Fruit Catcher", desc: "Move your basket horizontally to catch all the yummy falling fruits before time runs out.", color: "from-[#F7B267] to-[#DF9749]", bgLight: "bg-[#F7B267]/10", borderOut: "border-[#F7B267]/40", bgIcon: "bg-[#F7B267]/20", textMain: "text-[#F7B267]", icon: Apple },
    ]
  },
  {
    name: "Creativity & Feelings ✨",
    games: [
      { id: "/my-pride-drawing", title: "My Pride Drawing", desc: "What toy makes you feel super happy? Draw it on the big canvas and write your name!", color: "from-purple-500 to-purple-700", bgLight: "bg-purple-500/10", borderOut: "border-purple-500/40", bgIcon: "bg-purple-500/20", textMain: "text-purple-600", icon: Gamepad2 },
      { id: "/musical-tap", title: "Musical Tap", desc: "Let's make some music! Tap the magical instruments to hear sweet sound bursts.", color: "from-[#FF595E] to-[#E03A3F]", bgLight: "bg-[#FF595E]/10", borderOut: "border-[#FF595E]/40", bgIcon: "bg-[#FF595E]/20", textMain: "text-[#FF595E]", icon: Music },
      { id: "/emotion-faces", title: "Emotion Faces", desc: "Are they happy, sad, or angry? Look at the face and pick the correct emotion.", color: "from-[#1982C4] to-[#12639A]", bgLight: "bg-[#1982C4]/10", borderOut: "border-[#1982C4]/40", bgIcon: "bg-[#1982C4]/20", textMain: "text-[#1982C4]", icon: Smile },
    ]
  }
];

function Home() {
  const navigate = useNavigate();

  const handleGameClick = (path: string) => {
    const code = prompt("This game is locked. Please enter the access code:");
    if (code === "1234") { 
      navigate(path);
    } else if (code !== null) {
      alert("Incorrect access code!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 flex flex-col items-center relative overflow-hidden font-sans">
      <div className="w-full bg-white shadow-sm flex flex-col md:flex-row items-center justify-center p-4 md:p-6 relative mb-8 gap-2 md:gap-0">
         <img src={takadamLogo} alt="Takadam Logo" className="h-12 md:absolute md:left-6 md:h-16 object-contain" />
         <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#80D6B6] via-[#47BB7B] to-[#2DA060] bg-clip-text text-transparent text-center drop-shadow-sm py-2 md:py-4">
           Takadam Games
         </h1>
      </div>
      
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col gap-12">
        {CATEGORIES.map((category, idx) => (
          <div key={idx} className="w-full">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-700 mb-8 border-b-4 border-slate-200 pb-2 inline-block">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.games.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                  className={`group relative ${game.bgLight} rounded-[32px] p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-[4px] md:border-[6px] ${game.borderOut} cursor-pointer flex flex-col h-full`}
                >
                  <div className={`absolute top-4 right-4 ${game.bgIcon} p-2 rounded-full flex items-center gap-1.5`}>
                    <Lock className={`w-3.5 h-3.5 ${game.textMain}`} />
                    <game.icon className={`w-5 h-5 ${game.textMain}`} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 pr-20 mb-3 leading-tight">{game.title}</h3>
                  <p className="text-slate-600 mb-6 text-lg flex-grow font-medium leading-snug">
                    {game.desc}
                  </p>
                  <div className={`inline-block bg-gradient-to-r ${game.color} text-white font-bold py-3 px-6 rounded-full opacity-90 group-hover:opacity-100 transition-opacity text-center shadow-sm w-full text-lg tracking-wide uppercase`}>
                    Play Now!
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
        <Route path="/my-pride-drawing" element={<><BackButton/><MyPrideDrawingApp /></>} />
        <Route path="/color-splash" element={<><BackButton/><ColorSplashMatchApp /></>} />
        <Route path="/abc-bubble-pop" element={<><BackButton/><ABCBubblePopApp /></>} />
        <Route path="/animal-sound-match" element={<><BackButton/><AnimalSoundMatchApp /></>} />
        <Route path="/count-the-stars" element={<><BackButton/><CountTheStarsApp /></>} />
        <Route path="/big-small-sort" element={<><BackButton/><BigAndSmallSortApp /></>} />
        <Route path="/fruit-catcher" element={<><BackButton/><FruitCatcherApp /></>} />
        <Route path="/follow-path" element={<><BackButton/><FollowThePathApp /></>} />
        <Route path="/emotion-faces" element={<><BackButton/><EmotionFacesApp /></>} />
        <Route path="/shadow-match" element={<><BackButton/><ShadowMatchApp /></>} />
        <Route path="/musical-tap" element={<><BackButton/><MusicalTapApp /></>} />
      </Routes>
    </Router>
  );
}

export default App;
