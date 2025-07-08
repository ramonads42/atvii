"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
class ListaPets extends react_1.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { tema, seletorView, selecionarViewComItem, pets } = this.props;
        return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container-fluid" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Lista de Pets" }), (0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "table table-striped" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Nome" }), (0, jsx_runtime_1.jsx)("th", { children: "Tipo" }), (0, jsx_runtime_1.jsx)("th", { children: "Ra\u00E7a" }), (0, jsx_runtime_1.jsx)("th", { children: "G\u00EAnero" }), (0, jsx_runtime_1.jsx)("th", { children: "CPF do Dono" }), (0, jsx_runtime_1.jsx)("th", { children: "A\u00E7\u00F5es" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: pets.length > 0 ? (pets.map((pet, index) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: pet.nome }), (0, jsx_runtime_1.jsx)("td", { children: pet.tipo }), (0, jsx_runtime_1.jsx)("td", { children: pet.raca }), (0, jsx_runtime_1.jsx)("td", { children: pet.genero }), (0, jsx_runtime_1.jsx)("td", { children: pet.cpfCliente }), (0, jsx_runtime_1.jsxs)("td", { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-primary me-2", onClick: (e) => selecionarViewComItem('Atualizar Pet', pet, e) }, { children: "Editar" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-sm btn-danger", onClick: (e) => selecionarViewComItem('Excluir Pet', pet, e) }, { children: "Excluir" }))] })] }, `${pet.cpfCliente}-${pet.nome}-${index}`)))) : ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", Object.assign({ colSpan: 6 }, { children: "Nenhum pet cadastrado." })) })) })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn btn-success mt-3", onClick: (e) => seletorView('Cadastrar Pet', e) }, { children: "Cadastrar Novo Pet" }))] })));
    }
}
exports.default = ListaPets;
