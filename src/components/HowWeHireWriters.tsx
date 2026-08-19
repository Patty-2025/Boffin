import React from 'react';

export default function HowWeHireWriters() {
  const steps = [
    {
      percentage: '100%',
      title: 'Registration',
      heightClass: 'h-full rounded-[12px]',
      isWhiteText: true,
    },
    {
      percentage: '64%',
      title: 'Document check',
      heightClass: 'h-[64%] rounded-b-[12px]',
      isWhiteText: true,
    },
    {
      percentage: '32%',
      title: 'Grammar test',
      heightClass: 'h-[32%] rounded-b-[12px]',
      isWhiteText: false,
    },
    {
      percentage: '10%',
      title: 'Test essay',
      heightClass: 'h-[10%] rounded-b-[12px]',
      isWhiteText: false,
    },
    {
      percentage: '7%',
      title: 'Your order',
      heightClass: 'h-[7%] rounded-b-[12px]',
      isWhiteText: false,
    },
  ];

  return (
    <section className="relative border-b border-solid border-[#dde6ef] overflow-hidden bg-white py-12 md:py-16">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#424242] mb-3">
            How we hire our writers
          </h2>
          <p className="text-[#5e5e5e] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            All writers who apply to work with us pass our strict review policy. Detailed document check, grammar test &amp; only after these steps writer gets an opportunity to work with your order. And even after this, our Quality Control constantly check our writers to keep our quality high.
          </p>
        </div>

        {/* Funnel chart steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-7 mt-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group border border-[#dde6ef] flex flex-col justify-center items-center rounded-[12px] h-[220px] sm:h-[250px] relative cursor-pointer transition-all duration-300 hover:bg-[#e0f0f9] hover:border-[#80c0e8] hover:shadow-sm overflow-hidden"
            >
              <h3
                className={`text-2xl sm:text-3xl font-bold mb-1 z-10 transition-colors ${
                  step.isWhiteText ? 'text-white' : 'text-[#0050b5]'
                }`}
              >
                {step.percentage}
              </h3>
              <span
                className={`text-xs sm:text-sm font-medium z-10 text-center px-2 transition-colors ${
                  step.isWhiteText ? 'text-white' : 'text-[#0050b5]'
                }`}
              >
                {step.title}
              </span>
              <div
                className={`absolute w-full transition-colors duration-300 bg-[#0050b5] group-hover:bg-[#006dc6] bottom-0 ${step.heightClass}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
