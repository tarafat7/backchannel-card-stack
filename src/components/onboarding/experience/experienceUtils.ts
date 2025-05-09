
import { Experience } from '@/types';

/**
 * Updates the years field based on startYear and endYear
 */
export const calculateYearsField = (startYear: string, endYear: string): string => {
  return endYear === 'Present' 
    ? `${startYear} - Present` 
    : (startYear && endYear) ? `${startYear} - ${endYear}` : '';
};

/**
 * Validate that at least one experience is complete
 */
export const hasOneCompleteExperience = (experiences: Experience[]): boolean => {
  return experiences.some(exp => 
    exp.title.trim() && exp.company.trim() && exp.years.trim()
  );
};

/**
 * Filter and format experiences for submission
 */
export const prepareExperiencesForSubmission = (
  experiences: (Experience & { startYear?: string; endYear?: string })[]
): Experience[] => {
  // Filter out empty experiences
  const filledExperiences = experiences.filter(exp => 
    exp.title.trim() && exp.company.trim() && (exp.startYear || exp.years)
  );
  
  // Make sure all experiences have the years field properly set
  return filledExperiences.map(exp => ({
    title: exp.title,
    company: exp.company,
    years: exp.years || (exp.endYear === 'Present' 
      ? `${exp.startYear} - Present` 
      : `${exp.startYear} - ${exp.endYear}`),
    description: exp.description
  }));
};
