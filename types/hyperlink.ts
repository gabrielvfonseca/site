// ./types/hyperlink.ts

import React from "react";

export interface HyperLinkProps {
    href: string,
    children: React.ReactNode;
    target?: "_blank";
    className?: string;
}