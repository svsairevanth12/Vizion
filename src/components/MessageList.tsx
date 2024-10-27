import React, { useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isAi: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-center p-8">
        <div>
          <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No messages yet. Upload an image to start the conversation!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 ${
            message.isAi ? 'justify-start' : 'justify-end flex-row-reverse'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.isAi ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            {message.isAi ? (
              <Bot className="w-5 h-5 text-blue-500" />
            ) : (
              <User className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.isAi
                ? 'bg-gray-100 text-gray-800'
                : 'bg-blue-500 text-white'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}