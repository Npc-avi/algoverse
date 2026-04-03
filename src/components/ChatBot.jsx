import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, MessageSquare, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatBot({ mode = 'floating', apiKey, platform, user, setView, initialInput = { text: '', timestamp: 0 }, onResponse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatInput, setChatInput] = useState(initialInput.text || '');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Algoverse. How can I help you go viral today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (initialInput.text) {
      setChatInput(initialInput.text);
    }
  }, [initialInput.timestamp]);

  const handleClick = () => {
    if (mode === 'floating') {
      if (!user) {
        setView('login');
      } else {
        setView('studio');
      }
      return;
    }
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMessage = { role: 'user', content: chatInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: chatInput,
          history: messages.filter(m => m.role !== 'system'),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      
      if (onResponse) {
        onResponse(data.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting to my brain right now. Please make sure the GROQ_API_KEY is set correctly in the .env file." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'integrated') {
    return (
      <div className="flex flex-col h-[600px] bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
              <Sparkles size={16} />
            </div>
            <span className="font-bold text-slate-900">Algoverse AI Assistant</span>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-8 space-y-6 bg-white"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-2xl text-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-slate-50 text-slate-900 shadow-sm border border-slate-100 rounded-tl-none'
              }`}>
                <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 prose-ul:list-disc prose-ul:ml-4 prose-li:mb-2 prose-strong:font-bold prose-headings:font-bold prose-headings:mb-3">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-50 p-5 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-4">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your prompt here (e.g., 'Write a viral hook for Instagram')..."
            className="flex-1 px-6 py-4 bg-slate-50 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button type="submit" className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <Send size={24} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && mode !== 'floating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span className="font-bold">Algoverse AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div 
              ref={scrollContainerRef}
              className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-50"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-900 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}>
                    <div className="prose prose-slate prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0 prose-ul:list-disc prose-ul:ml-4 prose-li:mb-1 prose-strong:font-bold prose-headings:font-bold prose-headings:mb-2">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all group relative"
      >
        <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
      </motion.button>
    </div>
  );
}
