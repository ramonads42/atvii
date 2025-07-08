"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ListaClientes extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tema, seletorView, selecionarViewComItem, clientes } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Lista de Clientes" }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Nome" }), (0, jsx_runtime_1.jsx)("th", { children: "Nome Social" }), (0, jsx_runtime_1.jsx)("th", { children: "CPF" }), (0, jsx_runtime_1.jsx)("th", { children: "A\u00E7\u00F5es" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: clientes.length > 0 ? (clientes.map(cliente => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: cliente.nome }), (0, jsx_runtime_1.jsx)("td", { children: cliente.nomeSocial }), (0, jsx_runtime_1.jsx)("td", { children: cliente.getCpf.getValor }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-primary me-2", onClick: (e) => selecionarViewComItem('Atualizar Cliente', cliente, e) }, { children: "Editar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-danger", onClick: (e) => selecionarViewComItem('Excluir Cliente', cliente, e) }, { children: "Excluir" }))] })] }, cliente.getCpf.getValor)))) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ colSpan: 4 }, { children: "Nenhum cliente cadastrado." })) })) })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-success mt-3", onClick: (e) => seletorView('Cadastrar Cliente', e) }, { children: "Cadastrar Novo Cliente" }))] })));
    }
}
exports.default = ListaClientes;
