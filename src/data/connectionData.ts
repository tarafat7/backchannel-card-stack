
import { BusinessCard } from "@/context/AppContext";

// Sample connection data
export const sampleConnections: BusinessCard[] = [
  {
    id: '2',
    name: 'Sam Wilson',
    title: 'Frontend Engineer',
    company: 'Linear',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    expertiseAreas: ['Frontend', 'React', 'TypeScript'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' },
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building new features',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-blue-500 to-purple-500',
      textColor: 'text-white'
    },
    connectionDate: '2023-10-15',
    connectionEvent: 'Tech Conference',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '3',
    name: 'Riley Johnson',
    title: 'Product Manager',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Product Strategy', 'Fintech', 'Growth'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring designers',
    design: {
      backgroundStyle: 'bg-[#0f172a] bg-lines-pattern',
      textColor: 'text-white'
    },
    connectionDate: '2023-11-02',
    connectionEvent: 'Startup Mixer',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '4',
    name: 'Jordan Lee',
    title: 'Startup Founder',
    company: 'Acme Inc',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Founder', 'Angel Investing', 'AI/ML'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Raising seed round',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-pink-500 to-orange-500',
      textColor: 'text-white'
    },
    connectionDate: '2023-09-20',
    connectionEvent: 'YC Demo Day',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '5',
    name: 'Maya Rodriguez',
    title: 'Marketing Director',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
    expertiseAreas: ['Marketing', 'Content Strategy', 'Growth'],
    links: [],
    status: 'Working on new campaign',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDate: '2023-08-05',
    connectionEvent: 'Marketing Meetup',
    connectionDegree: 1 as 1,
    mutualConnections: []
  }
];

// Sample second degree connections
export const sampleSecondDegreeConnections: BusinessCard[] = [
  {
    id: '6',
    name: 'Alicia Chen',
    title: 'Senior UX Designer',
    company: 'Shopify',
    avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['UX Design', 'Research', 'UI Design'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring junior designers',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-green-400 to-blue-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Riley Johnson', 'Sam Wilson']
  },
  {
    id: '7',
    name: 'Marcus James',
    title: 'Tech Lead',
    company: 'Airbnb',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Engineering Leadership', 'System Design', 'React Native'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Building mobile team',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson']
  },
  {
    id: '8',
    name: 'Priya Patel',
    title: 'Venture Capitalist',
    company: 'Sequoia Capital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    expertiseAreas: ['Investing', 'SaaS', 'Fintech'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Seeking early-stage startups',
    design: {
      backgroundStyle: 'bg-[#222222] bg-dots-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Jordan Lee']
  },
  {
    id: '9',
    name: 'David Kim',
    title: 'AI Researcher',
    company: 'DeepMind',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['Machine Learning', 'Neural Networks', 'Computer Vision'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Just published new research',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-teal-400 to-blue-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Jordan Lee']
  }
];
