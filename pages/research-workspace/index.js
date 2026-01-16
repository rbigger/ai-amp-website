import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

// Design System Colors (from Cowork session)
const colors = {
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  teal50: '#F0FDFA',
  teal500: '#14B8A6',
  teal600: '#0D9488',
  teal700: '#0F766E',
  blue50: '#EFF6FF',
  blue600: '#2563EB',
  green50: '#F0FDF4',
  green100: '#D1FAE5',
  green500: '#10B981',
  amber100: '#FEF3C7',
  amber500: '#F59E0B',
  red500: '#EF4444',
  violet100: '#F3E8FF',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  stageIdea: '#FEFCE8',
  stageClaims: '#F0FDF4',
  stageOutline: '#EFF6FF',
  stageDraft: '#FAFAFA',
};

const stages = [
  { id: 'idea', label: 'Idea', icon: '1', color: colors.stageIdea },
  { id: 'claims', label: 'Claims', icon: '2', color: colors.stageClaims },
  { id: 'outline', label: 'Outline', icon: '3', color: colors.stageOutline },
  { id: 'draft', label: 'Draft', icon: '4', color: colors.stageDraft },
];

const claims = [
  { id: 1, text: 'Current agent frameworks lack identity layer', status: 'reinforced', refs: 3 },
  { id: 2, text: 'JWT binding survives agent compromise', status: 'testing', refs: 4 },
  { id: 3, text: 'Approach maps to SOC 2 controls', status: 'partial', refs: 1 },
  { id: 4, text: 'Kernel-level binding is practical', status: 'untested', refs: 0 },
];

const getStatusIcon = (status) => {
  const icons = { reinforced: '✓', testing: '◐', partial: '◑', untested: '○', declined: '✗' };
  return icons[status] || '○';
};

const getStatusColor = (status) => {
  const statusColors = {
    reinforced: colors.green500,
    testing: colors.blue600,
    partial: colors.amber500,
    untested: colors.gray400,
    declined: colors.red500,
  };
  return statusColors[status] || colors.gray400;
};

const FrequencyBadge = ({ count }) => {
  let bg = colors.gray200;
  let color = colors.gray600;
  if (count >= 7) { bg = colors.green500; color = 'white'; }
  else if (count >= 5) { bg = colors.green100; color = colors.green500; }
  else if (count >= 3) { bg = colors.amber100; color = colors.gray700; }

  return (
    <span style={{
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 600,
      backgroundColor: bg,
      color: color,
    }}>
      {count}
    </span>
  );
};

