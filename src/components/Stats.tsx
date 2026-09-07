import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Monitor, Briefcase, Star, Award, HeadphonesIcon } from 'lucide-react';

const highlights = [
  { icon: GraduationCap, label: 'Industry Oriented Curriculum' },
  { icon: Monitor, label: 'Hands-on Practical Training' },
  { icon: Briefcase, label: 'Real-Time Project Experience' },
  { icon: Award, label: 'Certification of Course Completion' },
  { icon: HeadphonesIcon, label: 'Post Training Support & Guidance' },
];

const stats = [
  { value: 500, suffix: '+', label: 'Students Trained' },
  { value: 95, suffix: '%', label: 'Placement Rate' },
  { value: 15, suffix: '+', label: 'Expert Trainers' },
  { value: 8, suffix: '+', label: 'Years of Excellence' },
];

function CountUp({ target, start }: { target: number; start: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const duration = 1800;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target]);
  return <>{count}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-navy-900">
      {/* Highlight strip */}
      <div className="bg-navy-950 border-y border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between gap-6">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm text-navy-200">
                <div className="w-9 h-9 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-gold-400" />
                </div>
                <span className="font-medium leading-tight max-w-[120px] md:max-w-none">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div ref={ref} className="py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  <CountUp target={value} start={visible} />
                  <span className="text-gold-400">{suffix}</span>
                </div>
                <div className="mt-2 text-navy-300 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
