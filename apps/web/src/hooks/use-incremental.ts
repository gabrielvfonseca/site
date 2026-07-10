'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Return shape of {@link useIncremental}.
 */
export interface UseIncrementalResult {
  /** How many items should currently be rendered. */
  visible: number;
  /** Whether there are still hidden items to reveal. */
  canLoadMore: boolean;
  /** Number of items still hidden. */
  remaining: number;
  /** Reveal the next batch of items. */
  showMore: () => void;
}

/**
 * Manage an incrementally-revealed slice of a list. Renders `initialCount`
 * items up front and reveals `batchSize` more each time {@link showMore} runs,
 * until every item is visible.
 * @param total - Total number of items in the full list.
 * @param initialCount - Items shown before any interaction (default 4).
 * @param batchSize - Items revealed per {@link showMore} call (default 4).
 * @returns The current visible count and helpers to reveal more.
 */
export function useIncremental(
  total: number,
  initialCount = 4,
  batchSize = 4
): UseIncrementalResult {
  const [visible, setVisible] = useState(initialCount);

  // Reset when the underlying list size changes (e.g. filtered/replaced).
  useEffect(() => {
    setVisible(initialCount);
  }, [initialCount]);

  const showMore = useCallback(() => {
    setVisible((current) => Math.min(current + batchSize, total));
  }, [batchSize, total]);

  const cappedVisible = Math.min(visible, total);

  return {
    visible: cappedVisible,
    canLoadMore: cappedVisible < total,
    remaining: Math.max(0, total - cappedVisible),
    showMore,
  };
}
