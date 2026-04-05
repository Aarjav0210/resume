"use client";
import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import EducationCard from "@/app/components/EducationCard";
import type { Persona } from "@/app/types/Persona";

const educationData = [
    {
        id: 1,
        institution: "Brown University",
        timePeriod: "Aug '25 – Present",
        degree: "M.S. Computer Science",
        notes: "Research Assistant @ Singh Lab (Deep Learning in Genomics)",
        imageSrc: "/assets/brown-logo.jpeg",
    },
    {
        id: 2,
        institution: "King's College London",
        timePeriod: "Sep '20 – May '24",
        degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
        notes: "Graduated with First Class Honours (1:1)",
        imageSrc: "/assets/kcl-logo.jpeg",
    },
    {
        id: 3,
        institution: "University of Toronto",
        timePeriod: "Sep '22 – Apr '23",
        degree: "Visiting Exchange Student",
        notes: "AI & Biotechnology",
        imageSrc: "/assets/uoft-logo.jpeg",
    },
];

const educationDataResearcher = [
    {
        id: 1,
        institution: "Brown University",
        timePeriod: "Aug '25 – Present",
        degree: "MSc Computer Science (AI + Computational Biology Track)",
        notes: "GTA – Data Structures, Algorithms & Intractability · Deep Learning in Genomics, Statistical Methods for High-Dimensional Genomics",
        imageSrc: "/assets/brown-logo.jpeg",
    },
    {
        id: 2,
        institution: "King's College London",
        timePeriod: "Sep '20 – May '24",
        degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
        notes: "First Class Honours · Study Abroad: AI + Biotechnology @ University of Toronto",
        imageSrc: "/assets/kcl-logo.jpeg",
    },
    {
        id: 3,
        institution: "University of Toronto",
        timePeriod: "Sep '22 – Apr '23",
        degree: "Visiting Exchange Student",
        notes: "AI & Biotechnology",
        imageSrc: "/assets/uoft-logo.jpeg",
    },
];

export default function Education({ persona }: { persona?: Persona }) {
    const data = persona === "researcher" ? educationDataResearcher : educationData;
    
    return (
        <section 
            id="education" 
            className="snap-start h-screen grid grid-rows-[120px_1fr_60px] sm:grid-rows-[120px_1fr_120px] [@media(max-height:500px)]:grid-rows-[120px_1fr_60px]"
        >
            <div className="flex flex-col row-start-1 gap-8 items-start justify-center px-12 py-20 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls education" />
            </div>

            <div className="row-start-2 mx-12 sm:mx-20 my-4">
                <div className="grid grid-cols-1 mdlg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4 pb-6">
                    {data.map((entry) => (
                        <EducationCard key={entry.id} {...entry} />
                    ))}
                </div>
            </div>
            
            <div className="row-start-3 justify-center mt-4">
                <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
            </div>
        </section>
    );
}