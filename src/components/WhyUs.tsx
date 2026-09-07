import {
  BookOpen,
  Monitor,
  Briefcase,
  Users,
  MessageSquare,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'SAP FICO Training',
    subtitle: 'Beginner to Advanced Level Training',
    description:
      'Comprehensive curriculum designed by SAP-certified professionals covering FI, CO, and S/4HANA Finance.',
  },
  {
    icon: Monitor,
    title: 'SAP S/4HANA Finance',
    subtitle: 'Stay Ahead with Next Generation SAP',
    description:
      'Master the universal journal, embedded analytics, and Fiori-based reporting in the latest SAP platform.',
  },
  {
    icon: Briefcase,
    title: 'Real-Time Scenarios',
    subtitle: 'Learn with Real-Time Project Examples',
    description:
      'Every concept is reinforced through case studies from live SAP projects across manufacturing, retail, and services.',
  },
  {
    icon: Users,
    title: 'Expert Trainers',
    subtitle: 'Industry Experts with Years of Experience',
    description:
      'Our trainers hold active SAP certifications and have delivered implementations at Fortune 500 companies.',
  },
  {
    icon: MessageSquare,
    title: 'Career Support',
    subtitle: 'Interview Prep, Resume & Career Guidance',
    description:
      'Mock interviews, resume crafting, LinkedIn optimization, and job referral assistance until you are placed.',
  },
  {
    icon: Globe,
    title: 'For Everyone',
    subtitle: 'Freshers, Professionals, Career Switchers',
    description:
      'No prior SAP experience needed. Our courses are designed to welcome learners from all backgrounds.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-gold-600 uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            Everything You Need to{' '}
            <span className="text-gold-500">Succeed in SAP</span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gold-400" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, subtitle, description }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy-900 group-hover:bg-gold-500 flex items-center justify-center transition-colors duration-300 shadow-lg">
                <Icon className="w-7 h-7 text-gold-400 group-hover:text-navy-900 transition-colors duration-300" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-navy-900">{title}</h3>
              <p className="mt-1 text-xs font-semibold text-gold-600 uppercase tracking-wider">
                {subtitle}
              </p>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
