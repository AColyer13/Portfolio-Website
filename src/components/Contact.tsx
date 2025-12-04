import React, { useRef, useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
  });
  const timestampRef = useRef<HTMLInputElement | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (window.emailjs && formRef.current) {
        if (timestampRef.current) {
          timestampRef.current.value = new Date().toISOString();
        }
        await window.emailjs.sendForm('default_service', 'template_6dk6wl5', formRef.current);
        alert('Sent!');
        setFormData({ name: '', message: '', email: '' });
        formRef.current.reset();
      }
    } catch (error) {
      alert('Failed to send email. Please try again.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <section className="contact py-5" id="contact">
      <div className="container">
        <div className="row justify-content-center align-items-stretch">
          <div className="col-lg-5 col-12 d-flex flex-column h-100">
            <div className="card bg-transparent border rounded-4 h-100">
              <div className="google-map w-100 p-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d90444.17968810473!2d-93.44258962458554!3d44.89525237382178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f6213ace55a039%3A0xcdaf9c3796fa2779!2sEdina%2C%20MN!5e0!3m2!1sen!2sus!4v1764804107343!5m2!1sen!2sus"
                  width={"100%"}
                  height={400}
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
              <div className="contact-info d-flex justify-content-between align-items-center p-4 pt-0 flex-wrap">
                <div className="contact-info-item">
                  <h3 className="mb-3 text-white">Say hello</h3>
                  <p className="footer-text mb-0">612.710.7700</p>
                  <p>
                    <a href="mailto:adamcolyer@gmail.com">adamcolyer@gmail.com</a>
                  </p>
                </div>

                <ul className="social-links d-flex gap-3 mt-3 mt-lg-0">
                  <li>
                    <a
                      href="https://github.com/acolyer13"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uil fab fa-github"
                      title="GitHub"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/colyeradam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uil fab fa-linkedin"
                      title="LinkedIn"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12 d-flex">
            <div className="contact-form card bg-transparent border rounded-4 p-4 w-100">
              <h2 className="mb-4">Want to know more? <br></br> Let's talk</h2>

              <form id="form" ref={formRef} onSubmit={handleSubmit}>
                <div className="row">
                  {/* Name + Email on the same line */}
                  <div className="form-row-two mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <textarea
                      name="message"
                      rows={8}
                      className="form-control"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Optional hidden fields if your template uses them */}
                  <input type="hidden" name="reply_to" value={formData.email} />
                  {/* Auto-generated timestamp of submission */}
                  <input type="hidden" name="time" ref={timestampRef} />

                  <div className="ml-lg-auto col-lg-5 col-12 mt-2">
                    <input
                      type="submit"
                      className="form-control submit-btn"
                      value={isSubmitting ? 'Sending...' : 'Send'}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

declare global {
  interface Window {
    emailjs: any;
  }
}
