import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronRight, ChevronLeft, ChevronDown, GraduationCap, SlidersHorizontal, Search, X } from 'lucide-react';
import {
  fetchStates, fetchDistricts, fetchInstitutes, fetchInstituteDetail,
  fetchInstitutesByKeyword,                        
} from '../../API/collegeApi';
import CollegeDetailModal from '../../components/CollegeDetailModal/CollegeDetailModal';
import './Home.css';

const PAGE_SIZE = 16;

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, when: 'beforeChildren' } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 180, damping: 20 } },
  exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.15 } },
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [states, setStates]       = useState([]);
  const [districts, setDistricts] = useState([]);
  const [colleges, setColleges]   = useState([]);

  const [selectedState, setSelectedState]       = useState(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState(undefined);

  const [loadingStates, setLoadingStates]       = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingColleges, setLoadingColleges]   = useState(true);

  const [currentPage, setCurrentPage]     = useState(0);   // 0-indexed (Spring)
  const [totalPages, setTotalPages]       = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [loadingDetail, setLoadingDetail]     = useState(false);

  /* ── Search state ─────────────────────────────────────── */
  const [searchTerm, setSearchTerm]                   = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSearching, setIsSearching]                 = useState(false);

  /* ── Load States on mount ─────────────────────────────── */
  useEffect(() => {
    fetchStates().then((data) => {
      setStates(data);
      setLoadingStates(false);
    });
  }, []);

  /* ── Debounce search input (400 ms) ──────────────────── */
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  /* ── Reset to page 0 whenever a new search kicks in ──── */
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm]);

  /* ── Load Colleges: search mode vs normal paginated mode ─
   *
   *  KEY FIX: the previous version set isSearching=true but never
   *  called fetchInstitutesByKeyword.  Now it does.
   * ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (debouncedSearchTerm) {
      /* ── SEARCH MODE ── */
      setIsSearching(true);
      setLoadingColleges(true);

      fetchInstitutesByKeyword(debouncedSearchTerm)
        .then((data) => {
          // backend returns a plain List (no pagination wrapper)
          setColleges(data);
          setTotalPages(0);
          setTotalElements(data.length);
          setLoadingColleges(false);
        })
        .catch(() => {
          setColleges([]);
          setTotalElements(0);
          setLoadingColleges(false);
        });
    } else {
      /* ── NORMAL PAGINATED MODE ── */
      setIsSearching(false);
      setLoadingColleges(true);

      fetchInstitutes({
        stateId:    selectedState,
        districtId: selectedDistrict,
        page:       currentPage,
        size:       PAGE_SIZE,
      }).then((data) => {
        setColleges(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
        setLoadingColleges(false);
      });
    }
  }, [selectedState, selectedDistrict, currentPage, debouncedSearchTerm]);

  /* ── State change → reload districts ─────────────────── */
  const handleStateChange = useCallback((value) => {
    const stateId = value ? Number(value) : undefined;
    setSelectedState(stateId);
    setSelectedDistrict(undefined);
    setDistricts([]);
    setCurrentPage(0);
    if (stateId) {
      setLoadingDistricts(true);
      fetchDistricts(stateId).then((data) => {
        setDistricts(data);
        setLoadingDistricts(false);
      });
    }
  }, []);

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value ? Number(value) : undefined);
    setCurrentPage(0);
  };

  /* ── Clear filters (also clears search) ──────────────── */
  const clearFilters = () => {
    setSelectedState(undefined);
    setSelectedDistrict(undefined);
    setDistricts([]);
    setCurrentPage(0);
    setSearchTerm('');
  };

  /* ── Open detail modal ────────────────────────────────── */
  const openDetail = (id) => {
    setLoadingDetail(true);
    fetchInstituteDetail(id).then((data) => {
      setSelectedCollege(data);
      setLoadingDetail(false);
    });
  };

  /* ── Page numbers to display ─────────────────────────── */
  const getPageNumbers = () => {
    const pages = [];
    const current = currentPage + 1; // 1-indexed for display
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) pages.push(i);
      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  /* ── Render ───────────────────────────────────────────── */
  return (
    <>
      <motion.div
        className="home-page"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* ── Hero ────────────────────────────────────────── */}
        <motion.section className="home-hero" variants={itemVariants}>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <GraduationCap size={16} />
            <span>India's Premier College Discovery Platform</span>
          </motion.div>

          <h1 className="hero-heading">
            Find Your{' '}
            <span className="hero-gradient-text">Dream College</span>
          </h1>
          <p className="hero-subtitle">
            Explore top colleges across India — filter by state and district, view
            detailed stats, and kickstart your admission journey today.
          </p>
        </motion.section>

        {/* ── Filter Bar ──────────────────────────────────── */}
        <motion.div className="filter-bar glass" variants={itemVariants}>
          <div className="filter-icon-label">
            <SlidersHorizontal size={18} />
            <span>Filter Colleges</span>
          </div>

          {/* Search Bar */}
          <div className="search-wrapper" style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.6, pointerEvents: 'none' }}
            />
            <input
              type="text"
              className="filter-select"
              placeholder="Search colleges by name…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', width: '100%' }}
              aria-label="Search colleges by name"
            />
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', display: 'flex', opacity: 0.6,
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </motion.button>
            )}
          </div>

          {/* State Dropdown */}
          <div className="select-wrapper">
            <select
              id="state-select"
              className="filter-select"
              value={selectedState ?? ''}
              onChange={(e) => handleStateChange(e.target.value)}
              disabled={loadingStates}
            >
              <option value="">
                {loadingStates ? 'Loading states…' : '🗺️ All States'}
              </option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.stateName}</option>
              ))}
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>

          {/* District Dropdown */}
          <div className="select-wrapper">
            <select
              id="district-select"
              className="filter-select"
              value={selectedDistrict ?? ''}
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={!selectedState || loadingDistricts}
            >
              <option value="">
                {loadingDistricts
                  ? 'Loading…'
                  : selectedState
                  ? '📍 All Districts'
                  : '📍 Select State First'}
              </option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>{d.districtName}</option>
              ))}
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>

          {/* Clear */}
          {(selectedState || selectedDistrict || searchTerm) && (
            <motion.button
              className="clear-filter-btn"
              onClick={clearFilters}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕ Clear
            </motion.button>
          )}
        </motion.div>

        {/* ── Results Summary ──────────────────────────────── */}
        <motion.div className="results-summary" variants={itemVariants}>
          {loadingColleges ? (
            <span className="results-text">
              {isSearching ? 'Searching colleges…' : 'Loading colleges…'}
            </span>
          ) : (
            <span className="results-text">
              <strong>{totalElements}</strong> college{totalElements !== 1 ? 's' : ''} found
              {isSearching ? ` for "${debouncedSearchTerm}"` : ' · Sorted A – Z'}
            </span>
          )}
        </motion.div>

        {/* ── College Grid ────────────────────────────────── */}
        {loadingColleges ? (
          <div className="colleges-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="college-card glass skeleton-card">
                <div className="skeleton-img" />
                <div className="college-info">
                  <div className="skeleton-line wide" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <motion.div className="empty-state" variants={itemVariants}>
            <div className="empty-icon">🎓</div>
            <h3>No Colleges Found</h3>
            <p>
              {isSearching
                ? `No colleges matched "${debouncedSearchTerm}". Try a different keyword.`
                : 'Try selecting a different state or district.'}
            </p>
            <button className="btn primary" onClick={clearFilters}>Clear Filters</button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedState}-${selectedDistrict}-${debouncedSearchTerm}-page-${currentPage}`}
              className="colleges-grid"
              variants={gridVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {colleges.map((college) => (
                <motion.article
                  key={college.id}
                  className="college-card glass"
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.14)' }}
                  layout
                >
                  <div className="college-card-img-wrap">
                    <div className="college-img-placeholder" />
                    <div className="college-img-overlay" />
                    <div className="college-img-tags">
                      {college.institutionType && (
                        <span className="tag tag-on-img">{college.institutionType}</span>
                      )}
                      {college.university && (
                        <span className="tag tag-on-img">{college.university}</span>
                      )}
                    </div>
                  </div>

                  <div className="college-info">
                    <h3 className="college-name">{college.instituteName}</h3>

                    <p className="college-location">
                      <MapPin size={14} />
                      {college.districtName}{college.stateName ? `, ${college.stateName}` : ''}
                    </p>

                    <p className="college-desc">
                      {college.address || 'Address not available.'}
                    </p>

                    <div className="college-card-footer">
                      <div className="college-mini-stats">
                        {college.aicteId && (
                          <div className="mini-stat">
                            <span className="mini-stat-val" style={{ fontSize: '0.75rem' }}>
                              {college.aicteId}
                            </span>
                            <span className="mini-stat-label">AICTE ID</span>
                          </div>
                        )}
                      </div>

                      <motion.button
                        className="btn primary view-btn"
                        onClick={() => openDetail(college.id)}
                        disabled={loadingDetail}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        aria-label={`View details for ${college.instituteName}`}
                      >
                        {loadingDetail ? '…' : <>View Details <ChevronRight size={15} /></>}
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ── Pagination (hidden during search) ────────────── */}
        {!loadingColleges && !isSearching && totalPages > 1 && (
          <motion.div className="pagination" variants={itemVariants}>
            <motion.button
              className="page-btn nav-btn"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </motion.button>

            {getPageNumbers().map((page, idx) =>
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
              ) : (
                <motion.button
                  key={page}
                  className={`page-btn ${currentPage + 1 === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page - 1)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage + 1 === page ? 'page' : undefined}
                >
                  {page}
                </motion.button>
              )
            )}

            <motion.button
              className="page-btn nav-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}

        {/* ── Page info (hidden during search) ─────────────── */}
        {!loadingColleges && !isSearching && totalPages > 1 && (
          <motion.p className="page-info" variants={itemVariants}>
            Showing {currentPage * PAGE_SIZE + 1}–
            {Math.min((currentPage + 1) * PAGE_SIZE, totalElements)} of {totalElements} colleges
          </motion.p>
        )}
      </motion.div>

      {/* ── College Detail Modal ─────────────────────────── */}
      <CollegeDetailModal
        college={selectedCollege}
        onClose={() => setSelectedCollege(null)}
      />
    </>
  );
}