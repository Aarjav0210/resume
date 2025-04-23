import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import EducationCard from "@/app/components/EducationCard";

export default function Education() {
    return (
        <section id="education" className="snap-start h-screen grid grid-rows-[120px_1fr_120px]">
            <div className="flex flex-col row-start-1 gap-[32px] items-start justify-center p-8 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls education" textSize={{ lg: 'text-4xl', md: 'text-3xl', sm: 'text-2xl' }} />
            </div>

            <div className="row-start-2 h-full">
                <div className="w-screen overflow-x-auto snap-x snap-mandatory scroll-pl-20 scrollbar-hide">
                    <div className="flex py-8 gap-[32px] px-20">
                        <EducationCard
                            institution="King's College London"
                            timePeriod="Sep 2020 - May 2024"
                            degree="BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad"
                            notes="Graduated with First Class Honours (1:1)"
                            imageSrc="/assets/kcl-logo.jpeg"
                        />
                        <EducationCard
                            institution="University of Toronto"
                            timePeriod="Sep 2022 - Apr 2023"
                            degree="Visiting Exchange Student"
                            notes="AI & Biotechnology"
                            imageSrc="/assets/uoft-logo.jpeg"
                        />
                        <EducationCard
                            institution="Antwerp International School"
                            timePeriod="Sep 2018 - Jul 2020"
                            degree="International Baccalaureate"
                            notes="High School Valedictorian"
                            imageSrc="/assets/ais-logo.jpeg"
                        />
                    </div>
                </div>
            </div>

            <div className="row-start-3 justify-center mt-4">
                {/* <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/> */}
            </div>
        </section>
    );
}