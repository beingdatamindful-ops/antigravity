import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';

const BentoCard = ({ children, className = "", title, icon: Icon }: { children: React.ReactNode, className?: string, title?: string, icon?: any }) => (
  <div className={`group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/10 ${className}`}>
    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />
    {title && (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</h3>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />}
      </div>
    )}
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
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Globe className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold truncate">{company}</p>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
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

const InsightCard = ({ title, description, impact }: { title: string, description: string, impact: 'high' | 'medium' | 'low' }) => (
  <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-default animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="flex items-center gap-2 mb-2">
      <Zap className="h-4 w-4 text-amber-500" />
      <span className="text-xs font-bold text-amber-500 uppercase tracking-tighter">Strategic Insight</span>
    </div>
    <h4 className="font-semibold text-sm mb-1">{title}</h4>
    <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <div className={`h-1.5 w-1.5 rounded-full ${impact === 'high' ? 'bg-red-500' : impact === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
        <span className="text-[10px] font-medium uppercase">{impact} Impact</span>
      </div>
      <button className="text-[10px] font-bold text-primary hover:underline">Full Analysis</button>
    </div>
  </div>
);

export const Dashboard = () => {
  const [competitors, setCompetitors] = useState([
    { name: 'CloudMetrics', score: 85, url: 'cloudmetrics.com', status: 'active' },
    { name: 'DataFlow AI', score: 42, url: 'dataflow.ai', status: 'warning' },
    { name: 'ScaleOps', score: 78, url: 'scaleops.io', status: 'active' },
  ]);

  const [activities, setActivities] = useState([
    { company: 'CloudMetrics', change: "Pricing page updated: New 'Enterprise' tier added at $499/mo", time: '24m ago', type: 'pricing' as const },
    { company: 'DataFlow AI', change: "Released new 'Predictive Analytics' module with Snowflake integration", time: '2h ago', type: 'feature' as const },
    { company: 'ScaleOps', change: "Homepage hero text changed from 'Cloud Management' to 'AI-Native Infrastructure'", time: '5h ago', type: 'positioning' as const },
  ]);

  const [insights, setInsights] = useState([
    { title: 'Pricing Pressure detected', description: 'CloudMetrics added a mid-tier plan that undercuts your Professional tier by 15%. Recommend reviewing value proposition.', impact: 'high' as const },
    { title: 'New Feature Opportunity', description: "Competitors are increasingly focusing on 'Native SOC2 Compliance' as a marketing hook. Your product already has this but isn't highlighting it.", impact: 'medium' as const },
  ]);

  const [newUrl, setNewUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    "Initializing Firecrawl...",
    "Scraping homepage and pricing...",
    "Extracting messaging shifts...",
    "Claude AI generating strategic insights...",
    "Finalizing report..."
  ];

  const handleAddCompetitor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Simulate analysis steps
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const name = newUrl.replace('https://', '').replace('http://', '').split('.')[0];
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Add to competitors
    setCompetitors(prev => [
      { name: capitalizedName, score: Math.floor(Math.random() * 40) + 50, url: newUrl, status: 'active' },
      ...prev
    ]);

    // Add dynamic activity
    setActivities(prev => [
      { 
        company: capitalizedName, 
        change: `Detected significant messaging shift on ${capitalizedName}'s homepage regarding AI integration.`, 
        time: 'Just now', 
        type: 'positioning' 
      },
      ...prev
    ]);

    // Add dynamic insight
    setInsights(prev => [
      { 
        title: `Opportunity: ${capitalizedName} Market Gap`, 
        description: `Analysis of ${newUrl} shows a lack of focus on enterprise security features. This is your chance to double down on your security-first messaging.`, 
        impact: 'high' 
      },
      ...prev
    ]);

    setIsAnalyzing(false);
    setShowAddModal(false);
    setNewUrl('');
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      
      {/* Add Competitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-card border rounded-[2.5rem] p-8 shadow-2xl shadow-primary/20 animate-in zoom-in-95 duration-300">
            {!isAnalyzing ? (
              <form onSubmit={handleAddCompetitor} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight">Add New Competitor</h2>
                  <p className="text-muted-foreground text-sm">Enter the website URL to start the AI analysis pipeline.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="https://competitor.com" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg font-medium"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-4 rounded-2xl border font-bold hover:bg-muted transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    Start Analysis
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 flex flex-col items-center text-center space-y-8">
                <div className="relative">
                  <Loader2 className="h-20 w-20 text-primary animate-spin stroke-[1.5]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight">Analyzing {newUrl}</h3>
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-8 bg-primary rounded-full" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Dashboard</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Intelligence Overview
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Monitoring <span className="text-foreground font-medium underline decoration-primary/30 decoration-2 underline-offset-4">{competitors.length} competitors</span> with real-time AI analysis.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-bold text-sm"
          >
            <Plus className="h-5 w-5" />
            Add Competitor
          </button>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search intelligence..." 
              className="pl-10 pr-4 py-2.5 rounded-2xl border bg-background/50 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-[240px]"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Tracked Rivals', value: competitors.length.toString(), icon: Activity, trend: '+1', trendUp: true, color: 'text-blue-500' },
          { label: 'Site Updates', value: (activities.length * 4).toString(), icon: Globe, trend: '+12%', trendUp: true, color: 'text-emerald-500' },
          { label: 'AI Insights', value: insights.length.toString(), icon: Zap, trend: '+1', trendUp: true, color: 'text-amber-500' },
          { label: 'Market Share', value: '24%', icon: TrendingUp, trend: '+0.5%', trendUp: true, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="relative group overflow-hidden flex flex-col gap-1 p-7 rounded-[2rem] border bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all hover:shadow-xl hover:shadow-primary/5">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-2 rounded-xl bg-muted/50 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {stat.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <div className="text-3xl font-black tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.15em] mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(350px,auto)]">
        
        {/* Activity Feed */}
        <BentoCard 
          title="Live Activity Feed" 
          icon={Activity}
          className="md:col-span-8 lg:col-span-7 bg-gradient-to-br from-card/50 to-background/50"
        >
          <div className="flex flex-col gap-1 -mx-2">
            {activities.map((act, i) => (
              <ActivityItem key={i} {...act} />
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-muted-foreground hover:text-primary transition-all border border-dashed rounded-2xl border-border hover:border-primary/50 hover:bg-primary/5">
            View All Activity
          </button>
        </BentoCard>

        {/* AI Strategic Insights */}
        <BentoCard 
          title="Strategic Insights" 
          icon={Zap}
          className="md:col-span-4 lg:col-span-5 bg-gradient-to-tr from-amber-500/[0.02] to-card"
        >
          <div className="flex flex-col gap-4">
            {insights.map((ins, i) => (
              <InsightCard key={i} {...ins} />
            ))}
          </div>
        </BentoCard>

        {/* Competitor Health Index */}
        <BentoCard 
          title="Threat Index" 
          icon={Shield}
          className="md:col-span-6 lg:col-span-4"
        >
          <div className="space-y-6 mt-2">
            {competitors.map((comp, i) => (
              <div key={i} className="flex flex-col gap-3 group/item">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                      {comp.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{comp.name}</span>
                      <span className="text-[10px] text-muted-foreground">{comp.url}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-black ${comp.score > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {comp.score}% Threat
                  </span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${comp.score > 70 ? 'bg-rose-500' : comp.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${comp.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Traffic Share Chart */}
        <BentoCard 
          title="Market Momentum" 
          icon={TrendingUp}
          className="md:col-span-6 lg:col-span-8 bg-gradient-to-br from-primary/[0.01] to-card"
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-end justify-between gap-6 pt-8 min-h-[200px]">
              {[45, 60, 35, 80, 55, 90, 70, 85, 65, 95].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                  <div className="relative w-full">
                    <div 
                      className="w-full bg-primary/10 rounded-t-2xl group-hover/bar:bg-primary/30 transition-all duration-500"
                      style={{ height: `${height}%` }}
                    />
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t-2xl opacity-0 group-hover/bar:opacity-100 transition-all duration-500 blur-sm"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold">W{i+1}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">PulseIntel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary/20" />
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Avg Competitor</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-black text-sm">
                <ArrowUpRight className="h-4 w-4" />
                24.2% Growth
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  );
};
