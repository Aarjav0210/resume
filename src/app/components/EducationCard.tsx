import React from 'react';
import Image from 'next/image';

interface EducationCardProps {
    institution: string;
    timePeriod: string;
    degree: string;
    notes: string;
    imageSrc: string;
}

const EducationCard: React.FC<EducationCardProps> = ({ institution, timePeriod, degree, notes, imageSrc }) => {
    return (
        <div className="bg-[#1E1E1E] rounded-[20px] p-0 w-[383px] h-[475px] overflow-hidden snap-start flex-none">
            <Image src={imageSrc} alt={`${institution} logo`} className="w-full h-[292px] object-cover" width={383} height={292} />
            <div className="flex flex-col p-6 gap-2 h-[calc(100%-292px)]">
                <div className='flex flex-col gap-1'>
                    <h2 className="text-2xl text-[#4CF0E8]">{institution}</h2>
                    <h3 className="text-sm text-[#84EF12]">{timePeriod}</h3>
                </div>
                <div className='flex-grow flex flex-col justify-center'>
                    <p className="text-sm text-white mt-2">{degree}</p>
                    <p className="text-sm text-gray-400 mt-1">{notes}</p>
                </div>
            </div>
        </div>
    );
};

export default EducationCard;



