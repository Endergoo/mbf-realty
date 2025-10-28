import React from 'react';

const Contact = () => 
{
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-text" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Get in touch with our team. We're here to help you find your perfect home.
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-label">Address</div>
            <div className="contact-detail">
              123 Main Street, Your City, ST 12345
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-label">Phone</div>
            <div className="contact-detail">(555) 123-4567</div>
          </div>
          <div className="contact-item">
            <div className="contact-label">Email</div>
            <div className="contact-detail">info@mbfrealty.com</div>
          </div>
          <div className="contact-item">
            <div className="contact-label">Hours</div>
            <div className="contact-detail">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;