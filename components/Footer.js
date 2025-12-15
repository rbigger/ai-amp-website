import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="/product/overview">Overview</Link></li>
              <li><Link href="/product/agent-roles">Agent Roles</Link></li>
              <li><Link href="/product/compliance">Compliance</Link></li>
              <li><Link href="/product/dashboard">Dashboard</Link></li>
              <li><Link href="/product/memory">Memory Model</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><Link href="/solutions/financial-services">Financial Services</Link></li>
              <li><Link href="/solutions/healthcare">Healthcare</Link></li>
              <li><Link href="/solutions/enterprise">Enterprise</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">White Papers</Link></li>
              <li><Link href="#">Case Studies</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Privacy</Link></li>
              <li><Link href="#">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AI-AMP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
