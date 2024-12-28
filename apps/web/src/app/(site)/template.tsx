import { ReactNode } from "react";

import Transition from "@/components/animations/transition";

const Template = ({ children }: { children: ReactNode }) => (
    <Transition>{children}</Transition>
);

export default Template;