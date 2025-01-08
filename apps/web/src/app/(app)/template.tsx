import { ReactNode } from "react";

import Transition from "@/components/animations/transition";

// Global template transition
const Template = ({ children }: { children: ReactNode }) => (
    <Transition>{children}</Transition>
);

export default Template;