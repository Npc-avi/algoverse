import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Sparkles, Plus, Folder, MessageSquare, Trash2 } from "lucide-react";
import ChatBot from "../components/ChatBot.jsx";

const Firework = ({ onComplete }) => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            x: (Math.random() - 0.5) * 300, 
            y: (Math.random() - 0.5) * 300,
            scale: [0, 1, 0.5, 0],
            opacity: [1, 1, 0.5, 0]
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onAnimationComplete={i === 0 ? onComplete : undefined}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
        />
      ))}
    </div>
  );
};

export default function ProjectView({ user, setView }) {
  const [projectName, setProjectName] = useState("");
  const [isNamed, setIsNamed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [showFirework, setShowFirework] = useState(false);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem(`algoverse_projects_${user?.uid}`);
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed);
      if (parsed.length > 0) {
        setActiveProjectId(parsed[0].id);
        setProjectName(parsed[0].name);
        setIsNamed(true);
      }
    }
  }, [user]);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`algoverse_projects_${user.uid}`, JSON.stringify(projects));
    }
  }, [projects, user]);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      createdAt: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
    setActiveProjectId(newProject.id);
    setIsNamed(true);
    setShowFirework(true);
  };

  const handleDeleteProject = (id, e) => {
    e.stopPropagation();
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    if (activeProjectId === id) {
      if (updated.length > 0) {
        setActiveProjectId(updated[0].id);
        setProjectName(updated[0].name);
      } else {
        setActiveProjectId(null);
        setIsNamed(false);
        setProjectName("");
      }
    }
  };

  const selectProject = (project) => {
    setActiveProjectId(project.id);
    setProjectName(project.name);
    setIsNamed(true);
  };

  const startNew = () => {
    setIsNamed(false);
    setProjectName("");
    setActiveProjectId(null);
  };

  const apiKey = "PASTE_YOUR_API_KEY_HERE";

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto w-full min-h-screen pb-20 flex flex-col relative">
      {/* Wiggling Line Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="opacity-20">
          <motion.path
            d="M 200 0 Q 300 175 200 350 T 200 700 T 200 1000"
            fill="transparent"
            stroke="url(#lineGradientProject)"
            strokeWidth="2"
            animate={{
              d: [
                "M 200 0 Q 300 175 200 350 T 200 700 T 200 1000",
                "M 200 0 Q 100 175 200 350 T 200 700 T 200 1000",
                "M 200 0 Q 300 175 200 350 T 200 700 T 200 1000",
              ]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 500 0 Q 600 125 500 250 T 500 500 T 500 750 T 500 1000"
            fill="transparent"
            stroke="url(#lineGradientProject)"
            strokeWidth="4"
            animate={{
              d: [
                "M 500 0 Q 600 125 500 250 T 500 500 T 500 750 T 500 1000",
                "M 500 0 Q 400 125 500 250 T 500 500 T 500 750 T 500 1000",
                "M 500 0 Q 600 125 500 250 T 500 500 T 500 750 T 500 1000",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M 800 0 Q 900 150 800 300 T 800 600 T 800 1000"
            fill="transparent"
            stroke="url(#lineGradientProject)"
            strokeWidth="2"
            animate={{
              d: [
                "M 800 0 Q 900 150 800 300 T 800 600 T 800 1000",
                "M 800 0 Q 700 150 800 300 T 800 600 T 800 1000",
                "M 800 0 Q 900 150 800 300 T 800 600 T 800 1000",
              ]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="lineGradientProject" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <AnimatePresence>
        {showFirework && <Firework onComplete={() => setShowFirework(false)} />}
      </AnimatePresence>

      {!isNamed ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full"
        >
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-100">
            <Plus size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-3 text-center">
            Name your project
          </h1>
          <p className="text-sm text-slate-500 mb-8 text-center font-medium">Give your creative vision a title to get started.</p>
          
          <form onSubmit={handleCreateProject} className="w-full space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-10 group-focus-within:opacity-30 transition duration-1000"></div>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Summer Campaign 2024"
                className="relative w-full px-6 py-4 text-xl font-bold bg-white border border-slate-100 rounded-xl focus:outline-none focus:border-indigo-300 transition-all shadow-sm"
                autoFocus
              />
            </div>
            <button 
              type="submit"
              disabled={!projectName.trim()}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-lg shadow-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Project
            </button>
          </form>

          {projects.length > 0 && (
            <div className="mt-12 w-full">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">Recent Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.slice(0, 4).map(p => (
                  <button
                    key={p.id}
                    onClick={() => selectProject(p)}
                    className="p-4 bg-white border border-slate-100 rounded-xl text-left hover:border-indigo-300 transition-all group flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Folder size={16} />
                    </div>
                    <span className="font-bold text-sm text-slate-900 truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
          {/* History Sidebar (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 flex flex-col gap-4"
          >
            <button 
              onClick={startNew}
              className="w-full p-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-50"
            >
              <Plus size={16} /> New Project
            </button>

            <div className="flex-1 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-50">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Project History</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {projects.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => selectProject(p)}
                    className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      activeProjectId === p.id 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <MessageSquare size={14} className={activeProjectId === p.id ? 'text-indigo-600' : 'text-slate-400'} />
                      <span className="text-xs font-bold truncate">{p.name}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteProject(p.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chatbot Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-slate-900">{projectName}</h2>
                <p className="text-xs text-slate-500 font-medium">Project Workspace</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Active Project
              </div>
            </div>

            <ChatBot 
              mode="integrated" 
              apiKey={apiKey} 
              user={user} 
              setView={setView} 
              initialInput={{ text: "let us create something magical", timestamp: Date.now() }} 
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
