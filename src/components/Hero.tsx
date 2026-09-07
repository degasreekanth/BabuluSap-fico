import { ArrowRight, Play, BookOpen, Users, Award, Clock } from 'lucide-react';

const badges = [
  { icon: BookOpen, label: 'SAP FICO Training' },
  { icon: Users, label: 'Expert Trainers' },
  { icon: Award, label: 'Certification' },
  { icon: Clock, label: 'Flexible Batches' },
];

const modules = [
  'Financial Accounting (FI)',
  'Controlling (CO)',
  'SAP S/4HANA Finance',
  'General Ledger',
  'Accounts Payable / Receivable',
  'Asset Accounting',
  'Cost Center & Profit Center',
  'COPA & Product Costing',
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-navy-900 min-h-screen flex items-center"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-hero-pattern opacity-100" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-700/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-400 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Your Trusted Partner for SAP Finance Excellence
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
            <span className="text-gold-400">BPMR</span>{' '}
            <span className="block">SAP FICO</span>
            <span className="block bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              Training & Consulting
            </span>
          </h1>

          <p className="mt-5 text-lg text-navy-200 font-medium tracking-wide">
            Learn Today &nbsp;|&nbsp; Implement Tomorrow &nbsp;|&nbsp; Lead the Future
          </p>

          <p className="mt-4 text-base text-navy-300 leading-relaxed max-w-xl">
            Industry-leading SAP FICO training from beginner to advanced level. Gain
            real-time project experience, expert mentorship, and the career support
            needed to launch your SAP career.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-base transition-all shadow-xl shadow-gold-500/20 hover:-translate-y-0.5"
            >
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              View Courses
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-colors"
              >
                <Icon className="w-6 h-6 text-gold-400" />
                <span className="text-xs text-navy-200 font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — module tags */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="w-full h-[480px] rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 bg-hero-pattern opacity-30" />
              <div className="relative z-10">
                <div className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
                  What You Will Learn
                </div>
                <div className="flex flex-wrap gap-3">
                  {modules.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-navy-700/80 border border-navy-600 text-navy-100 text-sm font-medium hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">
                <div className="bg-navy-700/80 border border-navy-600 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-navy-300 text-sm mt-1">Students Trained</div>
                </div>
                <div className="bg-gold-500/20 border border-gold-400/30 rounded-xl p-4">
                  <div className="text-3xl font-bold text-gold-400">95%</div>
                  <div className="text-navy-300 text-sm mt-1">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
