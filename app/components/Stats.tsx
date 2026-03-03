"use client";

export default function Stats() {
  const stats = [
    { label: "Daily Volume", value: "$4.2B+", accent: "text-brand-light" },
    { label: "Uptime SLA", value: "99.999%", accent: "text-success" },
    { label: "Active Nodes", value: "1,200+", accent: "text-cyan" },
    { label: "Settlement", value: "< 2s", accent: "text-accent" },
  ];

  return (
    <section className="relative py-20 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-text-muted text-xs font-bold uppercase tracking-[0.15em]">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-3">
                <span className={`text-3xl lg:text-4xl font-black ${stat.accent}`}>
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
