
export type CardDesign = {
  backgroundStyle: string;
  textColor: string;
}

export type BusinessCard = {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertiseAreas: string[];
  links: {
    type: string;
    url: string;
  }[];
  status: string;
  design: CardDesign;
  connectionDate?: string;
  connectionEvent?: string;
  connectionDegree: 1 | 2;
  mutualConnections: string[]; // Names of mutual connections
  phoneNumber?: string; // Phone number for sending messages
}

export type Experience = {
  title: string;
  company: string;
  years: string;
  description?: string;
}

export type UserProfile = {
  experiences: Experience[];
  expertiseAreas: string[];
  card: BusinessCard | null;
}

export type ConnectionRequest = {
  id: string;
  fromUser: BusinessCard;
  timestamp: string;
}
