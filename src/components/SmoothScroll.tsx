import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
    className?: string;
}

const SmoothScroll = ({ children, className = '' }: SmoothScrollProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const element = scrollContainerRef.current;
        if (!element) return;

        const lenis = new Lenis({
            wrapper: element,
            content: element.firstElementChild as HTMLElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div ref={scrollContainerRef} className={`w-full h-full overflow-y-auto ${className}`}>
            {children}
        </div>
    );
};

export default SmoothScroll;
