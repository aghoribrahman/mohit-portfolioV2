import { useEffect, useRef, forwardRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
    children: React.ReactNode;
    className?: string;
}

const SmoothScroll = forwardRef<HTMLDivElement, SmoothScrollProps>(({ children, className = '' }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    // Sync forwarded ref with internal ref
    useEffect(() => {
        if (!ref) return;

        if (typeof ref === 'function') {
            ref(internalRef.current);
        } else {
            // @ts-ignore - explicitly handling MutableRefObject
            ref.current = internalRef.current;
        }
    }, [ref]);

    useEffect(() => {
        const element = internalRef.current;
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
        <div ref={internalRef} className={`w-full h-full overflow-y-auto ${className}`}>
            {children}
        </div>
    );
});

SmoothScroll.displayName = "SmoothScroll";

export default SmoothScroll;
