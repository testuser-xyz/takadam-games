import React from 'react';

const FollowThePathApp: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50 p-8 pt-24 font-sans">
      <div className="bg-yellow-400 text-yellow-900 font-black px-8 py-3 rounded-full mb-8 shadow-lg border-4 border-yellow-500 animate-pulse text-2xl uppercase tracking-wider">
        Coming Soon!
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#1E293B] mb-8 text-center">
        Follow the Path
      </h1>
      
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl max-w-4xl w-full text-left border-4 border-blue-200">
         <h2 className="text-2xl md:text-3xl font-bold text-[#47BB7B] mb-4 flex items-center gap-3">
           🎮 How it works
         </h2>
         <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
           A winding, colorful path is drawn on the screen from a character to their home. The player must use their finger or mouse to continuously trace the line from start to finish without breaking contact.
         </p>
         
         <h2 className="text-2xl md:text-3xl font-bold text-[#E4B347] mb-4 flex items-center gap-3">
           ⚙️ Functionality
         </h2>
         <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
           Continuous gesture tracking, path-following logic, and real-time visual progress indicators.
         </p>

         <h2 className="text-2xl md:text-3xl font-bold text-purple-500 mb-4 flex items-center gap-3">
           🎓 Educational Outcome
         </h2>
         <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
           Crucial for developing pre-writing motor skills, grip steadiness, and concentration.
         </p>
      </div>
    </div>
  );
};

export default FollowThePathApp;
