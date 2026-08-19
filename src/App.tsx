import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import ArticleDetail from './pages/ArticleDetail';
import CookiePolicy from './pages/CookiePolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Experts from './pages/Experts';
import Reviews from './pages/Reviews';
import Writers from './pages/Writers';
import Samples from './pages/Samples';
import About from './pages/About';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import TrackOrder from './components/TrackOrder';
import MyAssignments from './pages/MyAssignments';
import LearningResources from './pages/LearningResources';
import Profile from './pages/Profile';
import MyFinances from './pages/MyFinances';
import LoyaltyPoints from './pages/LoyaltyPoints';
import CompletedSolutions from './pages/CompletedSolutions';
import NewAssignment from './pages/NewAssignment';
import ProtectedRoute from './components/ProtectedRoute';
import HireWriter from './pages/HireWriter';
import Contact from './pages/Contact';
import WordCounter from './pages/WordCounter';
import GrammarChecker from './pages/GrammarChecker';
import EssayEditing from './pages/EssayEditing';
import EssayWritingService from './pages/EssayWritingService';
import MBAEssayWriting from './pages/MBAEssayWriting';
import EssayHelp from './pages/EssayHelp';
import ResearchProposal from './pages/ResearchProposal';
import ResearchPaper from './pages/ResearchPaper';
import GhostWriter from './pages/GhostWriter';
import DissertationHelp from './pages/DissertationHelp';
import ProgrammingHelp from './pages/ProgrammingHelp';
import OnlineClassHelp from './pages/OnlineClassHelp';
import Undergraduate from './pages/UnderDevelopment';
import HomeworkHelp from './pages/HomeworkHelp';
import AssessmentHelp from './pages/AssessmentHelp';
import DoMyHomework from './pages/DoMyHomework';
import PaySomeoneToDoMyHomework from './pages/PaySomeoneToDoMyHomework';
import OnlineExamHelp from './pages/OnlineExamHelp';
import CaseStudyHelp from './pages/CaseStudyHelp';
import TermPaperHelp from './pages/TermPaperHelp';
import PowerpointHelp from './pages/PowerpointHelp';
import ThesisHelp from './pages/ThesisHelp';
import CourseworkHelp from './pages/CourseworkHelp';
import PlagiarismChecker from './pages/PlagiarismChecker';
import EssayTyper from './pages/EssayTyper';
import EssayChecker from './pages/EssayChecker';
import ParaphrasingTool from './pages/ParaphrasingTool';
import CitationGenerator from './pages/CitationGenerator';
import CitationDetail from './pages/CitationDetail';
import Blog from './pages/Blog';
import RevisionRefundPolicy from './pages/RevisionRefundPolicy';
import RefundPolicy from './pages/RefundPolicy';
import DiscountPolicy from './pages/DiscountPolicy';
import ConfidentialityPolicy from './pages/ConfidentialityPolicy';
import FairUsePolicy from './pages/FairUsePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Faqs from './pages/Faqs';
import Faq from './pages/Faq';
import HowItWorksPage from './pages/HowItWorksPage';
import Offers from './pages/Offers';
import Pricing from './pages/Pricing';
import OtherTools from './pages/OtherTools';
import FactoringCalculator from './pages/FactoringCalculator';
import PdfSummarizer from './pages/PdfSummarizer';
import Australia from './pages/Australia';
import UK from './pages/UK';
import USA from './pages/USA';
import Canada from './pages/Canada';
import CountryLanding from './pages/CountryLanding';
import CodeDebugging from './pages/CodeDebugging';
import DataAnalysisServicePage from './pages/DataAnalysisServicePage';
import EngineeringSimulationsPage from './pages/EngineeringSimulationsPage';
import SolidWorks from './pages/SolidWorks';
import SoftwareArchitecturePage from './pages/SoftwareArchitecturePage';
import TechnicalDocumentationPage from './pages/TechnicalDocumentationPage';
import AssignmentGuidancePage from './pages/AssignmentGuidancePage';
import AssignmentHelp from './pages/AssignmentHelp';
import SubjectPage from './pages/SubjectPage';
import CategoryHubPage from './pages/CategoryHubPage';
import UnderConstruction from './pages/UnderConstruction';
import ScrollToHashElement from './components/ScrollToTop';
import BrandLogo from './components/BrandLogo';
import TermsModal from './components/TermsModal';
import Footer from './components/Footer';
import DiscountBanner from './components/DiscountBanner';
import PortalLayout from './components/PortalLayout';
import Order from './pages/Order';
import OrderPlaced from './pages/OrderPlaced';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './components/AdminRoute';
import AdminChat from './pages/AdminChat';

