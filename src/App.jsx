import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import './App.css';
import './components/nav.css';

function Landing() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Landing Page</h1>
      <p>Contenido de la landing...</p>
    </main>
  );
}
function Services() { return <div style={{ padding: 24 }}><h2>Servicios</h2></div> }
function About() { return <div style={{ padding: 24 }}><h2>Acerca</h2></div> }
function Contact() { return <div style={{ padding: 24 }}><h2>Contacto</h2></div> }
function Login() { return <div style={{ padding: 24 }}><h2>Login</h2></div> }

export default function App() {
  return (
    <Router>
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
