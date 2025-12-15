import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  const pageTitle = title ? `${title} | AI-AMP` : 'AI-AMP | AI Agent Management Platform';
  const pageDescription = description || 'AI-AMP orchestrates teams of specialized AI agents with full accountability, audit trails, and compliance controls.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
