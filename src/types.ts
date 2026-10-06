export interface Project {
  id: string;
  name: string;
  status: 'active' | 'sold-out' | 'new';
  description: string;
  location: string;
  developer: string;
  highlights: string[];
  image: string;
  ctaText: string;
  priceEstimate?: string;
  category?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WhyReason {
  id: string;
  title: string;
  text: string;
  highlightText?: string;
}

export interface ContactInfo {
  name: string;
  role: string;
  phone: string;
  phoneDisplay: string;
  slogan: string;
  zaloChatUrl: string;
  email: string;
  projectsSummary: string;
}

