import React, { useState } from 'react';
import { X, Send, Check, Mail, Sparkles, Briefcase } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  initialType?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, initialType, onClose }) => {
  const [inquiryType, setInquiryType] = useState<string>(initialType || 'career');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FBF9F5] rounded-2xl border border-[#DDD7C9] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#F5F2EA] border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#1E382B]" />
            <h3 className="text-sm font-bold text-[#1E2522]">Start a Conversation</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6A756E] hover:text-[#1E2522] hover:bg-[#EAE5DA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#1E382B] text-white flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#1E2522]">Message Received!</h4>
            <p className="text-xs text-[#525B55]">
              Thank you for reaching out. Shivam will reply directly to your email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setInquiryType('career')}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  inquiryType === 'career'
                    ? 'bg-[#1E382B] text-white border-[#1E382B] font-semibold'
                    : 'bg-white border-[#DDD7C9] text-[#4F5953] hover:border-[#1E382B]'
                }`}
              >
                Career Opportunity
              </button>

              <button
                type="button"
                onClick={() => setInquiryType('freelance')}
                className={`py-2 px-3 rounded-xl border text-center transition-all ${
                  inquiryType === 'freelance'
                    ? 'bg-[#1E382B] text-white border-[#1E382B] font-semibold'
                    : 'bg-white border-[#DDD7C9] text-[#4F5953] hover:border-[#1E382B]'
                }`}
              >
                Freelance / Project
              </button>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1E2522] block">Your Name</label>
              <input
                required
                type="text"
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7C9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1E2522] block">Your Email</label>
              <input
                required
                type="email"
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7C9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1E2522] block">Project or Role Details</label>
              <textarea
                required
                rows={3}
                placeholder="Tell me about what you're trying to build, key challenges, or team timeline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#DDD7C9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1E382B]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1E382B] hover:bg-[#2A4B3A] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
