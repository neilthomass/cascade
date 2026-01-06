import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { X, Send, Check, Loader2, MessageCircle } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) return false;
  const [localPart, domain] = email.split('@');
  if (email.split('@').length !== 2) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false;
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('-')) return false;
  return true;
}

interface AskManojModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AskManojModal({ isOpen, onClose }: AskManojModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailError, setEmailError] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setStatus('idle');
        setEmailError('');
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://cascaderealtors.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `[Quick Question for Manoj]\n\n${formData.message}`
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/[^0-9()\-\s+]/g, '');
    }
    setFormData({ ...formData, [e.target.name]: value });
    if (status === 'error') setStatus('idle');
    if (e.target.name === 'email' && emailError) setEmailError('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      >
        <div
          className="relative bg-white w-full max-w-lg pointer-events-auto shadow-2xl"
          style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header accent bar */}
          <div className="h-1 bg-gray-900" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {status === 'success' ? (
            /* Success State */
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-2xl sm:text-3xl text-gray-900 mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Message Sent
              </h3>
              <p className="text-gray-500 font-light mb-8 max-w-sm mx-auto">
                Thanks for reaching out! Manoj will get back to you within a day.
              </p>
              <button
                onClick={onClose}
                className="bg-gray-900 text-white px-8 py-3 text-sm tracking-[0.1em] uppercase hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            /* Form State */
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div className="w-12 h-12 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3
                    className="text-xl sm:text-2xl text-gray-900 mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Ask Manoj a Question
                  </h3>
                  <p className="text-sm text-gray-500 font-light">
                    Get personalized guidance on your real estate questions
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-gray-500 mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none transition-all text-sm disabled:opacity-50"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.1em] text-gray-500 mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === 'submitting'}
                      className={`w-full px-4 py-3 bg-gray-50 border focus:bg-white outline-none transition-all text-sm disabled:opacity-50 ${
                        emailError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
                      }`}
                      placeholder="john@email.com"
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-1">{emailError}</p>
                    )}
                  </div>
                </div>

                {/* Phone (optional) */}
                <div>
                  <label className="block text-xs tracking-[0.1em] text-gray-500 mb-2">
                    PHONE <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none transition-all text-sm disabled:opacity-50"
                    placeholder="(408) 555-1234"
                  />
                </div>

                {/* Question */}
                <div>
                  <label className="block text-xs tracking-[0.1em] text-gray-500 mb-2">
                    YOUR QUESTION *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white outline-none transition-all text-sm resize-none disabled:opacity-50"
                    placeholder="What would you like to know about buying or selling in the Bay Area?"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm tracking-[0.1em]">SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm tracking-[0.1em]">SEND QUESTION</span>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer note */}
              <p className="text-xs text-gray-400 text-center mt-4">
                Typically responds within a day
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
