import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const WhyShieldCard = ({ imageUrl, title, description, isLast }) => {
  return (
    <div className="flex flex-col items-center text-center relative max-w-[400px]">
      <div className="mb-6">
        <img src={imageUrl} alt={title} className="w-auto h-48 object-contain" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
      <p className="text-white">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
          {/* < div className="text-white w-32 h-1 bg-gray-200 ml-48" ></div> */}
        </div>
      )}
    </div>
  );
};

const WhyData = [
  {
    imageUrl: "/Vector.png",
    title: "Easy, Fast & Trusted",
    description: "Our advanced system processes your earnings swiftly and securely, ensuring that your money is transferred to your account within hours, not days."
  },
  {
    imageUrl: "/Shield landscape logo 2 whitetext 2.png",
    title: "Competitive Fees",
    description: "Our competitive fees are designed to give you the best of both worlds - top-tier quality and affordability."
  },
  {
    imageUrl: "/Illustration.png",
    title: "Fully Compliant",
    description: "Our team of compliance experts works tirelessly to keep our systems up-to-date with the latest regulatory changes, providing you with a robust framework that adapts to the evolving compliance landscape."
  }
];

const WhyShield = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-bold mb-12">Why Choose Shield?</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-8">
          {WhyData.map((item, index) => (
            <WhyShieldCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              description={item.description}
              isLast={index === WhyData.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyShield;