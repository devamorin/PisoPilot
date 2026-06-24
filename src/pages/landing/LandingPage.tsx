import { Link } from 'react-router-dom'
import { Wallet, TrendingUp, Target, Shield, Clock, Smartphone, ArrowRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-on-background antialiased">
      {/* Navbar */}
      <nav className="w-full h-16 bg-background flex justify-between items-center px-container-margin max-w-[1200px] mx-auto z-50 sticky top-0 bg-opacity-90 backdrop-blur-sm border-b border-surface-variant md:border-none">
        <Link to="/" className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Wallet className="w-5 h-5 text-on-primary" />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
            PisoPilot
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-gutter">
          <Link to="/login" className="font-body-lg text-body-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer py-2 px-4 rounded-full">
            Log In
          </Link>
          <Link to="/register" className="bg-primary text-on-primary font-body-lg text-body-lg px-6 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors active:scale-95 shadow-sm">
            Start Tracking for Free
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2">
            <Wallet className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-container-margin py-20 md:py-32 max-w-[720px] mx-auto text-center relative w-full">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 z-[-1] overflow-hidden flex justify-center items-center opacity-30 pointer-events-none">
          <div className="w-[600px] h-[600px] bg-primary-container rounded-full blur-3xl opacity-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <h1 className="font-headline-lg text-headline-lg md:text-[64px] md:leading-[72px] text-on-background mb-stack-md tracking-tighter">
          Know where <br />every{' '}
          <span className="text-primary relative inline-block">
            peso
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-container opacity-50 z-[-1]" preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 Q 50 10 100 0" fill="none" stroke="currentColor" strokeWidth="4"></path>
            </svg>
          </span>{' '}
          goes.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-section-gap max-w-md mx-auto md:text-lg">
          The minimalist budget tracker designed specifically for Philippine students. Clarity, simplicity, and control over your finances.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-stack-md w-full sm:w-auto justify-center">
          <Link to="/register" className="w-full sm:w-auto bg-primary text-on-primary font-body-lg text-body-lg font-medium px-8 py-4 rounded-full hover:bg-on-primary-fixed hover:shadow-[0px_4px_20px_rgba(0,109,67,0.15)] transition-all active:scale-95">
            Start Tracking for Free
          </Link>
          <Link to="/login" className="w-full sm:w-auto bg-transparent border border-outline text-on-surface font-body-lg text-body-lg font-medium px-8 py-4 rounded-full hover:bg-surface-variant transition-colors active:scale-95 md:hidden">
            Log In
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-section-gap px-container-margin bg-surface w-full">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-section-gap">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-md">
              Everything you need to manage your allowance
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Built for students who want to take control of their finances without the complexity of traditional budgeting apps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Feature 1 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin flex flex-col gap-stack-md hover:border-primary-fixed-dim transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors mb-stack-sm">
                <Smartphone className="w-6 h-6 text-on-surface-variant group-hover:text-on-primary-container transition-colors" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Simple Tracking</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Log expenses in seconds. No complex menus, just quick inputs to keep you moving between classes.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin flex flex-col gap-stack-md hover:border-primary-fixed-dim transition-colors group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors mb-stack-sm">
                <TrendingUp className="w-6 h-6 text-on-surface-variant group-hover:text-on-primary-container transition-colors" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Budget Alerts</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Set daily or weekly limits. Get gentle nudges before you overspend your weekly allowance.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-container-margin flex flex-col gap-stack-md hover:border-primary-fixed-dim transition-colors group md:col-span-1">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container transition-colors mb-stack-sm">
                <Target className="w-6 h-6 text-on-surface-variant group-hover:text-on-primary-container transition-colors" />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Savings Goals</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Visual progress bars for your next big purchase. Stay motivated with clear targets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-section-gap px-container-margin bg-background w-full">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-section-gap">
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-md">
              Why Filipino students love PisoPilot
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Designed with the Philippine student lifestyle in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 p-container-margin">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Save Time</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Track expenses in under 10 seconds. Perfect for busy students juggling classes, org work, and part-time jobs.
                </p>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex items-start gap-4 p-container-margin">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Your Data, Your Control</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your financial data stays private. Export your data anytime. No hidden fees, no surprises.
                </p>
              </div>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex items-start gap-4 p-container-margin">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <Wallet className="w-6 h-6 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Made for Allowances</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Weekly or monthly allowance tracking. Set budgets that match your student lifestyle.
                </p>
              </div>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex items-start gap-4 p-container-margin">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-6 h-6 text-on-primary-container" />
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Mobile First</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Works perfectly on your phone. Track expenses while commuting, eating out, or shopping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-gap px-container-margin bg-surface w-full">
        <div className="max-w-[720px] mx-auto text-center">
          <div className="bg-primary-container border border-primary-fixed-dim rounded-2xl p-container-margin md:p-12">
            <h2 className="font-headline-lg text-headline-lg text-on-primary-container mb-stack-md">
              Ready to take control of your finances?
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary-container mb-section-gap max-w-md mx-auto">
              Join thousands of Filipino students who are already tracking their expenses with PisoPilot.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-primary text-on-primary font-body-lg text-body-lg font-medium px-8 py-4 rounded-full hover:bg-on-primary-fixed hover:shadow-[0px_4px_20px_rgba(0,109,67,0.15)] transition-all active:scale-95">
              Start Tracking for Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-section-gap text-center text-on-surface-variant font-body-sm text-body-sm border-t border-surface-variant mt-auto px-container-margin">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-on-primary" />
              </div>
              <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
                PisoPilot
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <p>© 2024 PisoPilot. Made with ❤️ for Filipino students.</p>
        </div>
      </footer>
    </div>
  )
}
