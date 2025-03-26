"use client";
import React from 'react';
import Typewriter from '@/app/components/Typewriter';
interface TerminalHeaderProps {
    username: string;
    text: string;
    textSize?: {
        lg: string;
        md: string;
        sm: string;
    };
}

export default function TerminalHeader(props: TerminalHeaderProps) {
	const { username, text, textSize } = props;

	// Set default text sizes if not provided
	const defaultTextSize = {
		lg: 'text-6xl',
		md: 'text-5xl',
		sm: 'text-4xl',
	};

	const appliedTextSize = textSize || defaultTextSize;
	
	return (
		<h1 className={`${appliedTextSize.lg} ${appliedTextSize.md} ${appliedTextSize.sm} font-normal`}>
			({username}) <span className="text-[#84EF12]">~</span> <span className="text-[#4CF0E8]">-&gt;</span>{" "}
			<Typewriter 
				text={text} 
				speed={100}
				mode='complete'
			/>
		</h1>
	);
}
