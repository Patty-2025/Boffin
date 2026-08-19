import React, { useState, useEffect, useRef } from 'react';
import { 
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, 
  Indent, Outdent, Eraser, HelpCircle, ChevronDown,
  ClipboardPaste, FileUp, Bot, Search, Loader2, CheckCircle2, AlertTriangle, Zap, Sparkles, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI, Type } from '@google/genai';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import GrammarCheckerContent from '../components/GrammarCheckerContent';
import GrammarCheckerFAQSection from '../components/GrammarCheckerFAQSection';

interface GrammarIssue {
  original: string;
  replacement: string;
  type: string;
  message: string;
}

const grammarFaqs = {
  left: [
    {
      question: "How can I check my grammar for free?",
      answer: "You can check your grammar for free using our online grammar checker tool. Simply paste your text into the text box and the tool will automatically highlight grammatical errors and suggest corrections."
    },
    {
      question: "How do I fix my grammar in a PDF document?",
      answer: "To fix grammar in a PDF document, you first need to convert or copy the text from the PDF. Paste the extracted text into our grammar checker. Once the text is corrected, you can copy the refined text back into your document editor and save it as a new PDF."
    },
    {
      question: "Is this the best English grammar checker for college essays?",
      answer: "Yes, our grammar checker is highly optimized for academic writing. It helps you avoid embarrassing typos, corrects complex grammatical mistakes, and ensures your college essays meet academic standards."
    },
    {
      question: "Does the tool provide a free grammar and spell check?",
      answer: "Absolutely. Our tool provides a comprehensive grammar and spell check for free. It scans your text for spelling errors, punctuation mistakes, and complex grammar issues all at once."
    }
  ],
  right: [
    { 
      question: "Can I check my grammar and punctuation for free without an account?", 
      answer: "Yes, you can use our basic grammar and punctuation checking features for free without needing to create an account or provide any personal information." 
    },
    { 
      question: "Is there a reliable free online grammar checker for students?", 
      answer: "Yes, our online grammar checker is designed specifically to be a reliable and free resource for students, helping them improve their academic writing, essays, and assignments." 
    },
    { 
      question: "Can I check my word count and grammar at the same time?", 
      answer: "Yes! Our tool not only checks your grammar and spelling but also provides real-time statistics on your text, including word count and character count." 
    },
    { 
      question: "How can I tell if a sentence is grammatically correct?", 
      answer: "If you are unsure about a sentence, run it through our grammar checker. The tool uses advanced algorithms to analyze sentence structure, subject-verb agreement, and word choices to let you know if it is grammatically correct." 
    }
  ]
};

