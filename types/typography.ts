// ./types/typography.ts

import React from "react";

export interface TypographyProps {
    children: React.ReactNode;
    className?: string;
}

export interface ListProps {
    items: string[],
    className?: string,
}