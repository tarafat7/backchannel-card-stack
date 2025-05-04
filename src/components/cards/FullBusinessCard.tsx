
import React, { useState } from 'react';
import { BusinessCard } from '@/context/AppContext';
import ExpertiseAreas from '../shared/ExpertiseAreas';
import CardLinks from '../shared/CardLinks';
import ConnectedStatus from '../shared/ConnectedStatus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Save, X } from 'lucide-react';

type FullBusinessCardProps = {
  card: BusinessCard;
  isEditing?: boolean;
  onSave?: (updatedCard: BusinessCard) => void;
  onCancelEdit?: () => void;
};

const FullBusinessCard = ({ 
  card, 
  isEditing = false,
  onSave,
  onCancelEdit
}: FullBusinessCardProps) => {
  const [editedCard, setEditedCard] = useState<BusinessCard>({ ...card });

  const handleChange = (field: keyof BusinessCard, value: any) => {
    setEditedCard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExpertiseChange = (areas: string[]) => {
    setEditedCard(prev => ({
      ...prev,
      expertiseAreas: areas
    }));
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedCard);
    }
  };

  if (isEditing) {
    return (
      <Card className="m-4">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-black/20 overflow-hidden border border-black/20">
              {editedCard.avatar && (
                <img 
                  src={editedCard.avatar} 
                  alt={editedCard.name} 
                  className="w-full h-full object-cover" 
                />
              )}
            </div>
            <div className="flex-1">
              <Input 
                value={editedCard.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Name"
                className="mb-2"
              />
              <Input 
                value={editedCard.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Title"
                className="mb-2"
              />
              <Input 
                value={editedCard.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Company"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Textarea 
              value={editedCard.status}
              onChange={(e) => handleChange('status', e.target.value)}
              placeholder="What are you up to?"
              className="resize-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Areas of Expertise (comma-separated)</label>
            <Textarea 
              value={editedCard.expertiseAreas.join(', ')}
              onChange={(e) => handleExpertiseChange(e.target.value.split(',').map(area => area.trim()).filter(Boolean))}
              placeholder="Frontend, React, TypeScript"
              className="resize-none"
            />
          </div>

          <div className="flex space-x-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`m-4 p-6 rounded-xl ${card.design.backgroundStyle}`}>
      <div className={`h-full ${card.design.textColor}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-black/20 overflow-hidden border border-white/20">
            {card.avatar && (
              <img 
                src={card.avatar} 
                alt={card.name} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{card.name}</h1>
            <p className="text-lg opacity-90">{card.title}</p>
            <p className="text-sm opacity-80">{card.company}</p>
          </div>
        </div>
        
        {card.status && (
          <div className="px-3 py-1.5 bg-black/10 rounded-lg text-sm mt-4 backdrop-blur-sm w-fit">
            {card.status}
          </div>
        )}
        
        <ExpertiseAreas areas={card.expertiseAreas} />
        <CardLinks links={card.links} />
        <ConnectedStatus connectionDate={card.connectionDate} connectionEvent={card.connectionEvent} />
      </div>
    </div>
  );
};

export default FullBusinessCard;
