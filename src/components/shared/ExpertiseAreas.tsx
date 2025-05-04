
import React from 'react';

type ExpertiseAreasProps = {
  areas?: string[];
};

const ExpertiseAreas = ({ areas }: ExpertiseAreasProps) => {
  if (!areas || areas.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h3 className="text-sm opacity-80 mb-2">Areas of Expertise</h3>
      <div className="flex flex-wrap gap-2">
        {areas.map((area, index) => (
          <span key={index} className="chip">
            {area}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExpertiseAreas;
