import React from 'react';

export interface SkillIconProps {
    bgColor: string;
    textColor: string;
    text: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ bgColor, textColor, text }) => {
    return (
        <span 
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '20px',
                padding: '0 8px',
                borderRadius: '3px',
                backgroundColor: bgColor,
                color: textColor,
                fontSize: '10px', // Adjust font size as needed
            }}
        >
            {text}
        </span>
    );
};

export default SkillIcon;
