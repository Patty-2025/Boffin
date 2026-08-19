import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const leftQuestions = [
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
  },
  {
    question: "How do I use a grammar and punctuation checker?",
    answer: "Using our grammar and punctuation checker is simple. Just paste your writing into the tool. It will instantly analyze your text and underline errors. Click on the highlighted text to see suggested corrections and apply them with a single click."
  },
  {
    question: "Is this grammar checker safe for confidential university research?",
    answer: "Yes. We take your privacy very seriously. Any text you check using our tool is processed securely and is never stored, shared, or used to train public AI models. Your confidential research remains completely private."
  },
  {
    question: "How do I change passive voice to active voice in an essay?",
    answer: "Our grammar checker includes stylistic suggestions that can identify passive voice constructions. When it detects passive voice, it will often provide a suggestion to rewrite the sentence in active voice, making your writing clearer and more engaging."
  }
];

const rightQuestions = [
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
  },
  { 
    question: "Can your tool correct my sentence online for free?", 
    answer: "Yes, our tool can correct individual sentences or entire paragraphs online for free. It provides instant feedback and correction suggestions." 
  },
  { 
    question: "Is there an online grammar check for high school students?", 
    answer: "Our grammar checker is perfectly suited for high school students. It helps them catch common mistakes, learn from their errors, and submit better-written homework and essays." 
  },
  { 
    question: "Does the tool help with passive voice and sentence flow?", 
    answer: "Yes, beyond basic grammar and spelling, our tool offers stylistic suggestions that help improve sentence flow, clarity, and the transition from passive to active voice." 
  },
  { 
    question: "What is the difference between a grammar checker and a proofreading tool?", 
    answer: "A grammar checker primarily focuses on identifying rules of language (subject-verb agreement, punctuation, spelling). A proofreading tool or service often goes deeper, looking at the overall flow, tone, structure, and clarity of the entire document." 
  }
];

export default function GrammarCheckerFAQSection() {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const toggleLeft = (index: number) => {
    setOpenLeft(openLeft === index ? null : index);
    setOpenRight(null);
  };

  const toggleRight = (index: number) => {
    setOpenRight(openRight === index ? null : index);
    setOpenLeft(null);
  };

  return (
    <section className="pt-0 pb-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.10] w-full mb-10 pt-10">
          FAQs
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {leftQuestions.map((q, i) => (
            <div 
              key={`left-${i}`}
              className="border border-slate-200 rounded-md bg-[#f8f9fa] overflow-hidden"
            >
              <button
                 onClick={() => toggleLeft(i)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-100 transition-colors"
                aria-expanded={openLeft === i}
              >
                <span className="font-semibold text-sm text-[#333333] pr-4">{q.question}</span>
                {openLeft === i ? (
                  <ChevronUp className="text-[#666666] shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-[#666666] shrink-0" size={20} />
                )}
              </button>
              
              {openLeft === i && (
                <div className="p-4 pt-0 text-[#666666] text-sm leading-relaxed border-t border-slate-100 bg-white">
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-4">
          {rightQuestions.map((q, i) => (
            <div 
              key={`right-${i}`}
              className="border border-slate-200 rounded-md bg-[#f8f9fa] overflow-hidden"
            >
              <button
                onClick={() => toggleRight(i)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-100 transition-colors"
                aria-expanded={openRight === i}
              >
                <span className="font-semibold text-sm text-[#333333] pr-4">{q.question}</span>
                {openRight === i ? (
                  <ChevronUp className="text-[#666666] shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-[#666666] shrink-0" size={20} />
                )}
              </button>

              {openRight === i && (
                <div className="p-4 pt-0 text-[#666666] text-sm leading-relaxed border-t border-slate-100 bg-white">
                  {q.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
