// ./lib/utils.ts
"use client"

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const useKeyPress = (keys: any, callback: any, node = null) => {
    // implement the callback ref pattern
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
      callbackRef.current = callback;
    });
  
    // handle what happens on key press
    const handleKeyPress = useCallback(
      (e: any) => {
        // check if one of the key is part of the ones we want
        if (keys.some((key: any) => e.key === key)) {
          callbackRef.current(e);
        }
      },
      [keys]
    );
  
    useEffect(() => {
      // target is either the provided node or the document
      const targetNode = node ?? document;
      // attach the event listener
      targetNode && targetNode.addEventListener("keydown", handleKeyPress);
  
      // remove the event listener
      return () =>
        targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};