import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'rafalkmiecik@gmail.com'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="contact-container">
      <section className="contact-section">
        <div className="contact-inner">
            <h1 className="about-header">Contact Me</h1>        <p className="about-text">
          I'm always interested in hearing about new projects and opportunities.
          Feel free to get in touch with me using the form below.
        </p>
        
        <p className="required-notice">Fields marked with an asterisk (<span>*</span>) are required</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your email address"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject <span className="required">*</span></label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Subject of your message"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span className="required">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
              rows={6}
              aria-required="true"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="status-message success">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message error">
              Sorry, there was an error sending your message. Please try again later.
            </div>
          )}
        </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
