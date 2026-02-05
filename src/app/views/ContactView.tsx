"use client";
import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import TerminalHeader from "@/app/components/TerminalHeader";

const ContactView = () => {
  const email = "aarjav02@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/aarjav-jain/";

  return (
    <section
      id="contact"
      className="snap-start h-screen grid grid-rows-[120px_1fr]"
    >

      <div className="flex row-start-1 items-center justify-start px-12 py-20 sm:p-20">
        <TerminalHeader username="aarjav_jain" text="cat contact" className="flex-shrink-0" />
      </div>

      <div className="row-start-2 mx-12 sm:mx-20 my-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <p className="text-3xl md:text-4xl font-semibold text-white">
            Let&apos;s build something thoughtful.
          </p>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            If you have a project, research idea, or role you&apos;d like to discuss,
            I&apos;d love to hear about it. Email is the easiest way to reach me.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[#4CF0E8] backdrop-blur-sm shadow-[0_0_20px_rgba(76,240,232,0.08)]">
              collaboration
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[#84EF12] backdrop-blur-sm shadow-[0_0_20px_rgba(132,239,18,0.08)]">
              research &amp; engineering
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-white/80 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.06)]">
              open to new ideas
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(76,240,232,0.08)] p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-16 h-40 w-40 rounded-full bg-[#4CF0E8]/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-[#84EF12]/10 blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60" />
          </div>
          <div className="relative z-10 space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/50">Contact</p>
              <p className="text-lg text-white mt-2">Reach out anytime</p>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                aria-label="Email Aarjav Jain"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4CF0E8]/15 text-[#4CF0E8]">
                  <FaEnvelope className="text-lg" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-400">Email</span>
                  <span className="block text-base text-white truncate">{email}</span>
                </span>
                <span className="ml-auto text-xs text-[#84EF12]">open</span>
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                aria-label="Aarjav Jain's LinkedIn Profile"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                  <FaLinkedin className="text-lg" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-400">LinkedIn</span>
                  <span className="block text-base text-white truncate">linkedin.com/in/aarjav-jain</span>
                </span>
                <span className="ml-auto text-xs text-[#84EF12]">connect</span>
              </a>

              <a
                href="/assets/Aarjav_Jain_CV.pdf"
                download
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                aria-label="Download CV"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                  <MdOutlineFileDownload className="text-lg" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-gray-400">Resume</span>
                  <span className="block text-base text-white truncate">Download CV</span>
                </span>
                <span className="ml-auto text-xs text-[#84EF12]">download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactView;