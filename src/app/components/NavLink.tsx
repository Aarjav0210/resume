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
            <span className={`text-[var(--color-cyan)] ${currentSection === section ? 'underline' : ''}`}>{displayText || section}</span>
            <span className="text-[var(--color-green)]">&lt;</span>
        </button>
    );
};

export default NavLink;