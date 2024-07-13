import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';


function HomePage() {
  return (
    <div className="App">
      
    
       <header className="header">
        <div className="logo">Medicate</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#pages">Pages</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <button className="appointment-btn">Make Appointment</button>
      </header>
      
      <section className="hero">
        <div className="hero-content">
          <h2>Orthopedic Treatment<br /> Acute Pain</h2>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p>
          <Link to="/chatbot">
          <button className="read-more">Talk to our chatbot</button>
          </Link>
        </div>
        
      </section>
      
      
      
      <section className="info-cards">
        <div className="card">
          <h3>Emergency Cases</h3>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          <p className="contact">987 654 321</p>
        </div>
        <div className="card">
          <h3>Doctors Timetable</h3>
          <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          <button className="timetable-btn">Timetable</button>
        </div>
        <div className="card">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 8:00 - 7:00 PM</p>
          <p>Saturday: 6:00 - 5:00 PM</p>
          <p>Sunday: 9:00 - 4:00 PM</p>
          <p>Emergency: 24HRS/7Days</p>
        </div>
      </section>
    </div>
    
  );
}

export default HomePage;
