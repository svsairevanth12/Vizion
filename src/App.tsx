import React, { useState } from 'react';
import { MessageCircle, Info, Home, Trash2 } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ChatInterface from './components/ChatInterface';
import MessageList from './components/MessageList';
import AboutPage from './components/AboutPage';
import { analyzeImage } from './services/geminiService';

interface Message {
  id: number;
  text: string;
  isAi: boolean;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleImageUpload = async (file: File) => {
    setSelectedImage(file);
    setMessages([
      {
        id: Date.now(),
        text: "Hi! I'm Vizion. I've received your image. What would you like to know about it?",
        isAi: true,
      },
    ]);
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedImage) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message, isAi: false },
    ]);

    setIsLoading(true);
    try {
      const response = await analyzeImage(selectedImage, message);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: response,
          isAi: true,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "I apologize, but I encountered an error analyzing the image. Please try again.",
          isAi: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">Vizion</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowAbout(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="Home"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="About"
              >
                <Info className="w-5 h-5" />
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 overflow-hidden">
        {showAbout ? (
          <AboutPage />
        ) : (
          <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
            <div className="space-y-4">
              {!selectedImage ? (
                <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Welcome to Vizion
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Upload an image and I'll help you analyze it using Google's Generative AI technology.
                  </p>
                  <ImageUpload onImageUpload={handleImageUpload} />
                </div>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-lg h-full flex flex-col">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded"
                    className="rounded-lg object-contain flex-1 max-h-[calc(100vh-16rem)]"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="mt-4 text-sm text-gray-500 hover:text-red-500"
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
              <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Chat</h3>
                <button
                  onClick={clearChat}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Chat
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} />
              </div>
              <div className="p-4 border-t bg-gray-50">
                <ChatInterface
                  onSendMessage={handleSendMessage}
                  disabled={!selectedImage || isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Vizion by Gen Hacktivists. All rights reserved.
      </footer>
    </div>
  );
}

export default App;