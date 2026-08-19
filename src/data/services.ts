import { 
  GraduationCap, 
  BookOpen, 
  PenTool, 
  CheckCircle2, 
  FileText, 
  Library, 
  FileSearch,
  Briefcase,
  Landmark,
  FileBadge,
  Trophy,
  Globe,
  Settings,
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

export interface ServiceContentSection {
  heading: string;
  paragraph: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  icon: any;
  title: string;
  desc: string;
  longDesc: string;
  image: string;
  benefits: string[];
  seoKeywords: string[];
  detailedSections: ServiceContentSection[];
  extraImages: string[];
  faqs: ServiceFAQ[];
}

export interface ServiceCategory {
  id: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'Academic Writing',
    services: [
      { 
        id: 'essay-writing', 
        icon: PenTool, 
        title: 'Custom Essay Writing', 
        desc: 'Professional essay writers delivering plagiarism-free, well-researched essays for high school and university students.',
        longDesc: 'Our custom essay writing service connects you with PhD and Master\'s level experts who craft entirely original essays from scratch. Whether argumentative, descriptive, or analytical, we follow your prompt and university rubric meticulously.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=1200&q=80',
        benefits: ['100% Original, plagiarism-free', 'Strict adherence to guidelines', 'Direct communication with writer', 'Free revisions included'],
        seoKeywords: ['custom essay writing', 'professional essay writers', 'buy essays online', 'university essay help'],
        detailedSections: [
          {
            heading: 'Tailored to Your Prompt',
            paragraph: 'Our writers do not use pre-written templates. Every essay is researched and written from a blank page specifically answering your unique assignment prompt, guaranteeing high relevancy and grading success.'
          },
          {
            heading: 'Rigorous Quality Checks',
            paragraph: 'Before delivery, every essay passes through an editorial team checking for grammar, flow, citation accuracy, and finally through Turnitin to ensure 0% plagiarism.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Can I choose my writer?", answer: "Yes, you can browse expert profiles and select a writer based on their reviews and subject expertise." },
          { question: "Are revisions free?", answer: "We offer unlimited free revisions for 14 days if the paper does not entirely match your initial instructions." }
        ]
      },
      { 
        id: 'dissertation-help', 
        icon: GraduationCap, 
        title: 'Dissertation & Thesis Help', 
        desc: 'Comprehensive dissertation writing services. Get help with proposals, literature reviews, methodology, and data analysis.',
        longDesc: 'Writing a dissertation is the most challenging academic task you will face. Our specialized PhD researchers provide step-by-step guidance, writing chapters, restructuring arguments, and refining your final thesis document.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Assistance with all chapters', 'Methodology and SPSS analysis', 'Rigorous academic tone', 'Direct PhD-level support'],
        seoKeywords: ['dissertation writing services', 'thesis help online', 'literature review writing', 'PhD methodology help'],
        detailedSections: [
          {
            heading: 'Chapter-by-Chapter Support',
            paragraph: 'We offer flexible support. Whether you need full dissertation assistance from the proposal stage, or just need an expert to rescue your Literature Review and Methodology sections, we adapt to your specific timeline and needs.'
          },
          {
            heading: 'Advanced Data Analysis',
            paragraph: 'Our statisticians are proficient in SPSS, R, Python, and NVivo, ready to help you analyze your qualitative or quantitative primary data flawlessly for your Results chapter.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Can I pay chapter by chapter?", answer: "Yes, we offer milestone payments so you can review and approve each chapter with your supervisor before proceeding." },
          { question: "Will my data be kept confidential?", answer: "Strictly. All primary data provided to our statisticians is destroyed upon final delivery per our NDA policy." }
        ]
      },
      { 
        id: 'coursework-homework', 
        icon: BookOpen, 
        title: 'Coursework & Homework Help', 
        desc: 'Get daily homework help and coursework completion for STEM, Humanities, and Business subjects from top tutors.',
        longDesc: 'Falling behind on daily assignments? Our experts handle regular coursework, lab reports, case studies, and reading summaries to keep your GPA high while you focus on major exams.',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Handles all daily assignments', 'Subject-specific experts', 'Fast 6-hour turnarounds available', 'Calculations and programming included'],
        seoKeywords: ['coursework help online', 'do my homework', 'technical assignment help', 'STEM homework assistance'],
        detailedSections: [
          {
            heading: 'STEM and Coding Assistance',
            paragraph: 'Beyond just essays, we have technical experts who can solve complex Calculus problem sets, balance Chemistry equations, and write commented code for Computer Science assignments.'
          },
          {
            heading: 'Guaranteed Deadlines',
            paragraph: 'We understand that coursework often has tight, midnight deadlines. Our global team operates 24/7, allowing us to accurately complete panic-inducing assignments overnight.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Can you help with online quizzes?", answer: "We provide comprehensive study guides and tutoring to help you prepare effectively for online quizzes." },
          { question: "Do you cover all subjects?", answer: "We cover over 100+ disciplines across high school, undergraduate, and master's levels." }
        ]
      },
      {
        id: 'ib-extended-essay',
        icon: Library,
        title: 'IB Extended Essay Help',
        desc: 'Specialized assistance for International Baccalaureate (IB) scholars. Meet all EE criteria and score an A.',
        longDesc: 'The International Baccalaureate Extended Essay requires strict adherence to IB guidelines, extensive source citation, and a structured academic format. Our IB-accredited writers help you choose topics, structure your 4,000-word research, and write high-scoring EE drafts.',
        image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Familiarity with the IB EE rubric', 'Assistance in topic formulation', 'Deep critical analysis', 'Zero AI-generated content'],
        seoKeywords: ['IB Extended Essay help', 'IB EE writing', 'International Baccalaureate EE tutor', 'high-scoring EE ideas'],
        detailedSections: [
          {
            heading: 'Mastery of the IB Assessment Criteria',
            paragraph: 'Our IB specialists ensure your essay satisfies all key assessment criteria: Focus and Method, Knowledge and Understanding, Critical Thinking, Presentation, and Engagement (including the RPPF).'
          },
          {
            heading: 'Covering All Group Subjects',
            paragraph: 'We have specialists across all IB subject groups, including Group 1 (Language & Literature), Group 3 (Individuals & Societies), and Group 4 (Sciences), ensuring your methodology is scientifically or historically sound.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you write the RPPF reflection?", answer: "We provide guiding questions and outline drafts for your three mandatory reflection sessions to show authentic engagement." },
          { question: "Is the 4,000-word limit strictly followed?", answer: "Yes, we structure the paper to stay perfectly within the 4,000-word ceiling without sacrificing research depth." }
        ]
      },
      {
        id: 'admission-essay',
        icon: Trophy,
        title: 'Admission Essay Writing',
        desc: 'Formulate compelling college application essays that highlight your unique background and secure admission.',
        longDesc: 'Standing out in competitive university admissions requires an authentic narrative. Our Ivy League and Oxbridge alumni editors work one-on-one with you to refine your admission essays, personal statements, and supplemental prompts.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Ivy League and Oxbridge editors', 'Emphasis on your authentic voice', 'Polished storytelling formatting', 'Grammar & flow optimization'],
        seoKeywords: ['college admission essays', 'application essay writing', 'ivy league personal statement', 'university admission support'],
        detailedSections: [
          {
            heading: 'Show, Don\'t Tell Storytelling',
            paragraph: 'We help you avoid cliché admissions tropes by structuring your essays around active storytelling, highlighting your leadership, resilience, and curiosity in a compelling way.'
          },
          {
            heading: 'Supplemental Prompts Customization',
            paragraph: 'From "Why This College?" essays to complex situational prompts, we help you adapt your core profile to match the values and specific opportunities of each target institution.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Will my essay sound written by an adult?", answer: "No, we focus on preserving and elevating your authentic teenage or young adult voice, ensuring admissions officers hear *you*." },
          { question: "How many revisions are included?", answer: "We provide up to three detailed feedback rounds to polish your personal narrative to perfection." }
        ]
      },
      {
        id: 'personal-statement-help',
        icon: FileBadge,
        title: 'Personal Statement Help',
        desc: 'Expert personal statements tailored for UCAS, Common App, law school, or medical residency applications.',
        longDesc: 'A personal statement is your primary tool to connect your academic records with your future professional aspirations. We help you synthesize your work experiences, research history, and personal values into a coherent, high-impact personal statement.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Tailored to UCAS & Common App', 'Focus on academic achievements', 'Cohesive career vision', 'Strict privacy protection'],
        seoKeywords: ['personal statement writing', 'UCAS personal statement helper', 'medical residency personal statement', 'law school personal statement'],
        detailedSections: [
          {
            heading: 'UCAS 4000-Character Optimization',
            paragraph: 'For UK applicants, UCAS enforces a strict 4,000-character and 47-line limit. We optimize every single word to ensure maximum impact and complete academic context fits into the space.'
          },
          {
            heading: 'Highlighting Research & Clinical Experience',
            paragraph: 'For postgraduate, medical, or legal applications, we highlight your specific methodologies, clinical rotations, case contributions, and publications to prove your readiness.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "What is the turnaround time?", answer: "Standard turnaround is 3-5 days, but we offer a 24-hour express service for urgent deadlines." },
          { question: "Can you edit an existing draft?", answer: "Yes, we offer both comprehensive writing-from-scratch guidance and structural editing of your existing draft." }
        ]
      },
      {
        id: 'sop-writing',
        icon: Award,
        title: 'SOP Writing Service',
        desc: 'Professional Statement of Purpose (SOP) writing for graduate and doctoral programs worldwide.',
        longDesc: 'Your Statement of Purpose must clearly state your research goals, explain why you chose your target university, and demonstrate your academic fit. Our PhD editors help you write SOPs that align with specific faculty research and lab projects.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        benefits: ['PhD-level academic alignment', 'Customized to specific faculty labs', 'Demonstrated research aptitude', 'Polished formal vocabulary'],
        seoKeywords: ['Statement of Purpose writing', 'SOP for MS in USA', 'doctoral SOP help', 'graduate school personal essay'],
        detailedSections: [
          {
            heading: 'Aligning with University Faculty',
            paragraph: 'A winning graduate SOP must show a deep understanding of the program. We help you weave in references to active research projects, lab resources, and academic papers published by faculty members at your target school.'
          },
          {
            heading: 'Articulating Research Objectives',
            paragraph: 'We ensure your academic interests are described using precise terminology, showing a mature grasp of your field and a clear pathway toward your master\'s or doctoral dissertation.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you write different SOPs for different universities?", answer: "Yes, we customize each SOP to reference the unique faculty, curriculum, and culture of each specific university." },
          { question: "Do you check for plagiarism?", answer: "Every SOP is verified with Turnitin to ensure absolute authenticity and 100% original content." }
        ]
      }
    ]
  },
  {
    id: 'Professional & Business',
    services: [
      {
        id: 'dba-writing',
        icon: Briefcase,
        title: 'DBA Writing Help',
        desc: 'Advanced research guidance for Doctor of Business Administration (DBA) candidates. Case studies, literature synthesis, and methodology.',
        longDesc: 'Doctor of Business Administration (DBA) papers demand a perfect marriage of executive-level practical application and academic rigor. Our business scholars support you in writing advanced literature syntheses, methodology frameworks, and qualitative business case studies.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Executive-level business terminology', 'Qualitative & Quantitative analysis', 'Harvard business style case studies', 'Absolute corporate confidentiality'],
        seoKeywords: ['DBA thesis help', 'Doctor of Business Administration support', 'advanced business research', 'executive dissertation assistance'],
        detailedSections: [
          {
            heading: 'Bridging Corporate Practice and Academic Research',
            paragraph: 'DBA theses differ from traditional PhDs by focusing on solving real-world corporate challenges. We help you frame practical organizational problems through established theoretical lenses, ensuring academic validation.'
          },
          {
            heading: 'Rigorous Corporate Governance & Strategic Frameworks',
            paragraph: 'We support research incorporating Porter\'s Five Forces, Resource-Based View (RBV), Blue Ocean Strategy, and complex McKinsey framework models with flawless analytical narrative.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you sign non-disclosure agreements?", answer: "Absolutely. We protect your corporate records and proprietary company data with complete confidentiality and NDAs." },
          { question: "Can you assist with mixed-methods research?", answer: "Yes, our team has experts in mixed-methods frameworks, combining qualitative interviews with regression analysis." }
        ]
      },
      {
        id: 'accounting-assignment',
        icon: Landmark,
        title: 'Accounting & Finance Assignment Help',
        desc: 'Balance sheets, financial modeling, tax calculations, audit reports, and managerial accounting solutions.',
        longDesc: 'Accounting assignments require mathematical precision and compliance with accounting standards (IFRS, GAAP). Our CPA and CFA experts assist you with complex ledger accounts, cash flow statements, financial ratios, and advanced corporate valuation.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        benefits: ['IFRS & GAAP compliance', 'Flawless Excel financial models', 'Detailed calculations and ledger sheets', 'CPA-certified reviewers'],
        seoKeywords: ['accounting assignment help', 'finance homework solutions', 'IFRS financial statement tutor', 'managerial accounting balance sheet'],
        detailedSections: [
          {
            heading: 'Accurate Financial Ledger & Balance Sheets',
            paragraph: 'We write fully balanced ledger entries, cash flow statements, and income statements matching your academic prompts, leaving zero room for mathematical errors.'
          },
          {
            heading: 'Advanced Financial Modeling & DCF Valuation',
            paragraph: 'For finance assignments, we generate complete Discounted Cash Flow (DCF) models, WACC calculations, capital budgeting tables, and stock valuation spreadsheets.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you deliver the Excel source files?", answer: "Yes, all spreadsheet computations, balance sheets, and formulas are delivered as fully editable Excel files (.xlsx)." },
          { question: "Do you explain the formulas used?", answer: "Every solution includes step-by-step commentary explaining the calculations, ratios, and standards applied." }
        ]
      },
      {
        id: 'cipd-assignment',
        icon: FileBadge,
        title: 'CIPD Assignment Help',
        desc: 'High-quality HR and L&D reports for CIPD Level 3, 5, and 7 certifications. 100% pass guarantee.',
        longDesc: 'Chartered Institute of Personnel and Development (CIPD) diplomas require extensive knowledge of HR management, labor laws, and strategic L&D. We provide specialized CIPD models, literature reviews, and case answers for Foundation, Associate, and Advanced levels.',
        image: 'https://images.unsplash.com/photo-1521791136368-1a46827d3ad4?auto=format&fit=crop&w=1200&q=80',
        benefits: ['CIPD Level 3, 5, & 7 coverage', 'UK labor law alignment', 'HR practices case analysis', 'HRM professional terminology'],
        seoKeywords: ['CIPD assignment help', 'CIPD Level 5 associate diploma', 'CIPD Level 7 advanced HRM', 'CIPD Level 3 foundation helper'],
        detailedSections: [
          {
            heading: 'Strategic HR & People Management Alignment',
            paragraph: 'Our CIPD assignments incorporate modern HR concepts such as Ulrich\'s HR Business Partner model, employee engagement indexes, reward strategies, and comprehensive performance appraisal matrices.'
          },
          {
            heading: 'Flawless Academic Citations',
            paragraph: 'We ensure all CIPD papers are fully backed by peer-reviewed HRM journals, industry reports, and the latest CIPD profession map standards, cited in perfect Harvard format.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Are your writers CIPD qualified?", answer: "Yes, our HR writing department consists of UK-based CIPD-certified HR professionals and university lecturers." },
          { question: "Do you guarantee a pass?", answer: "We strictly align our submissions with the CIPD learning outcomes and grading rubrics, guaranteeing a pass mark or free edits." }
        ]
      },
      {
        id: 'cipp-assignment',
        icon: FileBadge,
        title: 'CIPP Assignment Help',
        desc: 'Payroll management, legislative compliance, and accounting assessments for Chartered Institute of Payroll Professionals.',
        longDesc: 'The Chartered Institute of Payroll Professionals (CIPP) demands a granular understanding of UK tax codes, national insurance (NI), payroll compliance, and pension auto-enrolment. Our payroll experts deliver pristine, verified solutions for CIPP courses.',
        image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80',
        benefits: ['UK HMRC tax compliance', 'Accurate payroll calculations', 'PAYE and National Insurance mastery', 'Up-to-date pension auto-enrolment guidelines'],
        seoKeywords: ['CIPP assignment help', 'payroll professional qualification', 'CIPP diploma writing', 'pension auto-enrolment help'],
        detailedSections: [
          {
            heading: 'Granular PAYE & Statutory Computations',
            paragraph: 'Our specialists provide precise calculations for complex payroll scenarios, including Statutory Sick Pay (SSP), Statutory Maternity Pay (SMP), and court order deductions.'
          },
          {
            heading: 'Payroll Strategy & Legislative Analysis',
            paragraph: 'Beyond numerical calculations, we analyze strategic payroll structures, international payroll coordination, and standard HMRC auditing preparations.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you handle HMRC legislative updates?", answer: "Yes, our payroll tutors stay continuously updated on the latest financial year HMRC guidelines, tax thresholds, and code alterations." },
          { question: "Can I submit payroll calculation spreadsheets?", answer: "Absolutely. We supply fully computed ledger sheets with working calculations displayed." }
        ]
      },
      {
        id: 'ilm-assignment',
        icon: Award,
        title: 'ILM Leadership Assignment Help',
        desc: 'Institute of Leadership & Management level 3 to 7 strategic case study solutions and portfolio support.',
        longDesc: 'ILM (Institute of Leadership & Management) assignments focus heavily on self-reflection, leadership theories, coaching methodologies, and change management. We support you in writing critical leadership evaluations, corporate portfolios, and business case audits.',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
        benefits: ['ILM Levels 3, 5, & 7 coverage', 'Leadership reflective journals', 'Change management frameworks', 'Executive portfolio curation'],
        seoKeywords: ['ILM level 5 diploma help', 'ILM level 7 leadership assignment', 'institute of leadership management writing', 'coaching and mentoring ILM'],
        detailedSections: [
          {
            heading: 'Applying High-Level Leadership Frameworks',
            paragraph: 'Our writers apply core theories such as Goleman\'s Emotional Intelligence, John Kotter\'s 8-Step Change model, Transformational Leadership, and Blanchard\'s Situational Leadership to your specific corporate prompts.'
          },
          {
            heading: 'Reflective Journals & Portfolios',
            paragraph: 'We help you formulate reflective writing models, including Gibbs\' Reflective Cycle or Kolb\'s Learning Cycle, to describe personal professional management experiences with critical academic rigor.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Is this suitable for corporate managers?", answer: "Yes, our service is tailored for busy working executives and managers looking to achieve their ILM qualifications quickly without sacrificing corporate standards." },
          { question: "Do you keep corporate scenarios confidential?", answer: "100% confidential. We anonymize company names, products, and financials to protect your corporate reputation." }
        ]
      },
      {
        id: 'athe-assignment',
        icon: FileBadge,
        title: 'ATHE Assignment Help',
        desc: 'Awards for Training and Higher Education (ATHE) assignment support for levels 3 to 7 business, tourism, and healthcare management.',
        longDesc: 'ATHE diplomas provide fast-track pathways to top UK university degrees. Our academic writing department delivers high-quality business, computing, and management portfolio assignments structured specifically around the official ATHE grading matrices.',
        image: 'https://images.unsplash.com/photo-1552581230-2645f2987b55?auto=format&fit=crop&w=1200&q=80',
        benefits: ['ATHE levels 3 through 7 diploma mapping', 'Accurate portfolio preparation', 'Comprehensive reference check', 'Fast-turnaround completions'],
        seoKeywords: ['ATHE assignment help', 'ATHE diploma in business management', 'ATHE level 7 computing support', 'UK higher education ATHE help'],
        detailedSections: [
          {
            heading: 'Strict Alignment with official ATHE Rubrics',
            paragraph: 'Every ATHE assignment we produce is custom-crafted to meet the specific learning outcomes and assessment criteria outlined by ATHE, ensuring you obtain the necessary credits easily.'
          },
          {
            heading: 'Multidisciplinary Portfolio Creation',
            paragraph: 'Whether you are pursuing ATHE in Business and Management, Health and Social Care, Computing, or Tourism and Hospitality, we have specialized subject experts ready to assist.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Can I submit multiple units?", answer: "Yes, you can upload entire semester bundles or individual units for full-course discount packages." },
          { question: "Do you supply Turnitin reports?", answer: "Yes, all ATHE portfolio packages include an official Turnitin similarity report to verify originality." }
        ]
      },
      {
        id: 'othm-assignment',
        icon: Trophy,
        title: 'OTHM Diploma Support',
        desc: 'OTHM Level 3 to 7 strategic diploma answers, professional reviews, and comprehensive academic portfolios.',
        longDesc: 'OTHM qualifications are widely recognized globally as advanced standing pathways to British Bachelor\'s and Master\'s degrees. Our academic mentors write complete OTHM unit assessments in compliance with official educational standards.',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        benefits: ['OTHM Level 3, 4, 5, 6, & 7 coverage', 'Direct pathway university standard writing', 'Comprehensive literature citations', 'Fast, efficient credit acquisition'],
        seoKeywords: ['OTHM level 7 diploma in strategic management', 'OTHM level 5 tourism assignment', 'OTHM level 4 health care helper', 'OTHM course credits support'],
        detailedSections: [
          {
            heading: 'University Pathway Standard Academic Prose',
            paragraph: 'Since OTHM leads directly to British university degrees, OTHM assignments demand highly analytical academic prose. We craft papers utilizing advanced terminology, robust models, and immaculate references.'
          },
          {
            heading: 'Covering Strategic Management, IT, & Logistics',
            paragraph: 'Our OTHM team comprises specialists in Strategic Management, Information Technology, Tourism and Hospitality, Education and Training, and Supply Chain Management.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Are your papers fully referenced?", answer: "Yes, we utilize standardized academic reference models, primarily Harvard and APA, including complete digital object identifiers (DOIs) where available." },
          { question: "Can I get help with OTHM Level 7 Strategic Research Methods?", answer: "Yes, we specialize in high-level OTHM research methods units, including methodology and complete draft proposals." }
        ]
      },
      {
        id: 'btec-assignment',
        icon: BookOpen,
        title: 'BTEC Assignment Help',
        desc: 'BTEC National and Higher National Diploma (HND) coursework, portfolios, and research papers written by top UK experts.',
        longDesc: 'Business and Technology Education Council (BTEC) diplomas require highly vocational assessments, reports, and practical evaluations. Our UK-based experts write complete BTEC Level 3 National and Level 5 Higher National Diploma (HND) assignments.',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        benefits: ['BTEC HNC/HND complete coverage', 'Vocational and industry-focused reports', 'Perfect layout, charts, and analysis', 'Meets Merit and Distinction standards'],
        seoKeywords: ['BTEC HND assignment help', 'BTEC Level 3 national diploma', 'BTEC business assignment expert', 'vocational HND coursework support'],
        detailedSections: [
          {
            heading: 'Targeting Merit & Distinction Criteria',
            paragraph: 'BTEC assignments are graded by Pass, Merit, and Distinction criteria. Our writers don\'t just satisfy the baseline; we construct elaborate, critical business models and reports to secure you Distinction grades.'
          },
          {
            heading: 'Vocational Business, Engineering, & IT Support',
            paragraph: 'We deliver comprehensive vocational solutions, combining academic theory with real-world sector studies, operations diagrams, and industry mock-ups.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you follow the BTEC assessment guidelines?", answer: "Yes, we construct assignments strictly conforming to the specific unit briefs and grading descriptors issued by Pearson BTEC." },
          { question: "What if my assessor requests revisions?", answer: "We offer completely free, rapid revisions to align the draft perfectly with any feedback received from your assessor." }
        ]
      },
      {
        id: 'cdr-report',
        icon: Settings,
        title: 'CDR Report Writing',
        desc: 'Professional Competency Demonstration Report (CDR) writing for Engineers Australia. 100% approval rate.',
        longDesc: 'Migrating to Australia as a professional engineer requires a highly compliant Competency Demonstration Report (CDR) approved by Engineers Australia. Our certified engineering consultants write compelling Career Episodes and Summary Statements to secure your skills assessment.',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        benefits: ['100% compliance with EA MSA Booklet', 'Three custom-crafted Career Episodes', 'Summary Statement cross-referencing', 'Plagiarism-free, human engineering narrative'],
        seoKeywords: ['CDR report writing', 'Engineers Australia CDR helper', 'Summary Statement engineering', 'Mechanical Engineer Career Episode CDR'],
        detailedSections: [
          {
            heading: 'Precision Crafting of Three Career Episodes',
            paragraph: 'We compile three distinct, elaborate Career Episodes highlighting your specific technical projects, design contributions, calculations, and safety management aligned with Engineers Australia competency targets.'
          },
          {
            heading: 'Flawless Summary Statement Formulation',
            paragraph: 'The Summary Statement is the heart of your CDR. We map your project paragraphs precisely to the technical and management competency elements requested in the Migration Skills Assessment booklet.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f7d?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Can you write a CDR based on academic projects?", answer: "Yes, if you lack work experience, we can construct compliant Career Episodes utilizing your undergraduate or postgraduate engineering design projects." },
          { question: "What is your Engineers Australia approval rate?", answer: "We maintain a 99.4% approval rate for initial submissions, thanks to our rigorous engineering-peer review cycle." }
        ]
      },
      {
        id: 'cv-writing',
        icon: FileText,
        title: 'Professional CV & Resume Writing',
        desc: 'ATS-optimized CVs, professional resume writing, and high-impact LinkedIn profile optimization.',
        longDesc: 'Stand out in competitive corporate job markets with an ATS-friendly (Applicant Tracking System) professional resume and executive CV. Our professional CV writers outline your career trajectory, highlighting quantifiable achievements and key industry skills.',
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
        benefits: ['ATS (Applicant Tracking System) optimized', 'Modern executive layouts', 'Compelling profile summaries', 'Complete LinkedIn profile alignment'],
        seoKeywords: ['professional CV writing service', 'resume builder ATS friendly', 'executive CV editing', 'LinkedIn optimization helper'],
        detailedSections: [
          {
            heading: 'Beating the Applicant Tracking Systems (ATS)',
            paragraph: 'Most modern corporations utilize automated ATS algorithms to pre-screen candidates. We build resumes incorporating high-impact industry keywords, clear typography hierarchy, and compliant structural layouts.'
          },
          {
            heading: 'Quantifying Corporate Achievements',
            paragraph: 'We re-write dry job description lists into dynamic, metrics-driven achievement statements, highlighting exactly how you drove revenue, managed budgets, or improved operational speed.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "In what formats do you deliver the CV?", answer: "We deliver both professional, print-ready PDF files and fully editable Microsoft Word source documents (.docx)." },
          { question: "Do you offer LinkedIn optimization?", answer: "Yes, our executive bundle includes a complete, character-by-character LinkedIn profile overhaul script, including custom SEO headlines." }
        ]
      }
    ]
  },
  {
    id: 'Technical & Regional',
    services: [
      {
        id: 'homework-help-dubai',
        icon: Globe,
        title: 'Homework Help Dubai & UAE',
        desc: 'Premium homework and assignment help for students in Dubai, Abu Dhabi, Sharjah, and Gulf universities.',
        longDesc: 'Universities in the UAE (including NYU Abu Dhabi, Zayed University, Khalifa University, and international campuses) maintain strict plagiarism and academic performance parameters. We deliver top-rated localized help tailored directly to their standards.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        benefits: ['UAE local academic alignment', '24/7 direct helpline access', 'Turnitin 0% plagiarism reports included', 'Free APA, Harvard, & MLA citation formatting'],
        seoKeywords: ['homework help Dubai', 'assignment writing service UAE', 'Abu Dhabi university assignments', 'Dubai MBA project helper'],
        detailedSections: [
          {
            heading: 'Tailored for UAE Educational Benchmarks',
            paragraph: 'We support UAE local scholars and expatriate students at British, American, and local universities, delivering coursework that conforms to specific regional and global institutional standards.'
          },
          {
            heading: 'Unmatched Academic Privacy & Secure Payments',
            paragraph: 'We operate with the highest data security standards, ensuring your academic details and payment methods are fully encrypted, confidential, and safe.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1582730147233-ac81124412c7?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Is this service confidential in Dubai?", answer: "Completely. Under our strict NDA and privacy guidelines, we never reveal student details to third parties or academic bodies." },
          { question: "Do you have writers familiar with UAE universities?", answer: "Yes, we have native English-speaking writers and regional consultants who understand specific guidelines of UAE universities." }
        ]
      },
      {
        id: 'oman-assignment',
        icon: Globe,
        title: 'Oman Assignment & Essay Support',
        desc: 'Dedicated academic coursework assistance for higher education institutions in Muscat and Oman.',
        longDesc: 'Higher education in the Sultanate of Oman (including Sultan Qaboos University and GUtech) requires precise technical execution and strict English grammar. Our academic mentors provide premium assignment assistance across business, engineering, and IT.',
        image: 'https://images.unsplash.com/photo-1534030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Muscat & Oman curriculum alignment', 'English academic writing support', 'High-quality technical diagrams', 'Affordable rates for students'],
        seoKeywords: ['Oman assignment helper', 'Muscat essay writing', 'Sultan Qaboos University coursework', 'Oman higher education tutor'],
        detailedSections: [
          {
            heading: 'Supporting Non-Native English Scholars',
            paragraph: 'We specialize in assisting non-native English speakers in Oman, delivering grammatically flawless, academic-grade prose that enhances your technical arguments clearly.'
          },
          {
            heading: 'Empowering Omani Scholars with International Quality',
            paragraph: 'All Omani submissions are written by seasoned educators matching international benchmarks, preparing you for excellent career trajectories in corporate or public sectors.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you cover IT and Computer Science for Oman?", answer: "Yes, we deliver fully annotated code, database schemas, and networking assignment reports for Omani IT scholars." },
          { question: "How do I make a secure payment from Oman?", answer: "We accept all major global credit cards and digital wallets through our secure SSL transaction channel." }
        ]
      },
      {
        id: 'university-assignment',
        icon: GraduationCap,
        title: 'University Assignment Help',
        desc: 'Undergraduate and graduate coursework solutions across all major science, humanities, and business subjects.',
        longDesc: 'University-level assignments require analytical depth, proper literature search, and cohesive arguments. Our network of master\'s and PhD-level writers is equipped to handle comprehensive assignments in corporate finance, nursing, law, STEM, and humanities.',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        benefits: ['PhD and Master\'s level experts', 'Proper literature synthesis', 'Flawless primary source bibliography', 'Guaranteed compliance with rubrics'],
        seoKeywords: ['university assignment help', 'undergraduate essay helper', 'master\'s level coursework solutions', 'PhD academic writing assistance'],
        detailedSections: [
          {
            heading: 'Deep Analytical Research Methodology',
            paragraph: 'We don\'t summarize superficial Google searches. We access major digital archives (JSTOR, Elsevier, IEEE, PubMed) to gather credible, peer-reviewed resources to back your essay.'
          },
          {
            heading: 'Perfect Alignment with Grading Criteria',
            paragraph: 'Every university paper we compile is designed to meet maximum critical evaluation, structural organization, and high-level citation criteria to achieve top grades.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Are your papers written by AI?", answer: "Never. We enforce a strict human-only writing protocol, backed by premium AI detector reports to prove 100% human-crafted prose." },
          { question: "Can I communicate with my assigned academic writer?", answer: "Yes, you can leave direct feedback and messages to your writer through our secure student client portal." }
        ]
      },
      {
        id: 'open-university',
        icon: Library,
        title: 'Open University Assignment Support',
        desc: 'Specialized TMA (Tutor-Marked Assignment) and EMA (End-of-Module Assessment) help for Open University students.',
        longDesc: 'The Open University (OU) curriculum demands highly structured, independent learning. Our specialized OU tutors help you dissect complex Tutor-Marked Assignments (TMAs), prepare research plans, and write flawless End-of-Module Assessments (EMAs).',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
        benefits: ['Strict adherence to OU TMA formats', 'Comprehensive EMA portfolio support', 'Understands OU grading descriptors', 'UK-standard scholarly writing'],
        seoKeywords: ['Open University assignment help', 'OU TMA writing helper', 'End of Module Assessment OU', 'tutor-marked assignment solutions'],
        detailedSections: [
          {
            heading: 'Navigating TMA Assessment Criteria',
            paragraph: 'Tutor-Marked Assignments (TMAs) contain exact scoring matrices. We structure each question answer with meticulous academic style, integrating the exact reading materials and learning logs recommended in your OU module.'
          },
          {
            heading: 'Comprehensive EMA Dissertation Support',
            paragraph: 'For the ultimate End-of-Module Assessment (EMA), we provide thorough research drafts, secondary literature evaluation, and complete academic summaries in compliance with the highest British tertiary educational standards.'
          }
        ],
        extraImages: [
          'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80'
        ],
        faqs: [
          { question: "Do you cover OU psychology and STEM models?", answer: "Yes, we have dedicated specialists for OU Psychology (DE100/DE200), Social Sciences, Law, and STEM pathways." },
          { question: "Is this service endorsed by the OU?", answer: "Our model answers are educational study guides designed to support independent research and comply with the Fair Use guidelines of all major British institutions." }
        ]
      }
    ]
  }
];

export const allServices = serviceCategories.flatMap(category => category.services);
