import React from 'react';

const WhoWeAre = () => {
  const logos = [
    { name: 'Western Union', src: '/image 6.png' },
    { name: 'Y Combinator', src: '/image 7.png' },
    { name: 'Messari', src: '/image 10.png' },
    { name: 'MIT', src: '/image 11.png' },
    { name: 'Meta', src: '/image 12.png' },
    { name: 'McKinsey', src: '/image 14.png' },
    { name: 'Princeton', src: '/image 13.png' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We come from top companies & universities like MIT, Meta, McKinsey, Princeton, Messari, and Y Combinator.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg w-full h-24"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
