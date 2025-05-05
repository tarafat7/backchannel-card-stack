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

// Updated with more second-degree connections
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
  },
  {
    id: '15',
    name: 'Emily Zhang',
    title: 'AR/VR Engineer',
    company: 'Meta',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['AR/VR', 'Computer Vision', 'Unity'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Researching spatial computing',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-purple-400 to-pink-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Aisha Johnson', 'Sam Wilson']
  },
  {
    id: '16',
    name: 'Daniel Lopez',
    title: 'Backend Developer',
    company: 'Spotify',
    avatar: 'https://images.unsplash.com/photo-1500648741775-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Go', 'Microservices', 'Kubernetes'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building scalable audio infrastructure',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Marcus Henderson']
  },
  {
    id: '17',
    name: 'Jasmine Patel',
    title: 'Product Marketing Manager',
    company: 'Adobe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    expertiseAreas: ['Marketing Strategy', 'Growth', 'Content'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Launching new creative suite',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Maya Rodriguez', 'Sophia Williams']
  },
  {
    id: '18',
    name: 'Carlos Mendez',
    title: 'DevOps Engineer',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['CI/CD', 'AWS', 'Infrastructure as Code'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Optimizing deployment pipelines',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-red-500 to-pink-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel', 'Marcus Henderson']
  },
  {
    id: '19',
    name: 'Natasha Wilson',
    title: 'Head of Design',
    company: 'Canva',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Design Systems', 'UI/UX', 'Brand Design'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Building global design team',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-green-400 to-emerald-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Elena Martinez', 'Sophia Williams']
  },
  {
    id: '20',
    name: 'Kevin Carter',
    title: 'Blockchain Developer',
    company: 'Ethereum Foundation',
    avatar: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Solidity', 'Smart Contracts', 'DeFi'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Working on Layer 2 solutions',
    design: {
      backgroundStyle: 'bg-gradient-card-3',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel']
  },
  {
    id: '21',
    name: 'Zoe Martinez',
    title: 'Product Designer',
    company: 'Slack',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    expertiseAreas: ['Product Design', 'Interaction Design', 'Accessibility'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Redesigning messaging experience',
    design: {
      backgroundStyle: 'bg-[#0f172a] bg-lines-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sophia Williams', 'Elena Martinez']
  },
  {
    id: '22',
    name: 'Isaac Washington',
    title: 'Cybersecurity Expert',
    company: 'Cloudflare',
    avatar: 'https://images.unsplash.com/photo-1485893086445-ed75865251e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
    expertiseAreas: ['Network Security', 'Penetration Testing', 'Zero Trust'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Securing enterprise networks',
    design: {
      backgroundStyle: 'bg-[#222222] bg-dots-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel', 'Sam Wilson']
  },
  {
    id: '23',
    name: 'Ava Thompson',
    title: 'Growth Marketer',
    company: 'HubSpot',
    avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['SEO', 'Content Marketing', 'Analytics'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Developing new acquisition channels',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-pink-500 to-orange-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Thomas Chen', 'Maya Rodriguez']
  },
  {
    id: '24',
    name: 'Tyler Rodriguez',
    title: 'Mobile Developer',
    company: 'Lyft',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['iOS', 'Swift', 'Mobile Architecture'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building ride-sharing features',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Marcus Henderson']
  },
  {
    id: '25',
    name: 'Leo Hernandez',
    title: 'Cloud Architect',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Azure', 'Cloud Infrastructure', 'Serverless'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Working on cloud-native solutions',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel', 'Marcus Henderson']
  },
  {
    id: '26',
    name: 'Sophie Chen',
    title: 'UI Designer',
    company: 'Dropbox',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['User Interfaces', 'Visual Design', 'Design Tools'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Creating new design system',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Elena Martinez', 'Sophia Williams']
  },
  {
    id: '27',
    name: 'Adrian Wong',
    title: 'Data Engineer',
    company: 'Snowflake',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80',
    expertiseAreas: ['ETL', 'Data Warehousing', 'SQL'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building data pipelines',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Aisha Johnson']
  },
  {
    id: '28',
    name: 'Rachel Green',
    title: 'Game Developer',
    company: 'Epic Games',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1371&q=80',
    expertiseAreas: ['Unreal Engine', 'Game Design', 'Graphics'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' },
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Working on next-gen graphics',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-green-400 to-teal-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Marcus Henderson']
  },
  {
    id: '29',
    name: 'Noah Reed',
    title: 'Content Strategist',
    company: 'TikTok',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['Social Media', 'Content Creation', 'Viral Marketing'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Researching content trends',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Maya Rodriguez', 'Thomas Chen']
  },
  {
    id: '30',
    name: 'Isabelle Kim',
    title: 'Technical Writer',
    company: 'GitLab',
    avatar: 'https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
    expertiseAreas: ['Documentation', 'API Docs', 'Technical Communication'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Improving developer docs',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-orange-400 to-amber-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Marcus Henderson']
  },
  {
    id: '31',
    name: 'Miguel Sanchez',
    title: 'Product Analyst',
    company: 'Shopify',
    avatar: 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Data Analysis', 'A/B Testing', 'Product Metrics'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Analyzing ecommerce trends',
    design: {
      backgroundStyle: 'bg-[#0f172a] bg-lines-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Thomas Chen', 'Olivia Parker']
  },
  {
    id: '32',
    name: 'Julia Foster',
    title: 'UX Researcher',
    company: 'Airbnb',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['User Research', 'Usability Testing', 'User Psychology'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Conducting global user studies',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-pink-400 to-rose-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sophia Williams', 'Olivia Parker']
  },
  {
    id: '33',
    name: 'Elijah Cooper',
    title: 'Growth Engineer',
    company: 'Pinterest',
    avatar: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    expertiseAreas: ['User Acquisition', 'Conversion Optimization', 'Analytics'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Optimizing onboarding flows',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-teal-400 to-emerald-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Thomas Chen']
  },
  {
    id: '34',
    name: 'Lily Peterson',
    title: 'AI Ethicist',
    company: 'Google',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['AI Ethics', 'Responsible AI', 'Public Policy'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Working on responsible AI guidelines',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-blue-400 to-violet-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Aisha Johnson']
  },
  {
    id: '35',
    name: 'Drew Simmons',
    title: 'Frontend Engineer',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80',
    expertiseAreas: ['React', 'TypeScript', 'Performance Optimization'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Improving checkout experience',
    design: {
      backgroundStyle: 'bg-[#222222] bg-dots-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Marcus Henderson']
  },
  {
    id: '36',
    name: 'Vanessa Taylor',
    title: 'Interaction Designer',
    company: 'Apple',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80',
    expertiseAreas: ['Motion Design', 'Microinteractions', 'Prototyping'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Designing for spatial computing',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-fuchsia-500 to-purple-600',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Elena Martinez', 'Sophia Williams']
  },
  {
    id: '37',
    name: 'Garrett Phillips',
    title: 'Technical Recruiter',
    company: 'Amazon',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Tech Hiring', 'Talent Acquisition', 'Employer Branding'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring for multiple roles',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-amber-500 to-orange-600',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Marcus Henderson', 'Olivia Parker']
  },
  {
    id: '38',
    name: 'Serena Williams',
    title: 'Venture Partner',
    company: 'Andreessen Horowitz',
    avatar: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80',
    expertiseAreas: ['Venture Capital', 'Startups', 'Early-stage Investing'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Investing in B2B SaaS',
    design: {
      backgroundStyle: 'bg-gradient-card-2',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Jordan Lee']
  },
  {
    id: '39',
    name: 'Mason Rivera',
    title: 'Security Engineer',
    company: 'Slack',
    avatar: 'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['Application Security', 'Threat Modeling', 'Encryption'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Implementing zero trust architecture',
    design: {
      backgroundStyle: 'bg-[#000000] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel', 'Sam Wilson']
  },
  {
    id: '40',
    name: 'Isabella Martinez',
    title: 'ML Engineer',
    company: 'Databricks',
    avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['ML Ops', 'PyTorch', 'Data Science'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Training new models at scale',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-indigo-400 to-blue-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Aisha Johnson']
  },
  {
    id: '41',
    name: 'Caleb Johnson',
    title: 'SRE',
    company: 'Twitter',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Reliability Engineering', 'Monitoring', 'Incident Response'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building observability tools',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Marcus Henderson', 'Rajiv Patel']
  },
  {
    id: '42',
    name: 'Trinity Bishop',
    title: 'Design Systems Lead',
    company: 'Atlassian',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    expertiseAreas: ['Design Systems', 'Component Libraries', 'Design Tokens'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Launching new component library',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-slate-500 to-gray-700',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Elena Martinez', 'Sophia Williams']
  },
  {
    id: '43',
    name: 'Harrison Ford',
    title: 'Innovation Lead',
    company: 'Tesla',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Electric Vehicles', 'Energy Storage', 'Renewable Energy'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Working on new battery tech',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-rose-400 to-red-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Jordan Lee', 'Rajiv Patel']
  },
  {
    id: '44',
    name: 'Morgan Hayes',
    title: 'Payments Lead',
    company: 'Square',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Fintech', 'Payment Processing', 'Financial Inclusion'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Expanding global payment options',
    design: {
      backgroundStyle: 'bg-gradient-card-1',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Olivia Parker', 'Jordan Lee']
  },
  {
    id: '45',
    name: 'Aiden Mitchell',
    title: 'Quantum Computing Researcher',
    company: 'IBM',
    avatar: 'https://images.unsplash.com/photo-1533674689012-136b487b7736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    expertiseAreas: ['Quantum Computing', 'Physics', 'Algorithms'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Researching quantum algorithms',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-violet-500 to-purple-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Aisha Johnson']
  },
  {
    id: '46',
    name: 'Nora Ahmed',
    title: 'AR/VR Product Manager',
    company: 'Magic Leap',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1389&q=80',
    expertiseAreas: ['Mixed Reality', 'Product Management', 'Spatial Computing'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Building AR developer tools',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Olivia Parker', 'Elena Martinez']
  },
  {
    id: '47',
    name: 'Leo Chen',
    title: 'CTO',
    company: 'Plaid',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Fintech Infrastructure', 'API Design', 'Banking'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Building financial connections',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Rajiv Patel', 'Jordan Lee']
  },
  {
    id: '48',
    name: 'Mia Wilson',
    title: 'Design Program Manager',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
    expertiseAreas: ['Design Operations', 'Team Management', 'Design Strategy'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Scaling design processes',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-purple-400 to-indigo-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Elena Martinez', 'Sophia Williams']
  },
  {
    id: '49',
    name: 'Lucas Rivera',
    title: 'SEO Specialist',
    company: 'Squarespace',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Search Engine Optimization', 'Content Strategy', 'Analytics'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Optimizing search visibility',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-yellow-400 to-amber-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Thomas Chen', 'Maya Rodriguez']
  },
  {
    id: '50',
    name: 'Amara Jackson',
    title: 'Accessibility Specialist',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Accessibility', 'Inclusive Design', 'WCAG Standards'],
    links: [
      { type: 'Portfolio', url: 'https://example.com' },
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Making streaming more accessible',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-cyan-400 to-sky-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sophia Williams', 'Maya Rodriguez']
  },
  {
    id: '51',
    name: 'Omar Hassan',
    title: 'Engineering Manager',
    company: 'DoorDash',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Engineering Leadership', 'Logistics Tech', 'Mobile'],
    links: [
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building delivery optimization',
    design: {
      backgroundStyle: 'bg-[#0f172a] bg-lines-pattern',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Marcus Henderson', 'Sam Wilson']
  },
  {
    id: '52',
    name: 'Harper Lewis',
    title: 'Animations Engineer',
    company: 'Lottie',
    avatar: 'https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Motion Design', 'Animation', 'Frontend'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Creating animation libraries',
    design: {
      backgroundStyle: 'bg-gradient-to-r from-pink-400 to-rose-500',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson', 'Elena Martinez']
  }
];
