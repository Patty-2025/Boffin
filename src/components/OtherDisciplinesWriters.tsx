import React from 'react';
import { Link } from 'react-router-dom';

interface DisciplineLink {
  title: string;
  href: string;
}

const otherDisciplines: DisciplineLink[] = [
  { title: 'Computer Science', href: '/our-writers/computer-science' },
  { title: 'Data Science', href: '/our-writers/data-science' },
  { title: 'Machine Learning & AI', href: '/our-writers/machine-learning-ai' },
  { title: 'Software Engineering', href: '/our-writers/software-engineering' },
  { title: 'Web Development', href: '/our-writers/web-development' },
  { title: 'Python Programming', href: '/our-writers/python-programming' },
  { title: 'Java Programming', href: '/our-writers/java-programming' },
  { title: 'JavaScript & Node.js', href: '/our-writers/javascript-nodejs' },
  { title: 'Database & SQL', href: '/our-writers/database-sql' },
  { title: 'Cloud Computing', href: '/our-writers/cloud-computing' },
  { title: 'Cybersecurity', href: '/our-writers/cybersecurity' },
  { title: 'Engineering (All Types)', href: '/our-writers/engineering' },
  { title: 'Mechanical Engineering', href: '/our-writers/mechanical-engineering' },
  { title: 'Electrical Engineering', href: '/our-writers/electrical-engineering' },
  { title: 'Civil Engineering', href: '/our-writers/civil-engineering' },
  { title: 'Mathematics & Statistics', href: '/our-writers/mathematics-statistics' },
  { title: 'Physics', href: '/our-writers/physics' },
  { title: 'Chemistry', href: '/our-writers/chemistry' },
  { title: 'Biology & Bioinformatics', href: '/our-writers/biology-bioinformatics' },
  { title: 'Business & Management', href: '/our-writers/business-and-management' },
  { title: 'Finance & Accounting', href: '/our-writers/finance-accounting' },
  { title: 'Economics', href: '/our-writers/economics' },
  { title: 'Marketing', href: '/our-writers/marketing' },
  { title: 'Nursing & Healthcare', href: '/our-writers/nursing-healthcare' },
  { title: 'Psychology', href: '/our-writers/psychology' },
  { title: 'Sociology', href: '/our-writers/sociology' },
  { title: 'Education', href: '/our-writers/education' },
  { title: 'Law', href: '/our-writers/law' },
  { title: 'English & Literature', href: '/our-writers/english-and-literature' },
  { title: 'History', href: '/our-writers/history' },
  { title: 'Art & Design', href: '/our-writers/art-design' },
  { title: 'Geography & GIS', href: '/our-writers/geography-gis' },
  { title: 'Environmental Science', href: '/our-writers/environmental-science' },
  { title: 'Project Management', href: '/our-writers/project-management' },
  { title: 'MBA Coursework', href: '/our-writers/mba-coursework' },
];

export default function OtherDisciplinesWriters() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#424242] text-center mb-8 md:mb-12">
          Our Writers in Other Disciplines
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          {otherDisciplines.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="group inline-flex items-center text-[16px] sm:text-[18px] text-[#0080d1] hover:text-[#0050b5] font-medium transition-colors duration-200 py-1"
            >
              <span className="hover:underline">{item.title}</span>
              <svg
                className="w-4 h-4 ml-2 text-[#8cabca] group-hover:text-[#0080d1] group-hover:translate-x-1 transition-all shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3.5L10.5 8L6 12.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
