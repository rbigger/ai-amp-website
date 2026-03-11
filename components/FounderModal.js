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
        <p>
          Roger spent decades at the largest financial institutions—Citigroup
          and JP Morgan Chase—as well as major media organizations, designing
          mission-critical systems that process millions of transactions daily,
          and managing the teams that built them. He understands
          what it takes to build systems that are scalable, secure, and robust
          enough to satisfy regulators and serve demanding clients worldwide.
        </p>

        <hr className="modal-divider" />

        <h3>Engineering Leader</h3>
        <p>
          Beyond architecture, Roger has built and led high-performing software
          teams throughout his career. From initial business concept through
          production deployment, he has managed every aspect of the software
          lifecycle. His teams consistently deliver performant, maintainable
          systems—and his engineers regularly advance into leadership roles.
        </p>

        <hr className="modal-divider" />

        <h3>Technology Innovator</h3>
        <p>
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
        <p>
          AI-AMP represents the culmination of this journey: applying decades
          of enterprise engineering discipline to the challenge of making AI
          agents reliable, accountable, and production-ready.
        </p>

        <hr className="modal-divider" />

        <blockquote className="modal-quote">
          "I've spent my career making complex data systems work reliably at
          scale. AI agents are the next frontier—and they need the same rigor."
        </blockquote>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-lg);
        }

        .modal-content {
          background: var(--color-background);
          border-radius: var(--border-radius-lg, 12px);
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--spacing-2xl);
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: var(--spacing-md);
          right: var(--spacing-md);
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--color-text-light);
          line-height: 1;
          padding: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .modal-close:hover {
          background: var(--color-background-alt);
        }

        .modal-title {
          margin: 0 0 var(--spacing-sm);
          font-size: 1.75rem;
        }

        .modal-subtitle {
          margin: 0;
          color: var(--color-text-light);
        }

        .modal-divider {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: var(--spacing-lg) 0;
        }

        .modal-content h3 {
          font-size: 1.1rem;
          margin: 0 0 var(--spacing-sm);
          color: var(--color-accent);
        }

        .modal-content p {
          margin: 0 0 var(--spacing-md);
          line-height: 1.6;
        }

        .modal-timeline {
          list-style: none;
          padding: 0;
          margin: var(--spacing-md) 0;
        }

        .modal-timeline li {
          padding: var(--spacing-xs) 0;
          padding-left: var(--spacing-md);
          position: relative;
        }

        .modal-timeline li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: var(--color-accent);
          border-radius: 50%;
        }

        .modal-quote {
          font-style: italic;
          border-left: 3px solid var(--color-accent);
          padding-left: var(--spacing-lg);
          margin: var(--spacing-lg) 0 0;
          color: var(--color-text-light);
        }

        @media (max-width: 640px) {
          .modal-content {
            padding: var(--spacing-lg);
          }

          .modal-title {
            font-size: 1.5rem;
            padding-right: var(--spacing-xl);
          }
        }
      `}</style>
    </div>
  );
}
