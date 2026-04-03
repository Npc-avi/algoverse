import { motion } from "motion/react";
import { TrendingUp, Users, Eye, Clock, ArrowRight } from "lucide-react";

const MetricCard = ({ icon: Icon, label, value, trend, trendValue }) => (
  <div className="premium-card p-8">
    <div className="flex items-center justify-between mb-6">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
        <Icon size={20} className="text-slate-600" />
      </div>
      <div className={`text-xs font-bold px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
      }`}>
        {trend === 'up' ? '+' : '-'}{trendValue}%
      </div>
    </div>
    <div className="text-4xl font-black tracking-tighter mb-1 text-slate-900">{value}</div>
    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{label}</div>
  </div>
);

export default function DashboardView() {
  const trends = [
    { topic: '#AIRevolution', platform: 'TikTok', growth: 142, format: 'Short-form' },
    { topic: 'Minimalist SaaS', platform: 'Twitter/X', growth: 89, format: 'Thread' },
    { topic: 'Data Storytelling', platform: 'YouTube', growth: 64, format: 'Video' },
  ];

  const strategies = [
    { time: '10:00 AM EST', format: 'Carousel', platform: 'Instagram', reach: 'High' },
    { time: '06:30 PM EST', format: 'Shorts', platform: 'YouTube', reach: 'Viral' },
  ];

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto w-full min-h-screen pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter mb-2 text-gradient">Dashboard</h1>
          <p className="text-slate-500 font-medium">Algorithm-aware insights & real-time API data.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-pill px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-500">
            API Status: <span className="text-emerald-500">Connected</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          icon={TrendingUp} 
          label="Trend Velocity" 
          value="84.2" 
          trend="up" 
          trendValue="12" 
        />
        <MetricCard 
          icon={Users} 
          label="Audience Reach" 
          value="1.2M" 
          trend="up" 
          trendValue="28" 
        />
        <MetricCard 
          icon={Eye} 
          label="Impression Rate" 
          value="4.8%" 
          trend="down" 
          trendValue="3" 
        />
        <MetricCard 
          icon={Clock} 
          label="Avg. Watch Time" 
          value="42s" 
          trend="up" 
          trendValue="15" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 premium-card p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-black tracking-tighter">Virality Forecast</h3>
            <div className="flex gap-2">
              {['24h', '7d', '30d'].map(t => (
                <button key={t} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full hover:bg-slate-100 transition-colors">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-end gap-3">
            {[40, 60, 45, 70, 90, 65, 80, 55, 75, 95, 85, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-1 bg-slate-100 rounded-t-lg hover:bg-indigo-600 transition-all cursor-pointer relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Score: {h}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="premium-card p-8">
          <h3 className="text-lg font-black tracking-tighter mb-8">Trend Detection Engine</h3>
          <div className="flex flex-col gap-6">
            {trends.map((t) => (
              <div key={t.topic} className="group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{t.topic}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.platform} • {t.format}</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-600">+{t.growth}%</div>
                </div>
                <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(t.growth / 150) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">
            View All Trends
          </button>
        </div>
      </div>

      <div className="premium-card p-8">
        <h3 className="text-lg font-black tracking-tighter mb-8">Viral Strategy Generator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strategies.map((s, i) => (
            <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                <Clock size={20} className="text-indigo-600 mb-1" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Timing</span>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold tracking-tighter text-slate-900">{s.time}</div>
                <div className="text-xs text-slate-500 font-medium">{s.platform} • {s.format} • <span className="text-indigo-600 font-bold">{s.reach} Reach</span></div>
              </div>
              <button className="p-3 rounded-full bg-white border border-slate-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
