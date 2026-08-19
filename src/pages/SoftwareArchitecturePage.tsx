import React from 'react';
import { Network, Server, FileCode, ExternalLink, CheckCircle, UserCheck, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function SoftwareArchitecturePage() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Software Architecture & System Design | Boffin Global Services"
        description="Expert system design, UML diagrams, microservices planning, database schemas, and scalable cloud architecture for computer science assignments."
        keywords="software architecture, system design assignment, UML diagrams, microservices pattern, cloud architecture, database schema design"
        canonicalUrl="/software-architecture"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Computer Science & System Design</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Software Architecture & System Design Support
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Design robust, scalable, and secure enterprise software systems. Our senior system architects help you craft comprehensive UML diagrams, ERDs, microservices topologies, and cloud-native blueprints.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-indigo-600" size={28} />
              Subject Specialist Methodology & Enterprise Architect Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our architecture team consists of enterprise solution architects and senior backend engineers with extensive experience in cloud-native AWS/GCP deployments, event-driven design, and fault-tolerant distributed systems.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-600" />
                  Scalability & Trade-offs
                </h3>
                <p className="text-sm text-slate-600">Applying CAP theorem principles and horizontal scaling strategies to handle high-throughput workloads.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-indigo-600" />
                  Clean Domain Modeling
                </h3>
                <p className="text-sm text-slate-600">Implementing domain-driven design (DDD), Hexagonal architecture, and robust ERD schemas.</p>
              </div>
            </div>
          </div>

          {/* How We Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-indigo-600" size={28} />
              How We Execute: Our 5-Step System Design Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-indigo-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Functional & Non-Functional Requirements:</strong> Estimating QPS, storage growth, and availability SLAs.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-indigo-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>High-Level Topology:</strong> Designing API gateways, load balancers, microservices, and database clusters.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-indigo-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Database Schema & ERD:</strong> Normalizing relational tables or designing flexible NoSQL collections.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-indigo-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>UML Diagrams Generation:</strong> Creating professional class, sequence, and component diagrams.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-indigo-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Trade-off Analysis Report:</strong> Documenting design decisions, bottlenecks, and fault tolerance mechanisms.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Network className="text-indigo-600" size={28} />
              UML Diagrams & Entity-Relationship Modeling
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Professional class diagrams, sequence diagrams, activity diagrams, and component topologies using standard notation (Draw.io, Lucidchart, PlantUML).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Class & Sequence Diagrams</h3>
                <p className="text-sm text-slate-600">Object-oriented modeling covering inheritance, encapsulation, and message lifecycles.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Database ERDs</h3>
                <p className="text-sm text-slate-600">Normalized relational schemas (3NF) and NoSQL document collections with indexing strategies.</p>
              </div>
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-indigo-600" size={28} />
              Explore Related CS & Technical Services
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Combine your system design assignment with our expert programming and documentation services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Documentation & APIs</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-indigo-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <FileCode className="text-indigo-600" size={28} />
              Architectural References & Patterns
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://martinfowler.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Martin Fowler Architecture <ExternalLink size={14} />
              </a>
              <a href="https://www.acm.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                ACM Digital Library <ExternalLink size={14} />
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

      <FAQSection 
        title="Software Architecture FAQs"
        leftFaqs={[
          { question: "What tools do you use for UML diagrams?", answer: "We deliver editable diagrams in Draw.io, Lucidchart, PlantUML, or Enterprise Architect formats." },
          { question: "Can you help design microservices for my project?", answer: "Yes! We specialize in distributed system design, API gateway routing, and database sharding patterns." }
        ]}
      />
    </main>
  );
}
