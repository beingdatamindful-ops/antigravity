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
  X,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const BentoCard = ({ children, className = "", title, icon: Icon, onRemove }: { children: React.ReactNode, className?: string, title?: string, icon?: any, onRemove?: () => void }) => (
  <div className={`group relative overflow-hidden rounded-[2.5rem] border bg-card p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${className}`}>
    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
    <div className="mb-6 flex items-center justify-between relative z-10">
      {title && (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            {Icon && <Icon className="h-5 w-5" />}
          </div>
          <h3 className="text-sm font-black text-foreground uppercase tracking-[0.2em]">{title}</h3>
        </div>
      )}
      {onRemove && (
        <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all">
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const ActivityItem = ({ company, change, time, type, onRead }: { company: string, change: string, time: string, type: string, onRead: () => void }) => (
  <div className="group/item flex items-start gap-5 p-5 rounded-3xl hover:bg-muted/50 transition-all border border-transparent hover:border-border cursor-pointer" onClick={onRead}>
    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
      <Activity className="h-6 w-6 text-primary" />
    </div>
    <div className="flex-1 min-w-0 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <p className="font-black text-lg tracking-tight">{company}</p>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{change}</p>
      <div className="pt-2 flex items-center justify-between">
        <span className="text-[10px] px-3 py-1 rounded-full border border-primary/20 bg-primary/5 font-black uppercase text-primary tracking-widest">{type}</span>
        <span className="text-[10px] font-black text-primary opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center gap-1">READ AUDIT <ChevronRight className="h-3 w-3" /></span>
      </div>
    </div>
  </div>
);

export const Dashboard = () => {
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
    
    // DEEP INTELLIGENCE INJECTION
    if (capitalizedComp.toLowerCase().includes('coca')) {
      setActivities(prev => [{
        id: 'act1',
        company: 'Coca-Cola',
        type: 'Pricing Audit',
        time: 'Just now',
        change: "Shift to 'Premium Small Packs' detected. Coca-Cola is reducing liquid volume while increasing price-per-ounce through a massive 7.5oz can push.",
        fullReport: `### Deep Audit: Coca-Cola's Shrinkflation Strategy\n\n**Finding:** Coca-Cola has pivoted its retail strategy from 'Volume' to 'Margin'. By pushing 7.5oz sleek cans over traditional 12oz packs, they have successfully increased their price-per-ounce by 22% in North American metros.\n\n**Impact on ${capitalizedUser}:** Your bulk-purchase pod model is now significantly more cost-effective for families. \n\n**Strategic Recommendation:** Launch a marketing campaign titled 'The Real Cost of Convenience' that highlights your 30% lower cost-per-serve vs. Coke's premium small packs.`
      }, {
        id: 'act2',
        company: 'Coca-Cola',
        type: 'Product Pivot',
        time: '2h ago',
        change: "Aggressive expansion into the 'Ready-to-Drink' (RTD) Alcohol space via the Jack Daniel's partnership. They are dominating the 'Adult Social' beverage category.",
        fullReport: `### Deep Audit: RTD Alcohol Market Dominance\n\n**Finding:** Coke is leveraging its fountain dominance to own the 'Evening' beverage slot. Their partnerships with major spirits brands have captured 14% of the RTD alcohol market in 6 months.\n\n**The Gap:** ${capitalizedUser} is strictly an 'Am/Pm' brand (Coffee/Soda). You have no 'Evening/Social' presence.\n\n**Fulfillment Plan:** Research a 'Mocktail Pod' line for Keurig machines to capture the social-drinking-at-home market without needing alcohol licensing.`
      }, {
        id: 'act3',
        company: 'Coca-Cola',
        type: 'Messaging Shift',
        time: '5h ago',
        change: "New 'Global Purpose' branding rollout. They are moving away from 'Taste' to 'Impact', focusing on water security and sustainable sourcing.",
        fullReport: `### Deep Audit: Messaging Vulnerability\n\n**Finding:** Coke is vulnerable on the 'Plastic Waste' front despite their branding. Their 'World Without Waste' campaign is facing backlash regarding single-use plastics.\n\n**Your Advantage:** Keurig's shift to 100% recyclable K-cups is a stronger sustainability story if told correctly.\n\n**Fulfillment Plan:** Focus all top-of-funnel ads on 'The Closed-Loop Morning'. Highlight the circularity of your pods vs. their plastic bottles.`
      }, ...prev]);

      setInsights(prev => [{
        id: 'strat1',
        type: 'strategy',
        title: "Winning the 'At-Home' Battle: Fulfillment Plan",
        description: `Coke owns the fridge, but you own the counter. We've identified a massive gap in their ability to serve 'Custom Hot/Cold' variety without retail friction.`,
        fullReport: `### Full Strategy Report: Countertop Dominance\n\n**The Gap Analysis:**\nWhile Coca-Cola is superior in distribution (retail reach), they lack the **Personalization Engine** that ${capitalizedUser} provides through the Keurig machine. Users want customized strength, temperature, and flavor—things a cold bottle can't offer.\n\n**Strategic Gaps:**\n1. **Experience Gap:** Coke is a 'commodity' experience; Keurig is a 'ritual' experience.\n2. **Customization Gap:** Coke has 5 flavors; Keurig has 500+.\n\n**Fulfillment Strategy:**\n- **Step 1:** Double down on the 'BrewID' technology. Use AI to suggest flavors based on time of day.\n- **Step 2:** Neutralize Coke's cold-drink dominance by accelerating the 'K-Brew+Chill' rollout. You must own the 'Iced' category at home.\n- **Step 3:** Partner with Coke's non-CSD rivals (like Pepsi/Starbucks) to create an exclusive 'Anti-Coke' pod ecosystem.`
      }, {
        id: 'opp1',
        type: 'opportunity',
        title: "Opportunity: The Office Beverage Station",
        description: `Post-COVID office returns are surging. Coke's fountain machines are high-maintenance. Your 'Keurig Commercial' line has a 65% higher ROI for small businesses.`,
        fullReport: `### Market Opportunity Report: B2B Resurgence\n\n**The Opportunity:**\nAs companies bring employees back 3-4 days a week, the 'Coffee Room' is the new water cooler. Coca-Cola's 'Freestyle' machines are too expensive for 50-person offices.\n\n**Proposed Action:**\nLaunch a 'PulseIntel Subscription' for offices that bundles coffee pods, Snapple RTD, and water filtration into a single monthly fee. \n\n**Projected Value:** 24% increase in B2B recurring revenue within 12 months.`
      }, {
        id: 'opp2',
        type: 'opportunity',
        title: "Opportunity: Gen-Z Functional Wellness",
        description: `Gen-Z is abandoning high-sugar soda (Coke's core) for functional wellness. Your Snapple and Core Hydration brands are perfectly positioned but under-marketed.`,
        fullReport: `### Market Opportunity Report: Wellness Pivot\n\n**The Finding:**\nSugar-free is no longer enough. Gen-Z wants 'Function' (Vitamins, Focus, Calm). \n\n**Gap Analysis:**\nCoke's 'SmartWater' is basic. Your 'Core Hydration+' has the pH-balance hook.\n\n**Action Plan:**\nRebrand Core Hydration as the 'Intelligent Hydrator' for deep-work and fitness. Use influencer-led campaigns to separate it from the 'Sugar-Soda' image of your parent company.`
      }, ...prev]);

      setSeoGaps(prev => [{
        id: 'seo1',
        competitor: 'Coca-Cola',
        gap: "The 'Sustainable Beverage' Keyword Battle",
        suggestion: "Coke ranks #1 for 'Eco-friendly drinks'. You have 0 presence here. You must create a 'Sustainability Transparency Hub' on your site immediately.",
        fullReport: `### SEO Battlefield Report: Sustainability Keywords\n\n**Competitor Advantage:** Coke has invested $50M in 'Purpose-led' content. They own the keywords: 'Water Stewardship', 'Recyclable Bottles', and 'Green Beverage Company'.\n\n**Your Gap:** You are seen as 'The Pod Waste Company' in the eyes of Google's ranking algorithm.\n\n**Recovery Plan:**\n1. Launch a series of 'Life Cycle Analysis' articles for K-Cups.\n2. Target 'Zero-Waste Coffee' long-tail keywords.\n3. Build a 'Compostability Tracker' tool to gain high-authority backlinks from eco-blogs.`
      }, {
        id: 'seo2',
        competitor: 'Coca-Cola',
        gap: "Top-of-Funnel 'Refreshment' Keywords",
        suggestion: "Coke owns 'Summer Refreshment'. You should pivot to 'All-Season Hydration' to capture the 365-day search intent they miss.",
        fullReport: `### SEO Battlefield Report: Seasonal Intent\n\n**The Problem:** Your traffic spikes in Winter (Coffee). Coke's spikes in Summer (Soda).\n\n**The Strategy:** Use 'Snapple' and 'Canada Dry' content to flatten your traffic curve. Target 'Alcohol-free Summer Drinks'—a category Coke is currently neglecting in their SEO focus.`
      }, {
        id: 'seo3',
        competitor: 'Coca-Cola',
        gap: "Direct-to-Consumer (DTC) Search Dominance",
        suggestion: "You have a massive DTC advantage. Coke's site is for branding; yours is for buying. SEO-optimize your 'Subscripton' landing pages now.",
        fullReport: `### SEO Battlefield Report: Transactional vs. Informational\n\n**Finding:** Coke's SEO is 'Informational' (Branding). Yours should be 'Transactional' (Buying).\n\n**Gap:** Your 'Coffee Subscription' pages are not ranking for 'Drink Delivery' keywords.\n\n**Action:** Optimize for 'Beverage Subscription Box' and 'Office Coffee Delivery' to bypass Coke's retail-heavy SEO strategy.`
      }, ...prev]);
    }

    setIsAnalyzing(false);
    setShowAddModal(false);
    setInputUrl('');
  };

  const ReportModal = () => {
    if (!selectedReport) return null;
    return (
      <div className="fixed inset-0 z-[102] flex items-center justify-center p-6 bg-background/95 backdrop-blur-2xl animate-in fade-in">
        <div className="w-full max-w-4xl bg-card border rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[90vh] flex flex-col">
          <div className="p-8 border-b flex items-center justify-between bg-muted/20">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">{selectedReport.title || selectedReport.company}</h2>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{selectedReport.type || 'Strategic Analysis'}</p>
              </div>
            </div>
            <button onClick={() => setSelectedReport(null)} className="p-3 hover:bg-muted rounded-full transition-all">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-10 overflow-y-auto text-foreground prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap font-medium leading-relaxed text-lg opacity-90">
              {selectedReport.fullReport}
            </div>
          </div>
          <div className="p-8 border-t bg-muted/20 flex justify-end gap-4">
            <button onClick={() => setSelectedReport(null)} className="px-8 py-4 rounded-2xl border font-black uppercase text-xs tracking-widest">Close Report</button>
            <button className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">Share with Team</button>
          </div>
        </div>
      </div>
    );
  };

  if (!isSetup) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
        <div className="fixed top-8 right-8 flex gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-4 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-all text-foreground">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="w-full max-w-2xl space-y-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-[2.5rem] bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 relative">
                <Target className="h-10 w-10 text-primary-foreground" />
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>
            <h1 className="text-6xl font-black tracking-tighter">Pulse<span className="text-primary italic">Intel</span></h1>
            <p className="text-muted-foreground text-xl font-medium max-w-md mx-auto">The Strategic AI Command Center for Market Dominance.</p>
          </div>
          
          <form onSubmit={handleSetup} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl group-focus-within:bg-primary/20 transition-all rounded-full" />
              <input 
                autoFocus
                placeholder="https://yourcompany.com" 
                className="relative w-full p-10 rounded-[3rem] border-2 border-border bg-card focus:outline-none focus:border-primary transition-all text-3xl font-black tracking-tight text-center placeholder:text-muted-foreground/30"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
            </div>
            <button className="w-full py-8 rounded-[3rem] bg-primary text-primary-foreground font-black text-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 uppercase tracking-widest">
              Initialize Intelligence Hub
              <ArrowUpRight className="h-8 w-8" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <ReportModal />
      
      <div className="flex flex-col gap-10 p-10 max-w-[1800px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 relative">
        
        {/* Duel Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl animate-in fade-in">
            <div className="w-full max-w-xl bg-card border rounded-[3rem] p-10 shadow-2xl shadow-primary/20 animate-in zoom-in-95">
              {!isAnalyzing ? (
                <form onSubmit={handleAddCompetitor} className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                      <Flame className="h-4 w-4" />
                      Side-by-Side Duel Audit
                    </div>
                    <h2 className="text-4xl font-black tracking-tight">Add Rival</h2>
                    <p className="text-muted-foreground font-medium text-lg">AI will perform a deep-sweep of <span className="text-foreground font-bold underline decoration-primary decoration-4 underline-offset-4">{userUrl}</span> vs the rival.</p>
                  </div>
                  
                  <input 
                    autoFocus
                    placeholder="https://competitor.com" 
                    className="w-full p-8 rounded-[2rem] border-2 bg-background/50 focus:outline-none focus:border-primary transition-all text-2xl font-black"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                  />

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 p-6 rounded-2xl border-2 font-black uppercase text-xs tracking-widest">Cancel</button>
                    <button type="submit" className="flex-[2] p-6 rounded-2xl bg-primary text-primary-foreground font-black flex items-center justify-center gap-3 uppercase text-xs tracking-widest shadow-xl shadow-primary/20">Launch Audit Duel <ArrowUpRight className="h-5 w-5" /></button>
                  </div>
                </form>
              ) : (
                <div className="py-20 flex flex-col items-center text-center space-y-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse" />
                    <Loader2 className="h-28 w-28 text-primary animate-spin stroke-[1]" />
                    <Sparkles className="absolute inset-0 m-auto h-12 w-12 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter">AI Deep Intelligence Active...</h3>
                    <div className="flex flex-col gap-3">
                      {steps.map((step, i) => (
                        <div key={i} className={`flex items-center gap-4 text-sm font-bold transition-all duration-700 ${i === analysisStep ? 'text-primary scale-110' : i < analysisStep ? 'text-emerald-500 opacity-60' : 'text-muted-foreground opacity-30'}`}>
                          {i < analysisStep ? <CheckCircle2 className="h-5 w-5" /> : <div className={`h-2 w-2 rounded-full ${i === analysisStep ? 'bg-primary' : 'bg-muted-foreground'}`} />}
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
        <div className="flex items-end justify-between border-b border-border/50 pb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <h1 className="text-6xl font-black tracking-tighter uppercase italic text-foreground">Pulse<span className="text-primary not-italic">Intel</span></h1>
              <div className="h-10 w-[2px] bg-border/50 mx-4" />
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-muted/30 border font-black text-lg text-foreground">
                <Globe className="h-6 w-6 text-primary" />
                {userUrl}
              </div>
            </div>
            <p className="text-xl font-bold text-muted-foreground">Strategic Intelligence Command Center — <span className="text-primary">v2.4 Active</span></p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-6 rounded-3xl bg-muted/50 border-2 hover:border-primary/50 transition-all text-foreground">
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button onClick={() => setShowAddModal(true)} className="px-12 py-6 rounded-[2rem] bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-4">
              <Plus className="h-6 w-6" /> Launch Duel
            </button>
          </div>
        </div>

        {competitors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-10">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
              <div className="h-32 w-32 rounded-[3rem] bg-muted/50 flex items-center justify-center border-4 border-dashed border-primary/20 relative z-10">
                <Trophy className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-4 max-w-lg">
              <h2 className="text-4xl font-black tracking-tight">The Battleground is Silent</h2>
              <p className="text-muted-foreground text-xl font-medium">Initialize a Side-by-Side Audit by adding a competitor. The AI will generate a 360-degree strategic gap report.</p>
            </div>
            <button onClick={() => setShowAddModal(true)} className="text-primary font-black text-xl hover:underline flex items-center gap-2">Start First Intelligence Duel <ArrowUpRight className="h-6 w-6" /></button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Live Comparison Feed */}
            <BentoCard title="Deep Activity Audit" icon={Activity} className="md:col-span-8">
              <div className="grid grid-cols-1 gap-2">
                {activities.map((act) => (
                  <ActivityItem key={act.id} {...act} onRead={() => setSelectedReport(act)} />
                ))}
              </div>
            </BentoCard>

            {/* Strategic Gap Analysis */}
            <BentoCard title="Strategy Reports" icon={Sparkles} className="md:col-span-4">
              <div className="flex flex-col gap-6">
                {insights.filter(i => i.type === 'strategy').map((ins) => (
                  <div key={ins.id} className="p-8 rounded-[2rem] bg-primary/5 border-2 border-primary/10 space-y-6 hover:border-primary/30 transition-all group/report">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                        <FileText className="h-4 w-4" /> Strategic Gap
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase">
                        <ArrowUpRight className="h-3 w-3" /> High Impact
                      </div>
                    </div>
                    <h4 className="font-black text-2xl leading-tight text-foreground">{ins.title}</h4>
                    <p className="text-md text-muted-foreground leading-relaxed font-medium line-clamp-3">{ins.description}</p>
                    <button onClick={() => setSelectedReport(ins)} className="w-full text-xs font-black bg-primary text-primary-foreground py-5 rounded-2xl hover:opacity-90 uppercase tracking-widest shadow-lg shadow-primary/20 group-hover/report:scale-[1.02] transition-transform">Read Full Report</button>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* SEO Battlefield */}
            <BentoCard title="SEO Battlefield: Top Gaps" icon={SearchCode} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {seoGaps.map((seo) => (
                  <div key={seo.id} onClick={() => setSelectedReport(seo)} className="p-10 rounded-[3rem] bg-card border-2 hover:border-primary/50 transition-all space-y-8 relative overflow-hidden group cursor-pointer">
                    <div className="absolute -right-8 -top-8 p-12 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all">
                      <TrendingUp className="h-10 w-10 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">{seo.competitor} Advantage</span>
                    </div>
                    <h4 className="text-2xl font-black leading-tight text-foreground">{seo.gap}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{seo.suggestion}</p>
                    <div className="pt-4 flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest">
                      Deep Audit Details <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Opportunity Alerts */}
            <BentoCard title="High-Value Opportunity Alerts" icon={Zap} className="md:col-span-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {insights.filter(i => i.type === 'opportunity').map((opp) => (
                  <div key={opp.id} onClick={() => setSelectedReport(opp)} className="p-10 rounded-[3rem] border-2 border-emerald-500/30 bg-emerald-500/[0.03] space-y-6 relative overflow-hidden group cursor-pointer hover:border-emerald-500 transition-all">
                    <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-emerald-500/10 rounded-full blur-[60px] group-hover:scale-150 transition-all duration-1000" />
                    <div className="flex items-center gap-3 text-emerald-500 font-black text-xs uppercase tracking-widest">
                      <AlertCircle className="h-5 w-5" /> Strike Opportunity
                    </div>
                    <h4 className="font-black text-3xl leading-tight text-foreground">{opp.title}</h4>
                    <p className="text-md text-muted-foreground leading-relaxed font-medium line-clamp-4">{opp.description}</p>
                    <div className="pt-4 flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
                      Read Action Plan <ChevronRight className="h-4 w-4" />
                    </div>
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
