import React from 'react';
import { BarChart3, Database, PieChart, ExternalLink, CheckCircle, UserCheck, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function DataAnalysisServicePage() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Data Analysis & Statistical Modeling | Boffin Global Services"
        description="Expert statistical analysis, SPSS, R, Python, and Stata support for academic research, dissertations, and business intelligence projects."
        keywords="data analysis service, SPSS help, R programming analysis, statistical modeling, research methodology, quantitative analysis"
        canonicalUrl="/data-analysis"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">Statistical Research & Analytics</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Advanced Data Analysis & Statistical Modeling
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Transform raw datasets into publication-grade insights. Our expert statisticians deliver rigorous quantitative and qualitative analysis using SPSS, R, Python, Stata, and NVivo with complete methodology chapters and APA-formatted tables.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content & Tutorial Section */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-blue-700" size={28} />
              Subject Specialist Methodology & Statistician Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our data analysis team consists of quantitative researchers and PhD biostatisticians with extensive peer-reviewed publishing experience. We ensure assumption testing (normality, homoscedasticity, multicollinearity) is conducted prior to executing regressions or structural equation models.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-blue-700" />
                  Hypothesis Testing & ANOVA
                </h3>
                <p className="text-sm text-slate-600">Independent t-tests, ANOVA, ANCOVA, Chi-Square, and non-parametric equivalents.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-blue-700" />
                  Regression & SEM
                </h3>
                <p className="text-sm text-slate-600">Multiple linear regression, logistic regression, panel data analysis, and structural equation modeling.</p>
              </div>
            </div>
          </div>

          {/* How We Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-blue-700" size={28} />
              How We Execute: Our 5-Step Statistical Analysis Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-blue-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Data Cleaning & Preparation:</strong> Handling missing values, outlier detection, and data transformation.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-blue-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Assumption Testing:</strong> Running tests for normality, linearity, and homoscedasticity.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-blue-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Primary Model Execution:</strong> Executing regressions, ANOVA, or SEM in SPSS, R, Python, or Stata.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-blue-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>APA Table & Figure Generation:</strong> Formatting results into professional APA 7th edition tables and charts.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-blue-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Result Interpretation & Reporting:</strong> Drafting comprehensive findings and managerial/academic implications.
                </div>
              </div>
            </div>
          </div>

          {/* Statistical Script Walkthrough */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Database className="text-blue-700" size={28} />
              Statistical Script Walkthrough (Python & R)
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Example of checking assumptions and executing Ordinary Least Squares (OLS) regression with robust standard errors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h4 className="text-slate-900 font-bold mb-2 text-sm">Python (StatsModels) OLS</h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded text-xs overflow-x-auto font-mono">
{`import statsmodels.api as sm
import pandas as pd

df = pd.read_csv('data.csv')
X = sm.add_constant(df[['x1', 'x2']])
model = sm.OLS(df['y'], X).fit()
print(model.summary())`}
                </pre>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                <h4 className="text-slate-900 font-bold mb-2 text-sm">R (tidyverse) Regression</h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded text-xs overflow-x-auto font-mono">
{`library(tidyverse)
data <- read_csv("data.csv")
model <- lm(y ~ x1 + x2, data = data)
summary(model)
car::vif(model)`}
                </pre>
              </div>
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-blue-700" size={28} />
              Explore Related Research & Writing Services
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Pair your data analysis report with our comprehensive dissertation and academic assignment writing services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/dissertation-help-service" className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Dissertation & Thesis Help</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/citation-generator" className="p-3 bg-slate-50 hover:bg-blue-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Free Citation Generator</span> <span>→</span>
              </Link>
            </div>
          </div>

          {/* External Authoritative References */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-blue-700" size={28} />
              Statistical Standards & Repositories
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://cran.r-project.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                CRAN R Project <ExternalLink size={14} />
              </a>
              <a href="https://www.ibm.com/spss" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                IBM SPSS Statistics <ExternalLink size={14} />
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
        title="Data Analysis FAQs"
        leftFaqs={[
          { question: "What statistical software do you support?", answer: "We support SPSS, R, Python (Pandas/Statsmodels/Scikit-Learn), Stata, SAS, and NVivo for qualitative research." },
          { question: "Do you provide interpretation of the results?", answer: "Yes! Every analysis comes with a complete report explaining statistical findings in clear, APA-compliant language." }
        ]}
      />
    </main>
  );
}
