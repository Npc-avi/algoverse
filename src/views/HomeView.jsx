import { motion } from "motion/react";
import { ArrowRight, BarChart3, Zap, Target, Share2, Eye } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx";

const FlowStep = ({ icon: Icon, label, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center px-4 relative"
  >
    <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center mb-4 bg-white">
      <Icon size={20} className="text-zinc-600" />
    </div>
    <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 mb-2">{label}</h3>
    <p className="text-sm text-zinc-600 max-w-[150px]">{description}</p>
    {index < 3 && (
      <div className="hidden lg:block absolute top-6 -right-4 w-8 h-[1px] bg-zinc-200" />
    )}
  </motion.div>
);

const MetricTag = ({ value, label, className, delay = 0 }) => (
  <motion.div 
    initial={{ scale: 0.7, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
    className={`glass-pill px-4 py-2 rounded-full flex items-center gap-2 ${className}`}
  >
    <span className="text-lg font-bold tracking-tighter">{value}</span>
    <span className="text-[10px] uppercase tracking-wider font-medium text-zinc-500">{label}</span>
  </motion.div>
);

const FeatureCard = ({ title, description, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -12, scale: 1.02 }}
    className="premium-card p-8 group"
  >
    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-indigo-50 transition-colors">
      <Icon size={24} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
    </div>
    <h3 className="text-2xl font-bold tracking-tighter mb-4 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

export default function HomeView({ user, setView }) {
  const steps = [
    { icon: BarChart3, label: "Analyze", description: "Real-time data analysis across Instagram, YouTube, and X." },
    { icon: Zap, label: "Predict", description: "AI-powered virality forecasting with 94% accuracy." },
    { icon: Target, label: "Optimize", description: "Algorithm-aware content refinement for peak engagement." },
    { icon: Share2, label: "Publish", description: "Strategic cross-platform distribution and timing." },
  ];

  const features = [
    { 
      title: "Trend Detection Engine", 
      description: "Identify trending topics, hashtags, audio, and formats across platforms before they peak.",
      icon: BarChart3
    },
    { 
      title: "Viral Content Prediction", 
      description: "Predict virality scores using AI/ML models and get suggestions to increase engagement.",
      icon: Zap
    },
    { 
      title: "Optimization Assistant", 
      description: "Generate captions, hashtags, thumbnails, hooks, and headlines with SEO keyword suggestions.",
      icon: Target
    },
    { 
      title: "Algorithm-Aware Insights", 
      description: "Analyze engagement rate, watch time, and shareability with real-time social media API data.",
      icon: Eye
    },
    { 
      title: "Viral Strategy Generator", 
      description: "Recommend best posting times, formats, and cross-platform distribution strategies.",
      icon: Share2
    },
    { 
      title: "Platform Adaptation", 
      description: "Automatically adapt recommendations based on specific platform behavior and algorithm shifts.",
      icon: Zap
    }
  ];

  return (
    <div className="flex flex-col gap-32 pb-32 relative">
      {/* Wiggling Line Background */}
      <div className="absolute top-0 left-0 w-full h-[2000px] pointer-events-none -z-10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 2000" preserveAspectRatio="none" className="opacity-30">
          {/* Far Left Line */}
          <motion.path
            d="M 200 0 Q 300 350 200 700 T 200 1400 T 200 2000"
            fill="transparent"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            animate={{
              d: [
                "M 200 0 Q 300 350 200 700 T 200 1400 T 200 2000",
                "M 200 0 Q 100 350 200 700 T 200 1400 T 200 2000",
                "M 200 0 Q 300 350 200 700 T 200 1400 T 200 2000",
              ]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner Left Line */}
          <motion.path
            d="M 350 0 Q 450 300 350 600 T 350 1200 T 350 1800 T 350 2000"
            fill="transparent"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            animate={{
              d: [
                "M 350 0 Q 450 300 350 600 T 350 1200 T 350 1800 T 350 2000",
                "M 350 0 Q 250 300 350 600 T 350 1200 T 350 1800 T 350 2000",
                "M 350 0 Q 450 300 350 600 T 350 1200 T 350 1800 T 350 2000",
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Center Line */}
          <motion.path
            d="M 500 0 Q 600 250 500 500 T 500 1000 T 500 1500 T 500 2000"
            fill="transparent"
            stroke="url(#lineGradient)"
            strokeWidth="5"
            animate={{
              d: [
                "M 500 0 Q 600 250 500 500 T 500 1000 T 500 1500 T 500 2000",
                "M 500 0 Q 400 250 500 500 T 500 1000 T 500 1500 T 500 2000",
                "M 500 0 Q 600 250 500 500 T 500 1000 T 500 1500 T 500 2000",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner Right Line */}
          <motion.path
            d="M 650 0 Q 750 400 650 800 T 650 1400 T 650 1900 T 650 2000"
            fill="transparent"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            animate={{
              d: [
                "M 650 0 Q 750 400 650 800 T 650 1400 T 650 1900 T 650 2000",
                "M 650 0 Q 550 400 650 800 T 650 1400 T 650 1900 T 650 2000",
                "M 650 0 Q 750 400 650 800 T 650 1400 T 650 1900 T 650 2000",
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Far Right Line */}
          <motion.path
            d="M 800 0 Q 900 300 800 600 T 800 1200 T 800 2000"
            fill="transparent"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            animate={{
              d: [
                "M 800 0 Q 900 300 800 600 T 800 1200 T 800 2000",
                "M 800 0 Q 700 300 800 600 T 800 1200 T 800 2000",
                "M 800 0 Q 900 300 800 600 T 800 1200 T 800 2000",
              ]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="pt-40 px-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-[1.1] mb-12 text-gradient font-display italic skew-x-[-1deg]">
            Your AI-powered digital content assistant
          </h1>
          <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Algoverse transforms raw data into viral momentum. We build the engines that power the next generation of digital influence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Flow Section */}
      <section id="flow-section" className="px-6 py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-indigo-400">The Algoverse Flow</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, i) => (
              <FlowStep key={step.label} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET Section */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 aspect-[21/9] flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070" 
            alt="Data Visualization" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4">WHAT YOU GET</h2>
            <p className="text-indigo-300 font-medium tracking-widest uppercase text-sm">REAL-TIME INSIGHTS</p>
          </div>

          <MetricTag value="INCREASED" label="ENGAGEMENT" className="absolute top-12 left-12" delay={0.2} />
          <MetricTag value="INCREASED" label="WATCH TIME" className="absolute bottom-24 left-24" delay={0.4} />
          <MetricTag value="LARGER" label="REACH" className="absolute top-24 right-24" delay={0.6} />
          <MetricTag value="GENERATIVE" label="INFORMATION" className="absolute bottom-12 right-12" delay={0.8} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-6xl font-black tracking-tighter mb-8 text-slate-900">Ready to scale your influence?</h2>
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (!user) {
              setView('login');
            } else {
              setView('project');
            }
          }}
          className="px-10 py-5 bg-indigo-600 text-white rounded-full font-bold flex items-center gap-3 mx-auto shadow-xl shadow-indigo-200 transition-all"
        >
          Start a Project <ArrowRight size={20} />
        </motion.button>
      </section>

      {/* Floating Chatbot */}
      <ChatBot mode="floating" user={user} setView={setView} />
    </div>
  );
}
