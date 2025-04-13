import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUndo, FaTrash, FaPalette, FaShare, FaSignOutAlt, FaPen, FaEraser, FaDownload, FaWhatsapp } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const SketchBoard = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [strokeHistory, setStrokeHistory] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [currentColor, setCurrentColor] = useState('#e96989');
  const [brushSize, setBrushSize] = useState(5);
  const [isSharing, setIsSharing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Color palette options
  const colors = [
    '#e96989', '#000000', '#ffffff', '#ff0000', 
    '#00ff00', '#0000ff', '#ffff00', '#ff00ff'
  ];

  // Brush sizes
  const sizes = [2, 5, 8, 12, 16];

  // WhatsApp sharing URI
  const whatsappUri = import.meta.env.VITE_WHATSAPP_URI || "https://wa.me/";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = 500; // Fixed height as in the original component
      
      // Fill canvas with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      redrawCanvas();
      setCanvasReady(true);
    };
    
    // Redraw all strokes
    const redrawCanvas = () => {
      // Clear canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw all strokes
      strokeHistory.forEach(stroke => {
        if (stroke.length > 0) {
          ctx.beginPath();
          ctx.moveTo(stroke[0].x, stroke[0].y);
          stroke.forEach((point, index) => {
            if (index > 0) {
              ctx.lineTo(point.x, point.y);
            }
          });
          ctx.strokeStyle = stroke[0].color;
          ctx.lineWidth = stroke[0].size || brushSize;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      });
    };
    
    // Initialize canvas
    resizeCanvas();
    
    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [strokeHistory, brushSize]);

  const getCanvasPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    // Handle both mouse and touch events
    let clientX, clientY;
    
    if (e.touches && e.touches.length > 0) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setDrawing(true);
    const { x, y } = getCanvasPosition(e);
    setLastX(x);
    setLastY(y);
    setCurrentStroke([{ 
      x, 
      y, 
      color: tool === 'eraser' ? '#ffffff' : currentColor,
      size: brushSize
    }]);
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasPosition(e);
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    setCurrentStroke(prev => [...prev, { 
      x, 
      y, 
      color: tool === 'eraser' ? '#ffffff' : currentColor,
      size: brushSize
    }]);
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    if (drawing && currentStroke.length > 1) {
      setStrokeHistory(prev => [...prev, currentStroke]);
    }
    setDrawing(false);
  };

  const clearBoard = () => {
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setStrokeHistory([]);
    }
  };

  const undoLastStroke = () => {
    setStrokeHistory(prev => prev.slice(0, -1));
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'impatient-pink-design.png';
    link.href = dataURL;
    link.click();
  };

  const shareViaWhatsApp = () => {
    if (strokeHistory.length === 0) {
      alert('Please draw something before sharing.');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const imageData = canvas.toDataURL('image/png');
      
      // Create a message to share
      const message = encodeURIComponent('Check out my sketch design!');
      
      // Construct the WhatsApp URL
      let whatsappShareUrl = whatsappUri;
      
      // If VITE_WHATSAPP_URI doesn't already contain query parameters, add them
      if (!whatsappShareUrl.includes('?')) {
        whatsappShareUrl += '?';
      } else if (!whatsappShareUrl.endsWith('&') && !whatsappShareUrl.endsWith('?')) {
        whatsappShareUrl += '&';
      }
      
      // Add the message parameter
      whatsappShareUrl += `text=${message}`;
      
      // Create a blob from the image data
      const blob = dataURLtoBlob(imageData);
      
      // Create a file from the blob
      const file = new File([blob], 'sketch.png', { type: 'image/png' });
      
      // If the Web Share API is available and supports sharing files
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          title: 'My Sketch Design',
          text: 'Check out my sketch design!',
          files: [file],
          url: window.location.href
        }).catch((error) => {
          console.error('Error sharing via Web Share API:', error);
          // Fallback - open WhatsApp in a new window/tab
          window.open(whatsappShareUrl, '_blank');
        });
      } else {
        // Fallback - open WhatsApp in a new window/tab
        window.open(whatsappShareUrl, '_blank');
      }
    } catch (error) {
      console.error('Error sharing via WhatsApp:', error);
      alert('Failed to share sketch. Please try again.');
    }
  };

  // Helper function to convert data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#e96989] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Design Sketch Board</h1>
          <Link 
            to="/logout" 
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Toolbar */}
          <div className="bg-gray-100 p-4 flex flex-wrap items-center justify-between gap-4 border-b">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Tool Selection */}
              <button
                onClick={() => setTool('pen')}
                className={`p-2 rounded-lg ${tool === 'pen' ? 'bg-[#e96989] text-white' : 'bg-white text-gray-700'}`}
                title="Pen"
              >
                <FaPen />
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`p-2 rounded-lg ${tool === 'eraser' ? 'bg-[#e96989] text-white' : 'bg-white text-gray-700'}`}
                title="Eraser"
              >
                <FaEraser />
              </button>

              {/* Color Picker */}
              <div className="relative">
                <button
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="p-2 rounded-lg bg-white text-gray-700 flex items-center gap-2"
                  title="Color"
                >
                  <FaPalette />
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-300" 
                    style={{ backgroundColor: currentColor }}
                  ></div>
                </button>

                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 mt-2 p-3 bg-white rounded-lg shadow-xl flex flex-wrap gap-2"
                    style={{ width: '160px' }}
                  >
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => {
                          setCurrentColor(color);
                          setShowColorPicker(false);
                        }}
                        className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-full mt-2"
                    />
                  </motion.div>
                )}
              </div>

              {/* Brush Size */}
              <select
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="p-2 rounded-lg bg-white border border-gray-300"
                title="Brush Size"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Action Buttons */}
              <button
                onClick={undoLastStroke}
                disabled={strokeHistory.length === 0}
                className={`p-2 rounded-lg flex items-center gap-2 ${strokeHistory.length === 0 ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                title="Undo"
              >
                <FaUndo />
              </button>
              <button
                onClick={clearBoard}
                disabled={strokeHistory.length === 0}
                className={`p-2 rounded-lg flex items-center gap-2 ${strokeHistory.length === 0 ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                title="Clear"
              >
                <FaTrash />
              </button>
              <button
                onClick={downloadSketch}
                disabled={strokeHistory.length === 0}
                className={`p-2 rounded-lg flex items-center gap-2 ${strokeHistory.length === 0 ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                title="Download"
              >
                <FaDownload />
              </button>
            </div>
          </div>

          {/* Canvas */}
          <div className="p-4">
            <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                className="w-full h-[500px] touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {strokeHistory.length === 0 && canvasReady && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
                  <p>Start drawing your design here...</p>
                </div>
              )}
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-gray-50 p-4 border-t">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Share Your Design</h3>
            
            {/* WhatsApp Button */}
            <button
              onClick={shareViaWhatsApp}
              disabled={strokeHistory.length === 0}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg ${
                strokeHistory.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-[#25D366] hover:bg-[#20BD5C]'
              } text-white transition-colors`}
            >
              <FaWhatsapp size={20} />
              <span className="font-medium">Share via WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SketchBoard;