// ./components/ui/post.tsx

import React from "react";

/* Styles */
import classNames from "classnames";

/* Framer Motion */
import { motion } from "framer-motion";
import { motionPost } from "@/lib/motion/animation";

/* Components */
import { TypographyH3 } from "./typography";
import ImageRatio from "@/components/ui/ratio";

/* Types */
import { PostProps } from "@/types/post";

const Post: React.FC<PostProps> = ({title, text, date, image}) => (
    <motion.article 
        initial={motionPost.initial}
        transition={motionPost.transition}
        whileInView={motionPost.whileInView}
        className={classNames(
            "space-y-4 [&:not(:first-child)]:pt-12", 
            "my-12", 
            "[&:not(:first-child)]:border-t-1 border-solid border-t-border",
    )}>
        <TypographyH3 className="font-serif">{title}</TypographyH3>

        <p className={classNames(
            "text-gray-dark text-opacity-80", 
            "font-sans", 
            "pb-4 mt-0",
        )}>
        {text}
        </p>

        <span className={classNames(
            "font-sans font-medium", 
            "text-gray-light text-sm",
        )}>
            {date}
        </span>

        {image && <ImageRatio 
            src={image.alt} 
            alt={image.src} 
        />}
    </motion.article>
)

export default Post;