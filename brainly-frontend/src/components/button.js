import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = (props) => {
    const varientStyle = {
        primary: "bg-purple-600 text-white hover:bg-purple-700",
        secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    };
    const sizeStyles = {
        sm: "px-4 py-1.5 text-sm gap-1.5",
        md: "px-5 py-2 text-base gap-2",
        lg: "px-7 py-3 text-lg gap-2.5",
    };
    return (_jsxs("button", { onClick: props.onClick, className: `flex items-center justify-center cursor-pointer rounded-md ${varientStyle[props.varient]} ${sizeStyles[props.size]}`, children: [props.startIcon ? _jsx("span", { children: props.startIcon }) : null, _jsx("span", { children: props.text }), props.endIcon ? _jsx("span", { children: props.endIcon }) : null] }));
};
//# sourceMappingURL=button.js.map