// Sidebar.js
import React, { useState, useEffect } from 'react';
import '@/app/components/Sidebar.css'; // Assuming you have some CSS for styling
import NavLinks from '@/app/components/NavLinks'; // Import the new NavLinks component
import Image from 'next/image';
import profilePhoto from '/public/assets/aarjav-profile-photo.jpg';

const Sidebar: React.FC<{ onClose: () => void; currentSection: string; setCurrentSection: (section: string) => void }> = ({ onClose, currentSection, setCurrentSection }) => {
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
        console.log(`Navigating to section: ${section}`); // Debugging log
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close the sidebar after navigation
            if (onClose) onClose(); // Call the onClose function if it exists
            setCurrentSection(section); // Update the current section when navigating
        } else {
            console.error(`Element with ID ${section} not found`); // Error log if element is not found
        }
    };

    return (
        <div>
            <button 
                className={`toggle-button ${isOpen ? 'open' : ''} group`} 
                onClick={toggleSidebar}
                style={{ position: 'absolute', top: '70px', right: '50px' }}
            >
                <div className='text-base flex items-center gap-1'>
                    {/* <span className='opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' aria-hidden="true" tabIndex={-1}>navigate </span> */}
                    <span className='hidden md:inline text-white group-hover:text-[#84EF12] transition-colors duration-300'>navigate </span>
                    
                    <span className={`text-[#84EF12] rotate-icon ${isOpen ? 'open' : ''}`}>&lt;</span>
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
                  <NavLinks currentSection={currentSection} onNavigate={handleNavigation} />
                </div>
                {/* Download CV Link */}
                <div className="absolute bottom-8 right-8">
                    <a 
                        href="/assets/Aarjav_Jain_CV.pdf" 
                        download
                        className="sidebar-download-link text-base cursor-pointer"
                    >
                        download_cv <span className="sidebar-download-chevron text-[#84EF12]">&lt;</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;