import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';


// Mock IntersectionObserver
class IntersectionObserverMock implements IntersectionObserver {
   readonly root: Element | null = null;
   readonly rootMargin: string = '';
   readonly thresholds: ReadonlyArray<number> = [];

   constructor (private callback: IntersectionObserverCallback) { }

   observe(target: Element): void {
      this.callback([
         {
            isIntersecting: true,
            target,
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRatio: 1,
            intersectionRect: target.getBoundingClientRect(),
            rootBounds: null,
            time: Date.now(),
         }
      ], this);
   }

   unobserve(): void { }
   disconnect(): void { }
   takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

afterEach(() => {
   cleanup();
});