import type { ReactElement } from "react";
interface ButtonProps {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}
export declare const Button: (props: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=button.d.ts.map