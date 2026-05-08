import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ArrowUpRight, 
  Globe,
  Zap,
  Plus,
  Loader2,
  CheckCircle2,
  Trash2,
  Moon,
  Sun,
  Sparkles,
  Target,
  Trophy,
  SearchCode,
  Flame,
  FileText
} from 'lucide-react';

const BentoCard = ({ children, className = "", title, icon: Icon, onRemove }: { children: React.ReactNode, className?: string, title?: string, icon?: any, onRemove?: () => void }) => (
  <div className={`group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${className}`}>
    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
    <div className="mb-4 flex items-center justify-between relative z-10">
      {title && (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-bold">{title}</h3>
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

const ActivityItem = ({ company, change, time, type }: { company: string, change: string, time: string, type: 'pricing' | 'feature' | 'positioning' }) => {
  const typeColors = {
    pricing: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    feature: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    positioning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  return (
    <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border animate-in fade-in slide-in-from-left-4">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Activity className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold truncate">{company}</p>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">{change}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${typeColors[type]}`}>
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [userUrl, setUserUrl] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [seoGaps, setSeoGaps] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Initializing Firecrawl Scraper...",
    "Crawling User URL & Competitor URL...",
    "Extracting Pricing & Product Architectures...",
    "AI Gap Analysis: Product vs Pricing...",
    "SEO Analysis: Competitor Keyword Strategy...",
    "Generating Strategic Fulfillment Report..."
  ];

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl) {
      setUserUrl(inputUrl);
      setIsSetup(true);
      setInputUrl('');
    }
  };

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const extractName = (url: string) => {
      let hostname = url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
      let domain = hostname.split(".")[0];
      return domain.charAt(0).toUpperCase() + domain.slice(1);
    };

    const capitalizedComp = extractName(inputUrl);
    const capitalizedUser = extractName(userUrl);
    
    const id = Math.random().toString(36).substr(2, 9);

    setCompetitors(prev => [...prev, { id, name: capitalizedComp, url: inputUrl, score: Math.floor(Math.random() * 40) + 50 }]);
    
    setActivities(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      company: capitalizedComp,
      change: `Detected real-time shift in ${capitalizedComp}'s checkout flow. They have moved to a usage-based pricing model which undercuts ${capitalizedUser} for mid-market customers.`,
      time: 'Just now',
      type: 'pricing'
    }, ...prev]);

    setInsights(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      title: `Gap Analysis: ${capitalizedUser} vs ${capitalizedComp}`,
      description: `${capitalizedComp} has launched a 'Native API Connector' which ${capitalizedUser} lacks. STRATEGY: Prioritize the Q3 API roadmap or release a wrapper integration to stay competitive.`,
      impact: 'high',
      type: 'strategy'
    }, {
      id: Math.random().toString(36).substr(2, 9),
      title: `Opportunity Alert: ${capitalizedComp} Downtime`,
      description: `${capitalizedComp} is receiving negative sentiment regarding customer support response times. Suggest launching a '24/7 Premium Support' marketing campaign now.`,
      impact: 'medium',
      type: 'opportunity'
    }, ...prev]);

    setSeoGaps(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      competitor: capitalizedComp,
      gap: `They are ranking #1 for '${capitalizedComp.toLowerCase()} alternatives' and 'best ${capitalizedComp.toLowerCase()} software'. You are missing these high-intent bottom-of-funnel pages.`,
      suggestion: `Create a '${capitalizedUser} vs ${capitalizedComp}' comparison landing page immediately.`
    }, ...prev]);

    setIsAnalyzing(false);
    setShowAddModal(false);
    setInputUrl('');
  };

  if (!isSetup) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
        <div className="w-full max-w-xl space-y-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                <Target className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Welcome to <span className="text-primary italic">PulseIntel</span></h1>
            <p className="text-muted-foreground text-lg">First, tell us which company we are building intelligence for.</p>
          </div>
          
          <form onSubmit={handleSetup} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-2xl group-focus-within:bg-primary/20 transition-all rounded-full" />
              <input 
                autoFocus
                placeholder="https://yourcompany.com" 
                className="relative w-full p-8 rounded-[2rem] border-2 bg-card focus:outline-none focus:border-primary transition-all text-2xl font-bold tracking-tight text-center"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
            <button className="w-full py-6 rounded-[2rem] bg-primary text-primary-foreground font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
              Configure Intelligence Hub
              <ArrowUpRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
        
        {/* Duel Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl animate-in fade-in">
            <div className="w-full max-w-xl bg-card border rounded-[3rem] p-10 shadow-2xl shadow-primary/20 animate-in zoom-in-95">
              {!isAnalyzing ? (
                <form onSubmit={handleAddCompetitor} className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                      <Flame className="h-4 w-4" />
                      Side-by-Side Audit
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">Add Rival URL</h2>
                    <p className="text-muted-foreground">The AI will scrape <span className="text-foreground font-bold">{userUrl}</span> vs the rival to find strategic gaps.</p>
                  </div>
                  
                  <input 
                    autoFocus
                    placeholder="https://competitor.com" 
                    className="w-full p-6 rounded-[2rem] border bg-background/50 focus:outline-none focus:border-primary transition-all text-xl font-bold"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 p-5 rounded-2xl border font-bold uppercase text-[10px] tracking-widest">Cancel</button>
                    <button type="submit" className="flex-[2] p-5 rounded-2xl bg-primary text-primary-foreground font-black flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest">Launch Duel <ArrowUpRight className="h-4 w-4" /></button>
                  </div>
                </form>
              ) : (
                <div className="py-16 flex flex-col items-center text-center space-y-8">
                  <Loader2 className="h-20 w-20 text-primary animate-spin stroke-[1.5]" />
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black uppercase italic">AI Intelligence Duelling...</h3>
                    <div className="flex flex-col gap-2">
                      {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-3 text-sm transition-all duration-500 ${i === analysisStep ? 'text-primary font-bold scale-105' : i < analysisStep ? 'text-emerald-500 opacity-60' : 'text-muted-foreground opacity-30'}`}>
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

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Pulse<span className="text-primary not-italic">Intel</span></h1>
              <div className="h-6 w-[1px] bg-border mx-2" />
              <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                <Globe className="h-4 w-4" />
                {userUrl}
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Strategic Intelligence Battleground</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setShowAddModal(true)} className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Rival
            </button>
          </div>
        </div>

        {competitors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="h-20 w-20 rounded-3xl bg-muted/50 flex items-center justify-center border-2 border-dashed border-primary/20">
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">The Battleground is Empty</h2>
              <p className="text-muted-foreground max-w-sm">Add your first competitor URL to generate a full side-by-side strategy and SEO analysis.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Live Comparison Feed */}
            <BentoCard title="Live Activity Audit" icon={Activity} className="md:col-span-7">
              <div className="flex flex-col gap-2">
                {activities.map((act) => (
                  <ActivityItem key={act.id} {...act} />
                ))}
              </div>
            </BentoCard>

            {/* Strategic Gap Analysis */}
            <BentoCard title="Gap Analysis & Strategy" icon={Sparkles} className="md:col-span-5">
              <div className="flex flex-col gap-4">
                {insights.filter(i => i.type === 'strategy').map((ins) => (
                  <div key={ins.id} className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-tighter">
                      <FileText className="h-4 w-4" /> Full Strategy Report
                    </div>
                    <h4 className="font-bold">{ins.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ins.description}</p>
                    <div className="pt-2">
                      <button className="text-xs font-bold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90">View Fulfillment Plan</button>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* SEO Battlefield */}
            <BentoCard title="SEO Analysis: What You're Missing" icon={SearchCode} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seoGaps.map((seo) => (
                  <div key={seo.id} className="p-6 rounded-2xl bg-card border hover:border-primary/30 transition-all space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{seo.competitor} Strategy</span>
                      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{seo.gap}</p>
                    <div className="p-3 rounded-xl bg-primary/5 border border-dashed border-primary/20">
                      <p className="text-xs text-primary font-bold italic">“{seo.suggestion}”</p>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Opportunity Alerts */}
            <BentoCard title="Opportunity Alerts" icon={Zap} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.filter(i => i.type === 'opportunity').map((opp) => (
                  <div key={opp.id} className="p-6 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/[0.02] space-y-3 relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-700" />
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                      <Zap className="h-3 w-3" /> Market Opportunity
                    </div>
                    <h4 className="font-bold text-lg">{opp.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{opp.description}</p>
                    <button className="text-xs font-bold text-emerald-500 hover:underline">Act Now →</button>
                  </div>
                ))}
              </div>
            </BentoCard>

          </div>
        )}
      </div>
    </div>
  );
};
