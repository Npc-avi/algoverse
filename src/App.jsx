import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from './components/layout/Layout.jsx';
import HomeView from './views/HomeView.jsx';
import StudioView from './views/StudioView.jsx';
import ProjectView from './views/ProjectView.jsx';
import LoginView from './views/LoginView.jsx';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user && view === 'login') {
        setView('studio');
      }
    });
    return () => unsubscribe();
  }, [view]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <motion.div 
          animate={{ 
            x: [0, 120, 0],
            y: [0, 60, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -70, 0],
            y: [0, 120, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-32 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[160px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -60, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-40 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 40, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-sky-500/25 rounded-full blur-[120px]"
        />
      </div>

      <Navbar currentView={view} setView={setView} user={user} />
      
      <main className="flex-grow">
        {view === 'home' && <HomeView user={user} setView={setView} />}
        {view === 'studio' && <StudioView user={user} setView={setView} />}
        {view === 'project' && <ProjectView user={user} setView={setView} />}
        {view === 'login' && <LoginView />}
      </main>

      <Footer currentView={view} setView={setView} user={user} />
    </div>
  );
}
