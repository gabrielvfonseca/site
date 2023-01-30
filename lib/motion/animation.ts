// ./lib/motion/animation.ts

export const motionHeader = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 0.4
    },
};

export const motionFooter = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 0.4
    },
};

export const motionPage = {
    initial: { 
        opacity: 0, 
        scale: 0.95,
    },
    animate: { 
        opacity: 1, 
        scale: 1,
    },
    transition: { 
        duration: 0.18,
    },
    exit: { 
        opacity: 0, 
        scale: 0.95,
    },
};

export const motionPost = {
    whileInView: {
        y: 0,
        opacity: 1,
    },
    initial: { 
        y: 10,
        opacity: 0
    },
    transition: {
      duration: 0.24,
      delay: 0.22
    }
}

export const motionTracks = {
    whileInView: {
        y: 0,
        opacity: 1,
    },
    initial: { 
        y: 8,
        opacity: 0
    },
    transition: {
      duration: 0.20,
      delay: 0.16
    }
}

export const motionImg = {
    initial: { 
        opacity: 0, 
        scale: 0.98,
    },
    animate: { 
        opacity: 1, 
        scale: 1,
    },
    transition: { 
        duration: 0.45,
    },
    exit: { 
        opacity: 0, 
        scale: 0.98,
    },
}

export const motionPlays = {
    initial: { 
        opacity: 0, 
    },
    animate: { 
        opacity: 1, 
    },
    transition: { 
        duration: 0.42,
    },
    exit: { 
        opacity: 0, 
    },
};


export const motionRow = {
    whileInView: {
        y: 0,
        opacity: 1,
    },
    initial: { 
        y: 4,
        opacity: 0
    },
    transition: {
      duration: 0.16,
      delay: 0.14
    }
}

export const motionTypography = {
    initial: { 
        y: 3,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
    },
    transition: {
      duration: 0.16,
      delay: 0.14
    }
}

export const motionHeaders = {
    initial: { 
        y: 4,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
    },
    transition: {
      duration: 0.16,
      delay: 0.14
    }
}

export const motionBadge = {
    initial: { 
        opacity: 0
    },
    animate: {
        opacity: 1,
    },
    transition: {
      duration: 1.6,
    }
}

export const motionGoTopButton = {
    initial: {
        y: 150,
        x: 0,
        opacity: 0,
    },
    animate: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    transition: {
        duration: 0.4,
        delay: 0.2,
    },
    exit: {
        y: 150,
        x: 0,
        opacity: 0,
    },
    whileFocus: {
        scale: 1.2,
    },
    whileTap: {
        scale: 0.92,
    },
};