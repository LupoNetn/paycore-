"use client";

export default function Stats() {
  const stats = [
    { label: "Daily Volume", value: "$4.2B+" },
    { label: "Uptime SLA", value: "99.999%" },
    { label: "Active Nodes", value: "1,200+" },
    { label: "Settlement", value: "< 2s" },
  ];

  return (
    <section className="py-20 border-y border-white/[0.05] bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col gap-2 border-l border-white/[0.1] pl-6"
            >
              <span className="text-3xl lg:text-4xl font-medium tracking-tight text-white">
                {stat.value}
              </span>
              <span className="text-text-secondary text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
