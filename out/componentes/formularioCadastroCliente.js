"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
class FormularioCadastroCliente extends react_1.Component {
    render() {
        let tema = this.props.tema;
        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container-fluid" }, { children: (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-3" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "Nome", "aria-label": "Nome", "aria-describedby": "basic-addon1" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-3" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "Nome social", "aria-label": "Nome social", "aria-describedby": "basic-addon1" }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "input-group mb-3" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "input-group-text", id: "basic-addon1", style: { background: tema } }, { children: "@" })), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "E-mail", "aria-label": "E-mail", "aria-describedby": "basic-addon1" })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "input-group mb-3" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-outline-secondary", type: "button", style: { background: tema } }, { children: "Cadastrar" })) }))] }) })));
    }
}
exports.default = FormularioCadastroCliente;
