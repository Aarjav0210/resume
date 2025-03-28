// src/app/components/NavLink.tsx
import React from 'react';

interface NavLinkProps {
    section: string;
    currentSection: string;
    onNavigate: (section: string) => void;
    displayText?: string; // Optional prop for custom display text
    className?: string; // Optional className prop
}

const NavLink: React.FC<NavLinkProps> = ({ section, currentSection, onNavigate, displayText, className }) => {
    return (
        <button 
            className={className}
            onClick={() => onNavigate(section)}
        >
            <span className={`text-[#4CF0E8] ${currentSection === section ? 'underline' : ''}`}>{displayText || section}</span>
            <span className="text-[#84EF12]">&lt;</span>
        </button>
    );
};

export default NavLink;