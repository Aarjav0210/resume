import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import WorkExperienceCard from "@/app/components/WorkExperienceCard";
import ScrollToContinue from "@/app/components/ScrollToContinue";

export default function WorkExperience() {
    return (
        <section id="work-experience" className="snap-start h-screen grid grid-rows-[120px_1fr_200px]">
            <div className="flex flex-col row-start-1 gap-[32px] items-start justify-center p-8 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls work_experience" textSize={{ lg: 'text-4xl', md: 'text-3xl', sm: 'text-2xl' }} />
            </div>

            <div className="grid grid-cols-3 gap-[32px] px-20 py-8 w-full h-full">
                <WorkExperienceCard
                    company="Deutsche Bank AG (2)"
                    timePeriod="Jul 24' - Present"
                    role="Associate Engineer"
                    keywords={['MLOps', 'MLFlow', 'NLP', 'End-to-end', 'GCP', 'Web-scraping', '...']}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    company="Deutsche Bank AG (1)"
                    timePeriod="Jun 23' - Aug 23'"
                    role="Summer Intern"
                    keywords={['MLOps', 'MLFlow', 'NLP', 'End-to-end', 'GCP', 'Web-scraping', '...']}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' }, 
                        { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
                        { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
                        { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                    ]}
                    />
                <WorkExperienceCard
                    company="Barclays PLC"
                    timePeriod="Jun 22' - Aug 22'"
                    role="Summer Intern"
                    keywords={['Data Warehouse', 'ETL', 'Fuzz-matching' , 'Data-Cleansing and Ma...']}
                    skills={[
                        { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
                        { bgColor: '#3A78A9', textColor: '#FEDE57', text: 'python' }, 
                        { bgColor: '#D70230', textColor: '#FFFF', text: 'angular' }, 
                    ]}
                    />
                <WorkExperienceCard
                    company="Deutsche Bank AG"
                    timePeriod="Apr 22' - Apr 22'"
                    role="Spring Intern"
                    keywords={['BigQuery ML Forecasting', 'GCP', 'Cloud']}
                    skills={[
                        { bgColor: '#3A78A9', textColor: '#FEDE57', text: 'python' }, 
                    ]}
                />
                <WorkExperienceCard
                    company="CreatorSphere"
                    timePeriod="May 21' - Aug 21'"
                    role="Junior Developer"
                    keywords={['Startup', 'Full-stack', 'Web-development', 'Stripe', 'Multi-Tier Memb...']}
                    skills={[
                        { bgColor: '#4C588F', textColor: '#FFFFFF', text: 'php' }, 
                        { bgColor: '#E8D44E', textColor: '#30312E', text: 'javascript' }, 
                        { bgColor: '#0E2C60', textColor: '#D37957', text: 'mariaDB' }, 
                    ]}
                />
                <WorkExperienceCard
                    company="Manning's Tutors LTD"
                    timePeriod="Mar 21' - Aug 22'"
                    role="Mathematics Tutor"
                    keywords={['A-Levels Mathematics', 'Special Needs']}
                />
            </div>

            <div className="row-start-3 justify-center mt-4">
                <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
            </div>
        </section>
    );
}