import React from 'react';
import { Terminal, Bug, ShieldCheck, ExternalLink, Code2, Cpu, CheckCircle, UserCheck, Layers, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function CodeDebugging() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Code Debugging & Optimization Services | Boffin Global Services"
        description="Eliminate runtime errors, memory leaks, and logic bottlenecks with expert code debugging and optimization services. Trusted by students and developers worldwide."
        keywords="code debugging, bug fixing service, optimize code, python debugger, java error fix, algorithm troubleshooting"
        canonicalUrl="/code-debugging"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Engineering & Debugging Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Expert Code Debugging & Performance Tuning
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Stuck with persistent segmentation faults, null pointer exceptions, concurrency race conditions, or failing test suites? Our senior software engineers provide rigorous code debugging, complexity reduction, and memory optimization across all major programming languages.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content & Tutorial Section directly after hero */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Coding Starter Kit & Debugging Handbook (Inspired by Codementor Coding Starter Kit) */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Complete Handbook</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-4">
                The Coding Starter Kit
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                From answering the most basic programming questions to helping you figure out which language you should start with and free tutorials, the Coding Starter Kit is your one-stop shop to learn programming.
              </p>
            </div>

            {/* Section 1: Coding 101 */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="text-amber-600" size={22} />
                Coding 101: Fundamentals
              </h3>
              <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">What does it mean: front-end, back-end, full-stack?</h4>
                  <p className="text-slate-600">
                    Most websites have two parts: what you see and behind the scenes. Front-end is responsible for everything users see and interact with. Back-end refers to the website's internal workings: a server, an application, and a database. Full-stack developers are fluent in both front- and back-end.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">I have a coding question. What should I do?</h4>
                  <p className="text-slate-600">
                    Chances are people have asked the same question and shared their answers online. Websites like StackOverflow can be viewed as an encyclopedia while Reddit threads, such as r/learnprogramming, are welcoming to beginners. You can also work with a mentor who will guide you through the problem.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">What is open source?</h4>
                  <p className="text-slate-600">
                    Open source code is designed to be publicly accessible. Anyone can see, contribute, modify, and distribute the code as they see fit. Many open source projects are hosted on GitHub. Popular open source projects include Firefox, WordPress, Linux, and MySQL.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">What is version control, Git, and GitHub?</h4>
                  <p className="text-slate-600">
                    Version control is essentially a history of your code — you can view earlier versions to compare changes. Tools such as Git keep track of your modifications in a special kind of database. GitHub is a cloud-based service that makes it easy to use Git for version control and collaboration.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">What's a code editor, and which one should I use?</h4>
                  <p className="text-slate-600">
                    A code editor is like Google Docs, but specifically for coding. The only two features you truly need are the ability to write text and save that text to a file. Some popular ones are Visual Studio Code, Atom, and Vim.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Web Development */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="text-amber-600" size={22} />
                Web Development Track (HTML, JavaScript, React, Node.js)
              </h3>
              <p className="text-sm text-slate-600">
                Web development is the art of building and maintaining websites. It's composed of the front-end (user-facing side) and back-end (server side). Popular front-end languages include HTML, JavaScript, and React, with Node.js as a popular back-end choice.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">HTML</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">The most basic building block of the Web. Combined with CSS for styling and JavaScript for interactivity.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">JavaScript</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Versatile, beginner-friendly language supporting both front-end and back-end development when used with Node.js.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">React</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Powerful JavaScript library with a low entry barrier used to build interactive UIs on single-page applications.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Node.js</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Great starting point for full-stack developers using JavaScript for back-end server architecture and high performance.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Data Science & Analytics */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="text-amber-600" size={22} />
                Data Science & Analytics Track (SQL & Python)
              </h3>
              <p className="text-sm text-slate-600">
                Data Science focuses on finding actionable insights from large sets of raw data using Python. Data Analytics is more focused on existing datasets to find solutions using SQL.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">SQL</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Special-purpose programming language used to interact with databases for data mining and manipulation.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Python</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Great beginner language with clean syntax, widely used for data science, machine learning, and AI.</p>
                </div>
              </div>
            </div>

            {/* Section 4: Mobile App Development */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="text-amber-600" size={22} />
                Mobile App Track (Swift & Kotlin)
              </h3>
              <p className="text-sm text-slate-600">
                Native apps are designed specifically for iOS (written in Swift) or Android (written in Kotlin).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Swift</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Designed for iOS development with simplicity, efficiency, and instant playground feedback.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Kotlin</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Supported by Google for building Android apps with straightforward syntax and full Java interoperability.</p>
                </div>
              </div>
            </div>

            {/* Mentorship Banner */}
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Need 1-on-1 Debugging Mentorship?</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Within 15 minutes, get connected with an expert engineer who will review your code, point out errors, and guide you through solutions.
                </p>
              </div>
              <Link to="/order" className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shadow-md transition-colors">
                Find an Expert
              </Link>
            </div>
          </div>

          {/* How We Write / Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-amber-600" size={28} />
              How We Execute: Our 5-Step Debugging Protocol
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Reproduction Suite:</strong> Isolating the bug in a minimal reproducible example (MRE) or test harness.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Root Cause Trace:</strong> Inspecting stack traces, core dumps, and variable states during execution.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Patch Formulation:</strong> Writing robust fixes that preserve existing APIs and side-effects.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Regression Testing:</strong> Running full unit and integration test suites to prevent side effects.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Code Walkthrough Report:</strong> Delivering detailed explanations of why the bug occurred and how it was fixed.
                </div>
              </div>
            </div>
          </div>

          {/* Case Study / Code Example */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Code2 className="text-amber-600" size={28} />
              Case Study: Algorithmic Refactoring ($O(n^2)$ to $O(n)$)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Below is a practical example of how our engineers refactor nested loops into hash-set lookups, drastically reducing time complexity for large datasets.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50/50 border border-red-200 p-5 rounded-xl">
                <h4 className="text-red-700 font-bold mb-2 text-sm">❌ Unoptimized ($O(n^2)$)</h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded text-xs overflow-x-auto font-mono">
{`def find_duplicates(arr):
    dups = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in dups:
                dups.append(arr[i])
    return dups`}
                </pre>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-xl">
                <h4 className="text-emerald-700 font-bold mb-2 text-sm">✅ Optimized ($O(n)$)</h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded text-xs overflow-x-auto font-mono">
{`def find_duplicates_optimized(arr):
    seen, dups = set(), set()
    for item in arr:
        if item in seen:
            dups.add(item)
        else:
            seen.add(item)
    return list(dups)`}
                </pre>
              </div>
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-amber-600" size={28} />
              Explore Related Services & Technical Tools
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Enhance your programming assignments and software projects with our dedicated developer support services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/software-architecture" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Software Architecture & UML</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Documentation & APIs</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
            </div>
          </div>

          {/* External References */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-amber-600" size={28} />
              Software Engineering Standards & Portals
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                MDN Web Docs <ExternalLink size={14} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                GitHub Repositories <ExternalLink size={14} />
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
        title="Code Debugging FAQs"
        leftFaqs={[
          { question: "How quickly can you debug my code?", answer: "We offer expedited turnaround times as fast as 3-6 hours for urgent programming assignments and failing builds." },
          { question: "Do you explain how the bug was fixed?", answer: "Yes! Every debugging order includes a detailed breakdown of the root cause and inline comments explaining the fix." }
        ]}
      />
    </main>
  );
}
