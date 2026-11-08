// Everything about the organisation that appears in more than one place lives here, so a change is one edit.
export const site = {
  name: 'Takweyat International Organization',
  short: 'Takweyat',
  nameUrdu: 'تقویت',
  email: 'contact@takweyat.org',
  // Not supplied yet. The pages show these lines only when a value is filled in.
  phone: null as string | null,
  whatsapp: null as string | null,
  helpline: null as string | null,
  // Where lead forms post to (n8n webhook). Until it is set, forms show a polite fallback with the email address.
  formEndpoint: null as string | null,
  boycottPlatform: 'https://boycottisraelonline.com',
  offices: [
    { name: 'Head Office, Islamabad', lines: ['Bahria Town Phase 3'] },
    {
      name: 'Regional Legal Chamber, Gujar Khan',
      lines: ['Chamber Number 3, Basement', 'Lawyers Complex Building, Kutchery', 'Gujar Khan'],
    },
  ],
  nav: [
    { label: 'About us', href: '/about/' },
    { label: 'What we do', href: '/what-we-do/' },
    { label: 'Our plans', href: '/plans/' },
    { label: 'Get involved', href: '/get-involved/' },
  ],
  footerLinks: {
    Explore: [
      { label: 'About us', href: '/about/' },
      { label: 'What we do', href: '/what-we-do/' },
      { label: 'Free legal aid', href: '/free-legal-aid/' },
      { label: 'Initiatives', href: '/initiatives/' },
    ],
    'Plans and papers': [
      { label: 'The Educational Plan', href: '/plans/education/' },
      { label: 'The Legal Aid and Justice Plan', href: '/plans/justice/' },
      { label: 'Whitepapers', href: '/whitepapers/' },
      { label: 'Press', href: '/press/' },
    ],
    'Take part': [
      { label: 'Get involved', href: '/get-involved/' },
      { label: 'Join the movement', href: '/join/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Media kit', href: '/media-kit/' },
    ],
    'Small print': [
      { label: 'Privacy and confidentiality', href: '/privacy/' },
      { label: 'Terms and disclaimer', href: '/terms/' },
      { label: 'Accessibility', href: '/accessibility/' },
    ],
  },
};

export const withBase = (p: string) => p;
