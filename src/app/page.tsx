import React from "react";
import Landing from "@/app/views/landing";
import WorkExperience from "@/app/views/work-experience";
import Education from "@/app/views/education";

export default function Home() {
  return(
    <div className="overflow-y-scroll snap-y snap-mandatory h-screen font-[family-name:var(--font-geist-sans)]">
      <Landing/>
      <WorkExperience/>
      <Education/>
    </div>
  );
}