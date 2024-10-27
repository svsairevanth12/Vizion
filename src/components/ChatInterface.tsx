import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export default function ChatInterface({ onSendMessage, disabled }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={disabled ? "Upload an image to start the conversation..." : "Ask me about the image..."}
        disabled={disabled}
        className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
      >
        {disabled ? 'Processing...' : (
          <>
            <Send className="w-4 h-4" />
            Send
          </>
        )}
      </button>
    </form>
  );
}