export default function GrammarChecker() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [grammarCount, setGrammarCount] = useState(0);
  const [spellCount, setSpellCount] = useState(0);
  const [styleCount, setStyleCount] = useState(0);
  const [hasHitPaywall, setHasHitPaywall] = useState(false);
  const [language, setLanguage] = useState<'US' | 'UK'>('US');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getDeviceFingerprint = () => {
    let fp = localStorage.getItem('anon_grammar_fingerprint');
    if (!fp) {
      fp = `anon_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
      localStorage.setItem('anon_grammar_fingerprint', fp);
    }
    return fp;
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const handlePaste = async () => {
    if (hasHitPaywall) return;
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText((prev) => prev + clipboardText);
        if (editorRef.current) {
          if (!editorRef.current.innerText.trim()) {
            editorRef.current.innerHTML = clipboardText.replace(/\n/g, '<br>');
          } else {
            editorRef.current.innerText += clipboardText;
          }
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasHitPaywall) return;
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain" || file.name.endsWith('.md') || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
        if (editorRef.current) {
          editorRef.current.innerText = content;
        }
      };
      reader.readAsText(file);
    } else {
       const simulatedText = `[Simulated text extraction from ${file.name}]\n\nHe was bitten by the dog. Therefore, there going to the store but its closed.`;
       setText(simulatedText);
       if (editorRef.current) {
         editorRef.current.innerText = simulatedText;
       }
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const checkAndIncrementUsage = async (): Promise<boolean> => {
    try {
      const fp = getDeviceFingerprint();
      const docRef = doc(db, 'grammarCheckerLimits', fp);
      
      const docSnapPromise = getDoc(docRef);
      const timeoutPromise = new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error("Timeout")), 10000)
      );

      const docSnap = await Promise.race([docSnapPromise, timeoutPromise]) as any;

      if (!docSnap) return true; 

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.analysesUsed >= 5) {
          setHasHitPaywall(true);
          setIssues([{
            original: "Free Trial Expired",
            replacement: "Sign up to continue",
            type: "System Error",
            message: "You have used all 5 of your free grammar checks. Please create a free account to unlock unlimited grammar checking."
          }]);
          return false;
        } else {
          await updateDoc(docRef, {
            analysesUsed: increment(1),
            updatedAt: new Date().toISOString()
          });
          return true;
        }
      } else {
        await setDoc(docRef, {
          userId: fp,
          analysesUsed: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        return true;
      }
    } catch (error) {
      return true;
    }
  };

  const analyzeText = async (content: string) => {
    if (content.trim().split(/\s+/).length < 5) return;
    if (hasHitPaywall) return;
    
    setIsAnalyzing(true);
    setIssues([]);

    const canProceed = await checkAndIncrementUsage();
    if (!canProceed) {
      setIsAnalyzing(false);
      return;
    }
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "undefined") {
        setIssues([{
          original: "API Key Missing",
          replacement: "Configure Key",
          type: "System Error",
          message: "The Gemini API key is missing."
        }]);
        setIsAnalyzing(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze text in ${language === 'US' ? 'US' : 'UK'} English: "${content}"`,
        config: {
          systemInstruction: `Perform in-depth analysis of text for ${language}. Return JSON array of objects with keys: original, replacement, type, message.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                replacement: { type: Type.STRING },
                type: { type: Type.STRING },
                message: { type: Type.STRING }
              },
              required: ["original", "replacement", "type", "message"]
            }
          }
        }
      });
      
      const rawText = response.text || "[]";
      const parsedIssues: GrammarIssue[] = JSON.parse(rawText);
      
      setIssues(parsedIssues);
      setGrammarCount(parsedIssues.filter(i => i.type === 'grammar').length);
      setSpellCount(parsedIssues.filter(i => i.type === 'spelling').length);
      setStyleCount(parsedIssues.filter(i => !['grammar', 'spelling'].includes(i.type)).length);
    } catch (error: any) {
      setIssues([{
        original: "Analysis Failed",
        replacement: "Retry Analysis",
        type: "System Error",
        message: "An unexpected error occurred during analysis."
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (editorRef.current && text && !editorRef.current.innerText.trim()) {
      editorRef.current.innerText = text;
    }
  }, []);

  useEffect(() => {
    if (wordCount > 500) {
      setIssues([{
        original: "Word Limit Exceeded",
        replacement: "Reduce length",
        type: "System Error",
        message: `Limit is 500 words.`
      }]);
      return;
    }

    if (wordCount < 5 && issues.length > 0) {
      setIssues([]);
      setGrammarCount(0);
      setSpellCount(0);
      setStyleCount(0);
    }
  }, [text, wordCount]);

  const applyFix = (issue: GrammarIssue) => {
    setText((prev) => prev.replace(issue.original, issue.replacement));
    if (editorRef.current) {
      editorRef.current.innerHTML = editorRef.current.innerHTML.replace(issue.original, issue.replacement);
    }
    setIssues((prev) => prev.filter((i) => i.original !== issue.original));
  };

  const loadingMessages = [
    { title: "Analyzing Text...", subtitle: "Our AI is reviewing your grammar and spelling." },
    { title: "Scanning for commas...", subtitle: "Searching for those sneaky punctuation slips." },
    { title: "Polishing prose...", subtitle: "Removing passive voice and awkward phrasing." }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setLoadingMessageIndex(0);
      interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setText(editorRef.current.innerText);
    }
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    setText(e.currentTarget.innerText);
  };

  const handleEditorPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Automatic</span>
              <span className="text-blue-700 block">Grammar Checker</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Eliminate grammar errors, fix spelling mistakes, and enhance clarity instantly with our intelligent tool.
            </p>
            <TrustedLogos />
          </div>
          
           <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-6">
              <div className="flex-grow bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-[480px]">
                <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
                  <button onClick={() => executeCommand('undo')} className="p-1.5 hover:bg-white rounded text-slate-400 group relative">
                    <Undo2 size={16} />
                  </button>
                  <button onClick={() => executeCommand('redo')} className="p-1.5 hover:bg-white rounded text-slate-400">
                    <Redo2 size={16} />
                  </button>
                  <div className="w-px h-4 bg-slate-200 mx-1"></div>
                  <button onClick={() => executeCommand('bold')} className="p-1.5 hover:bg-white rounded"><Bold size={16} /></button>
                  <button onClick={() => executeCommand('italic')} className="p-1.5 hover:bg-white rounded"><Italic size={16} /></button>
                  <button onClick={() => executeCommand('underline')} className="p-1.5 hover:bg-white rounded"><Underline size={16} /></button>
                  <div className="w-px h-4 bg-slate-200 mx-1"></div>
                  <button onClick={() => setLanguage(language === 'US' ? 'UK' : 'US')} className="text-xs font-black uppercase px-2 py-1 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded">
                    ENG ({language})
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="ml-auto p-1.5 hover:bg-white rounded text-slate-400 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                    <FileUp size={14} /> Upload
                  </button>
                </div>

                <div className="relative flex-grow overflow-hidden">
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleEditorInput}
                    onPaste={handleEditorPaste}
                    className="w-full h-full p-6 outline-none text-slate-800 bg-transparent overflow-y-auto custom-scrollbar prose prose-slate max-w-none text-sm"
                  />
                  {text.length === 0 && (
                    <div className="absolute top-6 left-6 text-slate-400 pointer-events-none text-sm italic font-medium">
                      Start writing or paste text here...
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 flex items-center gap-4">
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{wordCount} / 500 Words</span>
                    <button 
                      onClick={() => analyzeText(text)}
                      disabled={isAnalyzing || !text.trim() || wordCount > 500}
                      className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 transition-all"
                    >
                      {isAnalyzing ? <Loader2 size={14} className="animate-spin"/> : <CheckCircle2 size={14}/>} Check Grammar
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 h-[480px] flex flex-col relative overflow-hidden">
                 <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-2">
                    <h5 className="text-xs font-black uppercase tracking-widest text-blue-700">Suggestions</h5>
                    <span className="text-xs font-bold text-slate-400">{issues.length} Issues</span>
                 </div>
                 <div className="flex-grow overflow-y-auto custom-scrollbar space-y-3 pr-1">
                   <AnimatePresence mode="wait">
                     {isAnalyzing ? (
                       <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center h-full text-center py-10">
                          <Loader2 className="animate-spin text-emerald-500 mb-3" size={24}/>
                          <p className="text-xs font-black text-slate-400 uppercase leading-relaxed tracking-wider">{loadingMessages[loadingMessageIndex].title}</p>
                       </motion.div>
                     ) : issues.length === 0 ? (
                       <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center justify-center h-full text-center py-10 opacity-40">
                          <ShieldCheck size={32} className="text-slate-300 mb-2"/>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Issues Found</p>
                       </motion.div>
                     ) : (
                       issues.map((issue, idx) => (
                         <motion.div 
                           key={idx}
                           initial={{opacity:0, x:10}}
                           animate={{opacity:1, x:0}}
                           className="p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-emerald-500 transition-all"
                         >
                           <p className="text-xs font-black uppercase text-slate-400 mb-1">{issue.type}</p>
                           <p className="text-xs text-slate-700 font-bold mb-2 line-through opacity-50">{issue.original}</p>
                           <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{issue.replacement}</span>
                              <button onClick={() => applyFix(issue)} className="p-1 hover:bg-emerald-500 hover:text-white rounded transition-all text-slate-400"><CheckCircle2 size={14}/></button>
                           </div>
                         </motion.div>
                       ))
                     )}
                   </AnimatePresence>
                 </div>
              </div>
           </div>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".txt,.md,.pdf,.doc,.docx" />
      </section>

      <ProfessionalWriters />
      <HowItWorks />

      <GrammarCheckerContent />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      <GrammarCheckerFAQSection />
    </main>
  );
}
