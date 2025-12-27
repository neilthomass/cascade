import { MapPin, Phone, Mail, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div>
            <div className="mb-16">
              <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">CONTACT</p>
              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
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
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm tracking-wide text-gray-900 mb-3">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm tracking-wide text-gray-900 mb-3">
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent"
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
                  rows={5}
                  className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none resize-none transition-colors bg-transparent"
                  placeholder="Tell us about your needs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group mt-8"
              >
                <span className="tracking-wide">SEND MESSAGE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}