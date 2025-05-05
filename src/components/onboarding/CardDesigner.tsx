import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Paintbrush, Droplets, Palette, Image } from 'lucide-react';
import BusinessCard from '../BusinessCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface CardDesignerProps {
  card: any;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
  onComplete: () => void;
  backgroundOptions: string[];
}

const CardDesigner: React.FC<CardDesignerProps> = ({ 
  card,
  selectedBackground,
  setSelectedBackground,
  textColor,
  setTextColor,
  status,
  setStatus,
  links,
  handleLinkChange,
  onComplete,
  backgroundOptions
}) => {
  // New state for enhanced customization
  const [customHexColor, setCustomHexColor] = useState('#1A1A1A');
  const [selectedGradient, setSelectedGradient] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageFile, setCustomImageFile] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(100);

  // Predefined gradient options
  const gradientOptions = [
    'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
    'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)',
    'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
    'linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)',
    'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
    'linear-gradient(to right, #ee9ca7, #ffdde1)',
    'linear-gradient(to right, #243949 0%, #517fa4 100%)',
    'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
    'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)'
  ];

  // Color palette options (expanded from previous)
  const colorOptions = [
    '#222222', '#403E43', '#1A1A1A', '#0f0f10', '#5B61F3', '#2166EE',
    '#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#27272a', 
    '#9b87f5', '#7E69AB', '#1EAEDB', '#33C3F0'
  ];

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setCustomImageFile(file);
          
          // Set background to custom image
          const imageStyle = `url(${event.target.result}) center/cover no-repeat`;
          setSelectedBackground(imageStyle);
          
          // Reset other selections
          setSelectedGradient('');
          
          toast({
            title: "Image uploaded",
            description: "Your custom background has been applied",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Apply custom hex color
  const applyCustomColor = () => {
    setSelectedBackground(customHexColor);
    setSelectedGradient('');
    toast({
      title: "Color applied",
      description: "Your custom color has been set",
    });
  };

  // Apply selected gradient
  const applyGradient = (gradient: string) => {
    setSelectedBackground(gradient);
    setSelectedGradient(gradient);
    toast({
      title: "Gradient applied",
      description: "Your gradient background has been set",
    });
  };

  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
      <div className="mb-8">
        {card && (
          <BusinessCard card={card} isPreview={true} />
        )}
      </div>
      
      <Tabs defaultValue="solid" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="solid" className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Solid</span>
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span className="hidden sm:inline">Gradient</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-1">
            <Paintbrush className="w-4 h-4" />
            <span className="hidden sm:inline">Custom</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Image</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="solid">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square rounded-md transition-all hover:scale-105`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedBackground(color)}
                    aria-label={`Color ${color}`}
                  >
                    {selectedBackground === color && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gradient">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {gradientOptions.map((gradient, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-video rounded-md transition-all hover:scale-105 ${selectedGradient === gradient ? 'ring-2 ring-primary' : ''}`}
                    style={{ background: gradient }}
                    onClick={() => applyGradient(gradient)}
                    aria-label={`Gradient ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: customHexColor }}></div>
                <div className="flex-1">
                  <Input 
                    type="text"
                    value={customHexColor}
                    onChange={(e) => setCustomHexColor(e.target.value)}
                    placeholder="#FFFFFF or rgb(255,255,255)"
                    className="mb-2"
                  />
                  <Button onClick={applyCustomColor} size="sm">Apply Color</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Opacity</label>
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  value={[opacity]}
                  onValueChange={handleOpacityChange}
                  className="my-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>{opacity}%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="image">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="image-upload" className="text-sm font-medium block mb-2">Upload Image</label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
                
                {customImage && (
                  <div className="relative w-full h-24 rounded-md overflow-hidden">
                    <img 
                      src={customImage} 
                      alt="Custom background" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-2">
                  Upload an image to use as a custom background for your card.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4">
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
      
      <Button 
        onClick={onComplete} 
        className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Finish
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardDesigner;
