import {useRef, useState, useEffect, ReactNode} from 'react';

// Helper to convert hex to rgba
const hexToRgba = (hex: string, alpha: number = 1) => {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface FadingScrollProps {
    children: ReactNode;
    className?: string;
    fadeHeight?: number;
    backgroundColor?: string;
}

const FadingScroll: React.FC<FadingScrollProps> = ({
    children,
    className = '',
    fadeHeight = 40,
    backgroundColor = 'white',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);
    const [effectiveFadeHeight, setEffectiveFadeHeight] = useState(fadeHeight);
    const [topFadeOverlays, setTopFadeOverlays] = useState<Array<{left: number; width: number; top: number}>>([]);
    const [bottomFadeOverlays, setBottomFadeOverlays] = useState<Array<{left: number; width: number; bottom: number}>>([]);

    useEffect(() => {
        const el = containerRef.current;
        const contentEl = contentRef.current;
        if (!el || !contentEl) return;

        const updateFade = () => {
            const buffer = 1; 
            const { scrollTop, scrollHeight, clientHeight } = el;
            const needsTopFade = scrollTop > buffer;
            const needsBottomFade = scrollTop + clientHeight < scrollHeight - buffer;
            setShowTop(needsTopFade);
            setShowBottom(needsBottomFade);

            const containerRect = el.getBoundingClientRect();
            const topEdge = containerRect.top;
            const bottomEdge = containerRect.top + clientHeight;
            
            // Find all card elements - look for elements with rounded corners and dark background
            const cards = contentEl.querySelectorAll('div[class*="rounded"], div[class*="bg-\\[#1E1E1E\\]"]');
            const topOverlays: Array<{left: number; width: number; top: number}> = [];
            const bottomOverlays: Array<{left: number; width: number; bottom: number}> = [];
            
            cards.forEach((card) => {
                const cardRect = card.getBoundingClientRect();
                const cardTop = cardRect.top;
                const cardBottom = cardRect.bottom;
                const left = cardRect.left - containerRect.left;
                const width = cardRect.width;
                
                // Check if card is being cut off at the top
                if (needsTopFade && cardTop < topEdge && cardBottom > topEdge) {
                    // Card is being cut off at the top - fade should appear at the container's top edge (0)
                    topOverlays.push({ left, width, top: 0 });
                }
                
                // Check if card is being cut off at the bottom
                if (needsBottomFade && cardBottom > bottomEdge && cardTop < bottomEdge) {
                    // Card is being cut off at the bottom - fade should appear at the container's bottom edge (0)
                    bottomOverlays.push({ left, width, bottom: 0 });
                }
            });

            setTopFadeOverlays(topOverlays);
            setBottomFadeOverlays(bottomOverlays);
        };

        // Use ResizeObserver to detect size changes
        const observer = new ResizeObserver(() => {
            updateFade();
        });

        observer.observe(el);
        if (el.firstElementChild) {
            observer.observe(el.firstElementChild);
        }

        // Use MutationObserver to detect when cards are added/removed
        const mutationObserver = new MutationObserver(() => {
            updateFade();
        });

        if (contentEl) {
            mutationObserver.observe(contentEl, {
                childList: true,
                subtree: true,
            });
        }

        // Initial check
        updateFade(); 

        // Listen for scroll events
        el.addEventListener('scroll', updateFade);

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
            el.removeEventListener('scroll', updateFade);
        }
    }, [effectiveFadeHeight]);

    useEffect(() => {
        const handleResize = () => {
            const isPhone = window.innerWidth < 768;
            const isLandscape = window.innerWidth > window.innerHeight;

            if (isPhone && isLandscape) {
                setEffectiveFadeHeight(fadeHeight / 2);
            } else {
                setEffectiveFadeHeight(fadeHeight);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fadeHeight]);

    const gradientStyle = (direction: 'to bottom' | 'to top') => ({
        background: `linear-gradient(${direction}, ${backgroundColor}, ${hexToRgba(backgroundColor, 0)})`,
        height: `${effectiveFadeHeight}px`,
    });

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div ref={containerRef} className='overflow-y-auto h-full w-full scrollbar-hide'>
                <div ref={contentRef}>
                    {children}
                </div>
            </div>
            
            {/* Top fade overlays - one for each card being cut off at the top */}
            {showTop && topFadeOverlays.map((overlay, index) => (
                <div
                    key={`top-${index}`}
                    className="pointer-events-none absolute transition-opacity duration-100"
                    style={{
                        left: `${overlay.left}px`,
                        width: `${overlay.width}px`,
                        top: `${overlay.top}px`,
                        ...gradientStyle('to bottom'),
                    }}
                />
            ))}
            
            {/* Bottom fade overlays - one for each card being cut off at the bottom */}
            {showBottom && bottomFadeOverlays.map((overlay, index) => (
                <div
                    key={`bottom-${index}`}
                    className="pointer-events-none absolute transition-opacity duration-300"
                    style={{
                        left: `${overlay.left}px`,
                        width: `${overlay.width}px`,
                        bottom: `${overlay.bottom}px`,
                        ...gradientStyle('to top'),
                    }}
                />
            ))}
        </div>
    );
};

export default FadingScroll;