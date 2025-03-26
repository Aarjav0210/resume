import React from "react";
import Image from "next/image";
import TerminalHeader from "@/app/components/TerminalHeader";
import Typewriter from "@/app/components/Typewriter";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-full gap-[32px] row-start-2 items-start justify-center sm:items-start">
        <TerminalHeader username="aarjav_jain" text="whoami"/>
        {/* <h2 className="lg:text-3xl text-2xl">Computer Science</h2> */}
        {/* <Typewriter
          text
        > */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
