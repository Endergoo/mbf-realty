import React, { useState, useRef } from 'react';
import './../css/SendMessage.css';

const SendMessage = () => 
{
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ text: '', type: '' });
  const formRef = useRef(null);

  const handleSubmit = async (event) => 
  {
    event.preventDefault();
    
    setIsSubmitting(true);
    setResponseMessage({ text: 'Please wait...', type: 'waiting' });
    
    const formData = new FormData(event.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try 
    {
      const response = await fetch('https://api.web3forms.com/submit', 
        {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });
      
      const result = await response.json();
      
      if (response.status === 200) 
      {
        setResponseMessage({
          text: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
          type: 'success'
        });
        formRef.current.reset();
      } 
      else 
      {
        setResponseMessage({
          text: result.message || "Something went wrong. Please try again.",
          type: 'error'
        });
      }
    } 
    catch (error) 
    {
      console.error(error);
      setResponseMessage
      ({
        text: "Sorry, there was an error sending your message. Please try again or contact us directly at MBFRealty@email.com",
        type: 'error'
      });
    } 
    finally 
    {
      setIsSubmitting(false);
      
      // Hide message after 5 seconds
      setTimeout(() => 
      {
        setResponseMessage({ text: '', type: '' });
      }, 5000);
    }
  };

  const handleInputChange = (e) => 
  {
    e.target.style.borderColor = 'rgba(240, 165, 0, 0.3)';
  };

  const handleInvalid = (e) => 
  {
    e.preventDefault();
    e.target.style.borderColor = '#f44336';
  };

  return (
    <div className="form-section">
      <h2>Send Us a Message</h2>
      <form 
        id="contactForm" 
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {/* Web3Forms Access Key */}
        <input 
          type="hidden" 
          name="access_key" 
          value="mlshbcqw9rpulk" 
        />
        
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="Your full name"
            onInput={handleInputChange}
            onInvalid={handleInvalid}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="your.email@example.com"
            onInput={handleInputChange}
            onInvalid={handleInvalid}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="(123) 456-7890"
            onInput={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input 
            type="text" 
            id="subject" 
            name="subject" 
            required 
            placeholder="How can we help you?"
            onInput={handleInputChange}
            onInvalid={handleInvalid}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder="Tell us more about your inquiry..."
            onInput={handleInputChange}
            onInvalid={handleInvalid}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {responseMessage.text && (
        <div className={`message ${responseMessage.type} show`}>
          {responseMessage.text}
        </div>
      )}
    </div>
  );
};

export default SendMessage;