import { useEffect } from 'react';

export default function FounderModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2 className="modal-title">About the Founder</h2>
        <p className="modal-subtitle"><strong>Roger Bigger</strong> | Founder &amp; CEO</p>

        <hr className="modal-divider" />

        <h3>Enterprise Systems Architect</h3>
        <p className="modal-section-text">
          Roger spent decades at the largest financial institutions—Citigroup
          and JP Morgan Chase—as well as major media organizations, designing
          mission-critical systems that process millions of transactions daily,
          and managing the teams that built them. He understands
          what it takes to build systems that are scalable, secure, and robust
          enough to satisfy regulators and serve demanding clients worldwide.
        </p>

        <hr className="modal-divider" />

        <h3>Engineering Leader</h3>
        <p className="modal-section-text">
          Beyond architecture, Roger has built and led high-performing software
          teams throughout his career. From initial business concept through
          production deployment, he has managed every aspect of the software
          lifecycle. His teams consistently deliver performant, maintainable
          systems—and his engineers regularly advance into leadership roles.
        </p>

        <hr className="modal-divider" />

        <h3>Technology Innovator</h3>
        <p className="modal-section-text">
          Roger has a track record of bringing emerging technology to business
          processes before it becomes mainstream:
        </p>
        <ul className="modal-timeline">
          <li><strong>1990s</strong> — Data Warehousing and BI systems</li>
          <li><strong>2000s</strong> — Enterprise Data Engineering</li>
          <li><strong>2010s</strong> — Highly scalable Hadoop data services</li>
          <li><strong>Late 2010s</strong> — Graph databases for complex relationships</li>
          <li><strong>2020s</strong> — AI-powered autonomous agent systems</li>
        </ul>
        <p className="modal-section-text">
          AI-AMP represents the culmination of this journey: applying decades
          of enterprise engineering discipline to the challenge of making AI
          agents reliable, accountable, and production-ready.
        </p>

        <hr className="modal-divider" />

        <blockquote className="modal-quote">
          &ldquo;I&apos;ve spent my career making complex data systems work reliably at
          scale. AI agents are the next frontier—and they need the same rigor.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
