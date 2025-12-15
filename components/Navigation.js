import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          AI-<span>AMP</span>
        </Link>
        <ul className="nav-links">
          <li className="nav-dropdown">
            <Link href="/product/overview">Product</Link>
            <div className="nav-dropdown-content">
              <Link href="/product/overview">Overview</Link>
              <Link href="/product/agent-roles">Agent Roles</Link>
              <Link href="/product/compliance">Compliance</Link>
              <Link href="/product/dashboard">Dashboard</Link>
              <Link href="/product/memory">Memory Model</Link>
            </div>
          </li>
          <li className="nav-dropdown">
            <Link href="/solutions/enterprise">Solutions</Link>
            <div className="nav-dropdown-content">
              <Link href="/solutions/financial-services">Financial Services</Link>
              <Link href="/solutions/healthcare">Healthcare</Link>
              <Link href="/solutions/enterprise">Enterprise</Link>
            </div>
          </li>
          <li><Link href="/pricing">Pricing</Link></li>
          <li><Link href="#">Resources</Link></li>
          <li><Link href="/demo-request" className="btn btn-primary">Request Demo</Link></li>
        </ul>
        <button className="nav-mobile-toggle">&#9776;</button>
      </div>
    </nav>
  );
}
