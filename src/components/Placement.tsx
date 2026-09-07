import { useState } from 'react';
import { Briefcase, FileText, MessageCircle, Users } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Resume Crafting',
    description: 'Our placement team reviews and optimizes your resume specifically for SAP FICO roles.',
  },
  {
    icon: MessageCircle,
    title: 'Mock Interviews',
    description: 'Realistic SAP technical and HR interview simulations with detailed feedback.',
  },
  {
    icon: Briefcase,
    title: 'Job Referrals',
    description: 'Direct connections with our network of SAP hiring partners and system integrators.',
  },
  {
    icon: Users,
    title: 'LinkedIn Optimization',
    description: 'Professional profile setup to attract SAP recruiters and headhunters.',
  },
];

const companies = [
  { name: 'Infosys', slug: 'infosys' },
  { name: 'Wipro', slug: 'wipro' },
  { name: 'TCS', slug: 'tcs' },
  { name: 'Accenture', slug: 'accenture' },
  { name: 'HCLTech', slug: 'hcl' },
  { name: 'Capgemini', slug: null },
  { name: 'Deloitte', slug: null },
  { name: 'IBM', slug: null },
  { name: 'Tech Mahindra', slug: null },
  { name: 'Cognizant', slug: null },
  { name: 'EY', slug: null },
];

function LogoCard({ name, slug }: { name: string; slug: string | null }) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(slug) && !failed;

  return (
    <div className="flex-shrink-0 mx-2 sm:mx-3 md:mx-4">
      <div className="flex flex-col items-center justify-center gap-3 w-32 sm:w-40 md:w-44 h-28 md:h-32 bg-white rounded-2xl border border-white/10 shadow-lg hover:shadow-xl hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1 px-4">
        {showImg ? (
          <img
            src={`/logos/${slug}.svg`}
            alt={`${name} logo`}
            loading="lazy"
            width={44}
            height={44}
            onError={() => setFailed(true)}
            className="h-8 md:h-10 w-auto object-contain"
          />
        ) : (

          <span className="flex items-center justify-center h-8 md:h-10 w-10 md:w-12 rounded-lg bg-navy-900 text-gold-400 font-black text-sm md:text-base">
            {name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <span className="text-navy-900 font-bold text-xs sm:text-sm md:text-base tracking-tight text-center">
          {name}
        </span>
      </div>
    </div>
  );
}


export default function Placement() {
  const doubled = [...companies, ...companies];

  return (
    <section id="placement" className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <span className="text-sm font-bold text-gold-600 uppercase tracking-widest">
            Career Placement
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            We Don't Stop at Training —{' '}
            <span className="text-gold-500">We Get You Placed</span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gold-400" />
          <p className="mt-5 text-base text-slate-500 leading-relaxed">
            Our 360-degree placement support has helped 500+ students land SAP FICO roles
            at leading IT companies and enterprises across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12 md:mb-14">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200 hover:border-gold-300 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-50 group-hover:bg-navy-900 flex items-center justify-center transition-colors duration-300">
                <Icon className="w-6 h-6 text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
              </div>
              <h3 className="mt-5 font-bold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Hiring Partners — animated marquee */}
        <div className="bg-navy-900 rounded-3xl py-8 md:py-10 overflow-hidden relative">
          {/* gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-navy-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-navy-900 to-transparent z-10 pointer-events-none" />

          <p className="text-center text-xs font-bold text-navy-400 uppercase tracking-widest mb-6 md:mb-8 px-4">
            Our Students Work At
          </p>

          {/* Continuous moving logo marquee (mobile + desktop) */}
          <div className="marquee-pause">
            <div className="flex animate-marquee-slow md:animate-marquee w-max">
              {doubled.map((c, i) => (
                <LogoCard key={`${c.name}-${i}`} name={c.name} slug={c.slug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
