import { ArrowRight, Check, Loader2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  propertyAddress: string;
  testimonialText: string;
  photo: string | null;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) return false;

  const [localPart, domain] = email.split('@');
  if (email.split('@').length !== 2) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false;
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('-')) return false;

  return true;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function SubmitTestimonialPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    propertyAddress: '',
    testimonialText: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [emailError, setEmailError] = useState('');
  const [photoError, setPhotoError] = useState('');

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setPhotoError('Photo must be under 5MB');
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    setPhotoError('');

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, photo: base64 }));
      setPhotoPreview(base64);
      setPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }));
    setPhotoPreview(null);
    setPhotoName(null);
    setPhotoError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('https://cascaderealtors.com/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          propertyAddress: '',
          testimonialText: '',
          photo: null,
        });
        setPhotoPreview(null);
        setPhotoName(null);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status === 'error') setStatus('idle');
    if (e.target.name === 'email' && emailError) setEmailError('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 inline-block"
            >
              &larr; Back to Home
            </Link>
            <p className="text-sm tracking-[0.2em] text-gray-500 mb-6">SHARE YOUR EXPERIENCE</p>
            <h1 className="text-5xl font-light text-gray-900 mb-6 leading-tight">
              Submit a Testimonial
            </h1>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              We'd love to hear about your experience working with Cascade California Realty. Your
              feedback helps other clients make informed decisions.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-white border border-gray-200 p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-900 flex items-center justify-center mb-8">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-light text-gray-900 mb-4">Thank You!</h3>
              <p className="text-gray-600 font-light mb-8 max-w-sm">
                Your testimonial has been submitted for review. We appreciate you taking the time
                to share your experience.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setStatus('idle')}
                  className="text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
                >
                  Submit another
                </button>
                <Link
                  to="/"
                  className="text-gray-500 border-b border-gray-300 pb-1 hover:text-gray-900 hover:border-gray-900 transition-colors"
                >
                  Return home
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm tracking-wide text-gray-900 mb-3">
                    YOUR NAME *
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
                  <label
                    htmlFor="email"
                    className="block text-sm tracking-wide text-gray-900 mb-3"
                  >
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
                  {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                </div>

                <div>
                  <label
                    htmlFor="propertyAddress"
                    className="block text-sm tracking-wide text-gray-900 mb-3"
                  >
                    PROPERTY ADDRESS *
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none transition-colors bg-transparent disabled:opacity-50"
                    placeholder="Address of the property you bought or sold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="testimonialText"
                    className="block text-sm tracking-wide text-gray-900 mb-3"
                  >
                    YOUR EXPERIENCE *
                  </label>
                  <textarea
                    id="testimonialText"
                    name="testimonialText"
                    value={formData.testimonialText}
                    onChange={handleChange}
                    required
                    disabled={status === 'submitting'}
                    rows={5}
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-gray-900 focus:ring-0 outline-none resize-none transition-colors bg-transparent disabled:opacity-50"
                    placeholder="Tell us about your experience working with our team"
                  />
                </div>

                <div>
                  <label className="block text-sm tracking-wide text-gray-900 mb-3">
                    PROPERTY PHOTO (OPTIONAL)
                  </label>
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full max-h-64 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        disabled={status === 'submitting'}
                        className="absolute top-2 right-2 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-sm text-gray-500 mt-2">{photoName}</p>
                    </div>
                  ) : (
                    <label
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400 transition-colors ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">
                        Click to upload (JPEG, PNG, or WebP, max 5MB)
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handlePhotoChange}
                        disabled={status === 'submitting'}
                        className="hidden"
                      />
                    </label>
                  )}
                  {photoError && <p className="text-red-500 text-sm mt-2">{photoError}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gray-900 text-white py-4 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 group mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="tracking-wide">SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-wide">SUBMIT TESTIMONIAL</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
