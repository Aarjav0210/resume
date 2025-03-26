import React from 'react';
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ['latin', 'latin-ext'], weight: '400' });

interface KeyPressIconProps {
  text: string;
}

const KeyPressIcon: React.FC<KeyPressIconProps> = ({ text }) => {
  return (
    <span 
        className={`${jost.className} font-sans`}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '26px',
            padding: '10px 7px',
            border: '1px solid',
            borderRadius: '8px',
            fontSize: '14px', // Adjust font size as needed
            margin: '0 4px', // Optional: spacing between icons
        }}>
      {text}
    </span>
  );
};

export default KeyPressIcon;
