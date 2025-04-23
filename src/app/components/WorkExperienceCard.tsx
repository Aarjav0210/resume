import React, { useState } from 'react';
import SkillIcon from '@/app/components/SkillIcon';
import { SkillIconProps } from '@/app/components/SkillIcon';
import Description from '../types/Description';

interface WorkExperienceCardProps {
    id: number;
    company: string;
    timePeriod: string;
    role: string;
    description: Description[];
    skills?: SkillIconProps[];
    disabled: boolean;
    isSelected: number;
    setIsSelected: (id: number) => void; // Added setIsSelected as a prop
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ id, company, timePeriod, role, description, skills, disabled=false, isSelected, setIsSelected}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => {
        setIsExpanded(prev => !prev);
        setIsSelected(isSelected === id ? -1 : id);
    };

    return (
        <div className="bg-[#1E1E1E] relative  flex flex-col rounded-[20px] py-6 px-8 min-w-[360px]" onClick={disabled ? undefined : toggleExpanded}>
            {disabled && (
                <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-[20px]"></div>
            )}
            <div id='card-header' className='flex flex-col items-start justify-start gap-1'>
                <h2 className="text-xl text-[#4CF0E8]">{company}</h2>
                <h3 className="text-sm text-[#84EF12] whitespace-pre-wrap">{timePeriod}  |  {role}</h3>
            </div>

            <div id='card-keywords' className='flex flex-col row-start-2 items-start justify-center text-xs mt-4 gap-2'>
                <h4>{isExpanded ? 'Description' : 'Keywords'}</h4>
                {/* <p className='whitespace-pre-wrap text-[10px]'>{keywords.join('  |  ')}</p> */}
                <p className='whitespace-pre-wrap text-[10px]'>
                    {isExpanded ?
                        description.map((part, index) => {
                            if (part.type === "keyword") {
                                return (
                                  <strong key={index} className="font-bold text-[#84EF12]">
                                    {part.content}
                                  </strong>
                                ); 
                            } else {
                                return <span key={index}>{part.content}</span>;
                            }
                        }) : description
                            .filter((part) => part.type === "keyword")
                            .map((part) => part.content)
                            .join('  |  ')
                    }
                </p>
            </div>
            {skills && skills.length > 0 && (
                <div id='card-skills' className='flex flex-col row-start-3 items-start justify-end text-sm mt-4 gap-2'>
                    <h4>Skills</h4>
                    <div className='flex flex-wrap gap-2'>
                        {skills.map((skill, index) => (
                            <SkillIcon 
                                key={index}
                                {...skill}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkExperienceCard;
