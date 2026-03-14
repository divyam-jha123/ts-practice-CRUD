import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './components/button';
import { PlusIcon } from './icons/plus';
import './App.css';
import { ShareIcon } from './icons/shareIcon';
export default function App() {
    return (_jsxs("div", { className: 'flex p-3 gap-3', children: [_jsx(Button, { varient: 'primary', size: 'sm', text: 'share', startIcon: _jsx(ShareIcon, { size: "sm" }), onClick: () => {
                    alert("share button is clicked");
                } }), _jsx(Button, { varient: 'secondary', size: 'sm', text: 'add', startIcon: _jsx(PlusIcon, { size: "sm" }), onClick: () => {
                    alert("add button is clicked");
                } })] }));
}
//# sourceMappingURL=App.js.map