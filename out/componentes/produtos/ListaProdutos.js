"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ListaProdutos extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tema, seletorView, selecionarViewComItem, produtos } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Lista de Produtos" }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Nome" }), (0, jsx_runtime_1.jsx)("th", { children: "Valor" }), (0, jsx_runtime_1.jsx)("th", { children: "Descri\u00E7\u00E3o" }), (0, jsx_runtime_1.jsx)("th", { children: "A\u00E7\u00F5es" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: produtos.length > 0 ? (produtos.map((produto, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: produto.getNome }), (0, jsx_runtime_1.jsxs)("td", { children: ["R$ ", produto.getValor.toFixed(2)] }), (0, jsx_runtime_1.jsx)("td", { children: produto.getDescricao }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-primary me-2", onClick: (e) => selecionarViewComItem('Atualizar Produto', produto, e) }, { children: "Editar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-danger", onClick: (e) => selecionarViewComItem('Excluir Produto', produto, e) }, { children: "Excluir" }))] })] }, `${produto.getNome}-${index}`)))) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ colSpan: 4 }, { children: "Nenhum produto cadastrado." })) })) })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-success mt-3", onClick: (e) => seletorView('Cadastrar Produto', e) }, { children: "Cadastrar Novo Produto" }))] })));
    }
}
exports.default = ListaProdutos;
