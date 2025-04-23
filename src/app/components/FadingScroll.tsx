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
            const { scrollTop, scrollHeight, clientHeight } = el;
            setShowTop(scrollTop > 0);
            setShowBottom(scrollTop + clientHeight < scrollHeight);
        };
        
        el.addEventListener('scroll', updateFade);
        updateFade();

        return () => {
            el.removeEventListener('scroll', updateFade);
        }
    }, []);

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