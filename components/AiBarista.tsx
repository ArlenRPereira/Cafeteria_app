import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, SendHorizontal, Bot } from 'lucide-react';
import { getBaristaRecommendation } from '../services/geminiService';
import { CartItem } from '../types';

interface AiBaristaProps {
  cart: CartItem[];
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AiBarista: React.FC<AiBaristaProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Olá! Sou seu Barista Virtual. Posso sugerir uma harmonização ou tirar dúvidas sobre nossos cafés?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const cartSummary = cart.length > 0 
      ? cart.map(i => `${i.quantity}x ${i.name}`).join(', ') 
      : 'Carrinho vazio';

    const response = await getBaristaRecommendation(userMsg, cartSummary);

    setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-full shadow-xl shadow-amber-600/30 flex items-center justify-center hover:scale-105 transition-transform z-40"
        aria-label="Abrir Barista IA"
      >
        <Sparkles size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-100 z-40 overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-700 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-amber-400" />
          <h3 className="font-medium">Barista IA</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-stone-300 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-amber-600 text-white rounded-tr-none' 
                : 'bg-white text-stone-700 border border-stone-200 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 shadow-sm flex gap-1">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-stone-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte sobre harmonizações..."
          className="flex-1 bg-stone-800 text-white placeholder-stone-400 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="p-2 bg-stone-800 text-white rounded-xl hover:bg-stone-900 disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};