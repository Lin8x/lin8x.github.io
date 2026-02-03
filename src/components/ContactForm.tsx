import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { addPoints } from '../store/gameStore';

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-contact-modal', handleOpen);
    return () => window.removeEventListener('open-contact-modal', handleOpen);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus('sending');

    // Replace with your actual Service ID, Template ID, and Public Key from EmailJS dashboard
    // For now, we simulate success for the demo if keys are missing
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    // Simulation for dev
    if (serviceId === 'YOUR_SERVICE_ID') {
        setTimeout(() => {
            setStatus('success');
            addPoints(500, 'Connection Established');
            setTimeout(() => {
                setIsOpen(false);
                setStatus('idle');
            }, 3000);
        }, 1500);
        return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
          setStatus('success');
          addPoints(500, 'Connection Established');
          setTimeout(() => {
              setIsOpen(false);
              setStatus('idle');
          }, 3000);
      }, (error) => {
          console.error(error.text);
          setStatus('error');
      });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-brand-primary text-black font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        aria-label="Open Contact Form"
      >
        <Send size={20} />
        <span>Contact Me</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl relative p-8 animate-fade-in-up">
                
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Initialize Connection</h2>
                <p className="text-gray-400 mb-6 text-sm">Send a transmission to Daniel Jalali.</p>

                {status === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                        <CheckCircle size={64} className="text-brand-primary mb-4" />
                        <h3 className="text-xl font-bold text-white">Transmission Sent</h3>
                        <p className="text-gray-400">Thank you for reaching out.</p>
                    </div>
                ) : (
                    <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-1">IDENTIFIER (NAME)</label>
                                <input 
                                    type="text" 
                                    name="user_name" 
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-primary outline-none transition"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 mb-1">RETURN ADDRESS (EMAIL)</label>
                                <input 
                                    type="email" 
                                    name="user_email" 
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-primary outline-none transition"
                                    placeholder="jane@corp.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">AFFILIATION (COMPANY) <span className="opacity-50">- OPTION</span></label>
                            <input 
                                type="text" 
                                name="company" 
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-primary outline-none transition"
                                placeholder="Tech Corp Inc."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">SUBJECT</label>
                            <select 
                                name="subject" 
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-primary outline-none transition"
                            >
                                <option value="recruitment">Recruitment / Hiring</option>
                                <option value="freelance">Freelance / Contract</option>
                                <option value="general">General Inquiry</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">PAYLOAD (MESSAGE)</label>
                            <textarea 
                                name="message" 
                                required
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-brand-primary outline-none transition resize-none"
                                placeholder="Details of your inquiry..."
                            ></textarea>
                        </div>

                        {/* Honeypot field for spam */}
                        <input type="text" name="honeypot" className="hidden" />

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900">
                                <AlertCircle size={16} />
                                <span>Transmission failed. Please try again.</span>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={status === 'sending'}
                            className="w-full bg-brand-primary text-black font-bold py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {status === 'sending' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                    <span>Transmitting...</span>
                                </>
                            ) : (
                                <span>Send Transmission</span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
      )}
    </>
  );
}
