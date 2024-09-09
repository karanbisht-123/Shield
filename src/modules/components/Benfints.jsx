import React from 'react';

const BenefitCard = ({ imageUrl, title, description, extraClass = '' }) => {
  return (
    <div className={`rounded-lg p-4 flex flex-col items-center text-center lg:${extraClass}`}>
      <div className="mb-4">
        <img src={imageUrl} alt={title} className="w-auto h-60 object-contain" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const benefitsData = [
  {
    imageUrl: "/Fast loading-rafiki 2.png",
    title: "Easy, Fast & Trusted",
    description: "Our advanced system processes your earnings swiftly and securely, ensuring that your money is transferred to your account within hours, not days."
  },
  {
    imageUrl: "/Mobile payments-rafiki 2.png",
    title: "Competitive Fees",
    description: "Our competitive fees are designed to give you the best of both worlds - top-tier quality and affordability.",
    extraClass: 'mt-32' // Add extra margin-top to the second card
  },
  {
    imageUrl: "/Wallet-amico 2.png",
    title: "Fully Compliant",
    description: "Our team of compliance experts works tirelessly to keep our systems up-to-date with the latest regulatory changes, providing you with a robust framework that adapts to the evolving compliance landscape."
  }
];

const Benefits = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto ">
       {/* <h1 className='text-center text-3xl font-semibold'>Same-day payouts, cheaper than Coinbase.</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefitsData.map((benefit, index) => (
            <BenefitCard
              key={index}
              imageUrl={benefit.imageUrl}
              title={benefit.title}
              description={benefit.description}
              extraClass={benefit.extraClass} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
