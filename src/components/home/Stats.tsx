export function Stats() {
  const stats = [
    { value: '15K+', label: 'Properties Listed', description: 'Across the nation' },
    { value: '25K+', label: 'Happy Clients', description: 'And counting' },
    { value: '$4.2B', label: 'Property Value', description: 'Transacted annually' },
    { value: '500+', label: 'Expert Agents', description: 'Ready to help' },
  ];

  return (
    <section className="py-16 bg-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-blue-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
