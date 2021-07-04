import { useEffect, useState, useRef } from 'react';

export function useVisible( initialIsVisible: Boolean ) {
    const [ isVisible, setIsVisible ] = useState<Boolean>( initialIsVisible );
    const ref = useRef<HTMLElement | undefined>();

    const handleClickOutside = ( event: MouseEvent )  => {
        const el = event.target as HTMLElement;
        if (ref.current && !ref.current.contains( el )) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isVisible, setIsVisible };
}