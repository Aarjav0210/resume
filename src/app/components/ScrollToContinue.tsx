import React from 'react';
import KeyPressIcon from './KeyPressIcon';
import Image from 'next/image';

interface ScrollToContinueProps {
    beforeText: string;
    keyPressIconText: string;
    afterText: string;
}

const ScrollToContinue: React.FC<ScrollToContinueProps> = ({beforeText, keyPressIconText, afterText}:{beforeText: string; keyPressIconText: string; afterText: string}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4 w-full opacity-50">
            <p className="text-center hidden sm:block [@media(max-height:500px)]:hidden">
                {beforeText}
                <KeyPressIcon text={keyPressIconText} />
                {afterText}
            </p>
            <Image src="/assets/flat-arrowhead-down.svg" alt="Arrow Down" width={24} height={24} />
        </div>
    );
};

export default ScrollToContinue;
