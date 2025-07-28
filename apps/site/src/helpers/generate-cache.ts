export const REMOVE_SPECIAL_CHARS_REGEX = /[{}":]/g;
export const REMOVE_COMMA_REGEX = /,/g;

// Helper function to generate cache key
export const generateCacheKey = (
  prefix: string,
  config: Record<string, unknown>
): string => {
  const configStr =
    Object.keys(config).length > 0
      ? `-${JSON.stringify(config)
          .replace(REMOVE_SPECIAL_CHARS_REGEX, '')
          .replace(REMOVE_COMMA_REGEX, '-')}`
      : '';
  return `${prefix}${configStr}`;
};
