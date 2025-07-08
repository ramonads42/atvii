"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("bootstrap/dist/js/bootstrap.bundle.min");
class BarraNavegacao extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            botoes: ['Clientes', 'Pets', 'Produtos', 'Serviços', 'Consumo', 'Relatórios']
        };
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this);
    }
    gerarListaBotoes() {
        return this.state.botoes.map(valor => ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)("a", Object.assign({ className: "nav-link", href: "#", onClick: (e) => this.props.seletorView(valor, e) }, { children: valor })) }), valor)));
    }
    render() {
        let tema = this.props.tema;
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("nav", Object.assign({ className: "navbar navbar-expand-lg", "data-bs-theme": "light", style: { backgroundColor: tema, marginBottom: 10 } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "navbar-brand mb-0 h1" }, { children: "PetLovers" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarNav", "aria-controls": "navbarNav", "aria-expanded": "false", "aria-label": "Toggle navigation" }, { children: (0, jsx_runtime_1.jsx)("span", { className: "navbar-toggler-icon" }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "collapse navbar-collapse", id: "navbarNav" }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ className: "navbar-nav" }, { children: this.gerarListaBotoes() })) }))] })) })) }));
    }
}
exports.default = BarraNavegacao;
