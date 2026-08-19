import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCw, CornerUpLeft, ShieldAlert, CheckCircle2, DollarSign } from 'lucide-react';

export default function RevisionRefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
              <RotateCw size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Revision & Refund Policy
            </h1>
          </div>
          <div className="w-16 h-1 bg-emerald-500 mb-10"></div>

          <div className="prose prose-slate max-w-none font-medium leading-relaxed text-slate-600 space-y-8">
            <section>
              <p className="text-lg text-slate-700 italic">
                Commitment to Excellence: Our Revision and Refund guidelines are designed to protect both the student and the academic expert while ensuring the highest standards of service.
              </p>
              <p>
                At boffinglobalgroup.com, we take pride in delivering top-tier academic assistance. However, we recognize that academic requirements can sometimes be complex or subject to change. This policy outlines our transparent approach to revisions and refunds in various scenarios.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <RotateCw className="text-blue-500" size={24} /> 1. Revision Policy
              </h2>
              <p>
                We offer **UNLIMITED REVISIONS** for a period of 14 days after the delivery of your initial draft (or 30 days for large projects like dissertations). Revisions are intended to ensure that the final product strictly adheres to your original instructions.
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li><strong>Validity:</strong> A revision request is valid if the expert failed to meet a specific requirement mentioned in the original order description.</li>
                <li><strong>Turnaround:</strong> Minor revisions are usually completed within 12–24 hours. Complex revisions may take longer depending on depth.</li>
                <li><strong>New Instructions:</strong> If the revision request involves instructions that were not present in the original order, a small additional fee may be requested to cover the extra work.</li>
              </ul>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CornerUpLeft className="text-blue-600" size={24} /> 2. Refund Policy
              </h2>
              <p>
                While we strive for perfection, we understand that issues can arise. Our refund policy is structured to be fair and equitable:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase">
                    <DollarSign size={16} className="text-green-600" /> 100% Refund
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-500">
                    <li>• Duplicate payment by mistake.</li>
                    <li>• Order cancellation before an expert is assigned.</li>
                    <li>• We are unable to find a suitable expert for your niche topic.</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm uppercase">
                    <ShieldAlert size={16} className="text-red-500" /> Partial Refund
                  </h4>
                  <ul className="text-xs space-y-2 text-slate-500">
                    <li>• Cancellation after an expert started work (20%–50% depending on progress).</li>
                    <li>• Delivery delay exceeding 24 hours (excluding technical issues or missing info from student).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Failed Grade Guarantee</h2>
              <p>
                In the highly unlikely event that you receive a "Fail" mark on an assignment we completed, you are entitled to a full refund (100% credit or 50%–70% cash refund depending on the complexity). You must provide a valid professor's feedback and grading sheet within 90 days of order delivery.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" size={24} /> 4. Non-Refundable Scenarios
              </h2>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Change of mind after the final paper has been delivered and accepted.</li>
                <li>Failure to provide necessary info resulting in a delay or missed requirements.</li>
                <li>The paper was edited by the student after delivery.</li>
                <li>Discrepancies in software detection (e.g., AI detectors which are often inaccurate; we only honor Turnitin plagiarism reports).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Dispute Resolution</h2>
              <p>
                If you are unsatisfied with a decision, you can escalate the matter to our Quality Assurance Department by emailing info@boffinglobalgroup.com. We aim to resolve all disputes within 3–5 business days.
              </p>
            </section>
            
            <p className="text-sm mt-12 text-slate-400 italic">This policy is part of our commitment to being the most reliable "Global Assignment Writing Service" for international scholars.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
