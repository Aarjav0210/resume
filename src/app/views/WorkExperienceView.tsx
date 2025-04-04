import React, { useState } from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import WorkExperienceCard from "@/app/components/WorkExperienceCard";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import Description from "../types/Description";


// Onboarded current ML System use-cases with MLFlow to adopt MLOps principles in AI Advisor team

// Learned about and worked with the full ML Application Lifecycle

// Designed an end-to-end pilot app to migrate existing ML system use-cases onto GCP

// Lead a team of interns to create an ESG Analytics Dashboard on GCP by web-scraping news articles and applying several NLP techniques
export default function WorkExperienceView() {
    const [isSelected, setIsSelected] = useState(-1);

    const description1: Description[] = [
        { type: "text", content: "Onboarded current ML System use-cases with " },
        { type: "keyword", content: "MLFlow" },
        { type: "text", content: " to adopt " },
        { type: "keyword", content: "MLOps" },
        { type: "text", content: " principles in " },
        { type: "keyword", content: "AI Advisor team" },
        { type: "text", content: "\n\n" },
        { type: "text", content: "Learned about and worked with the full " },
        { type: "keyword", content: "ML Application Lifecycle" },
        { type: "text", content: "\n\n" },
        { type: "text", content: "Designed an " },
        { type: "keyword", content: "end-to-end" },
        { type: "text", content: " pilot app to migrate existing ML system use-cases onto " },
        { type: "keyword", content: "GCP" },
        { type: "text", content: "\n\n" },
        { type: "text", content: "Lead a team of interns to create an ESG Analytics Dashboard on GCP by " },
        { type: "keyword", content: "web-scraping" },
        { type: "text", content: " news articles and applying several " },
        { type: "keyword", content: "NLP" },
        { type: "text", content: " techniques" },
    ];

    return (
        <section id="work-experience" className="snap-start h-screen grid grid-rows-[120px_1fr_200px]">
            <div className="flex flex-col row-start-1 gap-[32px] items-start justify-center p-8 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls work_experience" textSize={{ lg: 'text-4xl', md: 'text-3xl', sm: 'text-2xl' }} />
            </div>

            <div className="grid grid-cols-3 gap-[32px] px-20 py-8 w-full h-full">
                <WorkExperienceCard
                    id={0}
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    description={description1}
                    disabled={isSelected !== -1 && isSelected !== 0}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    id={1}
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    description={description1}
                    disabled={isSelected !== -1 && isSelected !== 1}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    id={2}
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    description={description1}
                    disabled={isSelected !== -1 && isSelected !== 2}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    id={3}
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    description={description1}
                    disabled={isSelected !== -1 && isSelected !== 3}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    id={4}
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    description={description1}
                    disabled={isSelected !== -1 && isSelected !== 4}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
            </div>

            <div className="row-start-3 justify-center mt-4">
                <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
            </div>
        </section>
    );
}