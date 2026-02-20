import { useState, useRef } from 'react';
import RoughButton from './RoughButton';
import './ContactForm.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      /* EmailJS integration — replace with your actual IDs */
      const emailjs = await import('@emailjs/browser');
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY',
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contact-name" className="form-label">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="form-input"
          placeholder="Your name..."
        />
        <div className="form-underline" />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email" className="form-label">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="form-input"
          placeholder="you@example.com"
        />
        <div className="form-underline" />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="form-input form-textarea"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="form-actions">
        <RoughButton
          seed={42}
          style={{ fontSize: '1.1rem', padding: '10px 32px' }}
        >
          {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent ✓' : status === 'error' ? 'Failed ✗' : 'Send'}
        </RoughButton>

        {status === 'sent' && (
          <span className="form-status success">Message sent — thanks!</span>
        )}
        {status === 'error' && (
          <span className="form-status error">Something went wrong. Try emailing directly.</span>
        )}
      </div>
    </form>
  );
}
