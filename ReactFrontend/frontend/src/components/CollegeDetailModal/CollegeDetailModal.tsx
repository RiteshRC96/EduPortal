import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  X, MapPin, Building2, ChevronLeft, ChevronRight,
  TrendingUp, Users, Award, Briefcase, ExternalLink,
  BookOpen
} from 'lucide-react';
import { InstituteDetail } from '../../API/collegeApi';
import './CollegeDetailModal.css';

interface Props {
  college: InstituteDetail | null;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 280, damping: 26 } },
  exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};

export default function CollegeDetailModal({ college, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (college) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [college]);

  return (
    <AnimatePresence>
      {college && (
        <motion.div
          className="modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal-container glass"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="modal-scroll-body">

              {/* ── Header Banner ──────────────────────────── */}
              <div className="modal-banner">
                <div className="modal-banner-inner">
                  <div className="modal-banner-icon">
                    <BookOpen size={48} />
                  </div>
                  <div>
                    <h2 className="modal-title">{college.instituteName}</h2>
                    <div className="modal-location">
                      <MapPin size={15} />
                      <span>{college.address || 'Address not available'}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-badges">
                  <span className="badge badge-state">
                    <Building2 size={13} /> {college.stateName}
                  </span>
                  <span className="badge badge-district">
                    {college.districtName}
                  </span>
                  {college.institutionType && (
                    <span className="badge badge-type">
                      {college.institutionType}
                    </span>
                  )}
                </div>
              </div>

              {/* ── Content ──────────────────────────────────── */}
              <div className="modal-content">

                {/* Institute Meta */}
                {(college.university || college.aicteId || college.women || college.minority) && (
                  <div className="modal-meta-row">
                    {college.university && (
                      <div className="meta-item">
                        <span className="meta-label">University</span>
                        <span className="meta-value">{college.university}</span>
                      </div>
                    )}
                    {college.aicteId && (
                      <div className="meta-item">
                        <span className="meta-label">AICTE ID</span>
                        <span className="meta-value">{college.aicteId}</span>
                      </div>
                    )}
                    {college.women && (
                      <div className="meta-item">
                        <span className="meta-label">Women's College</span>
                        <span className="meta-value">{college.women}</span>
                      </div>
                    )}
                    {college.minority && (
                      <div className="meta-item">
                        <span className="meta-label">Minority</span>
                        <span className="meta-value">{college.minority}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Statistics */}
                <div className="modal-stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon intake"><TrendingUp size={20} /></div>
                    <div className="stat-value">{college.totalIntake.toLocaleString()}</div>
                    <div className="stat-label">Total Intake</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon placements"><Users size={20} /></div>
                    <div className="stat-value">{college.totalEnrollment.toLocaleString()}</div>
                    <div className="stat-label">Total Enrolled</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon percentage"><Award size={20} /></div>
                    <div className="stat-value">{college.placementPercentage}%</div>
                    <div className="stat-label">Placement Rate</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon package"><Briefcase size={20} /></div>
                    <div className="stat-value">{college.totalPlacement.toLocaleString()}</div>
                    <div className="stat-label">Total Placed</div>
                  </div>
                </div>

                {/* Programmes Table */}
                {college.programmes && college.programmes.length > 0 && (
                  <div className="modal-programmes">
                    <h3 className="section-title">
                      <BookOpen size={18} /> Programmes Offered
                    </h3>
                    <div className="programme-table-wrap">
                      <table className="programme-table">
                        <thead>
                          <tr>
                            <th>Programme</th>
                            <th>Course</th>
                            <th>Level</th>
                            <th>Shift</th>
                            <th>Intake</th>
                            <th>Enrolled</th>
                            <th>Placed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {college.programmes.map((p) => (
                            <tr key={p.id}>
                              <td>{p.programme || '—'}</td>
                              <td>{p.course || '—'}</td>
                              <td>{p.level || '—'}</td>
                              <td>{p.shift || '—'}</td>
                              <td>{p.intake ?? '—'}</td>
                              <td>{p.enrollment ?? '—'}</td>
                              <td>{p.placement ?? '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="modal-map-section">
                  <h3 className="section-title">
                    <MapPin size={18} /> Location
                  </h3>
                  <div className="map-placeholder">
                    <div className="map-placeholder-inner">
                      <div className="map-pin-icon">
                        <MapPin size={40} />
                      </div>
                      <p className="map-placeholder-text">{college.address}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${college.instituteName}, ${college.address}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-open-link"
                      >
                        <ExternalLink size={14} /> Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="modal-cta">
                  <motion.button
                    className="btn primary modal-cta-btn"
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(79,70,229,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => alert(`Redirecting to admission registration for ${college.instituteName}...`)}
                  >
                    🎓 Register for Admission
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
