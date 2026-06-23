import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Search,
  BookOpen,
  Building2,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react";
import "./LandingPage.css";

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "13,000+", label: "Colleges Listed", icon: <Building2 size={22} /> },
  { value: "28+", label: "States Covered", icon: <MapPin size={22} /> },
  { value: "700+", label: "Districts Mapped", icon: <BookOpen size={22} /> },
  { value: "50L+", label: "Students Helped", icon: <Users size={22} /> },
];

const FEATURES = [
  {
    icon: <Search size={28} />,
    title: "Smart Search",
    desc: "Find any college instantly by name — results appear as you type, no page reload needed.",
  },
  {
    icon: <MapPin size={28} />,
    title: "State & District Filter",
    desc: "Narrow down colleges to your home state or specific district in two clicks.",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Detailed Profiles",
    desc: "View AICTE ID, affiliation, institution type, address and more for every college.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "All Institution Types",
    desc: "Engineering, pharmacy, management, polytechnic — every AICTE-approved institute in one place.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Search or Filter",
    desc: "Type a college name or pick your state and district.",
  },
  {
    step: "2",
    title: "Browse Results",
    desc: "Scan the card grid — sorted A–Z, 16 per page.",
  },
  {
    step: "3",
    title: "View Full Details",
    desc: "Click any card to see the complete college profile.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya S.",
    city: "Nagpur",
    text: "Found my engineering college in under 2 minutes. Couldn't believe how easy it was.",
  },
  {
    name: "Rahul M.",
    city: "Jaipur",
    text: "The district filter saved me hours of googling. Everything in one clean list.",
  },
  {
    name: "Anjali K.",
    city: "Bengaluru",
    text: "Finally a platform that covers tier-2 colleges too, not just the big names.",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        className="landing-hero"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="landing-hero-badge" variants={fadeUp}>
          <GraduationCap size={15} />
          <span>India's Most Complete College Directory</span>
        </motion.div>

        <motion.h1 className="landing-hero-heading" variants={fadeUp}>
          Every College in India,
          <br />
          <span className="landing-gradient">One Search Away</span>
        </motion.h1>

        <motion.p className="landing-hero-sub" variants={fadeUp}>
          EduPortal maps 13,000+ AICTE-approved institutions across 28 states.
          Search by name, filter by location, and walk into your admission
          journey fully informed.
        </motion.p>

        <motion.div className="landing-hero-actions" variants={fadeUp}>
          <motion.button
            className="btn-landing primary-landing"
            onClick={() => navigate("/colleges")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Explore Colleges <ArrowRight size={18} />
          </motion.button>
          <motion.button
            className="btn-landing secondary-landing"
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Create Free Account
          </motion.button>
        </motion.div>

        {/* trust strip */}
        <motion.div className="landing-trust" variants={fadeUp}>
          {[
            "No sign-up needed to browse",
            "Updated AICTE data",
            "Free forever",
          ].map((t) => (
            <span key={t} className="trust-item">
              <CheckCircle2 size={14} /> {t}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <motion.section
        className="landing-stats"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            className="stat-card glass"
            variants={fadeUp}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <motion.section
        className="landing-section"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-eyebrow">What EduPortal does</span>
          <h2 className="section-heading">Built for students, not marketers</h2>
          <p className="section-sub">
            No ads, no paid rankings, no hidden filters. Just every college,
            exactly as it is.
          </p>
        </motion.div>

        <div className="features-grid">
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              className="feature-card glass"
              variants={fadeUp}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <motion.section
        className="landing-section landing-how"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-heading">Find your college in 3 steps</h2>
        </motion.div>

        <div className="how-steps">
          {HOW_IT_WORKS.map((h, i) => (
            <motion.div key={h.step} className="how-step" variants={fadeUp}>
              <div className="how-step-number">{h.step}</div>
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="how-step-connector" />
              )}
              <h3 className="how-step-title">{h.title}</h3>
              <p className="how-step-desc">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <motion.section
        className="landing-section"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <span className="section-eyebrow">Student stories</span>
          <h2 className="section-heading">What students say</h2>
        </motion.div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              className="testimonial-card glass"
              variants={fadeUp}
            >
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <span className="author-name">{t.name}</span>
                <span className="author-city">{t.city}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <motion.section
        className="landing-cta-banner"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
      >
        <GraduationCap size={40} className="cta-banner-icon" />
        <h2 className="cta-banner-heading">Ready to find your college?</h2>
        <p className="cta-banner-sub">
          No account needed. Start browsing 13,000+ colleges right now.
        </p>
        <motion.button
          className="btn-landing primary-landing large"
          onClick={() => navigate("/colleges")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Browse All Colleges <ArrowRight size={20} />
        </motion.button>
      </motion.section>
    </div>
  );
}
