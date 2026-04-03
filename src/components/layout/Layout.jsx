import { motion } from "motion/react";
import { Instagram, Youtube, Twitter, Menu, X, LogOut, User, Mail, Linkedin, Github } from "lucide-react";
import { useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export const Navbar = ({ currentView, setView, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setView('home');
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer text-slate-900"
          onClick={() => setView('home')}
        >
          Algoverse
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['home', 'flow', 'studio', 'project', 'about'].map((item) => (
            <button
              key={item}
              onClick={() => {
                if ((item === 'studio' || item === 'project') && !user) {
                  setView('login');
                } else if (item === 'flow' || item === 'about') {
                  if (currentView !== 'home') {
                    setView('home');
                    // Wait for view to change before scrolling
                    setTimeout(() => {
                      const element = document.getElementById(`${item}-section`);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const element = document.getElementById(`${item}-section`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  setView(item);
                }
              }}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                currentView === item ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {item}
            </button>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <User className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 truncate max-w-[100px]">
                  {user.displayName || user.email}
                </span>
              </div>
              <button 
                onClick={handleSignOut}
                className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-all shadow-lg shadow-slate-200"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setView('login')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-slate-200 ${
                currentView === 'login' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'
              }`}
            >
              Sign In
            </button>
          )}
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/90 backdrop-blur-xl border-b border-slate-200 p-6 flex flex-col gap-4"
        >
          {['home', 'flow', 'studio', 'project', 'about'].map((item) => (
            <button
              key={item}
              onClick={() => {
                setIsOpen(false);
                if ((item === 'studio' || item === 'project') && !user) {
                  setView('login');
                } else if (item === 'flow' || item === 'about') {
                  if (currentView !== 'home') {
                    setView('home');
                    setTimeout(() => {
                      const element = document.getElementById(`${item}-section`);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const element = document.getElementById(`${item}-section`);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  setView(item);
                }
              }}
              className="text-left text-lg font-bold capitalize text-slate-900"
            >
              {item}
            </button>
          ))}
          {user ? (
            <button
              onClick={() => { handleSignOut(); setIsOpen(false); }}
              className="text-left text-lg font-bold capitalize text-red-600 flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => { setView('login'); setIsOpen(false); }}
              className="text-left text-lg font-bold capitalize text-indigo-600"
            >
              Sign In
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export const Footer = ({ setView, currentView, user }) => {
  const team = [
    {
      name: "Avyay Kachhia",
      mail: "avyayhkachhia@gmail.com",
      linkedin: "https://www.linkedin.com/in/avyay-kachhia-225521345/",
      github: "https://github.com/Npc-avi"
    },
    {
      name: "Sharv Mehta",
      mail: "mehtasharv0208@gmail.com",
      linkedin: "https://www.linkedin.com/in/sharv-mehta-a0425329b/",
      github: "https://github.com/Pokeavenger"
    },
    {
      name: "Rahi Suthar",
      mail: "rahisuthar7@gmail.com",
      linkedin: "https://www.linkedin.com/in/rahi-suthar-458520381/",
      github: "https://github.com/Rahi09Suthar"
    },
    {
      name: "Soham Jani",
      mail: "sohamjani077@gmail.com",
      linkedin: "https://www.linkedin.com/in/soham-jani-950714310/",
      github: "https://github.com/sohamjani077-a11y"
    }
  ];

  const handleMenuClick = (item) => {
    if ((item === 'studio' || item === 'project') && !user) {
      setView('login');
    } else if (item === 'flow' || item === 'about') {
      if (currentView !== 'home') {
        setView('home');
        // Wait for view to change before scrolling
        setTimeout(() => {
          const element = document.getElementById(`${item}-section`);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(`${item}-section`);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setView(item);
    }
  };

  return (
    <footer id="about-section" className="bg-white/40 backdrop-blur-sm pt-24 border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 relative z-10">
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Menu</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            {['home', 'flow', 'studio', 'project', 'about'].map((item) => (
              <li 
                key={item}
                onClick={() => handleMenuClick(item)}
                className="hover:text-indigo-600 cursor-pointer transition-colors capitalize"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Contact</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-600">
            <li>9978941903</li>
            <li>9726338375</li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Team</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <a href={`mailto:${member.mail}`} className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Mail size={16} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Github size={16} />
                  </a>
                </div>
                <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200/30 to-transparent pointer-events-none" />
        <h2 className="text-[20vw] font-black tracking-tighter text-slate-900/5 leading-none text-center select-none">
          Algoverse
        </h2>
      </div>
    </footer>
  );
};
