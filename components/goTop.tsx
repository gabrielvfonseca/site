// ./components/goTop.tsx

import React from 'react';

/* Icons */
import { ArrowUpIcon } from '@radix-ui/react-icons';

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from 'framer-motion';
import { motionGoTopButton } from "@/lib/motion/animation";

/* Utils */
export const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
};

export default function GoToTopButton () {
  return (
    <motion.button
      initial={motionGoTopButton.initial}
      animate={motionGoTopButton.animate}
      transition={motionGoTopButton.transition}
      exit={motionGoTopButton.exit}
      whileFocus={motionGoTopButton.whileFocus}
      whileTap={motionGoTopButton.whileTap}

      className={classNames(
        'fixed bottom-8 left-10 z-10',
        'cursor-pointer text-center',
        'p-2.5',
        'dark:bg-over-dark bg-over-light',
        'rounded-full shadow-md',
        'dark:text-white text-black',
        'transition ease-in-out delay-100'
      )}
      onClick={goToTop}
    >
      <ArrowUpIcon width={16} height={16} />
    </motion.button>
  );
};
