import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Trash2 } from 'lucide-react';

const COLORS = [
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' }
];

export default function MyPrideDrawingApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);
  const lineWidth = 5;
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Set white background initially
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.lineCap = 'round';
        context.lineJoin = 'round';
      }
    }
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.beginPath();
      context.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const { x, y } = getCoordinates(e);
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.strokeStyle = isEraser ? '#ffffff' : color;
      context.lineWidth = isEraser ? 15 : lineWidth;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    const context = canvasRef.current?.getContext('2d');
    if (context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear your drawing?")) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (canvas && context) {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden mt-8 border-4 border-purple-200">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
            My Pride Drawing
          </h1>
          <p className="text-purple-100 text-lg sm:text-xl font-medium">
            What toy makes you feel super happy? Draw it below, then write your name!
          </p>
        </div>
        
        <div className="p-8 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4 bg-gray-100 p-4 rounded-2xl w-full max-w-lg shadow-inner">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  setColor(c.value);
                  setIsEraser(false);
                }}
                className={`w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 shadow-sm ${
                  color === c.value && !isEraser ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
                aria-label={`Select ${c.name} color`}
              />
            ))}
            
            <div className="w-px h-12 bg-gray-300 mx-2"></div>
            
            <button
              onClick={() => setIsEraser(true)}
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 border-gray-200 transition-transform duration-200 hover:scale-110 ${
                isEraser ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              title="Eraser"
            >
              <Eraser className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="relative group touch-none select-none">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="bg-white border-4 border-dashed border-purple-300 rounded-2xl cursor-crosshair max-w-full h-auto shadow-lg"
              style={{ touchAction: 'none' }}
            />
          </div>

          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 bg-red-100 text-red-600 font-bold py-3 px-6 rounded-full hover:bg-red-200 transition-colors border-2 border-red-200 shadow-sm"
            >
              <Trash2 className="w-5 h-5" />
              Clear Canvas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
