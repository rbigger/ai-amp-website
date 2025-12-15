# AI-AMP Marketing Website

Next.js website for ai-agent-management-platform.com, deployed on Vercel.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploying to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from the ai-amp-site directory)
cd /path/to/ai-amp-site
vercel

# For production deployment
vercel --prod
```

### Option 2: GitHub Integration

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure build settings
6. Click "Deploy"

## Domain Configuration

### Step 1: Add Domain in Vercel

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. Enter `ai-agent-management-platform.com`
4. Click **Add**

### Step 2: Configure DNS

Vercel will show you DNS records to add. Typically:

**Option A: Using Vercel DNS (Recommended)**
- Change your domain's nameservers to Vercel's:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

**Option B: External DNS**

Add these records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Step 3: Verify Domain

1. After adding DNS records, return to Vercel
2. Click **Verify** next to your domain
3. Wait for DNS propagation (can take up to 48 hours, usually minutes)

### Step 4: SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. Once your domain is verified, HTTPS will be enabled automatically.

## Project Structure

```
ai-amp-site/
├── components/          # Reusable React components
│   ├── Layout.js        # Page wrapper with nav/footer
│   ├── Navigation.js    # Site navigation
│   └── Footer.js        # Site footer
├── pages/               # Next.js pages (file-based routing)
│   ├── _app.js          # App wrapper
│   ├── index.js         # Homepage
│   ├── pricing.js       # Pricing page
│   ├── demo-request.js  # Demo request form
│   ├── contact-sales.js # Sales contact form
│   ├── thank-you.js     # Form confirmation
│   ├── product/         # Product pages
│   │   ├── overview.js
│   │   ├── agent-roles.js
│   │   ├── compliance.js
│   │   ├── dashboard.js
│   │   └── memory.js
│   └── solutions/       # Solutions pages
│       ├── enterprise.js
│       ├── healthcare.js
│       └── financial-services.js
├── public/              # Static assets
│   └── images/          # Images
├── styles/
│   └── globals.css      # Global styles
├── next.config.js       # Next.js configuration
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies
```

## Form Handling

Forms use [FormSubmit.co](https://formsubmit.co/) for email delivery:

- **Demo requests** → `demo_requested@discoverie.us`
- **Sales inquiries** → `sales@discoverie.us`

**First submission**: FormSubmit requires email verification on first use. Check the inbox for a verification email.

## Environment Variables

No environment variables required for basic deployment. If you add features that need them:

1. Go to Vercel dashboard → Settings → Environment Variables
2. Add variables for Production/Preview/Development

## Updating the Site

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub (if using GitHub integration)
4. Vercel automatically deploys on push

Or manually deploy:
```bash
vercel --prod
```

## Troubleshooting

### Domain not working
- Check DNS propagation: https://dnschecker.org
- Verify DNS records are correct in your registrar
- Wait up to 48 hours for full propagation

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Form not sending
- Check FormSubmit email verification
- Check browser console for errors
- Ensure form action URL is correct

## Support

For questions about the website, contact the development team.
