export interface ProductItem {
  id: string;
  name: string;
  category: 'quimicos' | 'equipamentos' | 'nanotecnologia' | 'seguranca';
  categoryLabel: string;
  tagline: string;
  description: string;
  composition: string;
  benefit: string;
  iconName: string;
  isEco: boolean;
}

export interface PartnerItem {
  id: string;
  name: string;
  segment: string;
  city: string;
  quote: string;
  author: string;
  authorRole: string;
  metric: string;
}

export interface PlanItem {
  id: string;
  title: string;
  badge?: string;
  popular?: boolean;
  type: 'pontual' | 'assinatura';
  frequency: string;
  idealFor: string;
  basePrice: string;
  features: string[];
  notIncluded?: string[];
  ctaLabel: string;
}

export interface SimulationParams {
  propertyType: 'apartamento' | 'casa' | 'comercial' | 'fachada';
  areaM2: number;
  dirtLevel: 'leve' | 'pesada' | 'critica';
  frequencyPreference: 'pontual' | 'bimestral' | 'mensal';
}

export interface PortfolioHouse {
  id: string;
  title: string;
  location: string;
  areaM2: number;
  category: 'mansao' | 'cobertura' | 'corporativo' | 'fachada';
  categoryLabel: string;
  imageUrl: string;
  dateCompleted: string;
  scope: string;
}

export interface SiteConfig {
  videoUrl: string;
  videoTitle: string;
  videoSubtitle: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  postUrl: string;
  date: string;
}

export interface InstagramConfig {
  handle: string;
  profileName: string;
  profilePicUrl: string;
  bio: string;
  followersCount: string;
  followingCount: string;
  postsCount: string;
  isVerified: boolean;
  profileUrl: string;
  feedMode?: 'native' | 'widget';
  widgetCode?: string;
  posts: InstagramPost[];
}
