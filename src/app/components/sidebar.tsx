import React, { useState, useEffect } from 'react';
import '@/app/components/Sidebar.css';
import NavLinks from '@/app/components/NavLinks';
import Image from 'next/image';
import profilePhoto from '/public/assets/aarjav-profile-photo.jpg';
import type { Persona } from '@/app/types/Persona';

interface SidebarProps {
    onClose: () => void;
    currentSection: string;
    setCurrentSection: (section: string) => void;
    sections: { id: string; displayText: string }[];
    onResetPersona: () => void;
    onToggleMinimal: () => void;
    noBs: boolean;
    theme: "dark" | "light";
    onToggleTheme: () => void;
    persona?: Persona;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, currentSection, setCurrentSection, sections, onResetPersona, onToggleMinimal, noBs, theme, onToggleTheme, persona }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen]);

    const handleNavigation = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            if (onClose) onClose();
            setCurrentSection(section);
        }
    };

    const handleSwitchProfile = () => {
        setIsOpen(false);
        onResetPersona();
    };

    return (
        <div>
            <button 
                className={`toggle-button ${isOpen ? 'open' : ''} group`} 
                onClick={toggleSidebar}
                style={{ position: 'absolute', top: '70px', right: '50px' }}
            >
                <div className='text-base flex items-center gap-1'>
                    <span className='hidden md:inline text-white group-hover:text-[var(--color-green)] transition-colors duration-300'>navigate </span>
                    <span className={`text-[var(--color-green)] rotate-icon ${isOpen ? 'open' : ''}`}>&lt;</span>
                </div>
            </button>
            {isOpen && <div className={`mask ${isOpen ? 'show' : ''}`} onClick={toggleSidebar} />}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className='profile-photo'>
                  <div className='profile-photo-frame'>
                    <Image src={profilePhoto} alt='Profile' width={1000} height={600} quality={100} className='circular-photo zoom-head' />
                  </div>
                </div>
                <div className="sidebar-nav-glow">
                  <NavLinks currentSection={currentSection} onNavigate={handleNavigation} sections={sections} />
                </div>

                <div className="absolute bottom-8 right-8 flex flex-col items-end gap-3">
                    <button
                        onClick={() => { setIsOpen(false); onToggleMinimal(); }}
                        className="sidebar-download-link text-xs cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                        {noBs ? "animated" : "minimal"} <span className="text-[var(--color-green)]">&lt;</span>
                    </button>
                    <button
                        onClick={() => { setIsOpen(false); onToggleTheme(); }}
                        className="sidebar-download-link text-xs cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                        {theme === "dark" ? "☀ light" : "🌙 dark"} <span className="text-[var(--color-green)]">&lt;</span>
                    </button>
                    <button
                        onClick={handleSwitchProfile}
                        className="sidebar-download-link text-xs cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
                    >
                        switch_profile <span className="text-[var(--color-green)]">&lt;</span>
                    </button>
                    <a 
                        href={persona === "researcher" ? "/assets/Aarjav_Jain_CV_Research.pdf" : "/assets/Aarjav_Jain_CV.pdf"} 
                        download
                        className="sidebar-download-link text-base cursor-pointer"
                    >
                        download_cv <span className="sidebar-download-chevron text-[var(--color-green)]">&lt;</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
