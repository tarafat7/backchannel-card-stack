
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List } from "lucide-react";

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

  return (
    <header className="p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Your Network</h1>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('stack')}
            className={viewMode === 'stack' ? 'text-primary' : 'text-muted-foreground'}
          >
            <LayoutGrid className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}
          >
            <LayoutGrid className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search connections..."
          className="pl-9 bg-secondary border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
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
