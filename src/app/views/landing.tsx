import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import Typewriter from "@/app/components/Typewriter";
import ScrollToContinue from "../components/scrollToContinue";

export default function Landing() {
return (
    <section className="snap-start h-screen grid grid-rows-[20px_1fr_120px] gap-[32px]">
        {/* Inner wrapper with padding */}
        <div className="flex flex-col row-start-2 gap-[32px] items-start justify-center p-8 sm:p-20 w-full">
            <TerminalHeader username="aarjav_jain" text="whoami" />
            <Typewriter
            text={"Computer Science (Artificial Intelligence) w/ Management @ King's College London"}
            speed={50}
            mode="loop"
            startDelay={2500}
            eraseDelay={3000}
            eraseSpeed={10} 
            />
        </div>
        <div className="row-start-3 justify-center">
            <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
        </div>
    </section>
    );
}