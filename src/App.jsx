import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Landing from './components/public/Landing';
import Problem from './components/public/Problem';
import './App.css';
import './components/nav.css';
import Login from './components/user/managment/Login';
import Register from './components/user/managment/Register';
import BusinessDashboard from './components/user/logged/BusinessDashboard';
import GovernmentDashboard from './components/admin/GovernmentDashboard';
import Solution from './components/public/Solution';
import User from './components/public/User';
import Propuesta from './components/public/Propuesta';
import Impacto from './components/public/Impacto';
import Team from './components/public/Team';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/user" element={<User />} />
        <Route path="/proposal" element={<Propuesta />} />
        <Route path="/impact" element={<Impacto />} />
        <Route path="/team" element={<Team />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/business" element={<BusinessDashboard/>}/>
        <Route path="/government" element={<GovernmentDashboard/>}/>
      </Routes>
    </Router>
  );
}
