import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, MapPin, Star, ChevronRight } from 'lucide-react';

const colleges = [
  {
    id: 1,
    name: 'Stanford University',
    location: 'Stanford, California',
    rating: 4.9,
    tags: ['Engineering', 'Business', 'Arts'],
    image: 'https://images.unsplash.com/photo-1590403759281-22442436f564?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, Massachusetts',
    rating: 4.9,
    tags: ['Technology', 'Science', 'Engineering'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Harvard University',
    location: 'Cambridge, Massachusetts',
    rating: 4.8,
    tags: ['Law', 'Medicine', 'Business'],
    image: 'https://images.unsplash.com/photo-1592284908053-96bba6e7b1c3?auto=format&fit=crop&q=80&w=800'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function Home() {
  return (
    <motion.div 
      className="page-container" 
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.div className="hero" variants={itemVariants}>
        <h1>Find Your Dream College</h1>
        <p>Explore thousands of colleges, track your application, and manage all your admission documents in one premium platform.</p>
        
        <div className="search-container glass" style={{ padding: '8px' }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '16px', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search colleges, degrees, or locations..." 
              style={{ paddingLeft: '48px', width: '100%', border: 'none', background: 'transparent' }} 
            />
          </div>
          <button className="btn primary" style={{ borderRadius: '100px' }}>Search</button>
        </div>
      </motion.div>

      <motion.div className="colleges-grid" variants={containerVariants}>
        {colleges.map((college) => (
          <motion.div key={college.id} className="college-card glass" variants={itemVariants}>
            <img src={college.image} alt={college.name} className="college-img" />
            <div className="college-info">
              <h3>{college.name}</h3>
              <p><MapPin size={16} /> {college.location}</p>
              
              <div className="tag-row">
                {college.tags.slice(0,2).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <Star size={18} color="#eab308" fill="#eab308" />
                  {college.rating}
                </div>
                <button className="btn outline" style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '0.9rem' }}>
                  View Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
