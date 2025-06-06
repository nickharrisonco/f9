
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDesignBrief } from '@/context/DesignBriefContext';
import { SectionKey } from '@/types';
import { ChevronRight, Info, Home, PiggyBank, Users, MapPin, Layout, Building, Image, Upload, FileText, ExternalLink, MessageSquare, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { AppLogo } from '@/components/AppLogo';
import { Badge } from '@/components/ui/badge';

interface DesignBriefSidebarProps {
  showLastSaved?: boolean;
  lastSavedFormatted?: string;
}

// Reorder to make "feedback" come after "summary"
const sections = [
  { id: 'intro', title: 'Introduction', icon: <Info className="h-5 w-5" /> },
  { id: 'projectInfo', title: 'Project Info', icon: <Home className="h-5 w-5" /> },
  { id: 'contractors', title: 'Project Team', icon: <Users className="h-5 w-5" /> },
  { id: 'budget', title: 'Budget', icon: <PiggyBank className="h-5 w-5" /> },
  { id: 'lifestyle', title: 'Lifestyle', icon: <Users className="h-5 w-5" /> },
  { id: 'site', title: 'Site', icon: <MapPin className="h-5 w-5" /> },
  { id: 'spaces', title: 'Spaces', icon: <Layout className="h-5 w-5" /> },
  { id: 'architecture', title: 'Architecture', icon: <Building className="h-5 w-5" /> },
  { id: 'uploads', title: 'Uploads', icon: <Upload className="h-5 w-5" /> },
  { id: 'communication', title: 'Communication', icon: <MessageSquare className="h-5 w-5" /> },
  { id: 'summary', title: 'Summary', icon: <FileText className="h-5 w-5" /> },
];

export function DesignBriefSidebar({ showLastSaved = false, lastSavedFormatted = '' }: DesignBriefSidebarProps) {
  const { currentSection, setCurrentSection } = useDesignBrief();
  const isMobile = useIsMobile();

  const navigateToSection = (sectionId: SectionKey) => {
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`h-full border-r bg-sidebar transition-all duration-300 relative ${isMobile ? 'w-full' : 'w-64'} overflow-hidden`}>
      <div className="h-full flex flex-col">
        <div className="py-6 px-4 flex flex-col items-center">
          <AppLogo size="large" />
          <span className="text-xs text-muted-foreground mt-2 mb-3">Build your vision with F9 Productions</span>
          
          {showLastSaved && lastSavedFormatted && (
            <div className="mt-1 text-xs text-muted-foreground text-center pb-2 border-b border-sidebar-border w-full">
              Last saved {lastSavedFormatted}
            </div>
          )}
        </div>
        
        {!showLastSaved && <Separator className="mb-2 bg-sidebar-border" />}
        
        <ScrollArea className="flex-1">
          <div className="px-2 py-2">
            {sections.map((section) => {
              return (
                <Button
                  key={section.id}
                  variant={currentSection === section.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start mb-1 relative group",
                    currentSection === section.id 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground animate-slide-in" 
                      : "hover:bg-sidebar-accent/20 transition-colors duration-200",
                    isMobile ? "text-sm py-2" : ""
                  )}
                  onClick={() => navigateToSection(section.id as SectionKey)}
                >
                  <div className="flex items-center w-full">
                    <span className={`mr-2 ${currentSection !== section.id ? 'group-hover:text-primary group-hover:scale-110 transition-all duration-200' : ''}`}>
                      {section.icon}
                    </span>
                    <span className="truncate">{section.title}</span>
                  </div>
                  {currentSection === section.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r animate-fade-in" />
                  )}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-sidebar-accent/10 border-sidebar-border mt-auto">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start truncate bg-sidebar-accent/20 hover:bg-sidebar-accent/30 text-sidebar-foreground font-medium text-sm transition-all duration-200 group" 
              onClick={() => window.open('https://f9productions.com', '_blank')}
            >
              <ExternalLink className="mr-2 h-5 w-5 shrink-0 text-accent group-hover:scale-110 transition-transform duration-200" />
              <span className="truncate">About F9 Productions</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
