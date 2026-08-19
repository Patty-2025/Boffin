import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, UserCheck, Layers, BookOpen, ExternalLink, Code, Wrench, BarChart2, ShieldCheck, Award, FileText, HelpCircle, Clock, Star } from 'lucide-react';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

interface SubjectInfo {
  title: string;
  category: string;
  description: string;
  color: string;
  bg: string;
  icon: string;
  image: string;
  interfaceImage?: string;
  badge: string;
  longOverview: string;
  keyChallenges: string[];
  deliverables: string[];
  softwareDetails?: {
    version: string;
    fileFormats: string;
    industryStandard: string;
  };
}

const subjectData: Record<string, SubjectInfo> = {
  autocad: {
    title: 'AutoCAD Assignment & Project Help',
    category: 'Engineering & Design',
    description: 'Expert 2D drafting, 3D modeling, DWG file optimization, and technical drawings for engineering students and professionals.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    interfaceImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    badge: 'ISO & ANSI Compliant Drafting',
    longOverview: 'AutoCAD courses teach commercial computer-aided design (CAD) and drafting. Learn drawing, modeling, rendering, and precision in design. This is essential for architects, engineers, and designers creating detailed technical drawings. As one of the most widely used computer-aided design programs, AutoCAD training is a valuable addition to the education of any industrial designer, engineer, or architect.',
    keyChallenges: [
      'Layer management and strict adherence to architectural/mechanical layering conventions',
      'Accurate dimensioning, geometric constraints, and tolerance annotations',
      'Complex isometric views, layout viewports, and scaling for printing & plotters',
      'Block attribute extraction and parametric dynamic block design'
    ],
    deliverables: [
      'Fully editable .DWG and .DXF source files',
      'High-resolution PDF plot layouts with custom pen tables (CTB)',
      'Layer hierarchy and block definition documentation',
      'Step-by-step drafting methodology report'
    ],
    softwareDetails: {
      version: 'AutoCAD 2024 / 2025 (Latest)',
      fileFormats: '.DWG, .DXF, .DWT, .PDF',
      industryStandard: 'Autodesk Certified Professionals'
    }
  },
  revit: {
    title: 'Revit & BIM Modeling Support',
    category: 'Engineering & Design',
    description: 'Professional Building Information Modeling (BIM), family creation, 3D architectural renderings, and structural coordination in Revit.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    interfaceImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f7d?auto=format&fit=crop&w=1200&q=80',
    badge: 'LOD 300 - 500 BIM Standards',
    longOverview: 'Building Information Modeling (BIM) via Autodesk Revit requires rigorous coordination across architectural, structural, and MEP (Mechanical, Electrical, Plumbing) disciplines. Our experienced BIM managers assist with custom family creation, parametric modeling, clash detection, and construction documentation aligned with international BIM standards.',
    keyChallenges: [
      'Parametric family creation and nested family formulas',
      'Multi-disciplinary coordination (Architectural, Structural, MEP)',
      'Schedule generation, quantity take-offs, and material takeoffs',
      'Phase planning, worksharing, and central model synchronization'
    ],
    deliverables: [
      'Autodesk Revit project files (.RVT) and families (.RFA)',
      'Detailed schedule tables and quantity take-offs',
      'Clash detection summary reports (Navisworks compatible)',
      'Rendered 3D walkthrough views and sheet sets'
    ],
    softwareDetails: {
      version: 'Autodesk Revit 2024 / 2025',
      fileFormats: '.RVT, .RFA, .IFC, .DWG',
      industryStandard: 'ISO 19650 & AIA Standards'
    }
  },
  solidworks: {
    title: 'SolidWorks 3D CAD & Simulation Help',
    category: 'Engineering & Design',
    description: 'Advanced mechanical part modeling, assembly animation, finite element analysis (FEA), and engineering drawings.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    interfaceImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    badge: 'FEA & CFD Simulation Experts',
    longOverview: 'SolidWorks by Dassault Systèmes empowers mechanical engineers to conceptualize, simulate, and manufacture complex products. From intricate surface modeling and sheet metal fabrication to Finite Element Analysis (FEA) and Computational Fluid Dynamics (CFD), our certified SolidWorks professionals provide rigorous engineering analysis.',
    keyChallenges: [
      'Complex loft and boundary surface modeling for ergonomic products',
      'Dynamic assembly motion analysis and collision detection',
      'Static, thermal, and frequency Finite Element Analysis (FEA)',
      'GD&T (Geometric Dimensioning and Tolerancing) on engineering drawings'
    ],
    deliverables: [
      'SolidWorks part (.SLDPRT) and assembly (.SLDASM) files',
      'Detailed engineering drawing packages (.SLDDRW)',
      'FEA stress/strain analysis reports and simulation visualizations',
      'Step-by-step design calculation breakdown'
    ],
    softwareDetails: {
      version: 'SolidWorks 2023 / 2024 SP0.4',
      fileFormats: '.SLDPRT, .SLDASM, .SLDDRW, .STEP',
      industryStandard: 'Dassault Systèmes Certified (CSWP/CSWE)'
    }
  },
  bim: {
    title: 'BIM (Building Information Modeling) Help',
    category: 'Engineering & Design',
    description: 'Comprehensive BIM coordination, clash detection, LOD 300-500 standards, and construction documentation.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f7d?auto=format&fit=crop&w=1200&q=80',
    badge: 'ISO 19650 BIM Compliance',
    longOverview: 'Building Information Modeling (BIM) revolutionizes construction project delivery through collaborative digital workflows. Our BIM specialists assist with Execution Plans (BEP), clash detection matrices, 4D/5D time and cost integration, and ISO 19650 information management standards.',
    keyChallenges: [
      'Managing Common Data Environments (CDE) and naming conventions',
      'Multi-trade clash detection and resolution protocols',
      'Level of Detail (LOD) definition and model auditing',
      'COBie data drop generation for facility management'
    ],
    deliverables: [
      'BIM Execution Plan (BEP) documentation',
      'Clash detection matrix and audit reports',
      'Coordinated federated models',
      'COBie data spreadsheets'
    ]
  },
  sketchup: {
    title: 'SketchUp 3D Modeling & Rendering Help',
    category: 'Engineering & Design',
    description: 'Detailed architectural modeling, interior design layouts, V-Ray rendering setups, and CAD exports.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Photorealistic V-Ray & Enscape Renders',
    longOverview: 'SketchUp is the premier tool for rapid architectural visualization and interior design. Our designers construct pristine, lightweight 3D models with organized tags, components, and materials, paired with breathtaking photorealistic renders using V-Ray, Enscape, or Lumion.',
    keyChallenges: [
      'Organic terrain modeling and Sandbox tools',
      'Optimizing poly counts for smooth viewport performance',
      'Lighting, texture mapping, and material bump map setup',
      'Layout documentation and presentation sheet creation'
    ],
    deliverables: [
      'SketchUp source files (.SKP)',
      'High-resolution photorealistic exterior/interior renders (4K)',
      'Layout presentation documents (.LAYOUT)',
      'DWG/DXF cad exports'
    ]
  },
  'civil-3d': {
    title: 'Civil 3D Infrastructure Design Help',
    category: 'Engineering & Design',
    description: 'Corridor modeling, surface grading, utility pipe networks, stormwater management, and topographic profiling.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: 'wrench',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f1f7d?auto=format&fit=crop&w=1200&q=80',
    badge: 'AASHTO & Hydrological Standards',
    longOverview: 'Autodesk Civil 3D is essential for civil engineering infrastructure projects including highways, railways, grading surfaces, and stormwater drainage networks. Our civil engineers apply AASHTO standards, watershed analyses, and profile alignments.',
    keyChallenges: [
      'Tin surface creation, breaklines, and volume earthwork calculations',
      'Complex corridor modeling with subassemblies and superelevation',
      'Stormwater sizing using HydroCAD and Rational Method',
      'Profile alignments and cross-section sheet production'
    ],
    deliverables: [
      'Civil 3D drawing packages (.DWG)',
      'Earthwork mass haul and cut/fill volume reports',
      'Drainage catchment and pipe network calculations',
      'Longitudinal profile and cross-section drawings'
    ]
  },
  spss: {
    title: 'SPSS Data Analysis & Statistics Help',
    category: 'Data Analysis & Statistics',
    description: 'Expert SPSS statistical consulting, ANOVA, regression analysis, hypothesis testing, and academic interpretation.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    badge: 'APA 7th Edition Statistical Reporting',
    longOverview: 'IBM SPSS Statistics is the gold standard for quantitative research in social sciences, nursing, business, and psychology. Our statisticians clean datasets, execute parametric and non-parametric tests, check regression assumptions, and write publication-ready APA 7th edition interpretations.',
    keyChallenges: [
      'Selecting appropriate statistical tests (t-tests, ANOVA, MANOVA, chi-square, multiple regression)',
      'Testing assumptions of normality, homoscedasticity, and multicollinearity',
      'Factor analysis, Cronbach alpha reliability testing, and scale validation',
      'Translating raw SPSS output tables into publication-grade academic prose'
    ],
    deliverables: [
      'Cleaned SPSS dataset (.SAV)',
      'SPSS output viewer files (.SPV)',
      'Publication-ready APA formatted results tables and graphs',
      'Comprehensive methodological narrative report'
    ]
  },
  'r-programming': {
    title: 'R Programming & RStudio Analysis Help',
    category: 'Data Analysis & Statistics',
    description: 'Advanced statistical modeling, ggplot2 visualizations, tidyverse data wrangling, and R Markdown reporting.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80',
    badge: 'Tidyverse & ggplot2 Mastery',
    longOverview: 'R and RStudio provide unmatched power for statistical computing and data science. Our data scientists build reproducible scripts using tidyverse, dplyr, ggplot2, and R Markdown to deliver publication-quality statistical reports and machine learning models.',
    keyChallenges: [
      'Complex data cleaning and reshaping with tidyr and dplyr',
      'Building publication-grade ggplot2 visualizations and interactive html widgets',
      'Fitting generalized linear models (GLMs), time series, and Bayesian regressions',
      'Writing automated R Markdown or Quarto reports'
    ],
    deliverables: [
      'Well-commented R scripts (.R) or R Markdown documents (.Rmd / .qmd)',
      'Compiled HTML or PDF analysis reports',
      'High-resolution ggplot2 graphics',
      'Dataset cleaning and wrangling pipeline documentation'
    ]
  },
  matlab: {
    title: 'MATLAB Programming & Simulation Help',
    category: 'Data Analysis & Statistics',
    description: 'Numerical methods, Simulink models, signal processing, matrix computations, and algorithm implementation.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Simulink & Numerical Computation',
    longOverview: 'MATLAB is indispensable for electrical, mechanical, and aerospace engineering calculations, signal processing, and numerical simulations. Our experts develop robust scripts, functions, GUI apps, and Simulink block diagrams.',
    keyChallenges: [
      'Matrix manipulation and vectorized numerical algorithms',
      'Simulink block diagram modeling for control systems and differential equations',
      'Digital signal processing (DSP), FFT analysis, and filter design',
      'Optimization toolboxes and curve fitting'
    ],
    deliverables: [
      'MATLAB scripts and functions (.M)',
      'Simulink models (.SLX)',
      'Graphical plots and simulation outputs',
      'Engineering theory and code documentation'
    ]
  },
  excel: {
    title: 'Advanced Excel & Financial Modeling Help',
    category: 'Data Analysis & Statistics',
    description: 'VBA macros, Power Query, pivot tables, complex financial models, and statistical data analysis in Excel.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    badge: 'DCF Models & VBA Automation',
    longOverview: 'Microsoft Excel is the universal tool for business financial modeling, data aggregation, and dashboard design. From discounted cash flow (DCF) valuation models and Power Query ETL pipelines to custom VBA macros and advanced XLOOKUP/INDEX-MATCH formulas, we build audit-proof spreadsheets.',
    keyChallenges: [
      'Dynamic financial modeling with sensitivity analysis and scenario planning',
      'Power Query data cleansing and relational data modeling',
      'Advanced VBA macro development for process automation',
      'Executive dashboard design with slicers and dynamic charts'
    ],
    deliverables: [
      'Fully dynamic Excel workbook (.XLSM / .XLSX)',
      'Built-in documentation and audit trail',
      'Executive summary presentation slide deck',
      'Formula breakdown and user guide'
    ]
  },
  stata: {
    title: 'Stata Econometrics & Data Analysis Help',
    category: 'Data Analysis & Statistics',
    description: 'Panel data regressions, time series analysis, instrumental variables, and robust econometric modeling.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Panel Data & Econometrics',
    longOverview: 'Stata is the premier econometric software for economics, finance, and policy research. Our econometricians specialize in fixed effects, random effects, GMM, instrumental variables (IV), time series (ARIMA/VAR), and binary choice models.',
    keyChallenges: [
      'Handling endogeneity with instrumental variables and two-stage least squares (2SLS)',
      'Panel data diagnostics (Hausman test, heteroskedasticity, autocorrelation)',
      'Propensity score matching (PSM) and difference-in-differences (DiD)',
      'Clean Stata do-file scripting and log generation'
    ],
    deliverables: [
      'Commented Stata Do-files (.DO)',
      'Stata log output files (.LOG)',
      'Regression results tables formatted for publication',
      'Econometric interpretation report'
    ]
  },
  sas: {
    title: 'SAS Programming & Analytics Help',
    category: 'Data Analysis & Statistics',
    description: 'Base SAS, SAS/STAT, macro programming, clinical trial data analysis, and predictive modeling.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    icon: 'chart',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    badge: 'CDISC SDTM/ADaM & Clinical Trials',
    longOverview: 'SAS is heavily relied upon in pharmaceutical research, healthcare analytics, and enterprise BI. Our SAS certified programmers write efficient DATA steps, PROC SQL queries, and SAS/STAT macros for clinical trials and predictive modeling.',
    keyChallenges: [
      'Advanced DATA step merging, array processing, and formatting',
      'Macro variable scoping and modular macro programming',
      'Clinical trial data structures (SDTM and ADaM compliance)',
      'Logistic regression, survival analysis (PROC PHREG), and PROC GLM'
    ],
    deliverables: [
      'SAS program files (.SAS)',
      'Listing and table outputs (.LST / .RTF)',
      'Macro library documentation',
      'Statistical validation report'
    ]
  },
  python: {
    title: 'Python Programming Assignment Help',
    category: 'Programming & Technical Computing',
    description: 'Expert Python support for data science (pandas, numpy, scikit-learn), web development (Flask, FastAPI), and algorithms.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Clean PEP8 & Object-Oriented Code',
    longOverview: 'Python is the world s most popular programming language for data science, machine learning, backend engineering, and task automation. Our software engineers write clean, PEP8-compliant Python code backed by comprehensive unit tests and documentation.',
    keyChallenges: [
      'Data manipulation and machine learning pipelines using Pandas, NumPy, and Scikit-Learn',
      'RESTful API development with FastAPI, Flask, or Django',
      'Asynchronous programming, concurrency, and performance optimization',
      'Algorithmic problem-solving and custom data structure implementation'
    ],
    deliverables: [
      'Clean source code files (.PY) or Jupyter Notebooks (.IPYNB)',
      'Requirements.txt or Poetry dependency management files',
      'Unit test suites using PyTest',
      'README documentation and execution instructions'
    ]
  },
  java: {
    title: 'Java OOP & Enterprise Assignment Help',
    category: 'Programming & Technical Computing',
    description: 'Object-oriented programming, Spring Boot, multithreading, data structures, and robust application testing.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    badge: 'Spring Boot & Design Patterns',
    longOverview: 'Java powers enterprise backend systems worldwide. Our senior Java developers assist with object-oriented design principles (SOLID), Spring Boot microservices, multithreading, collections framework, and rigorous JUnit testing.',
    keyChallenges: [
      'Implementing polymorphism, inheritance, and encapsulation cleanly',
      'Concurrency, thread safety, synchronization, and executor services',
      'Spring Boot REST controllers, JPA/Hibernate ORM, and database repositories',
      'Algorithmic efficiency and custom data structures'
    ],
    deliverables: [
      'Maven/Gradle Java project source code',
      'JUnit test coverage reports',
      'UML class diagrams for architecture',
      'Complete build and run instructions'
    ]
  },
  cpp: {
    title: 'C++ Programming & Data Structures Help',
    category: 'Programming & Technical Computing',
    description: 'Low-level memory management, pointers, STL containers, object-oriented design, and competitive programming.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    badge: 'STL, Pointers & Memory Management',
    longOverview: 'C++ provides high-performance computing capabilities essential for game engines, embedded systems, and competitive programming. Our experts master pointer arithmetic, smart pointers, RAII, STL containers, and complex graph algorithms.',
    keyChallenges: [
      'Avoiding memory leaks and dangling pointers with smart pointers (std::unique_ptr, std::shared_ptr)',
      'Advanced template metaprogramming and operator overloading',
      'Graph theory algorithms (Dijkstra, A*, Minimum Spanning Tree)',
      'Time and space complexity optimization (Big O notation)'
    ],
    deliverables: [
      'Optimized C++ source files (.CPP / .HPP)',
      'Makefile or CMake configuration',
      'Complexity analysis and benchmark report',
      'Extensive test harness'
    ]
  },
  c: {
    title: 'C Programming & Systems Development Help',
    category: 'Programming & Technical Computing',
    description: 'Embedded C, system programming, pointer arithmetic, dynamic memory allocation, and debugging.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    badge: 'Low-Level Systems & Embedded C',
    longOverview: 'The C programming language forms the foundation of operating systems, embedded microcontrollers, and system utilities. We provide rigorous support for pointer manipulation, malloc/free memory management, bitwise operations, and multithreaded pthreads.',
    keyChallenges: [
      'Zero-leak dynamic memory management with valgrind verification',
      'Pointers to functions, multidimensional arrays, and structs',
      'Low-level bit manipulation and hardware register interaction',
      'POSIX file I/O and process fork/exec management'
    ],
    deliverables: [
      'Modular C source and header files',
      'Makefile with strict compiler warning flags (-Wall -Wextra -Werror)',
      'Valgrind memory leak verification report',
      'Detailed code comments'
    ]
  },
  javascript: {
    title: 'JavaScript & Full-Stack Web Development Help',
    category: 'Programming & Technical Computing',
    description: 'Modern ES6+ JavaScript, React, Node.js, asynchronous programming, and DOM manipulation.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80',
    badge: 'Modern ES6+ & React SPAs',
    longOverview: 'JavaScript is the backbone of modern web interactivity. From vanilla ES6+ asynchronous programming and DOM manipulation to React single-page applications and Node.js Express REST APIs, our web developers build responsive, production-ready web apps.',
    keyChallenges: [
      'Asynchronous JavaScript (Promises, async/await, event loop handling)',
      'State management and component lifecycle in React',
      'RESTful API integration, CORS handling, and JSON payloads',
      'Cross-browser compatibility and CSS Tailwind responsive layouts'
    ],
    deliverables: [
      'Complete web project repository source code',
      'Package.json with pre-configured dependencies',
      'Responsive UI tested across devices',
      'Deployment guide'
    ]
  },
  sql: {
    title: 'SQL Database Design & Query Optimization Help',
    category: 'Programming & Technical Computing',
    description: 'Complex JOINs, stored procedures, indexing, PostgreSQL, MySQL, database normalization (3NF), and ERDs.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Normalization 3NF & Complex Queries',
    longOverview: 'Structured Query Language (SQL) powers relational database management systems. We design normalized database schemas (3NF/BCNF), write optimized multi-table JOINs, subqueries, CTEs, triggers, and stored procedures for PostgreSQL, MySQL, SQL Server, and Oracle.',
    keyChallenges: [
      'Translating conceptual user stories into robust Entity-Relationship Diagrams (ERDs)',
      'Achieving Third Normal Form (3NF) to prevent data anomalies',
      'Writing high-performance queries with indexes, window functions, and execution plan tuning',
      'ACID transaction management and referential integrity'
    ],
    deliverables: [
      'SQL DDL creation scripts (.SQL)',
      'Populated sample data insert scripts',
      'Entity-Relationship Diagram (ERD)',
      'Optimized query performance analysis'
    ]
  }
};

