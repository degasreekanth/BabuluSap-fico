import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I joined BPMR with zero SAP knowledge. Within 4 months, I had a job offer from Infosys as a junior SAP FICO consultant. The real-time project exposure made all the difference.",
    author: "Priya Sharma",
    role: "SAP FICO Consultant, Infosys",
    initials: "PS",
  },
  {
    quote:
      "The trainers here are actual project consultants — not just teachers. The way they explained complex config scenarios with live examples made it click immediately.",
    author: "Rahul Verma",
    role: "SAP Finance Analyst, Wipro",
    initials: "RV",
  },
  {
    quote:
      "I was a CA looking to transition into SAP. BPMR's structured curriculum and the mock interview sessions helped me land a role at Deloitte within 6 weeks of completing the course.",
    author: "Ananya Reddy",
    role: "SAP FICO Consultant, Deloitte",
    initials: "AR",
  },
  {
    quote:
      "The post-training support is exceptional. Even after placement, I can reach out to my trainer for project guidance. That kind of support is rare in any institute.",
    author: "Karthik Nair",
    role: "SAP S/4HANA Consultant, TCS",
    initials: "KN",
  },
  {
    quote:
      "Weekend batches were a lifesaver since I was working full-time. The recorded sessions meant I never missed a concept. Highly recommend BPMR to any working professional.",
    author: "Meghna Patel",
    role: "Senior SAP Analyst, Capgemini",
    initials: "MP",
  },
  {
    quote:
      "From resume to final interview, the placement team guided me every step. Got placed at HCL as a fresher with a great package. Couldn't have done it without BPMR.",
    author: "Aditya Kumar",
    role: "SAP FICO Associate, HCL",
    initials: "AK",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-bold text-gold-600 uppercase tracking-widest">
            Student Success Stories
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
            Real Students. Real{" "}
            <span className="text-gold-500">SAP Careers.</span>
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-gold-400" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-300 hover:shadow-lg transition-all"
            >
              <Quote className="w-8 h-8 text-gold-200" />
              <div className="flex gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="mt-4 text-slate-700 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center text-gold-400 text-sm font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-navy-900 text-sm">{t.author}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
