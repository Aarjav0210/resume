"use client";
import React from 'react';
import Typewriter from '@/app/components/Typewriter';

export default function TerminalHeader({ username, text }: { username: string; text: string }) {
	return (
		<h1 className="lg:text-6xl md:text-5xl text-4xl font-normal">
			({username}) <span className="text-[#84EF12]">~</span> <span className="text-[#4CF0E8]">-&gt;</span>{" "}
			<Typewriter 
				text={text} 
				speed={100}
				mode="complete"
			/>
		</h1>
	);
}
