import {useRef, useState, useEffect, ReactNode} from 'react';

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
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateFade = () => {
            // Add a small buffer to prevent flickering when scrollHeight is very close to clientHeight
            const buffer = 1; 
            const { scrollTop, scrollHeight, clientHeight } = el;
            setShowTop(scrollTop > buffer);
            setShowBottom(scrollTop + clientHeight < scrollHeight - buffer);
        };

        // Use ResizeObserver to detect size changes in the container or its content
        const observer = new ResizeObserver(() => {
            updateFade();
        });

        // Observe the scroll container itself
        observer.observe(el);

        // Observe the direct child element containing the scrollable content
        // Assumes children are wrapped in a single element. If not, this might need adjustment.
        if (el.firstElementChild) {
            observer.observe(el.firstElementChild);
        }

        // Initial check
        updateFade(); 

        // Also listen for scroll events as before
        el.addEventListener('scroll', updateFade);

        return () => {
            // Clean up observer and event listener
            observer.disconnect();
            el.removeEventListener('scroll', updateFade);
        }
    }, []); // Keep dependencies empty as ResizeObserver handles changes

    const gradientStyle = (direction: 'to bottom' | 'to top') => ({
        background: `linear-gradient(${direction}, ${backgroundColor}, rgba(255, 255, 255, 0))`,
        height: `${fadeHeight}px`,
    });

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div ref={containerRef} className='overflow-x-auto h-full w-full scrollbar-hide'>
                {children}
            </div>
            {/* {showTop && (
                <div className='pointer-events-none absolute inset-x-0 top-0' style={gradientStyle('to bottom')}/>
            )}
            {showBottom && (
                <div className='pointer-events-none absolute inset-x-0 bottom-0' style={gradientStyle('to top')}/>
            )} */}
            <div 
                className={`
                    pointer-events-none
                    absolute inset-x-0 top-0
                    transition-opacity duration-100
                    ${showTop ? 'opacity-100' : 'opacity-0'}
                `}
                style={gradientStyle('to bottom')}
            />
            <div 
                className={`
                    pointer-events-none
                    absolute inset-x-0 bottom-0
                    transition-opacity duration-300
                    ${showBottom ? 'opacity-100' : 'opacity-0'}
                `}
                style={gradientStyle('to top')}
            />
        </div>
    );
};

export default FadingScroll;