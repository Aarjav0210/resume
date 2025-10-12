import React from 'react';
import Image from 'next/image';

// Based on WorkExperienceCard structure
interface EducationEntry {
    id: number; // Add an ID for mapping keys
    institution: string;
    timePeriod: string;
    degree: string;
    notes: string;
    imageSrc: string;
    layout?: 'vertical' | 'horizontal'; // Add layout prop
    style?: React.CSSProperties;
}

const EducationCard: React.FC<EducationEntry> = ({ 
    institution, 
    timePeriod, 
    degree, 
    notes, 
    imageSrc, 
    layout = 'vertical', // Default to vertical
    style
}) => {
    const isHorizontal = layout === 'horizontal';

    // Define classes for vertical layout (current implementation)
    const verticalContainerClasses = "relative flex flex-col rounded-[20px] bg-[#1E1E1E] overflow-hidden shadow-md";
    const verticalImageClasses = "w-full h-[180px] xl:h-[280px] object-cover";
    const verticalTextContainerClasses = "flex flex-col p-6 flex-grow";

    // Define classes for horizontal layout (for tablet)
    const horizontalContainerClasses = "relative flex flex-row rounded-[20px] bg-[#1E1E1E] overflow-hidden shadow-md w-full h-[200px]";
    const horizontalImageClasses = "w-[250px] h-full object-cover flex-none";
    const horizontalTextContainerClasses = "flex flex-col p-6 flex-grow gap-1"; // Added gap-1

    return (
        <div className={isHorizontal ? horizontalContainerClasses : verticalContainerClasses}>
            <Image 
                src={imageSrc} 
                alt={`${institution} logo`} 
                className={isHorizontal ? horizontalImageClasses : verticalImageClasses} 
                width={isHorizontal ? 250 : 383} // Adjust width hint based on layout
                height={isHorizontal ? 200 : 280} // Adjust height hint based on layout
                priority // Prioritize loading images in view? Optional.
                style={style}
            />
            <div className={isHorizontal ? horizontalTextContainerClasses : verticalTextContainerClasses}>
                <div className='flex flex-col gap-1 flex-grow'> {/* Allow text to grow */} 
                    <h2 className="text-xl text-[#4CF0E8]">{institution}</h2>
                    <h3 className="text-sm text-[#84EF12] mt-1">{timePeriod}</h3>
                    {/* Vertical layout specific text styles */}
                    {!isHorizontal && (
                        <>
                            <p className="text-sm text-white mt-4">{degree}</p>
                            <p className="text-xs text-gray-400 mt-1">{notes}</p>
                        </>
                    )}
                </div>
                 {/* Horizontal layout specific text styles - placed outside inner flex-grow */}
                 {isHorizontal && (
                    <div className='flex-grow flex flex-col justify-center'>
                        <p className="text-sm text-white mt-2">{degree}</p>
                        <p className="text-sm text-gray-400 mt-1">{notes}</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default EducationCard;



