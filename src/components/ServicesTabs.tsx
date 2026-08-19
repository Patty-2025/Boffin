import React, { useState } from 'react';

export const ServicesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paper_type' | 'disciplines'>('paper_type');

  const paperTypes = [
    'SPSS data analysis',
    'MATLAB project',
    'Python programming',
    'Java assignment',
    'C++ programming',
    'Jupyter notebook',
    'SQL database project',
    'R statistical analysis',
    'Stata econometric analysis',
    'SAS programming',
    'Data science analysis',
    'Machine learning model',
    'TensorFlow / PyTorch',
    'Docker / containerization',
    'Git / version control',
    'AWS / Azure / cloud',
    'Web development (React, Vue, Angular)',
    'JavaScript / Node.js',
    'Database design',
    'System architecture',
    'API development',
    'Linux / shell scripting',
    'AutoCAD design',
    'GIS / geospatial analysis',
    'Bioinformatics project',
    'Chemistry / molecular modeling',
    'Nursing care plan',
    'Business plan',
    'Research paper',
    'Lab report',
    'Case study',
    'Technical report',
    'Capstone project',
    'Thesis / dissertation',
    'Proofreading / editing',
    'Other'
  ];

  const disciplines = [
    'Computer science',
    'Data science',
    'Machine learning & AI',
    'Web development',
    'Software engineering',
    'Database & SQL',
    'Cloud computing',
    'Cybersecurity',
    'Mobile development',
    'Game development',
    'Python programming',
    'Java programming',
    'JavaScript / Node.js',
    'C++ programming',
    'R programming',
    'Statistics & probability',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology & bioinformatics',
    'Engineering (all types)',
    'Mechanical engineering',
    'Electrical engineering',
    'Civil engineering',
    'Chemical engineering',
    'Aerospace engineering',
    'Business & management',
    'Finance & accounting',
    'Economics',
    'Marketing',
    'Nursing & healthcare',
    'Psychology',
    'Sociology',
    'Education',
    'Law',
    'English & literature',
    'History',
    'Art & design',
    'Geography & GIS',
    'Environmental science',
    'Economics',
    'Project management',
    'MBA coursework'
  ];

  return (
    <section 
      id="services" 
      className="pb-8 pt-4 font-['Open_Sans',sans-serif] text-[#424242]"
      style={{ fontFamily: '"Open Sans", sans-serif' }}
    >
      <div className="max-w-[1000px] mx-auto px-6 animate-appear-0">
        <h2 
          className="text-center font-bold text-[28px] leading-[34px] text-[#424242] mb-[24px] font-['Lato',sans-serif]"
          style={{
            margin: '0 0 24px 0',
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '34px',
            marginBottom: '24px',
            fontFamily: 'Lato, sans-serif',
            textAlign: 'center',
            color: '#424242'
          }}
        >
          Expert assistance for every assignment type and discipline
        </h2>
        <p className="regular text-center text-[#5e5e5e] pb-8 text-[18px] leading-[29px] font-['Open_Sans',sans-serif]">
          Our specialists provide support for technical projects, research tasks, and academic work at all levels.
        </p>

        <div className="flex flex-col lg:flex-row items-start gap-6 mt-2">
          {/* Tab buttons sidebar */}
          <div 
            role="tablist" 
            className="bg-white border border-solid border-[#dde6ef] flex flex-col justify-center sm:flex-row lg:flex-col gap-4 rounded-[12px] w-full lg:w-[240px] shrink-0 p-4 shadow-sm"
          >
            <button
              id="paper_type-tab"
              role="tab"
              aria-selected={activeTab === 'paper_type'}
              onClick={() => setActiveTab('paper_type')}
              className={`tab-button js--tab-button flex items-center gap-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                activeTab === 'paper_type' ? 'js--tab-active text-[#006DC6] font-bold' : 'text-[#424242] font-semibold hover:text-[#006DC6]'
              }`}
              data-tab="paper_type"
              aria-label="Assignment type"
              aria-controls="paper_type-panel"
            >
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect width="48" height="48" rx="24" fill={activeTab === 'paper_type' ? "#006DC6" : "#F1F5F9"} className="transition-colors"></rect>
                <path 
                  d="M14.6667 33.3333H26.6667V26.6667H33.3333V14.6667H14.6667V33.3333ZM14.6667 36C13.9333 36 13.3056 35.7389 12.7833 35.2167C12.2611 34.6944 12 34.0667 12 33.3333V14.6667C12 13.9333 12.2611 13.3056 12.7833 12.7833C13.3056 12.2611 13.9333 12 14.6667 12H33.3333C34.0667 12 34.6944 12.2611 35.2167 12.7833C35.7389 13.3056 36 13.9333 36 14.6667V28L28 36H14.6667ZM17.3333 26.6667V24H24V26.6667H17.3333ZM17.3333 21.3333V18.6667H30.6667V21.3333H17.3333Z" 
                  fill={activeTab === 'paper_type' ? "#FFFFFF" : "#006DC6"}
                  className="transition-colors"
                ></path>
              </svg>
              <span className="text-[15px] leading-[20px]">Assignment type</span>
            </button>

            <button
              id="discipline-tab"
              role="tab"
              aria-selected={activeTab === 'disciplines'}
              onClick={() => setActiveTab('disciplines')}
              className={`tab-button js--tab-button flex items-center gap-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                activeTab === 'disciplines' ? 'js--tab-active text-[#006DC6] font-bold' : 'text-[#424242] font-semibold hover:text-[#006DC6]'
              }`}
              data-tab="disciplines"
              aria-label="Academic fields"
              aria-controls="discipline-panel"
            >
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <rect width="48" height="48" rx="24" fill={activeTab === 'disciplines' ? "#006DC6" : "#F1F5F9"} className="transition-colors"></rect>
                <path 
                  d="M18.6667 34.6668C17.9333 34.6668 17.3056 34.4057 16.7833 33.8835C16.2611 33.3613 16 32.7335 16 32.0002V28.0002H20V25.0002C19.2222 24.9557 18.4833 24.7835 17.7833 24.4835C17.0833 24.1835 16.4444 23.7335 15.8667 23.1335V21.6668H14.3333L10 17.3335C10.8 16.3113 11.7889 15.5891 12.9667 15.1668C14.1444 14.7446 15.3333 14.5335 16.5333 14.5335C17.1333 14.5335 17.7167 14.5779 18.2833 14.6668C18.85 14.7557 19.4222 14.9224 20 15.1668V13.3335H36V30.6668C36 31.7779 35.6111 32.7224 34.8333 33.5002C34.0556 34.2779 33.1111 34.6668 32 34.6668H18.6667ZM22.6667 28.0002H30.6667V30.6668C30.6667 31.0446 30.7944 31.3613 31.05 31.6168C31.3056 31.8724 31.6222 32.0002 32 32.0002C32.3778 32.0002 32.6944 31.8724 32.95 31.6168C33.2056 31.3613 33.3333 31.0446 33.3333 30.6668V16.0002H22.6667V16.8002L30.6667 24.8002V26.6668H28.8L25 22.8668L24.7333 23.1335C24.4222 23.4446 24.0944 23.7224 23.75 23.9668C23.4056 24.2113 23.0444 24.4002 22.6667 24.5335V28.0002ZM15.4667 19.0002H18.5333V21.8668C18.8 22.0446 19.0778 22.1668 19.3667 22.2335C19.6556 22.3002 19.9556 22.3335 20.2667 22.3335C20.7778 22.3335 21.2389 22.2557 21.65 22.1002C22.0611 21.9446 22.4667 21.6668 22.8667 21.2668L23.1333 21.0002L21.2667 19.1335C20.6222 18.4891 19.9 18.0057 19.1 17.6835C18.3 17.3613 17.4444 17.2002 16.5333 17.2002C16.0889 17.2002 15.6667 17.2335 15.2667 17.3002C14.8667 17.3668 14.4667 17.4668 14.0667 17.6002L15.4667 19.0002ZM28 30.6668H18.6667V32.0002H28.2C28.1333 31.8002 28.0833 31.5891 28.05 31.3668C28.0167 31.1446 28 30.9113 28 30.6668Z" 
                  fill={activeTab === 'disciplines' ? "#FFFFFF" : "#006DC6"}
                  className="transition-colors"
                ></path>
              </svg>
              <span className="text-[15px] leading-[20px]">Academic fields</span>
            </button>
          </div>

          {/* Panel content */}
          <div className="grow w-full">
            {activeTab === 'paper_type' && (
              <div id="paper_type-panel" className="js--tab-content paper_type js--tab-active" role="tabpanel" aria-labelledby="paper_type-tab">
                <ul className="bg-[#0050b5] min-h-[300px] py-6 text-white bg-no-repeat bg-center md:bg-top bg-cover gap-[16px_24px] pr-8 md:py-8 px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-[14px] leading-[21px] rounded-[12px] shadow-md w-full">
                  {paperTypes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#80c0e8] shrink-0"></span>
                      <span className="text-white hover:text-[#b3d9f1] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'disciplines' && (
              <div id="discipline-panel" className="js--tab-content disciplines" role="tabpanel" aria-labelledby="discipline-tab">
                <ul className="bg-[#0050b5] min-h-[300px] py-6 text-white bg-no-repeat bg-center md:bg-top bg-cover gap-[16px_24px] pr-8 md:py-8 px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-[14px] leading-[21px] rounded-[12px] shadow-md w-full">
                  {disciplines.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#80c0e8] shrink-0"></span>
                      <span className="text-white hover:text-[#b3d9f1] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
