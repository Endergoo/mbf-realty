import React from 'react';
import ContactHeader from './../components/ContactHeader';
import ContactInfo from './../components/ContactInfo';
import SendMessage from './../components/SendMessage';
import MapLocation from './../components/MapLocation';
import './../css/Contact.css';

const Contact = () => 
{
  return (
    <main className="main-content">
      <ContactHeader />
      <ContactInfo />

      <div className="content-wrapper">
        <SendMessage />
        <MapLocation />
      </div>
    </main>
  );
};

export default Contact;