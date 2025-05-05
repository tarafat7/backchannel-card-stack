
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  CheckCircle, 
  Linkedin,
  Upload,
  Image as ImageIcon,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BusinessCard from '../components/BusinessCard';

const backgroundOptions = [
  'bg-gradient-card-1',
  'bg-gradient-card-2',
  'bg-gradient-card-3',
  'bg-black',
  'bg-[#1A1A1A] bg-subtle-grid'
];

const expertise = [
  "Product Design", 
  "Angel Investing", 
  "Hiring Engineers", 
  "Mobile Dev", 
  "Frontend", 
  "Backend",
  "AI/ML",
  "DevOps",
  "Founder",
  "Marketing",
  "Growth",
  "Sales",
  "UX Research",
  "Data Science",
  "Venture Capital",
  "Fintech",
  "Healthtech"
];

// Mock LinkedIn data for demo
const mockLinkedInData = {
  name: "Alex Morgan",
  experiences: [
    { 
      title: "Product Designer", 
      company: "Vercel", 
      years: "2022 - Present" 
    },
    { 
      title: "UX Designer", 
      company: "Notion", 
      years: "2019 - 2022" 
    },
    { 
      title: "UI Designer", 
      company: "Figma", 
      years: "2016 - 2019" 
    }
  ],
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { onboardingStep, setOnboardingStep, updateProfile, profile, updateBusinessCard } = useAppContext();
  
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundOptions[0]);
  const [textColor, setTextColor] = useState<string>('text-white');
  const [status, setStatus] = useState<string>('Open to work');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [links, setLinks] = useState([
    { type: 'Twitter', url: 'https://twitter.com' },
    { type: 'GitHub', url: 'https://github.com' },
    { type: 'Portfolio', url: 'https://example.com' }
  ]);

  useEffect(() => {
    // Create a preview card whenever these values change
    if (onboardingStep >= 2) {
      updateBusinessCard({
        id: '1',
        name: mockLinkedInData.name,
        title: mockLinkedInData.experiences[0].title,
        company: mockLinkedInData.experiences[0].company,
        avatar: mockLinkedInData.avatar,
        expertiseAreas: selectedExpertise,
        links,
        status,
        design: {
          backgroundStyle: selectedBackground,
          textColor: textColor
        }
      });
    }
  }, [selectedExpertise, selectedBackground, textColor, status, links, onboardingStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isImporting) {
      interval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // When progress reaches 100%, complete the import
            setTimeout(() => {
              updateProfile({
                experiences: mockLinkedInData.experiences,
              });
              
              setIsImporting(false);
              setOnboardingStep(1);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isImporting]);

  const handleLinkedInImport = () => {
    setIsImporting(true);
    setImportProgress(0);
  };

  const handleExpertiseToggle = (area: string) => {
    if (selectedExpertise.includes(area)) {
      setSelectedExpertise(selectedExpertise.filter(e => e !== area));
    } else {
      if (selectedExpertise.length < 5) {
        setSelectedExpertise([...selectedExpertise, area]);
      }
    }
  };

  const handleLinkChange = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleComplete = () => {
    navigate('/home');
  };

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-6 rounded-full mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Import your experience</h2>
              <p className="text-muted-foreground text-center max-w-xs">
                Join our exclusive community by securely importing your professional experience
              </p>
            </div>
            
            <div className="glass-card p-6 mb-8 rounded-xl border border-white/10">
              <div className="flex items-center mb-4">
                <Lock className="w-4 h-4 text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Secure, encrypted connection</span>
              </div>
              
              <Button 
                onClick={handleLinkedInImport}
                disabled={isImporting}
                className="w-full flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#0077B5]/90 transition-all"
              >
                <Linkedin className="w-5 h-5" />
                {isImporting ? 'Connecting...' : 'Connect with LinkedIn'}
              </Button>
              
              {isImporting && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between mb-1 text-xs">
                    <span>{importProgress < 100 ? 'Importing profile...' : 'Import complete!'}</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground text-center animate-pulse mt-2">
                    {importProgress < 30 && "Establishing secure connection..."}
                    {importProgress >= 30 && importProgress < 60 && "Retrieving professional history..."}
                    {importProgress >= 60 && importProgress < 90 && "Analyzing experience..."}
                    {importProgress >= 90 && "Finalizing import..."}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="w-3 h-3" />
              <span>Your data is private and securely encrypted</span>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Your experience</h2>
            
            <div className="space-y-4 mb-8">
              {profile.experiences.map((exp, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/5 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.years}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium mb-4">Select your expertise (max 5)</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {expertise.map((area) => (
                <button
                  key={area}
                  onClick={() => handleExpertiseToggle(area)}
                  className={`chip ${selectedExpertise.includes(area) ? 'chip-selected' : ''}`}
                >
                  {area}
                </button>
              ))}
            </div>
            
            <Button 
              onClick={() => setOnboardingStep(2)} 
              className="w-full"
              disabled={selectedExpertise.length === 0}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Profile photo</h2>
            
            <div className="mb-8 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-secondary/70 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden border border-white/10 ring-2 ring-primary/20">
                {mockLinkedInData.avatar ? (
                  <img 
                    src={mockLinkedInData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10">
                  <Upload className="w-4 h-4" />
                  Upload
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10">
                  <ArrowRight className="w-4 h-4" />
                  Use LinkedIn photo
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => setOnboardingStep(3)} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
        
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
            
            <div className="mb-8">
              {profile.card && (
                <BusinessCard card={profile.card} isPreview={true} />
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Background style</label>
                <div className="grid grid-cols-5 gap-2">
                  {backgroundOptions.map((bg, index) => (
                    <button
                      key={index}
                      className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedBackground(bg)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Text color</label>
                <div className="flex gap-2">
                  <button
                    className={`w-10 h-10 rounded-full bg-black ${textColor === 'text-white' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setTextColor('text-white')}
                  />
                  <button
                    className={`w-10 h-10 rounded-full bg-white ${textColor === 'text-black' ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setTextColor('text-black')}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Input 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  placeholder="What are you up to now?"
                  className="bg-secondary/50 backdrop-blur-sm border border-white/10"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Social links</label>
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={link.type} 
                        onChange={(e) => handleLinkChange(index, 'type', e.target.value)} 
                        placeholder="Type"
                        className="bg-secondary/50 backdrop-blur-sm border border-white/10 w-1/3"
                      />
                      <Input 
                        value={link.url} 
                        onChange={(e) => handleLinkChange(index, 'url', e.target.value)} 
                        placeholder="URL"
                        className="bg-secondary/50 backdrop-blur-sm border border-white/10 flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleComplete} 
              className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              Finish
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col">
      <div className="px-6 py-8 flex-1">
        <div className="mb-10 flex justify-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Backchannel
          </h1>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