export default function SubjectPage() {
  const { subjectId } = useParams();
  const subject = subjectId ? subjectData[subjectId] : null;

  const defaultInfo: SubjectInfo = {
    title: 'Technical Subject & Software Assignment Support',
    category: 'Specialized Academic Support',
    description: 'Expert guidance, step-by-step problem solving, and professional deliverables for university assignments and technical projects.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: 'code',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    badge: 'Expert Academic Assistance',
    longOverview: 'Our subject specialists provide comprehensive academic mentorship and project execution for university students and researchers worldwide. We guarantee original, rigorously tested deliverables tailored to your exact grading rubric.',
    keyChallenges: [
      'Strict adherence to university prompt guidelines and rubrics',
      'Complex technical and theoretical problem breakdown',
      'Professional formatting and academic citation standards',
      'Meeting tight deadlines with guaranteed accuracy'
    ],
    deliverables: [
      'Fully completed project files and source code',
      'Step-by-step methodology and explanation report',
      'Free unlimited revisions until satisfaction',
      '24/7 direct communication with your assigned specialist'
    ]
  };

  const info = subject || defaultInfo;

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title={`${info.title} | Boffin Global Services`}
        description={info.description}
        keywords={`${subjectId || 'technical'}, assignment help, software support, expert guidance`}
        canonicalUrl={`/subject/${subjectId || 'general'}`}
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`text-xs font-extrabold uppercase tracking-widest ${info.color} ${info.bg} px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-sm`}>
                {info.badge || info.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                {info.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {info.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-6 text-sm font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><CheckCircle size={16} className={info.color} /> 100% Original & Confidential</span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><Clock size={16} className={info.color} /> 24/7 Expert Support</span>
                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><Award size={16} className={info.color} /> Ph.D. & Industry Specialists</span>
              </div>
              <TrustedLogos />
            </div>
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-3xl blur opacity-25"></div>
              <img 
                src={info.image} 
                alt={info.title} 
                className="relative rounded-2xl shadow-xl w-full h-[360px] object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AutoCAD Specific Stats Hub */}
      {subjectId === 'autocad' && (
        <section className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">2,179,930</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Number of Learners</div>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">628</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Number of Courses</div>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">638</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Hands-on Practices</div>
              </div>
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                <div className="text-3xl font-extrabold text-amber-400 mb-1 flex items-center justify-center gap-1">4.5 <Star size={20} className="fill-amber-400 text-amber-400" /></div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Average Course Rating</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Executive Overview */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className={info.color} size={28} />
              Software Overview & Industry Standards
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {info.longOverview}
            </p>

            {/* Platform Screenshot Showcase */}
            <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between text-white text-xs">
                <span className="font-mono flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span> {info.title} Workspace View</span>
                <span className="text-slate-400 font-mono">{info.softwareDetails?.industryStandard || 'Enterprise Certified'}</span>
              </div>
              <img 
                src={info.interfaceImage || info.image} 
                alt={`${info.title} interface showcase`} 
                className="w-full h-[320px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {info.keyChallenges.map((challenge, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle size={18} className={`${info.color} shrink-0 mt-0.5`} />
                  <span className="text-sm text-slate-700 font-medium">{challenge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AutoCAD Specific Courses & Instructors */}
          {subjectId === 'autocad' && (
            <div className="space-y-12 mt-12">
              {/* Top Courses */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Award className="text-amber-600" size={28} />
                  Top-Rated AutoCAD Courses
                </h2>
                <div className="space-y-6">
                  {/* Course 1 */}
                  <div className="flex flex-col sm:flex-row gap-5 p-5 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1618681121043-4e89791b8a92?auto=format&fit=crop&w=400&q=80" alt="AutoCAD - Beginner to Advanced" className="w-full sm:w-48 h-32 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Autodesk AutoCAD - Beginner to Advanced level</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">Includes quizzes, practicals, practice exercises, solutions, CAD main project, final exam. All years of AutoCAD covered.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={14} className="fill-amber-600" /> 4.6 (3,243 reviews)</span>
                        <span>19 total hours</span>
                        <span>250 lectures</span>
                        <span className="text-slate-900 font-bold">$59.99</span>
                      </div>
                    </div>
                  </div>
                  {/* Course 2 */}
                  <div className="flex flex-col sm:flex-row gap-5 p-5 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1541888086225-ee5ca398e6da?auto=format&fit=crop&w=400&q=80" alt="Quantity Surveying" className="w-full sm:w-48 h-32 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Quantity Surveying Building Estimation And Project Planning</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">Quantity Surveying, Quantity Takeoff, BBS In Excel, Complete Project In Autocad, Project Planning With Primavera P6.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={14} className="fill-amber-600" /> 4.6 (4,269 reviews)</span>
                        <span>41 total hours</span>
                        <span>349 lectures</span>
                        <span className="text-slate-900 font-bold">$74.99</span>
                      </div>
                    </div>
                  </div>
                  {/* Course 3 */}
                  <div className="flex flex-col sm:flex-row gap-5 p-5 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80" alt="Complete AutoCAD 2D+3D" className="w-full sm:w-48 h-32 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Complete AutoCAD 2D + 3D Course</h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">Master AutoCAD from Scratch to Pro: The Complete Step-by-Step Course for Civil / Mechanical / Architecture.</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={14} className="fill-amber-600" /> 4.5 (2,011 reviews)</span>
                        <span>57.5 total hours</span>
                        <span>185 lectures</span>
                        <span className="text-slate-900 font-bold">$59.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Instructors */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <UserCheck className="text-amber-600" size={28} />
                  Popular AutoCAD Instructors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Instructor 1 */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0">JP</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Jaiprakash Pandey</h4>
                      <p className="text-xs text-slate-500 mb-1">AutoCAD, SOLIDWORKS</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={12} className="fill-amber-600" /> 4.6</span>
                        <span className="text-slate-500">340,937 students</span>
                      </div>
                    </div>
                  </div>
                  {/* Instructor 2 */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0">MA</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Mudessar Afraz</h4>
                      <p className="text-xs text-slate-500 mb-1">Construction Estimation</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={12} className="fill-amber-600" /> 4.5</span>
                        <span className="text-slate-500">61,352 students</span>
                      </div>
                    </div>
                  </div>
                  {/* Instructor 3 */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0">RK</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Rajesh K</h4>
                      <p className="text-xs text-slate-500 mb-1">Tekla Structures, AutoCAD</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={12} className="fill-amber-600" /> 4.5</span>
                        <span className="text-slate-500">15,366 students</span>
                      </div>
                    </div>
                  </div>
                  {/* Instructor 4 */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                    <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-xl shrink-0">MF</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Mike Freeman</h4>
                      <p className="text-xs text-slate-500 mb-1">AutoCAD, Autodesk Fusion</p>
                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <span className="flex items-center gap-1 text-amber-600"><Star size={12} className="fill-amber-600" /> 4.6</span>
                        <span className="text-slate-500">45,980 students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className={info.color} size={28} />
              Subject Specialist Methodology & Industry Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our specialists hold advanced master's and doctoral degrees alongside active professional certifications in their respective fields. We provide clean, tested, and fully documented deliverables tailored to rigorous academic and engineering standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className={info.color} />
                  Rubric & Spec Compliance
                </h3>
                <p className="text-sm text-slate-600">Every project is checked against your precise prompt requirements, version specifications, and output formats.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className={info.color} />
                  Detailed Documentation
                </h3>
                <p className="text-sm text-slate-600">Accompanied by explanatory markdown notes, code comments, and step-by-step methodology reports.</p>
              </div>
            </div>
          </div>

          {/* Deliverables & Formats */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <FileText className={info.color} size={28} />
              What You Receive: Guaranteed Deliverables
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              When you partner with Boffin Global Services, you receive comprehensive, ready-to-submit files along with complete academic support:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.deliverables.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0`}>✓</span>
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className={info.color} size={28} />
              Our 5-Step Execution Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-slate-900 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div><strong>Requirements Analysis:</strong> Reviewing files, datasets, rubrics, and expected outputs.</div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-slate-900 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div><strong>Architecture & Planning:</strong> Structuring the solution, models, or scripts for optimal performance.</div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-slate-900 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div><strong>Execution & Implementation:</strong> Writing code, generating models, or running analysis with strict precision.</div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-slate-900 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div><strong>Testing & Verification:</strong> Validating against edge cases and verifying output accuracy.</div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-slate-900 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div><strong>Delivery & Walkthrough:</strong> Packaging all files with clear documentation for your review.</div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className={info.color} size={28} />
              Explore Related Services & Hubs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/data-analysis" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Data Analysis & Statistics</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Sidebar Order Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <FAQSection 
        title={`${info.title} FAQs`}
        leftFaqs={[
          { question: "How do I submit my project files?", answer: "You can upload all project descriptions, datasets, and source files directly through our secure order form." },
          { question: "What formats do you deliver?", answer: "We deliver source code, project files (.dwg, .sldprt, .ipynb, .py, .sql), and comprehensive documentation." }
        ]}
      />
    </main>
  );
}

