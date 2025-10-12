"use client";
import React from 'react';
import Typewriter from '@/app/components/Typewriter';
interface TerminalHeaderProps {
    username: string;
    text: string;
    // textSize?: {
    //     lg: string;
    //     md: string;
    //     sm: string;
    // };
	className?: string;
}

export default function TerminalHeader(props: TerminalHeaderProps) {
const { 
	username,
	text,
	// textSize,
	className 
} = props;

	return (
		<h1 className={`text-2xl md:text-3xl lg:text-4xl font-normal ${className}`}>
			({username}) <span className="text-[#4CF0E8]">-&gt;</span> <span className="text-[#84EF12]">~</span>{" "}
			<span className='md:hidden'><br/>  </span>
			<Typewriter 
				text={text} 
				speed={100}
				mode='complete'
			/>
		</h1>
	);
}
