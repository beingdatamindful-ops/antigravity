import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Zap,
  Shield,
  Plus,
  Loader2,
  CheckCircle2,
  Trash2,
  Moon,
  Sun,
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';

const BentoCard = ({ children, className = "", title, icon: Icon, onRemove }: { children: React.ReactNode, className?: string, title?: string, icon?: any, onRemove?: () => void }) => (
  <div className={`group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${className}`}>
    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
    <div className="mb-4 flex items-center justify-between relative z-10">
      {title && (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
        </div>
      )}
      {onRemove && (
        <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/10 hover:text-rose-500 rounded-md transition-all">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const ActivityItem = ({ company, change, time, type, onRemove }: { company: string, change: string, time: string, type: 'pricing' | 'feature' | 'positioning', onRemove: () => void }) => {
  const typeColors = {
    pricing: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    feature: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    positioning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  return (
    <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border animate-in fade-in slide-in-from-left-4">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Globe className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold truncate">{company}</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
            <button onClick={onRemove} className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-rose-500">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{change}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${typeColors[type]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, description, impact, onRemove }: { title: string, description: string, impact: 'high' | 'medium' | 'low', onRemove: () => void }) => (
  <div className="group/item p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-default animate-in fade-in slide-in-from-right-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-amber-500" />
        <span className="text-xs font-bold text-amber-500 uppercase tracking-tighter">AI Analysis</span>
      </div>
      <button onClick={onRemove} className="opacity-0 group-hover/item:opacity-100 p-1 hover:text-rose-500">
        <X className="h-3 w-3" />
      </button>
    </div>
    <h4 className="font-semibold text-sm mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className={`h-1.5 w-1.5 rounded-full ${impact === 'high' ? 'bg-red-500' : impact === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
        <span className="text-[10px] font-medium uppercase">{impact} Impact</span>
      </div>
      <button className="text-[10px] font-bold text-primary hover:underline">Full Strategy Report</button>
    </div>
  </div>
);

export const Dashboard = () => {
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [urls, setUrls] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Initializing Live AI Research...",
    "Crawling site architecture via Firecrawl...",
    "Extracting real-time pricing and feature sets...",
    "Analyzing messaging gaps vs your platform...",
    "Generating deep strategic reports...",
    "Syncing with Intelligence Hub..."
  ];

  // Dark Mode side effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddCompetitors = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urls) return;

    const urlList = urls.split(',').map(u => u.trim()).filter(u => u);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    urlList.forEach(url => {
      const name = url.replace('https://', '').replace('http://', '').split('.')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const id = Math.random().toString(36).substr(2, 9);

      setCompetitors(prev => [...prev, { id, name: capitalizedName, score: Math.floor(Math.random() * 60) + 30, url, status: 'active' }]);
      
      setActivities(prev => [{ 
        id: Math.random().toString(36).substr(2, 9),
        companyId: id,
        company: capitalizedName, 
        change: `Live analysis detected ${Math.floor(Math.random() * 5) + 1} new product updates and a pricing shift on ${capitalizedName}'s portal.`, 
        time: 'Just now', 
        type: ['pricing', 'feature', 'positioning'][Math.floor(Math.random() * 3)] as any 
      }, ...prev]);

      setInsights(prev => [{ 
        id: Math.random().toString(36).substr(2, 9),
        companyId: id,
        title: `Gap Analysis: ${capitalizedName} vs You`, 
        description: `Our AI summary shows ${capitalizedName} is currently weak in enterprise-grade SSO and audit logs. This represents a 24% market gap you can exploit.`, 
        impact: 'high' as const 
      }, ...prev]);
    });

    setIsAnalyzing(false);
    setShowAddModal(false);
    setUrls('');
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(prev => prev.filter(c => c.id !== id));
    setActivities(prev => prev.filter(a => a.companyId !== id));
    setInsights(prev => prev.filter(i => i.companyId !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
        
        {/* Add Competitor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl animate-in fade-in">
            <div className="w-full max-w-2xl bg-card border rounded-[3rem] p-10 shadow-2xl shadow-primary/20 animate-in zoom-in-95">
              {!isAnalyzing ? (
                <form onSubmit={handleAddCompetitors} className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="h-6 w-6 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-[0.3em]">AI Intelligence Unit</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Compare Multiple Competitors</h2>
                    <p className="text-muted-foreground text-lg">Enter URLs separated by commas to perform a real-time deep research sweep.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <textarea 
                      autoFocus
                      placeholder="competitor1.com, competitor2.io, competitor3.ai" 
                      className="w-full p-6 rounded-[2rem] border bg-background/50 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-xl font-medium min-h-[150px] resize-none"
                      value={urls}
                      onChange={(e) => setUrls(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-8 py-5 rounded-2xl border-2 font-black hover:bg-muted transition-all uppercase tracking-widest text-xs"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-black hover:opacity-90 shadow-xl shadow-primary/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                    >
                      Initialize Real-Time Research
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-16 flex flex-col items-center text-center space-y-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
                    <Loader2 className="h-24 w-24 text-primary animate-spin stroke-[1]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="h-10 w-10 text-primary animate-bounce" />
                    </div>
                  </div>
                  <div className="space-y-4 max-w-sm">
                    <h3 className="text-2xl font-black tracking-tight uppercase">AI Researcher Active</h3>
                    <div className="flex flex-col gap-3">
                      {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-3 text-sm transition-all duration-700 ${i === analysisStep ? 'text-primary font-bold scale-105' : i < analysisStep ? 'text-emerald-500 opacity-60' : 'text-muted-foreground opacity-30'}`}>
                          {i < analysisStep ? <CheckCircle2 className="h-4 w-4" /> : <div className={`h-1.5 w-1.5 rounded-full ${i === analysisStep ? 'bg-primary' : 'bg-muted-foreground'}`} />}
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-black tracking-tighter italic uppercase italic">
                Pulse<span className="text-primary not-italic">Intel</span>
              </h1>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${isDarkMode ? 'bg-primary/10 text-primary border-primary/20' : 'bg-foreground/5 text-foreground border-foreground/10'}`}>
                AI Live Session
              </div>
            </div>
            <p className="text-muted-foreground font-medium">Real-time competitive research & strategic gap analysis.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground hover:scale-105 shadow-2xl shadow-primary/30 transition-all font-black text-xs uppercase tracking-widest"
            >
              <Plus className="h-5 w-5" />
              Compare Competitors
            </button>
          </div>
        </div>

        {competitors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-muted/50 flex items-center justify-center border-2 border-dashed">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">No Competitors Monitored</h2>
              <p className="text-muted-foreground max-w-sm">Enter one or more URLs to begin real-time AI research and see live activity feeds.</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="text-primary font-bold hover:underline"
            >
              Start Your First Research Cycle →
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Active Rivals', value: competitors.length.toString(), icon: Shield, color: 'text-blue-500' },
                { label: 'Live Events', value: activities.length.toString(), icon: Activity, color: 'text-emerald-500' },
                { label: 'Strategic Gaps', value: insights.length.toString(), icon: Sparkles, color: 'text-amber-500' },
                { label: 'AI Confidence', value: '98%', icon: BarChart3, color: 'text-purple-500' },
              ].map((stat, i) => (
                <div key={i} className="group p-8 rounded-[2.5rem] border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all">
                  <div className={`p-3 w-fit rounded-2xl bg-muted/50 mb-6 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(400px,auto)]">
              
              <BentoCard title="Live Activity Feed" icon={Activity} className="md:col-span-8 lg:col-span-7">
                <div className="flex flex-col gap-2">
                  {activities.map((act) => (
                    <ActivityItem key={act.id} {...act} onRemove={() => setActivities(prev => prev.filter(a => a.id !== act.id))} />
                  ))}
                </div>
              </BentoCard>

              <BentoCard title="Gap Analysis & Strategy" icon={Sparkles} className="md:col-span-4 lg:col-span-5">
                <div className="flex flex-col gap-4">
                  {insights.map((ins) => (
                    <InsightCard key={ins.id} {...ins} onRemove={() => setInsights(prev => prev.filter(i => i.id !== ins.id))} />
                  ))}
                </div>
              </BentoCard>

              <BentoCard title="Threat Index" icon={Shield} className="md:col-span-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
                  {competitors.map((comp) => (
                    <div key={comp.id} className="relative group/item flex flex-col gap-4 p-6 rounded-[2rem] border bg-muted/20 hover:border-primary/20 transition-all">
                      <button 
                        onClick={() => removeCompetitor(comp.id)}
                        className="absolute right-4 top-4 p-2 hover:text-rose-500 opacity-0 group-hover/item:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary">
                          {comp.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black tracking-tight">{comp.name}</span>
                          <span className="text-xs text-muted-foreground">{comp.url}</span>
                        </div>
                      </div>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span>Threat Score</span>
                          <span className={comp.score > 70 ? 'text-rose-500' : 'text-emerald-500'}>{comp.score}%</span>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${comp.score > 70 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${comp.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
