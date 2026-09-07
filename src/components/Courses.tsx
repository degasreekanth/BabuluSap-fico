import { CheckCircle2 } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 1',
    color: 'from-navy-600 to-navy-800',
    badgeText: 'text-navy-700 bg-navy-50 border-navy-200',
    title: 'SAP FI & CO Fundamentals',
    topics: [
      'ERP & SAP Overview',
      'Navigation (SAP GUI / Fiori)',
      'Organizational Structure',
      'General Ledger Basics',
      'Accounts Payable / Receivable Basics',
      'Cost Centers & Profit Centers Overview',
      'Simple Postings & Reports',
      'Basic Configuration Steps',
    ],
  },
  {
    phase: 'Phase 2',
    color: 'from-gold-500 to-gold-600',
    badgeText: 'text-gold-700 bg-gold-50 border-gold-200',
    title: 'GL, AP/AR & Asset Accounting',
    topics: [
      'General Ledger Configuration',
      'Accounts Payable & Vendor Master',
      'Accounts Receivable & Customer Master',
      'Tax Configuration',
      'Asset Accounting Basics',
      'Cost Center & Internal Order Config',
      'FI-MM / FI-SD Integration',
      'Month-End & Year-End Closing',
    ],
  },
  {
    phase: 'Phase 3',
    color: 'from-navy-700 to-navy-950',
    badgeText: 'text-navy-700 bg-navy-50 border-navy-200',
    title: 'S/4HANA FICO & COPA',
    topics: [
      'New GL Accounting & Parallel Ledgers',
      'Foreign Currency Valuation',
      'Profitability Analysis (COPA)',
      'Product Costing',
      'Universal Journal (ACDOCA)',
      'SAP Fiori Reporting',
      'End-to-End Project Implementation',
      'Interview Preparation & Resume Review',
    ],
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-sm font-bold text-gold-600 uppercase tracking-widest">
            Our Curriculum
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            SAP FICO Course <span className="text-gold-500">Structure</span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gold-400" />
          <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed">
            One comprehensive SAP FICO course, structured in three progressive phases —
            from fundamentals to advanced S/4HANA, with hands-on labs and real-time
            project scenarios at every stage.
          </p>
        </div>

        <div className="mt-12 md:mt-14 grid md:grid-cols-3 gap-5 md:gap-6 items-start">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="relative rounded-2xl border-2 border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold-300 shadow-md"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${phase.color} px-6 sm:px-8 pt-8 pb-8`}>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${phase.badgeText}`}
                >
                  {phase.phase}
                </span>
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-white leading-snug">
                  {phase.title}
                </h3>
              </div>

              {/* Topics */}
              <div className="bg-white px-6 sm:px-8 py-7">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Topics Covered
                </p>
                <ul className="space-y-3">
                  {phase.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-snug">{topic}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-7 block w-full text-center py-3 rounded-lg text-sm font-bold transition-colors bg-navy-900 hover:bg-navy-800 text-white"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
