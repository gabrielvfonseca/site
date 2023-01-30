"use client"

/* Next */
import Image from "next/image"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
const AspectRatio = AspectRatioPrimitive.Root;

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionImg, motionPost } from "@/lib/motion/animation";

/* Types */
import { ImageProps } from "@/types/image";
 
const Ratio: React.FC<ImageProps> = ({src, alt, className, fill, width, heigth}) => {
  return (
    <AspectRatio 
      ratio={16 / 9} 
      className={classNames(
        "bg-over-light dark:bg-over-dark",
        "shadow-md",
    )}>
      <motion.div
        initial={motionImg.initial}
        animate={motionImg.animate}
        transition={motionImg.transition}
        exit={motionImg.exit}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={classNames("rounded-md object-cover", className)}
        />
      </motion.div>
    </AspectRatio>
  )
}

export default Ratio;