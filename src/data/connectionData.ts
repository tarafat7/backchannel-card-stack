
import { BusinessCard } from "@/context/AppContext";

// Sample connection data - 10 unique first-degree connections
export const sampleConnections: BusinessCard[] = [
  {
    id: '1',
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
    id: '2',
    name: 'Olivia Parker',
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
    id: '3',
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
    id: '4',
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
  },
  {
    id: '5',
    name: 'Elena Martinez',
    title: 'Creative Director',
    company: 'Figma',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Design Systems', 'Brand Identity', 'Typography'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Launching design system',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-purple-400 to-indigo-500',
      textColor: 'text-white'
    },
    connectionDate: '2023-06-12',
    connectionEvent: 'Design Conference',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '6',
    name: 'Rajiv Patel',
    title: 'CTO',
    company: 'Coinbase',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Blockchain', 'Cryptocurrency', 'Security'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building Web3 infrastructure',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-green-400 to-teal-500',
      textColor: 'text-white'
    },
    connectionDate: '2023-09-05',
    connectionEvent: 'Web3 Summit',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '7',
    name: 'Aisha Johnson',
    title: 'Data Scientist',
    company: 'OpenAI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    expertiseAreas: ['Machine Learning', 'NLP', 'Python'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'New research in generative AI',
    design: {
      backgroundStyle: 'bg-[#222222] bg-dots-pattern',
      textColor: 'text-white'
    },
    connectionDate: '2023-10-22',
    connectionEvent: 'AI Research Conference',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '8',
    name: 'Thomas Chen',
    title: 'Growth Lead',
    company: 'Notion',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    expertiseAreas: ['Growth Hacking', 'User Acquisition', 'Analytics'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring growth marketers',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
      textColor: 'text-white'
    },
    connectionDate: '2023-07-18',
    connectionEvent: 'SaaS Meetup',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '9',
    name: 'Sophia Williams',
    title: 'UX Designer',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['User Research', 'Interaction Design', 'Prototyping'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Redesigning core products',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      textColor: 'text-white'
    },
    connectionDate: '2023-11-15',
    connectionEvent: 'UX Conference',
    connectionDegree: 1 as 1,
    mutualConnections: []
  },
  {
    id: '10',
    name: 'Marcus Henderson',
    title: 'Head of Engineering',
    company: 'Vercel',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['NextJS', 'React', 'Serverless'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Scaling infrastructure',
    design: {
      backgroundStyle: 'bg-[#000000] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDate: '2023-08-30',
    connectionEvent: 'Web Performance Summit',
    connectionDegree: 1 as 1,
    mutualConnections: []
  }
];

// Sample second degree connections
export const sampleSecondDegreeConnections: BusinessCard[] = [
  {
    id: '11',
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
    mutualConnections: ['Olivia Parker', 'Sam Wilson']
  },
  {
    id: '12',
    name: 'James Reynolds',
    title: 'Tech Lead',
    company: 'Airbnb',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
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
    id: '13',
    name: 'Priya Malhotra',
    title: 'Venture Capitalist',
    company: 'Sequoia Capital',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
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
    id: '14',
    name: 'David Kim',
    title: 'AI Researcher',
    company: 'DeepMind',
    avatar: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
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
