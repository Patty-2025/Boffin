import React from 'react';
import { Terminal, Code2, Cpu, ExternalLink, CheckCircle, ShieldCheck, UserCheck, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function ProgrammingHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Expert Programming Assignment Help | Professional Coding Support Services"
        description="Master complex algorithms and development projects with our global team of coding experts. 100% functional, secure, and well-documented code for students worldwide."
        keywords="programming assignment help, coding experts, assignment helpers, CS assignment help, software development support"
        canonicalUrl="/programming-help-service"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Computer Science & Programming Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Expert Programming Assignment Help & Code Optimization
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Master complex data structures, algorithms, object-oriented paradigms, and full-stack software development. Our senior developers provide rigorous code debugging, complexity reduction, and architectural guidance across Java, Python, C++, React, and SQL.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content & In-Depth Tutorials immediately after hero */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-emerald-600" size={28} />
              Subject Specialist Methodology & Expert Background
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Every programming assignment is matched with a senior software engineer or CS doctorate holding industry experience in distributed systems, machine learning, or embedded development. Our specialists adhere to strict testing methodologies including test-driven development (TDD), automated unit testing via PyTest or JUnit, and static code analysis to eliminate null pointer exceptions and race conditions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600" />
                  Time & Space Complexity
                </h3>
                <p className="text-sm text-slate-600">Rigorous Big O analysis ($O(n \log n)$, $O(n^2)$) ensuring optimal performance under high loads.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600" />
                  Code Maintainability
                </h3>
                <p className="text-sm text-slate-600">Adhering to DRY, SOLID principles, and clean architecture standards for maximum readability.</p>
              </div>
            </div>
          </div>

          {/* How We Write / Execute Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-emerald-600" size={28} />
              How We Write: Our 5-Step Coding & Verification Process
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Requirement Decomposition:</strong> Analyzing prompt constraints, input/output specifications, and edge cases.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Algorithmic Pseudocode & UML:</strong> Drafting optimal data structures and control flow graphs before writing syntax.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Modular Implementation:</strong> Writing clean, well-commented code across functions and classes.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Automated Unit Testing:</strong> Verifying output against test suites and edge test boundaries.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Documentation & Readme:</strong> Providing setup instructions, compilation guides, and inline explanations.
                </div>
              </div>
            </div>
          </div>

          {/* Case Study / Code Example */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Code2 className="text-emerald-600" size={28} />
              Tutorial: Implementing Binary Search Tree (BST) Insertion & Traversal
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Below is a clean Python implementation of a Binary Search Tree with recursive insertion and in-order traversal, commonly required in data structures coursework.
            </p>

            <div className="bg-slate-900 text-slate-200 p-5 rounded-xl text-xs overflow-x-auto font-mono mb-6">
{`class Node:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return Node(key)
    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    return root

def inorder_traversal(root, res=[]):
    if root:
        inorder_traversal(root.left, res)
        res.append(root.val)
        inorder_traversal(root.right, res)
    return res`}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              In-order traversal guarantees sorted output for valid binary search trees, operating in $O(n)$ time complexity.
            </p>
          </div>

          {/* Internal Backlinks & Related Services */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-emerald-600" size={28} />
              Explore Related Services & Academic Tools
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Boost your academic and engineering performance by exploring our specialized service offerings and free writing tools:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/software-architecture" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Software Architecture & UML</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Documentation & APIs</span> <span>→</span>
              </Link>
              <Link to="/data-analysis" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Data Analysis & Statistical Models</span> <span>→</span>
              </Link>
              <Link to="/citation-generator" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Free Citation Generator</span> <span>→</span>
              </Link>
              <Link to="/plagiarism-checker" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Plagiarism Checker Tool</span> <span>→</span>
              </Link>
            </div>
          </div>

          {/* External References */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" size={28} />
              Authoritative Computer Science Portals & Standards
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://docs.python.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Python Official Documentation <ExternalLink size={14} />
              </a>
              <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                MDN Web Docs <ExternalLink size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                GitHub Open Source Repos <ExternalLink size={14} />
              </a>
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

      <AssignmentTopicsSection title="Technical Disciplines & Languages" topics={["Python & NumPy", "Java & Spring Boot", "C / C++ Systems", "JavaScript & TypeScript", "SQL & NoSQL Databases", "Data Structures & Algos"]} />
      
      <FreeWritingTools />
      <ComparisonSection />

      <FAQSection 
        title="Programming Assignment Help FAQs"
        leftFaqs={[
          { question: "Do you provide comments in the code?", answer: "Yes! Every programming task includes comprehensive inline comments and documentation explaining every function." },
          { question: "Can you help with database configuration?", answer: "Yes, we integrate SQL, MongoDB, PostgreSQL, and Redis caching layers seamlessly." }
        ]}
      />
    </main>
  );
}
