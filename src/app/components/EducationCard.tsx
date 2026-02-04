"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface EducationEntry {
    id: number;
    institution: string;
    timePeriod: string;
    degree: string;
    notes: string;
    imageSrc: string;
    layout?: 'vertical' | 'horizontal';
    cardStyle?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
}

const DEFAULT_LOGO_BG = "rgb(245, 245, 245)";

const getDominantColor = (data: Uint8ClampedArray) => {
    const counts = new Map<string, number>();

    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha < 200) continue;

        const r = data[i] >> 4;
        const g = data[i + 1] >> 4;
        const b = data[i + 2] >> 4;
        const key = `${r},${g},${b}`;
        counts.set(key, (counts.get(key) || 0) + 1);
    }

    if (counts.size === 0) return DEFAULT_LOGO_BG;

    let dominantKey = "";
    let dominantCount = 0;
    for (const [key, count] of counts) {
        if (count > dominantCount) {
            dominantCount = count;
            dominantKey = key;
        }
    }

    const [r, g, b] = dominantKey.split(",").map((n) => parseInt(n, 10) * 17);
    return `rgb(${r}, ${g}, ${b})`;
};

const EducationCard: React.FC<EducationEntry> = ({
    institution,
    timePeriod,
    degree,
    notes,
    imageSrc,
    layout = 'vertical',
    cardStyle,
    imageStyle
}) => {
    const isHorizontal = layout === 'horizontal';
    const baseContainerClasses = "group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(76,240,232,0.08)] transition duration-300 hover:-translate-y-1 hover:rotate-[0.6deg] hover:border-white/20 hover:shadow-[0_0_60px_rgba(76,240,232,0.18)]";
    const verticalContainerClasses = `${baseContainerClasses} flex flex-col p-6`;
    const horizontalContainerClasses = `${baseContainerClasses} flex flex-col p-6`;
    const verticalTextContainerClasses = "relative z-10 flex flex-col gap-2";
    const horizontalTextContainerClasses = "relative z-10 flex flex-col gap-2";
    const [logoBgColor, setLogoBgColor] = useState<string>(DEFAULT_LOGO_BG);

    useEffect(() => {
        let cancelled = false;
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = imageSrc;
        img.onload = () => {
            if (cancelled) return;
            try {
                const canvas = document.createElement("canvas");
                const size = 24;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) return;
                ctx.drawImage(img, 0, 0, size, size);
                const { data } = ctx.getImageData(0, 0, size, size);
                setLogoBgColor(getDominantColor(data));
            } catch {
                setLogoBgColor(DEFAULT_LOGO_BG);
            }
        };
        img.onerror = () => {
            if (!cancelled) setLogoBgColor(DEFAULT_LOGO_BG);
        };
        return () => {
            cancelled = true;
        };
    }, [imageSrc]);

    return (
        <div className={isHorizontal ? horizontalContainerClasses : verticalContainerClasses} style={cardStyle}>
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#4CF0E8]/10 blur-2xl transition duration-500 group-hover:bg-[#4CF0E8]/20" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#84EF12]/10 blur-2xl transition duration-500 group-hover:bg-[#84EF12]/20" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60" />
            </div>
            <div className={isHorizontal ? horizontalTextContainerClasses : verticalTextContainerClasses}>
                <div className="flex items-start gap-4">
                    <div
                        className="flex-shrink-0 rounded-lg border border-white/20 p-2.5 w-12 h-12 flex items-center justify-center"
                        style={{ backgroundColor: logoBgColor }}
                    >
                        <Image
                            src={imageSrc}
                            alt={`${institution} logo`}
                            width={28}
                            height={28}
                            className="object-contain max-h-full max-w-full scale-[1.5]"
                            priority
                            style={imageStyle}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl text-[#4CF0E8]">{institution}</h2>
                        <div className="mt-2 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-[#84EF12] w-fit">
                            {timePeriod}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-white leading-relaxed">{degree}</p>
                <p className="text-xs text-gray-300/90">{notes}</p>
            </div>
        </div>
    );
};

export default EducationCard;



