import { createContext, useState, useContext, ReactNode, useEffect, useMemo, useCallback } from 'react';
import { DataContextType, SkillsData } from './types';

// Create context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  
  const [data, setData] = useState<Omit<DataContextType, 'loading' | 'error'>>({
    navigation: [],
    education: {
      heading: '',
      subheading: '',
      academics: [],
      certifications: []
    },
    experience: {
      heading: '',
      subheading: '',
      jobs: []
    },   
    about: {
      heading: '',
      subheading: '',
      imageUrl: '',
      contactButtonText: '',
      resumeUrl: '',
      resumeButtonText: '',
      titleTags: [],
      aboutContent: '',
      linkedin: '',
      github: '',
      codepen: '',
      whatsappNumber: '',
      whatsappMessage: ''
    },
    hero: {
      heading: '',
      greeting: '',
      titles: [],
      scrollText: '',
      flipAnimationDuration: 500,
      titleChangeInterval: 3000,
      backgroundImage: ''
    },
    skills: [],
    skillsSection: undefined,
    contact: {
      heading: '',
      subheading: '',
      getInTouchHeading: '',
      getInTouchText: '',
      email: '',
      formLabels: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      formButtons: {
        submit: '',
        sending: ''
      },
      formMessages: {
        success: {
          title: '',
          text: ''
        },
        error: {
          title: '',
          text: ''
        }
      }
    },
    seo: {
      title: '',
      description: '',
      keywords: '',
      author: '',
      ogImage: '',
      twitterHandle: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/data/data.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const jsonData = await response.json();
      // Extract skills items from the skills data
      const processedData = {
        ...jsonData,
        skills: jsonData.skills?.items || [],
        skillsSection: jsonData.skills as SkillsData
      };
      
      setData(processedData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    education: data.education, 
    experience: data.experience,
    about: data.about,
    hero: data.hero,
    skills: data.skills,
    skillsSection: data.skillsSection,
    contact: data.contact,
    seo: data.seo,
    navigation: data.navigation,
    loading, 
    error 
  }), [
    data.education, 
    data.experience,
    data.about,
    data.hero,
    data.skills,
    data.skillsSection,
    data.contact,
    data.seo,
    data.navigation,
    loading, 
    error
  ]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 