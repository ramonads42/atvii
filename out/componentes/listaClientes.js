"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
class ListaCliente extends react_1.Component {
    render() {
        let tema = this.props.tema;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container-fluid" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "list-group" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action" }, { children: "Cliente 1" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action" }, { children: "Cliente 2" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action" }, { children: "Cliente 3" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action", style: { backgroundColor: tema } }, { children: "Cliente 4" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action" }, { children: "Cliente 5" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "#", className: "list-group-item list-group-item-action" }, { children: "Cliente 6" }))] })) })));
    }
}
exports.default = ListaCliente;
