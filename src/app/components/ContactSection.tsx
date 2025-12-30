import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function isValidEmail(email: string): boolean {
  // Check for basic structure: something@something.something
  // Must have: local part, @, domain, dot, TLD (at least 2 chars)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) return false;

  // Additional checks for edge cases
  const [localPart, domain] = email.split('@');

  // Check for multiple @ symbols
  if (email.split('@').length !== 2) return false;

  // Local part shouldn't start/end with dot or have consecutive dots
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false;

  // Domain shouldn't start/end with dot or hyphen
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('-')) return false;

  return true;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email before submitting
    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      setStatus('idle');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://cascaderealtors.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    // Only allow valid phone characters for phone field
    if (e.target.name === 'phone') {
      value = value.replace(/[^0-9()\-\s+]/g, '');
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    });
    if (status === 'error') setStatus('idle');
    if (e.target.name === 'email' && emailError) setEmailError('');
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20">
            {/* Contact Information */}
            <div>
              <div className="mb-16">
                <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">CONTACT</p>
                <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
                  Get In Touch
                </h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed">
                  Let's discuss your real estate needs
                </p>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                  <div className="text-sm tracking-[0.2em] text-gray-500 mb-2">PHONE</div>
                  <a href="tel:+14087577353" className="text-gray-900 hover:underline">
                    (408) 757-7353
                  </a>
                </div>

                <div>
                  <div className="text-sm tracking-[0.2em] text-gray-500 mb-2">EMAIL</div>
                  <a href="mailto:contact@cascaderealtors.com" className="text-gray-900 hover:underline">
                    contact@cascaderealtors.com
                  </a>
                </div>
              </div>
            </div>

            {/* Success State */}
            <div className="bg-white p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
              <div className="w-16 h-16 bg-gray-900 flex items-center justify-center mb-8">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Message Sent</h3>
              <p className="text-gray-600 font-light mb-8 max-w-sm">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                Send another message
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div>
            <div className="mb-16">
              <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">CONTACT</p>
              <h2 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Let's discuss your real estate needs
              </p>
            </div>

            <div className="space-y-8 mb-12">
              <div>
                <div className="text-sm tracking-[0.2em] text-gray-500 mb-2">PHONE</div>
                <a href="tel:+14087577353" className="text-gray-900 hover:underline">
                  (408) 757-7353
                </a>
              </div>

              <div>
                <div className="text-sm tracking-[0.2em] text-gray-500 mb-2">EMAIL</div>
                <a href="mailto:info@cascadecaliforniarealty.com" className="text-gray-900 hover:underline">
                  info@cascadecaliforniarealty.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm tracking-wide text-gray-900 mb-3">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm tracking-wide text-gray-900 mb-3">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting'}
                  className={`w-full px-0 py-3 border-0 border-b focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50 ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-gray-900'}`}
                  placeholder="Enter your email"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-2">{emailError}</p>
                )}
                <label htmlFor="phone" className="block text-sm tracking-wide text-gray-900 mb-3 mt-6">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === 'submitting'}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
                  placeholder="Enter your phone"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm tracking-wide text-gray-900 mb-3">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'submitting'}
                  rows={5}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none resize-none transition-colors bg-transparent disabled:opacity-50"
                  placeholder="Tell us about your needs"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="tracking-wide">SENDING...</span>
                  </>
                ) : (
                  <>
                    <span className="tracking-wide">SEND MESSAGE</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
