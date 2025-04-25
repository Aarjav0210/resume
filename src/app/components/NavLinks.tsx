import React from 'react';
import NavLink from '@/app/components/NavLink';

interface NavLinksProps {
    currentSection: string;
    onNavigate: (section: string) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ currentSection, onNavigate }) => {
    const sections = [
        { id: 'landing', displayText: 'home' }, 
        { id: 'work-experience', displayText: 'work_experience' }, 
        { id: 'education', displayText: 'education' },
        { id: 'projects', displayText: 'projects'}
    ]; // Define sections with optional display text

    return (
        <div className="flex flex-col gap-1 mt-[85px] mr-[40px]">
            {sections.map(({ id, displayText }) => (
                <NavLink 
                    key={id} 
                    section={id} 
                    currentSection={currentSection} 
                    onNavigate={onNavigate} 
                    displayText={displayText} 
                    className="bg-transparent border-none text-right mr-5 cursor-pointer transition-all duration-300"
                />
            ))}
        </div>
    );
};

export default NavLinks;
