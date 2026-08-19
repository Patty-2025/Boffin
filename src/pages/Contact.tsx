import React from 'react';
import { Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <main className="pt-[100px] min-h-screen bg-slate-50">
      <SEO 
        title="Contact Us | 24/7 Global Academic Support & Assistance"
        description="Get in touch with our global academic support team. We are available 24/7 to provide professional assistance for all your academic assignments and inquiries."
        keywords="contact boffin global services, academic support help, global student services, 24/7 academic support"
        canonicalUrl="/contact-us"
      />
      {/* Header */}
      <section className="bg-slate-900 py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Contact Our Global Support Team</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            We are here to assist you whenever you need us. Whether you have inquiries regarding our academic services or require specialized help with an order, our global support experts are ready to assist.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Get In Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Email Us</h4>
                  <p className="text-slate-600 mb-2">For support, inquiries, or feedback</p>
                  <a href="mailto:info@boffinglobalgroup.com" className="text-amber-600 font-bold hover:underline">info@boffinglobalgroup.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">WhatsApp & Live Support</h4>
                  <p className="text-slate-600">Available 24/7. Chat with our team directly on WhatsApp (+254 118 155512) or click the chat widget.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Secure & Confidential</h4>
                  <p className="text-slate-600">Your information is always protected with our 5-layer security system.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 text-lg mb-1">Working Hours</h4>
                   <p className="text-slate-600">Monday - Sunday: 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Simple Contact Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-fit">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              For immediate assistance with an existing order, please login to your dashboard and chat with your assigned writer or use the support system.
            </p>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <Mail className="mx-auto text-slate-400 mb-4" size={40} />
              <p className="text-slate-600 mb-4">Direct Email Support</p>
              <a 
                href="mailto:info@boffinglobalgroup.com" 
                className="inline-block bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-sm"
              >
                info@boffinglobalgroup.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
