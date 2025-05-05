
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BusinessCard, useAppContext } from '@/context/AppContext';
import CardStack from '@/components/CardStack';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import ConnectionCounter from '@/components/home/ConnectionCounter';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';

const ConnectionsView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [personName, setPersonName] = useState('');
  const [connectionCards, setConnectionCards] = useState<BusinessCard[]>([]);
  
  useEffect(() => {
    // If viewing all connections
    if (id === 'all') {
      setPersonName('Your');
      setConnectionCards([...connections, ...sampleConnections]);
      return;
    }
    
    // Find the person whose connections we're viewing
    const allConnections = [...connections, ...sampleConnections, ...sampleSecondDegreeConnections];
    const person = allConnections.find(c => c.id === id);
    
    if (person) {
      setPersonName(person.name);
      
      // Generate random connections for this person
      // In a real app, these would come from the database
      const randomConnections = allConnections
        .filter(c => c.id !== id) // Don't include the person themselves
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, person.connectionCount || 5) // Take the number of connections they have
        .map(conn => ({
          ...conn,
          connectionDegree: 2 as 1 | 2, // Explicitly cast to 1 | 2 type
          mutualConnections: [person.name], // The person is the mutual connection
        }));
      
      setConnectionCards(randomConnections);
    }
  }, [id, connections]);
  
  const handleCardClick = (cardId: string) => {
    navigate(`/card/${cardId}`);
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-start items-center sticky top-0 bg-background/80 backdrop-blur-xl z-10">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-lg font-medium">{personName} Network</h1>
      </header>
      
      {/* Connection count */}
      <ConnectionCounter 
        totalConnections={connectionCards.length} 
        label={`${personName}'s Connections`}
      />
      
      {/* Card Stack */}
      <main className="flex-1 p-4 overflow-hidden">
        <CardStack 
          cards={connectionCards} 
          onCardClick={handleCardClick} 
        />
      </main>
    </div>
  );
};

export default ConnectionsView;
