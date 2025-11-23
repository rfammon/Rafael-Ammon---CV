import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, XIcon, SendIcon, LeafIcon } from './Icons';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { PROFILE } from '../constants';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: `Olá! Sou a IA do ${PROFILE.name}. Como posso ajudar você hoje? Pergunte sobre meus projetos, experiência ou habilidades!` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, inputValue);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-96 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-forest-100 dark:border-stone-800 overflow-hidden flex flex-col h-[500px] animate-fade-in transition-colors duration-300">
          {/* Header */}
          <div className="bg-forest-700 dark:bg-forest-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <LeafIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">EcoAssistant</h3>
                <p className="text-xs text-forest-100">Online | Baseado em Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-forest-600 dark:hover:bg-forest-700 p-1 rounded transition">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-earth-100 dark:bg-stone-950 space-y-4 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-forest-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-stone-800 text-earth-900 dark:text-stone-100 rounded-bl-none border border-earth-200 dark:border-stone-700'
                  }`}
                >
                 {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                 ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-stone-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-earth-200 dark:border-stone-700">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-forest-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-forest-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-forest-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white dark:bg-stone-900 border-t border-earth-200 dark:border-stone-800">
            <div className="flex items-center gap-2 bg-earth-100 dark:bg-stone-800 rounded-full px-4 py-2 transition-colors duration-300">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pergunte sobre minha experiência..."
                className="flex-1 bg-transparent outline-none text-sm text-earth-900 dark:text-stone-100 placeholder-earth-800/50 dark:placeholder-stone-500"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={`p-2 rounded-full transition ${inputValue.trim() ? 'text-forest-600 hover:bg-forest-100 dark:hover:bg-stone-700' : 'text-gray-400 dark:text-stone-600'}`}
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mt-1">
                 <span className="text-[10px] text-gray-400 dark:text-stone-600">IA pode cometer erros.</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-forest-600 hover:bg-forest-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group relative"
        aria-label="Abrir Chat"
      >
        {isOpen ? <XIcon className="w-6 h-6" /> : <MessageCircleIcon className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute right-0 top-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;