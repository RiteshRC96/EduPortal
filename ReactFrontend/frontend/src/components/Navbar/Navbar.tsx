import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ theme, toggleTheme }: { theme?: string, toggleTheme?: () => void }) {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      className="navbar glass"
    >
      <div className="nav-left">
        <Link to="/" className="brand">
          <GraduationCap className="accent" size={28} />
          <span>Edu<span className="accent">Portal</span></span>
        </Link>
      </div>
      <nav className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="btn primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Get Started</Link>
        <button onClick={toggleTheme} className="btn outline" style={{ padding: '8px', borderRadius: '50%' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
    </motion.header>
  );
}
