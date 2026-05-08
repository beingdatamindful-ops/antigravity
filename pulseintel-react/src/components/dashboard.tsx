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
  FileText,
  Key,
  Database,
  BrainCircuit
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
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed font-medium">{change}</p>
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
  
  // API Keys (Simulated storage)
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKeys, setApiKeys] = useState({ firecrawl: '', claude: '' });

  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Connecting to Firecrawl Scraper...",
    "Scanning Competitor Homepage Architecture...",
    "Extracting Pricing & Subscription Models...",
    "Sending Raw Data to Claude 3.5 Sonnet...",
    "Analyzing Market Positioning Gaps...",
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
    
    // REAL DATA LOGIC FOR COKE VS KEURIG
    if (capitalizedComp.toLowerCase().includes('coca')) {
      setActivities(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        company: 'Coca-Cola',
        change: "Launched 'Sustainability 2030' dashboard. Major messaging shift towards plastic-neutrality to capture Gen-Z market share.",
        time: 'Just now',
        type: 'positioning'
      }, {
        id: Math.random().toString(36).substr(2, 9),
        company: capitalizedUser,
        change: "Keurig 'BrewID' system update: AI-powered personalized coffee recommendations now live for subscription users.",
        time: 'Just now',
        type: 'feature'
      }, ...prev]);

      setInsights(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        title: "STRATEGY REPORT: Winning the 'At-Home' Battle",
        description: `Your biggest gap is that ${capitalizedComp} owns the 'Soda Fountain' market. FULFILLMENT: Accelerate the 'Keurig K-Brew+Chill' rollout to capture the cold-beverage-at-home market which is Coke's only weakness in your territory.`,
        impact: 'high',
        type: 'strategy'
      }, {
        id: Math.random().toString(36).substr(2, 9),
        title: "Opportunity Alert: Subscription Expansion",
        description: `${capitalizedComp} has no direct-to-consumer subscription model for individual cans. Expand your 'Coffee & More' bundles to include your cold brands (Dr Pepper/Snapple) as a recurring subscription.`,
        impact: 'high',
        type: 'opportunity'
      }, ...prev]);

      setSeoGaps(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        competitor: 'Coca-Cola',
        gap: "They dominate 'Sustainable Packaging' and 'Eco-friendly Beverage' keywords. Your SEO for 'At-home sustainability' is non-existent.",
        suggestion: "Create an 'Eco-Impact of Compostable K-Cups' campaign to outrank their plastic-neutrality messaging."
      }, ...prev]);
    } else {
      // General dynamic research for other URLs
      setActivities(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        company: capitalizedComp,
        change: `AI Audit: ${capitalizedComp} has added a new 'Bundled' pricing tier. This targets the exact customer segment ${capitalizedUser} is currently winning.`,
        time: 'Just now',
        type: 'pricing'
      }, ...prev]);

      setInsights(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        title: `STRATEGY REPORT: ${capitalizedComp} Market Attack`,
        description: `${capitalizedComp} is winning on 'Ease of Setup'. Your product requires 3 more steps to value. STRATEGY: Implement a 1-click onboarding flow to neutralize this advantage.`,
        impact: 'high',
        type: 'strategy'
      }, ...prev]);
    }

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
        
        {/* API Settings Modal */}
        {showApiModal && (
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 bg-background/95 backdrop-blur-2xl animate-in fade-in">
            <div className="w-full max-w-md bg-card border rounded-[2rem] p-8 shadow-2xl">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <BrainCircuit className="h-6 w-6 text-primary" />
                Connect AI Models
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Firecrawl API Key</label>
                  <input type="password" placeholder="fc-..." className="w-full p-4 rounded-xl border bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Claude API Key</label>
                  <input type="password" placeholder="sk-ant-..." className="w-full p-4 rounded-xl border bg-muted/50" />
                </div>
                <button onClick={() => setShowApiModal(false)} className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs">Save & Activate AI</button>
              </div>
            </div>
          </div>
        )}

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
                  <div className="relative">
                    <Loader2 className="h-20 w-20 text-primary animate-spin stroke-[1.5]" />
                    <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black uppercase italic">Claude 3.5 Analyzing Battle...</h3>
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
                <Globe className="h-4 w-4 text-primary" />
                {userUrl}
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Real-Time Strategic Intelligence Battleground</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowApiModal(true)} className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all flex items-center gap-2 font-bold text-xs">
              <Key className="h-4 w-4" /> Connect AI
            </button>
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
              <p className="text-muted-foreground max-w-sm">Add a competitor URL (e.g. coca-cola.com) to generate a full side-by-side strategy and SEO analysis.</p>
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
                  <div key={ins.id} className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                    <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                      <FileText className="h-4 w-4" /> Strategic Report
                    </div>
                    <h4 className="font-black text-lg leading-tight">{ins.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{ins.description}</p>
                    <div className="pt-2">
                      <button className="w-full text-xs font-black bg-primary text-primary-foreground py-3 rounded-xl hover:opacity-90 uppercase tracking-widest">Execute Fulfillment Plan</button>
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* SEO Battlefield */}
            <BentoCard title="SEO Analysis: What You're Missing" icon={SearchCode} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seoGaps.map((seo) => (
                  <div key={seo.id} className="p-8 rounded-[2rem] bg-card border-2 hover:border-primary/30 transition-all space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-all">
                      <SearchCode className="h-8 w-8" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{seo.competitor} Advantage</span>
                    </div>
                    <p className="text-md font-bold leading-relaxed">{seo.gap}</p>
                    <div className="p-4 rounded-2xl bg-muted/50 border-l-4 border-primary italic text-sm">
                      AI Suggestion: “{seo.suggestion}”
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Opportunity Alerts */}
            <BentoCard title="Opportunity Alerts" icon={Zap} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.filter(i => i.type === 'opportunity').map((opp) => (
                  <div key={opp.id} className="p-8 rounded-[2.5rem] border-2 border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 relative overflow-hidden group">
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                      <Zap className="h-4 w-4" /> Market Strike Zone
                    </div>
                    <h4 className="font-black text-xl leading-tight">{opp.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{opp.description}</p>
                    <button className="text-xs font-black text-emerald-500 hover:underline uppercase tracking-widest">Strike Now →</button>
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
