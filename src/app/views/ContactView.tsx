"use client";
import React from "react";
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Using react-icons for consistency if used elsewhere, otherwise adjust
import TerminalHeader from "@/app/components/TerminalHeader"; // Import TerminalHeader

// Removed empty interface

// Removed type annotation and unused props
const ContactView = () => {
  const email = "aarjav02@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/aarjav-jain/"; // Ensure protocol is included for external link
  
  return (
    <section 
      id="contact" 
      className="snap-start h-screen grid grid-rows-[120px_1fr]"
    >
      {/* Header row */} 
      <div className="flex row-start-1 items-center justify-start px-12 py-20 sm:p-20">
        <TerminalHeader username="aarjav_jain" text="contact" className="flex-shrink-0" />
      </div>
      
      {/* Content container row */}
      <div className="w-full row-start-2 flex flex-col items-center justify-center 
                    overflow-hidden px-8 pb-8"
      >
        {/* Contact Info Column */}
        <div className="flex flex-col items-center justify-center"
        >
            {/* Buttons container */}
            <div className="flex flex-col md:flex-row items-center gap-8 
                          [@media(max-height:500px)]:flex-col"
            >
                <a 
                    href={`mailto:${email}`} 
                    className="flex items-center gap-2 p-4 bg-[#1E1E1E] rounded-lg shadow hover:bg-[#171717] transition-colors duration-300"
                    aria-label="Email Aarjav Jain"
                    >
                    <FaEnvelope className="text-xl text-gray-400" />
                    <span className="text-lg text-gray-200">{email}</span>
                </a>
                <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-4 bg-[#1E1E1E] rounded-lg shadow hover:bg-[#171717] transition-colors duration-300"
                    aria-label="Aarjav Jain's LinkedIn Profile"
                    >
                    <FaLinkedin className="text-xl text-blue-500" /> 
                    <span className="text-lg text-gray-200">LinkedIn Profile</span>
                </a>
            </div>
            {/* Text */}
            <p className="mt-4 text-gray-400 text-center">
                Feel free to reach out via email or connect on LinkedIn!
            </p>
        </div>

      </div>
    </section>
  );
};

export default ContactView; 