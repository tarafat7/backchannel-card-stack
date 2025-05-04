
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, WalletCards, Plus, MapPin, X } from "lucide-react";

type HomeHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'stack' | 'grid' | 'list';
  setViewMode: (mode: 'stack' | 'grid' | 'list') => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const HomeHeader: React.FC<HomeHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  activeFilter,
  setActiveFilter
}) => {
  const filters = ['All', 'Recent', 'Hiring', 'Investing', 'Building'];
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="p-4 sticky top-0 bg-background/90 backdrop-blur-xl z-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <WalletCards className="w-5 h-5 mr-2 text-primary" />
          <h1 className="text-xl font-semibold">Cards</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-secondary">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="relative mb-3">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="h-4 w-4" />
        </div>
        <Input
          placeholder="Search cards..."
          className="pl-9 pr-9 bg-secondary rounded-full h-9 border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2" 
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
              activeFilter === filter
                ? 'bg-primary text-white'
                : 'bg-secondary text-muted-foreground'
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </header>
  );
};

export default HomeHeader;
