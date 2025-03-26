import React from 'react';
import SkillIcon from '@/app/components/SkillIcon';
import { SkillIconProps } from '@/app/components/SkillIcon';

interface WorkExperienceCardProps {
    company: string;
    timePeriod: string;
    role: string;
    keywords: string[];
    skills?: SkillIconProps[];
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ company, timePeriod, role, keywords, skills }) => {
    return (
        <div className="bg-[#1E1E1E] grid grid-rows-3 rounded-[20px] p-8">
            <div id='card-header' className='flex flex-col row-start-1 items-start justify-start gap-1'>
                <h2 className="text-2xl text-[#4CF0E8]">{company}</h2>
                <h3 className="text-md text-[#84EF12] whitespace-pre-wrap">{timePeriod}  |  {role}</h3>
            </div>

            <div id='card-keywords' className='flex flex-col row-start-2 items-start justify-center text-sm mt-4 gap-2'>
                <h4>Keywords</h4>
                <p className='whitespace-pre-wrap text-[10px]'>{keywords.join('  |  ')}</p>
            </div>
            {skills && skills.length > 0 && (
                <div id='card-skills' className='flex flex-col row-start-3 items-start justify-end text-sm mt-4 gap-2'>
                    <h4>Skills</h4>
                    <div className='flex flex-wrap gap-2'>
                        {skills.map((skill, index) => (
                            <SkillIcon 
                                key={index}
                                {...skill} // Spread the skill object to pass all props
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkExperienceCard;
