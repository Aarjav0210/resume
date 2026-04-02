import React from 'react';
import NavLink from '@/app/components/NavLink';

interface NavSection {
    id: string;
    displayText: string;
}

interface NavLinksProps {
    currentSection: string;
    onNavigate: (section: string) => void;
    sections: NavSection[];
}

const NavLinks: React.FC<NavLinksProps> = ({ currentSection, onNavigate, sections }) => {
    return (
        <div className="flex flex-col gap-1 mt-[30px] mr-[30px]">
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
