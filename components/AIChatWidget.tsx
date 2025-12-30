import React, { useState, useRef, useEffect } from 'react';
import { createBakeryChat } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const QUICK_PROMPTS = [
    "🎂 Wedding Cake Prices",
    "🚚 Delivery Info",
    "🎨 Custom Design",
    "📅 How to Book"
];

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', text: "Welcome to Qisti Bakery! I am QisAI, your personal concierge. How may I assist you with your celebration today?", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showBadge, setShowBadge] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    chatSessionRef.current = createBakeryChat();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    if (isOpen) {
        // Focus input when opened
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  const processMessage = async (text: string) => {
    if (!text.trim() || !chatSessionRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: userMessage.text });
      
      let fullResponseText = '';
      const responseId = (Date.now() + 1).toString();
      
      // Add a placeholder message for streaming
      setMessages(prev => [...prev, { id: responseId, text: '', sender: 'ai' }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const textChunk = c.text;
        if (textChunk) {
          fullResponseText += textChunk;
          // Update the last message with the accumulated text
          setMessages(prev => 
            prev.map(msg => 
              msg.id === responseId ? { ...msg, text: fullResponseText } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "I apologize, but I am unable to connect at the moment. Please kindly contact us via WhatsApp for immediate assistance.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processMessage(inputText);
  };

  const handleQuickPrompt = (prompt: string) => {
    // Strip emoji for query if desired, or keep it. Keeping it adds flavor.
    processMessage(prompt);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setShowBadge(false);
  };

  return (
    <>
      {/* Floating Chat Button Group - Positioned above WhatsApp (bottom-6 + h-14 + gap = approx bottom-24) */}
      <div className="fixed bottom-24 right-6 z-50 flex items-center justify-end pointer-events-none">
        
        {/* "Ask AI" Label/Badge */}
        <div 
            className={`absolute right-16 top-1/2 -translate-y-1/2 pointer-events-auto transition-all duration-500 transform origin-right ${
                showBadge && !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
        >
            <div className="bg-white text-bakery-900 px-4 py-2 rounded-lg shadow-xl border border-bakery-100 flex items-center gap-2 relative whitespace-nowrap">
                {/* Arrow pointing right */}
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45 border-t border-r border-bakery-100"></div>
                
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bakery-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bakery-400"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest">Ask AI</span>
            </div>
        </div>

        {/* Toggle Button */}
        <button
            onClick={toggleChat}
            className={`pointer-events-auto w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-2 z-50 relative ${
            isOpen 
                ? 'bg-bakery-50 text-bakery-900 border-bakery-900 rotate-90' 
                : 'bg-bakery-950 text-bakery-400 border-white hover:bg-bakery-900'
            }`}
            aria-label="Toggle AI Concierge"
        >
            {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
             // Sparkles Icon for AI
             <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            )}
        </button>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-[110px] right-6 w-80 sm:w-96 bg-bakery-50 rounded-2xl shadow-2xl z-40 overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right border border-bakery-200 ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 180px)', height: '520px' }}
      >
        {/* Header */}
        <div className="bg-bakery-950 px-6 py-5 flex items-center justify-between shadow-lg shrink-0 relative overflow-hidden">
          {/* Decorative shine */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[slideUp_3s_infinite]"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bakery-400 to-bakery-600 p-[2px]">
                <div className="w-full h-full bg-bakery-950 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-bakery-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </div>
            </div>
            <div>
              <h3 className="text-white font-serif text-lg tracking-wide leading-none mb-1">QisAI</h3>
              <div className="flex items-center gap-1.5">
                 <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-bakery-300">Always Online</span>
              </div>
            </div>
          </div>
          <button onClick={toggleChat} className="text-white/50 hover:text-white transition-colors relative z-10">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6 bg-bakery-50 relative scroll-smooth">
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3E3428 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative z-10 flex flex-col gap-4">
            {messages.map((msg) => (
                <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                <div 
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm font-sans leading-relaxed shadow-sm relative whitespace-pre-wrap ${
                    msg.sender === 'user' 
                        ? 'bg-bakery-900 text-white rounded-br-none' 
                        : 'bg-white text-bakery-900 border border-bakery-200/50 rounded-bl-none'
                    }`}
                >
                    {msg.sender === 'ai' && (
                        <span className="absolute -top-5 left-0 text-[9px] uppercase tracking-widest text-bakery-400 font-bold mb-1">QisAI</span>
                    )}
                    {msg.text}
                </div>
                </div>
            ))}
            
            {isLoading && (
                <div className="flex justify-start">
                <div className="bg-white border border-bakery-200/50 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm">
                    <div className="flex space-x-1.5">
                        <div className="w-1.5 h-1.5 bg-bakery-400 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
                        <div className="w-1.5 h-1.5 bg-bakery-400 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
                        <div className="w-1.5 h-1.5 bg-bakery-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
                    </div>
                </div>
                </div>
            )}

            {/* Quick Prompts (Only show if just welcome message exists) */}
            {!isLoading && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2 animate-fade-in-up">
                    {QUICK_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => handleQuickPrompt(prompt)}
                            className="bg-white border border-bakery-200 text-bakery-600 text-xs px-3 py-2 rounded-full hover:bg-bakery-100 hover:border-bakery-400 hover:text-bakery-900 transition-all shadow-sm active:scale-95"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t border-bakery-100 shrink-0 relative z-20">
          <div className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about our wedding cakes..."
              className="flex-grow bg-bakery-50 border border-bakery-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:border-bakery-400 focus:ring-1 focus:ring-bakery-400 text-bakery-900 placeholder-bakery-400/50 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 top-2 p-1.5 bg-bakery-900 text-white rounded-full hover:bg-bakery-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <svg className="w-5 h-5 transform rotate-0 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
          <p className="text-center mt-2 text-[9px] text-bakery-300 uppercase tracking-widest">Powered by Gemini AI</p>
        </form>
      </div>
    </>
  );
};

export default AIChatWidget;