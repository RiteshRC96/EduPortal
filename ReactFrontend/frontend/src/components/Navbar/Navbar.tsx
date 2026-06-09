import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  theme?: string;
  toggleTheme?: () => void;
}

export default function Navbar({
  theme,
  toggleTheme
}: NavbarProps) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/login");
    window.location.reload();
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar glass"
    >
      <div className="nav-left">
        <Link to="/" className="brand">
          <GraduationCap
            className="accent"
            size={28}
          />
          <span>
            Edu
            <span className="accent">
              Portal
            </span>
          </span>
        </Link>
      </div>

      <nav className="nav-right">

        <Link
          to="/"
          className="nav-link"
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn primary"
              style={{
                padding: '8px 16px',
                fontSize: '0.9rem'
              }}
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 500
              }}
            >
              {email}
            </span>

            {role === "ADMIN" && (
              <Link
                to="/admin"
                className="nav-link"
              >
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="btn primary"
            >
              Logout
            </button>
          </>
        )}

        <button
          onClick={toggleTheme}
          className="btn outline"
          style={{
            padding: '8px',
            borderRadius: '50%'
          }}
        >
          {theme === 'dark'
            ? <Sun size={20} />
            : <Moon size={20} />
          }
        </button>

      </nav>
    </motion.header>
  );
}