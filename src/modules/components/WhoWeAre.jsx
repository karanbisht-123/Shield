import React from 'react';

const WhoWeAre = () => {
  const logos = [
    { name: 'Western Union', src: '/path-to-western-union-logo.png' },
    { name: 'Y Combinator', src: '/path-to-y-combinator-logo.png' },
    { name: 'Messari', src: '/path-to-messari-logo.png' },
    { name: 'MIT', src: '/path-to-mit-logo.png' },
    { name: 'Meta', src: '/path-to-meta-logo.png' },
    { name: 'McKinsey', src: '/path-to-mckinsey-logo.png' },
    { name: 'Princeton', src: '/path-to-princeton-logo.png' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We come from top companies & universities like MIT, Meta, McKinsey, Princeton, Messari and Y Combinator.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
              <img src={logo.src} alt={logo.name} className="max-h-12 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;