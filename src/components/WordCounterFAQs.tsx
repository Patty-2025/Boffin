import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Can I count words in a PDF file using your word counter?",
    answer: "Our tool is designed to help you easily check the total word count or average sentence length in a PDF file. Simply upload the PDF file to the tool and use the check option. Your documents will be processed similarly, and you'll get accurate results instantly, even for other languages."
  },
  {
    question: "How to use your word counter or character count online tool?",
    answer: "Counting words or characters on our tool is incredibly easy. If you desire to count words in sentences or passages, all you need to do is –\n\n● Paste the text in the empty text box\n\n● Choose the font and font size or other languages\n\n● Select the line spacing\n\nOnce you provide all the details, the counter accurately estimates the number of characters, words, and syllables in sentences or passages. It can also do a grammar check simultaneously."
  },
  {
    question: "What is a word counter?",
    answer: "A word counter or character counter tool is a web-based utility designed to help users track numerous metrics related to written content. These include the total number of words, syllables, sentences, characters, paragraphs, and the likes."
  },
  {
    question: "How do I know the number of words I have written?",
    answer: "You can count the words you've written by simply accessing our calculator and entering your text in the text box. As a result, the count of words and other information will be shown on your screen immediately."
  }
];

interface FAQItemProps {
  faq: { question: string; answer: string; };
  index: number;
  openIndex: number | null;
  toggleIndex: (index: number) => void;
  key?: number | string;
}

const FAQItem = ({ faq, index, openIndex, toggleIndex }: FAQItemProps) => (
  <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-sm">
    <button
      onClick={() => toggleIndex(index)}
      className="w-full text-left p-5 sm:p-6 flex justify-between items-center group"
    >
      <span className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
        {faq.question}
      </span>
      <ChevronDown 
        size={20} 
        className={`text-slate-400 shrink-0 ml-4 transition-transform duration-300 ${
          openIndex === index ? 'rotate-180' : ''
        }`} 
      />
    </button>
    
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
      openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <div className="p-6 text-slate-500 text-sm leading-relaxed border-t border-slate-100 whitespace-pre-line">
        {faq.answer}
      </div>
    </div>
  </div>
);

export default function WordCounterFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pt-2 pb-12 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900 mb-8 sm:mb-12 uppercase tracking-tighter">
          FAQ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {faqs.slice(0, 2).map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                openIndex={openIndex} 
                toggleIndex={toggleIndex} 
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {faqs.slice(2).map((faq, index) => (
              <FAQItem 
                key={index + 2} 
                faq={faq} 
                index={index + 2} 
                openIndex={openIndex} 
                toggleIndex={toggleIndex} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
