
import React from 'react';
import { useAppContext, BusinessCard } from '../context/AppContext';

type ProfessionalHistoryProps = {
  id: string;
};

// Sample professional histories for demonstration
const sampleHistories: Record<string, { position: string; company: string; duration: string; description?: string }[]> = {
  '1': [
    {
      position: 'Frontend Engineer',
      company: 'Linear',
      duration: '2022 - Present',
      description: 'Building cutting-edge interface components and improving product performance.'
    },
    {
      position: 'UI Developer',
      company: 'Figma',
      duration: '2020 - 2022',
      description: 'Developed key UI components for design system implementation.'
    }
  ],
  '2': [
    {
      position: 'Frontend Engineer',
      company: 'Linear',
      duration: '2022 - Present',
      description: 'Building cutting-edge interface components and improving product performance.'
    },
    {
      position: 'UI Developer',
      company: 'Figma',
      duration: '2020 - 2022',
      description: 'Developed key UI components for design system implementation.'
    },
    {
      position: 'Junior Developer',
      company: 'Startup Inc',
      duration: '2018 - 2020'
    }
  ],
  '3': [
    {
      position: 'Product Manager',
      company: 'Stripe',
      duration: '2021 - Present',
      description: 'Leading payment product initiatives and fintech solutions.'
    },
    {
      position: 'Associate PM',
      company: 'Square',
      duration: '2019 - 2021',
      description: 'Managed merchant-focused payment features.'
    }
  ],
  '4': [
    {
      position: 'Startup Founder',
      company: 'Acme Inc',
      duration: '2020 - Present',
      description: 'Leading AI-driven solutions for enterprise clients.'
    },
    {
      position: 'Head of Product',
      company: 'Tech Innovators',
      duration: '2018 - 2020'
    },
    {
      position: 'Product Designer',
      company: 'Creative Solutions',
      duration: '2016 - 2018'
    }
  ],
  '5': [
    {
      position: 'Marketing Director',
      company: 'Netflix',
      duration: '2021 - Present',
      description: 'Leading global marketing campaigns for original content.'
    },
    {
      position: 'Marketing Manager',
      company: 'Spotify',
      duration: '2018 - 2021',
      description: 'Developed user acquisition strategies.'
    },
    {
      position: 'Marketing Associate',
      company: 'Adobe',
      duration: '2016 - 2018'
    }
  ],
  // Adding professional experience for 2nd degree connections
  '6': [
    {
      position: 'Senior UX Designer',
      company: 'Shopify',
      duration: '2021 - Present',
      description: 'Leading design team for merchant experience initiatives.'
    },
    {
      position: 'UX Designer',
      company: 'Facebook',
      duration: '2018 - 2021',
      description: 'Improved mobile app engagement by 22% through interface redesign.'
    }
  ],
  '7': [
    {
      position: 'Tech Lead',
      company: 'Airbnb',
      duration: '2022 - Present',
      description: 'Leading mobile application development team.'
    },
    {
      position: 'Senior Developer',
      company: 'Twitter',
      duration: '2019 - 2022',
      description: 'Architected and implemented core components of the main feed.'
    },
    {
      position: 'Frontend Developer',
      company: 'Google',
      duration: '2017 - 2019'
    }
  ],
  '8': [
    {
      position: 'Venture Capitalist',
      company: 'Sequoia Capital',
      duration: '2020 - Present',
      description: 'Leading investments in early-stage SaaS and fintech startups.'
    },
    {
      position: 'Investment Associate',
      company: 'Andreessen Horowitz',
      duration: '2018 - 2020',
      description: 'Analyzed and evaluated investment opportunities in tech sector.'
    },
    {
      position: 'Financial Analyst',
      company: 'Goldman Sachs',
      duration: '2016 - 2018'
    }
  ],
  // Adding Marcus Henderson's professional experience
  '9': [
    {
      position: 'Chief Technology Officer',
      company: 'TechVision Inc',
      duration: '2022 - Present',
      description: 'Leading technological innovation and strategic direction for an AI-driven startup.'
    },
    {
      position: 'VP of Engineering',
      company: 'Salesforce',
      duration: '2019 - 2022',
      description: 'Led a team of 50+ engineers building enterprise cloud solutions.'
    },
    {
      position: 'Senior Software Architect',
      company: 'Microsoft',
      duration: '2016 - 2019',
      description: 'Designed scalable cloud infrastructure systems for Azure.'
    }
  ],
  // Adding for second degree connections
  '11': [
    {
      position: 'Lead UX Designer',
      company: 'Shopify',
      duration: '2021 - Present',
      description: 'Leading merchant experience design team and design system development.'
    },
    {
      position: 'Senior UX Designer',
      company: 'Facebook',
      duration: '2018 - 2021',
      description: 'Redesigned core mobile app features, increasing user engagement by 22%.'
    },
    {
      position: 'UI Designer',
      company: 'Dribbble',
      duration: '2016 - 2018'
    }
  ],
  '12': [
    {
      position: 'Mobile Engineering Lead',
      company: 'Airbnb',
      duration: '2022 - Present',
      description: 'Leading a team of 12 engineers building the next generation mobile experience.'
    },
    {
      position: 'Senior Mobile Developer',
      company: 'Twitter',
      duration: '2019 - 2022',
      description: 'Architected and implemented core components of the Twitter mobile feed.'
    },
    {
      position: 'Frontend Developer',
      company: 'Google',
      duration: '2017 - 2019',
      description: 'Contributed to the Material Design component library and Chrome extensions.'
    }
  ],
  '13': [
    {
      position: 'Partner',
      company: 'Sequoia Capital',
      duration: '2020 - Present',
      description: 'Leading early-stage investments in SaaS, fintech, and AI startups.'
    },
    {
      position: 'Investment Principal',
      company: 'Andreessen Horowitz',
      duration: '2018 - 2020',
      description: 'Sourced and led investments in over 15 early-stage startups.'
    },
    {
      position: 'Senior Financial Analyst',
      company: 'Goldman Sachs',
      duration: '2016 - 2018',
      description: 'Specialized in tech sector IPOs and M&A transactions.'
    }
  ],
  '14': [
    {
      position: 'Research Scientist',
      company: 'DeepMind',
      duration: '2022 - Present',
      description: 'Leading research in computer vision and reinforcement learning applications.'
    },
    {
      position: 'AI Researcher',
      company: 'OpenAI',
      duration: '2019 - 2022',
      description: 'Contributed to key breakthroughs in generative models for language and images.'
    },
    {
      position: 'PhD Candidate',
      company: 'Stanford University',
      duration: '2015 - 2019',
      description: 'Specialized in machine learning with focus on neural networks.'
    }
  ]
};

const ProfessionalHistory: React.FC<ProfessionalHistoryProps> = ({ id }) => {
  const { connections } = useAppContext();

  // Check if history exists for this ID
  const history = sampleHistories[id] || [];
  
  // If no history found, show a message
  if (history.length === 0) {
    return (
      <div className="text-center py-2">
        <p className="text-sm text-muted-foreground">No professional experience available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[250px] overflow-auto no-scrollbar">
      <h4 className="text-sm font-medium text-white/90">Professional Experience</h4>
      <div className="relative border-l border-primary/30 ml-2 pl-4 space-y-4">
        {history.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-primary rounded-full" />
            <div>
              <h5 className="font-medium text-sm">{item.position}</h5>
              <div className="flex justify-between text-xs text-white/70">
                <span>{item.company}</span>
                <span>{item.duration}</span>
              </div>
              {item.description && (
                <p className="text-xs text-white/60 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalHistory;
