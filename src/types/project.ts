export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imgSrc: string;
  classCard: string;
  link: string;
  platform: string;
  highlightColor: number;
  desktopImage?: string;
  mobileImage?: string;
  platformSpecific?: string[];
  featured?: boolean;
}
