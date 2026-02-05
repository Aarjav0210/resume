import {ReactNode} from 'react';
import GradualBlur from '@/components/GradualBlur';

interface FadingScrollProps {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    bottomInset?: string;
}

const FadingScroll: React.FC<FadingScrollProps> = ({
    children,
    className = '',
    contentClassName = '',
    bottomInset = '1.5rem',
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`} style={{ marginBottom: bottomInset }}>
            <div className='overflow-y-auto h-full w-full scrollbar-hide'>
                <div className={contentClassName}>
                    {children}
                </div>
            </div>
            <GradualBlur
                target="parent"
                position="bottom"
                height="7rem"
                strength={2}
                divCount={5}
                curve="bezier"
                exponential
                opacity={1}
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                }}
            />
        </div>
    );
};

export default FadingScroll;