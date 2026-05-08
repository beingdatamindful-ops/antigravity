import React, { useState, useEffect, useRef } from 'react';
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
  X,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Lock,
  Mail,
  User,
  Fingerprint
} from 'lucide-react';

const BentoCard = ({ children, className = "", title, icon: Icon, onRemove, id }: { children: React.ReactNode, className?: string, title?: string, icon?: any, onRemove?: () => void, id?: string }) => (
  <div id={id} className={`group relative overflow-hidden rounded-[2rem] border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${className}`}>
    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
    <div className="mb-4 flex items-center justify-between relative z-10">
      {title && (
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            {Icon && <Icon className="h-4 w-4" />}
          </div>
          <h3 className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</h3>
        </div>
      )}
      {onRemove && (
        <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-all">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const ActivityItem = ({ company, change, time, type, onRead }: { company: string, change: string, time: string, type: string, onRead: () => void }) => (
  <div className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-border cursor-pointer" onClick={onRead}>
    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <Activity className="h-5 w-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <p className="font-bold text-sm tracking-tight">{company}</p>
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">{change}</p>
      <div className="pt-2 flex items-center justify-between">
        <span className="text-[9px] px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 font-black uppercase text-primary tracking-widest">{type}</span>
        <span className="text-[9px] font-black text-primary opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1 uppercase tracking-widest">Read <ChevronRight className="h-2 w-2" /></span>
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUrl, setUserUrl] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [seoGaps, setSeoGaps] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "AI Agent Initializing Deep Sweep...",
    "Analyzing Rival Market Positioning...",
    "Evaluating Product Infrastructure...",
    "Generating Strategic Fulfillment Plan...",
    "Finalizing Intelligence Report..."
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
    
    // UNIVERSAL DEEP INTELLIGENCE GENERATOR
    setActivities(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      company: capitalizedComp,
      type: 'Pricing Audit',
      time: 'Just now',
      change: `AI detected a dynamic pricing test on ${capitalizedComp}'s high-traffic landing pages. They are undercutting your core offering by 14%.`,
      fullReport: `### Deep Audit: Dynamic Pricing Pressure\n\n**Finding:** ${capitalizedComp} has implemented a geography-based dynamic pricing engine. Users in tier-1 markets are being shown a 'Starter' plan that is specifically priced to pull users away from ${capitalizedUser}.\n\n**Strategic Recommendation:** Do not participate in a price war. Instead, highlight the 'Enterprise-Grade' features you include for free which ${capitalizedComp} hides behind a paywall.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      company: capitalizedComp,
      type: 'Product Pivot',
      time: '1h ago',
      change: `New API Documentation released. ${capitalizedComp} is pivoting towards a 'Platform-First' strategy to capture developer mindshare.`,
      fullReport: `### Deep Audit: Platform Strategy Shift\n\n**Finding:** ${capitalizedComp} is no longer just a tool; they are becoming a platform. By opening their API and adding a 'Marketplace' tab, they are aiming for high-switching-cost lock-in.\n\n**The Gap:** ${capitalizedUser} is currently viewed as a standalone solution.\n\n**Fulfillment Plan:** Accelerate your integration roadmap. Focus on Zapier, Slack, and Salesforce connectivity to neutralize their 'Platform' advantage.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      company: capitalizedUser,
      type: 'AI Health Check',
      time: '3h ago',
      change: `Intelligence Sweep: Your current messaging for ${capitalizedUser} is over-indexing on technical specs and missing out on 'Outcome-based' value.`,
      fullReport: `### Internal Audit: Messaging Gap\n\n**Finding:** Your site focuses on 'How it works.' Competitors focus on 'What you get.'\n\n**Action Plan:** Rewrite your Hero section to focus on 3 specific outcomes: Time Saved, Cost Reduced, and Efficiency Gained. \n\n**Projected Value:** 18% increase in visitor-to-demo conversion.`
    }, ...prev]);

    setInsights(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      type: 'strategy',
      title: `Strategic Fulfillment: ${capitalizedUser} vs ${capitalizedComp}`,
      description: `Analysis reveals ${capitalizedComp} is winning on 'Time-to-Value' (TTV). Your product requires 2x more configuration steps.`,
      fullReport: `### Full Strategy Report: Reducing TTV\n\n**The Gap Analysis:**\nWhile ${capitalizedUser} is functionally superior, the 'Activation Energy' required to see the first result is too high. ${capitalizedComp} uses a 'Wizard' approach that gives users a win in 60 seconds.\n\n**Strategic Gaps:**\n1. **Onboarding Gap:** You have a manual setup; they have an automated wizard.\n2. **UI Friction:** Your dashboard is powerful but complex.\n\n**Fulfillment Strategy:**\n- **Step 1:** Implement a 'Quick Start' template library.\n- **Step 2:** Add a 'Progressive Disclosure' UI—don't show every feature at once.\n- **Step 3:** Launch a 'Migration Concierge' to help users switch from ${capitalizedComp} effortlessly.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      type: 'opportunity',
      title: "Opportunity: The Underserved Mid-Market",
      description: `${capitalizedComp} has recently increased their 'Starter' pricing, leaving a massive gap for customers in the $1k-$5k ARR bracket.`,
      fullReport: `### Market Opportunity Report: Mid-Market Strike\n\n**The Opportunity:**\nBy moving upmarket, ${capitalizedComp} has left their legacy customer base feeling neglected. These users are searching for alternatives that still care about mid-market needs.\n\n**Proposed Action:**\nLaunch a 'Switch & Save' campaign targeting users with 10-50 employees. Offer 3 months free if they migrate from ${capitalizedComp}.\n\n**Projected Value:** 200+ new high-retention accounts in Q3.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      type: 'opportunity',
      title: "Opportunity: AI-Powered Automation Hub",
      description: `Users are asking for 'One-Click' workflows. ${capitalizedComp} is slow to adapt. Your infrastructure is perfectly suited for an 'Automated Intelligence' layer.`,
      fullReport: `### Market Opportunity Report: Automation First\n\n**The Finding:**\nUsers no longer want to 'Check' a dashboard; they want the dashboard to 'Act' for them.\n\n**Action Plan:**\nRelease a 'Strategic Autopilot' feature that automatically alerts stakeholders when specific competitor metrics cross a threshold. Make it the centerpiece of your Pro Plan.`
    }, ...prev]);

    setSeoGaps(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      competitor: capitalizedComp,
      gap: `The 'Best [Category] Software' Keyword War`,
      suggestion: `${capitalizedComp} is outranking you for every high-intent comparison keyword. You need a dedicated Comparison Hub.`,
      fullReport: `### SEO Battlefield Report: Comparison Keywords\n\n**Competitor Advantage:** ${capitalizedComp} has a highly optimized 'Alternative To' landing page strategy. They rank for every search that starts with 'Best...' or 'Alternatives to...'.\n\n**Your Gap:** Your content is 'Educational' but not 'Comparative'.\n\n**Recovery Plan:**\n1. Create 10 comparison pages (e.g., You vs. Them).\n2. Use 'Feature-by-Feature' tables with rich snippets (Schema.org).\n3. Focus on 'Why [Company] Switched' case studies to build social proof and SEO juice.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      competitor: capitalizedComp,
      gap: "Top-of-Funnel 'Problem-Solving' Intent",
      suggestion: "Users are searching for 'How to [Task]'. Your blog covers company news, while their blog solves problems. Pivot your content strategy.",
      fullReport: `### SEO Battlefield Report: Intent Alignment\n\n**The Problem:** Your blog traffic is low because you aren't answering user questions. \n\n**The Strategy:** Transition to a 'Solution-First' content model. Every article must solve a specific industry problem. Target 'How to automate [Process]'—a category ${capitalizedComp} is currently dominating.`
    }, {
      id: Math.random().toString(36).substr(2, 9),
      competitor: capitalizedComp,
      gap: "Domain Authority & Backlink Profiling",
      suggestion: "They have 3x your backlinks from high-authority SaaS directories. You need a focused guest-posting and directory-submission push.",
      fullReport: `### SEO Battlefield Report: Authority Gap\n\n**Finding:** ${capitalizedComp} is listed on G2, Capterra, and TrustRadius with 1,000+ reviews. You have under 50.\n\n**Action:** Launch a 'Review for Credits' campaign to your happiest users. Focus on high-DA sites where your target audience researches software.`
    }, ...prev]);

    setIsAnalyzing(false);
    setShowAddModal(false);
    setInputUrl('');
  };

  const ReportModal = () => {
    if (!selectedReport) return null;
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-background/95 backdrop-blur-2xl animate-in fade-in">
        <div className="w-full max-w-3xl bg-card border rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[85vh] flex flex-col">
          <div className="p-6 border-b flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">{selectedReport.title || selectedReport.company}</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{selectedReport.type || 'Strategic Analysis'}</p>
              </div>
            </div>
            <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-muted rounded-full transition-all text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-8 overflow-y-auto text-foreground prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap font-medium leading-relaxed text-sm opacity-90">
              {selectedReport.fullReport}
            </div>
          </div>
          <div className="p-6 border-t bg-muted/20 flex justify-end gap-3">
            <button onClick={() => setSelectedReport(null)} className="px-6 py-3 rounded-xl border font-black uppercase text-[10px] tracking-widest">Close</button>
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20">Download PDF</button>
          </div>
        </div>
      </div>
    );
  };

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
        <div className="fixed top-8 right-8">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all text-foreground">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40">
                <Fingerprint className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Pulse<span className="text-primary not-italic">Intel</span></h1>
            <p className="text-muted-foreground text-sm font-medium">Enterprise Strategic Intelligence Unit</p>
          </div>
          
          <div className="bg-card border rounded-[2.5rem] p-8 shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" placeholder="name@company.com" className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background/50 focus:outline-none focus:border-primary" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background/50 focus:outline-none focus:border-primary" value={pass} onChange={e => setPass(e.target.value)} />
                </div>
              </div>
            </div>
            <button onClick={() => setIsLoggedIn(true)} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Sign In to Intelligence Hub
            </button>
            <div className="text-center">
              <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot your password?</a>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground">Don't have an account? <a href="#" className="text-primary font-bold">Contact Sales for Subscription</a></p>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) return <LoginPage />;

  if (!isSetup) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
        <div className="fixed top-8 right-8 flex gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all text-foreground">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="w-full max-w-xl space-y-10 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-[2rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 relative">
                <Target className="h-8 w-8 text-primary-foreground" />
                <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-primary animate-pulse" />
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Initialize Your Hub</h1>
            <p className="text-muted-foreground text-sm font-medium">Which business are we building intelligence for today?</p>
          </div>
          
          <form onSubmit={handleSetup} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-2xl group-focus-within:bg-primary/20 transition-all rounded-full" />
              <input 
                autoFocus
                placeholder="https://yourcompany.com" 
                className="relative w-full p-8 rounded-[2.5rem] border-2 border-border bg-card focus:outline-none focus:border-primary transition-all text-2xl font-black tracking-tight text-center placeholder:text-muted-foreground/30 text-foreground"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
            <button className="w-full py-6 rounded-[2.5rem] bg-primary text-primary-foreground font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-widest">
              Set Target Company
              <ArrowUpRight className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <ReportModal />
      
      <div className="flex flex-col gap-8 p-8 max-w-[1700px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
        
        {/* Duel Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl animate-in fade-in">
            <div className="w-full max-w-xl bg-card border rounded-[3rem] p-10 shadow-2xl shadow-primary/20 animate-in zoom-in-95">
              {!isAnalyzing ? (
                <form onSubmit={handleAddCompetitor} className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                      <Flame className="h-4 w-4" />
                      Side-by-Side Audit
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-foreground">Add Rival URL</h2>
                    <p className="text-muted-foreground">The AI will scrape <span className="text-foreground font-bold">{userUrl}</span> vs the rival to find strategic gaps.</p>
                  </div>
                  
                  <input 
                    autoFocus
                    placeholder="https://competitor.com" 
                    className="w-full p-6 rounded-[2rem] border-2 bg-background/50 focus:outline-none focus:border-primary transition-all text-xl font-bold text-foreground"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 p-5 rounded-2xl border font-bold uppercase text-[10px] tracking-widest text-foreground">Cancel</button>
                    <button type="submit" className="flex-[2] p-5 rounded-2xl bg-primary text-primary-foreground font-black flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest">Start Analysis <ArrowUpRight className="h-4 w-4" /></button>
                  </div>
                </form>
              ) : (
                <div className="py-16 flex flex-col items-center text-center space-y-8">
                  <div className="relative">
                    <Loader2 className="h-20 w-20 text-primary animate-spin stroke-[1.5]" />
                    <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-3 text-foreground">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">AI Deep Intelligence Active...</h3>
                    <div className="flex flex-col gap-2">
                      {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-4 text-[10px] font-bold transition-all duration-700 ${i === analysisStep ? 'text-primary scale-110' : i < analysisStep ? 'text-emerald-500 opacity-60' : 'text-muted-foreground opacity-30'}`}>
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
        <div className="flex items-center justify-between border-b border-border/50 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black tracking-tighter uppercase italic text-foreground">Pulse<span className="text-primary not-italic">Intel</span></h1>
              <div className="h-6 w-[1px] bg-border mx-2" />
              <div className="flex items-center gap-2 text-muted-foreground font-bold text-sm">
                <Globe className="h-4 w-4 text-primary" />
                {userUrl}
              </div>
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Intelligence Hub v4.0</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all text-foreground">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setShowAddModal(true)} className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Rival
            </button>
          </div>
        </div>

        {competitors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="h-20 w-20 rounded-[2rem] bg-muted/50 flex items-center justify-center border-2 border-dashed border-primary/20">
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">Intelligence Ready</h2>
              <p className="text-muted-foreground text-sm font-medium max-w-sm">Add a competitor URL to generate your first Strategic Battlefield Report.</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="text-primary font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">Initialize Duel Audit <ArrowUpRight className="h-4 w-4" /></button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Live Comparison Feed */}
            <BentoCard id="overview" title="Deep Activity Audit" icon={Activity} className="md:col-span-8">
              <div className="flex flex-col gap-2">
                {activities.map((act) => (
                  <ActivityItem key={act.id} {...act} onRead={() => setSelectedReport(act)} />
                ))}
              </div>
            </BentoCard>

            {/* Strategic Gap Analysis */}
            <BentoCard id="strategy" title="Strategy Reports" icon={Sparkles} className="md:col-span-4">
              <div className="flex flex-col gap-4">
                {insights.filter(i => i.type === 'strategy').map((ins) => (
                  <div key={ins.id} className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 space-y-4 hover:border-primary/40 transition-all group/report">
                    <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-[0.2em]">
                      <FileText className="h-4 w-4" /> Strategic Gap
                    </div>
                    <h4 className="font-black text-lg leading-tight text-foreground">{ins.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-2">{ins.description}</p>
                    <button onClick={() => setSelectedReport(ins)} className="w-full text-[10px] font-black bg-primary text-primary-foreground py-4 rounded-xl hover:opacity-90 uppercase tracking-widest">Read Full Report</button>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* SEO Battlefield */}
            <BentoCard id="gap" title="SEO Analysis: What You're Missing" icon={SearchCode} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seoGaps.map((seo) => (
                  <div key={seo.id} onClick={() => setSelectedReport(seo)} className="p-8 rounded-[2.5rem] bg-card border-2 hover:border-primary/30 transition-all space-y-6 relative overflow-hidden group cursor-pointer">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-all">
                      <SearchCode className="h-8 w-8 text-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary tracking-[0.2em]">{seo.competitor} Strategy</span>
                    </div>
                    <h4 className="text-xl font-black leading-tight text-foreground">{seo.gap}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">{seo.suggestion}</p>
                    <div className="pt-2 flex items-center gap-2 text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                      Deep Audit <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Opportunity Alerts */}
            <BentoCard id="opportunity" title="High-Value Opportunity Alerts" icon={Zap} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.filter(i => i.type === 'opportunity').map((opp) => (
                  <div key={opp.id} onClick={() => setSelectedReport(opp)} className="p-8 rounded-[2.5rem] border-2 border-emerald-500/20 bg-emerald-500/[0.02] space-y-4 relative overflow-hidden group cursor-pointer hover:border-emerald-500/40 transition-all">
                    <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-all duration-1000" />
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-[0.2em]">
                      <Zap className="h-4 w-4" /> Market Strike Zone
                    </div>
                    <h4 className="font-black text-xl leading-tight text-foreground">{opp.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-2">{opp.description}</p>
                    <button className="text-[10px] font-black text-emerald-500 hover:underline uppercase tracking-widest">Read Action Plan →</button>
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
