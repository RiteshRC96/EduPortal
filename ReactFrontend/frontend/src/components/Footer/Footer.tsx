import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer glass" style={{ margin: '32px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontWeight: '500' }}>
        © {new Date().getFullYear()} EduPortal. All rights reserved.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        Built with <Heart size={16} color="#EF4444" fill="#EF4444" /> for students
      </div>
    </footer>
  );
}