import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/log-in.html' || location.pathname === '/signup' || location.pathname === '/registration.html' || location.pathname === '/registration' || location.pathname === '/register' || location.pathname === '/order';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isPortalPage = location.pathname.startsWith('/portal') || location.pathname === '/dashboard';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col relative overflow-x-hidden">
      {!isLoginPage && !isPortalPage && !isAdminPage && <Navbar />}
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/writers" element={<Writers />} />
          <Route path="/writers/*" element={<Writers />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/hire" element={<HireWriter />} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
          <Route path="/order-placed" element={<OrderPlaced />} />
          <Route path="/admin/chat" element={<AdminRoute><AdminLayout><AdminChat /></AdminLayout></AdminRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/log-in.html" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/registration.html" element={<Registration />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<ProtectedRoute><PortalLayout><StudentDashboard /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/dashboard" element={<ProtectedRoute><PortalLayout><StudentDashboard /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/track" element={<ProtectedRoute><PortalLayout><TrackOrder /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/new-assignment" element={<ProtectedRoute><PortalLayout><NewAssignment /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/assignments" element={<ProtectedRoute><PortalLayout><MyAssignments /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/resources" element={<ProtectedRoute><PortalLayout><LearningResources /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/profile" element={<ProtectedRoute><PortalLayout><Profile /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/finances" element={<ProtectedRoute><PortalLayout><MyFinances /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/loyalty" element={<ProtectedRoute><PortalLayout><LoyaltyPoints /></PortalLayout></ProtectedRoute>} />
          <Route path="/portal/completed" element={<ProtectedRoute><PortalLayout><CompletedSolutions /></PortalLayout></ProtectedRoute>} />
          <Route path="/homework" element={<HomeworkHelp />} />
          <Route path="/assessment-help" element={<AssessmentHelp />} />
          <Route path="/do-my-homework" element={<DoMyHomework />} />
          <Route path="/pay-someone-to-do-my-homework" element={<PaySomeoneToDoMyHomework />} />
          <Route path="/online-exam-help" element={<OnlineExamHelp />} />
          <Route path="/case-study-help" element={<CaseStudyHelp />} />
          <Route path="/term-paper-help" element={<TermPaperHelp />} />
          <Route path="/powerpoint-help" element={<PowerpointHelp />} />
          <Route path="/thesis-help" element={<ThesisHelp />} />
          <Route path="/coursework" element={<CourseworkHelp />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/pdf-summarizer" element={<PdfSummarizer />} />
          <Route path="/samples" element={<Samples />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
          <Route path="/essay-typer" element={<EssayTyper />} />
          <Route path="/paraphrasing-tool" element={<ParaphrasingTool />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/essay-checker" element={<EssayChecker />} />
          <Route path="/essay-writing-service" element={<EssayWritingService />} />
          <Route path="/essay-editing-service" element={<EssayEditing />} />
          <Route path="/mba-essay-writing-service" element={<MBAEssayWriting />} />
          <Route path="/essay-help" element={<EssayHelp />} />
          <Route path="/research-proposal-service" element={<ResearchProposal />} />
          <Route path="/research-paper-service" element={<ResearchPaper />} />
          <Route path="/ghost-writer-service" element={<GhostWriter />} />
          <Route path="/dissertation-help-service" element={<DissertationHelp />} />
          <Route path="/programming-help-service" element={<ProgrammingHelp />} />
          <Route path="/online-class-help-service" element={<OnlineClassHelp />} />
          <Route path="/code-debugging" element={<CodeDebugging />} />
          <Route path="/data-analysis" element={<DataAnalysisServicePage />} />
          <Route path="/engineering-simulations" element={<EngineeringSimulationsPage />} />
          <Route path="/solidworks" element={<SolidWorks />} />
          <Route path="/software-architecture" element={<SoftwareArchitecturePage />} />
          <Route path="/technical-documentation" element={<TechnicalDocumentationPage />} />
          <Route path="/assignment-guidance" element={<AssignmentGuidancePage />} />
          <Route path="/assignment-help" element={<AssignmentHelp />} />
          <Route path="/engineering-services" element={<CategoryHubPage />} />
          <Route path="/data-analysis-services" element={<CategoryHubPage />} />
          <Route path="/programming-services" element={<CategoryHubPage />} />
          <Route path="/business-services" element={<CategoryHubPage />} />
          <Route path="/subject/:subjectId" element={<SubjectPage />} />
          <Route path="/factoring-calculator" element={<FactoringCalculator />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/citation-generator" element={<CitationGenerator />} />
          <Route path="/apa-citation" element={<CitationDetail />} />
          <Route path="/chicago-citation" element={<CitationDetail />} />
          <Route path="/harvard-citation" element={<CitationDetail />} />
          <Route path="/mla-citation" element={<CitationDetail />} />
          <Route path="/vancouver-citation" element={<CitationDetail />} />
          <Route path="/oxford-citation" element={<CitationDetail />} />
          <Route path="/other-tools" element={<OtherTools />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/cookie-policy.html" element={<CookiePolicy />} />
          <Route path="/discount-policy" element={<DiscountPolicy />} />
          <Route path="/discount-policy.html" element={<DiscountPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/refund-policy.html" element={<RefundPolicy />} />
          <Route path="/confidentiality-policy" element={<ConfidentialityPolicy />} />
          <Route path="/confidentiality-policy.html" element={<ConfidentialityPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
          <Route path="/revision-refund-policy" element={<RevisionRefundPolicy />} />
          <Route path="/fair-use-policy" element={<FairUsePolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/terms-and-conditions.html" element={<TermsAndConditions />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/ca" element={<Canada />} />
          <Route path="/au" element={<Australia />} />
          <Route path="/my" element={<CountryLanding countryName="Malaysia" countryCode="MY" adjective="Malaysian" institutions={['University of Malaya', 'UTM', 'Monash Malaysia', 'Taylor\'s University']} stats={{ experts: '300+', score: '4.8' }} seoContent1="Studying in Malaysia offers a unique blend of Asian tradition and international academic standards. We provide specialized coursework help for Malaysian universities." seoContent2="Trust boffinglobalgroup.com for original, human-crafted academic excellence in Malaysia." />} />
          <Route path="/sg" element={<CountryLanding countryName="Singapore" countryCode="SG" adjective="Singaporean" institutions={['NUS', 'NTU', 'SMU', 'SUTD', 'SIM']} stats={{ experts: '400+', score: '4.9' }} seoContent1="Singaporean universities maintain some of the highest academic standards globally. Our experts help you navigate the rigorous curriculum." seoContent2="Your academic bridge to excellence in Singapore." />} />
          <Route path="/hk" element={<CountryLanding countryName="Hong Kong" countryCode="HK" adjective="Hong Kong" institutions={['HKU', 'CUHK', 'HKUST', 'PolyU']} stats={{ experts: '350+', score: '4.8' }} seoContent1="Master your Hong Kong university curriculum with professional model solutions and expert guidance." seoContent2="Confidential and quality-driven academic help for Hong Kong scholars." />} />
          <Route path="/in" element={<CountryLanding countryName="India" countryCode="IN" adjective="Indian" institutions={['IITs', 'IIMs', 'Delhi University', 'BITS Pilani']} stats={{ experts: '1500+', score: '4.9' }} seoContent1="High-quality assignment and research help for the competitive Indian academic landscape." seoContent2="Empowering Indian scholars with global academic standards." />} />
          <Route path="/mv" element={<CountryLanding countryName="Maldives" countryCode="MV" adjective="Maldivian" institutions={['MNU', 'Villa College']} stats={{ experts: '40+', score: '4.7' }} seoContent1="Dedicated academic assistance for students in the Maldives, supporting higher education growth." seoContent2="Your reliable bridge to academic excellence in the Maldives." />} />
          <Route path="/uk" element={<UK />} />
          <Route path="/ie" element={<CountryLanding countryName="Ireland" countryCode="IE" adjective="Irish" institutions={['Trinity College Dublin', 'UCD', 'UCC', 'DCU']} stats={{ experts: '250+', score: '4.7' }} seoContent1="Professional academic support for Ireland\'s top universities, tailored to regional standards." seoContent2="Your partner for academic success in the Republic of Ireland." />} />
          <Route path="/nz" element={<CountryLanding countryName="New Zealand" countryCode="NZ" adjective="New Zealand" institutions={['University of Auckland', 'Otago', 'Canterbury']} stats={{ experts: '200+', score: '4.8' }} seoContent1="Get expert help for the unique New Zealand university curriculum and grading rubrics." seoContent2="Achieve excellence in New Zealand with boffinglobalgroup.com." />} />
          <Route path="/se" element={<CountryLanding countryName="Sweden" countryCode="SE" adjective="Swedish" institutions={['Lund University', 'Uppsala University', 'KTH']} stats={{ experts: '180+', score: '4.8' }} seoContent1="Professional academic writing support for international students in Sweden." seoContent2="Supporting academic excellence in Northern Europe." />} />
          <Route path="/ae" element={<CountryLanding countryName="UAE" countryCode="AE" adjective="UAE" institutions={['Khalifa University', 'Zayed University', 'NYU Abu Dhabi']} stats={{ experts: '150+', score: '4.9' }} seoContent1="Elite academic support for students in the UAE, catering to both local and international branches." seoContent2="Excellence in education across Dubai, Abu Dhabi, and beyond." />} />
          <Route path="/sa" element={<CountryLanding countryName="Saudi Arabia" countryCode="SA" adjective="Saudi" institutions={['King Saud University', 'KAUST', 'King Khalid University']} stats={{ experts: '100+', score: '4.9' }} seoContent1="Supporting the academic vision of students in Saudi Arabia with high-quality, professional assignment help." seoContent2="Your trusted partner for academic success in the Kingdom of Saudi Arabia." />} />
          <Route path="/gh" element={<CountryLanding countryName="Ghana" countryCode="GH" adjective="Ghanaian" institutions={['University of Ghana', 'KNUST', 'UCC Ghana']} stats={{ experts: '120+', score: '4.7' }} seoContent1="Premium academic support for students in Ghana, ensuring excellence across all departments." seoContent2="Bridging the gap to academic success for Ghanaian scholars." />} />
          <Route path="/qa" element={<CountryLanding countryName="Qatar" countryCode="QA" adjective="Qatari" institutions={['Qatar University', 'Texas A&M Qatar', 'Weill Cornell Qatar']} stats={{ experts: '80+', score: '4.8' }} seoContent1="Elite assignment help for students in Qatar, tailored to international standards." seoContent2="Empowering the next generation of leaders in Qatar." />} />
          <Route path="/za" element={<CountryLanding countryName="South Africa" countryCode="ZA" adjective="South African" institutions={['UCT', 'Wits', 'Stellenbosch University']} stats={{ experts: '200+', score: '4.7' }} seoContent1="Professional assignment help for the leading universities in South Africa." seoContent2="Supporting the next generation of South African scholars." />} />
          <Route path="/kw" element={<CountryLanding countryName="Kuwait" countryCode="KW" adjective="Kuwaiti" institutions={['Kuwait University', 'AUK', 'GUST']} stats={{ experts: '70+', score: '4.8' }} seoContent1="Professional academic assistance for scholars in Kuwait, adhering to rigorous standards." seoContent2="Your academic companion in the State of Kuwait." />} />
          <Route path="/om" element={<CountryLanding countryName="Oman" countryCode="OM" adjective="Omani" institutions={['Sultan Qaboos University', 'German University of Technology']} stats={{ experts: '60+', score: '4.8' }} seoContent1="High-quality assignment writing services for students across Oman." seoContent2="Dedicated to academic integrity and success in Oman." />} />
          <Route path="/me" element={<CountryLanding countryName="Middle East" countryCode="ME" adjective="Middle Eastern" institutions={['Various Regional Institutions']} stats={{ experts: '500+', score: '4.8' }} seoContent1="Comprehensive academic support for scholars across the Middle East." seoContent2="Your dedicated partner for Middle Eastern academic excellence." />} />
        </Routes>
      </div>



      {!isLoginPage && !isPortalPage && !isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ScrollToHashElement />
          <AppContent />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}
