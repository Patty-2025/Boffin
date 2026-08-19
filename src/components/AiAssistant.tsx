import React, { useState } from 'react';
import { getLocalAi } from '../vendor/localAiClient';
import { Brain, Sparkles, Loader2, MessageSquare, AlertCircle, Tags, Globe, CheckCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AiAssistant: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sentiment, setSentiment] = useState<any>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [citationGaps, setCitationGaps] = useState<string[]>([]);

  const resetState = () => {
    setOutput(null);
    setSentiment(null);
    setTopics([]);
    setCitationGaps([]);
  };

  const handleFixGrammar = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    resetState();
    
    try {
      const localAi = getLocalAi();
      const result = await localAi.fixGrammar(inputText, (msg) => setLoadingMsg(msg));
      setOutput(result);
    } catch (error) {
      setOutput("Error: Could not fix grammar locally.");
    } finally {
      setIsProcessing(false);
      setLoadingMsg(null);
    }
  };

  const handleCheckCitations = () => {
    if (!inputText.trim()) return;
    resetState();
    const localAi = getLocalAi();
    const gaps = localAi.findCitationGaps(inputText);
    setCitationGaps(gaps);
    if (gaps.length === 0) {
      setOutput("Success: No obvious missing citations detected. Your claims seem well-supported or general knowledge!");
    }
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    resetState();
    
    try {
      const localAi = getLocalAi();
      const summary = await localAi.summarize(inputText, (msg) => setLoadingMsg(msg));
      setOutput(summary);
    } catch (error) {
      setOutput("Error: Could not process text locally.");
    } finally {
      setIsProcessing(false);
      setLoadingMsg(null);
    }
  };

  const handleAnalyzeSentiment = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    resetState();
    
    try {
      const localAi = getLocalAi();
      const result = await localAi.classifySentiment(inputText, (msg) => setLoadingMsg(msg));
      setSentiment(result);
    } catch (error) {
      setOutput("Error: Could not analyze text locally.");
    } finally {
      setIsProcessing(false);
      setLoadingMsg(null);
    }
  };

  const handleIdentifyTopics = async () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    resetState();
    
    try {
      const localAi = getLocalAi();
      const candidateLabels = ['Business', 'Computer Science', 'History', 'Biology', 'Social Sciences', 'Technology', 'Mathematics', 'Philosophy', 'Art'];
      const result = await localAi.identifyTopics(inputText, candidateLabels, (msg) => setLoadingMsg(msg));
      
      // Filter for top results (scores > 0.2)
      const topTopics = result.labels.filter((_: string, i: number) => result.scores[i] > 0.25);
      setTopics(topTopics.length > 0 ? topTopics : [result.labels[0]]);
    } catch (error) {
      setOutput("Error: Could not identify topics locally.");
    } finally {
      setIsProcessing(false);
      setLoadingMsg(null);
    }
  };

  const handleTranslate = async (target: string) => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    resetState();
    
    try {
      const localAi = getLocalAi();
      const result = await localAi.translate(inputText, 'en', target, (msg) => setLoadingMsg(msg));
      setOutput(result);
    } catch (error) {
      setOutput("Error: Could not translate text locally.");
    } finally {
      setIsProcessing(false);
      setLoadingMsg(null);
    }
  };

  return (
    <div id="ai-assistant-root" className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100 my-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-600 rounded-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">Free Local AI Assistant</h2>
          <p className="text-sm text-gray-500">100% Private • No Internet Required • Powered by your browser</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            id="ai-input-area"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your assignment draft or any text here..."
            className="w-full h-48 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-gray-700 placeholder:text-gray-400"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-mono">
            {inputText.length} characters
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            id="btn-summarize"
            onClick={handleSummarize}
            disabled={isProcessing || !inputText}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95 text-sm"
          >
            {isProcessing && loadingMsg?.includes('summarization') ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Summarize 
          </button>
          
          <button
            id="btn-sentiment"
            onClick={handleAnalyzeSentiment}
            disabled={isProcessing || !inputText}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 disabled:opacity-50 transition-all active:scale-95 text-sm"
          >
            {isProcessing && loadingMsg?.includes('sentiment') ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
            Check Tone
          </button>

          <button
            id="btn-grammar"
            onClick={handleFixGrammar}
            disabled={isProcessing || !inputText}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-all active:scale-95 text-sm"
          >
            {isProcessing && loadingMsg?.includes('text2text') ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            Fix Grammar
          </button>

          <button
            id="btn-citations"
            onClick={handleCheckCitations}
            disabled={isProcessing || !inputText}
            className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 border border-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 disabled:opacity-50 transition-all active:scale-95 text-sm"
          >
            <Quote className="w-4 h-4" />
            Citation Auditor
          </button>

          <button
            id="btn-topics"
            onClick={handleIdentifyTopics}
            disabled={isProcessing || !inputText}
            className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 disabled:opacity-50 transition-all active:scale-95 text-sm"
          >
            {isProcessing && loadingMsg?.includes('MNLI') ? <Loader2 className="w-4 h-4 animate-spin" /> : <Tags className="w-4 h-4" />}
            Auto-Tag Subject
          </button>

          <div className="flex items-center gap-1 ml-auto">
            <span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest">Translate to:</span>
            <button
              onClick={() => handleTranslate('fr')}
              disabled={isProcessing || !inputText}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-700 transition-colors uppercase"
            >
              FR
            </button>
            <button
              onClick={() => handleTranslate('es')}
              disabled={isProcessing || !inputText}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-700 transition-colors uppercase"
            >
              ES
            </button>
            <button
              onClick={() => handleTranslate('de')}
              disabled={isProcessing || !inputText}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-700 transition-colors uppercase"
            >
              DE
            </button>
          </div>
        </div>

        <AnimatePresence>
          {loadingMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <div className="text-sm font-medium">{loadingMsg}</div>
            </motion.div>
          )}

          {topics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 items-center p-4 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Identified Subjects:</span>
              {topics.map((topic, index) => (
                <span key={`topic-${topic}-${index}`} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
                  #{topic}
                </span>
              ))}
            </motion.div>
          )}

          {citationGaps.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-amber-50 border border-amber-200 rounded-xl"
            >
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                <Quote className="w-4 h-4" /> Potential Missing Citations
              </h3>
              <p className="text-xs text-amber-700 mb-4 font-medium italic">These sentences contain claims, dates, or statistics that usually require an academic source:</p>
              <ul className="space-y-3">
                {citationGaps.map((gap, i) => (
                  <li key={`citation-${i}`} className="text-sm text-gray-800 pl-4 border-l-2 border-amber-500">
                    "{gap}"
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-amber-200 flex gap-4">
                <div className="text-xs uppercase font-black text-blue-700">APA: (Author, Year)</div>
                <div className="text-xs uppercase font-black text-amber-600">MLA: (Author Page)</div>
              </div>
            </motion.div>
          )}

          {output && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gray-900 text-gray-100 rounded-xl shadow-inner relative group"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> Result
              </h3>
              <p className="leading-relaxed text-lg">{output}</p>
            </motion.div>
          )}

          {sentiment && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-emerald-900 mb-1 capitalize">Detected Tone: {sentiment.label}</h3>
                <p className="text-xs text-emerald-700 font-medium">Confidence Score: {(sentiment.score * 100).toFixed(1)}%</p>
              </div>
              <div className={`text-4xl ${sentiment.label === 'POSITIVE' ? 'grayscale-0' : 'grayscale'}`}>
                {sentiment.label === 'POSITIVE' ? '✨' : '📝'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-2 p-4 bg-amber-50 rounded-lg border border-amber-100 mt-6">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Pro Tip:</strong> The first time you use a tool, your browser will download the AI model (~50MB - 150MB). 
            Once cached, it works instantly and entirely offline. This is the <strong>Top-Tier way</strong> to keep your academic data private!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
