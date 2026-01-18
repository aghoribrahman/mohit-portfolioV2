import { useState, useEffect, useRef, MutableRefObject } from 'react';

interface UseSectionNavigationProps {
  sectionsLength: number;
  sectionRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}

export const useSectionNavigation = ({ sectionsLength, sectionRefs }: UseSectionNavigationProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [canNavigateNext, setCanNavigateNext] = useState(false);
  const [canNavigatePrev, setCanNavigatePrev] = useState(true);

  // Handle viewport width and mobile detection
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Check scroll position and control navigation
  useEffect(() => {
    const checkScrollPosition = () => {
      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) {
        setCanNavigateNext(true);
        setCanNavigatePrev(currentSection > 0);
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      // Strict scroll detection - only allow next navigation when user has scrolled to the bottom
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;
      const contentFitsViewport = scrollHeight <= clientHeight + 20;
      setCanNavigateNext(contentFitsViewport || isAtBottom);
      setCanNavigatePrev(currentSection > 0);
    };

    const timeoutId = setTimeout(checkScrollPosition, 100);
    const currentSectionElement = sectionRefs.current[currentSection];

    if (currentSectionElement) {
      currentSectionElement.addEventListener('scroll', checkScrollPosition, { passive: true });
      return () => {
        clearTimeout(timeoutId);
        currentSectionElement.removeEventListener('scroll', checkScrollPosition);
      };
    }
    return () => clearTimeout(timeoutId);
  }, [currentSection, sectionRefs]);

  // Reset scroll position when section changes
  useEffect(() => {
    const currentSectionElement = sectionRefs.current[currentSection];
    if (currentSectionElement) {
      currentSectionElement.scrollTop = 0;
    }
  }, [currentSection, sectionRefs]);

  // Event Listeners (Wheel, Key, Touch)
  useEffect(() => {
    let isScrollInProgress = false;

    const handleScroll = (e: WheelEvent) => {
      if (isScrollInProgress || isTransitioning) return;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) {
        const delta = Math.sign(e.deltaY);
        if (delta > 0 && currentSection < sectionsLength - 1) {
          triggerTransition(1);
        } else if (delta < 0 && currentSection > 0) {
          triggerTransition(-1);
        }
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const delta = Math.sign(e.deltaY);
      const scrollTolerance = 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - scrollTolerance;
      const atTop = scrollTop <= scrollTolerance;
      const hasScrollableContent = scrollHeight > clientHeight + 30;

      if (delta > 0 && currentSection < sectionsLength - 1) {
        if (!hasScrollableContent || atBottom || canNavigateNext) {
          e.preventDefault();
          triggerTransition(1);
        }
      } else if (delta < 0 && currentSection > 0) {
        if (!hasScrollableContent || atTop) {
          e.preventDefault();
          triggerTransition(-1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollInProgress || isTransitioning) return;
      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 5;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const hasScrollableContent = scrollHeight > clientHeight + 20;

      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentSection < sectionsLength - 1 && canNavigateNext && (!hasScrollableContent || atBottom)) {
        e.preventDefault();
        triggerTransition(1);
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentSection > 0 && canNavigatePrev && (!hasScrollableContent || atTop)) {
        e.preventDefault();
        triggerTransition(-1);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchY = 0;
    let touchScrollTimeout: NodeJS.Timeout | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      touchStartTime = Date.now();
      if (touchScrollTimeout) {
        clearTimeout(touchScrollTimeout);
        touchScrollTimeout = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrollInProgress || isTransitioning) return;
      const currentTouchY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;

      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const hasScrollableContent = scrollHeight > clientHeight + 30;

      if (hasScrollableContent) {
        if (deltaY > 0 && atBottom && currentSection < sectionsLength - 1 && canNavigateNext) {
          if (touchScrollTimeout) clearTimeout(touchScrollTimeout);
          touchScrollTimeout = setTimeout(() => {
            if (!isScrollInProgress && !isTransitioning) triggerTransition(1);
          }, 150);
        } else if (deltaY < 0 && atTop && currentSection > 0 && canNavigatePrev) {
          if (touchScrollTimeout) clearTimeout(touchScrollTimeout);
          touchScrollTimeout = setTimeout(() => {
            if (!isScrollInProgress && !isTransitioning) triggerTransition(-1);
          }, 150);
        } else if (touchScrollTimeout) {
          clearTimeout(touchScrollTimeout);
          touchScrollTimeout = null;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollInProgress || isTransitioning) return;
      const currentSectionElement = sectionRefs.current[currentSection];
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
      const atTop = scrollTop <= 10;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      const hasScrollableContent = scrollHeight > clientHeight + 30;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const touchDuration = Date.now() - touchStartTime;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && touchDuration < 500) {
        if (deltaX > 0 && currentSection < sectionsLength - 1 && canNavigateNext && (!hasScrollableContent || atBottom)) {
          e.preventDefault();
          triggerTransition(1);
        } else if (deltaX < 0 && currentSection > 0 && canNavigatePrev && (!hasScrollableContent || atTop)) {
          e.preventDefault();
          triggerTransition(-1);
        }
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30 && touchDuration < 500 && !hasScrollableContent) {
        if (deltaY > 0 && currentSection < sectionsLength - 1 && canNavigateNext) {
          e.preventDefault();
          triggerTransition(1);
        } else if (deltaY < 0 && currentSection > 0 && canNavigatePrev) {
          e.preventDefault();
          triggerTransition(-1);
        }
      }
      if (touchScrollTimeout) {
        clearTimeout(touchScrollTimeout);
        touchScrollTimeout = null;
      }
    };

    const triggerTransition = (direction: 1 | -1) => {
      isScrollInProgress = true;
      setIsTransitioning(true);
      setCurrentSection(prev => prev + direction);
      setTimeout(() => {
        isScrollInProgress = false;
        setIsTransitioning(false);
      }, 800);
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (touchScrollTimeout) clearTimeout(touchScrollTimeout);
    };
  }, [currentSection, isTransitioning, sectionsLength, canNavigateNext, canNavigatePrev, sectionRefs]);

  const navigateToSection = (index: number) => {
    if (!isTransitioning && index !== currentSection) {
      setIsTransitioning(true);
      setCurrentSection(index);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  return {
    currentSection,
    navigateToSection,
    isTransitioning,
    viewportWidth,
    isMobile,
    canNavigateNext,
    canNavigatePrev,
  };
};
