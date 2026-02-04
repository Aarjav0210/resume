import {ReactNode} from 'react';

interface FadingScrollProps {
    children: ReactNode;
    className?: string;
    contentClassName?: string;
}

const FadingScroll: React.FC<FadingScrollProps> = ({
    children,
    className = '',
    contentClassName = '',
}) => {
    return (
        <div className={`relative overflow-visible ${className}`}>
            <div className='overflow-y-auto h-full w-full scrollbar-hide'>
                <div className={contentClassName}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FadingScroll;