export default function ResearchWorkspaceHome() {
  const [activeStage, setActiveStage] = useState('claims');
  const [selectedClaim, setSelectedClaim] = useState(0);

  return (
    <>
      <Head>
        <title>Research Workspace</title>
        <meta name="description" content="Structured workflow for academic writing with co-citation analysis" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.gray50,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: `1px solid ${colors.gray200}`,
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: `linear-gradient(135deg, ${colors.teal500} 0%, ${colors.teal600} 100%)`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
              }}>
                RW
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: colors.gray800 }}>
                Research Workspace
              </span>
            </div>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <Link href="/research-workspace/projects" style={{
                color: colors.gray500,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}>
                Projects
              </Link>
              <Link href="/research-workspace/projects" style={{
                padding: '8px 16px',
                background: colors.teal600,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
              }}>
                Open Workspace
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section style={{
          padding: '48px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, white 0%, #F9FAFB 100%)',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              color: colors.gray900,
              marginBottom: '16px',
              lineHeight: 1.2,
            }}>
              Research Workspace
            </h1>
            <p style={{
              fontSize: '18px',
              color: colors.gray500,
              marginBottom: '32px',
              lineHeight: 1.6,
            }}>
              Structured workflow for academic writing. Track claims, validate with literature, and write with co-citation analysis at every stage.
            </p>

            {/* Stage Navigation Demo */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              marginBottom: '32px',
            }}>
              {stages.map((stage, idx) => {
                const isActive = activeStage === stage.id;
                const isPast = stages.findIndex(s => s.id === activeStage) > idx;
                return (
                  <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => setActiveStage(stage.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: isActive ? 600 : 400,
                        backgroundColor: isActive ? colors.teal600 : 'transparent',
                        color: isActive ? 'white' : isPast ? colors.teal600 : colors.gray500,
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : isPast ? colors.teal50 : colors.gray100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}>
                        {stage.icon}
                      </span>
                      {stage.label}
                    </button>
                    {idx < stages.length - 1 && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ margin: '0 2px' }}>
                        <path d="M6 4L10 8L6 12" stroke={isPast ? colors.teal500 : colors.gray300} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Interactive Preview */}
        <section style={{ padding: '0 24px 48px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            border: `1px solid ${colors.gray200}`,
            overflow: 'hidden',
          }}>
            {/* Preview Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              borderBottom: `1px solid ${colors.gray100}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '13px', color: colors.gray500 }}>← Projects</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: colors.gray800 }}>
                  Agentic AI Security Framework
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Presence Avatars */}
                <div style={{ display: 'flex' }}>
                  {[
                    { initials: 'JD', color: colors.green500 },
                    { initials: 'AK', color: colors.blue600 },
                    { initials: 'ML', color: colors.violet500, opacity: 0.6 },
                  ].map((user, i) => (
                    <div key={i} style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: user.color,
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white',
                      marginLeft: i > 0 ? '-8px' : 0,
                      opacity: user.opacity || 1,
                    }}>
                      {user.initials}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: colors.gray500 }}>3 viewing</span>
                <button style={{
                  padding: '6px 12px',
                  background: colors.teal600,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  Share
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '220px 1fr 260px',
              minHeight: '380px',
            }}>
              {/* Claim List Sidebar */}
              <div style={{
                padding: '16px',
                borderRight: `1px solid ${colors.gray200}`,
                background: 'white',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.gray700, margin: 0 }}>
                    Claims
                  </h3>
                  <span style={{ fontSize: '12px', color: colors.teal600, cursor: 'pointer' }}>+ Add</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {claims.map((claim, idx) => (
                    <button
                      key={claim.id}
                      onClick={() => setSelectedClaim(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '12px',
                        borderRadius: '8px',
                        border: selectedClaim === idx ? `2px solid ${colors.teal500}` : `1px solid ${colors.gray200}`,
                        backgroundColor: selectedClaim === idx ? colors.teal50 : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '14px', color: getStatusColor(claim.status), fontWeight: 600 }}>
                          {getStatusIcon(claim.status)}
                        </span>
                        <span style={{ fontSize: '12px', color: colors.gray700, lineHeight: 1.4 }}>
                          {claim.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div style={{
                padding: '24px',
                background: stages.find(s => s.id === activeStage)?.color || colors.gray50,
                transition: 'background-color 0.3s',
              }}>
                <div style={{ maxWidth: '480px' }}>
                  {/* Status Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    backgroundColor: claims[selectedClaim].status === 'reinforced' ? colors.green100 : colors.blue50,
                    color: claims[selectedClaim].status === 'reinforced' ? colors.green500 : colors.blue600,
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '16px',
                  }}>
                    {getStatusIcon(claims[selectedClaim].status)} {claims[selectedClaim].status}
                  </div>

                  {/* Articulation Card */}
                  <div style={{
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: `1px solid ${colors.gray200}`,
                    marginBottom: '12px',
                  }}>
                    <label style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: colors.gray500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      Articulation
                    </label>
                    <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: 1.6, color: colors.gray700 }}>
                      {claims[selectedClaim].text}. This is the precise statement to be validated.
                    </p>
                  </div>

                  {/* References Card */}
                  <div style={{
                    padding: '16px',
                    background: 'white',
                    borderRadius: '8px',
                    border: `1px solid ${colors.gray200}`,
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: colors.gray500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}>
                        References
                      </label>
                      <span style={{ fontSize: '12px', color: colors.teal600, cursor: 'pointer' }}>+ Add</span>
                    </div>
                    {[
                      { author: 'Datta et al., 2025', freq: 7 },
                      { author: 'Schroeder, 2025', freq: 6 },
                    ].map((ref, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '6px 0',
                      }}>
                        <span style={{ fontSize: '13px', color: colors.gray700 }}>{ref.author}</span>
                        <FrequencyBadge count={ref.freq} />
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: colors.green500,
                      backgroundColor: colors.green100,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                      Mark Reinforced
                    </button>
                    <button style={{
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: colors.gray600,
                      backgroundColor: colors.gray100,
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                      Mark Declined
                    </button>
                  </div>
                </div>
              </div>

              {/* Cross-Pollination Panel */}
              <div style={{
                padding: '16px',
                borderLeft: `1px solid ${colors.gray200}`,
                background: 'white',
              }}>
                <h3 style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: colors.gray700,
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  Cross-Pollinate
                </h3>

                <label style={{ fontSize: '12px', color: colors.gray500 }}>Explore concepts from:</label>
                <select style={{
                  width: '100%',
                  marginTop: '4px',
                  marginBottom: '12px',
                  padding: '8px',
                  borderRadius: '6px',
                  border: `1px solid ${colors.gray300}`,
                  fontSize: '13px',
                  color: colors.gray700,
                }}>
                  <option>Information Theory</option>
                  <option>Cryptography</option>
                  <option>Game Theory</option>
                </select>

                {[
                  { concept: 'Covert Channels', path: 'Shannon - Lampson', note: 'Applies to prompt injection?' },
                  { concept: 'Error Correction', path: 'Hamming 1950', note: 'Agent self-correction?' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    backgroundColor: colors.violet100,
                    borderRadius: '8px',
                    marginBottom: '8px',
                  }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: colors.violet600, marginBottom: '4px' }}>
                      {item.concept}
                    </p>
                    <p style={{ fontSize: '11px', color: colors.gray600, marginBottom: '4px' }}>{item.path}</p>
                    <p style={{ fontSize: '12px', color: colors.gray500 }}>{item.note}</p>
                  </div>
                ))}

                <button style={{
                  marginTop: '8px',
                  width: '100%',
                  padding: '8px',
                  fontSize: '12px',
                  color: colors.violet600,
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.violet500}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}>
                  Find more bridges
                </button>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center',
            fontSize: '13px',
            color: colors.gray400,
            marginTop: '16px',
          }}>
            Interactive preview - click stages and claims to explore
          </p>
        </section>

        {/* Features */}
        <section style={{ padding: '48px 24px', background: 'white' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: colors.gray900,
              textAlign: 'center',
              marginBottom: '32px',
            }}>
              Key Capabilities
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { title: 'Claims Tracking', desc: 'Track claim status as evidence emerges: untested, testing, reinforced, partial, declined', bg: colors.green50 },
                { title: 'Co-Citation Analysis', desc: 'Surface foundational works and unexpected connections from your reference corpus', bg: colors.blue50 },
                { title: 'Cross-Pollination', desc: 'Explore concepts from adjacent fields that might apply to your research', bg: colors.violet100 },
                { title: 'Frequency Badges', desc: 'See which references are cited 7+, 5-6, 3-4, or 2 times across your corpus', bg: colors.amber100 },
                { title: 'Real-time Collaboration', desc: 'Presence indicators show who is viewing which section', bg: colors.teal50 },
                { title: 'BibTeX Import', desc: 'Import your reference library from Zotero, Mendeley, or any reference manager', bg: colors.gray100 },
              ].map((feature, i) => (
                <div key={i} style={{
                  padding: '20px',
                  backgroundColor: feature.bg,
                  borderRadius: '12px',
                }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.gray800, marginBottom: '8px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: colors.gray600, lineHeight: 1.5 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '48px 24px',
          background: `linear-gradient(135deg, ${colors.teal600} 0%, ${colors.teal700} 100%)`,
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'white', marginBottom: '16px' }}>
            Ready to begin?
          </h2>
          <Link href="/research-workspace/projects" style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: 'white',
            color: colors.teal600,
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
          }}>
            Go to Projects
          </Link>
        </section>

        {/* Footer */}
        <footer style={{
          padding: '24px',
          textAlign: 'center',
          borderTop: `1px solid ${colors.gray200}`,
          fontSize: '13px',
          color: colors.gray500,
        }}>
          Research Workspace
        </footer>
      </div>
    </>
  );
}
