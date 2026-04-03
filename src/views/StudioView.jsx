import { motion } from "motion/react";
import { useState } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const OptimizationChart = ({ score, gradientId, colors }) => {
  const data = [
    { value: score || 0 },
    { value: 100 - (score || 0) }
  ];

  return (
    <div className="w-16 h-16 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={22}
            outerRadius={30}
            startAngle={90}
            endAngle={-270}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={`url(#${gradientId})`} />
            <Cell fill="#f1f5f9" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-slate-900">
          {score !== null ? `${score}%` : '--'}
        </span>
      </div>
    </div>
  );
};

export default function StudioView({ user, setView }) {
  const [platform, setPlatform] = useState('instagram');
  const [content, setContent] = useState('');
  const [chatPrompt, setChatPrompt] = useState({ text: '', timestamp: 0 });
  const [scores, setScores] = useState({
    virality: null,
    hook: null,
    seo: null,
    shareability: null
  });

  const handlePlatformChange = (pId) => {
    setPlatform(pId);
    const platformName = pId === 'twitter' ? 'twitter' : pId;
    setChatPrompt({ 
      text: `(give your idea) for ${platformName} centric insights`, 
      timestamp: Date.now() 
    });
  };

  const handleAIResponse = (text) => {
    console.log("Parsing AI Response for scores:", text);
    
    // More robust regex that handles potential markdown bolding and extra characters
    // Matches "Keyword" followed by any non-digit characters, then the digits, then "%"
    const viralityMatch = text.match(/(?:Virality|Viral)[^0-9]*?(\d+)\s*%/i);
    const hookMatch = text.match(/Hook[^0-9]*?(\d+)\s*%/i);
    const seoMatch = text.match(/SEO[^0-9]*?(\d+)\s*%/i);
    const shareabilityMatch = text.match(/Shareability[^0-9]*?(\d+)\s*%/i);

    console.log("Match results:", {
      virality: viralityMatch ? viralityMatch[1] : 'no match',
      hook: hookMatch ? hookMatch[1] : 'no match',
      seo: seoMatch ? seoMatch[1] : 'no match',
      shareability: shareabilityMatch ? shareabilityMatch[1] : 'no match'
    });

    setScores(prev => {
      const next = { ...prev };
      if (viralityMatch) next.virality = parseInt(viralityMatch[1]);
      if (hookMatch) next.hook = parseInt(hookMatch[1]);
      if (seoMatch) next.seo = parseInt(seoMatch[1]);
      if (shareabilityMatch) next.shareability = parseInt(shareabilityMatch[1]);
      return next;
    });
  };

  // INSERT YOUR API KEY DIRECTLY HERE
  const apiKey = "PASTE_YOUR_API_KEY_HERE";

  const firstName = user?.displayName?.split(' ')[0]?.toUpperCase() || 'CREATOR';

  const platforms = [
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'youtube', icon: Youtube, label: 'YouTube' },
    { id: 'twitter', icon: Twitter, label: 'X / Twitter' },
  ];

  const metrics = [
    { 
      label: 'Virality Score', 
      score: scores.virality, 
      status: scores.virality === null ? 'Waiting for data' : (scores.virality > 80 ? 'Viral Potential' : 'Moderate Potential'),
      gradientId: 'gradVirality',
      colors: ['#6366f1', '#a855f7']
    },
    { 
      label: 'Hook Strength', 
      score: scores.hook, 
      status: scores.hook === null ? 'Waiting for data' : (scores.hook > 80 ? 'High Retention' : 'Needs Work'),
      gradientId: 'gradHook',
      colors: ['#ec4899', '#f43f5e']
    },
    { 
      label: 'SEO Optimization', 
      score: scores.seo, 
      status: scores.seo === null ? 'Waiting for data' : (scores.seo > 80 ? 'Search Ready' : 'Optimize More'),
      gradientId: 'gradSEO',
      colors: ['#10b981', '#14b8a6']
    },
    { 
      label: 'Shareability', 
      score: scores.shareability, 
      status: scores.shareability === null ? 'Waiting for data' : (scores.shareability > 80 ? 'High' : 'Low'),
      gradientId: 'gradShare',
      colors: ['#f59e0b', '#f97316']
    },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto w-full min-h-screen pb-32 relative">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
          WELCOME <span className="text-indigo-600">{firstName}</span>
        </h1>
        <p className="text-xl text-slate-500 mt-4 font-medium">Ready to dominate the algorithm today?</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Editor & Chatbot */}
        <div className="flex-1 flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <h2 className="text-3xl font-black tracking-tighter">Content Studio</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <div className="inline-flex p-1 bg-slate-100 rounded-full w-full sm:w-auto justify-center">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePlatformChange(p.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      platform === p.id 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <p.icon size={14} />
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Integrated Chatbot like Gemini/ChatGPT */}
          <ChatBot 
            mode="integrated" 
            apiKey={apiKey} 
            platform={platform} 
            user={user} 
            setView={setView} 
            initialInput={chatPrompt} 
            onResponse={handleAIResponse}
          />

          {/* Content Area */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-5 group-focus-within:opacity-10 transition duration-1000"></div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Draft your content here after chatting with the AI..."
              className="relative w-full h-[300px] p-12 text-2xl font-light tracking-tight bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:border-indigo-200 transition-all resize-none placeholder:text-slate-200 shadow-sm"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="premium-card p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">AI Optimization Assistant</h3>
            <div className="flex flex-col gap-8">
              {metrics.map((tag) => (
                <motion.div 
                  key={tag.label}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between"
                >
                  <div>
                    <div className="text-sm font-bold text-slate-900">{tag.label}</div>
                    <div className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{tag.status}</div>
                  </div>
                  <OptimizationChart 
                    score={tag.score} 
                    gradientId={tag.gradientId} 
                    colors={tag.colors} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
