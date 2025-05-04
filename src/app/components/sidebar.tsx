// Sidebar.js
import React, { useState, useEffect } from 'react';
import '@/app/components/Sidebar.css'; // Assuming you have some CSS for styling
import NavLinks from '@/app/components/NavLinks'; // Import the new NavLinks component

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
                className={`toggle-button ${isOpen ? 'open' : ''}`} 
                onClick={toggleSidebar}
                style={{ position: 'absolute', top: '70px', right: '50px' }}
            >
                <div className='text-base'>
                    {/* <span className='opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' aria-hidden="true" tabIndex={-1}>navigate </span> */}
                    <span className='hidden md:inline'>navigate </span>
                    
                    <span className={`text-[#84EF12] rotate-icon ${isOpen ? 'open' : ''}`}>&lt;</span>
                </div>
            </button>
            {isOpen && <div className={`mask ${isOpen ? 'show' : ''}`} onClick={toggleSidebar} />}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <NavLinks currentSection={currentSection} onNavigate={handleNavigation} /> {/* Use NavLinks component */}
            </div>
        </div>
    );
};

export default Sidebar;