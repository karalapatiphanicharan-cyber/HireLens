export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}
