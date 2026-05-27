/**
 * Dynamic loader for heavy AI libraries
 * Lazy loads LangChain and Google Generative AI on demand
 * to avoid bloating the initial bundle
 */

export const loadAI = async () => {
  try {
    const [langchainOpenAi, googleGenAi, langchain] = await Promise.all([
      import('@langchain/openai'),
      import('@google/generative-ai'),
      import('langchain'),
    ]);

    return {
      langchainOpenAI: langchainOpenAi,
      googleGenAI: googleGenAi,
      langchain,
    };
  } catch (error) {
    console.error('Failed to load AI libraries:', error);
    throw new Error('Failed to initialize AI libraries');
  }
};

/**
 * Load canvas-confetti dynamically
 * This library is only needed when confetti effect is triggered
 */
export const loadConfetti = async () => {
  try {
    const confetti = await import('canvas-confetti');
    return confetti.default;
  } catch (error) {
    console.error('Failed to load confetti library:', error);
    throw new Error('Failed to initialize confetti');
  }
};

/**
 * Load Framer Motion dynamically if not part of the critical path
 */
export const loadFramerMotion = async (): Promise<any> => {
  try {
    const motion = await import('motion');
    return motion;
  } catch (error) {
    console.error('Failed to load Framer Motion:', error);
    throw new Error('Failed to initialize Framer Motion');
  }
};
